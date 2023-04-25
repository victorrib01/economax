import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';
import { Routes } from './src/routes/index';
import theme from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
