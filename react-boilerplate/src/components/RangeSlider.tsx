import React, { useState, useEffect } from "react";
import { useRange } from 'react-instantsearch';
import { RangeSlider as SpectrumRangeSlider } from '@adobe/react-spectrum';

import './RangeSlider.css';

interface RangeSliderProps {
  attribute: string;
  label: string;
}

export function RangeSlider(props: RangeSliderProps) {
  const { attribute, label } = props;
  const { start, range, canRefine, refine } = useRange({ attribute });
  const { min, max } = range;
  const [value, setValue] = useState({ start: min, end: max });

  const from = Math.max(min, Number.isFinite(start[0]) ? start[0] : min);
  const to = Math.min(max, Number.isFinite(start[1]) ? start[1] : max);

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



