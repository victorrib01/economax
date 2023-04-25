import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import theme from '../../../../../theme';

export const AddCard = props => {
  const { category, setCategory } = props;

  function handleRegisterCategory() {
    setCategory(prev => prev.trim());
  }

  return (
    <TouchableOpacity
      onPress={handleRegisterCategory}
      style={{
        backgroundColor: theme.colors.white,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          color: theme.colors.primary,
          fontSize: theme.fontSize.small,
          padding: 8,
        }}
      >
        Registrar {category}
      </Text>
    </TouchableOpacity>
  );
};
