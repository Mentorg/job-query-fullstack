import { useTranslation } from "react-i18next";
import { Recruiter, User } from "../../../../../shared/types/user";

type RecruiterTeamProps = {
  team: Recruiter[];
  user: User | null;
};

function RecruiterTeam({ team, user }: RecruiterTeamProps) {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="py-4 text-xl font-medium">{t("recruiter.team")}</h2>
      <ul className="flex w-full justify-center gap-10">
        {team.map(
          (member: Recruiter) =>
            member.userId !== user?.id && (
              <li key={member.id} className="flex flex-col items-center">
                <img
                  src={
                    member.user?.avatar
                      ? `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/${member.user.avatar}`
                      : `${import.meta.env.VITE_REACT_APP_API_URL}/public/avatars/default-avatar`
                  }
                  alt="Team member's profile picture"
                  className="w-fit"
                />
                <h4 className="mt-2 text-center font-medium">
                  {member?.user?.name}
                </h4>
              </li>
            ),
        )}
      </ul>
    </>
  );
}

export default RecruiterTeam;
