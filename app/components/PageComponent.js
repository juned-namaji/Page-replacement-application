'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

const Pages = ({ reload }) => {
    const [pages, setPages] = useState([]);
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/getPages', {
                    method: 'GET'
                });
                if (res.ok) {
                    const data = await res.json();
                    setPages(data);
                    setAvailable(true);
                } else {
                    console.log("Error fetching pages!!");
                }
            } catch (error) {
                console.error("Error fetching pages:", error);
            }
        };

        fetchPages();
    }, [reload]);

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {available ? (
                pages.map((page) => (
                    <div key={page._id} className="bg-white rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 relative">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">Page ID: {page.pageId}</h3>
                            <p className="text-sm text-gray-600 mb-2">Page Name: {page.pageName}</p>
                            <p className="text-sm text-gray-600 mb-2">Created At: {new Date(page.createdAt).toLocaleString()}</p>
                            <p className="text-sm text-gray-600 mb-2">Updated At: {new Date(page.updatedAt).toLocaleString()}</p>
                            <p className="text-sm text-gray-600 mb-2">Version: {page.__v}</p>
                            <Link href={`/pages/${page.pageId}`} target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 text-blue-500 hover:text-blue-700">Go to Page</Link>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>

    );
};

export default Pages;