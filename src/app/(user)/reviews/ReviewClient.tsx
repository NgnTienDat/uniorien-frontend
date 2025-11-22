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
                className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 font-semibold text-base shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
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



// 'use client';

// import UniReviewList from "@/app/(user)/reviews/UniReviewList";
// import SearchInput from "@/components/SearchInput"; // Giả định SearchInput đã được style tốt
// import { UOSelectBox } from "@/components/UOSelectBox"; // Giả định UOSelectBox đã được style tốt
// import { useUniversityFilter } from "@/hooks/useUniversityFilter"; // Giữ nguyên logic
// import { useUniversityReviews } from "@/hooks/useUniversityReviews"; // Giữ nguyên logic
// import { useState } from "react";
// import { Loader2, Search, Filter } from "lucide-react"; // Thêm icon

// type University = {
//   id: string;
//   universityCode: string;
//   universityName: string;
//   logo?: string | null;
//   description?: string | null;
//   location?: string | null;
// };

// const ITEMS_PER_PAGE = 9; // Giữ nguyên số lượng item mỗi lần tải

// export default function ReviewClient({ universities }: { universities: University[] }) {
//   const { universities: cachedUniversities, allUniversities } = useUniversityReviews(universities);
//   const { searchTerm, setSearchTerm, filteredUniversities } = useUniversityFilter(allUniversities);
//   const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
//   const [loadingMore, setLoadingMore] = useState(false); // Thêm state loading cho Load More

//   const visibleUniversities = filteredUniversities.slice(0, displayCount);
//   const hasMore = displayCount < filteredUniversities.length;

//   const handleLoadMore = async () => {
//     setLoadingMore(true); // Bắt đầu loading
//     // Thêm một delay nhỏ để mô phỏng tải dữ liệu (nếu cần, có thể bỏ)
//     await new Promise(resolve => setTimeout(resolve, 200)); 
//     setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredUniversities.length));
//     setLoadingMore(false); // Kết thúc loading
//   };

//   const handleSearchChange = (value: string) => {
//     setSearchTerm(value);
//     setDisplayCount(ITEMS_PER_PAGE); // Reset display count khi tìm kiếm thay đổi
//   };

//   return (
//     <>
//       {/* --- FILTER & SEARCH SECTION --- */}
//       <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
//         <SearchInput
//           value={searchTerm}
//           onChange={handleSearchChange}
//           placeholder="Nhập tên trường đại học"
//         />
//         <UOSelectBox />
//       </div>

//       {/* --- REVIEW LIST --- */}
//       {visibleUniversities.length > 0 ? (
//         <>
//           <UniReviewList universities={visibleUniversities} />

//           {/* --- LOAD MORE BUTTON --- */}
//           {hasMore && (
//             <div className="flex justify-center mt-10">
//               <button
//                 onClick={handleLoadMore}
//                 disabled={loadingMore} // Disable khi đang tải
//                 className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 font-semibold text-base shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {loadingMore ? (
//                     <>
//                         <Loader2 size={20} className="animate-spin" /> Đang tải...
//                     </>
//                 ) : (
//                     `Xem thêm (${filteredUniversities.length - displayCount} trường còn lại)`
//                 )}
//               </button>
//             </div>
//           )}
//         </>
//       ) : (
//         // --- EMPTY STATE ---
//         <div className="text-center py-12 text-slate-500 bg-white border border-slate-100 rounded-xl shadow-sm">
//           <p className="text-lg font-medium">
//             {searchTerm.trim()
//               ? `Không tìm thấy trường đại học nào cho "${searchTerm}".`
//               : "Hiện chưa có dữ liệu đánh giá trường đại học nào."}
//           </p>
//           <p className="text-sm mt-2">Hãy thử tìm kiếm với từ khóa khác hoặc quay lại sau.</p>
//         </div>
//       )}
//     </>
//   );
// }