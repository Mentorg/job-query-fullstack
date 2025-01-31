import i18next from "i18next";

export const formatSalary = (
  salaryFrom: number,
  salaryTo: number,
  currencyCode: string,
  currencySymbol: string,
) => {
  const { language } = i18next;
  const formatter = new Intl.NumberFormat(language, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "code",
  });

  const formattedSalaryFrom = formatter.format(salaryFrom);
  const formattedSalaryTo = formatter.format(salaryTo);

  return `${formattedSalaryFrom.replace(currencyCode, currencySymbol)} - ${formattedSalaryTo.replace(currencyCode, currencySymbol)}`;
};
