import { useState } from 'react';

// Define the props interface.
interface LanguageSwitcherProps {
  language: string;
  setLanguage: (language: string) => void;
}

export const LanguageSwitcher = ({ language, setLanguage }: LanguageSwitcherProps) => {
  // State for managing dropdown visibility.
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle dropdown visibility.
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle language change.
  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative" >
      {/* Button to toggle dropdown */}
      <button
        onClick={toggleDropdown}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center focus:outline-none"
      >
        <img src={`../../public/${language}.svg`} alt={`${language} flag`} className="rounded-full shadow-md w-8 h-8 object-cover" />
        <p className={`pl-2 text-gray-700 ${isOpen ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800'}`} style={{ textTransform: 'capitalize' }}>{language}</p>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-full left-0 w-32 bg-white border rounded-md shadow-md"
        >
          {/* Language options */}
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
