import { useState, useEffect } from "react";
import { useRange } from 'react-instantsearch';
import { RangeSlider as SpectrumRangeSlider } from '@adobe/react-spectrum';
import { RangeValue } from '@react-types/shared';

import './RangeSlider.css';

interface RangeSliderProps {
  attribute: string;
  label: string;
}

export function RangeSlider(props: RangeSliderProps) {
  const { attribute, label } = props;
  const { start, range, canRefine, refine } = useRange({ attribute });
  const { min, max } = range;

  const minValue = min as number;
  const maxValue = max as number;

  const [value, setValue] = useState<RangeValue<number>>({ start: minValue, end: maxValue });

  const from = Math.max(minValue, Number.isFinite(start[0]) ? start[0] as number : minValue);
  const to = Math.min(maxValue, Number.isFinite(start[1]) ? start[1] as number : maxValue);

  useEffect(() => {
    setValue({ start: from, end: to });
  }, [from, to]);

  return (
    <div>
      <p>{label}</p>
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



