import Home from '../screens/Private/Home';
import Categories from '../screens/Private/Categories';
import Registry from '../screens/Private/Registry';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Private/Profile';
import theme from '../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const PrivateAccessRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,

          tabBarLabel: 'Categorias',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ballot" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Registry"
        component={Registry}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,

          tabBarLabel: 'Registros',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
