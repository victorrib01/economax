import { Text, View } from 'react-native';
import theme from '../../../../../theme';

const emptyRegisteredComponent = () => (
  <View
    style={{
      backgroundColor: theme.colors.white,
      width: '100%',
      padding: 32,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text
      style={{
        textAlign: 'center',
      }}
    >
      Sem categorias, tente cadastrar uma para começar
    </Text>
  </View>
);

export default emptyRegisteredComponent;
