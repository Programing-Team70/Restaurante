import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/AuthStore";
import { useState } from "react";
import toast from "react-native-toast-message";

export const ResetPasswordForm = ({ token, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPassword = useAuthStore((state) => state.resetPassword);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await resetPassword({
      token,
      newPassword: data.password,
    });

    if (res?.success) {
      toast.success("¡Contraseña restablecida! Ahora puedes iniciar sesión.", {
        duration: 5000,
      });
      onSuccess();
    }
  };

  return (
    <ScrollView className="space-y-7">
      <View className="relative">
        <TextInput
          placeholder="Nueva contraseña"
          placeholderTextColor="#64748b"
          secureTextEntry={!showPassword}
          className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl outline-none text-slate-900 pr-12"
          onChangeText={(text) => setValue("password", text)}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-5 top-4"
        >
          <Text className="text-slate-400">{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
        </Pressable>
        {errors.password && (
          <Text className="text-red-600 text-xs mt-1">
            {errors.password.message}
          </Text>
        )}
      </View>

      <View className="relative">
        <TextInput
          placeholder="Confirmar contraseña"
          placeholderTextColor="#64748b"
          secureTextEntry={!showConfirmPassword}
          className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl outline-none text-slate-900 pr-12"
          onChangeText={(text) => setValue("confirmPassword", text)}
        />
        <Pressable
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-5 top-4"
        >
          <Text className="text-slate-400">
            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
          </Text>
        </Pressable>
        {errors.confirmPassword && (
          <Text className="text-red-600 text-xs mt-1">
            {errors.confirmPassword.message}
          </Text>
        )}
      </View>

      {error && (
        <Text className="text-red-600 text-sm text-center font-medium">
          {error}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="w-full py-4 bg-[#3b82f6] rounded-xl"
        disabled={loading}
      >
        <Text className="text-white text-center font-bold">
          {loading ? "ACTUALIZANDO..." : "ACTUALIZAR CONTRASEÑA"}
        </Text>
      </TouchableOpacity>

      <View className="text-center text-sm text-slate-600 mt-2">
        <Text className="text-slate-600">¿Recordaste tu contraseña? </Text>
        <TouchableOpacity onPress={onSuccess}>
          <Text className="font-bold text-[#3b82f6]">Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
