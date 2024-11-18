
export default function AmenitiesSection() {
    return (
        <div className="amenities-section space-y-4">
            <div className="essential-amenities space-y-4">
                <div className="first-div flex gap-6">
                    <section className="section">🏠 Two bedrooms</section>
                    <section className="section">👨‍👩‍👧 Sleep 4</section>
                </div>
                <div className="second-div flex gap-6">
                    <section className="section">🚿 1 bathroom</section>
                    <section className="section">📏 1155 sq ft</section>
                </div>
            </div>

            <h2 className="popular-amenities-header text-xl font-semibold">Popular Amenities</h2>
            <div className="popular-amenities grid grid-cols-2 gap-4">
                <section className="section">🍖 Barbecue grill</section>
                <section className="section">🏕 Outdoor Space</section>
                <section className="section">🍽️ Kitchen</section>
                <section className="section">🚿 Washer</section>
                <section className="section">🚗 Parking available</section>
                <section className="section">🌡 Dryer</section>
            </div>

            <div className="all-link">
                <a href="#" className="text-blue-600 hover:underline">See all amenities<i className="fa-solid fa-arrow-left text-blue-600"></i></a>
            </div>
            
        </div>
    )
}
