import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/ui/Button";
import { useTranslation } from "react-i18next";

function NotAuthorized() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <img
        src="../../../public/401.svg"
        alt="Page not found"
        className="flex h-96 w-96"
      />
      <h1>{t("system.notAuthorized")}</h1>
      <Button
        onClick={() => navigate("/")}
        className="mt-4 rounded-md bg-primary px-4 py-2 font-medium text-white transition-all hover:bg-primary/70"
      >
        {t("button.goBack")}
      </Button>
    </div>
  );
}

export default NotAuthorized;
