import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";
import { useState } from "react";

function Footer() {
  const [language, setLanguage] = useState<string>("english");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setLanguage(e.target.value);

  return (
    <footer className="bg-primary px-2 py-10">
      <div className="container mx-auto flex flex-col place-items-center gap-y-10 lg:gap-y-20">
        <Logo mode="light" />
        <div className="grid grid-cols-1 justify-items-center gap-x-20 gap-y-5 sm:grid-cols-4 lg:space-y-0">
          <NavLink to="/" className="whitespace-nowrap font-medium text-white">
            Browse Jobs
          </NavLink>
          <NavLink
            to="/privacyPolicy"
            className="whitespace-nowrap font-medium text-white"
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/login"
            className="whitespace-nowrap font-medium text-white"
          >
            Login
          </NavLink>
          <NavLink
            to="/contact"
            className="whitespace-nowrap font-medium text-white"
          >
            Contact
          </NavLink>
        </div>
        <div className="grid w-fit grid-cols-1 flex-row items-end justify-center space-y-6 md:w-full md:grid-cols-3 md:justify-between md:space-y-0">
          <div className="flex flex-col gap-y-2">
            <label className="text-white">Language:</label>
            <select
              name="language"
              value={language}
              onChange={handleChange}
              className={`rounded-md border-2 px-5 py-2`}
            >
              <option value="english" key="english">
                English
              </option>
              <option value="german" key="german">
                German
              </option>
              <option value="french" key="french">
                French
              </option>
            </select>
          </div>
          <h2 className="text-center font-medium text-white ">
            jobQuery@contact.com
          </h2>
          <p className="text-center font-medium text-white ">
            2024 JobQuery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
