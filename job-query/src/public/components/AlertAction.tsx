import { FaBell, FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext";
import { useActionsService } from "../hooks/useActionsService";

type Data = {
  id: number;
  avatar?: string;
  subject: string;
  content: string;
  created_at: string;
  is_read: boolean;
};

type AlertActionProps = {
  menu: "notifications" | "messages";
  menuData: Data[];
  activeMenu: boolean;
  onHandleOpenMenu: () => void;
};

function AlertAction({
  menu,
  menuData,
  activeMenu,
  onHandleOpenMenu,
}: AlertActionProps) {
  const { user } = useAuth();
  const { handleOpenAction } = useActionsService();
  const userRole = user?.role;

  const handleNavLinkClick = () => {
    handleOpenAction(menu);
  };

  return (
    <li>
      <div
        onClick={onHandleOpenMenu}
        className={`relative ${activeMenu && "focus:text-primary active:text-primary"}`}
      >
        {menu === "notifications" ? (
          <FaBell className="h-5 w-5 text-primary transition-all hover:text-primary/70 focus:text-primary/70 active:text-primary/70" />
        ) : (
          <FaEnvelope className="h-5 w-5 text-primary transition-all hover:text-primary/70 focus:text-primary/70 active:text-primary/70" />
        )}
      </div>
      {activeMenu && (
        <div className="absolute right-0 top-16 z-[2] mr-2 w-3/12 rounded-md border border-slate-200 bg-white px-2 py-4 text-black 2xl:w-1/6">
          <span
            className={`absolute top-[-2.5%] z-40 border-b-[10px] border-l-[10px] border-r-[10px] border-b-slate-200 border-l-transparent border-r-transparent ${menu === "notifications" ? "right-28" : "right-16"}`}
          />
          <div className="flex items-baseline justify-between border-b-2 border-slate-300 pb-2 font-medium">
            <h3 className="text-sm font-medium capitalize">{menu}</h3>
          </div>
          <ul>
            {menuData.length > 0 ? (
              menuData.map((item) => {
                if (item.id < 4)
                  return (
                    <li key={item.id}>
                      <NavLink
                        to={
                          menu === "notifications"
                            ? userRole === "admin"
                              ? `/admin/notifications`
                              : userRole === "recruiter"
                                ? `/dashboard/notifications`
                                : `/user/notifications`
                            : userRole === "admin"
                              ? `/admin/messages/${item.id}`
                              : userRole === "recruiter"
                                ? `/dashboard/messages/${item.id}`
                                : `/user/messages/${item.id}`
                        }
                        className={`flex items-center gap-2 border-b-2 border-slate-300 px-2 py-4 text-left transition-all hover:bg-slate-100 ${menu !== "messages" ? "" : item.is_read ? "bg-white" : "bg-slate-100 hover:bg-white"}`}
                        onClick={handleNavLinkClick}
                      >
                        <span className="text-3xl text-blue-600">•</span>
                        <div className="grid gap-y-1">
                          <div id="title" className="flex justify-between">
                            <h4 className="line-clamp-1 text-xs font-medium leading-4">
                              {item.subject}
                            </h4>
                            <p className="ml-2 whitespace-nowrap text-xs text-slate-400">
                              {item.created_at}
                            </p>
                          </div>
                          <div id="content">
                            <p className="line-clamp-1 text-xs text-slate-500">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </NavLink>
                    </li>
                  );
              })
            ) : (
              <>
                {/* <h2 className="py-4 text-sm font-medium">No {menu} yet</h2> */}
                <h2 className="py-4 text-sm font-medium">Coming soon</h2>
              </>
            )}
          </ul>
          <div className="flex justify-center pt-2">
            {/* <NavLink
              className="text-xs font-medium text-slate-400 transition-all hover:text-primary"
              to={`${userRole === "admin" ? `/admin/${menu}` : userRole === "recruiter" ? `/dashboard/${menu}` : `/user/${menu}`}`}
            >
              View All...
            </NavLink> */}
          </div>
        </div>
      )}
    </li>
  );
}

export default AlertAction;
