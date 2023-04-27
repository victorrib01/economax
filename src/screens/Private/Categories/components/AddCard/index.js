import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import theme from '../../../../../theme';
import api from '../../../../../infra/api';
import { useAuth } from '../../../../../contexts/auth';

export const AddCard = props => {
  const { category, setCategory, fetchData, inputRef } = props;
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);

  async function handleRegisterCategory() {
    if (category === '' || category.length === 0 || category === ' ') {
      setTimeout(() => inputRef.current.focus(), 500);

      return Alert.alert('Digite algo para registrar uma categoria');
    }
    setCategory(prev => prev.trim());
    setLoading(true);
    try {
      const response = await api.post('/cadastro_categorias', {
        id_usuario: auth.id,
        categoria: category.trim(),
      });

      const categoryId = response.data[0].id;

      if (categoryId) {
        const response = await api.post('/cadastro_categorias_usuario', {
          id_usuario: auth.id,
          categorias: [
            {
              id: categoryId,
            },
          ],
        });
        if (response.data.message === 'Categorias inseridas com sucesso!') {
          Alert.alert('Categoria cadastrada com sucesso!');
          setCategory('');
          fetchData();
        }
      }
      setLoading(false);
    } catch (err) {
      console.error(err);

      setLoading(false);
    }
  }

  return (
    <TouchableOpacity
      disabled={loading}
      onPress={handleRegisterCategory}
      style={{
        backgroundColor: theme.colors.white,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      }}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: theme.fontSize.small,
            padding: 8,
          }}
        >
          Registrar {category}
        </Text>
      )}
    </TouchableOpacity>
  );
};
