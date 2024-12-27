import { Link } from "react-router-dom";
import LogoDark from "../../../public/logoDark.svg";
import LogoLight from "../../../public/logoLight.svg";

type LogoProps = {
  mode: string;
};

function Logo({ mode }: LogoProps) {
  return (
    <Link to="/" className="flex flex-row items-center space-x-2 text-ellipsis">
      <img
        src={mode === "dark" ? LogoDark : LogoLight}
        alt="JobQuery Logo"
        className="h-fit w-fit"
      />
      <h2
        className={`font-semibold ${mode === "dark" ? "text-slate-500" : "text-white"}`}
      >
        JobQuery
      </h2>
    </Link>
  );
}

export default Logo;
