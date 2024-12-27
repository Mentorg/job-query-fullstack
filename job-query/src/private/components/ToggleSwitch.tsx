type ToggleSwitchProps = {
  isChecked: boolean | undefined;
  name: string | undefined;
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ToggleSwitch({ isChecked, name, onHandleChange }: ToggleSwitchProps) {
  return (
    <>
      <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={onHandleChange}
          className="sr-only"
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isChecked ? "bg-primary" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isChecked ? "translate-x-6" : ""
            }`}
          ></span>
        </span>
      </label>
    </>
  );
}

export default ToggleSwitch;
