import Metric from "../../../../components/Metric";

function RecruiterMetrics() {
  return (
    <>
      <Metric
        title="Jobs Posted"
        currentValue="4"
        previousValue="2"
        time="month"
      />
      <Metric
        title="Success Rate"
        currentValue="80%"
        previousValue="75%"
        time="month"
      />
      <Metric
        title="Applicants"
        currentValue="200"
        previousValue="180"
        time="month"
      />
      <Metric
        title="Views"
        currentValue="550"
        previousValue="580"
        time="month"
      />
    </>
  );
}

export default RecruiterMetrics;
