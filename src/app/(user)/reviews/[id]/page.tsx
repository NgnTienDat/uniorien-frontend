import { ReviewSection } from "@/app/(user)/reviews/[id]/ReviewSection";
import { UniversityAbout } from "@/app/(user)/reviews/[id]/UniversityAbout";
import { UniversityCampus } from "@/app/(user)/reviews/[id]/UniversityCampus";
import { UniversityHeader } from "@/app/(user)/reviews/[id]/UniversityHeader";
import Container from "@/components/ui/container";
import { getUniversityComments, getUniversityDetail } from "@/services/reviewServices";

// This would typically come from a database or API
async function getUniversityData(id: string) {
    return {
        id,
        name: 'Stanford University',
        location: 'Stanford, California',
        logo: 'S',
        rating: 4.2,
        students: 17000,
        founded: 1885,
        acceptance: '3.9%',
        about: [
            'Stanford University is a private research university in Stanford, California. Known for its academic strength, proximity to Silicon Valley, and selectivity, it ranks as one of the world\'s top universities.',
            'The university\'s location in the heart of Silicon Valley provides unparalleled opportunities for innovation, entrepreneurship, and collaboration with leading tech companies.'
        ],
        campusImages: [
            { id: 1, url: '' },
            { id: 2, url: '' },
            { id: 3, url: '' },
            { id: 4, url: '' }
        ]
    };
}



export default async function UniversityPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const university = await getUniversityDetail(id);
    const initialReviews = await getUniversityComments(id);
    console.log("initialReviews in UniversityPage:", initialReviews);

    // console.log("universityId in UniversityPage:", university);


    return (
        <Container>
            <div className="min-h-screen py-6">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex-col space-y-3">
                    <UniversityHeader  // pass
                        university={university}
                        reviewCount={initialReviews.length}
                    />
                    <UniversityAbout about={university?.about} />
                    <UniversityCampus images={university?.campusImages} />
                    <ReviewSection
                        universityCode={id}
                        universityId={university.universityId}
                        initialReviews={initialReviews}
                    />
                </div>
            </div>
        </Container>
    );
}
