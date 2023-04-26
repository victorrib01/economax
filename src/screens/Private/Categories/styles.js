import styled from 'styled-components/native';

export const Form = styled.View`
  width: 100%;
  height: 30%;
  justify-content: space-around;
`;

export const Content = styled.View`
  width: 100%;
  height: 58%;
`;

export const Title = styled.Text`
  text-align: left;
  width: 100%;
  margin-vertical: 12px;
`;

// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerStyle: {
    paddingTop: StatusBar.currentHeight,
    borderWidth: 1,
  },
  inputStyle: {
    marginBottom: 12,
  },
  separatorStyle: {
    marginBottom: 5,
  },
  buttonStyle: {
    marginVertical: 12,
  },
});
