import { LuPenLine } from "react-icons/lu";
import Modal from "../../../../context/Modal";
import Menus from "../../../../context/Menus";
import ApplicantMetrics from "./ApplicantMetrics";
import ApplicantExperience from "./ApplicantExperience";
import ApplicantEducation from "./ApplicantEducation";
import UserForm from "../user/UserForm";
import AddEducation from "./AddEducation";
import AddExperience from "./AddExperience";
import AddSkill from "./AddSkill";
import AddLanguage from "./AddLanguage";
import Loading from "../../../../../shared/components/ui/Loading";
import Fallback from "../../../../../shared/components/ui/Fallback";
import { useAuth } from "../../../../../shared/context/AuthContext";
import { useGetApplicant } from "../../hooks/useGetApplicant";
import { Experience } from "../../../../../shared/types/experience";
import { Education } from "../../../../../shared/types/education";
import { Ability } from "../../../../../shared/types/ability";

function Applicant() {
  const { user } = useAuth();
  const { applicant, isPending, error } = useGetApplicant();

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

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <div className="mt-10 flex flex-col items-center justify-center">
        <img
          src={avatar}
          alt="User's avatar"
          className="h-[5rem] w-[5rem] rounded-full"
        />
        <h1 className="mt-5 text-2xl font-medium">{user?.name}</h1>
        <div className="flex justify-center gap-10 lg:justify-end">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button>
                <span className="flex items-center gap-x-2 text-xs font-medium text-green-600">
                  <LuPenLine />
                  Edit Profile
                </span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <UserForm profile={user} onCloseModal={close} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
      <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:grid-rows-2 md:flex-row xl:flex">
        <ApplicantMetrics />
      </div>
      <div>
        <h2 className="py-4 text-xl font-medium">Personal Details</h2>
        <div className="flex flex-wrap justify-between gap-10 rounded-md bg-slate-100 px-5 py-6">
          <div className="flex flex-col">
            <p className="font-medium">Email Address</p>
            <p className="text-sm">{user?.email}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Phone Number</p>
            <p className="text-sm">
              {user?.phone || "No phone number provided"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">LinkedIn Profile</p>
            <p className="text-sm">
              @{user?.linkedinProfile || "No profile provided"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Country</p>
            <p className="text-sm">{user?.location?.country}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">City</p>
            <p className="text-sm">{user?.location?.city}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-medium">Time Zone</p>
            <p className="text-sm">
              {user?.timezone || "No time zone provided"}
            </p>
          </div>
        </div>
      </div>
      {isPending ? (
        <Loading />
      ) : error ? (
        <Fallback
          errorType="fetch"
          message={error.message || "Failed to load data"}
        />
      ) : (
        <>
          <div>
            <div className="flex items-center justify-between">
              <h2 className="py-4 text-xl font-medium">Experience</h2>
              <Modal>
                <Modal.Open opens="add">
                  <Menus.Button type="add">
                    Add
                    <LuPenLine />
                  </Menus.Button>
                </Modal.Open>
                <Modal.Window name="add">
                  <AddExperience onCloseModal={close} />
                </Modal.Window>
              </Modal>
            </div>
            {applicant.experiences && applicant.experiences.length > 0 ? (
              applicant.experiences.map((experience: Experience) => (
                <ApplicantExperience
                  resource={experience}
                  key={experience.id}
                />
              ))
            ) : (
              <p>No experience data available</p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h2 className="py-4 text-xl font-medium">Education</h2>
              <Modal>
                <Modal.Open opens="add">
                  <Menus.Button type="add">
                    Add
                    <LuPenLine />
                  </Menus.Button>
                </Modal.Open>
                <Modal.Window name="add">
                  <AddEducation onCloseModal={close} />
                </Modal.Window>
              </Modal>
            </div>
            {applicant.educations && applicant.educations.length > 0 ? (
              applicant.educations.map((education: Education) => (
                <ApplicantEducation resource={education} key={education.id} />
              ))
            ) : (
              <p>No education data available</p>
            )}
          </div>
          <div className="flex flex-col justify-around gap-4 py-5 md:flex-row">
            <div className="flex w-full flex-col gap-5 py-8">
              <h2 className="text-xl font-medium">Skills</h2>
              <div className="flex flex-wrap items-center gap-2">
                {applicant.skills?.length > 0 ? (
                  applicant.skills.map((skill: Ability) => (
                    <div
                      key={skill.id}
                      className="flex h-fit w-max items-center rounded-md bg-primary px-4 py-2 text-xs text-white"
                    >
                      <span>{skill.description}</span>
                    </div>
                  ))
                ) : (
                  <p>No skills provided</p>
                )}
                <Modal>
                  <Modal.Open opens="add">
                    <Menus.Button type="add">Update</Menus.Button>
                  </Modal.Open>
                  <Modal.Window name="add">
                    <AddSkill
                      resource={applicant.skills}
                      onCloseModal={close}
                    />
                  </Modal.Window>
                </Modal>
              </div>
            </div>
            <div className="flex w-full flex-col gap-5 py-8">
              <h2 className="text-xl font-medium">Languages</h2>
              <div className="flex flex-wrap items-center gap-2">
                {applicant.languages?.length > 0 ? (
                  applicant.languages.map((language: Ability) => (
                    <div
                      key={language.id}
                      className="flex h-fit w-max items-center rounded-md bg-primary px-4 py-2 text-xs text-white"
                    >
                      <span>{language.description}</span>
                    </div>
                  ))
                ) : (
                  <p>No languages provided</p>
                )}
                <Modal>
                  <Modal.Open opens="add">
                    <Menus.Button type="add">Update</Menus.Button>
                  </Modal.Open>
                  <Modal.Window name="add">
                    <AddLanguage
                      resource={applicant.languages}
                      onCloseModal={close}
                    />
                  </Modal.Window>
                </Modal>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Applicant;
