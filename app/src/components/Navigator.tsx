import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Center } from "native-base";
import { useAccessToken } from "../hooks/queries/use-access-token";
import { useSelectedResult } from "../hooks/stores/use-selected-result";
import { useSelectedText } from "../hooks/stores/use-selected-text";
import { HomeScreen } from "../screens/HomeScreen";
import { ImageScreen } from "../screens/ImageScreen";
import { NotionScreen } from "../screens/NotionScreen";
import { ResultScreen } from "../screens/ResultScreen";
import { Layout } from "./Layout";
import { Spinner } from "./Spinner";

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Image: undefined;
      Notion: undefined;
      Result: undefined;
    }
  }
}

const Stack = createNativeStackNavigator();

export const Navigator = ({}) => {
  const { data: accessToken, isLoading: isLoadingAccessToken } =
    useAccessToken();

  const { selectedResult } = useSelectedResult();

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
          name="Home"
          component={HomeScreen}
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
    </Stack.Navigator>
  );
};
