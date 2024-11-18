
export default function BookingSection() {
    return (
        <div className="booking-card bg-white shadow-lg p-4 rounded-lg space-y-4">
            <div className="price text-2xl font-bold">$134 <span className="text-sm">per night</span></div>

            <div className="cancellation text-sm text-gray-600">
                <span>✓</span> Free cancellation <span className="text-gray-400">Before Mon, Nov 4</span>
            </div>

            <div className="available-dates text-sm text-gray-600">
                <span>Available from</span>
                <strong> Fri, Nov 1</strong> to <strong> Sun, Nov 3</strong>
            </div>

            <button className="book-now-btn bg-blue-500 text-white py-2 px-4 rounded-lg w-full">Book Now</button>
        </div>
    )
}
