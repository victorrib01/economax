import { Input } from '../../../components/Input';
import { useEffect, useState } from 'react';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Separator from '../../../components/Separator';
import { FlatList, StatusBar, Text, TouchableOpacity } from 'react-native';
import { Content, Form, Title } from './styles';
import { View } from 'react-native';
import theme from '../../../theme';
import { SelectCard } from './components/SelectCard';
import { AddCard } from './components/AddCard';
import api from '../../../infra/api';
import { useAuth } from '../../../contexts/auth';

export default function Categories() {
  const { auth } = useAuth();
  const [category, setCategory] = useState('');

  const [canBeRegisterCategories, setCanBeRegisterCategories] = useState([
    { id: 0, category: 'Carregando' },
  ]);

  const [registeredCategories, setRegisteredCategories] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = itemId => {
    const itemIndex = selectedItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems.splice(itemIndex, 1);
      console.log(updatedItems);
      setSelectedItems(updatedItems);
    } else {
      const newItem = canBeRegisterCategories.find(item => item.id === itemId);
      if (newItem) {
        console.log([...selectedItems, newItem]);

        setSelectedItems([...selectedItems, newItem]);
      }
    }
  };

  const filteredCategories = canBeRegisterCategories.filter(item =>
    item.category.toLowerCase().includes(category.toLowerCase())
  );

  const renderEmptyItem = () => {
    return <AddCard category={category} setCategory={setCategory} />;
  };

  const handleInputChange = value => {
    if (value.endsWith('  ')) {
      return;
    }
    setCategory(value);
  };

  function handleRegister() {}

  async function getAllCategories() {
    try {
      const response = await api.get('/categorias_despesas_geral');
      const formatted = response.data.map(item => {
        return {
          id: item.id,
          category: item.categoria,
        };
      });
      setCanBeRegisterCategories(formatted);
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
      setRegisteredCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getAllCategories();
    getUserCategories();
  }, []);

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  return (
    <Container
      noScroll
      style={{
        paddingTop: StatusBar.currentHeight,
        borderWidth: 1,
      }}
    >
      <Form>
        <Input
          label="categoria"
          value={category}
          setValue={handleInputChange}
          style={{ marginBottom: 12 }}
        />
        <Separator style={{ marginBottom: 5 }} />

        <FlatList
          contentContainerStyle={{
            gap: 12,
          }}
          data={filteredCategories}
          renderItem={({ item }) => {
            const isSelected =
              selectedItems.findIndex(
                selectedItem => selectedItem.id === item.id
              ) !== -1;

            return (
              <SelectCard
                isSelected={isSelected}
                toggleItem={toggleItem}
                item={item}
              />
            );
          }}
          keyExtractor={item => String(item.id)}
          extraData={selectedItems}
          ListEmptyComponent={renderEmptyItem}
        />

        <Button
          style={{ marginVertical: 12 }}
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
          scrollEnabled
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: theme.colors.white,
                width: '100%',
                padding: 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>teste</Text>
            </View>
          )}
          ListEmptyComponent={() => (
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
          )}
        />
      </Content>
    </Container>
  );
}
