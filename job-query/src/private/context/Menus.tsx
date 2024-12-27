import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

type MenuProps = {
  children: React.ReactNode;
};

type MenusContextType = {
  openId: string;
  position: { x: number; y: number } | null;
  close: () => void;
  open: (id: string) => void;
  setPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >;
};

type MenusProps = {
  children: React.ReactNode;
};

type ToggleProps = {
  id: string;
};

type ListProps = {
  id: string;
  children: React.ReactNode;
};

type ButtonProps = {
  children: React.ReactNode;
  type?: string;
  onClick?: () => void;
};

const Menu = ({ children }: MenuProps) => (
  <div className="flex items-center justify-end">{children}</div>
);

const MenusContext = createContext<MenusContextType>({
  openId: "",
  position: null,
  close: () => {},
  open: () => {},
  setPosition: () => {},
});

function Menus({ children }: MenusProps) {
  const [openId, setOpenId] = useState<string>("");
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );

  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: ToggleProps) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    // Ensure id is always defined before calling open
    if (id !== undefined) {
      openId === "" || openId !== id ? open(id) : close();
    }
  }

  return (
    <button
      onClick={handleClick}
      className="translate-x-2 transform rounded-full border-none bg-none p-1 transition duration-200 hover:bg-gray-100"
    >
      <HiEllipsisVertical className="h-6 w-6 text-gray-700" />
    </button>
  );
}

function List({ id, children }: ListProps) {
  const { openId, position, close } = useContext(MenusContext);
  const ulRef = useOutsideClick<HTMLUListElement>(() => {
    close();
  }, false);

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={ulRef}
      style={{ right: position?.x + "px", top: position?.y + "px" }}
      className="bg-gray-0 fixed rounded-md shadow-md"
    >
      {children}
    </ul>,
    document.body,
  );
}

function Button({ children, type, onClick }: ButtonProps) {
  const { close } = useContext(MenusContext);
  let styleSwitch;

  switch (type) {
    case "option":
      styleSwitch = "px-4 py-2 border-none bg-white hover:bg-gray-50 ";
      break;
    case "add":
      styleSwitch =
        "px-4 py-2 rounded-md border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white";
      break;
    case "edit":
      styleSwitch =
        // "px-4 py-2 rounded-md border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white";
        "px-4 py-2 rounded-md border-2 border-slate-300 px-6 py-2 text-sm text-slate-500 transition-all hover:bg-slate-300 hover:text-white";
      break;
    case "delete":
      styleSwitch =
        "px-4 py-2 rounded-md border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white";
      break;
    case "confirm":
      styleSwitch =
        "mt-auto rounded-md bg-primary px-6 py-2 text-sm text-white transition-all hover:bg-primary/70";
      break;
    case "icon":
      styleSwitch = "p-0";
      break;
    default:
      styleSwitch = "";
  }

  function handleClick() {
    onClick?.();
    close();
    // close;
  }

  return (
    <li className={type === "confirm" ? "mt-auto" : ""}>
      <button
        onClick={handleClick}
        className={`${styleSwitch} flex w-full items-center gap-4 text-left text-sm font-medium transition duration-200`}
      >
        {children}
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
