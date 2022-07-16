import { CreateSubpageScreen } from '@/screens/CreateSubpage';
import { HomeScreen } from '@/screens/HomeScreen';
import { NotionScreen } from '@/screens/NotionScreen';
import { ResultScreen } from '@/screens/ResultScreen';
import { UploadImageScreen } from '@/screens/UploadImageScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

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
        name="Image"
        component={UploadImageScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notion"
        component={NotionScreen}
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
        name="CreateSubpage"
        component={CreateSubpageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
