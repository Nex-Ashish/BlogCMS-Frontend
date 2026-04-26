import PolicyContent from "../../../../../components/LegalPolicy/PolicyContent";

export default function Privacy() {
  const data = [
    {
        number: "01",
        title: "What we collect",
        content: "Just your name, email, and the content you post. Nothing extra.",
    },
    {
        number: "02",
        title: "How we use it",
        content: "To run your account and show your blogs. We don't sell your data to anyone.",
    },
    {
        number: "03",
        title: "Cookies",
        content: "We use cookies only to keep you logged in. No tracking or ad cookies.",
    },
    {
        number: "04",
        title: "Your data, your choice",
        content: "You can delete your account anytime. Your data goes with it.",
    },
    {
        number: "05",
        title: "Questions?",
        contact: "support@blog4u.com",
    },
    ];

  return (
    <PolicyContent sections={data} title="Privacy Policy" />
  );
}