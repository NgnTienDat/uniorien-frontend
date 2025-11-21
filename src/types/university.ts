export interface University {
    id: string;
    name: string;
    location: string;
    logo: string;
    rating: number;
    students: number;
    founded: number;
    acceptance: string;
    about: string[];
    campusImages: CampusImage[];
}

export interface CampusImage {
    id: number;
    url: string;
}

export interface Review {
    id: number;
    name: string;
    rating: number;
    date: string;
    review: string;
    avatar: string;
}

