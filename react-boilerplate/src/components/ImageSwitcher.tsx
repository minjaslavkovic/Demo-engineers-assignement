import { useState, useEffect } from 'react';

// Define the props interface.
interface ImageSwitcherProps {
  // Optional prop for initial state of the switch.
  initialEnabled?: boolean;
  // Callback function for when the switch is toggled.
  onChange: (enabled: boolean) => void;
}

export const ImageSwitcher = ({ initialEnabled = false, onChange }: ImageSwitcherProps) => {
  // State to manage the switch status.
  const [enabled, setEnabled] = useState(initialEnabled);

  // Call the onChange callback whenever the switch state changes.
  useEffect(() => {
    onChange(enabled);
  }, [enabled, onChange]);

  // Function to toggle the switch.
  const toggleSwitch = () => {
    setEnabled(!enabled);
  };

  return (
    <label htmlFor="imageSwitch" className="flex items-center cursor-pointer">
      {/* Label for the switch */}
      <span className="mr-2">Classic images</span>
      {/* Switch container */}
      <div className={`relative w-12 h-6 rounded-full ${enabled ? 'bg-green-400' : 'bg-gray-300'}`}>
        {/* Hidden input for the switch */}
        <input
          type="checkbox"
          id="imageSwitch"
          className="hidden"
          checked={enabled}
          onChange={() => toggleSwitch()} 
        />
        {/* Switch handle */}
        <div className={`absolute left-0 top-0 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${enabled ? 'translate-x-full' : ''}`}></div>
      </div>
    </label>
  );
};
