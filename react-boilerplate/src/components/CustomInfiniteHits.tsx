import React, { useState } from 'react';
import { useInfiniteHits, UseInfiniteHitsProps, Highlight } from 'react-instantsearch';
import Modal from './Modal';

interface CustomInfiniteHitsProps extends UseInfiniteHitsProps {
    language: string;
    imageSwitchEnabled: boolean; 
    toggleImageSwitching: (enabled: boolean) => void; 
}

export function CustomInfiniteHits({ language, imageSwitchEnabled, toggleImageSwitching, ...props }: CustomInfiniteHitsProps) {
    const { hits, showMore, isLastPage } = useInfiniteHits(props);

    const [isHovered, setIsHovered] = useState(false);
    const [hoveredHitIndex, setHoveredHitIndex] = useState(null);
    const [selectedHit, setSelectedHit] = useState(null);

    const handleMouseEnter = (index) => {
        setIsHovered(true);
        setHoveredHitIndex(index);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setHoveredHitIndex(null);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const getLocalizedHitName = (hit) => {
        switch (language) {
            case 'japanese':
                return (
                    <Highlight attribute="name.japanese" hit={hit}>
                        {hit.name.japanese}
                    </Highlight>
                );
            case 'french':
                return (
                    <Highlight attribute="name.french" hit={hit}>
                        {hit.name.french}
                    </Highlight>
                );
            case 'chinese':
                return (
                    <Highlight attribute="name.chinese" hit={hit}>
                        {hit.name.chinese}
                    </Highlight>
                );
            default:
                return (
                    <Highlight attribute="name.english" hit={hit}>
                        {hit.name.english}
                    </Highlight>
                );
        }
    };

    const openModal = (hit) => {
        setSelectedHit(hit);
    };

    const closeModal = () => {
        setSelectedHit(null);
    };

    return (
        <div>
            <div className="flex flex-wrap -mx-2">
                {hits.map((hit, index) => (
                    <div
                        key={hit.objectID}
                        className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 px-2 mb-4 hover:scale-105 transition-transform duration-300 cursor-pointer hover:cursor-pointer ${hits.length === 1 ? 'md:w-full lg:w-full' : '' }`}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => openModal(hit)}
                    >
                        <div className="bg-white shadow-md rounded-md overflow-hidden">
                            <img
                                src={
                                    isHovered && hoveredHitIndex === index
                                        ? imageSwitchEnabled ? hit.imageUrls[1] : hit.imageUrls[3]
                                        : imageSwitchEnabled ? hit.imageUrls[0] : hit.imageUrls[2]
                                }
                                alt={hit.name.english}
                                className="object-cover"
                            />
                            <div className="p-4 flex">
                                <div className="flex-1">
                                    <div className="justify-start">
                                        <h2 className="text-lg font-bold mb-2 font-mono">{getLocalizedHitName(hit)}</h2>
                                        <p className="text-gray-700 mb-2 font-mono">
                                            {hit.type.join(', ')}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <img src="../../public/pokeball.svg" alt="SVG Image" className="w-8 h-8 hover:translate-y-1 hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center my-4">
                <button
                    onClick={scrollToTop}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                >
                    Back to Top
                </button>
                <button
                    onClick={showMore}
                    disabled={isLastPage}
                    className={`bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full ml-4 ${isLastPage && 'opacity-50 cursor-not-allowed'
                        }`}
                >
                    Show more results
                </button>
            </div>
            <Modal isOpen={selectedHit !== null} onClose={closeModal} hit={selectedHit} imageSwitchEnabled={imageSwitchEnabled} language={language} />
        </div>
    );
}


