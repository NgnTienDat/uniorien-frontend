export interface CommentResponse {
  id: string;
  content: string;
  fullName: string;
  avatar: string | null;
  createdAt: string;
}

export interface University {
  id: string;
  universityCode: string;
  universityName: string;
  logo: string;
  description: string;
  location: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  review: string;
  avatar: string;
}
