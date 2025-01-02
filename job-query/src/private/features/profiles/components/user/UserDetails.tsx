import StatusChip from "../../../../components/StatusChip";
import ApplicantJobHistory from "../applicant/ApplicantJobHistory";
import RecruiterJobHistory from "../recruiter/RecruiterJobHistory";
import { User } from "../../../../../shared/types/user";
import { formatDate } from "../../../../../shared/utils/dateFormat";

type UserDetailsProps = {
  resource: User;
};

function UserDetails({ resource }: UserDetailsProps) {
  let avatar;

  if (resource.avatar) {
    if (resource.role === "admin") {
      avatar = `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/admin.png`;
    } else if (resource.avatar.includes("avatars")) {
      avatar = `http://127.0.0.1:8000/storage/${resource.avatar}`;
    } else {
      avatar = `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/${resource.avatar}`;
    }
  } else {
    avatar = `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/default-avatar.png`;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-x-10 lg:flex-row">
        <div className="flex w-full flex-row gap-4">
          <img src={avatar} alt="User's avatar" />
          <div className="flex flex-col gap-y-2 xs:flex-row md:mx-4">
            <div className="flex w-max flex-col">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold">{resource.name}</h1>
                <div className="xs:ml-4">
                  <StatusChip>{resource.role}</StatusChip>
                </div>
              </div>
              <div>
                <p className="text-sm">{resource.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h6 className="font-semibold">Created</h6>
          <p className="text-sm font-semibold text-slate-500">
            {formatDate(resource.createdAt)}
          </p>
        </div>
      </div>
      <div className="py-5">
        <h2 className="text-xl font-medium">Personal Details</h2>
        <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col">
            <p className="font-medium">First Name</p>
            <p className="text-slate-700">{resource.name.split(" ")[0]}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Last Name</p>
            <p className="text-slate-700">{resource.name.split(" ")[1]}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Email</p>
            <p className="text-slate-700">{resource.email}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Phone</p>
            <p className="text-slate-700">
              {resource.phone || "No phone number provided"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Location</p>
            <p className="text-slate-700">
              {resource.location.city}, {resource.location.country}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Time zone</p>
            <p className="text-slate-700">
              {resource.timezone || "No time zone provided"}
            </p>
          </div>
        </div>
      </div>
      {resource.role !== "admin" && (
        <div className="py-5">
          <h3 className="text-xl font-medium">
            {resource.role === "recruiter" ? "Recruiter" : "Applicant"} Jobs
            {resource.role === "recruiter" ? (
              <RecruiterJobHistory resource={resource} />
            ) : (
              <ApplicantJobHistory resource={resource} />
            )}
          </h3>
        </div>
      )}
    </>
  );
}

export default UserDetails;
