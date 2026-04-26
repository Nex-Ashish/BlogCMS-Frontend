import PolicyContent from "../../../../../components/LegalPolicy/PolicyContent";

export default function TermsOfUse() {
  const data = [
    {
      number: "01",
      title: "Using Blog4u",
      content: "By using this platform, you agree to these terms. If you don't, please don't use Blog4u.",
    },
    {
      number: "02",
      title: "Your account",
      content: "Keep your login credentials safe. You're responsible for anything that happens under your account.",
    },
    {
      number: "03",
      title: "Your content",
      content: "Whatever you post belongs to you. We just display it on the platform — nothing more.",
    },
    {
      number: "04",
      title: "What's not allowed",
      list: [
        "Spam or fake information",
        "Hate speech or harassment",
      ],
    },
    {
      number: "05",
      title: "Accounts & termination",
      content: "We may suspend accounts that break these rules. We'll try to be fair about it.",
    }
  ];

  return (
    <PolicyContent sections={data} title="Terms Of Use" />
  );
}