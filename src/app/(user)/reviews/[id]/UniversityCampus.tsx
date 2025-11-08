interface CampusImage {
  id: number;
  url: string;
}

interface UniversityCampusProps {
  images: CampusImage[];
}

export function UniversityCampus({ images }: UniversityCampusProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Campus</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="aspect-square rounded-lg bg-gray-200"></div>
        ))}
      </div>
    </div>
  );
}