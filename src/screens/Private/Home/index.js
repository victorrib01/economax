import { View, Text, TouchableOpacity, Alert } from 'react-native';

import { Input } from '../../../components/Input';
import { useCallback, useEffect, useRef, useState } from 'react';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Separator from '../../../components/Separator';
import theme from '../../../theme';
import { FlatList, StatusBar } from 'react-native';
import { Content, Form, Title } from './styles';
import Card from '../../../components/Card';
import { SelectCard } from '../Categories/components/SelectCard';
import api from '../../../infra/api';
import { useAuth } from '../../../contexts/auth';
import { useUser } from '../../../contexts/user';
import { useFocusEffect } from '@react-navigation/native';
import reaisToCentavos from '../../../utils/formatReiasToCentavos';
import { RefreshControl } from 'react-native';

export default function Home() {
  const { auth } = useAuth();
  const { userCategories } = useUser();

  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [categorySearch, setCategorySearch] = useState(false);

  const categoryRef = useRef(null);

  const [data, setData] = useState([]);

  const [showLastRecords, setShowsLastRecords] = useState(true);

  const [canBeRegisterCategories, setCanBeRegisterCategories] = useState([
    { id: 1, category: 'Alimentação' },
    { id: 2, category: 'Moradia' },
    { id: 3, category: 'Luz' },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  async function handleRegister() {
    if (!reaisToCentavos(value) || !selectedItem)
      return Alert.alert('Preencha todos os campos!');
    try {
      const response = await api.post('/cadastro_gastos_usuario', {
        id_usuario: auth.id,
        gastos: [
          {
            id_categoria: selectedItem,
            valor: `${reaisToCentavos(value)}`,
          },
        ],
      });
      if (response.data.message === 'Gastos inseridos com sucesso!') {
        Alert.alert('Gasto inserido com sucesso!');
        setValue('');
        setCategory('');
        setSelectedItem(null);
        getLast5Records();
      }
    } catch (error) {
      console.error(error);
    }
  }
  const toggleItem = item => {
    handleInputChange(item.category);
    setSelectedItem(item.id);
    setCategorySearch(false);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedItem === item.id;
    return (
      <SelectCard isSelected={isSelected} toggleItem={toggleItem} item={item} />
    );
  };

  const filteredCategories = canBeRegisterCategories.filter(item =>
    item.category.toLowerCase().includes(category.toLowerCase())
  );

  const renderEmptyItem = () => {
    return (
      <SelectCard toggleItem={() => {}} item={{ category: 'Sem categoria' }} />
    );
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

  async function getLast5Records() {
    try {
      const response = await api.post('/ultimas_despesas_usuario', {
        id_usuario: auth.id,
        Usuario: auth.user,
      });

      function parseDate(dateString) {
        const [date, time] = dateString.split(' ');
        const [year, month, day] = date.split('/').map(Number);
        const [hours, minutes, seconds] = time.split(':').map(Number);

        return new Date(year, month - 1, day, hours, minutes, seconds);
      }

      const sortedData = response.data
        .map(item => {
          return {
            data: parseDate(item.data),
            category: item.categoria,
            // MOCK
            value: Math.floor(Math.random() * (99999 - 50 + 1) + 50),
          };
        })
        .sort((a, b) => b.data - a.data);

      setData(sortedData);
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getLast5Records();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getLast5Records();
      getUserCategories();
    }, [])
  );

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
          keyboardType="decimal-pad"
          label="valor"
          value={value}
          setValue={setValue}
          style={{ marginBottom: 12 }}
        />
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

        <Button
          style={{ marginVertical: 12 }}
          title="Cadastrar"
          onPress={handleRegister}
        />
      </Form>

      <Separator />
      <Content>
        {/* <TouchableOpacity onPress={() => setShowsLastRecords(!showLastRecords)}> */}
        <Title>Últimos 5 registros</Title>
        {/* </TouchableOpacity> */}
        {showLastRecords ? (
          <FlatList
            data={data}
            contentContainerStyle={{
              gap: 12,
            }}
            scrollEnabled
            keyExtractor={item => String(item.value)}
            renderItem={({ item }) => {
              return <Card item={item} />;
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => (
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: theme.fontSize.medium,
                  textAlign: 'center',
                }}
              >
                Sem últimos registros, cadastre um para começar
              </Text>
            )}
          />
        ) : (
          <></>
        )}
      </Content>
    </Container>
  );
}
