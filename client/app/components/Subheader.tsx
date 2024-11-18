"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Subheader() {
    const [isLoved, setIsLoved] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);


    useEffect(() => {
        // Retrieve saved love status from localStorage on component mount
        const savedStatus = localStorage.getItem('isLoved');
        if (savedStatus === 'true') setIsLoved(true);
    }, []);

    const toggleLove = () => {
        const newStatus = !isLoved;
        setIsLoved(newStatus);
        localStorage.setItem('isLoved', newStatus.toString());
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const copyToClipboard = () => {
        const vacationUrl = "https://w3engineers.com/";
        navigator.clipboard.writeText(vacationUrl)
            .then(() => {
                setIsCopied(true); // Show the "Copied" message
                setTimeout(() => setIsCopied(false), 500); // Hide after 0.3 seconds
            })
            .catch(err => console.error('Failed to copy: ', err));
    };

    return (
        <div className="container mx-auto p-4 pt-20 ">
            {/* First Header */}
            <div className="flex justify-between items-center">
                <span className="text-blue-500 cursor-pointer"><i className="fa-solid fa-arrow-left text-blue-600"></i> &nbsp; See all properties</span>
                <div className="flex gap-2">
                    <button onClick={openModal} className="flex items-center text-blue-600 border border-blue-600 px-4 py-2 rounded">
                        <i className="fa-solid fa-arrow-up-from-bracket mr-2"></i> Share
                    </button>
                    <button onClick={toggleLove} className="flex items-center text-red-500 border border-red-500 px-4 py-2 rounded">
                        <i className={`fa ${isLoved ? 'fa-heart fill-love' : 'fa-regular fa-heart empty-love'}`}></i> &nbsp; Save
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl text-gray-800 font-semibold">Share</h2>
                            <button onClick={closeModal} className="text-gray-500 text-2xl">&times;</button>
                        </div>

                        <div className="flex gap-4 mb-4">
                            <Image
                                src="/images/header-5.jpg"
                                alt="Share Image"
                                width={150}
                                height={100}
                                className="object-cover rounded"
                            />
                            <div>
                                <h3 className="text-lg text-gray-700 font-semibold">Share Your Vacation Story</h3>
                                <p className="text-sm text-gray-900">Tell us about your trip!</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex flex-col items-center p-2 text-gray-700">
                                <i className="fa-solid fa-message text-lg"></i>
                                <span>Messages</span>
                            </button>
                            <button className="flex flex-col items-center p-2 text-green-600">
                                <i className="fa-brands fa-whatsapp text-lg"></i>
                                <span className="text-black-300">WhatsApp</span>
                            </button>
                            <button className="flex flex-col items-center p-2 text-blue-500">
                                <i className="fa-brands fa-facebook-messenger text-lg"></i>
                                <span>Messenger</span>
                            </button>
                            <button className="flex flex-col items-center p-2 text-blue-700">
                                <i className="fa-brands fa-facebook-f text-lg"></i>
                                <span>Facebook</span>
                            </button>
                            <button className="flex flex-col items-center text-gray-800 p-2  ">
                                <i className="fa-brands fa-x"></i>
                                <span>x</span>
                            </button>
                            <button className="flex flex-col items-center p-2 text-gray-900" onClick={copyToClipboard} >
                                <i className="fa-solid fa-copy text-lg"></i>
                                <span>Copy link</span>
                            </button>
                        </div>
                        {/* Copied Message */}
                        {isCopied && (
                            <div className="mt-4 text-center text-sm text-gray-800">
                                Link copied to clipboard!
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
