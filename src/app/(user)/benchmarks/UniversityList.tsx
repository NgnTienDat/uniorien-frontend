"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { University } from "@/services/universityServices";

interface UniversityListProps {
  universities: University[];
}

export default function UniversityList({ universities }: UniversityListProps) {
  return (
    <ScrollArea className="h-[400px] rounded-md border p-2">
      <div className="p-2">
        {universities.map((u) => (
          <div
            key={u.id}
            className="flex justify-between items-center bg-white p-3 rounded-md
            hover:bg-blue-50 transition my-1 shadow-sm"
          >
            <span className="text-gray-700">{u.universityName}</span>
            <Link
              href={`/benchmarks/${u.universityCode}`}
              className="text-blue-500 hover:underline text-sm cursor-pointer"
            >
              Xem thông tin tuyển sinh
            </Link>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
