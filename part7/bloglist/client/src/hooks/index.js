import { useState, useReducer, useEffect } from "react";
import produce from "immer";
import formStateReducer from "../reducers/formStateReducer";
import * as actionTypes from "../constants/actionTypes";

export const useField = type => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  // make reset prop separate so that we can spread the props without getting
  // the warning about using non standard HTML attributes for input elements
  return [
    {
      type,
      value,
      onChange
    },
    reset
  ];
};

/*
  Simplified implementation based on react-use-form-state hook
  that provides form state management with validation and clearing
  https://github.com/wsmd/react-use-form-state
*/

const inputTypes = ["text", "password"];

export const useFormState = formRef => {
  const [{ values, errors, validity }, dispatch] = useReducer(
    produce(formStateReducer),
    {
      values: {},
      validity: {},
      errors: {}
    }
  );
  const [submitRequest, setSubmitRequest] = useState(false);
  const validators = [];

  useEffect(() => {
    if (submitRequest) {
      const validForm = Object.values(validity).every(v => v);
      if (validForm) {
        formRef.current.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true })
        );
      }
      setSubmitRequest(false);
    }
  }, [submitRequest, validity, formRef]);

  const inputTypeCreator = type => (name, validateFn) => {
    const validate = (val = "") => {
      return { name, error: validateFn(val, values) };
    };
    validators.push({ name, validate });

    const onChange = event => {
      const value = event.target.value;
      const { error } = validate(value);
      dispatch({ type: actionTypes.CHANGE_INPUT, name, value, error });
    };

    const onKeyPress = event => {
      if (event.key === "Enter") {
        submit(event);
      }
    };

    return {
      onChange,
      value: values[name] || "",
      type,
      onKeyPress,
      name
    };
  };

  const clearInput = name => {
    dispatch({ type: actionTypes.CLEAR_INPUT, name });
  };

  const clear = () => {
    dispatch({ type: actionTypes.CLEAR_ALL });
  };

  const submit = event => {
    event.preventDefault();
    const errors = validators.reduce(
      (state, { name, validate }) => ({
        ...state,
        [name]: validate(values[name], values).error
      }),
      {}
    );
    dispatch({ type: actionTypes.SET_ERRORS, errors });
    setSubmitRequest(true);
  };

  const inputs = inputTypes.reduce(
    (methods, type) => ({ ...methods, [type]: inputTypeCreator(type) }),
    {}
  );

  return [
    {
      values,
      errors,
      validity,
      clearInput,
      clear,
      submit
    },
    inputs
  ];
};
