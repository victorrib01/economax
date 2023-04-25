import { View } from 'react-native';
import theme from '../../theme';

export const Separator = props => {
  return (
    <View
      style={{
        ...props.style,
        width: '100%',
        height: 1,
        backgroundColor: theme.colors.lightBlue,
      }}
    />
  );
};

export default Separator;
