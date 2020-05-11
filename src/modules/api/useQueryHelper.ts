import { useState } from 'react';

export default <T = any>() => {
  const [data, setDataValue] = useState<T | undefined>(undefined);
  const [loading, setLoadingValue] = useState(false);
  const [error, setErrorValue] = useState<any>(undefined);

  const startLoading = () => {
    setErrorValue(undefined);
    setLoadingValue(true);
  };

  const setData = (value: T | undefined) => {
    setDataValue(value);
    setLoadingValue(false);
  };

  const setError = (value: any) => {
    setErrorValue(value);
    setLoadingValue(false);
  };

  return {
    data,
    loading,
    error,
    startLoading,
    setData,
    setError,
  };
};
