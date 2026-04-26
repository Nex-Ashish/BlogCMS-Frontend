import PolicyContent from "../../../../../components/LegalPolicy/PolicyContent";

export default function copyrightPolicy() {
  const data = [
    {
        number: "01",
        title: "Own what you post",
        content: "Only post content that's yours. If you didn't make it, don't post it.",
    },
    {
        number: "02",
        title: "Give credit",
        content: "Using someone else's work? Mention the source. Always.",
    },
    {
        number: "03",
        title: "We'll take it down",
        content: "Any content found violating copyright will be removed without warning.",
    },
    {
        number: "04",
        title: "Repeat offenders",
        content: "Accounts that repeatedly violate copyright will be permanently suspended.",
    },
    {
        number: "05",
        title: "Report a violation",
        contact: "support@blog4u.com",
    },
  ];

  return (
    <PolicyContent sections={data} title="Copyright Policy" />
  );
}