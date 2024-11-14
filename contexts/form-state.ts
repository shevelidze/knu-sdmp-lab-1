import React from "react";

type FormState = {
  value: any;
  setValue: (value: any) => void;
};

const FormStateContext = React.createContext<FormState>({
  value: {},
  setValue: () => {},
});

export { FormStateContext };
