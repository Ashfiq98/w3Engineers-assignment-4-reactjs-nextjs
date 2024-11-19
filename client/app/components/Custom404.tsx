import Link from 'next/link';

const Custom404 = () => {
  const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ9F67ZglhjjKYHciPL12vFgFJLZQ5Vs432A&s";
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-200">
      <div className="text-center max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist. Please enter valid Slug or HotelId
        </p>

        {/* <Link href="/">
          <a className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 transition">
            Go to Home
          </a>
        </Link> */}

        <div className="mt-8">
          <img
            src={imageUrl}
            alt="404 Illustration"
            className="w-64 mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Custom404;