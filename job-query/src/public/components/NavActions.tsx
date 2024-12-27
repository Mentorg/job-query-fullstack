import UserAction from "./UserAction";
import { useActionsService } from "../hooks/useActionsService";

function NavActions() {
  const { ref, handleOpenAction, isActiveAction } = useActionsService();

  return (
    <ul className="flex items-center space-x-6" ref={ref}>
      <UserAction
        menu="userMenu"
        activeMenu={isActiveAction("userMenu")}
        onHandleOpenMenu={() => handleOpenAction("userMenu")}
      />
    </ul>
  );
}

export default NavActions;
