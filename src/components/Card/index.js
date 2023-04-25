import { Text, View } from 'react-native';
import theme from '../../theme';
import formatarCentavosParaReal from '../../utils/formatCentavosToReal';

export const Card = props => {
  const { item } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        width: '100%',
        padding: 32,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text>{formatarCentavosParaReal(item.value)}</Text>
      <Text style={{ color: 'black' }}>{item.category}</Text>
    </View>
  );
};

export default Card;
