import React from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";

interface FallbackProps {
  errorType: "render" | "fetch";
  message: string;
}

const Fallback: React.FC<FallbackProps> = ({ errorType, message }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center p-8">
      <div className="my-40 w-full max-w-md bg-white p-6 text-center">
        {errorType === "fetch" ? (
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-xl font-semibold text-red-600">
              {t("system.serviceUnavailable")}
            </h2>
            <div className="w-fit rounded-md bg-slate-200 px-3 py-1">
              <p className="text-md text-gray-600">{message}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-xl font-semibold text-red-600">
              {t("system.serverError")}
            </h2>
            <div className="w-fit rounded-md bg-slate-200 px-3 py-1">
              <p className="text-md text-gray-600">{message}</p>
            </div>
          </div>
        )}
        <div className="mt-6">
          <Button
            onClick={() => window.location.reload()}
            className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {t("button.tryAgain")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Fallback;
