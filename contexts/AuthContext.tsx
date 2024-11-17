import { CommonActions } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router, useNavigation } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

import { login as loginRequest, logout as logoutRequest, register as registerRequest } from "@/apis/auth";
import { LoginProps, RegisterProps } from "@/interfaces/auth";
import { sleep } from "@/utils/async";
import { getErrorMessage } from "@/utils/error";

export const TOKEN_KEY = "accessToken";

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
  const navigation = useNavigation();
  const queryClient = useQueryClient();

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
      await SecureStore.setItemAsync(TOKEN_KEY, res.accessToken);

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
      await SecureStore.setItemAsync(TOKEN_KEY, res.accessToken);

      router.replace("/home");
      return res;
    } catch (error) {
      Alert.alert("", getErrorMessage(error));
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      queryClient.removeQueries();
      queryClient.clear();
      axios.defaults.headers.common["Authorization"] = undefined;
      setAuthState({ accessToken: undefined, isLoggedIn: false });

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "index" }],
        }),
      );
    } catch (error) {
      Alert.alert("", getErrorMessage(error));
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

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
