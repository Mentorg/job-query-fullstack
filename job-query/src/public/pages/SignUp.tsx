import { useState } from "react";
import AuthenticationContainer from "../components/AuthenticationContainer";
import BasicUserInformation from "../components/BasicUserInformation";
import UserProfileInformation from "../components/UserProfileInformation";
import { useSignup } from "../hooks/useSignup";

export function SignUp() {
  const {
    form,
    errors,
    handleChange,
    handleFileChange,
    handleSubmit,
    isSubmitted,
  } = useSignup();
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      handleSubmit(e);
    }
  };

  return (
    <>
      {currentStep === 1 ? (
        <AuthenticationContainer>
          <BasicUserInformation
            form={form}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={goToNextStep}
            isSubmitted={isSubmitted}
          />
        </AuthenticationContainer>
      ) : (
        <UserProfileInformation
          form={form}
          errors={errors}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          isSubmitted={isSubmitted}
        />
      )}
    </>
  );
}
