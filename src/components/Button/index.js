import ButtonOutline from './outline';
import { DefaultButton, DefaultText } from './styles';

export const Button = props => {
  if (props.outline) return <ButtonOutline {...props} />;
  return (
    <DefaultButton {...props} onPress={props.onPress}>
      <DefaultText>{props.title}</DefaultText>
    </DefaultButton>
  );
};

export default Button;
