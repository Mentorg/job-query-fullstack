import { NavLink } from "react-router-dom";
import { LiaUser } from "react-icons/lia";
import { LiaUserCogSolid } from "react-icons/lia";
import { SlHome } from "react-icons/sl";
import { PiSignOutFill } from "react-icons/pi";
import { HiOutlineTag } from "react-icons/hi2";
import { useAuth } from "../../shared/context/AuthContext";
import { useActionsService } from "../hooks/useActionsService";
import { useLogout } from "../hooks/useLogout";
import Button from "../../shared/components/ui/Button";
import.meta.env;

type UserActionProps = {
  menu: string;
  activeMenu: boolean;
  onHandleOpenMenu: () => void;
};

function UserAction({ menu, activeMenu, onHandleOpenMenu }: UserActionProps) {
  const { user } = useAuth();
  const { handleOpenAction } = useActionsService();
  const logout = useLogout();

  let avatar;

  if (user?.avatar) {
    if (user?.role === "admin") {
      avatar = `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/admin.png`;
    } else if (user?.avatar.includes("avatars")) {
      avatar = `http://127.0.0.1:8000/storage/${user?.avatar}`;
    } else {
      avatar = `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/${user?.avatar}`;
    }
  } else {
    avatar = `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/default-avatar.png`;
  }

  const userRole = user?.role;

  const handleNavLinkClick = () => {
    handleOpenAction(menu);
  };

  return (
    <li>
      <Button
        onClick={onHandleOpenMenu}
        className={`relative ${activeMenu && " focus:text-primary active:text-primary"} h-10 w-full`}
      >
        {menu === "userMenu" && (
          <img
            src={avatar}
            alt="Logged in user avatar"
            className="h-full w-full rounded-full"
          />
        )}
      </Button>
      {activeMenu && (
        <div className="absolute right-0 top-16 z-[2] mr-2 w-full max-w-48 rounded-md border border-slate-200 bg-white px-2 py-2 text-black">
          <span
            className={`absolute top-[-5%] z-40 border-b-[10px] border-l-[10px] border-r-[10px] border-b-slate-200 border-l-transparent border-r-transparent ${menu === "userMenu" && "right-3"}`}
          />
          <ul>
            <li className="px-2 py-2 hover:bg-slate-100">
              <NavLink
                to={
                  userRole === "admin"
                    ? "/admin/users"
                    : userRole === "recruiter"
                      ? "/dashboard/user"
                      : "/user/profile"
                }
                className="flex items-center"
                onClick={handleNavLinkClick}
              >
                <span>
                  <LiaUser className="h-[1.25rem] w-[1.25rem] text-slate-500" />
                </span>
                <p className="ml-3 text-xs font-semibold text-slate-500">
                  {userRole === "admin" || userRole === "recruiter"
                    ? "Dashboard"
                    : "My Profile"}
                </p>
              </NavLink>
            </li>
            {userRole === "recruiter" && (
              <>
                <li className="px-2 py-2 hover:bg-slate-100">
                  <NavLink
                    to={
                      userRole === "recruiter"
                        ? "/dashboard/settings/account"
                        : "/user/settings"
                    }
                    className="flex items-center"
                    onClick={handleNavLinkClick}
                  >
                    <span>
                      <LiaUserCogSolid className="h-[1.25rem] w-[1.25rem] text-slate-500" />
                    </span>
                    <p className="ml-3 text-xs font-semibold text-slate-500">
                      Account Settings
                    </p>
                  </NavLink>
                </li>
                <li className="px-2 py-2 hover:bg-slate-100">
                  <NavLink
                    to="/dashboard/company"
                    className="flex items-center"
                    onClick={handleNavLinkClick}
                  >
                    <span>
                      <SlHome className="h-[1.25rem] w-[1.25rem] text-slate-500" />
                    </span>
                    <p className="ml-3 text-xs font-semibold text-slate-500">
                      Company Profile
                    </p>
                  </NavLink>
                </li>
                <li className="px-2 py-2 hover:bg-slate-100">
                  <div className="flex items-center">
                    <span>
                      <HiOutlineTag className="h-[1.25rem] w-[1.25rem] text-slate-500" />
                    </span>
                    <div className="flex w-full items-center justify-between">
                      <p className="ml-3 text-xs font-semibold text-slate-500">
                        Pricing Plans
                      </p>
                      <span className="rounded-md bg-primary p-[.25rem] text-[.5rem] text-white">
                        soon
                      </span>
                    </div>
                  </div>
                </li>
              </>
            )}
            <li className="px-2 py-2 hover:bg-slate-100">
              <button onClick={logout} className="flex items-center">
                <span>
                  <PiSignOutFill className="h-[1.25rem] w-[1.25rem] text-slate-500" />
                </span>
                <p className="ml-3 text-xs font-semibold text-slate-500">
                  Sign Out
                </p>
              </button>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
}

export default UserAction;
