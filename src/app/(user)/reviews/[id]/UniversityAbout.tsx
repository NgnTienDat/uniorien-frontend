// components/UniversityAbout.tsx (Server Component)
interface UniversityAboutProps {
  about: string[];
}

export function UniversityAbout({ about }: UniversityAboutProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
      {about.map((paragraph, index) => (
        <p key={index} className="text-gray-700 leading-relaxed mb-3 last:mb-0">
          {paragraph}
        </p>
      ))}
    </div>
  );
}