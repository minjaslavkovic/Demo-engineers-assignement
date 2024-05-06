import React, { useState, useEffect } from 'react';

interface ImageSwitcherProps {
  initialEnabled?: boolean;
  onChange: (enabled: boolean) => void;
}

const ImageSwitcher: React.FC<ImageSwitcherProps> = ({ initialEnabled = false, onChange }) => {
  const [enabled, setEnabled] = useState(initialEnabled);

  useEffect(() => {
    onChange(enabled);
  }, [enabled, onChange]);

  const toggleSwitch = () => {
    setEnabled(!enabled);
  };

  return (
    <label htmlFor="imageSwitch" className="flex items-center cursor-pointer">
      <span className="mr-2">Image switcher</span>
      <div className={`relative w-12 h-6 rounded-full ${enabled ? 'bg-green-400' : 'bg-gray-300'}`}>
        <input
          type="checkbox"
          id="imageSwitch"
          className="hidden"
          checked={enabled}
          onChange={() => toggleSwitch()} 
        />
        <div className={`absolute left-0 top-0 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${enabled ? 'translate-x-full' : ''}`}></div>
      </div>
    </label>
  );
};

export default ImageSwitcher;
