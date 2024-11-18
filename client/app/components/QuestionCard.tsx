
export default function QuestionCard() {
    return (

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-6 my-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        Have a question?
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                        Beta
                    </span>
                </div>

                <p className="text-gray-600 text-sm sm:text-base mb-6">
                    Get instant answers with AI powered search of property information and reviews.
                </p>

                <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <i className="fa-solid fa-magnifying-glass h-5 w-5 text-gray-800"></i>
                    </div>

                    <input
                        type="text"
                        placeholder="Ask a question"
                        className="block w-full rounded-lg border border-gray-300 py-3 pl-12 pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        aria-label="Ask a question"
                    />

                    <button
                        className="absolute inset-y-1 right-1 flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-md transition-colors"
                        aria-label="Search"
                    >
                        <i className="fa-brands fa-searchengin h-5 w-5"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
