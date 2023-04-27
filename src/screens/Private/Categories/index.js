import { Input } from '../../../components/Input';
import { useCallback, useEffect, useRef, useState } from 'react';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Separator from '../../../components/Separator';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Content, Form, Title } from './styles';
import { View } from 'react-native';
import theme from '../../../theme';
import { SelectCard } from './components/SelectCard';
import { AddCard } from './components/AddCard';
import api from '../../../infra/api';
import { useAuth } from '../../../contexts/auth';
import { useUser } from '../../../contexts/user';
import { styles } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl } from 'react-native';

export default function Categories() {
  const { auth } = useAuth();
  const { setUserCategories } = useUser();
  const [category, setCategory] = useState('');
  const inputRef = useRef(null);

  const [canBeRegisterCategories, setCanBeRegisterCategories] = useState([
    { id: 0, category: 'Carregando' },
  ]);

  const filteredCategories = canBeRegisterCategories.filter(item => {
    // console.log(category[category.length - 1] === ' ');
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
  }, []);

  const searchCategories = () => {
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
  };

  const toggleItem = itemId => {
    const itemIndex = selectedItems.findIndex(item => item.id === itemId.id);
    if (itemIndex !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems.splice(itemIndex, 1);
      setSelectedItems(updatedItems);
    } else {
      const newItem = canBeRegisterCategories.find(
        item => item.id === itemId.id
      );
      if (newItem) {
        setSelectedItems([...selectedItems, newItem]);
      }
    }

    setCategory('');
  };

  async function handleRegister() {
    if (selectedItems.length == 0) return;
    try {
      const categorias = selectedItems.map(item => {
        return {
          id: item.id,
        };
      });

      const response = await api.post('/cadastro_categorias_usuario', {
        id_usuario: auth.id,
        categorias,
      });

      console.log(response.data);
      await getAllCategories();
      await getUserCategories();
    } catch (err) {
      console.error(err);
    }
  }

  const renderEmptyItem = () => {
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
  };

  const handleInputChange = value => {
    if (value.endsWith('  ')) {
      return;
    }
    setCategory(value);
  };

  const renderItem = ({ item }) => {
    const isSelected =
      selectedItems.findIndex(selectedItem => selectedItem.id === item.id) !==
      -1;

    if (
      canBeRegisterCategories.filter(item => item.category === category)
        .length === 0 &&
      category.length > 0 &&
      !canBeRegisterCategories.filter(item => item.category === category.trim())
        .length
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
      <SelectCard isSelected={isSelected} toggleItem={toggleItem} item={item} />
    );
  };

  const renderRegisteredItem = ({ item }) => {
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
  };

  const renderEmptyComponent = () => (
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

  async function getAllCategories() {
    try {
      const response = await api.get('/categorias_despesas_geral');
      setCanBeRegisterCategories(
        response.data.map(item => {
          return {
            id: item.id,
            category: item.categoria,
          };
        })
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function getUserCategories() {
    try {
      const response = await api.post(
        '/busca_categorias_despesas_geral_usuario',
        {
          id_usuario: auth.id,
        }
      );
      setUserCategories(response.data);
      setRegisteredCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  function filterCategories() {
    const filtered = canBeRegisterCategories.filter(
      categoryItem =>
        !registeredCategories.some(
          userCategoryItem =>
            userCategoryItem.categoria === categoryItem.category
        )
    );

    setCanBeRegisterCategories(filtered);
  }

  async function fetchData() {
    setLoading(true);
    await getAllCategories();
    await getUserCategories();
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
              ListEmptyComponent={renderEmptyItem}
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
              ListEmptyComponent={renderEmptyComponent}
            />
          </Content>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </Container>
  );
}
