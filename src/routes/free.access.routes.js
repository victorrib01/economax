import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Free/Login';
import Register from '../screens/Free/Register';

const Stack = createNativeStackNavigator();

export const FreeAccessRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
