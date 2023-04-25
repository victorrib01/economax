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

export default function Categories() {
  const [category, setCategory] = useState('');

  const [canBeRegisterCategories, setCanBeRegisterCategories] = useState([
    { id: 1, category: 'Alimentação' },
    { id: 2, category: 'Moradia' },
    { id: 3, category: 'Luz' },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = itemId => {
    setSelectedItems(prevState => {
      const itemIndex = prevState.findIndex(item => item.id === itemId);

      if (itemIndex !== -1) {
        const updatedItems = [...prevState];
        updatedItems.splice(itemIndex, 1);
        return updatedItems;
      } else {
        const newItem = canBeRegisterCategories.find(
          item => item.id === itemId
        );
        return [...prevState, newItem];
      }
    });
  };

  const renderItem = ({ item }) => {
    const isSelected =
      selectedItems.findIndex(selectedItem => selectedItem.id === item.id) !==
      -1;

    return (
      <SelectCard isSelected={isSelected} toggleItem={toggleItem} item={item} />
    );
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
          renderItem={renderItem}
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
        <Title>Últimos 5 registros</Title>
        <FlatList
          data={[{ id: 1 }]}
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
        />
      </Content>
    </Container>
  );
}
