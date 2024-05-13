// Define the props interface.
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    hit: any;
    imageSwitchEnabled: boolean;
    language: string;
}

export const Modal = ({ isOpen, onClose, hit, imageSwitchEnabled, language }: ModalProps) => {
    // If modal is not open, return null.
    if (!isOpen) return null;

    // Function to get localized hit name based on language.
    const getLocalizedHitName = () => {
        switch (language) {
            case 'japanese':
                return hit.name.japanese;
            case 'french':
                return hit.name.french;
            case 'chinese':
                return hit.name.chinese;
            default:
                return hit.name.english;
        }
    };

    // Function to get the image URL based on image switch.
    const getImageUrl = () => {
        if (imageSwitchEnabled) {
            return hit.imageUrls[0];
        } else {
            return hit.imageUrls[2];
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                {/* 
                    This span element serves as a placeholder for vertical alignment within its container.
                    It is hidden but still occupies space to maintain alignment.
                */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-center sm:justify-center">
                            <div className="sm:w-1/2">
                                {/* Display image */}
                                <img src={getImageUrl()} alt={hit.name.english} className="w-full h-auto mx-auto" />
                            </div>
                            <div className="sm:w-1/2 sm:pl-8">
                                {/* Display hit name and details */}
                                <h3 className="text-lg leading-6 font-bold text-gray-900">{getLocalizedHitName()}</h3>
                                <div className="mt-4">
                                    {/* Display hit details */}
                                    <p className="text-sm text-gray-500 font-bold mb-1">Type:</p>
                                    <p className="mb-2">{hit.type.join(', ')}</p>
                                    {/* Display abilities */}
                                    <p className="text-sm text-gray-500 font-bold mb-1">Abilities:</p>
                                    <p className="mb-2">{hit.abilities.join(', ')}</p>
                                    {/* Display stats */}
                                    {Object.keys(hit.base).map((key: string) => (
                                        <div key={key}>
                                            <div className="text-sm text-gray-500 font-bold mb-1">{key}:</div>
                                            <div className="flex items-center mb-2">
                                                <div className="pr-2">{hit.base[key]}</div>
                                                <input type="range" min="0" max="200" value={hit.base[key]} disabled className="w-full" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            type="button"
                            className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-bold text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
