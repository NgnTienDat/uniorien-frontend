interface CampusImage {
  id: number;
  url: string;
}

interface UniversityCampusProps {
  images: CampusImage[];
}

export function UniversityCampus({ images }: UniversityCampusProps) {
  // Chuẩn hóa để luôn là array
  const safeImages = Array.isArray(images) ? images : [];

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Campus</h2>

      {/* Nếu không có ảnh */}
      {safeImages.length === 0 ? (
        <p className="text-gray-500 italic">No campus images available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {safeImages.map((image) => (
            <div key={image.id} className="aspect-square rounded-lg overflow-hidden">
              <img
                src={image.url}
                alt="Campus"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
