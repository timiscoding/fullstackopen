import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  // make reset prop separate so that we can spread the props without getting
  // the warning about using non standard HTML attributes for input elements
  return [
    {
      type,
      value,
      onChange,
    },
    reset
  ];
};


