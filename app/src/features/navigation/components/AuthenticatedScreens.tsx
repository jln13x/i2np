import { Header } from '@/components/Header';
import { useWorkspace } from '@/features/profile/use-workspace';
import {
  HomeScreen,
  ResultScreen,
  SearchPageOrDatabaseScreen,
  UploadImageScreen,
} from '@/screens';
import { CreatePageScreen } from '@/screens/CreatePageScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticatedScreensStack } from '../types';

const Stack = createNativeStackNavigator<AuthenticatedScreensStack>();

export const AuthenticatedScreens = () => {
  // prefetch workspace query
  useWorkspace();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => <Header />,
          animation: 'slide_from_left',
        }}
      />
      <Stack.Screen
        name="UploadImage"
        component={UploadImageScreen}
        options={{
          header: () => <Header />,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="SearchPageOrDatabase"
        component={SearchPageOrDatabaseScreen}
        options={{
          header: () => <Header />,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{
          header: () => <Header />,
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="CreatePage"
        component={CreatePageScreen}
        options={{
          header: () => <Header />,
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};
