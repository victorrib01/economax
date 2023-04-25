import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import Container from '.';

describe('Container', () => {
  it('renders container without scroll', () => {
    const { getByText } = render(
      <Container noScroll>
        <Text>Test</Text>
      </Container>
    );
    expect(getByText('Test')).toBeTruthy();
  });

  it('renders container with KeyboardAwareScrollView', () => {
    const { getByText, getByTestId } = render(
      <Container testID="keyboard-aware-scrollview">
        <Text>Test</Text>
      </Container>
    );
    expect(getByTestId('keyboard-aware-scrollview')).toBeTruthy();
    expect(getByText('Test')).toBeTruthy();
  });
});
