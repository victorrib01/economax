import styled, { css } from 'styled-components/native';
import theme from '../../theme';

export const CustomInput = styled.TextInput`
  border-color: ${theme.colors.gray};
  border-width: 1px;
  border-radius: 19px;
  width: 100%;
  padding: 17px;
  text-align: center;
  color: ${theme.colors.primary};
  ${({ focus }) =>
    focus
      ? css`
          border-color: ${theme.colors.primary};
        `
      : css`
          border-color: ${theme.colors.gray};
        `}
`;

export const PasswordContainer = styled.View``;

export const PasswordInput = styled.TextInput`
  border-color: ${theme.colors.gray};
  border-width: 1px;
  border-radius: 19px;
  width: 100%;
  padding: 17px;
  text-align: center;
  color: ${theme.colors.primary};
  ${({ focus }) =>
    focus
      ? css`
          border-color: ${theme.colors.primary};
        `
      : css`
          border-color: ${theme.colors.gray};
        `}
`;

export const HidePassButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const HidePassText = styled.Text`
  margin-right: 10px;
  font-weight: bold;
  font-size: ${theme.fontSize.medium}px;
`;
