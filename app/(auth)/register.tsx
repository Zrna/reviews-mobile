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
import { RegisterProps } from "@/interfaces/auth";

export const RegisterFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must contain at least 6 characters"),
  firstName: z.string().min(2, "First name must contain at least 2 characters"),
  lastName: z.string().min(2, "Last name must contain at least 2 characters"),
});

const Register = () => {
  const { onRegister, onGoogleLogin } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterProps>({ resolver: zodResolver(RegisterFormSchema) });

  return (
    <SafeAreaView className="h-full bg-black">
      <ScrollView keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets>
        <View className="items-center">
          <Image source={logo} className="w-[115px] h-[35px] mt-4" resizeMode="contain" />
          <View className="w-full min-h-[85vh] justify-center px-4">
            <CustomInput
              control={control}
              name="firstName"
              placeholder="First name"
              label="First name"
              autoCapitalize="words"
            />
            <CustomInput
              control={control}
              name="lastName"
              placeholder="Last name"
              label="Last name"
              autoCapitalize="words"
            />
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
              text="Sign up"
              onPress={handleSubmit(async (data) => onRegister?.(data))}
              isFullWidth
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              class="mt-4"
            />
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-zinc-700" />
              <Text className="text-dimmed mx-3 text-xs uppercase">or</Text>
              <View className="flex-1 h-px bg-zinc-700" />
            </View>
            <CustomButton
              variant="outlined-secondary"
              text="Continue with Google"
              isFullWidth
              onPress={() => onGoogleLogin?.()}
            />
            <Link href="/login" className="text-dimmed mt-6 self-center">
              Have an account? <Text className="text-blue-400">Log in with email</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
