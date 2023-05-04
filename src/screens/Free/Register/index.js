import Input from '../../../components/Input';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { Buttons, Form } from './styles';
import Logo from '../../../assets/Logo.svg';
import Container from '../../../components/Container';
import { HidePassButton, HidePassText } from '../../../components/Input/styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import api from '../../../infra/api';
import { useAuth } from '../../../contexts/auth';

export default function Register() {
  const navigation = useNavigation();
  const { saveAuthData } = useAuth();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');

  const [hide, setHide] = useState(true);

  async function handleRegister() {
    try {
      if (pass === '' || repeatPass === '' || pass.length < 3)
        return Alert.alert(
          'Senhas invalida',
          'A senhas é invalida, tente novamente'
        );
      if (pass !== repeatPass)
        return Alert.alert(
          'Senhas diferentes',
          'A senhas não coincidem, tente novamente'
        );

      const response = await api.post('/cadastro', {
        usuario: user,
        senha: pass,
      });

      if (response.data['Message'] === 'Usuário cadastrado com sucesso!') {
        saveAuthData({ id: response.data['id'], user });
      } else {
        Alert.alert(response.data['Message'], 'Tenta novamente');
      }
    } catch (err) {
      console.error('handleRegister', err.toJSON());
    }
  }

  function handleGoBack() {
    navigation.navigate('Login');
  }

  return (
    <Container>
      <Logo />
      <Form>
        <Input
          label="usuário"
          value={user}
          autoCapitalize={'none'}
          setValue={text => setUser(text.replace(' ', '').toLowerCase())}
        />
        <Input
          label="senha"
          secureTextEntry={hide}
          value={pass}
          setValue={setPass}
        />
        <Input
          label="repita a senha"
          secureTextEntry={hide}
          value={repeatPass}
          setValue={setRepeatPass}
        />
        <HidePassButton onPress={() => setHide(!hide)}>
          <HidePassText>{hide ? 'Mostrar' : 'Esconder'} a senha</HidePassText>
          {hide ? (
            <Feather size={16} name="eye-off" />
          ) : (
            <Feather size={16} name="eye" />
          )}
        </HidePassButton>
      </Form>
      <Buttons>
        <Button title="Registrar" onPress={handleRegister} />
        <Button title="Voltar" outline onPress={handleGoBack} />
      </Buttons>
    </Container>
  );
}
