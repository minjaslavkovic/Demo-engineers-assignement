const Modal = (props: any) => {
    const { isOpen, onClose, hit, imageSwitchEnabled, language } = props;

    if (!isOpen) return null;

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

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-center sm:justify-center">
                            <div className="sm:w-1/2">
                                <img src={getImageUrl()} alt={hit.name.english} className="w-full h-auto mx-auto" />
                            </div>
                            <div className="sm:w-1/2 sm:pl-8">
                                <h3 className="text-lg leading-6 font-bold text-gray-900">{getLocalizedHitName()}</h3>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 font-bold mb-1">Type:</p>
                                    <p className="mb-2">{hit.type.join(', ')}</p>
                                    
                                    <p className="text-sm text-gray-500 font-bold mb-1">Abilities:</p>
                                    <p className="mb-2">{hit.abilities.join(', ')}</p>

                                    <div className="text-sm text-gray-500 font-bold mb-1">HP:</div>
                                    <div className="flex items-center mb-2">
                                        <div className="pr-2">{hit.base.HP}</div>
                                        <input type="range" min="0" max="200" value={hit.base.HP} disabled className="w-full" />
                                    </div>
                                    
                                    <div className="text-sm text-gray-500 font-bold mb-1">Attack:</div>
                                    <div className="flex items-center mb-2">
                                        <div className="pr-2">{hit.base.Attack}</div>
                                        <input type="range" min="0" max="200" value={hit.base.Attack} disabled className="w-full" />
                                    </div>
                                    
                                    <div className="text-sm text-gray-500 font-bold mb-1">Defense:</div>
                                    <div className="flex items-center mb-2">
                                        <div className="pr-2">{hit.base.Defense}</div>
                                        <input type="range" min="0" max="200" value={hit.base.Defense} disabled className="w-full" />
                                    </div>

                                    <div className="text-sm text-gray-500 font-bold mb-1">Speed:</div>
                                    <div className="flex items-center mb-2">
                                        <div className="pr-2">{hit.base.Speed}</div>
                                        <input type="range" min="0" max="200" value={hit.base.Speed} disabled className="w-full" />
                                    </div>

                                    <div className="text-sm text-gray-500 font-bold mb-1">Sp. Attack:</div>
                                    <div className="flex items-center mb-2">
                                        <div className="pr-2">{hit.base["Sp. Attack"]}</div>
                                        <input type="range" min="0" max="200" value={hit.base["Sp. Attack"]} disabled className="w-full" />
                                    </div>

                                    <div className="text-sm text-gray-500 font-bold mb-1">Sp. Defense:</div>
                                    <div className="flex items-center mb-2">
                                        <div className="pr-2">{hit.base["Sp. Defense"]}</div>
                                        <input type="range" min="0" max="200" value={hit.base["Sp. Defense"]} disabled className="w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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

export default Modal;


