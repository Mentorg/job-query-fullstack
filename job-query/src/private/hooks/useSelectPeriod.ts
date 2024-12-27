import { useState } from "react";

function useSelectPeriod() {
  const [period, setPeriod] = useState<string>("weekly");

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPeriod(e.target.value);
  }

  return {
    period,
    handleChange,
  };
}

export { useSelectPeriod };
