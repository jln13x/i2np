import {
  HomeScreen,
  ResultScreen,
  SearchPageOrDatabaseScreen,
  UploadImageScreen,
} from '@/screens';
import { CreatePageScreen } from '@/screens/CreatePageScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticatedScreensStack } from '../types';

const Stack = createNativeStackNavigator<AuthenticatedScreensStack>();

export const AuthenticatedScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UploadImage"
        component={UploadImageScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchPageOrDatabase"
        component={SearchPageOrDatabaseScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CreatePage"
        component={CreatePageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
