import { Info } from "lucide-react";

interface UniversityAboutProps {
  about?: string | null;
}

export function UniversityAbout({ about }: UniversityAboutProps) {
  const paragraphs = about ? about.split("\n").filter(p => p.trim() !== "") : [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Info className="text-blue-600" size={24} />
        Giới thiệu chung
      </h2>

      {paragraphs.length > 0 ? (
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-xl p-6 text-center text-slate-500 italic">
          Hiện chưa có bài viết giới thiệu về trường này.
        </div>
      )}
    </div>
  );
}