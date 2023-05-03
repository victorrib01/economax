import api from '../../../infra/api';

export async function getAllCategories(setState) {
  try {
    const response = await api.get('/categorias_despesas_geral');
    const formattedDate = response.data.map(item => {
      return {
        id: item.id,
        category: item.categoria,
      };
    });
    setState(formattedDate);
  } catch (err) {
    console.error(err);
  }
}

export async function getUserCategories(setState, id) {
  try {
    const response = await api.post(
      '/busca_categorias_despesas_geral_usuario',
      {
        id_usuario: id,
      }
    );

    setState(
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

export async function assignCategory({ id, fetchData, selectedItems }) {
  try {
    const categorias = selectedItems.map(item => {
      return {
        id: item.id,
      };
    });

    const response = await api.post('/cadastro_categorias_usuario', {
      id_usuario: id,
      categorias,
    });

    await fetchData();

    return response;
  } catch (err) {
    console.error(err);
  }
}
