import { catFact } from '../types/catFactTypes.ts';

export default async function getCatFact(): Promise<catFact> {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error(`Network response was not ok ${response.statusText}`);
  }
  const data = await response.json() as catFact;

  return data;
}