import { HelpCircle } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

export function FAQSection() {
  const faqItems: FAQItem[] = [
    {
      question: "What is JioStream?",
      answer:
        "JioStream is an open source educational project that demonstrates how to build a streaming platform using Next.js, TMDB API, and Supabase. It's designed for learning purposes only.",
    },
    {
      question: "Is this a real streaming service?",
      answer:
        "No, JioStream is not a real streaming service. It's an educational project that simulates the functionality of a streaming platform. No actual content is hosted or distributed.",
    },
    {
      question: "Where does the movie data come from?",
      answer:
        "All movie and TV show data is sourced from The Movie Database (TMDB) API. JioStream does not store any content data locally.",
    },
    {
      question: "What data is stored about users?",
      answer:
        "JioStream only stores minimal user data required for authentication and user experience features (watchlist, continue watching, etc.) through Supabase. No personal data is shared or sold.",
    },
    {
      question: "Can I contribute to this project?",
      answer:
        "Yes! JioStream is an open source project. You can find the source code on GitHub and contribute by submitting pull requests or reporting issues.",
    },
    {
      question: "Is JioStream available on mobile devices?",
      answer:
        "Yes, JioStream is built with responsive design principles, making it accessible on mobile phones, tablets, and desktop computers. The interface adapts to different screen sizes for optimal viewing.",
    },
    {
      question: "How can I report issues or bugs?",
      answer:
        "You can report issues or bugs by opening an issue on our GitHub repository. We welcome feedback and contributions from the community to improve the project.",
    },
    {
      question: "What technologies were used to build JioStream?",
      answer:
        "JioStream is built using Next.js for the frontend framework, Tailwind CSS for styling, Supabase for authentication and database, and the TMDB API for movie and TV show data. It also uses TypeScript for type safety and SWR for data fetching.",
    },
    {
      question: "Can I use JioStream code for my own projects?",
      answer:
        "Yes, JioStream is open source and you can use the code for your own educational or personal projects. Please check the license on GitHub for specific terms and make sure to comply with the TMDB API terms of use.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/10 via-purple-900/10 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

        <div className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-all group"
            >
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-500 group-hover:rotate-12 transition-transform" />
                    {item.question}
                  </h3>
                  <div className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-500 group-open:bg-blue-500 group-open:border-blue-500 transition-all">
                    <span className="block w-3 h-0.5 bg-gray-300 group-open:bg-white absolute"></span>
                    <span className="block w-0.5 h-3 bg-gray-300 group-open:bg-white group-open:h-0 absolute transition-all"></span>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
