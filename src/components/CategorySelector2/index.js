import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import Input from '../Input';
import { SelectCard } from '../SelectCard';
import Separator from '../Separator';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../infra/api';
import { useAuth } from '../../contexts/auth';
import { AddCard } from '../AddCard';
import theme from '../../theme';
import { assignCategory } from '../../screens/Private/Categories/services';

const CategorySelector2 = props => {
  const { category, setCategory, selectedItem, setSelectedItem } = props;
  const { auth } = useAuth();
  const categoryRef = useRef(null);

  const [categorySearch, setCategorySearch] = useState(false);

  // const [canBeRegisterCategories, setCanBeRegisterCategories] = useState([
  //   { id: 1, category: 'Alimentação' },
  //   { id: 2, category: 'Moradia' },
  //   { id: 3, category: 'Luz' },
  // ]);

  const [allCategories, setAllCategories] = useState([]);

  const filteredCategories = allCategories.filter(item =>
    item.category.toLowerCase().includes(category.toLowerCase())
  );
  const toggleItem = item => {
    handleInputChange(item.category);
    setSelectedItem(item.id);
    setCategorySearch(false);
  };
  const handleInputChange = value => {
    if (value.endsWith('  ')) {
      return;
    }
    setCategory(value);
  };

  function handleCategory() {
    if (categorySearch === false && category.length > 0) setCategory('');
    setTimeout(() => categoryRef.current.focus(), 100);
    setCategorySearch(true);
  }

  async function handleRegister(item) {
    let items = [
      {
        id: item.id,
      },
    ];
    const response = await assignCategory({
      id: auth.id,
      fetchData: getUserCategories,
      selectedItems: items,
    });
    if (response.data.message === 'Categorias inseridas com sucesso!') {
      Alert.alert(response.data.message);
    }
  }

  const renderItem = ({ item, index }) => {
    const isSelected = selectedItem === item.id;

    if (item.registered === false) {
      return (
        <TouchableOpacity onPress={() => handleRegister(item)}>
          <View
            style={{
              backgroundColor: theme.colors.gray,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}
          >
            <Text>{item.category} - Adicionar</Text>
          </View>
        </TouchableOpacity>
      );
    } else if (
      allCategories.filter(item => item.category === category).length === 0 &&
      category.length > 0 &&
      !allCategories.filter(item => item.category === category.trim()).length
    ) {
      return (
        <>
          <SelectCard
            isSelected={isSelected}
            toggleItem={toggleItem}
            item={{ ...item, registered: false }}
          />
          {index === filteredCategories.length - 1 && (
            <>
              <View style={{ marginTop: 20 }} />
              <AddCard
                category={category}
                setCategory={setCategory}
                fetchData={getUserCategories}
                // inputRef={inputRef}
              />
            </>
          )}
        </>
      );
    } else {
      return (
        <SelectCard
          isSelected={isSelected}
          toggleItem={toggleItem}
          item={{ ...item, registered: false }}
        />
      );
    }
  };
  const renderEmptyItem = () => {
    const searchCategories = () => {
      const categoryInCanBeRegistered = filteredCategories.find(
        item => item.category.toLowerCase() === category.toLowerCase()
      );

      if (!categoryInCanBeRegistered) {
        return 'add';
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
          fetchData={getUserCategories}
          // inputRef={inputRef}
        />
      );
    } else if (searchResult === 'unregistered') {
      return (
        <SelectCard
          toggleItem={() => {}}
          item={{ category: 'Sem categoria' }}
        />
      );
    }
  };

  async function getUserCategories() {
    try {
      const response = await api.post(
        '/busca_categorias_despesas_geral_usuario',
        {
          id_usuario: auth.id,
        }
      );
      const formatted = response.data.map(item => {
        return {
          category: item.categoria,
          id: item.id,
        };
      });
      // setCanBeRegisterCategories(formatted);
      getAllCategories(formatted);
    } catch (err) {
      console.error(err);
    }
  }
  async function getAllCategories(categories) {
    if (categories.length > 0) {
      try {
        const response = await api.get('/categorias_despesas_geral');
        const formatted = response.data.map(item => {
          // Verificar se a categoria está na lista de registeredCategories
          const isRegistered = categories.some(
            userCategoryItem => userCategoryItem.id == item.id
          );
          // Retornar um novo objeto com a propriedade "registered" atualizada
          return {
            id: item.id,
            category: item.categoria,
            registered: isRegistered,
          };
        });
        const sorted = formatted.sort((a, b) => b.registered - a.registered);
        setAllCategories(sorted);
      } catch (err) {
        console.error(err.toJSON());
      }
    } else {
      setTimeout(() => getAllCategories(), 200);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getUserCategories();
    }, [])
  );

  return (
    <>
      {categorySearch ? (
        <>
          <Input
            label="categoria"
            value={category}
            editable={categorySearch}
            setValue={handleInputChange}
            ref={categoryRef}
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
            ListEmptyComponent={renderEmptyItem}
          />
        </>
      ) : (
        <TouchableOpacity onPress={() => handleCategory()}>
          <Input
            label="categoria"
            value={category}
            editable={categorySearch}
            setValue={handleInputChange}
            style={{ marginBottom: 12 }}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default CategorySelector2;
