'use client';
import React, { useEffect, useState } from "react";

const NextPageForm = ({ newPageAdded, pageDeleted }) => {
    const [pageId, setPageId] = useState('');
    const [pageName, setPageName] = useState('');
    const [loading, setLoading] = useState(false);
    const [capacity, setCapacity] = useState(null);
    const [duplicate, setDuplicate] = useState(false);

    useEffect(() => {
        const getCookies = async () => {
            const res = await fetch('http://localhost:3000/api/cookies', {
                method: 'GET'
            })
            if (res.ok) {
                const ck = await res.json();
                setCapacity(ck.cookieStore[1].value);
                console.log(ck.cookieStore[1].value);
            } else {
                console.log('Cant get cookies');
            }
        }
        getCookies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDuplicate(false);
        setLoading(true);
        const find = async () => {
            const res = await fetch('http://localhost:3000/api/isDuplicate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pageId }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.isDuplicate) {
                    setDuplicate(true);
                    setLoading(false);
                } else {
                    const docsCount = await getDBDocs();
                    let docs = docsCount.count;

                    while (docs >= capacity) {
                        try {
                            const res = await fetch('http://localhost:3000/api/remove', {
                                method: 'DELETE'
                            })
                            if (res.ok) {
                                const data = await res.json();
                                console.log(data);
                                pageDeleted({ deleted: true, data: data.deletedPage });
                            } else {
                                console.log("Error in deleting element");
                            }
                        } catch (err) {
                            console.log("Error: ", err);
                        }
                        docs--;
                    }
                    //creating new page
                    const response = await fetch('http://localhost:3000/api/insertPage', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ pageId, pageName }),
                    });
                    await response.json();
                    setLoading(false);
                    newPageAdded();
                }
            } else {
                console.log("Error fetching!!!");
            }
        }
        const getDBDocs = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/getNoOfPages', {
                    method: 'GET'
                });
                if (res.ok) {
                    const data = await res.json();
                    return data;
                } else {
                    console.log("Erro fetching no of docs!");
                }
            } catch (err) {
                console.log("Error: ", err);
            }
        }
        find();
    }


    const handlePageIdChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && Number.isInteger(Number(value))) {
            setPageId(value);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="flex flex-col mb-4">
                <label htmlFor="pageId" className="mb-1">Page ID:</label>
                <input
                    id="pageId"
                    type="number"
                    placeholder="Enter Page ID"
                    value={pageId}
                    onChange={handlePageIdChange}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            {duplicate && (<label className="text-red-700">Duplicate page Id!! Please try another id</label>)}
            <div className="flex flex-col mb-4">
                <label htmlFor="pageName" className="mb-1">Page Name:</label>
                <input
                    id="pageName"
                    type="text"
                    placeholder="Enter Page Name"
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <button type="submit" disabled={loading} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                {loading ? 'Loading...' : '+ Insert Page'}
            </button>
        </form>
    );
};

export default NextPageForm;