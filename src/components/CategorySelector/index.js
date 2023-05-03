import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import Separator from '../Separator';
import { FlatList } from 'react-native';
import {
  assignCategory,
  getAllCategories,
  getUserCategories,
} from '../../screens/Private/Categories/services';
import { useAuth } from '../../contexts/auth';
import { useFocusEffect } from '@react-navigation/native';
import Input from '../Input';
import Button from '../Button';
import { SelectCard } from '../SelectCard';
import { AddCard } from '../AddCard';

const CategorySelector = props => {
  const { inputRef } = props;
  const { auth } = useAuth();

  const [category, setCategory] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [canBeRegisterCategories, setCanBeRegisterCategories] = useState([
    { id: 0, category: 'Carregando' },
  ]);
  const [registeredCategories, setRegisteredCategories] = useState([]);

  const filteredCategories = canBeRegisterCategories.filter(item => {
    if (category[category.length - 1] === ' ') {
      return item.category
        .toLowerCase()
        .includes(category.slice(1, category.length - 1).toLowerCase());
    }
    return item.category.toLowerCase().includes(category.toLowerCase());
  });

  // FUNÇÕES
  const handleInputChange = useCallback(value => {
    if (value.endsWith('  ')) {
      return;
    }
    setCategory(value);
  }, []);

  const handleRegister = useCallback(async () => {
    if (selectedItems.length === 0) return;
    await assignCategory({ id: auth.id, fetchData, selectedItems });
  }, [auth.id, fetchData, selectedItems]);

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

  // RENDERS
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

  const renderEmptyItem = useCallback(() => {
    const searchCategories = () => {
      const categoryInCanBeRegistered = filteredCategories.find(
        item => item.category.toLowerCase() === category.toLowerCase()
      );

      const categoryInRegistered = registeredCategories.find(
        item => item.category.toLowerCase() === category.toLowerCase()
      );

      if (!categoryInCanBeRegistered && !categoryInRegistered) {
        return 'add';
      } else if (categoryInRegistered) {
        return 'registered';
      } else {
        return 'unregistered';
      }
    };
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
  }, [category, fetchData]);

  // FETCHS
  const fetchAllCategories = useCallback(async () => {
    await getAllCategories(setCanBeRegisterCategories);
  }, []);

  const fetchUserCategories = useCallback(async () => {
    await getUserCategories(setRegisteredCategories, auth.id);
  }, [auth]);

  async function fetchData() {
    await fetchAllCategories();
    await fetchUserCategories();
  }

  function filterCategories() {
    const updatedCategories = canBeRegisterCategories
      .map(categoryItem => {
        // Verificar se a categoria está na lista de registeredCategories
        const isRegistered = registeredCategories.some(
          userCategoryItem =>
            userCategoryItem.category === categoryItem.category
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

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    if (registeredCategories.length > 0) filterCategories();
  }, [registeredCategories]);

  return (
    <View
      style={{
        width: '100%',
        height: '35%',
        justifyContent: 'space-around',
      }}
    >
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
    </View>
  );
};

export default CategorySelector;
