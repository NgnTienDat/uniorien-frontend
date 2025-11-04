'use client';

import UniversityList from "@/app/(user)/benchmarks/UniversityList";
import SearchInput from "@/components/SearchInput";
import { UOSelectBox } from "@/components/UOSelectBox";
import { useUniversityFilter } from "@/hooks/useUniversityFilter";

type University = {
    id: string;
    universityCode: string;
    universityName: string;
};

export default function BenchmarkClient({ universities }: { universities: University[] }) {
    const { searchTerm, setSearchTerm, filteredUniversities } = useUniversityFilter(universities);

    return (
        <>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Nhập tên trường đại học"
                />
                <UOSelectBox />
            </div>

            {filteredUniversities.length > 0 ? (
                <UniversityList universities={filteredUniversities} />
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