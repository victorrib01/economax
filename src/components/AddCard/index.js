import { useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { useAuth } from '../../contexts/auth';
import api from '../../infra/api';
import theme from '../../theme';

export const AddCard = props => {
  const { category, setCategory, fetchData, setSelectedItem } = props;
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);

  async function handleRegisterCategory() {
    if (category === '' || category.length === 0 || category === ' ') {
      return Alert.alert('Digite algo para registrar uma categoria');
    }
    setCategory(prev => prev.trim());
    setLoading(true);
    try {
      const response = await api.post('/cadastro_categorias', {
        id_usuario: auth.id,
        categoria: category.trim(),
      });

      let categoryId = response.data.id;

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
          setCategorySearch(false);

          fetchData().then(() => {
            setSelectedItem(categoryId);
          });
        }
      }
      setLoading(false);
    } catch (err) {
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
