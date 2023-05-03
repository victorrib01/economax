import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import theme from '../../theme';

export const SelectCard = props => {
  const { item, isSelected, toggleItem } = props;
  const selected = isSelected;

  return (
    <TouchableOpacity
      disabled={item.registered}
      onPress={() => toggleItem(item)}
      style={
        selected
          ? {
              backgroundColor: theme.colors.primary,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }
          : {
              backgroundColor: item.registered
                ? theme.colors.gray
                : theme.colors.white,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }
      }
    >
      <Text
        style={
          selected
            ? {
                color: theme.colors.white,
                fontSize: theme.fontSize.small,
                padding: 8,
              }
            : {
                color: theme.colors.primary,
                fontSize: theme.fontSize.small,
                padding: 8,
              }
        }
      >
        {item.category}
        {item.registered && ` - Registrado`}
      </Text>
    </TouchableOpacity>
  );
};
