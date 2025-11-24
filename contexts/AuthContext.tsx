import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

import { login as loginRequest, logout as logoutRequest, register as registerRequest } from "@/apis/auth";
import { LoginProps, RegisterProps } from "@/interfaces/auth";
import { ACCESS_TOKEN, setTokenRefreshCallback } from "@/services/backend";
import { sleep } from "@/utils/async";
import { getErrorMessage } from "@/utils/error";

interface AuthContextProps {
  authState: {
    accessToken: string | undefined;
    isLoggedIn: boolean;
  };
  onLogin?: (data: LoginProps) => void;
  onRegister?: (data: RegisterProps) => void;
  onLogout?: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  authState: {
    accessToken: undefined,
    isLoggedIn: false,
  },
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const isLoggingOut = useRef(false);

  const [authState, setAuthState] = useState<AuthContextProps["authState"]>({
    accessToken: undefined,
    isLoggedIn: false,
  });

  const register = async (data: RegisterProps) => {
    await sleep(2000);
    try {
      const res = await registerRequest(data);

      setAuthState({ accessToken: res.accessToken, isLoggedIn: true });
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;
      await SecureStore.setItemAsync(ACCESS_TOKEN, res.accessToken);

      router.replace("/home");
      return res;
    } catch (error) {
      Alert.alert("", getErrorMessage(error));
    }
  };

  const login = async (data: LoginProps) => {
    await sleep(2000);
    try {
      const res = await loginRequest(data);

      setAuthState({ accessToken: res.accessToken, isLoggedIn: true });
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;
      await SecureStore.setItemAsync(ACCESS_TOKEN, res.accessToken);

      router.replace("/home");
      return res;
    } catch (error) {
      Alert.alert("", getErrorMessage(error));
    }
  };

  const logout = async () => {
    // Prevent multiple simultaneous logout calls
    if (isLoggingOut.current) {
      console.log("⏭️ Logout already in progress, skipping...");
      return;
    }

    isLoggingOut.current = true;
    console.log("🔒 Logging out");

    try {
      // Mobile uses Bearer tokens, not cookies, so logout API doesn't do anything
      // But we call it anyway in case backend logic changes in the future
      await logoutRequest().catch(() => {
        // Ignore errors - token might be expired, but we're logging out anyway
      });
    } catch {
      // Ignore any errors
    } finally {
      // Always perform local cleanup regardless of API call result
      await SecureStore.deleteItemAsync(ACCESS_TOKEN);
      queryClient.removeQueries();
      queryClient.clear();
      axios.defaults.headers.common["Authorization"] = undefined;
      setAuthState({ accessToken: undefined, isLoggedIn: false });

      // Dismiss all modals and clear navigation stack, then navigate to login
      router.dismissAll();
      router.replace("/");

      // Reset the flag after a delay to allow navigation to complete
      setTimeout(() => {
        isLoggingOut.current = false;
      }, 1000);
    }
  };

  // Handle token refresh from backend service
  const handleTokenRefresh = (newToken: string | null) => {
    if (!newToken) {
      // Token expired - logout user
      logout();
    } else {
      // Update auth state with new token
      setAuthState({ accessToken: newToken, isLoggedIn: true });
    }
  };

  useEffect(() => {
    // Set up token refresh callback
    setTokenRefreshCallback(handleTokenRefresh);

    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(ACCESS_TOKEN);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ accessToken: token, isLoggedIn: true });

        router.replace("/home");
      } else {
        setAuthState({ accessToken: undefined, isLoggedIn: false });
        queryClient.removeQueries();
        queryClient.clear();

        router.replace("/");
      }
    };

    loadToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContext");
  }

  return context;
};

export default AuthProvider;
