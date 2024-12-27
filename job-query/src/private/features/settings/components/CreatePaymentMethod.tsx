import Button from "../../../../shared/components/ui/Button";
import TextField from "../../../../shared/components/form/TextField";
import Label from "../../../../shared/components/form/Label";
import Select from "../../../../shared/components/form/Select";
import Option from "../../../../shared/components/form/Option";
import { useCreatePaymentMethod } from "../hooks/useCreatePaymentMethod";

type CreatePaymentMethodProps = {
  onCloseModal: () => void;
};

function CreatePaymentMethod({ onCloseModal }: CreatePaymentMethodProps) {
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useCreatePaymentMethod();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (isSubmitted && !Object.values(errors).some((error) => error)) {
      onCloseModal();
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="mt-4 flex flex-col gap-y-2">
        <Label htmlFor="cardType">Card Type</Label>
        <Select
          name="cardType"
          value={form.cardType}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.cardType}
        >
          {["Visa", "MasterCard"].map((card) => (
            <Option value={card} key={card}>
              {card}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mt-4 flex flex-col gap-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <TextField
          name="cardNumber"
          type="text"
          value={form.cardNumber}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.cardNumber}
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-2">
        <Label htmlFor="expirationDate">
          Expiration Date{" "}
          <span className="text-xs font-semibold">(M/Y, e.g.: 05/26)</span>
        </Label>
        <TextField
          name="expirationDate"
          type="text"
          value={form.expirationDate}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.expirationDate}
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-2">
        <Label htmlFor="cvv">CVV</Label>
        <TextField
          name="cvv"
          type="text"
          value={form.cvv}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.cvv}
        />
      </div>
      <div className="mt-4 flex gap-x-2">
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          onChange={handleChange}
          checked={form.isActive === true}
        />
        <Label htmlFor="isActive">Set this card as default</Label>
      </div>
      <Button className="mt-4 rounded-md bg-primary px-6 py-2 text-sm text-white transition-all hover:bg-opacity-75">
        Submit
      </Button>
    </form>
  );
}

export default CreatePaymentMethod;