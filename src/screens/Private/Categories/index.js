import { useCallback, useEffect, useRef, useState } from 'react';
import Container from '../../../components/Container';
import Separator from '../../../components/Separator';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { Content, Title } from './styles';
import { View } from 'react-native';
import theme from '../../../theme';
import { useAuth } from '../../../contexts/auth';
import { styles } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import { getAllCategories, getUserCategories } from './services';
import emptyRegisteredComponent from './components/EmptyRegisteredComponent';
import CategorySelector from '../../../components/CategorySelector';

export default function Categories() {
  const { auth } = useAuth();
  const inputRef = useRef(null);

  const [canBeRegisterCategories, setCanBeRegisterCategories] = useState([
    { id: 0, category: 'Carregando' },
  ]);

  const [registeredCategories, setRegisteredCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const renderRegisteredItem = useCallback(({ item }) => {
    return (
      <View
        style={{
          backgroundColor: theme.colors.white,
          width: '100%',
          padding: 32,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>{item?.category}</Text>
      </View>
    );
  }, []);

  const renderEmptyRegisteredComponent = useCallback(
    emptyRegisteredComponent(),
    []
  );

  const fetchAllCategories = useCallback(async () => {
    await getAllCategories(setCanBeRegisterCategories);
  }, []);

  const fetchUserCategories = useCallback(async () => {
    await getUserCategories(setRegisteredCategories, auth.id);
  }, [auth]);

  function filterCategories() {
    const updatedCategories = canBeRegisterCategories
      .map(categoryItem => {
        // Verificar se a categoria está na lista de registeredCategories
        const isRegistered = registeredCategories.some(
          userCategoryItem =>
            userCategoryItem.categoria === categoryItem.category
        );

        // Retornar um novo objeto com a propriedade "registered" atualizada
        return {
          ...categoryItem,
          registered: isRegistered,
        };
      })
      .sort((a, b) => a.registered - b.registered);

    setCanBeRegisterCategories(updatedCategories);
  }

  async function fetchData() {
    setLoading(true);
    await fetchAllCategories();
    await fetchUserCategories();
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    filterCategories();
  }, [registeredCategories]);

  return (
    <Container noScroll style={styles.containerStyle}>
      {!loading ? (
        <>
          <CategorySelector
            inputRef={inputRef}
            fetchAfterRegister={fetchData}
          />
          <Separator />
          <Content>
            <Title>Categorias cadastradas</Title>
            <FlatList
              data={registeredCategories}
              contentContainerStyle={{
                gap: 12,
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              scrollEnabled
              keyExtractor={item => String(item.id)}
              renderItem={renderRegisteredItem}
              ListEmptyComponent={renderEmptyRegisteredComponent}
            />
          </Content>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </Container>
  );
}
