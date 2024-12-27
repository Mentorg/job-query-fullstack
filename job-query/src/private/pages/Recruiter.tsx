import { MdWork } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaEnvelope, FaLinkedin, FaPen, FaPhoneAlt } from "react-icons/fa";
import { LuPenLine } from "react-icons/lu";
import Menus from "../context/Menus";
import Modal from "../context/Modal";
import UserForm from "../features/profiles/components/user/UserForm";
import UpdateRecruiter from "../features/profiles/components/recruiter/UpdateRecruiter";
import RecruiterTeam from "../features/profiles/components/recruiter/RecruiterTeam";
import RecruiterAds from "../features/profiles/components/recruiter/RecruiterAds";
import RecruiterMetrics from "../features/profiles/components/recruiter/RecruiterMetrics";
import Loading from "../../shared/components/ui/Loading";
import Fallback from "../../shared/components/ui/Fallback";
import { useAuth } from "../../shared/context/AuthContext";
import { useGetRecruiter } from "../features/profiles/hooks/useGetRecruiter";
import { useGetRecruiterTeam } from "../features/profiles/hooks/useGetRecruiterTeam";

function Recruiter() {
  const { user } = useAuth();
  const {
    recruiter,
    isPending: isPendingRecruiter,
    error: recruiterError,
  } = useGetRecruiter();
  const {
    recruiterTeam,
    isPending: isPendingRecruiterTeam,
    error: recruiterTeamError,
  } = useGetRecruiterTeam();

  const avatarUrl = user?.avatar
    ? `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/${user?.avatar}`
    : `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/default-avatar`;

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      {isPendingRecruiter ? (
        <Loading />
      ) : recruiterError ? (
        <Fallback
          errorType="fetch"
          message={recruiterError.message || "Failed to load data"}
        />
      ) : (
        <>
          <div className="mt-10 flex flex-col items-center justify-center">
            <img
              src={avatarUrl}
              alt="User's avatar"
              className="h-[5rem] w-[5rem] rounded-full"
            />
            <h1 className="mt-5 text-2xl font-medium">{user?.name}</h1>
            <div className="flex justify-center gap-10 lg:justify-end">
              {user && (
                <Modal>
                  <Modal.Open opens="edit">
                    <Menus.Button>
                      <span className="flex items-center gap-x-2 text-xs font-medium text-green-600 transition-all hover:text-green-400">
                        <LuPenLine />
                        Edit Profile
                      </span>
                    </Menus.Button>
                  </Modal.Open>
                  <Modal.Window name="edit">
                    <UserForm profile={user} onCloseModal={close} />
                  </Modal.Window>
                </Modal>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:grid-rows-2 md:flex-row xl:flex">
            <RecruiterMetrics />
          </div>
          <div className="flex flex-col gap-y-4 lg:gap-x-10 xl:flex-row">
            <div className="flex rounded-md bg-slate-100 p-10">
              <div className="flex w-full flex-col gap-y-4">
                <div className="flex w-full flex-col">
                  <h2 className="text-lg font-medium">Experience</h2>
                  <p className="mt-4 leading-8">{recruiter?.expertise}</p>
                </div>
                <hr />
                <div className="flex flex-col">
                  <h2 className="text-lg font-medium">About me</h2>
                  <p className="mt-4 leading-8">{recruiter?.description}</p>
                </div>
              </div>
              <Modal>
                <Modal.Open opens="edit">
                  <Menus.Button>
                    <FaPen className="text-green-600 transition-all hover:text-green-400" />
                  </Menus.Button>
                </Modal.Open>
                <Modal.Window name="edit">
                  <UpdateRecruiter recruiter={recruiter} onCloseModal={close} />
                </Modal.Window>
              </Modal>
            </div>
            <div className="flex flex-wrap justify-evenly gap-10 rounded-md bg-slate-100 p-10 xl:flex-col">
              <div className="flex flex-col gap-y-2">
                <h2 className="font-medium">Contact Information</h2>
                <div className="flex w-full items-center text-sm">
                  <FaEnvelope />
                  <p className="ml-2">{user?.email}</p>
                </div>
                <div className="flex w-full items-center text-sm">
                  <FaPhoneAlt />
                  <p className="ml-2">{user?.phone}</p>
                </div>
                <div className="flex w-full items-center text-sm">
                  <FaLocationDot />
                  <p className="ml-2">
                    {user?.location.city}, {user?.location.code}
                  </p>
                </div>
                <div className="flex w-full items-center text-sm">
                  <FaLinkedin />
                  <p className="ml-2">@{user?.linkedinProfile}</p>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <h2 className="font-medium">Company information</h2>
                <div className="flex w-full items-center text-sm">
                  <MdWork />
                  <p className="ml-2">{recruiter.company.name}</p>
                </div>
                <div className="flex w-full items-center text-sm">
                  <FaPhoneAlt />
                  <p className="ml-2">{recruiter.company.phone}</p>
                </div>
                <div className="flex w-full items-center text-sm">
                  <FaEnvelope />
                  <p className="ml-2">{recruiter.company.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-col items-center">
            {isPendingRecruiterTeam ? (
              <Loading />
            ) : recruiterTeamError ? (
              <Fallback
                errorType="fetch"
                message={recruiterTeamError?.message || "Failed to load data"}
              />
            ) : (
              <RecruiterTeam team={recruiterTeam} user={user} />
            )}
          </div>
          <div>
            <RecruiterAds
              recruiterAds={recruiter.jobs}
              company={recruiter.company}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Recruiter;
