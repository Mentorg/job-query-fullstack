import { PiArrowsDownUp } from "react-icons/pi";
import Menus from "../../../../context/Menus";
import Table from "../../../../context/Table";
import { User } from "../../../../../shared/types/user";
import UserRow from "./UserRow";

type UsersTableProps = {
  users: User[];
};

function UsersTable({ users }: UsersTableProps) {
  return (
    <Menus>
      <Table tableType="users">
        <Table.Header>
          <p className="flex items-center justify-between">
            Id
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Name
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Role
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Email
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
          <p className="flex items-center justify-between">
            Created
            <PiArrowsDownUp className="h-auto w-[1.25rem] rounded-full p-0.5 text-slate-600 transition-all hover:bg-slate-100" />
          </p>
        </Table.Header>
        <Table.Body
          data={users as User[]}
          render={(user: User) => <UserRow key={user.id} user={user} />}
        />
      </Table>
    </Menus>
  );
}

export default UsersTable;
