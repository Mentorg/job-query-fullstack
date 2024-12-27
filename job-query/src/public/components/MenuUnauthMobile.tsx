import {
  FaHome,
  FaPhone,
  FaSignInAlt,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa";
import MenuLink from "../../shared/components/ui/MenuLink";

function MenuUnauthMobile() {
  return (
    <>
      <div>
        <h2>
          Welcome to{" "}
          <span className="font-semibold text-primary">Job Quest</span>
        </h2>
      </div>
      <hr />
      <MenuLink to="/login">
        <FaSignInAlt className="h-5 w-5" />
        <span className="ml-2">Login</span>
      </MenuLink>
      <MenuLink to="/signup">
        <FaUserPlus className="h-5 w-5" />
        <span className="ml-2">Sign Up</span>
      </MenuLink>
      <hr />
      <MenuLink to="/">
        <FaHome className="h-5 w-5" />
        <span className="ml-2">Home</span>
      </MenuLink>
      <MenuLink to="/privacyPolicy">
        <FaUserShield className="h-5 w-5" />
        <span className="ml-2">Privacy Policy</span>
      </MenuLink>
      <MenuLink to="/contact">
        <FaPhone className="h-5 w-5" />
        <span className="ml-2">Contact</span>
      </MenuLink>
    </>
  );
}

export default MenuUnauthMobile;
