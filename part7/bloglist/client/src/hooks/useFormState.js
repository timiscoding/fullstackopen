import { useState, useReducer, useEffect, useRef } from "react";
import produce from "immer";
import mapValues from "lodash/mapValues";
import formStateReducer from "../reducers/formStateReducer";
import * as actionTypes from "../constants/actionTypes";

/*
  Simplified re-implementation based on react-use-form-state hook
  that provides form state management with validation and clearing
  https://github.com/wsmd/react-use-form-state
*/

const inputTypes = ["text", "password", "textarea"];

const useFormState = (initState, formRef) => {
  const validators = [];
  const updateValues = useRef(new Map());
  const [{ values, errors, validity }, dispatch] = useReducer(
    produce(formStateReducer),
    {
      values: { ...initState },
      validity: {},
      errors: {},
    }
  );
  const [submitRequest, setSubmitRequest] = useState(false);
  useEffect(() => {
    if (initState) {
      dispatch({ type: actionTypes.INIT_VALUES, values: initState });
    }
  }, [initState]);
  useEffect(() => {
    if (submitRequest) {
      const validForm = Object.keys(values).every((name) => validity[name]);
      if (validForm) {
        formRef.current.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true })
        );
      }
      setSubmitRequest(false);
    }
  }, [submitRequest, validity, formRef, values]);
  useEffect(() => {
    if (updateValues.current.size) {
      const it = updateValues.current.entries();
      const [name, value] = it.next().value;
      const error = validators.find((v) => v.name === name).validate(value);
      dispatch({
        type: actionTypes.CHANGE_INPUT,
        name,
        value,
        error,
      });
      updateValues.current.delete(name);
    }
  }, [values, errors, validity, validators]);

  const getInitState = (name) => initState?.[name] ?? "";

  const inputTypeCreator = (type) => (name, validateFn) => {
    const validate = (val = "") => {
      return validateFn(val, { values, validity, setValues });
    };
    validators.push({ name, validate });

    return {
      type,
      name,
      id: name,
      get value() {
        const hasInitialValue = values[name] !== undefined;
        if (!hasInitialValue) {
          dispatch({
            type: actionTypes.INIT_VALUE,
            name,
            value: getInitState(name),
          });
        }
        return hasInitialValue ? values[name] : "";
      },
      onChange(event) {
        const value = event.target.value;
        const validateRes = validate(value);

        dispatch({
          type: actionTypes.CHANGE_INPUT,
          name,
          value: updateValues.current.get(name) ?? value,
          validateRes,
        });
        updateValues.current.delete(name);
      },
      onKeyPress(event) {
        if (event.key === "Enter" && type !== "textarea") {
          submit(event);
        }
      },
    };
  };

  const setValues = (newValues) => {
    updateValues.current = new Map(Object.entries(newValues));
  };

  const clearInput = (name) => () => {
    dispatch({
      type: actionTypes.CLEAR_INPUT,
      name,
      value: getInitState(name),
    });
  };

  const clear = (e) => {
    e && e.preventDefault();
    dispatch({
      type: actionTypes.CLEAR_ALL,
      values: mapValues(values, getInitState),
    });
  };

  const submit = (event) => {
    event.preventDefault();
    dispatch({
      type: actionTypes.SET_ERRORS,
      validateResults: validators.map(({ name, validate }) => ({
        name,
        validateRes: validate(values[name]),
      })),
    });
    updateValues.current.clear();
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
      submit,
      setValues,
    },
    inputs,
  ];
};

export default useFormState;
