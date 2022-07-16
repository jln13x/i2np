import { AuthenticationLayer } from '@/features/auth/AuthenticationLayer';
import { nativeBaseTheme } from '@/lib/native-base-theme';
import { queryClient } from '@/lib/react-query';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { focusManager, onlineManager, QueryClientProvider } from 'react-query';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList {
      Login: undefined;
      Image: undefined;
      Notion: undefined;
      Result: undefined;
      CreateSubpage: undefined;
    }
  }
}

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    const { isConnected } = state;
    if (!isConnected) return;
    setOnline(true);
  });
});

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export default function App() {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <NativeBaseProvider theme={nativeBaseTheme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <SafeAreaProvider>
            <AuthenticationLayer />
          </SafeAreaProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
