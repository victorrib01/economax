import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';
import { Routes } from './src/routes/index';
import theme from './src/theme';
import UserProvider from './src/contexts/user';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <UserProvider>
            <StatusBar backgroundColor="black" style="inverted" />
            <Routes />
          </UserProvider>
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
