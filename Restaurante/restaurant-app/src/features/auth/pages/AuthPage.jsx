import { useState } from "react";
import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPassword";
import logo from "../../../../assets/app-icon.jpeg";

export const AuthPage = () => {
  const [isForgot, setIsForgot] = useState(false);

  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-6">
      <ScrollView className="w-full max-w-lg bg-white rounded-3xl shadow-lg border border-gray-100 p-10" contentContainerStyle={{ padding: 10 }}>
        <View className="flex justify-center items-center mb-10">
          <Image source={logo} className="h-32 w-32 rounded-2xl" resizeMode="contain" />
        </View>

        <View className="text-center items-center mb-10">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            {isForgot ? "Recuperar Acceso" : "Acceso Seguro"}
          </Text>
          <Text className="text-slate-500 text-base text-center items-center">
            {isForgot
              ? "Introduce tu correo electrónico"
              : "Introduce tus credenciales de administrador"}
          </Text>
        </View>

        {isForgot ? (
          <ForgotPasswordForm onSwitch={() => setIsForgot(false)} />
        ) : (
          <LoginForm onForgot={() => setIsForgot(true)} />
        )}

        {!isForgot && (
          <View className="mt-8 text-center">
            <TouchableOpacity
              onPress={() => setIsForgot(true)}
              className="py-2"
            >
              <Text className="text-[#3b82f6] font-bold text-center items-center">
                ¿Olvidaste tu contraseña? Recupérala aquí
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
