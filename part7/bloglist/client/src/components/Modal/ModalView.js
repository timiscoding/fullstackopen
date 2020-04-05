import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useTransition, config } from "react-spring";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import { ModalBox, ModalBackground, CloseButton, CloseIcon } from "./styled";
import { ESCAPE_KEY, TAB_KEY } from "../../constants";

const modalRoot = document.getElementById("modal-root");

const ModalView = ({ show, onClose, children }) => {
  const handleClickBackground = (event) => {
    if (event.target !== event.currentTarget) return;
    onClose(event);
  };
  const handleFocusTrap = (event) => {
    if (!modalRef.current) return;
    const focusEls = Array.from(
      modalRef.current.querySelectorAll(
        "a[href], button, textarea, input[type='text'], input[type='radio'], input[type='checkbox'], select"
      )
    );
    if (focusEls.length === 0) return;
    const firstEl = focusEls[0];
    const lastEl = focusEls[focusEls.length - 1];
    if (!focusEls.includes(document.activeElement)) {
      outsideFocus.current = document.activeElement;
      firstEl.focus();
      return event.preventDefault();
    }
    if (event.shiftKey && document.activeElement === firstEl) {
      lastEl.focus();
      return event.preventDefault();
    }
    if (!event.shiftKey && document.activeElement === lastEl) {
      firstEl.focus();
      return event.preventDefault();
    }
  };
  const keyListenerMap = new Map([
    [ESCAPE_KEY, onClose],
    [TAB_KEY, handleFocusTrap],
  ]);

  const scrollableRef = useRef();
  const modalRef = useRef();
  const outsideFocus = useRef();
  useEffect(() => {
    if (show) {
      disableBodyScroll(scrollableRef.current);
    } else {
      enableBodyScroll(scrollableRef.current);
      outsideFocus.current && outsideFocus.current.focus();
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [show]);
  useEffect(() => {
    const keyListener = (event) => {
      if (!show) return;
      const listener = keyListenerMap.get(event.keyCode);
      listener && listener(event);
    };
    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [show, keyListenerMap]);
  /*
    If modal is unmounted unconventionally ie. browser navigating fwd/bwd, close it.
    This fixes issue where modal remains open when going backward and forward since
    modal state is kept in context.
    REMEMBER TO PASS A memoized onClose callback. Otherwise, modal will auto close on open!
  */
  useEffect(() => onClose, [onClose]);
  const transition = useTransition(show, null, {
    from: {
      y: "30px",
      opacity: 0,
    },
    enter: {
      y: "0px",
      opacity: 1,
    },
    leave: {
      y: "-30px",
      opacity: 0,
    },
    config: config.stiff,
  });

  return ReactDOM.createPortal(
    transition.map(
      ({ item, props, key }) =>
        item && (
          <ModalBackground
            key={key}
            onClick={handleClickBackground}
            ref={scrollableRef}
            style={{
              opacity: props.opacity,
            }}
          >
            <ModalBox
              ref={modalRef}
              style={{
                transform: props.y.interpolate((v) => `translateY(${v})`),
              }}
            >
              <CloseButton onClick={onClose} color="black">
                <CloseIcon />
              </CloseButton>
              {children}
            </ModalBox>
          </ModalBackground>
        )
    ),
    modalRoot
  );
};

ModalView.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

ModalView.Header = Header;
ModalView.Body = Body;
ModalView.Footer = Footer;

export default ModalView;
