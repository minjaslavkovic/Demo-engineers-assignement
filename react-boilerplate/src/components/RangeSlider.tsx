import { useState, useEffect } from "react";
import { useRange } from 'react-instantsearch';
import { RangeSlider as SpectrumRangeSlider } from '@adobe/react-spectrum';
import { RangeValue } from '@react-types/shared';

import './RangeSlider.css';

// Define the props interface for the RangeSlider component.
interface RangeSliderProps {
  attribute: string; 
  label: string;
}

export function RangeSlider(props: RangeSliderProps) {
  // Extract props.
  const { attribute, label } = props;

  // Get start, range, canRefine, and refine functions from useRange hook.
  const { start, range, canRefine, refine } = useRange({ attribute });
  const { min, max } = range;

  // Convert min and max values to numbers.
  const minValue = min as number;
  const maxValue = max as number;

  // Set initial value for the range slider.
  const [value, setValue] = useState<RangeValue<number>>({ start: minValue, end: maxValue });

  // Calculate 'from' and 'to' values within the range.
  const from = Math.max(minValue, Number.isFinite(start[0]) ? start[0] as number : minValue);
  const to = Math.min(maxValue, Number.isFinite(start[1]) ? start[1] as number : maxValue);

  // Update the value state when 'from' or 'to' changes.
  useEffect(() => {
    setValue({ start: from, end: to });
  }, [from, to]);

  // Render the RangeSlider component.
  return (
    <div>
      {/* Display the label above the range slider. */}
      <p>{label}</p>
      {/* Render the Adobe Spectrum RangeSlider component. */}
      <SpectrumRangeSlider
        label={`${label} `}
        minValue={min}
        maxValue={max}
        value={value}
        onChange={setValue}
        onChangeEnd={({ start, end }) => refine([start, end])}
        isDisabled={!canRefine}
      />
    </div>
  );
}
