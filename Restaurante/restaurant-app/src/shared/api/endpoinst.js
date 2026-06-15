export const ENDPOINTS = {
  RESTAURANT:
    process.env.EXPO_PUBLIC_RESTAURANT_URL ||
    "http://localhost:3021/heaven-flavor/rest",
  RESERVATION:
    process.env.EXPO_PUBLIC_RESERVATION_URL ||
    "http://localhost:3023/heaven-flavor/reser",
  EVENT:
    process.env.EXPO_PUBLIC_EVENT_URL ||
    "http://localhost:3022/heaven-flavor/even",
  REPORT:
    process.env.EXPO_PUBLIC_REPORT_URL ||
    "http://localhost:3024/heaven-flavor/even",
  AUTH: process.env.EXPO_PUBLIC_AUTH_URL || "http://localhost:5210/res/auth",
};

console.log("ENDPOINTS RESUELTOS:", ENDPOINTS);
