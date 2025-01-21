import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTranslation } from "react-i18next";
import { Login } from "./public/pages/Login.tsx";
import { SignUp } from "./public/pages/SignUp.tsx";
import { AuthProvider } from "./shared/context/AuthContext.tsx";
import { ProtectedRoute } from "./public/components/ProtectedRoute.tsx";
import Loading from "./shared/components/ui/Loading.tsx";
import ErrorBoundary from "./shared/components/ui/ErrorBoundary.tsx";
import NotAuthorized from "./public/pages/NotAuthorized.tsx";

// Public Routes
const HomeLayout = lazy(() => import("./public/layouts/HomeLayout.tsx"));
const Home = lazy(() => import("./public/pages/Home.tsx"));
const SearchResults = lazy(() => import("./public/pages/SearchResults.tsx"));
const SingleJob = lazy(() => import("./public/pages/SingleJob.tsx"));
const PrivacyPolicy = lazy(() => import("./public/pages/PrivacyPolicy.tsx"));
const Contact = lazy(() => import("./public/pages/Contact.tsx"));
const DashboardLayout = lazy(
  () => import("./private/layouts/DashboardLayout.tsx"),
);

// Recruiter Routes
const Overview = lazy(() => import("./private/pages/Overview.tsx"));
const Analytics = lazy(() => import("./private/pages/Analytics.tsx"));
const Company = lazy(() => import("./private/pages/Company.tsx"));
const Recruiter = lazy(() => import("./private/pages/Recruiter.tsx"));
const Messages = lazy(() => import("./private/pages/Messages.tsx"));
const MessageForm = lazy(() => import("./private/pages/MessageForm.tsx"));
const SingleMessage = lazy(() => import("./private/pages/SingleMessage.tsx"));
const Notifications = lazy(() => import("./private/pages/Notifications.tsx"));
const Applications = lazy(() => import("./private/pages/Applications.tsx"));
const RecruiterJobs = lazy(() => import("./private/pages/RecruiterJobs.tsx"));
const JobOverview = lazy(() => import("./private/pages/JobOverview.tsx"));
const JobForm = lazy(() => import("./private/pages/JobForm.tsx"));
const Subscription = lazy(() => import("./private/pages/Subscription.tsx"));
const SettingsLayout = lazy(
  () => import("./private/layouts/SettingsLayout.tsx"),
);
const Account = lazy(() => import("./private/pages/Account.tsx"));
const Billing = lazy(() => import("./private/pages/Billing.tsx"));
const Locale = lazy(() => import("./private/pages/Locale.tsx"));
const NotificationSettings = lazy(
  () => import("./private/pages/NotificationSettings.tsx"),
);
const SupportTerms = lazy(() => import("./private/pages/SupportTerms.tsx"));

// Admin Routes
const AdminDashboard = lazy(
  () => import("./private/layouts/AdminDashboard.tsx"),
);
const Users = lazy(() => import("./private/pages/Users.tsx"));
const Companies = lazy(() => import("./private/pages/Companies.tsx"));
const AdminJobs = lazy(() => import("./private/pages/AdminJobs.tsx"));
const RecruiterForm = lazy(() => import("./private/pages/RecruiterForm.tsx"));
const CompanyForm = lazy(() => import("./private/pages/CompanyForm.tsx"));

// Applicant Routes
const Applicant = lazy(
  () =>
    import("./private/features/profiles/components/applicant/Applicant.tsx"),
);
const ApplicantJobs = lazy(() => import("./private/pages/ApplicantJobs.tsx"));
const ApplicantSettings = lazy(
  () => import("./private/features/settings/components/ApplicantSettings.tsx"),
);

const PageNotFound = lazy(() => import("./public/pages/PageNotFound.tsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const { t } = useTranslation();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <ErrorBoundary fallbackMessage={t("system.fallbackError")}>
          <Suspense fallback={<Loading fullPage={true} />}>
            <Routes>
              <Route path="/" element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<SearchResults />} />
                <Route path="jobs/:id" element={<SingleJob />} />
                <Route path="privacyPolicy" element={<PrivacyPolicy />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="unauthorized" element={<NotAuthorized />} />
              </Route>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["recruiter"]}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="overview" element={<Overview />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="company" element={<Company />} />
                <Route path="user" element={<Recruiter />} />
                <Route path="messages" element={<Messages />} />
                <Route path="messages/newMessage" element={<MessageForm />} />
                <Route path="messages/:id" element={<SingleMessage />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="applications" element={<Applications />} />
                <Route path="jobs" element={<RecruiterJobs />} />
                <Route path="jobs/:id" element={<JobOverview />} />
                <Route path="newJob" element={<JobForm />} />
                <Route path="subscription" element={<Subscription />} />
                <Route path="settings" element={<SettingsLayout />}>
                  <Route index={true} path="account" element={<Account />} />
                  <Route path="billing" element={<Billing />} />
                  <Route path="locale" element={<Locale />} />
                  <Route
                    path="notifications"
                    element={<NotificationSettings />}
                  />
                  <Route path="support-terms" element={<SupportTerms />} />
                </Route>
              </Route>
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              >
                <Route path="users" element={<Users />} />
                <Route path="messages" element={<Messages />} />
                <Route path="companies" element={<Companies />} />
                <Route path="jobs" element={<AdminJobs />} />
                <Route path="newRecruiter" element={<RecruiterForm />} />
                <Route path="newCompany" element={<CompanyForm />} />
              </Route>
              <Route
                path="/user"
                element={
                  <ProtectedRoute allowedRoles={["applicant"]}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="profile" element={<Applicant />} />
                <Route path="messages" element={<Messages />} />
                <Route path="messages/newMessage" element={<MessageForm />} />
                <Route path="messages/:id" element={<SingleMessage />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="jobs" element={<ApplicantJobs />} />
                <Route path="jobs/:id" element={<JobOverview />} />
                <Route path="settings" element={<ApplicantSettings />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
