import { useState, useCallback } from 'react';

function useToggle(initialValue: boolean = false): [boolean, () => void] {
  const [toggle, setToggle] = useState(initialValue);

  const toggleHandler = useCallback(() => {
    setToggle((prevValue) => !prevValue);
  }, []);

  return [toggle, toggleHandler];
}

export default useToggle;