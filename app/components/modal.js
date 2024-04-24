import React, { useState, useEffect } from 'react';

const Modal = ({ data, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    const { pageId, pageName } = data;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 absolute top-0 left-1/2 transform -translate-x-1/2 mt-12">
                <p className="text-lg font-semibold mb-2">{data ? `Page ID: ${pageId}` : 'No data provided'}</p>
                <p className="text-sm text-gray-600 mb-4">{data ? `Page Name: ${pageName}` : 'No data provided'}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;