import { useState, useEffect } from 'react';

// Custom React hook to manage state and synchronization with local storage.
export const useLocalStorage = () => {
    // State variables for language and image switch.
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'english');
    const [imageSwitchEnabled, setImageSwitchEnabled] = useState(false);

    // Effect to update local storage when language changes.
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    // Effect to retrieve image switch value from local storage on component mount.
    useEffect(() => {
        const isImageSwitchEnabled = localStorage.getItem('imageSwitchEnabled') === 'true';
        setImageSwitchEnabled(isImageSwitchEnabled);
    }, []);

    // Function to toggle image switch and update local storage.
    const toggleImageSwitching = (enabled: boolean) => {
        setImageSwitchEnabled(enabled);
        localStorage.setItem('imageSwitchEnabled', enabled.toString());
    };

    return { language, setLanguage, imageSwitchEnabled, toggleImageSwitching };
};

