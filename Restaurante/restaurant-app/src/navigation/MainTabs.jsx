import React from "react";
import { Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";

import { useAuthStore } from "../features/auth/store/AuthStore.js"; 
import { MainPage } from "../shared/pages/MainPage.jsx";
import { RestaurantsPage } from "../features/restaurant/pages/RestaurantPage.jsx";
import { TablePage } from "../features/table/pages/TablePage.jsx";
import { MenuPage } from "../features/menu/pages/MenuPage.jsx";
import { OrderPage } from "../features/order/pages/OrderPage.jsx";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RestaurantStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RestaurantsList" component={RestaurantsPage} />
  </Stack.Navigator>
);

const TableStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TableList" component={TablePage} />
  </Stack.Navigator>
);

const MenuStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MenuList" component={MenuPage} />
  </Stack.Navigator>
);

const OrderStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="OrderList" component={OrderPage} />
  </Stack.Navigator>
);

const EmptyComponent = () => null;

const MainTabs = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Está seguro de que desea salir de Heaven Flavor?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Salir", 
          style: "destructive", 
          onPress: () => {
            logout();
          } 
        }
      ]
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "MainTab") {
            iconName = "home";
          } else if (route.name === "RestaurantTab") {
            iconName = "restaurant";
          } else if (route.name === "TableTab") {
            iconName = "table-bar";
          } else if (route.name === "MenuTab") {
            iconName = "restaurant-menu";
          } else if (route.name === "OrderTab") {
            iconName = "receipt";
          } else if (route.name === "LogoutTab") {
            iconName = "logout"; 
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0a192f",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 60,
          borderTopColor: "#e2e8f0",
          borderTopWidth: 1,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="MainTab"
        component={MainPage}
        options={{ title: "Principal" }}
      />
      <Tab.Screen
        name="RestaurantTab"
        component={RestaurantStack}
        options={{ title: "Restaurantes" }}
      />
      <Tab.Screen
        name="TableTab"
        component={TableStack}
        options={{ title: "Mesas" }}
      />
      <Tab.Screen
        name="MenuTab"
        component={MenuStack}
        options={{ title: "Menú" }}
      />
      <Tab.Screen
        name="OrderTab"
        component={OrderStack}
        options={{ title: "Órdenes" }}
      />
      
      <Tab.Screen
        name="LogoutTab"
        component={EmptyComponent}
        options={{ title: "Salir" }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault(); 
            handleLogout();
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;