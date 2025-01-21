import { useTranslation } from "react-i18next";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";
import Menus from "../../../../context/Menus";
import Modal from "../../../../context/Modal";
import Table from "../../../../context/Table";
import ConfirmDelete from "../../../../components/ConfirmDelete";
import UpdateCompany from "./UpdateCompany";
import CompanyDetails from "./CompanyDetails";
import { useDeleteCompany } from "../../hooks/useDeleteCompany";
import { formatDate } from "../../../../../shared/utils/dateFormat";
import { Company } from "../../../../../shared/types/company";

type CompanyRowProps = {
  company: Company;
};

function CompanyRow({ company }: CompanyRowProps) {
  const { handleDelete } = useDeleteCompany(company.id);
  const { t } = useTranslation();

  return (
    <Table.Row key={company?.id}>
      <div>
        <p className="w-[150px] whitespace-nowrap text-sm font-semibold text-slate-600">
          {company?.id}
        </p>
      </div>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {company?.name}
        </p>
      </div>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {company?.website}
        </p>
      </div>
      <div>
        <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-slate-600">
          {company?.email}
        </p>
      </div>
      <div>
        <p className="w-[150px] whitespace-nowrap text-sm font-semibold text-slate-600">
          {company?.phone}
        </p>
      </div>
      <div>
        <p className="w-[150px] whitespace-nowrap text-sm font-semibold text-slate-600">
          {formatDate(company?.createdAt)}
        </p>
      </div>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={company.id.toString()} />
          <Menus.List id={company.id.toString()}>
            <Modal.Open opens="view">
              <Menus.Button type="option">
                <HiEye />
                <span>{t("contextAction.viewCompany")}</span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Open opens="edit">
              <Menus.Button type="option">
                <HiPencil />
                <span>{t("contextAction.edit")}</span>
              </Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button type="option">
                <HiTrash />
                <span>{t("contextAction.delete")}</span>
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="view">
            <CompanyDetails resource={company} />
          </Modal.Window>
          <Modal.Window name="edit">
            <UpdateCompany profile={company} onCloseModal={close} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={company?.name}
              onConfirm={handleDelete}
              onCloseModal={close}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default CompanyRow;
