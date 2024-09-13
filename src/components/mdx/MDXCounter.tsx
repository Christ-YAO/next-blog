"use client";

import { useState } from 'react';
import { Button } from '../ui/button';

export const MDXCounter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Button style={{
        backgroundColor: 'red',
      }}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </Button>
    </div>
  );
};