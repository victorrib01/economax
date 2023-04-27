export default function reaisToCentavos(valorReais) {
  let value = valorReais.replace(',', '.');
  const valorCentavos = Math.round(value * 100);
  return valorCentavos;
}
