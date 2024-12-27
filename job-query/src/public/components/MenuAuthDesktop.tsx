import { NavLink } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext";

export default function MenuAuthDesktop() {
  const { user } = useAuth();
  const userRole = user?.role;

  return (
    <>
      <NavLink
        to="/"
        style={({ isActive }) => {
          return isActive
            ? { borderBottom: "solid 2px #CE2079", color: "#CE2079" }
            : {};
        }}
        className="text-base font-medium transition-all hover:border-b-2 hover:border-solid hover:border-primary hover:text-primary"
      >
        Home
      </NavLink>
      {(userRole === "recruiter" || userRole === "admin") && (
        <>
          <NavLink
            to={userRole === "admin" ? "/admin/users" : "/dashboard/overview"}
            style={({ isActive }) => {
              return isActive
                ? { borderBottom: "solid 2px #CE2079", color: "#CE2079" }
                : {};
            }}
            className="text-base font-medium transition-all hover:border-b-2 hover:border-solid hover:border-primary hover:text-primary"
          >
            Dashboard
          </NavLink>
          {userRole === "recruiter" && (
            <NavLink
              to="/dashboard/newJob"
              className="rounded-md bg-primary px-7 py-1 text-base font-medium text-white transition-all hover:bg-primary/70"
            >
              Post a Job
            </NavLink>
          )}
        </>
      )}
      <NavLink
        to="/privacyPolicy"
        style={({ isActive }) => {
          return isActive
            ? { borderBottom: "solid 2px #CE2079", color: "#CE2079" }
            : {};
        }}
        className="text-base font-medium transition-all hover:border-b-2 hover:border-solid hover:border-primary hover:text-primary"
      >
        Privacy Policy
      </NavLink>
      <NavLink
        to="/contact"
        style={({ isActive }) => {
          return isActive
            ? { borderBottom: "solid 2px #CE2079", color: "#CE2079" }
            : {};
        }}
        className="text-base font-medium transition-all hover:border-b-2 hover:border-solid hover:border-primary hover:text-primary"
      >
        Contact
      </NavLink>
    </>
  );
}
