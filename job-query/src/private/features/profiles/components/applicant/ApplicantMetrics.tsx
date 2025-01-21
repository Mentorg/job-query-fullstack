import { useTranslation } from "react-i18next";
import Metric from "../../../../components/Metric";
import ProfileCompletionMetric from "./ProfileCompletionMetric";

function ApplicantMetrics() {
  const { t } = useTranslation();

  return (
    <>
      <ProfileCompletionMetric />
      <Metric
        title={t("user.applicationsSent")}
        currentValue="4"
        previousValue="8"
        time="Month"
      />
      <Metric
        title={t("user.applicationSuccessRate")}
        currentValue="10"
        previousValue="20"
        time="Month"
      />
      <Metric
        title={t("user.interviewsNumber")}
        currentValue="2"
        previousValue="3"
        time="Month"
      />
    </>
  );
}

export default ApplicantMetrics;
