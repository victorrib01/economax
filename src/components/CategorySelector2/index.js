import { FlatList, TouchableOpacity, View } from 'react-native';
import Input from '../Input';
import { SelectCard } from '../SelectCard';
import Separator from '../Separator';
import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../infra/api';
import { useAuth } from '../../contexts/auth';
import { AddCard } from '../AddCard';

const CategorySelector2 = props => {
  const { category, setCategory, selectedItem, setSelectedItem } = props;
  const { auth } = useAuth();
  const categoryRef = useRef(null);

  const [categorySearch, setCategorySearch] = useState(false);

  const [canBeRegisterCategories, setCanBeRegisterCategories] = useState([
    { id: 1, category: 'Alimentação' },
    { id: 2, category: 'Moradia' },
    { id: 3, category: 'Luz' },
  ]);

  const filteredCategories = canBeRegisterCategories.filter(item =>
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

  const renderItem = ({ item }) => {
    const isSelected = selectedItem === item.id;

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
            fetchData={getUserCategories}
            // inputRef={inputRef}
          />
        </>
      );
    return (
      <SelectCard isSelected={isSelected} toggleItem={toggleItem} item={item} />
    );
  };
  const renderEmptyItem = useCallback(() => {
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
  }, [category, filteredCategories]);

  async function getUserCategories() {
    try {
      const response = await api.post(
        '/busca_categorias_despesas_geral_usuario',
        {
          id_usuario: auth.id,
        }
      );
      setCanBeRegisterCategories(
        response.data.map(item => {
          return {
            category: item.categoria,
            id: item.id,
          };
        })
      );
    } catch (err) {
      console.error(err);
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
