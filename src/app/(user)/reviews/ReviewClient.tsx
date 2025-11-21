'use client';

import UniReviewList from "@/app/(user)/reviews/UniReviewList";
import SearchInput from "@/components/SearchInput";
import { UOSelectBox } from "@/components/UOSelectBox";
import { useUniversityFilter } from "@/hooks/useUniversityFilter";
import { useUniversityReviews } from "@/hooks/useUniversityReviews";
import { useState } from "react";

type University = {
  id: string;
  universityCode: string;
  universityName: string;
  logo?: string | null;
  description?: string | null;
  location?: string | null;
};

const ITEMS_PER_PAGE = 9;

export default function ReviewClient({ universities }: { universities: University[] }) {
  const { universities: cachedUniversities, allUniversities } = useUniversityReviews(universities); // pass
  const { searchTerm, setSearchTerm, filteredUniversities } = useUniversityFilter(allUniversities); // pass
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  // Use filtered results for display
  const visibleUniversities = filteredUniversities.slice(0, displayCount);
  const hasMore = displayCount < filteredUniversities.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredUniversities.length));
  };

  // Reset display count when search changes
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setDisplayCount(ITEMS_PER_PAGE);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Nhập tên trường đại học"
        />
        <UOSelectBox />
      </div>

      {visibleUniversities.length > 0 ? (
        <>
          <UniReviewList universities={visibleUniversities} />

          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Xem thêm ({filteredUniversities.length - displayCount} còn lại)
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">
          {searchTerm.trim()
            ? "Không tìm thấy trường đại học nào."
            : "Không có dữ liệu trường đại học nào."}
        </p>
      )}
    </>
  );
}