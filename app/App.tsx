import { AuthenticationLayer } from '@/features/auth/AuthenticationLayer';
import { nativeBaseTheme } from '@/lib/native-base-theme';
import { queryClient } from '@/lib/react-query';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { focusManager, onlineManager, QueryClientProvider } from 'react-query';

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
          <AuthenticationLayer />
        </NavigationContainer>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
