/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({ children, isOpen }) {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return createPortal(
    isOpen ? (
      <div className={"dialog-shadow"}>
        <div className={"dialog-card"}>{children}</div>
      </div>
    ) : null,
    document.body
  );
}
