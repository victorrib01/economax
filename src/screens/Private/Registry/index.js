import Container from '../../../components/Container';
import { FlatList, StatusBar } from 'react-native';
import { Content, Title } from './styles';
import Card from '../../../components/Card';

import { useState } from 'react';

export default function Registry() {
  const [data, setData] = useState([
    { id: 1, value: 20000, category: 'Moradia' },
    { id: 2, value: 50000, category: 'Aluguel' },
    { id: 3, value: 60000, category: 'Alimentação' },
    { id: 4, value: 90000, category: 'Balada' },
    { id: 5, value: 120000, category: 'Luz' },
    { id: 12, value: 20000, category: 'Moradia' },
    { id: 22, value: 50000, category: 'Aluguel' },
    { id: 32, value: 60000, category: 'Alimentação' },
    { id: 42, value: 90000, category: 'Balada' },
    { id: 52, value: 120000, category: 'Luz' },
  ]);

  return (
    <Container
      noScroll
      style={{
        paddingTop: StatusBar.currentHeight,
        borderWidth: 1,
      }}
    >
      <Content>
        <Title>Categorias cadastrados</Title>
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
      </Content>
    </Container>
  );
}
