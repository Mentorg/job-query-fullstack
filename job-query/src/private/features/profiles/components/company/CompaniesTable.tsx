import { useTranslation } from "react-i18next";
import { PiArrowsDownUp } from "react-icons/pi";
import Menus from "../../../../context/Menus";
import Table from "../../../../context/Table";
import CompanyRow from "./CompanyRow";
import { Company } from "../../../../../shared/types/company";

type CompaniesTableProps = {
  companies: Company[];
};

function CompaniesTable({ companies }: CompaniesTableProps) {
  const { t } = useTranslation();

  return (
    <Menus>
      <Table tableType="companies">
        <Table.Header>
          <p className="flex items-center justify-between">
            #
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.name")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.website")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.email")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.phone")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            {t("table.created")}
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
        </Table.Header>
        <Table.Body
          data={companies as Company[]}
          render={(company: Company) => (
            <CompanyRow key={company.id} company={company} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CompaniesTable;
