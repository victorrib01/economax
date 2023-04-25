import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '.';
import { AuthContext } from '../../../contexts/auth';

describe('Login screen', () => {
  const mockSaveAuthData = jest.fn();
  const mockAuthValue = {
    saveAuthData: mockSaveAuthData,
  };

  it('renders the login screen correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={mockAuthValue}>
        <Login />
      </AuthContext.Provider>
    );

    expect(getByPlaceholderText('usuário')).toBeTruthy();
    expect(getByPlaceholderText('senha')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
    expect(getByText('Cadastrar')).toBeTruthy();
  });

  it('handles user input and login button press', () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthContext.Provider value={mockAuthValue}>
        <Login />
      </AuthContext.Provider>
    );

    const usernameInput = getByPlaceholderText('usuário');
    const passwordInput = getByPlaceholderText('senha');
    const loginButton = getByText('Entrar');

    fireEvent.changeText(usernameInput, 'testuser');
    fireEvent.changeText(passwordInput, 'testpassword');
    fireEvent.press(loginButton);

    expect(mockSaveAuthData).toHaveBeenCalledWith({
      user: 'testuser',
      pass: 'testpassword',
    });
  });

  it('handles register button press', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const { getByText } = render(
      <AuthContext.Provider value={mockAuthValue}>
        <Login />
      </AuthContext.Provider>
    );

    const registerButton = getByText('Cadastrar');
    fireEvent.press(registerButton);

    expect(consoleSpy).toHaveBeenCalledWith('register');
    consoleSpy.mockRestore();
  });
});
