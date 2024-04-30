'use client';
import { useEffect, useState } from "react";
import Pages from "@/app/components/PageComponent";
import { useRouter } from "next/navigation";

const PageDetails = ({ params }) => {
    const { pageId } = params;
    const [cacheType, setCacheType] = useState(null);
    const [reload, setReload] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const getCookies = async () => {
            const res = await fetch('http://localhost:3000/api/cookies', {
                method: 'GET'
            })
            if (res.ok) {
                const ck = await res.json();
                setCacheType(ck.cookieStore[0].value);
            } else {
                console.log('Cant get cookies');
            }
        }
        getCookies();

        const update = async () => {
            const res = await fetch('http://localhost:3000/api/Lru/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pageId }),
            });
            if (res.ok) {
                reload ? setReload(false) : setReload(true);
            } else {
                console.log('Error');
            }
        }
        update();
    }, []);

    const goBack = () => {
        router.push('/');
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-22">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Page Details</h1>
                <p className="text-lg">Page ID: {pageId}</p>
            </div>
            <main className="flex min-h-screen flex-col items-center">
                <h1 className="text-4xl mb-8 mt-10">{cacheType === 'lru' ? "LRU cache" : "First in first out(FIFO)"}</h1>
                <div className="cards-container flex flex-wrap justify-center gap-4 w-full">
                    <Pages reload={reload} />
                </div>
                <button
                    className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                    onClick={goBack}
                >
                    Go Back
                </button>
            </main>

        </div>
    );
};

export default PageDetails;
