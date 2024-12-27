import {
  FaCog,
  FaHome,
  FaNewspaper,
  FaPhone,
  FaPlus,
  FaRegBuilding,
  FaRegChartBar,
  FaSignOutAlt,
  FaUser,
  FaUserLock,
  FaUserShield,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../shared/context/AuthContext";
import { useLogout } from "../hooks/useLogout";
import MenuLink from "../../shared/components/ui/MenuLink";
import Button from "../../shared/components/ui/Button";
import { HiMiniBell, HiMiniEnvelope, HiMiniTag } from "react-icons/hi2";

function MenuAuthMobile() {
  const { user } = useAuth();
  const logout = useLogout();

  const avatarUrl = user?.avatar
    ? `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/${user.avatar}`
    : `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/default-avatar.png`;
  const adminAvatarUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/admin.png`;

  return (
    <>
      <div className="flex">
        <img
          src={user?.role === "admin" ? adminAvatarUrl : avatarUrl}
          alt="User's avatar"
          className="h-12 w-12 rounded-full"
        />
        <div className="ml-2 flex flex-col justify-center">
          <h2 className="text-sm font-semibold">Hey, {user?.name}!</h2>
          <p className="text-xs text-slate-600">{user?.email}</p>
        </div>
      </div>
      {user?.role === "recruiter" ? (
        <>
          <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
            <HiMiniEnvelope className="h-5 w-5" />
            <div className="flex w-full justify-between">
              <p className="ml-2 text-sm font-medium">Messages</p>
              <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                soon
              </span>
            </div>
          </div>
          <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
            <HiMiniBell className="h-5 w-5" />
            <div className="flex w-full justify-between">
              <p className="ml-2 text-sm font-medium">Notifications</p>
              <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                soon
              </span>
            </div>
          </div>
          <hr />
          <MenuLink to="/">
            <FaHome className="h-5 w-5" />
            <span className="ml-2">Home</span>
          </MenuLink>
          <MenuLink to="/dashboard/overview">
            <FaUserLock className="h-5 w-5" />
            <span className="ml-2">Overview</span>
          </MenuLink>
          <MenuLink to="/dashboard/analytics">
            <FaRegChartBar className="h-5 w-5" />
            <span className="ml-2">Analytics</span>
          </MenuLink>
          <MenuLink to="/dashboard/company">
            <FaRegBuilding className="h-5 w-5" />
            <span className="ml-2">Company Profile</span>
          </MenuLink>
          <MenuLink to="/dashboard/user">
            <FaUser className="h-5 w-5" />
            <span className="ml-2">My Profile</span>
          </MenuLink>
          <MenuLink to="/dashboard/applications">
            <FaUsers className="h-5 w-5" />
            <span className="ml-2">Applications</span>
          </MenuLink>
          <MenuLink to="/dashboard/jobs">
            <FaNewspaper className="h-5 w-5" />
            <span className="ml-2">Jobs</span>
          </MenuLink>
          <MenuLink to="/dashboard/newJob">
            <FaPlus className="h-5 w-5" />
            <span className="ml-2">Post a Job</span>
          </MenuLink>
          <hr />
          <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
            <HiMiniTag className="h-5 w-5" />
            <div className="flex w-full justify-between">
              <p className="ml-2 text-sm font-medium">Pricing Plans</p>
              <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                soon
              </span>
            </div>
          </div>
          <MenuLink to="/dashboard/settings/account">
            <FaCog className="h-5 w-5" />
            <span className="ml-2">Settings</span>
          </MenuLink>
        </>
      ) : user?.role === "admin" ? (
        <>
          <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
            <HiMiniEnvelope className="h-5 w-5" />
            <div className="flex w-full justify-between">
              <p className="ml-2 text-sm font-medium">Messages</p>
              <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                soon
              </span>
            </div>
          </div>
          <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
            <HiMiniBell className="h-5 w-5" />
            <div className="flex w-full justify-between">
              <p className="ml-2 text-sm font-medium">Notifications</p>
              <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                soon
              </span>
            </div>
          </div>
          <hr />
          <MenuLink to="/">
            <FaHome className="h-5 w-5" />
            <span className="ml-2">Home</span>
          </MenuLink>
          <MenuLink to="/admin/users">
            <FaUser className="h-5 w-5" />
            <span className="ml-2">Users</span>
          </MenuLink>
          <MenuLink to="/admin/companies">
            <FaUser className="h-5 w-5" />
            <span className="ml-2">Companies</span>
          </MenuLink>
          <MenuLink to="/admin/jobs">
            <FaUser className="h-5 w-5" />
            <span className="ml-2">Jobs</span>
          </MenuLink>
          <hr />
          <MenuLink to="/admin/newRecruiter">
            <FaUser className="h-5 w-5" />
            <span className="ml-2">Create Recruiter</span>
          </MenuLink>
          <MenuLink to="/admin/newCompany">
            <FaUser className="h-5 w-5" />
            <span className="ml-2">Create Company</span>
          </MenuLink>
        </>
      ) : (
        <>
          <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
            <HiMiniEnvelope className="h-5 w-5" />
            <div className="flex w-full justify-between">
              <p className="ml-2 text-sm font-medium">Messages</p>
              <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                soon
              </span>
            </div>
          </div>
          <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
            <HiMiniBell className="h-5 w-5" />
            <div className="flex w-full justify-between">
              <p className="ml-2 text-sm font-medium">Notifications</p>
              <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                soon
              </span>
            </div>
          </div>
          <hr />
          <MenuLink to="/">
            <FaHome className="h-5 w-5" />
            <span className="ml-2">Home</span>
          </MenuLink>
          <MenuLink to="/user/profile">
            <FaUser className="h-5 w-5" />
            <span className="ml-2">My Profile</span>
          </MenuLink>
          <MenuLink to="/privacyPolicy">
            <FaUserShield className="h-5 w-5" />
            <span className="ml-2">Privacy Policy</span>
          </MenuLink>
          <MenuLink to="/contact">
            <FaPhone className="h-5 w-5" />
            <span className="ml-2">Contact</span>
          </MenuLink>
        </>
      )}
      <hr />
      <Button
        onClick={logout}
        className="group flex items-center rounded-md px-2 py-1 text-sm text-slate-500 transition-all hover:bg-primary"
      >
        <FaSignOutAlt className="h-5 w-5" />
        <span className="ml-2">Sign Out</span>
      </Button>
    </>
  );
}

export default MenuAuthMobile;
