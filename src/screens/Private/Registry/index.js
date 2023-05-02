import Container from '../../../components/Container';
import { FlatList, StatusBar } from 'react-native';
import { Content, Title } from './styles';
import Card from '../../../components/Card';

import { useCallback, useState } from 'react';
import { useAuth } from '../../../contexts/auth';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../../infra/api';

export default function Registry() {
  const { auth } = useAuth();
  const [data, setData] = useState([]);

  async function getLast5Records() {
    try {
      const response = await api.post('/ultimas_despesas_usuario', {
        id_usuario: auth.id,
        usuario: auth.user,
        dias: '30',
      });

      function parseDate(dateString) {
        const [date, time] = dateString.split(' ');
        const [year, month, day] = date.split('-').map(Number);
        const [hours, minutes, seconds] = time.split(':').map(Number);

        return new Date(year, month - 1, day, hours, minutes, seconds);
      }

      const sortedData = response.data
        .map(item => {
          return {
            data: parseDate(item.data),
            category: item.categoria,
            // MOCK
            value: item.valor,
            // value: Math.floor(Math.random() * (99999 - 50 + 1) + 50),
          };
        })
        .sort((a, b) => b.data - a.data);

      setData(sortedData);
    } catch (err) {
      console.error('getLast5Records', err.toJSON());
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLast5Records();
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
      <Content>
        <Title>Últimos 30 dias</Title>
        <FlatList
          data={data}
          contentContainerStyle={{
            gap: 12,
          }}
          scrollEnabled
          keyExtractor={item => String(item.data)}
          renderItem={({ item }) => {
            return <Card item={item} />;
          }}
        />
      </Content>
    </Container>
  );
}
