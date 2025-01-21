import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Logo from "./Logo";
import MenuAuthDesktop from "./MenuAuthDesktop";
import MenuUnauthDesktop from "./MenuUnauthDesktop";
import MenuAuthMobile from "./MenuAuthMobile";
import MenuUnauthMobile from "./MenuUnauthMobile";
import NavActions from "./NavActions";
import { useNavigationToggle } from "../hooks/useNavigationToggle";

function Navigation() {
  const { user, toggleMenu, setToggleMenu, navRef } = useNavigationToggle();
  const { t } = useTranslation();

  return (
    <div className="fixed z-10 flex w-full flex-row items-center justify-between border border-b-slate-200 bg-white p-3 text-slate-500">
      <Logo mode="dark" />
      <div className="flex lg:hidden">
        <button onClick={() => setToggleMenu(!toggleMenu)}>
          <IoMenu className="h-8 w-8" />
        </button>
      </div>
      <nav
        ref={navRef}
        className={`${toggleMenu ? "flex" : "hidden"} fixed left-0 top-0 h-dvh min-w-[300px] flex-col space-y-2 overflow-y-auto border-r border-slate-200 bg-white px-6 py-10 font-medium text-black`}
      >
        {user ? <MenuAuthMobile /> : <MenuUnauthMobile />}
      </nav>
      <nav className="semibold hidden space-x-6 text-lg font-normal lg:flex lg:items-baseline">
        {user ? <MenuAuthDesktop /> : <MenuUnauthDesktop />}
      </nav>
      <div className="hidden lg:flex">
        {user ? (
          <NavActions />
        ) : (
          <NavLink to="/login" className="text-base font-medium">
            {t("navigation.login")}
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Navigation;
