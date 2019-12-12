import React from "react";
import styled from "styled-components";

const StyledFieldset = styled.fieldset`
  padding: 0;
  margin: 0;
  border: none;
`;

const Fieldset = ({ children }) => <StyledFieldset>{children}</StyledFieldset>;

const StyledInputDiv = styled.div`
  margin: 10px 0;
`;

const InputDiv = ({ children }) => <StyledInputDiv>{children}</StyledInputDiv>;

const Error = styled.div`
  font-size: 0.7em;
  color: ${({ theme }) => theme.error};
  margin-top: 3px;
  height: ${({ height = 0 }) => height + "px"};
  transition: height 0.3s;
  overflow: hidden;
`;

const InputError = React.forwardRef(({ children, ...props }, ref) => (
  <Error {...props} ref={ref}>
    {children}
  </Error>
));

InputError.displayName = "InputError";

const StyledLabel = styled.label`
  margin-bottom: 5px;
  display: block;
  font-size: 0.8em;
  font-weight: 700;
`;

const Label = ({ children, ...props }) => (
  <StyledLabel {...props}>{children}</StyledLabel>
);

const StyledInput = styled.input`
  ${({ theme, valid }) => `
    border-radius: 3px;
    border-width: 2px;
    border-style: solid;
    &:focus {
      box-shadow: 2px 2px 1px ${theme.primary};
    }
    border-color: ${
      valid === undefined
        ? theme.grey
        : valid === true
        ? theme.valid
        : theme.error
    };
    background-color: ${
      valid === undefined
        ? "#fff"
        : valid === true
        ? theme.validLight
        : theme.errorLight
    };
    padding: 0.6em 0.9em;
  `}
`;

const InputView = props => {
  return <StyledInput {...props} />;
};

export { InputView as default, Label, InputError, Fieldset, InputDiv };
