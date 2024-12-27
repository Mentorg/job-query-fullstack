import { NavLink, useParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { message as messageData } from "../data/message";
import { useMessage } from "../hooks/useMessage";

function SingleMessage() {
  const { id } = useParams<{ id?: string }>();
  const messageId = id ? parseInt(id) : undefined;
  const { user, messageDetails, senderDetails } = useMessage(
    messageId as number,
  );
  const sender = senderDetails.find(
    (record) => record.id === messageDetails?.sender_id,
  );
  !sender && null;

  return (
    <>
      <div className="flex w-full flex-col gap-y-10 px-6 py-4 md:px-10 lg:px-12 xl:px-14">
        <div className="flex w-full items-center justify-between pt-4">
          <NavLink to="/dashboard/messages">
            <IoArrowBackSharp className="box-border h-10 w-10 rounded-full p-2 hover:bg-slate-100" />
          </NavLink>
          <div className="flex gap-8">
            <NavLink
              to={`/${user?.role === "recruiter" ? "dashboard" : "user"}/messages/${Number(id) > 1 ? Number(id) - 1 : messageData.length}`}
            >
              <IoIosArrowBack className="box-border h-8 w-8 rounded-full p-2 hover:bg-slate-100" />
            </NavLink>
            <NavLink
              to={`/${user?.role === "recruiter" ? "dashboard" : "user"}/messages/${id && Number(id) < messageData.length ? `${Number(id) + 1}` : 1}`}
            >
              <IoIosArrowForward className="box-border h-8 w-8 rounded-full p-2 hover:bg-slate-100" />
            </NavLink>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold md:mt-4">
            {messageDetails?.subject}
          </h1>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="flex">
            <div className="flex">
              <img
                src={sender?.avatar}
                alt={`${sender?.name}'s avatar`}
                className="h-[3rem] w-[3rem]"
              />
            </div>
            <div className="ml-2 flex flex-col justify-center">
              <h2 className="font-semibold">{sender?.name}</h2>
              <p className="text-sm">{sender?.email}</p>
            </div>
          </div>
          <p className="font-semibold">{messageDetails?.created_at}</p>
        </div>
        <div className="mt-2">
          <div>{messageDetails?.content}</div>
        </div>
      </div>
    </>
  );
}

export default SingleMessage;
