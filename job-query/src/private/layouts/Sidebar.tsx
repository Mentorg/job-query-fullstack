import { useAuth } from "../../shared/context/AuthContext";
import AdminSidebar from "./AdminSidebar";
import ApplicantSidebar from "./ApplicantSidebar";
import RecruiterSidebar from "./RecruiterSidebar";

function Sidebar() {
  const { user } = useAuth();

  return (
    <>
      {user?.role === "admin" ? (
        <AdminSidebar />
      ) : user?.role === "recruiter" ? (
        <RecruiterSidebar />
      ) : (
        <ApplicantSidebar />
      )}
    </>
  );
}

export default Sidebar;
