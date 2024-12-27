import { NavLink } from "react-router-dom";

type SettingsLinkProps = {
  to: string;
  title: string;
};

function SettingsLink({ to, title }: SettingsLinkProps) {
  return (
    <li>
      <NavLink
        to={to}
        className="whitespace-nowrap rounded-md border-2 border-transparent px-8 py-2 text-sm font-medium transition-all hover:bg-primary hover:text-white"
        style={({ isActive }) => {
          return isActive
            ? {
                backgroundColor: "#CE2079",
                border: "2px solid rgb(206, 32, 121)",
                color: "#fff",
              }
            : {};
        }}
      >
        {title}
      </NavLink>
    </li>
  );
}

export default SettingsLink;
