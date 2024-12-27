import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import Navigation from "../components/Navigation";
import Button from "../../shared/components/ui/Button";
import Loading from "../../shared/components/ui/Loading";
import Fallback from "../../shared/components/ui/Fallback";
import { useAuth } from "../../shared/context/AuthContext";
import { useGetJob } from "../../private/features/jobs/hooks/useGetJob";
import { useCreateApplication } from "../hooks/useCreateApplication";
import { useGetApplicantJobs } from "../../private/features/jobs/hooks/useGetApplicantJobs";
import { formatDate } from "../../shared/utils/dateFormat";
import { Location } from "../../shared/types/location";
import { Competency, Job } from "../../shared/types/job";

function SingleJob() {
  const { user } = useAuth();
  const { job, isPending: isPendingJobs, error: jobsError } = useGetJob();
  const { handleApply } = useCreateApplication(job);
  const {
    applicantJobs,
    isPending: isPendingApplicantJobs,
    error: applicantJobsError,
  } = useGetApplicantJobs(user?.id ?? null);
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      {isPendingJobs ? (
        <Loading />
      ) : jobsError ? (
        <Fallback
          errorType="fetch"
          message={jobsError.message || "Failed to load data"}
        />
      ) : (
        <>
          <section className="pt-[4.5rem]">
            <div className="container mx-auto flex h-4/5 flex-col items-center justify-between p-4 md:grid md:h-4/6 md:grid-cols-2 md:grid-rows-2 landscape:h-[85dvh] lg:landscape:h-4/5">
              <div className="order-first flex w-full flex-col items-center md:items-start">
                <h1 className="my-2 text-center text-3xl font-medium text-black sm:text-left sm:text-3xl lg:text-4xl">
                  {job.title}
                </h1>
                <h4 className="text-lg text-slate-500 lg:text-xl">
                  {job.salaryFrom} - {job.salaryTo} /{" "}
                  <span className="text-base">
                    {job.isSalaryMonthly ? "Monthly" : "Annual"}
                  </span>
                </h4>
                <ul className="my-2 flex flex-wrap justify-center divide-x divide-gray-400 text-xs font-medium tracking-widest text-slate-900 md:justify-start md:text-sm">
                  <li className="pr-2">{job.company.name}</li>
                  {job.locations.map((record: Location) => (
                    <li className="px-2" key={record.id}>
                      {record.city}, {record.code}
                    </li>
                  ))}
                  <li className="px-2">
                    {job.isFulltime ? "Full Time" : "Part Time"}
                  </li>
                  <li className="px-2">{job.workPreference}</li>
                </ul>
              </div>
              <div className="order-last flex justify-center gap-x-2 sm:justify-end md:order-2">
                {user !== null ? (
                  user.role === "recruiter" || user.role === "admin" ? (
                    <>
                      <p className="flex items-center text-base font-semibold leading-3">
                        <HiMiniUserGroup className="h-[1rem] w-[1rem] text-primary" />
                        <span className="ml-1">{job.applicants}</span>
                      </p>
                    </>
                  ) : (
                    <>
                      {isPendingApplicantJobs ? (
                        <Loading />
                      ) : applicantJobsError ? (
                        <Fallback
                          errorType="fetch"
                          message={
                            applicantJobsError.message || "Failed to load data"
                          }
                        />
                      ) : applicantJobs.find(
                          (record: Job) => record.id === job.id,
                        ) ? (
                        <>
                          <Button className="rounded-md border-2 border-primary px-5 py-2 text-sm text-primary sm:px-8 sm:py-2">
                            Applied
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={handleApply}
                            className="rounded-md bg-primary px-5 py-2 text-sm text-white transition-all hover:bg-primary/70 sm:px-8 sm:py-2"
                          >
                            Apply
                          </Button>
                        </>
                      )}
                    </>
                  )
                ) : (
                  <>
                    <Button
                      onClick={() => navigate(`/signup`)}
                      className="rounded-md bg-primary px-5 py-2 text-sm text-white transition-all hover:bg-primary/70 sm:px-8 sm:py-2"
                    >
                      Apply
                    </Button>
                  </>
                )}
              </div>
              <div className="order-2 flex flex-wrap justify-center gap-x-4 gap-y-2 md:order-3 md:justify-start">
                <p className="w-max rounded-md bg-primary/70 px-4 py-1 text-xs text-white md:text-sm">
                  {job.seniority} Level
                </p>
                <p className="w-max rounded-md bg-primary/70 px-4 py-1 text-xs text-white md:text-sm">
                  {job.experience}{" "}
                  {job.experience !== 0 && job.experience < 2
                    ? "Year"
                    : "Years"}{" "}
                  of Experience
                </p>
                <p className="w-max rounded-md bg-primary/70 px-4 py-1 text-xs text-white md:text-sm">
                  {job.education} degree
                </p>
                {job.hasVisaSponsorship ? (
                  <p className="w-max rounded-md bg-primary/70 px-4 py-1 text-xs text-white md:text-sm">
                    Visa sponsorship
                  </p>
                ) : null}
                <p className="w-max rounded-md bg-primary/70 px-4 py-1 text-xs text-white md:text-sm">
                  Posted {formatDate(job.createdAt)}
                </p>
              </div>
              <div className="order-3 flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-end md:order-4">
                <Link
                  to="https://www.facebook.com/sharer/sharer.php"
                  className="flex items-center rounded-md bg-primary/70 px-4 py-1 transition-all hover:bg-primary/65"
                >
                  <FaFacebook className="text-white" />
                  <span className="ml-2 text-xs text-white sm:ml-10 md:text-sm">
                    Share
                  </span>
                </Link>
                <Link
                  to={`https://twitter.com/intent/tweet?text=`}
                  className="flex items-center rounded-md bg-primary/70 px-4 py-1 transition-all hover:bg-primary/65"
                >
                  <FaTwitter className="text-white" />
                  <span className="ml-2 text-xs text-white sm:ml-10 md:text-sm">
                    Tweet
                  </span>
                </Link>
                <Link
                  to={`https://www.linkedin.com/sharing/share-offsite/?url=`}
                  className="flex items-center rounded-md bg-primary/70 px-4 py-1 transition-all hover:bg-primary/65"
                >
                  <FaLinkedin className="text-white" />
                  <span className="ml-2 text-xs text-white sm:ml-10 md:text-sm">
                    Share
                  </span>
                </Link>
              </div>
            </div>
          </section>
          <section className="h-full px-5 py-10">
            <div className="container mx-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-12">
                <div className="col-start-1 col-end-3">
                  <h2 className="text-lg font-medium">Overview</h2>
                </div>
                <div className="col-start-3 col-end-12 mt-2 lg:m-0">
                  <p>{job.positionOverview}</p>
                </div>
              </div>
            </div>
          </section>
          <section className="h-full bg-slate-100 px-5 py-10">
            <div className="container mx-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-12">
                <div className="col-start-1 col-end-3">
                  <h2 className="text-lg font-medium">Responsibilities</h2>
                </div>
                <ul className="col-start-3 col-end-12 mt-2 lg:m-0">
                  {job.responsibilities.map((record: Competency) => (
                    <li key={record.id} className="list-inside list-disc">
                      {record.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className="h-full bg-slate-100 px-5 py-10">
            <div className="container mx-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-12">
                <div className="col-start-1 col-end-3">
                  <h2 className="text-lg font-medium">Qualifications</h2>
                </div>
                <ul className="col-start-3 col-end-12 mt-2 lg:m-0">
                  {job.qualifications.map((record: Competency) => (
                    <li key={record.id} className="list-inside list-disc">
                      {record.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          <section className="h-full px-5 py-10">
            <div className="container mx-auto">
              <div className="flex flex-col lg:grid lg:grid-cols-12">
                <div className="col-start-1 col-end-3">
                  <h2 className="text-lg font-medium">About the company</h2>
                </div>
                <div className="col-start-3 col-end-12 mt-2 lg:m-0">
                  <p>{job.company.description}</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default SingleJob;
