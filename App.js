import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';
import { Routes } from './src/routes/index';
import theme from './src/theme';
import UserProvider from './src/contexts/user';
import { ThemeProvider } from 'styled-components/native';
import Constants from 'expo-constants';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
export default function App() {
  console.log('EAS Project ID:', Constants.manifest.extra.EAS_PROJECT_ID);
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <UserProvider>
            <Routes />
          </UserProvider>
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
