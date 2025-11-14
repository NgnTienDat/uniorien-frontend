interface UniversityAboutProps {
  about?: string | null;
}

export function UniversityAbout({ about }: UniversityAboutProps) {
  if (!about) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Về trường đại học</h2>
        <p className="text-gray-600 italic">Chưa có thông tin mô tả.</p>
      </div>
    );
  }

  const paragraphs = about.split("\n").filter(p => p.trim() !== "");

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Về trường đại học</h2>

      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-gray-700 leading-relaxed mb-3 last:mb-0 whitespace-pre-line"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
