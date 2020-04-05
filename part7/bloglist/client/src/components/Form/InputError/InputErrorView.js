import React, { useRef } from "react";
import { useTransition } from "react-spring";
import { Error } from "./styled";

const marginTop = "5px";
const InputError = ({ children }) => {
  const msgRef = useRef();
  const transition = useTransition(children, null, {
    from: { height: "0px", marginTop },
    enter: () => async next => {
      await next({
        height: `${msgRef?.current?.scrollHeight || 0}px`,
        marginTop
      });
    },
    leave: { height: "0px", marginTop: "0px" }
  });
  return transition.map(
    ({ item, props: style, key }) =>
      item && (
        <Error ref={msgRef} key={key} style={style}>
          {item}
        </Error>
      )
  );
};

export default InputError;
