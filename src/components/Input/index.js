import React, { useState } from 'react';
import { CustomInput } from './styles';
import { InputPassword } from './PasswordInput';

export const Input = React.forwardRef((props, ref) => {
  const [focus, setFocus] = useState(false);

  if (props.password) return <InputPassword {...props} />;

  return (
    <CustomInput
      style={{
        borderWidth: 1,
      }}
      placeholder={props.label}
      focus={focus}
      value={props.value}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onChangeText={props.setValue}
      onSubmitEditing={props.onSubmitEditing}
      ref={ref}
      {...props}
    />
  );
});

export default Input;
