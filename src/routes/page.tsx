import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <header>
        <div className="container flex items-center gap-2 py-4">
          <img src="/logo.jpeg" alt="fupre logo" className="logo" />
          <div className="font-semibold text-lg mr-auto">Fupre Community</div>
          <Link to="/login" className="btn">Log in</Link>
        </div>
      </header>

      <main className="text-center">
        <section className="hero text-white text-balance">
          <div className="container py-16 space-y-4">
            <h1 className="text-3xl font-semibold">Welcome to the FUPRE Community</h1>
            <p>Connecting the FUPRE community through seamless communication and collaboration</p>
            <div>
              <Link to="/signup" className="btn">Get Started</Link>
            </div>
          </div>
        </section>

        <section className="container py-16 space-y-16">
          <h2 className="font-semibold text-2xl">Features</h2>
          {features.map(({ feature, description, img }, index) => (
            <div key={index} className="px-8">
              <img src={img} alt="feature illustration" className="w-48 mx-auto mb-8" />
              <h2 className="font-semibold text-lg mb-4">{feature}</h2>
              <p>{description}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="py-4 bg-gray-800 text-gray-300 text-center text-balance text-sm">
        <div className="container">
          <p>&copy; 2024 FUPRE Community. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

const features = [
  {
    img: "/community.svg",
    feature: "Community Base Chat System",
    description: "Real-time communication for instant conversations."
  },
  {
    img: "/chatting.svg",
    feature: "Chat Channels",
    description: "Organize discussions into different channels."
  },
  {
    img: "/news.svg",
    feature: "Announcement Channel",
    description: "Stay updated with important news and updates."
  },
  {
    img: "/questions.svg",
    feature: "Q&A Forum",
    description: "Ask questions and get answers from the community."
  },
  {
    img: "/typing.svg",
    feature: "Default Chatbox",
    description: "Engage in informal and casual conversations."
  }
]
