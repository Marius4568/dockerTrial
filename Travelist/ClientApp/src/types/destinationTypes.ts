export interface CreateDestinationData {
  title: string;
  city: string;
  text: string;
  imageUrl: string;
}

interface UserPreview {
    name: string;
    username: string;
}
interface Location {
    latitude: number;
    longitude: number;
 }
export interface DestinationType {
    id: number;
    user: UserPreview;
    title: string;
    city: string;
    text: string;
    imageUrl: string;
    likes: number;
    isLiked: boolean;
    location: Location;
}
export interface DestinationPreviewType {
    id: number;
    user: UserPreview;
    title: string;
    city: string;
    imageUrl: string;
    likes: number;
    isLiked: boolean;
}