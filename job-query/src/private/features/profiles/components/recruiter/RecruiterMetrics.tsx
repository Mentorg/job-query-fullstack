import { useTranslation } from "react-i18next";
import Metric from "../../../../components/Metric";

function RecruiterMetrics() {
  const { t } = useTranslation();

  return (
    <>
      <Metric
        title={t("recruiter.jobsPosted")}
        currentValue="4"
        previousValue="2"
        time="Month"
      />
      <Metric
        title={t("recruiter.successRate")}
        currentValue="80%"
        previousValue="75%"
        time="Month"
      />
      <Metric
        title={t("recruiter.applicants")}
        currentValue="200"
        previousValue="180"
        time="Month"
      />
      <Metric
        title={t("recruiter.views")}
        currentValue="550"
        previousValue="580"
        time="Month"
      />
    </>
  );
}

export default RecruiterMetrics;
