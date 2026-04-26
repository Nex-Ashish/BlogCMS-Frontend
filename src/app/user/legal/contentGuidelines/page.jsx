import PolicyContent from "../../../../../components/LegalPolicy/PolicyContent";

export default function ContentGuidelines() {
  const data = [
    {
      number: "01",
      title: "Be respectful",
      content: "No hate speech, harassment, or content that targets individuals or groups.",
    },
    {
      number: "02",
      title: "Be honest",
      content: "Don't post misinformation, fake news, or content designed to mislead.",
    },
    {
      number: "03",
      title: "Respect ownership",
      content: "Only post content you own or have rights to. Give credit where it's due.",
    },
    {
      number: "04",
      title: "No spam",
      content: "Don't flood the platform with repetitive, promotional, or low-effort posts.",
    },
    {
      number: "05",
      title: "Stay legal",
      content: "Any content that violates local or international laws will be removed immediately.",
    },
  ];

  return (
    <PolicyContent sections={data} title="Content Guidelines" />
  );
}