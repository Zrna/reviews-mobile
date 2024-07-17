import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import logo from "@/assets/images/logo.png";
import { CustomButton, CustomInput } from "@/components";
import { useAuthContext } from "@/contexts/AuthContext";
import { LoginProps } from "@/interfaces/auth";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

const Login = () => {
  const { onLogin } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginProps>({ resolver: zodResolver(LoginSchema) });

  return (
    <SafeAreaView className="h-full bg-black">
      <ScrollView>
        <View className="items-center">
          <Image source={logo} className="w-[115px] h-[35px] mt-4" resizeMode="contain" />
          <View className="w-full min-h-[85vh] justify-center px-4">
            <CustomInput
              control={control}
              name="email"
              placeholder="Email"
              label="Email"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              autoCapitalize="none"
            />
            <CustomInput
              control={control}
              textContentType="password"
              name="password"
              placeholder="Password"
              label="Password"
              secureTextEntry
            />
            <CustomButton
              text="Log in"
              onPress={handleSubmit(async (data) => onLogin?.(data.email, data.password))}
              isFullWidth
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              class="mt-4"
            />
            <Link href="/register" className="text-dimmed mt-6 self-center">
              Don't have an account? <Text className="text-blue-400">Sign up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
