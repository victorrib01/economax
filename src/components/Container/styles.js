import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const ContainerComponent = styled.View`
  align-items: center;
  justify-content: center;
  min-height: ${Dimensions.get('screen').height}px;
  flex: 1;
  width: 100%;
  padding: 24px;
`;
