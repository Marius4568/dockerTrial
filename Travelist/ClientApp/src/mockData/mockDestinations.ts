import { Destination } from '../types/destinationTypes.ts';

const destinations: Destination[] = [
  {
    id: '1',
    creator: 'JohnDoe', 
    title: 'Explore the romantic city',
    city: 'Paris, France',
    description: 'Explore the romantic city of Paris.',
    itemsToTake: ['Camera', 'Map', 'Comfortable shoes'], 
    numberOfLoves: 120, 
    imageUrl: 'paris.jpg',
  },
  {
    id: '2',
    creator: 'JaneSmith', 
    title: 'Visit the bustling streets',
    city: 'New York City, USA',
    description: 'Visit the bustling streets of NYC.',
    itemsToTake: ['Sunglasses', 'Metro card', 'Guidebook'], 
    numberOfLoves: 230, 
    imageUrl: 'nyc.jpg',
  },
  {
    id: '3',
    creator: 'AliceJohnson', 
    title: 'Experience the vibrant culture',
    city: 'Tokyo, Japan',
    description: 'Experience the vibrant culture of Tokyo.',
    itemsToTake: ['Translator', 'Local currency', 'Charger'], 
    numberOfLoves: 340, 
    imageUrl: 'tokyo.jpg',
  },
  {
    id: '4',
    creator: 'BobBrown', 
    title: 'Discover the historical city',
    city: 'Rome, Italy',
    description: 'Discover the historical city of Rome.',
    itemsToTake: ['Backpack', 'Hat', 'Water bottle'], 
    numberOfLoves: 450, 
    imageUrl: 'rome.jpg',
  },
  {
    id: '5',
    creator: 'CharlieClark', 
    title: 'Enjoy the beauty of Sydney',
    city: 'Sydney, Australia',
    description: 'Enjoy the beauty of Sydney and its beaches.',
    itemsToTake: ['Swimsuit', 'Beach towel', 'Sunscreen'], 
    numberOfLoves: 560, 
    imageUrl: 'sydney.jpg',
  },
];

export default destinations;