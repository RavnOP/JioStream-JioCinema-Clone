export function DisclaimerSection() {
  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-purple-900/5 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="w-full">
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Important Disclaimer</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                JioStream is an <strong>educational open source project</strong> created to demonstrate web development
                techniques. It is not affiliated with any commercial streaming service.
              </p>
              <p>
                This project uses The Movie Database (TMDB) API for movie and TV show information, but is not endorsed
                or certified by TMDB. All movie and show data is the property of their respective owners.
              </p>
              <p>
                No actual video content is hosted or distributed by this application. Any video playback is simulated or
                uses publicly available embedded URLs for demonstration purposes only.
              </p>
              <p>
                This application only stores minimal user data required for authentication and user experience features
                (watchlist, continue watching, etc.) through Supabase.
              </p>
              <p className="font-semibold">
                JioStream is not intended for commercial use and should only be used for learning and educational
                purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
