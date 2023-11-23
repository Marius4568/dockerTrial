import { DestinationType, CreateDestinationData } from '../types/destinationTypes.ts'; 

export const getDestinationCities = async (): Promise<string[]> => {
  const response = await fetch('/api/TravelEntity/locations', {
    method: 'GET'
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const cities = await response.json() as string[];
  return cities;
};

export const createDestination = async (data: CreateDestinationData): Promise<DestinationType> => {

  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found in local storage');
  }

  const response = await fetch('/api/TravelEntity/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const result = await response.json() as DestinationType;
  return result;
};