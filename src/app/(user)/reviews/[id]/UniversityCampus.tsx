import { CampusImage } from '@/types/review';
import { Image as ImageIcon } from 'lucide-react';


interface UniversityCampusProps {
  images: CampusImage[];
}

export function UniversityCampus({ images }: UniversityCampusProps) {
  const safeImages = Array.isArray(images) ? images : [];

  if (safeImages.length === 0) return null; // Ẩn luôn nếu không có ảnh để đỡ chiếm chỗ

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <ImageIcon className="text-blue-600" size={24} />
        Không gian Campus
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {safeImages.map((image, index) => (
          <div key={image.id || index} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-slate-100">
            <img
              src={image.url}
              alt="Campus"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
          </div>
        ))}
      </div>
    </div>
  );
}