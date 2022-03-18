import React from "react";
import { CSSTransition } from "react-transition-group";
import { useUpdate, useRefLive } from "@dhmk/react";
import cn from "classnames";
import styles from "./styles.module.scss";

export default function AnimatedDiff({ value, className }) {
  const nodeRef = React.useRef(null);
  const prev = useRefLive(value);
  const update = useUpdate();

  const diff = value - prev.current;
  const diffSign = diff > 0 ? "+" : "";
  const diffStr = diffSign + diff;

  const timeout = 800;

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={!!diff}
      timeout={timeout}
      classNames={styles}
      onEntered={update}
    >
      <div
        ref={nodeRef}
        className={cn(className, styles.idle)}
        style={{ transitionDuration: `${timeout}ms` }}
      >
        {diffStr}
      </div>
    </CSSTransition>
  );
}
