import React from "react";
import { Button, Wrapper, Spinner, Icon } from "./styled";
import PropTypes from "prop-types";

const ButtonView = React.forwardRef(
  ({ children, pending, icon, round, appearance, ...props }, ref) => {
    return (
      <Button
        {...props}
        round={round}
        ref={ref}
        pending={pending}
        appearance={appearance}
      >
        <Wrapper pending={pending}>
          {icon && <Icon icon={icon} round={round} appearance={appearance} />}
          <span>{children}</span>
        </Wrapper>
        {pending && <Spinner />}
      </Button>
    );
  }
);

ButtonView.displayName = "ButtonView";

ButtonView.propTypes = {
  pending: PropTypes.bool,
  icon: PropTypes.string,
  round: PropTypes.bool,
  appearance: PropTypes.oneOf(["danger", "add", "primary"])
};

export default ButtonView;
