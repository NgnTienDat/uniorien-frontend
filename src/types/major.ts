export interface MajorGroup {
  id: number;
  majorGroupName: string;
  majors: string[];
  numberOfMajors: number;
}


export interface Score {
    year: number;
    score: number;
    subjectCombinations: string;
}

export interface MajorDetail {
    majorName: string;
    subjectCombinations: string;
    scores: Score[];
}

export interface MajorSearchItem {
    universityName: string;
    majorDetails: MajorDetail[];
}