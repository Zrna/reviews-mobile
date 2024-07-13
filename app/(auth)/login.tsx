import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Image, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import logo from "@/assets/images/logo.png";
import { CustomButton, CustomInput } from "@/components";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

type LoginProps = z.infer<typeof LoginSchema>;

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginProps>({ resolver: zodResolver(LoginSchema) });

  const handleLogin = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

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
              onPress={handleSubmit(handleLogin)}
              isFullWidth
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              class="mt-4"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
