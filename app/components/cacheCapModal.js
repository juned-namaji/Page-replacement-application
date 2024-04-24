'use client';
import React, { useState } from 'react';

const CacheCapacityModal = ({ onSubmit }) => {
    const [capacity, setCapacity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(capacity);
    };

    return (
        <div className={`fixed inset-0 flex justify-center items-center`}>
            <div className="bg-white p-8 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-4">Set LRU Cache Capacity</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="capacity" className="block mb-2">Capacity:</label>
                    <input
                        id="capacity"
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md mb-4"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CacheCapacityModal;
