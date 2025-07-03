// Login.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import '@testing-library/jest-dom';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Page', () => {
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show error message on empty submit', () => {
    render(<Login />);
    const loginBtn = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(loginBtn);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  it('should navigate to /users with correct inputs', () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/users');
  });
});