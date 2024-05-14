import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';

// Mock fetch calls
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  );
});

// Clear mock after each test
afterEach(() => {
  jest.clearAllMocks();
});

test('renders correctly', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});

test('input field updates on change', () => {
  render(<App />);
  const inputElement = screen.getByRole('textbox');
  fireEvent.change(inputElement, { target: { value: 'testuser' } });
  expect(inputElement.value).toBe('testuser');
});

test('fetches user data on button click', async () => {
  render(<App />);
  const button = screen.getByText('Get User Data');
  fireEvent.click(button);

  await waitFor(() => expect(fetch).toHaveBeenCalled());
});

test('displays error when fetch fails', async () => {
  fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));
  render(<App />);
  const button = screen.getByText('Get User Data');
  fireEvent.click(button);

  await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
});
