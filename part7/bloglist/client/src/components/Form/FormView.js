import React, { useRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import Fieldset from "./FieldsetView";
import Input from "./Input";
import InputError from "./InputError";
import Control from "./Control";
import Group from "./GroupView";
import Label from "./LabelView";
import { useFormState } from "../../hooks";

const FormView = React.forwardRef(
  ({ onSubmit, children, pending, initState, ...props }, ref) => {
    const formRef = useRef();
    const [formState, inputTypes] = useFormState(initState, formRef);
    useImperativeHandle(ref, () => ({
      focus: () => formRef.current.elements[1].focus(), // 0 is the fieldset
      clear: () => formState.clear()
    }));
    const handleSubmit = e => {
      e.preventDefault();
      onSubmit(formState.values);
    };
    return (
      <form onSubmit={handleSubmit} ref={formRef} {...props}>
        <Fieldset disabled={pending}>
          {children(formState, inputTypes)}
        </Fieldset>
      </form>
    );
  }
);

FormView.displayName = "Form";

FormView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pending: PropTypes.bool
};

FormView.Input = Input;
FormView.InputError = InputError;
FormView.Control = Control;
FormView.Group = Group;
FormView.Label = Label;

export default FormView;
