import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ContainerComponent } from './styles';

export const Container = props => {
  if (props.noScroll)
    return <ContainerComponent {...props}>{props.children}</ContainerComponent>;
  return (
    <KeyboardAwareScrollView testID="keyboard-aware-scrollview">
      <ContainerComponent {...props}>{props.children}</ContainerComponent>
    </KeyboardAwareScrollView>
  );
};

export default Container;
