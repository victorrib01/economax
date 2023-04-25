import { OutlineButton, OutlineText } from './styles';

export const ButtonOutline = props => {
  return (
    <OutlineButton {...props} testID="button-outline" onPress={props.onPress}>
      <OutlineText>{props.title}</OutlineText>
    </OutlineButton>
  );
};

export default ButtonOutline;
