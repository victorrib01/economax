import Input from '../../../components/Input';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { Buttons, Form } from './styles';
import Logo from '../../../assets/Logo.svg';
import { useAuth } from '../../../contexts/auth';
import Container from '../../../components/Container';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const { saveAuthData } = useAuth();
  const navigation = useNavigation();

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  function handleLogin() {
    saveAuthData({ user, pass });
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
