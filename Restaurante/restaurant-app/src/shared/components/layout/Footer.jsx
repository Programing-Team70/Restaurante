import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ShieldCheck, HelpCircle } from 'lucide-react-native';

export const Footer = () => {
    return (
        <View className="w-full border-t border-gray-100 bg-white/50">            
            <ScrollView className="w-full py-5 px-5">
                <View className="gap-10 mb-5">
                    <View className="space-y-4">
                        <Text className="text-[#0a192f] font-bold text-sm uppercase tracking-widest">Soporte Técnico</Text>
                        <Text className="text-gray-500 text-sm leading-relaxed">
                            ¿Tienes problemas? Contacta a nuestro centro de asistencia técnica.
                        </Text>
                        <View className="flex-row items-center gap-2">
                            <HelpCircle size={16} color="#0a192f" />
                            <Text className="text-[#0a192f] text-sm font-medium">programingteam70@gmail.com</Text>
                        </View>
                    </View>
                    <View className="space-y-4">
                        <Text className="text-[#0a192f] font-bold text-sm uppercase tracking-widest">Seguridad</Text>
                        <View className="flex-row items-center gap-3">
                            <ShieldCheck size={20} color="#16a34a" />
                            <Text className="text-gray-500 text-sm">
                                Sesión protegida por cifrado de extremo a extremo.
                            </Text>
                        </View>
                    </View>
                    <View className="space-y-4">
                        <Text className="text-[#0a192f] font-bold text-sm uppercase tracking-widest">Sistema</Text>
                        <View className="flex-row items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100 self-start">
                            <View className="w-2 h-2 bg-green-500 rounded-full" />
                            <Text className="text-green-700 text-[10px] font-bold uppercase">Servidor: Online</Text>
                        </View>
                        <Text className="text-gray-400 text-[10px] mt-2">Versión 2.3.8</Text>
                    </View>
                </View>
                <View className="border-t border-gray-100 pt-4">
                    <Text className="text-gray-400 text-[10px] tracking-[0.2em] uppercase text-center">
                        © 2026 Heaven Flavor — Todos los derechos reservados.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};