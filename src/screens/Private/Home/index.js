import { View, Text, TouchableOpacity } from 'react-native';

import { Input } from '../../../components/Input';
import { useState } from 'react';
import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Separator from '../../../components/Separator';
import theme from '../../../theme';
import { FlatList, StatusBar } from 'react-native';
import { Content, Form, Title } from './styles';
import Card from '../../../components/Card';
import { SelectCard } from '../Categories/components/SelectCard';

export default function Home() {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  const [data, setData] = useState([
    { id: 1, value: 20000, category: 'Moradia' },
    { id: 2, value: 50000, category: 'Aluguel' },
    { id: 3, value: 60000, category: 'Alimentação' },
    { id: 4, value: 90000, category: 'Balada' },
    { id: 5, value: 120000, category: 'Luz' },
  ]);

  const [showLastRecords, setShowsLastRecords] = useState(false);

  function handleRegister() {}

  const [canBeRegisterCategories, setCanBeRegisterCategories] = useState([
    { id: 1, category: 'Alimentação' },
    { id: 2, category: 'Moradia' },
    { id: 3, category: 'Luz' },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const toggleItem = item => {
    handleInputChange('');
    setSelectedItem(item.id);
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
        <TouchableOpacity onPress={() => setShowsLastRecords(!showLastRecords)}>
          <Title>Últimos 5 registros</Title>
        </TouchableOpacity>
        {showLastRecords ? (
          <FlatList
            data={data}
            contentContainerStyle={{
              gap: 12,
            }}
            scrollEnabled
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => {
              return <Card item={item} />;
            }}
          />
        ) : (
          <></>
        )}
      </Content>
    </Container>
  );
}
