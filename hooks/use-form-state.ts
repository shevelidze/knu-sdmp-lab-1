import { FormStateContext } from "@/contexts/form-state";
import { useCallback, useContext, useEffect, useRef } from "react";

const useFormState = <T>(
  initialState: T,
  key: string
): [T, (value: T) => void] => {
  const { setValue, value } = useContext(FormStateContext);

  const state = value[key] as T;

  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const setState = useCallback((valueToSet: T) => {
    const valueFromRef = valueRef.current;

    setValue({
      ...valueFromRef,
      [key]: valueToSet,
    });
  }, []);

  return [state !== undefined ? state : initialState, setState];
};

export { useFormState };
