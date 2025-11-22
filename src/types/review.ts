import { PageResponse } from "@/types/response";

export interface CommentResponse {
  id: string;
  content: string;
  fullName: string;
  avatar: string | null;
  createdAt: string;
}

export type CommentsPageResponse = PageResponse<CommentResponse>;

export interface University {
  id: string;
  universityCode: string;
  universityName: string;
  logo: string;
  description: string;
  location: string;
  rating?: number;
  reviewCount?: number;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  review: string;
  avatar: string;
}

export interface CampusImage {
  id: number;
  url: string;
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
  campusImages?: CampusImage[];
  institutionType?: string;     // Công lập / Tư thục / Quốc tế...
  programsOffered?: string;     // Đa ngành / Kỹ thuật / Kinh tế...
}



