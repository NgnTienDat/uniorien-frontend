import { MajorDetail, MajorSearchItem, Score } from '@/services/majorServices';
import React from 'react';

interface MajorSearchListProps {
  majorSearchList: MajorSearchItem[];
}

export default function MajorSearchList({ majorSearchList }: MajorSearchListProps) {
  // Get unique years from all scores
  const getUniqueYears = () => {
    const years = new Set<number>();
    majorSearchList.forEach(university => {
      university.majorDetails.forEach(major => {
        major.scores.forEach(score => years.add(score.year));
      });
    });
    return Array.from(years).sort((a, b) => b - a);
  };

  const uniqueYears = getUniqueYears();

  // Get score for a specific year
  const getScoreForYear = (scores: Score[], year: number) => {
    const score = scores.find(s => s.year === year);
    return score ? score.score : '';
  };

  // Count total rows for university rowspan
  const getUniversityRowSpan = (majorDetails: MajorDetail[]) => {
    return majorDetails.length;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-sm">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
              STT
            </th>
            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
              Tên trường
            </th>
            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
              Tên ngành
            </th>
            <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
              Tổ hợp môn
            </th>
            {uniqueYears.map(year => (
              <th 
                key={year}
                className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700"
              >
                Điểm chuẩn {year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {majorSearchList.map((university, universityIndex) => (
            university.majorDetails.map((major, majorIndex) => (
              <tr key={`${universityIndex}-${majorIndex}`} className="hover:bg-gray-50">
                {majorIndex === 0 && (
                  <>
                    <td 
                      className="border border-gray-300 px-4 py-3 text-center font-medium"
                      rowSpan={getUniversityRowSpan(university.majorDetails)}
                    >
                      {universityIndex + 1}
                    </td>
                    <td 
                      className="border border-gray-300 px-4 py-3 font-medium text-blue-600"
                      rowSpan={getUniversityRowSpan(university.majorDetails)}
                    >
                      {university.universityName}
                    </td>
                  </>
                )}
                <td className="border border-gray-300 px-4 py-3">
                  {major.majorName}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {major.subjectCombinations}
                </td>
                {uniqueYears.map(year => (
                  <td 
                    key={year}
                    className="border border-gray-300 px-4 py-3 text-center font-medium"
                  >
                    {getScoreForYear(major.scores, year)}
                  </td>
                ))}
              </tr>
            ))
          ))}
        </tbody>
      </table>
      
      {majorSearchList.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Không tìm thấy ngành học phù hợp
        </div>
      )}
    </div>
  );
}

// Demo with sample data


