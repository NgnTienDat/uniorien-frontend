'use client';

import { UOSelectBox } from "@/components/common/UOSelectBox";
import UniversityList from "@/app/(user)/benchmarks/UniversityList";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

type University = {
  id: string;
  universityCode: string;
  universityName: string;
  website: string;
};

export default function BenchmarkClient({ universities }: { universities: University[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = useMemo(() => {
        return universities.filter(university =>
            university.universityCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            university.universityName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [universities, searchTerm]);

    return (
        <>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Nhập tên trường đại học"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-white"
                    />
                </div>
                <UOSelectBox />
            </div>

            {filtered.length > 0 ? (
                <UniversityList universities={filtered} />
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