import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  const props = {
    type,
    value,
    onChange,
  };

  // make this prop non-enumerable so that we can spread the props without getting
  // the warning about using non standard HTML attributes for input elements
  Object.defineProperty(props, 'reset', { value: reset });

  return props;
};


