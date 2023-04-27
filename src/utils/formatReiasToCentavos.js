export default function reaisToCentavos(valorReais) {
  const valorCentavos = Math.round(valorReais * 100);
  return valorCentavos;
}
