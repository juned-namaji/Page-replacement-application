'use client';
import React, { useEffect, useState } from "react";
import NextPageForm from "../components/createNewPage";
import Pages from "../components/PageComponent";
import Modal from "../components/modal";
import { useRouter } from "next/navigation";

const Home = () => {
    const [reload, setReload] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [deletedData, setDeletedData] = useState({});
    const [cacheType, setCacheType] = useState(null);
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
    }, []);

    const cleanupOnUnload = async () => {
        const res = await fetch('http://localhost:3000/api/cleanup', {
            method: 'DELETE'
        });
        if (res.ok) {
            console.log("Ok");
        } else {
            console.log("Not ok!!!");
        }
    };
    const goBack = () => {
        cleanupOnUnload();
        router.push('/');
    }

    const newPageAdded = () => {
        setReload(prevState => !prevState);
    };

    const pageDeleted = ({ deleted, data }) => {
        if (deleted) {
            console.log("Data: ", data);
            setDeleted(deleted);
            setDeletedData(data);
        }
    };

    const handleCloseModal = () => {
        setDeleted(false);
    };

    return (
        <>
            {deleted && (
                <Modal
                    data={deletedData}
                    onClose={handleCloseModal}
                />
            )}
            <main className="flex min-h-screen flex-col items-center">
                <h1 className="text-4xl mb-8 mt-10">{cacheType === 'lru' ? "LRU cache" : "First in first out(FIFO)"}</h1>
                <div className="grid grid-cols-[3fr,1fr] w-full gap-4">
                    <div className="px-4 py-3">
                        <Pages reload={reload} />
                    </div>
                    <div className="fixed top-0 right-20 h-screen flex justify-center items-center">
                        <NextPageForm newPageAdded={newPageAdded} pageDeleted={pageDeleted} />
                    </div>
                </div>
                <button
                    className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                    onClick={goBack}
                >
                    Go Back
                </button>
            </main>
        </>

    );
};

export default Home;