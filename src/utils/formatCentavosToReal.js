export default function formatarCentavosParaReal(centavos) {
  const valorEmReais = centavos / 100;
  const formatador = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatador.format(valorEmReais);
}
