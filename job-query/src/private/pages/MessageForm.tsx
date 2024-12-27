import { useState } from "react";
import TextArea from "../../shared/components/form/TextArea";
import TextField from "../../shared/components/form/TextField";
import Button from "../../shared/components/ui/Button";
import { messageValidation as validation } from "../validation/messageValidation";

type MessageData = {
  email: string;
  subject: string;
  message: string;
};

type MessageErrors = {
  email: boolean | string;
  subject: boolean | string;
  message: boolean | string;
};

function MessageForm() {
  const [form, setForm] = useState<MessageData>({
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<MessageErrors>({ ...form });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    const error = validation(name, value);
    setErrors({ ...errors, [name]: error });
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errorFields = Object.keys(errors).filter(
      (field) => errors[field as keyof MessageErrors],
    );
    if (errorFields.length > 0) {
      return;
    } else {
      console.log("Success");
    }
  }

  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:mt-4 2xl:text-3xl">
          New Message
        </h1>
      </div>
      <div className="lg:w-[50dvw]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
          <TextField
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            errors={errors}
            hasError={!!errors.email}
          />
          <TextField
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            errors={errors}
            hasError={!!errors.subject}
          />
          <TextArea
            name="message"
            value={form.message}
            onChange={handleChange}
            errors={errors}
            hasError={!!errors.message}
          />
          <Button className="mt-2 flex w-fit place-self-end rounded-md bg-primary px-10 py-2 text-sm font-medium text-white transition-all hover:bg-opacity-70">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default MessageForm;
