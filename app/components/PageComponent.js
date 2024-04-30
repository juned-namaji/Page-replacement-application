'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

const Pages = ({ reload }) => {
    const [pages, setPages] = useState([]);
    const [available, setAvailable] = useState(false);
    const [lruPageId, setLruPageId] = useState(null);
    const [mruPageId, setMruPageId] = useState(null);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/getPages', {
                    method: 'GET'
                });
                if (res.ok) {
                    const data = await res.json();
                    setPages(data);
                    console.log(data);
                    if (data.length > 0) {
                        setLruPageId(data[0]._id);
                        setMruPageId(data[data.length - 1]._id);
                    }
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
                pages.length == 0 ? (<h1 className="text-2xl text-center flex items-center justify-center h-full">No pages created yet!</h1>) :
                    pages.map((page) => (
                        <>
                            <div key={page._id} className="bg-white rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 relative">
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">Page ID: {page._id}</h3>
                                    <p className="text-sm text-gray-600 mb-2">Page Name: {page.pageName}</p>
                                    <p className="text-sm text-gray-600 mb-2">Created At: {new Date(page.createdAt).toLocaleString()}</p>
                                    <p className="text-sm text-gray-600 mb-2">Updated At: {new Date(page.updatedAt).toLocaleString()}</p>
                                    <p className="text-sm text-gray-600 mb-2">Version: {page.__v}</p>{page._id === lruPageId ? (<p className="text-red-500 ">Least recently used page</p>) : <></>}
                                    {page._id === mruPageId ? (<p className="text-green-500">Most recently used page</p>) : <></>}
                                    <Link href={`/pages/${page._id}`} target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 text-blue-500 hover:text-blue-700">Go to Page</Link>
                                </div>
                            </div>
                            <div className="mt-10">
                                {"--------->"}
                            </div>
                        </>
                    ))

            ) : (
                <p>Loading...</p>
            )}
        </div >

    );
};

export default Pages;