import { useEffect, useRef } from 'react';

// custom hook that holds any required value (props/state) from  the previous render cycle via a ref.
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious;
