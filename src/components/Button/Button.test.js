import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Button from '.';

describe('Button', () => {
  it('renders default button', () => {
    const { getByText } = render(<Button title="Test" />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('renders outline button when outline prop is set', () => {
    const { getByTestId } = render(<Button title="Test" outline />);
    expect(getByTestId('button-outline')).toBeTruthy();
  });

  it('calls onPress when the button is pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Test" onPress={onPressMock} />);
    const button = getByText('Test');

    fireEvent.press(button);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
