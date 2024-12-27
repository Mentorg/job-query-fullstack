import { NavLink } from "react-router-dom";

function Messages() {
  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:mt-4 2xl:text-2xl">
          Messages
        </h1>
        <NavLink
          to="newMessage"
          className="rounded-md bg-primary px-8 py-2 text-sm text-white"
        >
          Compose
        </NavLink>
      </div>
      <div>
        <h2>No messages yet</h2>
      </div>
    </div>
  );
}

export default Messages;
