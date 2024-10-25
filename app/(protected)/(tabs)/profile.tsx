import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { LogOut } from "react-native-feather";
import { Edit2, X } from "react-native-feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

import { RegisterFormSchema } from "@/app/(auth)/register";
import { CustomButton, CustomInput, IconWrapper } from "@/components";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAccount, useUpdateAccount } from "@/hooks/api/account";
import { UpdateAccountProps } from "@/interfaces/account";
import { getUserInitials } from "@/utils/user";

const ProfileFormSchema = RegisterFormSchema.pick({
  firstName: true,
  lastName: true,
});

const Profile = () => {
  const { onLogout } = useAuthContext();
  const { data: account, isLoading: isLoadingUser } = useAccount();
  const { mutateAsync: updateAccount } = useUpdateAccount();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm<UpdateAccountProps>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    values: account,
  });

  const [isEditMode, setIsEditMode] = useState(false);

  if (!account || isLoadingUser) {
    return (
      <SafeAreaView className="h-full justify-center bg-black">
        <ActivityIndicator color="white" />

        {/* Use this box to logout when the app is stuck */}
        <Text className="w-10 h-10 self-center" onPress={onLogout} />
      </SafeAreaView>
    );
  }

  const { email, firstName, lastName } = account;
  const userInitials = getUserInitials(firstName, lastName);

  return (
    <SafeAreaView className="h-full bg-black">
      <View className="pt-4 px-3 items-end">
        <LogOut stroke="rgba(255,255,255,0.8)" width={28} height={28} onPress={onLogout} />
      </View>
      <View className="h-full justify-center items-center space-y-6">
        <View className="bg-green-default rounded-lg p-0.5">
          <View className="w-16 h-16 border-2 border-black rounded-lg justify-center items-center bg-black">
            <Text className="text-2xl text-white">{userInitials}</Text>
          </View>
        </View>
        {isEditMode ? (
          <View className="flex-col w-[250px]">
            <CustomInput control={control} name="firstName" />
            <CustomInput control={control} name="lastName" />
            <View className="flex-row">
              <CustomButton
                onPress={handleSubmit(async (data) => {
                  if (isDirty) {
                    await updateAccount(data);
                  }
                  setIsEditMode(false);
                })}
                text="Save changes"
                class="flex-1 mr-2 max-h-[45px] min-h-[45px]"
                isLoading={isSubmitting}
              />
              <CustomButton
                class="w-1/5 max-h-[45px] min-h-[45px]"
                onPress={() => (reset(), setIsEditMode(false))}
                icon={<X stroke="rgba(255,255,255,0.7)" width={16} height={16} />}
                variant="outlined-secondary"
                isDisabled={isSubmitting}
              />
            </View>
          </View>
        ) : (
          <View className="flex-row space-x-2 items-center">
            <Text className="text-white text-xl">
              {firstName} {lastName}
            </Text>
            <IconWrapper onPress={() => setIsEditMode(true)}>
              <Edit2 stroke="rgba(255,255,255,0.7)" width={16} height={16} />
            </IconWrapper>
          </View>
        )}
        <Text
          className={`${isEditMode ? "text-light-dark" : "text-white"} text-xl`}
          onPress={() => {
            if (isEditMode) {
              Toast.info("Email cannot be changed");
            }
          }}
        >
          {email}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
