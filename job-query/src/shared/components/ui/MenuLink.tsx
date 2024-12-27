import { NavLink } from "react-router-dom";

type MenuLinkProps = {
  to: string;
  children: React.ReactNode;
};

function MenuLink({ to, children }: MenuLinkProps) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => {
        return isActive
          ? {
              backgroundColor: "#CE2079",
              color: "#fff",
            }
          : {};
      }}
      className={({ isActive }) =>
        [
          isActive
            ? "group flex items-center rounded-md px-2 py-1 text-sm text-white transition-all hover:bg-primary lg:py-0"
            : "group flex items-center rounded-md px-2 py-1 text-sm text-slate-500 transition-all hover:bg-primary lg:py-0",
        ].join(" ")
      }
      end={to === "jobs" ? true : false}
    >
      {children}
    </NavLink>
  );
}

export default MenuLink;
