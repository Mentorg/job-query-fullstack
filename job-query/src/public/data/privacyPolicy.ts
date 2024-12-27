type PrivacyPolicy = {
  introduction: string;
  informationCollected: {
    overview: string;
    data: string[];
  };
  howInformationCollected: string;
  howInformationUsed: {
    overview: string;
    data: string[];
  };
  dataSecurity: string;
  userRights: string;
  policyChanges: string;
  policyAcceptance: string;
  conclusion: string;
};

const privacyPolicy: PrivacyPolicy = {
  introduction:
    "Welcome to Job Query, a job board web app designed to help employers manage job advertisements and find potential candidates. At Job Query, we take your privacy and data protection seriously. This Privacy Policy outlines how we collect, use, and protect your information when you use our platform.",
  informationCollected: {
    overview:
      "When you use Job Query, we may collect the following information",
    data: [
      "Personal information such as your name, email address, and contact information",
      "Job-related information such as job descriptions, requirements, and other details provided by employers",
      "Usage data including login information, IP address, browser type, and device information",
      "Any other information you choose to provide on the platform",
    ],
  },
  howInformationCollected:
    "We may collect information directly from you when you register an account, post job advertisements, or interact with the platform in any way. We may also collect information automatically through cookies, tracking technologies, and third-party analytics tools.",
  howInformationUsed: {
    overview: "The information we collect is used for the following purposes",
    data: [
      "To provide and improve our services, including personalized job recommendations and targeted advertisements",
      "To communicate with you about your account, job postings, and other important updates",
      "To analyze and report on platform usage, trends, and performance",
      "To comply with legal obligations and protect the security and integrity of the platform",
    ],
  },
  dataSecurity:
    "We take the security of your data very seriously. We use industry-standard encryption protocols to protect your personal information and prevent unauthorized access. We regularly update our security measures to ensure the safety of your data.",
  userRights:
    "As a user of Job Query, you have the right to access, update, and delete your personal information at any time. You also have the right to request that we delete your data from our servers. If you have any questions or concerns about your privacy rights, please contact us using the information provided below.",
  policyChanges:
    "We reserve the right to make changes to our privacy policy at any time. Any updates or modifications to the policy will be posted on our website. By continuing to use Job Query after the policy changes have been implemented, you are accepting the updated terms.",
  policyAcceptance:
    "By using Job Query, you agree to the terms outlined in this privacy policy. If you do not agree with any part of the policy, please refrain from using our services. Your continued use of Job Query signifies your acceptance of the terms stated in this privacy policy.",
  conclusion:
    "Your privacy and data security are important to us. We do not sell, rent, or share your personal information with third parties without your consent, except as required by law or as necessary to provide our services effectively. By using Job Query, you consent to the collection and use of your information as described in this Privacy Policy. If you have any questions or concerns about your privacy, please contact us at [contact@email.com]. This Privacy Policy is subject to updates and changes. Please review it periodically for any updates. Thank you for choosing Job Query for your job search needs.",
};

export { privacyPolicy };
