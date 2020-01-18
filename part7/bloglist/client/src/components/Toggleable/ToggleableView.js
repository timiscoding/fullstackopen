import React, {
  useState,
  useImperativeHandle,
  useRef,
  useLayoutEffect
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ResizeObserver as Polyfill } from "@juggle/resize-observer";
import Button from "../Button";
import PrimaryButton from "../PrimaryButton";

const HideButton = styled(Button)`
  border-radius: 3px;
`;

const ShowWhenVisible = styled.div`
  overflow: hidden;
  margin-top: 10px;
  border-radius: 0 3px 3px;
  border-width: 1px;
  border-style: solid;
  transition: ${({ observeResize }) =>
    observeResize ? "none" : "height .3s, border .5s"};
  height: ${({ growHeight }) => `${growHeight}px`};
  border-color: ${({ growHeight, theme }) =>
    growHeight ? theme.greyLight : "rgba(255,255,255,0)"};
`;

const ResizeObserver = window.ResizeObserver || Polyfill;

const ToggleableView = React.forwardRef(
  ({ buttonLabel, children, className }, ref) => {
    const growRef = useRef();
    const contentRef = useRef();
    const [growHeight, setGrowHeight] = useState(0);
    const [observeResize, setObserveResize] = useState(false);

    useImperativeHandle(ref, () => ({
      toggleVisible
    }));

    useLayoutEffect(() => {
      if (!observeResize) return;
      const ro = new ResizeObserver(([entry]) => {
        let height = 0;
        const { borderBoxSize, contentRect } = entry;
        if (borderBoxSize) {
          height = borderBoxSize.blockSize;
        } else if (contentRect) {
          height = contentRect.height;
        }

        setGrowHeight(height);
      });

      ro.observe(contentRef.current);
      return () => ro.disconnect();
    }, [observeResize]);

    const toggleVisible = () => {
      const height = growHeight === 0 ? contentRef.current.scrollHeight : 0;
      setGrowHeight(height);
      if (height === 0) {
        setObserveResize(false);
      }
    };

    const handleChildrenResize = event => {
      if (
        event.target === growRef.current &&
        event.propertyName === "height" &&
        growHeight !== 0
      ) {
        setObserveResize(true);
      }
    };

    const child = React.Children.only(children);

    return (
      <div className={className}>
        <Button
          as={growHeight === 0 ? PrimaryButton : HideButton}
          onClick={toggleVisible}
        >
          {growHeight === 0 ? buttonLabel() : "Hide"}
        </Button>
        <ShowWhenVisible
          ref={growRef}
          growHeight={growHeight}
          onTransitionEnd={handleChildrenResize}
          observeResize={observeResize}
        >
          <div ref={contentRef}>
            {React.cloneElement(child, { toggleableOpen: observeResize })}
          </div>
        </ShowWhenVisible>
      </div>
    );
  }
);

ToggleableView.propTypes = {
  buttonLabel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

ToggleableView.displayName = "ToggleableView";

export default ToggleableView;
