import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import Input from '.';

describe('Input', () => {
  it('renders regular input', () => {
    const { getByPlaceholderText } = render(<Input label="Test" />);
    expect(getByPlaceholderText('Test')).toBeTruthy();
  });

  it('renders password input when password prop is set', () => {
    const { getByTestId } = render(<Input label="Test" password />);
    expect(getByTestId('input-password')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input label="Test" setValue={onChangeTextMock} />
    );
    const input = getByPlaceholderText('Test');

    fireEvent.changeText(input, 'Hello');

    expect(onChangeTextMock).toHaveBeenCalledTimes(1);
    expect(onChangeTextMock).toHaveBeenCalledWith('Hello');
  });

  it('sets focus state when input is focused and blurred', () => {
    const { getByPlaceholderText } = render(<Input label="Test" />);
    const input = getByPlaceholderText('Test');

    fireEvent(input, 'focus');
    expect(input.props.focus).toBe(true);

    fireEvent(input, 'blur');
    expect(input.props.focus).toBe(false);
  });
});
