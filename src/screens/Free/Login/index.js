import Input from '../../../components/Input';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { Buttons, Form } from './styles';
import Logo from '../../../assets/Logo.svg';
import { useAuth } from '../../../contexts/auth';
import Container from '../../../components/Container';
import { useNavigation } from '@react-navigation/native';
import api from '../../../infra/api';
import { Alert } from 'react-native';

export default function Login() {
  const { saveAuthData } = useAuth();
  const navigation = useNavigation();

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  async function handleLogin() {
    try {
      const response = await api.post('/login', {
        Usuario: user.trim(),
        Senha: pass,
      });
      if (response.data['Message'] === 'Usuário ou senha incorretos!')
        Alert.alert(response.data['Message'], 'Tente novamente.');
      if (response.data['Message'] === 'Usuário autenticado com sucesso!') {
        saveAuthData({ user, id: response.data['id_usuario'] });
      }
      console.log(response.data);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  function handleRegister() {
    navigation.navigate('Register');
  }

  return (
    <Container>
      <Logo />
      <Form>
        <Input label="usuário" value={user} setValue={setUser} />
        <Input label="senha" password value={pass} setValue={setPass} />
      </Form>
      <Buttons>
        <Button title="Entrar" onPress={handleLogin} />
        <Button title="Cadastrar" outline onPress={handleRegister} />
      </Buttons>
    </Container>
  );
}