import { LoginScreen } from '@/screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UnauthenticatedScreensStack } from '../types';

const Stack = createNativeStackNavigator<UnauthenticatedScreensStack>();

export const UnauthenticatedScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
