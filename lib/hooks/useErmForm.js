import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const useErmForm = ({ navigationCheck = true } = {}) => {
  const [openModal, setOpenModal] = useState(false);
  const [nextLocation, setNextLocation] = useState(null);

  const unblock = useRef();
  const formSpyRef = useRef();
  const _isMounted = useRef(false);

  const history = useHistory();

  useEffect(() => {
    _isMounted.current = true;

    const handleBlockedNavigation = (nextLoc) => {
      const shouldPrompt =
        !!formSpyRef.current &&
        formSpyRef.current.dirty &&
        !formSpyRef.current.submitSucceeded &&
        !formSpyRef.current.submitting;

      if (shouldPrompt) {
        setOpenModal(true);
        setNextLocation(nextLoc);
      }

      return !shouldPrompt;
    };

    // Set up the history.block listener
    if (navigationCheck) {
      unblock.current = history.block(handleBlockedNavigation);
    }

    // Clean up the history.block listener on unmount
    return () => {
      _isMounted.current = false;
      if (unblock.current) {
        unblock.current();
        unblock.current = null;
      }
    };
  }, [history, navigationCheck]);

  const continueNavigation = (ctx) => {
    const { pathname, search } = nextLocation;

    ctx.cachePreviousUrl();
    if (unblock.current) {
      unblock.current();
      unblock.current = null;
    }
    setOpenModal(false);
    history.push(`${pathname}${search}`);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return {
    openModal,
    continueNavigation,
    closeModal,
    formSpyRef,
    _isMounted,
  };
};

export default useErmForm;
