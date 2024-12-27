import { LuPenLine } from "react-icons/lu";
import Modal from "../context/Modal";
import Menus from "../context/Menus";
import UpdateLanguage from "../components/UpdateLanguage";
import UpdateTimezone from "../features/settings/components/UpdateTimezone";
import UpdateCurrency from "../features/settings/components/UpdateCurrency";
import Loading from "../../shared/components/ui/Loading";
import Fallback from "../../shared/components/ui/Fallback";
import { useAuth } from "../../shared/context/AuthContext";
import { useGetUserCurrency } from "../features/settings/hooks/useGetUserCurrency";

function Locale() {
  const { user } = useAuth();
  const { userCurrency, isPending, error } = useGetUserCurrency();

  return (
    <div className="mt-10 w-full xl:w-[75%]">
      <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
        <div className="flex flex-[1] flex-col">
          <h3 className="font-medium">Language</h3>
          <p className="mt-2 text-sm lg:mt-6">
            Set the preferred language for the app
          </p>
        </div>
        <div className="flex flex-[1] justify-center">
          <p>{user?.language}</p>
        </div>
        <div className="flex flex-[1] justify-end gap-4">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button type="edit">
                Edit
                <span>
                  <LuPenLine />
                </span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <UpdateLanguage resource={user} onCloseModal={close} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
        <div className="flex flex-[1] flex-col">
          <h3 className="font-medium">Time zone</h3>
          <p className="mt-2 text-sm lg:mt-6">
            Select the time zone that best matches your current location
          </p>
        </div>
        <div className="flex flex-[1] justify-center">
          <p>{user?.timezone}</p>
        </div>
        <div className="flex flex-[1] justify-end gap-4">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button type="edit">
                Edit
                <span>
                  <LuPenLine />
                </span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <UpdateTimezone resource={user} onCloseModal={close} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-10 border-b border-slate-200 py-10 md:flex-row md:items-end md:justify-between xl:gap-20">
        <div className="flex flex-[1] flex-col">
          <h3 className="font-medium">Base currency</h3>
          <p className="mt-2 text-sm lg:mt-6">
            Select the base currency for job listings and salary information.
          </p>
        </div>
        <div className="flex flex-[1] justify-center">
          {isPending ? (
            <Loading />
          ) : error ? (
            <Fallback
              errorType="fetch"
              message={error.message || "Failed to load data"}
            />
          ) : (
            <p>
              {userCurrency.name} - ({userCurrency.symbol})
            </p>
          )}
        </div>
        <div className="flex flex-[1] justify-end gap-4">
          <Modal>
            <Modal.Open opens="edit">
              <Menus.Button type="edit">
                Edit
                <span>
                  <LuPenLine />
                </span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <UpdateCurrency resource={user} onCloseModal={close} />
            </Modal.Window>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Locale;
