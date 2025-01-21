import { useTranslation } from "react-i18next";
import Label from "../../../../shared/components/form/Label";
import Select from "../../../../shared/components/form/Select";
import Option from "../../../../shared/components/form/Option";
import Button from "../../../../shared/components/ui/Button";
import Loading from "../../../../shared/components/ui/Loading";
import { useUpdateLocaleSettings } from "../hooks/useUpdateLocaleSettings";
import { useCurrencies } from "../hooks/useCurrencies";
import { User } from "../../../../shared/types/user";
import { Currency } from "../../../../shared/types/currency";

type UpdateCurrencyProps = {
  resource: Partial<User> | null;
  onCloseModal: () => void;
};

function UpdateCurrency({ resource, onCloseModal }: UpdateCurrencyProps) {
  const { form, errors, handleChange, handleSubmit, isSubmitted } =
    useUpdateLocaleSettings(resource);
  const { currencies, isPending, error } = useCurrencies();
  const { t } = useTranslation();

  if (isPending) {
    return <Loading />;
  }

  if (error) return <div>{t("system.serverError")}</div>;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(e);
    if (!Object.values(errors).some((error) => error)) {
      onCloseModal();
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="flex w-full flex-col gap-y-2">
        <Label htmlFor="currencyId">{t("label.currency")}</Label>
        <Select
          name="currencyId"
          value={form.currencyId}
          onChange={handleChange}
          errors={errors}
          hasError={isSubmitted && !!errors.currencyId}
        >
          {currencies.map((item: Currency) => (
            <Option value={item.id} key={item.id}>
              {item.symbol} - {item.name}
            </Option>
          ))}
        </Select>
      </div>
      <Button className="mt-4 rounded-md bg-primary px-6 py-2 text-white hover:bg-primary/70">
        {t("button.submit")}
      </Button>
    </form>
  );
}

export default UpdateCurrency;
