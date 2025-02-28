import { useTranslation } from "react-i18next";
import {
  HiBuildingLibrary,
  HiMiniArrowTrendingUp,
  HiMiniHome,
  HiMiniUser,
  HiMiniUserGroup,
  HiMiniTag,
  HiMiniEnvelope,
  HiMiniBell,
  HiComputerDesktop,
  HiMiniPlus,
  HiMiniCog6Tooth,
} from "react-icons/hi2";
import { FaCircleDot } from "react-icons/fa6";
import MenuLink from "../../shared/components/ui/MenuLink";
import Loading from "../../shared/components/ui/Loading";
import Fallback from "../../shared/components/ui/Fallback";
import { useGetRecruiterJobs } from "../hooks/useGetRecruiterJobs";
import { useAuth } from "../../shared/context/AuthContext";
import { Job } from "../../shared/types/job";

function RecruiterSidebar() {
  const { user } = useAuth();
  const { recruiterJobs, isPending, error } = useGetRecruiterJobs(
    user?.id ?? -1,
  );
  const { t } = useTranslation();

  return (
    <aside className="hidden w-[300px] min-w-[250px] lg:flex">
      <div
        className="fixed top-[70px] flex h-full w-[275px] flex-col justify-between border-r-2 border-slate-200 p-4"
        style={{ height: "calc(100dvh - 70px)" }}
      >
        <div>
          <div className="py-2">
            <h4 className="mb-2 text-[0.65rem] font-bold uppercase text-slate-500">
              {t("navigation.menu")}
            </h4>
            <ul>
              <li>
                <MenuLink to="overview">
                  <HiMiniHome className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                  <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                    {t("navigation.overview")}
                  </p>
                </MenuLink>
              </li>
              <li className="group">
                <MenuLink to="analytics">
                  <HiMiniArrowTrendingUp className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                  <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                    {t("navigation.analytics")}
                  </p>
                </MenuLink>
              </li>
              <li className="group">
                <MenuLink to="company">
                  <HiBuildingLibrary className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                  <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                    {t("navigation.companyProfile")}
                  </p>
                </MenuLink>
              </li>
              <li className="group">
                <MenuLink to="user">
                  <HiMiniUser className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                  <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                    {t("navigation.userProfile")}
                  </p>
                </MenuLink>
              </li>
              <li className="group">
                <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
                  <HiMiniEnvelope className="h-10 w-5" />
                  <div className="flex w-full justify-between">
                    <p className="ml-2 text-sm font-medium">
                      {t("navigation.messages")}
                    </p>
                    <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                      {t("system.soon")}
                    </span>
                  </div>
                </div>
              </li>
              <li className="group">
                <MenuLink to="notifications">
                  <HiMiniBell className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                  <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                    {t("navigation.notifications")}
                  </p>
                </MenuLink>
              </li>
              <li>
                <MenuLink to="jobs">
                  <HiComputerDesktop className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                  <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                    {t("navigation.jobs")}
                  </p>
                </MenuLink>
              </li>
              <li className="group">
                <MenuLink to="applications">
                  <HiMiniUserGroup className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                  <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                    {t("navigation.applications")}
                  </p>
                </MenuLink>
              </li>
              <li className="group">
                <MenuLink to="newJob">
                  <HiMiniPlus className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                  <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                    {t("navigation.newJob")}
                  </p>
                </MenuLink>
              </li>
            </ul>
          </div>
          <hr className="my-2 h-px border-0 bg-gray-200 dark:bg-gray-200" />
          <div className="py-2">
            <h4 className="mb-2 text-[0.65rem] font-bold uppercase text-slate-500">
              {t("navigation.recentVacancies")}
            </h4>
            <ul>
              {isPending ? (
                <Loading />
              ) : error ? (
                <Fallback
                  errorType="fetch"
                  message={error.message || t("system.serverError")}
                />
              ) : (
                recruiterJobs.slice(0, 5).map((job: Job) => (
                  <li key={job.id}>
                    <MenuLink to={`jobs/${job.id}`}>
                      <div>
                        <FaCircleDot className="h-5 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
                      </div>
                      <p className="ml-2 truncate py-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
                        {job.title}{" "}
                      </p>
                    </MenuLink>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div>
          <div className="group flex w-full items-center rounded-md px-2 py-1 text-sm text-slate-500 lg:py-0">
            <HiMiniTag className="h-10 w-5" />
            <div className="flex w-full justify-between">
              <p className="ml-2 text-sm font-medium">
                {t("navigation.pricingPlans")}
              </p>
              <span className="h-fit rounded-md bg-primary p-[.25rem] text-[.5rem] leading-normal text-white">
                {t("system.soon")}
              </span>
            </div>
          </div>
          <MenuLink to="settings/account">
            <HiMiniCog6Tooth className="h-10 w-5 hover:fill-slate-500 focus:fill-slate-500 active:fill-slate-500 group-hover:fill-white group-focus:fill-white group-active:fill-white" />
            <p className="ml-2 text-sm font-medium group-hover:text-white group-focus:text-white group-active:text-white">
              {t("navigation.settings")}
            </p>
          </MenuLink>
        </div>
      </div>
    </aside>
  );
}

export default RecruiterSidebar;
