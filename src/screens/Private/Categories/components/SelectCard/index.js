import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import theme from '../../../../../theme';

export const SelectCard = props => {
  const { item, isSelected, toggleItem } = props;
  const selected = isSelected;

  return (
    <TouchableOpacity
      onPress={() => toggleItem(item.id)}
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
              backgroundColor: theme.colors.white,
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
      </Text>
    </TouchableOpacity>
  );
};
