import { ReviewSection } from "@/app/(user)/reviews/[id]/ReviewSection";
import { UniversityAbout } from "@/app/(user)/reviews/[id]/UniversityAbout";
import { UniversityCampus } from "@/app/(user)/reviews/[id]/UniversityCampus";
import { UniversityHeader } from "@/app/(user)/reviews/[id]/UniversityHeader";
import Container from "@/components/ui/container";
import { getUniversityComments } from "@/services/reviewServices";

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

async function getReviews(universityId: string) {
    return [
        {
            id: 1,
            name: "Emily Johnson",
            rating: 5,
            date: "2024-10-15",
            review: "Stanford exceeded all my expectations! The faculty is world-class, and the opportunities for research and innovation are unparalleled. The campus is beautiful, and the collaborative culture among students is amazing.",
            avatar: "EJ"
        },
        {
            id: 2,
            name: "Michael Chen",
            rating: 4,
            date: "2024-09-28",
            review: "Great academic programs and resources. The proximity to Silicon Valley opens up incredible internship opportunities. The only downside is the intense competition, but it pushes you to grow.",
            avatar: "MC"
        },
        {
            id: 3,
            name: "Sarah Martinez",
            rating: 5,
            date: "2024-09-10",
            review: "The Computer Science program here is outstanding. The professors are leaders in their fields, and the entrepreneurial spirit on campus is infectious. Best decision I ever made!",
            avatar: "SM"
        }
    ];
}

export default async function UniversityPage({ 
    params 
}: { 
    params: Promise<{ id: string }>
}){
     const { id } = await params;
    const university = await getUniversityData(id);
    const initialReviews = await getUniversityComments(id);


    return (
        <Container>
            <div className="min-h-screen py-6">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex-col space-y-3">
                    <UniversityHeader
                        university={university}
                        reviewCount={initialReviews.length}
                    />
                    <UniversityAbout about={university.about} />
                    <UniversityCampus images={university.campusImages} />
                    <ReviewSection
                        universityCode={id}
                        initialReviews={initialReviews}
                    />
                </div>
            </div>
        </Container>
    );
}
