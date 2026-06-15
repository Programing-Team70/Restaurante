import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/AuthStore";
import toast from "react-native-toast-message";

export const ForgotPasswordForm = ({ onSwitch }) => {
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await forgotPassword(data.email);

    if (res?.success) {
      toast.success(
        "Revisa tu bandeja para continuar con el cambio de contraseña.",
        {
          duration: 5000,
        },
      );
      onSwitch();
    }
  };

  return (
    <ScrollView className="space-y-7">
      <View className="relative">
        <TextInput
          placeholder="Correo Electrónico"
          placeholderTextColor="#64748b"
          className="w-full px-5 pr-12 py-4 bg-white border border-slate-300 rounded-xl outline-none text-slate-900"
          keyboardType="email-address"
          onChangeText={(text) => setValue("email", text)}
        />
        <View className="absolute right-5 top-4">
          <Text className="text-slate-400 text-xl">✉️</Text>
        </View>

        {errors.email && (
          <Text className="text-red-600 text-xs mt-1.5 ml-1">
            {errors.email.message}
          </Text>
        )}
      </View>

      {error && (
        <Text className="text-red-600 text-sm text-center font-medium bg-red-50 py-2.5 rounded-lg border border-red-100">
          {error}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="w-full py-4 bg-[#3b82f6] rounded-xl"
        disabled={loading}
      >
        <Text className="text-white text-center font-bold">
          {loading ? "ENVIANDO..." : "RECUPERAR CONTRASEÑA"}
        </Text>
      </TouchableOpacity>

      <View className="text-center text-sm text-slate-600 pt-2">
        <TouchableOpacity
          onPress={onSwitch}
          className="flex-row items-center justify-center gap-2"
        >
          <Text className="text-[#3b82f6] font-bold">
            ← Volver a Iniciar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
