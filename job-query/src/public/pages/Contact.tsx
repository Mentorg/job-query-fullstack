import { useState } from "react";
import Navigation from "../components/Navigation";
import Label from "../../shared/components/form/Label";
import TextField from "../../shared/components/form/TextField";
import TextArea from "../../shared/components/form/TextArea";
import Button from "../../shared/components/ui/Button";
import { contactValidation as validation } from "../data/validation/contactValidation";

type ContactData = {
  name: string;
  email: string;
  message: string;
};

type ContactErrors = {
  name: boolean | string;
  email: boolean | string;
  message: boolean | string;
};

function Contact() {
  const [contact, setContact] = useState<ContactData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({
    ...contact,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    const error = validation(name, value);
    setErrors({ ...errors, [name]: error });
    setContact((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errorFields = Object.keys(errors).filter(
      (field) => errors[field as keyof ContactErrors],
    );
    if (errorFields.length > 0) {
      return;
    } else {
      console.log("Success");
    }
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto flex min-h-svh flex-col px-8 py-20 lg:p-16 xl:min-h-max xl:py-[6.75rem]">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-medium md:text-3xl">Get in Touch</h1>
          <p className="mt-5 text-base">
            Have a question, comment, or concern? We're here to help! Fill out
            the form below and we'll get back to you as soon as possible. Thank
            you for using our job board app!
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-slate-50 p-5 md:p-10 lg:p-16"
        >
          <div className="flex flex-col gap-5 md:gap-10 lg:flex-row">
            <div className="flex w-full flex-col">
              <Label htmlFor="name">Name</Label>
              <TextField
                name="name"
                type="text"
                value={contact.name}
                onChange={handleChange}
                errors={errors}
                hasError={!!errors.name}
              />
            </div>
            <div className="flex w-full flex-col">
              <Label htmlFor="email">Email</Label>
              <TextField
                name="email"
                type="email"
                value={contact.email}
                onChange={handleChange}
                errors={errors}
                hasError={!!errors.email}
              />
            </div>
          </div>
          <div className="mt-5 flex w-full flex-col md:mt-10">
            <Label htmlFor="message">Message</Label>
            <TextArea
              name="message"
              value={contact.message}
              onChange={handleChange}
              errors={errors}
              hasError={!!errors.message}
            />
          </div>
          <div className="mt-10 flex w-full justify-center md:justify-start">
            <Button className="rounded-md bg-primary px-6 py-2 text-sm text-white transition-all hover:bg-primary/70 md:text-base">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Contact;
