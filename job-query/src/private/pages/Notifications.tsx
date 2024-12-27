function Notifications() {
  return (
    <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:mt-4 2xl:text-2xl">
          Notifications
        </h1>
      </div>
      <div className="flex flex-col">
        <h2>No notifications yet</h2>
      </div>
    </div>
  );
}

export default Notifications;
