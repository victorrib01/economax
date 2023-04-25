import styled from 'styled-components/native';
import theme from '../../theme';

export const OutlineButton = styled.TouchableOpacity`
  width: 100%;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${theme.colors.primary};
  padding: 17px;
  align-items: center;
  justify-content: center;
`;
export const OutlineText = styled.Text`
  color: ${theme.colors.primary};
`;

export const DefaultButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  width: 100%;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  padding: 17px;
`;

export const DefaultText = styled.Text`
  color: ${theme.colors.textSecondary};
`;
