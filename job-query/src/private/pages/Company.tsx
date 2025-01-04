import { IoIosLink } from "react-icons/io";
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { LuPenLine } from "react-icons/lu";
import Modal from "../context/Modal";
import Menus from "../context/Menus";
import UpdateCompany from "../features/profiles/components/company/UpdateCompany";
import Loading from "../../shared/components/ui/Loading";
import Fallback from "../../shared/components/ui/Fallback";
import { useGetRecruiterCompany } from "../features/profiles/hooks/useGetRecruiterCompany";
import { Location } from "../../shared/types/location";

function Company() {
  const { recruiterCompany, isPending, error } = useGetRecruiterCompany();

  let avatar;

  if (recruiterCompany?.avatar) {
    if (recruiterCompany?.avatar.includes("logos")) {
      avatar = `http://127.0.0.1:8000/storage/${recruiterCompany?.avatar}`;
    } else {
      avatar = `${import.meta.env.VITE_REACT_APP_API_URL}/public/logos/${recruiterCompany?.avatar}`;
    }
  } else {
    avatar = `${import.meta.env.VITE_REACT_APP_API_URL}/public/logos/default-logo.svg`;
  }

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      {isPending ? (
        <Loading />
      ) : error ? (
        <Fallback
          errorType="fetch"
          message={error.message || "Failed to load data"}
        />
      ) : (
        <div className="flex w-full flex-col 2xl:w-[80%] 2xl:min-w-[75%]">
          <div className="flex justify-between">
            <div className="mt-10 flex flex-col">
              <img
                src={avatar}
                alt={`${recruiterCompany?.name}'s logo`}
                className="h-[5rem] w-[5rem] rounded-full"
              />
              <h1 className="mt-5 text-2xl font-medium">
                {recruiterCompany?.name}
              </h1>
            </div>
            <div className="flex items-end gap-10">
              <Modal>
                <Modal.Open opens="edit">
                  <Menus.Button type="edit">
                    <LuPenLine />
                    <span>Edit</span>
                  </Menus.Button>
                </Modal.Open>
                <Modal.Window name="edit">
                  <UpdateCompany
                    profile={recruiterCompany}
                    onCloseModal={close}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 grid-rows-4 gap-4 sm:grid-cols-2 sm:grid-rows-2 md:gap-10 xl:flex">
            <div className="flex w-full items-center text-blue-500">
              <IoIosLink />
              <p className="ml-2 text-sm">
                jobquery.com/company/{recruiterCompany?.slug}
              </p>
            </div>
            <div className="flex w-full items-center text-blue-500">
              <IoIosLink />
              <p className="ml-2 text-sm">{recruiterCompany?.website}</p>
            </div>
            <div className="flex w-full items-center">
              <FaPhoneAlt />
              <p className="ml-2 text-sm">{recruiterCompany?.phone}</p>
            </div>
            <div className="flex w-full items-center">
              <FaEnvelope />
              <p className="ml-2 text-sm">{recruiterCompany?.email}</p>
            </div>
          </div>
          <div className="mt-10 flex flex-col">
            <h2 className="text-lg font-medium">Company Overview</h2>
            <p className="mt-2.5 text-sm">{recruiterCompany?.description}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-36">
            <div className="mt-10 flex flex-col gap-3">
              <div className="flex w-full items-baseline justify-between">
                <h2 className="mb-2.5 text-lg font-medium">
                  Company Locations
                </h2>
              </div>
              {recruiterCompany?.locations.length > 0 ? (
                recruiterCompany?.locations.map((location: Location) => (
                  <div key={location?.id} className="flex items-center">
                    <FaLocationDot className="text-primary" />
                    <p className="ml-1 text-sm">
                      {location?.city}, {location?.country}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <h1>No location data available</h1>
                </>
              )}
            </div>
            <div className="mt-10 flex flex-col gap-3">
              <h2 className="mb-2.5 text-lg font-medium">
                Company Social Media
              </h2>
              <div className="flex items-center">
                <FaTwitter className="text-blue-500" />
                <p className="ml-2 text-sm">@{recruiterCompany?.twitter}</p>
              </div>
              <div className="flex items-center">
                <FaFacebookF className="text-blue-500" />
                <p className="ml-2 text-sm">@{recruiterCompany?.facebook}</p>
              </div>
              <div className="flex items-center">
                <FaLinkedinIn className="text-blue-500" />
                <p className="ml-2 text-sm">@{recruiterCompany?.linkedin}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Company;
