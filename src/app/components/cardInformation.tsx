// src/components/CardWithImage.tsx
import React from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";

type CardProps = {
    title: string;
    description: string;
    imageUrl: string;
    onClose: () => void;
};

export default function CardInformation({ title, description, imageUrl, onClose }: CardProps) {
    return (
        <div className="relative bg-black/50 max-w-screen h-screen mx-auto z-[1000]">
            <div className="relative h-[80vh] max-w-3xl inset-y-16 mx-auto bg-white rounded-xl shadow-lg overflow-hidden z-[999]">
                <button
                    className="absolute top-2 right-2 text-white rounded-full p-1 hover:bg-red-500 transition"
                    onClick={onClose}
                >
                    <IoCloseCircleOutline className='size-10' />
                </button>

                <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />

                <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-700">{description}</p>
                </div>
            </div>
        </div>
    );
};