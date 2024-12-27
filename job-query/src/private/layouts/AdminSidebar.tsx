import { FaUsers } from "react-icons/fa";
import {
  HiBuildingLibrary,
  HiComputerDesktop,
  HiMiniBell,
  HiMiniEnvelope,
  HiMiniSquaresPlus,
  HiMiniUserPlus,
} from "react-icons/hi2";
import MenuLink from "../../shared/components/ui/MenuLink";

function AdminSidebar() {
  return (
    <aside className="hidden w-[300px] min-w-[250px] lg:flex">
      <div
        className="fixed top-[70px] flex h-full w-[275px] flex-col justify-between border-r-2 border-slate-200 p-4"
        style={{ height: "calc(100dvh - 70px)" }}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="py-2">
            <h4 className="mb-2 text-[0.65rem] font-bold uppercase text-slate-500">
              Menu
            </h4>
            <ul>
              <li className="group">
                <MenuLink to="users">
                  <FaUsers className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                  <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                    Users
                  </p>
                </MenuLink>
              </li>
              <li className="group">
                <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
                  <HiMiniEnvelope className="h-10 w-5" />
                  <div className="flex w-full justify-between">
                    <p className="ml-2 text-sm font-medium">Messages</p>
                    <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                      soon
                    </span>
                  </div>
                </div>
              </li>
              <li className="group">
                <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
                  <HiMiniBell className="h-10 w-5" />
                  <div className="flex w-full justify-between">
                    <p className="ml-2 text-sm font-medium">Notifications</p>
                    <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                      soon
                    </span>
                  </div>
                </div>
              </li>
              <li className="group">
                <MenuLink to="companies">
                  <HiBuildingLibrary className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                  <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                    Companies
                  </p>
                </MenuLink>
              </li>
              <li className="group">
                <MenuLink to="jobs">
                  <HiComputerDesktop className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                  <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                    Jobs
                  </p>
                </MenuLink>
              </li>
              <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-200" />
              <li className="group">
                <MenuLink to="newRecruiter">
                  <HiMiniUserPlus className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                  <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                    Create Recruiter
                  </p>
                </MenuLink>
              </li>
              <li className="group">
                <MenuLink to="newCompany">
                  <HiMiniSquaresPlus className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                  <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                    Create Company
                  </p>
                </MenuLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
