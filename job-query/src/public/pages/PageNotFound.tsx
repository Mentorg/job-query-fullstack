import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../shared/components/ui/Button";

function PageNotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <img
        src="../../../public/404.svg"
        alt="Page not found"
        className="flex h-96 w-96"
      />
      <h1>{t("system.pageNotFound")}</h1>
      <Button
        onClick={() => navigate("/")}
        className="mt-4 rounded-md bg-primary px-4 py-2 font-medium text-white transition-all hover:bg-primary/70"
      >
        {t("button.goBack")}
      </Button>
    </div>
  );
}

export default PageNotFound;
