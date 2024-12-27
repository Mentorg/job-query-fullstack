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

  return (
    <div className="flex flex-col gap-[1.2rem]">
      <h3 className="text-[1.5rem] font-[600]">Delete {resourceName}</h3>
      <p>Are you sure you want to delete {resourceName} permanently?</p>
      <div className="flex gap-4">
        <Button
          onClick={onCloseModal}
          className="rounded-md border-2 border-slate-300 bg-white px-[1.6rem] py-[0.5rem]"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          className="rounded-md bg-red-500 px-[1.6rem] py-[0.5rem] text-white"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
