import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

type ModalContextType = {
  openName: string;
  open: (name: string) => void;
  close: () => void;
};

type ModalProps = {
  children: React.ReactNode;
};

type OpenProps = {
  children: React.ReactElement;
  opens: string;
};

type WindowProps = {
  children: React.ReactNode;
  name: string;
};

export const ModalContext = createContext<ModalContextType>({
  openName: "",
  open: () => {},
  close: () => {},
});

const Modal = ({ children }: ModalProps) => {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens }: OpenProps) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
};

const Window = ({ children, name }: WindowProps) => {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-10 h-screen w-full bg-black bg-opacity-70 backdrop-blur backdrop-filter transition-all duration-500">
      <div
        ref={ref as React.MutableRefObject<HTMLDivElement>}
        // className={`${name === "edit" ? "h-fit" : ""} fixed left-1/2 top-1/2 max-h-[90dvh] w-[90dvw] -translate-x-1/2 -translate-y-1/2 transform overflow-y-scroll rounded-lg bg-white p-4 shadow-lg transition-all duration-500 md:p-12 lg:w-[90dvw] md:landscape:w-[90dvw] 2xl:landscape:w-[60dvw]`}
        className={`${name === "edit" ? "h-fit" : ""} fixed left-1/2 top-1/2 max-h-[90dvh] w-[90dvw] -translate-x-1/2 -translate-y-1/2 transform overflow-y-scroll rounded-lg bg-white p-4 shadow-lg transition-all duration-500 md:p-12 lg:w-[90dvw] md:landscape:w-[90dvw] 2xl:landscape:w-fit`}
      >
        <button
          onClick={close}
          className="absolute right-5 top-5 translate-x-2 transform rounded-sm border-none bg-none p-1 transition-all duration-200 hover:bg-gray-200"
        >
          <HiXMark />
        </button>
        <>
          {cloneElement(children as React.ReactElement, {
            onCloseModal: close,
          })}
        </>
      </div>
    </div>,
    document.body,
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
