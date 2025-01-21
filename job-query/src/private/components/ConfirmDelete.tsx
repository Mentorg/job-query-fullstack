import { Trans, useTranslation } from "react-i18next";
import Button from "../../shared/components/ui/Button";

type ConfirmDeleteProps = {
  resourceName: string | null | undefined;
  onConfirm: () => void;
  onCloseModal: () => void;
};

function ConfirmDelete({
  resourceName,
  onConfirm,
  onCloseModal,
}: ConfirmDeleteProps) {
  const handleConfirm = () => {
    onConfirm();
    onCloseModal();
  };
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[1.2rem]">
      <h3 className="text-[1.5rem] font-[600]">
        <Trans
          i18nKey="modal.delete.title"
          values={{ resourceName }}
          components={{ span: <span className="font-semibold" /> }}
        />
      </h3>
      <p>
        <Trans
          i18nKey="modal.delete.body"
          values={{ resourceName }}
          components={{ span: <span className="font-semibold" /> }}
        />
      </p>
      <div className="flex gap-4">
        <Button
          onClick={onCloseModal}
          className="rounded-md border-2 border-slate-300 bg-white px-[1.6rem] py-[0.5rem]"
        >
          {t("button.cancel")}
        </Button>
        <Button
          onClick={handleConfirm}
          className="rounded-md bg-red-500 px-[1.6rem] py-[0.5rem] text-white"
        >
          {t("button.delete")}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
