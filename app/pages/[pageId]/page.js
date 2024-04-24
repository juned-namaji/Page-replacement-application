'use client';
import Button from "@/app/components/createNewPage";

const PageDetails = ({ params }) => {
    const { pageId } = params;

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Page Details</h1>
                <p className="text-lg">Page ID: {pageId}</p>
            </div>
            <Button />
        </div>
    );
};

export default PageDetails;
