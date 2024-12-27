import Metric from "../../../../components/Metric";
import ProfileCompletionMetric from "./ProfileCompletionMetric";

function ApplicantMetrics() {
  return (
    <>
      <ProfileCompletionMetric />
      <Metric
        title="Applications Sent"
        currentValue="4"
        previousValue="8"
        time="month"
      />
      <Metric
        title="Applications Success Rate"
        currentValue="10"
        previousValue="20"
        time="month"
      />
      <Metric
        title="Number of Interviews"
        currentValue="2"
        previousValue="3"
        time="month"
      />
    </>
  );
}

export default ApplicantMetrics;
