import React, { useState, useEffect, useRef } from 'react';

interface LanguageSwitcherProps {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setIsOpen(false); 
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false); 
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className="flex items-center focus:outline-none">
        <img src={`../../public/${language}.svg`} alt={`${language} flag`} className="rounded-full shadow-md w-8 h-8 object-cover" />
        <p className={`pl-2 text-gray-700 ${isOpen ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800'}`} style={{ textTransform: 'capitalize' }}>{language}</p>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className="absolute top-full left-0 w-32 bg-white border rounded-md shadow-md">
          <div onClick={() => handleLanguageChange('english')} className="p-2 cursor-pointer flex items-center hover:bg-gray-100">
            <img src="../../public/english.svg" alt="GB flag" className={`rounded-full shadow-md w-8 h-8 object-cover ${language !== 'english' ? 'opacity-50' : ''}`} />
            <p className="text-sm text-gray-600 pl-2 hover:text-gray-800">English</p>
          </div>
          <div onClick={() => handleLanguageChange('japanese')} className="p-2 cursor-pointer flex items-center hover:bg-gray-100">
            <img src="../../public/japanese.svg" alt="Japan flag" className={`rounded-full shadow-md w-8 h-8 object-cover ${language !== 'japanese' ? 'opacity-50' : ''}`} />
            <p className="text-sm text-gray-600 pl-2 hover:text-gray-800">Japanese</p>
          </div>
          <div onClick={() => handleLanguageChange('french')} className="p-2 cursor-pointer flex items-center hover:bg-gray-100">
            <img src="../../public/french.svg" alt="France flag" className={`rounded-full shadow-md w-8 h-8 object-cover ${language !== 'french' ? 'opacity-50' : ''}`} />
            <p className="text-sm text-gray-600 pl-2 hover:text-gray-800">French</p>
          </div>
          <div onClick={() => handleLanguageChange('chinese')} className="p-2 cursor-pointer flex items-center hover:bg-gray-100">
            <img src="../../public/chinese.svg" alt="China flag" className={`rounded-full shadow-md w-8 h-8 object-cover ${language !== 'chinese' ? 'opacity-50' : ''}`} />
            <p className="text-sm text-gray-600 pl-2 hover:text-gray-800">Chinese</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
