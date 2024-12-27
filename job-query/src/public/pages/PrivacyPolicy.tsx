import Navigation from "../components/Navigation";
import { privacyPolicy } from "../data/privacyPolicy";
import TermsSectionContainer from "../components/TermsSectionContainer";

function PrivacyPolicy() {
  return (
    <>
      <Navigation />
      <main className="container mx-auto flex flex-col px-8 py-20 sm:px-16 sm:py-20 xl:py-[6.75rem]">
        <TermsSectionContainer
          title="Privacy Policy"
          content={privacyPolicy.introduction}
        />
        <TermsSectionContainer
          title="Information Collected"
          content={privacyPolicy.informationCollected.overview}
          list={privacyPolicy.informationCollected.data}
        />
        <TermsSectionContainer
          title="How information is collected"
          content={privacyPolicy.howInformationCollected}
        />
        <TermsSectionContainer
          title="How information is used"
          content={privacyPolicy.howInformationUsed.overview}
          list={privacyPolicy.howInformationUsed.data}
        />
        <TermsSectionContainer
          title="Data security"
          content={privacyPolicy.dataSecurity}
        />
        <TermsSectionContainer
          title="User rights"
          content={privacyPolicy.userRights}
        />
        <TermsSectionContainer
          title="Changes to the policy"
          content={privacyPolicy.policyChanges}
        />
        <TermsSectionContainer
          title="Acceptance of policy"
          content={privacyPolicy.policyAcceptance}
        />
        <TermsSectionContainer content={privacyPolicy.conclusion} />
      </main>
    </>
  );
}

export default PrivacyPolicy;
