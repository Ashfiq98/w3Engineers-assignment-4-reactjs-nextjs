interface host {
  host?: {
    name: string;
    contact: string;
  };
}
export default function Footer({ host }: host) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Unified Review Section */}
      <div className="relative overflow-hidden border rounded-lg shadow-md bg-white p-6">
        {/* Text Section */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold">9.8/10</div>
          <div className="text-lg text-green-600 font-semibold">Exceptional</div>
          <div className="text-sm text-gray-500">
            24 reviews <span className="cursor-pointer text-gray-400">ℹ️</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 overflow-hidden">
          {/* Review Card 1 */}
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <div className="font-semibold text-lg text-green-600">10/10 Excellent</div>
            <p className="text-gray-700 mt-2">
              A very cozy home for the two of us in a quiet area NW of town. Beautiful water view. We enjoyed the art, read up in it and visited the...
              <a href="#" className="text-blue-600 hover:underline ml-1">Read more</a>
            </p>
            <div className="text-sm text-gray-500 mt-2">Kyle G.</div>
            <div className="text-sm text-gray-400">Sep 25, 2024</div>
          </div>

          {/* Review Card 2 */}
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <div className="font-semibold text-lg text-green-600">10/10 Excellent</div>
            <p className="text-gray-700 mt-2">
              The cottage was just as the pictures and description stated. Nice quiet area and great view of the cove.
              <a href="#" className="text-blue-600 hover:underline ml-1">Read more</a>
            </p>
            <div className="text-sm text-gray-500 mt-2">Cindy B.</div>
            <div className="text-sm text-gray-400">Sep 23, 2024</div>
          </div>

          {/* Review Card 3 */}
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <div className="font-semibold text-lg text-green-600">10/10 Excellent</div>
            <p className="text-gray-700 mt-2">
              The cottage was just as the pictures and description stated. Nice quiet area and great view of the cove.
              <a href="#" className="text-blue-600 hover:underline ml-1">Read more</a>
            </p>
            <div className="text-sm text-gray-500 mt-2">Cindy B.</div>
            <div className="text-sm text-gray-400">Sep 23, 2024</div>
          </div>
        </div>
      </div>

      {/* About Host */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold mb-2">About the host</h2>
        <p className="text-gray-700">Hosted by {host?.name}</p>
      </div>

      {/* Languages Section */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Languages:</h3>
        <p className="text-gray-700">English, French, German, Spanish</p>
      </div>

      {/* Contact Section */}
      <div className="mt-8 text-center">
        <h2 className="text-xl font-bold mb-2">Send the message</h2>
        <a
          href="#"
          className="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Contact {host?.contact}
        </a>
      </div>
    </div>
  );
}
