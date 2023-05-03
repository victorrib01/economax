import Container from '../../../components/Container';
import { FlatList, StatusBar, Text } from 'react-native';
import { Content, Title } from './styles';
import Card from '../../../components/Card';

import { useAuth } from '../../../contexts/auth';
import Button from '../../../components/Button';
import { View } from 'react-native';
import Constants from 'expo-constants';
import CategorySelector from '../../../components/CategorySelector';
import { storeData } from '../../../storages/userStorage';
export default function Profile() {
  const { auth, deleteAuthData } = useAuth();

  function handleSignOut() {
    deleteAuthData();
    storeData(null);
  }

  return (
    <Container
      noScroll
      style={{
        paddingTop: StatusBar.currentHeight,
        borderWidth: 1,
      }}
    >
      {/* <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '90%',
        }}
      >
        <Title>ID: {auth.id}</Title>
        <Title>Usuario: {auth.user}</Title>
        <Button title="Sair" onPress={handleSignOut} />
        <Text>Versão: {Constants.expoConfig.extra.VERSION}</Text>
      </View> */}
      <CategorySelector />
    </Container>
  );
}
