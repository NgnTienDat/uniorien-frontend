'use client';

import UniReviewList from "@/app/(user)/reviews/UniReviewList";
import SearchInput from "@/components/SearchInput"; // Giả định component này nhận className
import { UOSelectBox } from "@/components/UOSelectBox";
import { useUniversityFilter } from "@/hooks/useUniversityFilter";
import { useUniversityReviews } from "@/hooks/useUniversityReviews";
import { Search, Filter, Loader2 } from "lucide-react";
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
  const { universities: cachedUniversities, allUniversities } = useUniversityReviews(universities);
  const { searchTerm, setSearchTerm, filteredUniversities } = useUniversityFilter(allUniversities);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);

  const visibleUniversities = filteredUniversities.slice(0, displayCount);
  const hasMore = displayCount < filteredUniversities.length;

  const handleLoadMore = async () => {

    setLoadingMore(true); // Bắt đầu loading
    // Thêm một delay nhỏ để mô phỏng tải dữ liệu (nếu cần, có thể bỏ)
    await new Promise(resolve => setTimeout(resolve, 200)); 
    setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredUniversities.length));
    setLoadingMore(false); // Kết thúc loading
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setDisplayCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="space-y-8">
      {/* --- TOOLBAR --- */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Nhập tên trường đại học"
        />
        <UOSelectBox />
      </div>

      {/* --- RESULTS --- */}
      {visibleUniversities.length > 0 ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <UniReviewList universities={visibleUniversities} />

         {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore} // Disable khi đang tải
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg disabled:opacity-70 
                disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loadingMore ? (
                    <>
                        <Loader2 size={20} className="animate-spin" /> Đang tải...
                    </>
                ) : (
                    `Xem thêm (${filteredUniversities.length - displayCount} trường còn lại)`
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
           <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
               <Search size={32} />
           </div>
           <p className="text-slate-500 font-medium">
              Không tìm thấy kết quả nào cho "{searchTerm}"
           </p>
        </div>
      )}
    </div>
  );
}