import MajorSearchList from "@/app/(user)/majors/[major]/MajorSearchList";
import Container from "@/components/ui/container";
import { getMajorRelatedMajorSearching } from "@/services/majorServices";



export default async function MajorSearchPage({
    params,
    searchParams,
}: {
    params: Promise<{ major: string }>;
    searchParams: Promise<{ admissionMethod?: string; location?: string }>;
}) {
    const { major } = await params;
    const { admissionMethod, location } = await searchParams;
    
    
    const decodedMajor = decodeURIComponent(major);

    const majors = await getMajorRelatedMajorSearching(decodedMajor, "điểm thi thpt", "");

    return (
        <Container>
            <div className="min-h-screen py-6">
                
                <MajorSearchList majorSearchList={majors} />

            </div>
        </Container>
    );
}