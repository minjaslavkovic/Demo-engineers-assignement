import React from 'react';
import CustomSearchBox from '../CustomSearchBox';
import LanguageSwitcher from '../LanguageSwitcher'; 

interface NavbarProps {
    language: string;
    setLanguage: (language: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage }) => {
    return (
        <nav className="flex justify-between items-center p-4 bg-white text-white shadow-md rounded-b-xl sticky top-0 z-10">
            <div className="flex-grow justify-center items-center max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-center md:justify-between">
                    <div className="w-full md:w-1/3 lg:w-1/4 pr-4">
                        <img src="../../public/pokemon_logo.svg" alt="Logo" className="w-24 md:w-32 lg:w-40 pr-4" />
                    </div>
                    <div className="w-full md:w-1/3 lg:w-2/4">
                        <CustomSearchBox />
                    </div>
                    <div className="w-full md:w-1/3 lg:w-1/4">
                        <div className="flex justify-end">
                            <div className="ml-4">
                                <LanguageSwitcher language={language} setLanguage={setLanguage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

