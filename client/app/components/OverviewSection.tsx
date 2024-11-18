
export default function OverviewSection() {
  return (
    <div className="overview-section space-y-4">
      <div className="text-gray-900">
        <h4 className="text-lg font-medium">Entire home</h4>
        <h1 className="text-2xl font-bold">
          Juneau Vacation Home: Stunning View + Beach Access
        </h1>
      </div>

      <div className="review-rating flex items-center gap-2">
        <button className="rating-btn bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
          9.8 ✩
        </button>
        <p className="text-gray-700">Exceptional</p>
      </div>

      <div className="all-link">
        <a href="#" className="text-blue-600 hover:underline">
          See all reviews &gt;
        </a>
      </div>
    </div>
  )
}
