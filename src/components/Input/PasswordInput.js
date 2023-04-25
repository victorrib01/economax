import { useState } from 'react';
import {
  HidePassButton,
  HidePassText,
  PasswordContainer,
  PasswordInput,
} from './styles';

import { Feather } from '@expo/vector-icons';

export const InputPassword = props => {
  const [focus, setFocus] = useState(false);
  const [hide, setHide] = useState(true);
  return (
    <PasswordContainer testID="input-password">
      <PasswordInput
        placeholder={props.label}
        focus={focus}
        value={props.value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChangeText={props.setValue}
        secureTextEntry={hide}
      />
      <HidePassButton onPress={() => setHide(!hide)}>
        <HidePassText>{hide ? 'Mostrar' : 'Esconder'} a senha</HidePassText>
        {hide ? (
          <Feather size={16} name="eye-off" />
        ) : (
          <Feather size={16} name="eye" />
        )}
      </HidePassButton>
    </PasswordContainer>
  );
};

export default InputPassword;
