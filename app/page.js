'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CacheCapacityModal = () => {
  const [cacheType, setCacheType] = useState('fifo');
  const [maxPages, setMaxPages] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/cookies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cacheType, maxPages }),
      });
      if (res.ok) {
        console.log('Cookies set successfully');
      } else {
        console.log('Error while setting cookies');
      }
    } catch (err) {
      console.log("Error: ", err);
    }
    router.push('/home');
  };

  return (
    <div className={`fixed inset-0 flex justify-center items-center`}>
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Set Cache Capacity and Type</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="maxPages" className="block mb-2">Max Pages:</label>
          <input
            id="maxPages"
            type="number"
            value={maxPages}
            onChange={(e) => setMaxPages(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md mb-4"
            required
          />
          <label htmlFor="cacheType" className="block mb-2">Cache Type:</label>
          <select
            id="cacheType"
            value={cacheType}
            onChange={(e) => setCacheType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md mb-4"
            required
          >
            <option value="fifo">First in First out</option>
            <option value="lru">LRU Cache</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CacheCapacityModal;
