import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Center } from 'native-base';
import { useAccessToken } from '../hooks/queries/use-access-token';
import { CreateSubpageScreen } from '../screens/CreateSubpage';
import { ImageScreen } from '../screens/ImageScreen';
import { LoginScreen as LoginScreen } from '../screens/LoginScreen';
import { NotionScreen } from '../screens/NotionScreen';
import { ResultScreen } from '../screens/ResultScreen';
import { Layout } from './Layout';
import { Spinner } from './Spinner';

declare global {
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

const Stack = createNativeStackNavigator();

export const Navigator = ({}) => {
  const { data: accessToken, isLoading: isLoadingAccessToken } =
    useAccessToken();

  if (isLoadingAccessToken)
    return (
      <Layout>
        <Center>
          <Spinner size="lg" />
        </Center>
      </Layout>
    );

  if (!accessToken) {
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
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Image"
        component={ImageScreen}
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
