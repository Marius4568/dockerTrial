import { User } from '../types/userTypes.ts';

export const login = async (formData: { email: string, password: string }): Promise<string> => {
  const response = await fetch('/api/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.text();
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await fetch('/api/user/current', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  const data = await response.json() as User;
  return data ;
};