import { Input } from '../../../components/Input';
import { useCallback, useEffect, useRef, useState } from 'react';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Separator from '../../../components/Separator';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { Content, Form, Title } from './styles';
import { View } from 'react-native';
import theme from '../../../theme';
import { SelectCard } from './components/SelectCard';
import { AddCard } from './components/AddCard';
import api from '../../../infra/api';
import { useAuth } from '../../../contexts/auth';
import { styles } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import {
  assignCategory,
  getAllCategories,
  getUserCategories,
} from './services';
import emptyRegisteredComponent from './components/EmptyRegisteredComponent';

export default function Categories() {
  const { auth } = useAuth();
  const [category, setCategory] = useState('');
  const inputRef = useRef(null);

  const [canBeRegisterCategories, setCanBeRegisterCategories] = useState([
    { id: 0, category: 'Carregando' },
  ]);

  const filteredCategories = canBeRegisterCategories.filter(item => {
    if (category[category.length - 1] === ' ') {
      return item.category
        .toLowerCase()
        .includes(category.slice(1, category.length - 1).toLowerCase());
    }
    return item.category.toLowerCase().includes(category.toLowerCase());
  });
  const [registeredCategories, setRegisteredCategories] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const searchCategories = useCallback(() => {
    const categoryInCanBeRegistered = filteredCategories.find(
      item => item.category.toLowerCase() === category.toLowerCase()
    );

    const categoryInRegistered = registeredCategories.find(
      item => item.categoria.toLowerCase() === category.toLowerCase()
    );

    if (!categoryInCanBeRegistered && !categoryInRegistered) {
      return 'add';
    } else if (categoryInRegistered) {
      return 'registered';
    } else {
      return 'unregistered';
    }
  }, [category, filteredCategories, registeredCategories]);

  const toggleItem = useCallback(
    itemId => {
      const itemIndex = selectedItems.findIndex(item => item.id === itemId.id);
      if (itemIndex !== -1) {
        const updatedItems = [...selectedItems];
        updatedItems.splice(itemIndex, 1);
        setSelectedItems(updatedItems);
      } else {
        const newItem = filteredCategories.find(item => item.id === itemId.id);
        if (newItem) {
          setSelectedItems([...selectedItems, newItem]);
        }
      }

      setCategory('');
    },
    [filteredCategories, selectedItems]
  );

  const handleRegister = useCallback(async () => {
    if (selectedItems.length === 0) return;
    await assignCategory({ id: auth.id, fetchData, selectedItems });
  }, [auth.id, fetchData, selectedItems]);

  const renderEmptyCategoryItem = useCallback(() => {
    const searchResult = searchCategories();

    if (searchResult === 'add') {
      return (
        <AddCard
          category={category}
          setCategory={setCategory}
          fetchData={fetchData}
          inputRef={inputRef}
        />
      );
    } else if (searchResult === 'registered') {
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
          <Text>Categoria já registrada</Text>
        </View>
      );
    }
  }, [category, fetchData, searchCategories]);

  const handleInputChange = useCallback(value => {
    if (value.endsWith('  ')) {
      return;
    }
    setCategory(value);
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      const isSelected =
        selectedItems.findIndex(selectedItem => selectedItem.id === item.id) !==
        -1;

      if (
        canBeRegisterCategories.filter(item => item.category === category)
          .length === 0 &&
        category.length > 0 &&
        !canBeRegisterCategories.filter(
          item => item.category === category.trim()
        ).length
      )
        return (
          <>
            <SelectCard
              isSelected={isSelected}
              toggleItem={toggleItem}
              item={item}
            />
            <View style={{ marginTop: 20 }} />
            <AddCard
              category={category}
              setCategory={setCategory}
              fetchData={fetchData}
              inputRef={inputRef}
            />
          </>
        );

      return (
        <SelectCard
          isSelected={isSelected}
          toggleItem={toggleItem}
          item={item}
        />
      );
    },
    [canBeRegisterCategories, category, fetchData, selectedItems, toggleItem]
  );

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
        <Text>{item?.categoria}</Text>
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
          <Form>
            <Input
              label="categoria"
              value={category}
              setValue={handleInputChange}
              style={styles.inputStyle}
              ref={inputRef}
            />
            <Separator style={styles.separatorStyle} />

            <FlatList
              contentContainerStyle={{
                gap: 12,
              }}
              data={filteredCategories}
              renderItem={renderItem}
              keyExtractor={item => String(item.category)}
              extraData={selectedItems}
              ListEmptyComponent={renderEmptyCategoryItem}
            />

            <Button
              style={styles.buttonStyle}
              title="Cadastrar"
              onPress={handleRegister}
            />
          </Form>
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
