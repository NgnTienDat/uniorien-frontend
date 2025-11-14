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


export interface UniversityDetail {
  id: string;
  universityName: string;
  universityId: string;
  universityCode: string;
  location: string;
  websiteAddress: string;
  about: string;
  logo?: string;
  rating?: number;
  students?: number;
  founded?: number;
  acceptance?: string;
  campusImages: { id: number; url: string }[];
}
