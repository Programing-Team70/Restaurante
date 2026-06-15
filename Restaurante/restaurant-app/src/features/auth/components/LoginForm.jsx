import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/AuthStore.js";
import { useState } from "react";
import Toast from "react-native-toast-message";

export const LoginForm = ({ onForgot }) => {
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("1) onSubmit, data:", data);
    const res = await login(data);
    console.log("3) resultado login:", res);
    if (res?.success) {
      Toast.show({ type: "success", text1: "¡Bienvenido de nuevo!" });
    }
  };

  return (
    <ScrollView className="space-y-7">
      <View className="relative">
        <TextInput
          placeholder="Usuario"
          placeholderTextColor="#64748b"
          className="w-full px-5 py-4 bg-white border border-slate-300 rounded-xl outline-none text-slate-900"
          onChangeText={(text) => setValue("emailOrUsername", text)}
        />
        {errors.emailOrUsername && (
          <Text className="text-red-600 text-xs mt-1">
            {errors.emailOrUsername.message}
          </Text>
        )}
      </View>

      <View className="relative">
        <TextInput
          placeholder="Contraseña"
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
          {loading ? "Iniciando..." : "INGRESAR"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
