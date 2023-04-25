import Input from '../../../components/Input';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { Buttons, Form } from './styles';
import Logo from '../../../assets/Logo.svg';
import Container from '../../../components/Container';
import { HidePassButton, HidePassText } from '../../../components/Input/styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');

  const [hide, setHide] = useState(true);

  function handleRegister() {
    navigation.navigate('Register');
  }

  function handleRegister() {
    navigation.navigate('Login');
  }

  return (
    <Container>
      <Logo />
      <Form>
        <Input label="usuário" value={user} setValue={setUser} />
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
        <Button title="Registar" onPress={handleRegister} />
        <Button title="Voltar" outline onPress={handleGoBack} />
      </Buttons>
    </Container>
  );
}
