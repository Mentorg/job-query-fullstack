import React from "react";

interface FallbackProps {
  errorType: "render" | "fetch";
  message: string;
}

const Fallback: React.FC<FallbackProps> = ({ errorType, message }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="my-40 w-full max-w-md bg-white p-6 text-center">
        {errorType === "fetch" ? (
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-xl font-semibold text-red-600">
              Error while fetching data
            </h2>
            <div className="w-fit rounded-md bg-slate-200 px-3 py-1">
              <p className="text-md text-gray-600">{message}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-xl font-semibold text-red-600">
              Something went wrong
            </h2>
            <div className="w-fit rounded-md bg-slate-200 px-3 py-1">
              <p className="text-md text-gray-600">{message}</p>
            </div>
          </div>
        )}
        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fallback;
