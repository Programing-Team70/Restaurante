import { View, ScrollView, Image, Text } from "react-native";
import { ResetPasswordForm } from "../components/ResetPasswordReset";
import { useNavigation } from "@react-navigation/native";
import logo from "../../../../assets/app-icon.jpeg";

export const ResetPasswordPage = ({ route }) => {
  const navigation = useNavigation();
  const { token } = route.params || {};

  if (!token) {
    navigation.navigate("Auth");
    return null;
  }

  const handleSuccess = () => {
    navigation.navigate("Auth");
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-6">
      <ScrollView className="w-full max-w-lg bg-white rounded-3xl shadow-lg border border-gray-100 p-12">
        <View className="flex justify-center mb-10">
          <Image source={logo} className="h-20 w-auto" resizeMode="contain" />
        </View>

        <View className="text-center mb-10">
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Restablecer Contraseña
          </Text>
          <Text className="text-slate-500 text-base">
            Por favor, ingresa tu nueva contraseña a continuación.
          </Text>
        </View>

        <ResetPasswordForm token={token} onSuccess={handleSuccess} />
      </ScrollView>
    </View>
  );
};
