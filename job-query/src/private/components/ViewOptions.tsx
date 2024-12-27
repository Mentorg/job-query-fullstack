import { IoGridOutline, IoListOutline } from "react-icons/io5";
import Button from "../../shared/components/ui/Button";

type ViewOptionsProps = {
  onClick: () => void;
  gridView: boolean;
};

function ViewOptions({ onClick, gridView }: ViewOptionsProps) {
  return (
    <div className="order-1 flex w-fit gap-2 rounded-md border border-gray-300 bg-gray-50 p-1 text-xs sm:order-2 md:p-2.5 md:text-sm lg:p-1">
      <Button
        onClick={onClick}
        className={`${gridView && "bg-white"} rounded-md px-2 py-1 transition-all hover:bg-white`}
      >
        <IoGridOutline
          className={`${gridView && "text-primary"} h-[1.25rem] w-[1.25rem]`}
        />
      </Button>
      <Button
        onClick={onClick}
        className={`${!gridView && "bg-white"} rounded-md px-2 py-1 transition-all hover:bg-white`}
      >
        <IoListOutline
          className={`${!gridView && "text-primary"} h-[1.25rem] w-[1.25rem]`}
        />
      </Button>
    </div>
  );
}

export default ViewOptions;
