import { PiArrowsDownUp } from "react-icons/pi";
import { Company } from "../../../../../shared/types/company";
import Menus from "../../../../context/Menus";
import Table from "../../../../context/Table";
import CompanyRow from "./CompanyRow";

type CompaniesTableProps = {
  companies: Company[];
};

function CompaniesTable({ companies }: CompaniesTableProps) {
  return (
    <Menus>
      <Table tableType="companies">
        <Table.Header>
          <p className="flex items-center justify-between">
            Id
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Name
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Website
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Email
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Phone
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Created
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
