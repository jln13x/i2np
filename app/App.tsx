import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, theme } from "native-base";
import { useEffect } from "react";
import { AppState, AppStateStatus, Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  focusManager,
  MutationCache,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Navigator } from "./src/components/Navigator";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    const { isConnected } = state;
    if (!isConnected) return;
    setOnline(true);
  });
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {},
  },
});

export default function App() {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <SafeAreaProvider>
            <Navigator />
          </SafeAreaProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
