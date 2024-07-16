import { CommonActions, useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

import { login as loginRequest, logout as logoutRequest } from "@/apis/auth";
import { sleep } from "@/utils/async";
import { getErrorMessage } from "@/utils/error";

export const TOKEN_KEY = "accessToken";

interface AuthContextProps {
  authState: {
    accessToken: string | undefined;
    isLoggedIn: boolean;
  };
  onLogin?: (email: string, password: string) => void;
  onRegister?: (email: string, password: string, firstName: string, lastName: string) => void;
  onLogout?: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  authState: {
    accessToken: undefined,
    isLoggedIn: false,
  },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const [authState, setAuthState] = useState<AuthContextProps["authState"]>({
    accessToken: undefined,
    isLoggedIn: false,
  });

  const register = (email: string, password: string, firstName: string, lastName: string) => {
    console.log("email", email);
    console.log("password", password);
    console.log("firstName", firstName);
    console.log("lastName", lastName);

    return "register called";
  };

  const login = async (email: string, password: string) => {
    await sleep(2000);
    try {
      const res = await loginRequest({ email, password });

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
