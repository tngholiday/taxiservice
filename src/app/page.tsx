'use client';

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [activeTab, setActiveTab] = useState("Tokyo");
  const [activeSubTab, setActiveSubTab] = useState("NRT (Narita)");
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // News data
  const newsItems = [
    {
      id: 1,
      title: "New Fleet of Luxury Vehicles Added",
      description:
        "We&apos;ve expanded our fleet with 10 new luxury vehicles to better serve our VIP clients.",
      date: "June 15, 2025",
      image:
        "https://readdy.ai/api/search-image?query=modern%20luxury%20black%20car%20with%20professional%20driver%20on%20clean%20minimalist%20background%2C%20professional%20photography%2C%20high%20end%20vehicle%2C%20business%20transportation&width=600&height=400&seq=news1&orientation=landscape",
    },
    {
      id: 2,
      title: "Special Summer Discount for Airport Transfers",
      description:
        "Enjoy 15% off on all airport transfers booked between July and August 2025.",
      date: "June 10, 2025",
      image:
        "https://readdy.ai/api/search-image?query=airport%20terminal%20with%20luxury%20taxi%20waiting%20outside%2C%20professional%20photography%2C%20business%20travel%2C%20transportation%20service%2C%20clean%20minimal%20background&width=600&height=400&seq=news2&orientation=landscape",
    },
    {
      id: 3,
      title: "New Partnership with Tokyo Grand Hotel",
      description:
        "We&apos;re proud to announce our exclusive partnership with Tokyo Grand Hotel for guest transportation.",
      date: "June 5, 2025",
      image:
        "https://readdy.ai/api/search-image?query=luxury%20hotel%20entrance%20with%20professional%20taxi%20service%2C%20business%20partnership%2C%20hospitality%20industry%2C%20clean%20minimal%20background%2C%20professional%20photography&width=600&height=400&seq=news3&orientation=landscape",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "James Wilson",
      role: "Business Traveler",
      comment:
        "The service was impeccable. The driver was punctual, professional, and spoke excellent English. I&apos;ll definitely use Hire Taxi Japan for all my future trips.",
      rating: 5,
      image:
        "https://readdy.ai/api/search-image?query=professional%20business%20man%20in%20suit%20smiling%20at%20camera%2C%20headshot%20portrait%2C%20clean%20background%2C%20professional%20photography&width=100&height=100&seq=test1&orientation=squarish",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Tourist",
      comment:
        "As a first-time visitor to Japan, I was worried about transportation. Hire Taxi Japan made everything so easy! The booking process was simple and the driver was very helpful.",
      rating: 5,
      image:
        "https://readdy.ai/api/search-image?query=professional%20woman%20smiling%20at%20camera%2C%20headshot%20portrait%2C%20clean%20background%2C%20professional%20photography&width=100&height=100&seq=test2&orientation=squarish",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Corporate Client",
      comment:
        "We&apos;ve been using Hire Taxi Japan for our executive transportation needs for over a year now. Their reliability and professionalism are unmatched in the industry.",
      rating: 5,
      image:
        "https://readdy.ai/api/search-image?query=asian%20business%20man%20in%20formal%20attire%20smiling%20at%20camera%2C%20headshot%20portrait%2C%20clean%20background%2C%20professional%20photography&width=100&height=100&seq=test3&orientation=squarish",
    },
  ];

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-[1024px] w-full bg-white text-gray-800 font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-red-600 text-white shadow-md">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold tracking-wider">
                HIRE TAXI JAPAN
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="px-3 py-2 text-sm font-medium hover:bg-red-700 rounded-button whitespace-nowrap cursor-pointer"
                >
                  Home
                </Link>
                <Link
                  href="/booking"
                  className="px-3 py-2 text-sm font-medium hover:bg-red-700 rounded-button whitespace-nowrap cursor-pointer"
                >
                  Reservation
                </Link>
                <a
                  href="#"
                  className="px-3 py-2 text-sm font-medium hover:bg-red-700 rounded-button whitespace-nowrap cursor-pointer"
                >
                  Event
                </a>
                <a
                  href="#"
                  className="px-3 py-2 text-sm font-medium hover:bg-red-700 rounded-button whitespace-nowrap cursor-pointer"
                >
                  Tours
                </a>
                <a
                  href="#"
                  className="px-3 py-2 text-sm font-medium hover:bg-red-700 rounded-button whitespace-nowrap cursor-pointer"
                >
                  Fleet
                </a>
                <a
                  href="#"
                  className="px-3 py-2 text-sm font-medium hover:bg-red-700 rounded-button whitespace-nowrap cursor-pointer"
                >
                  Staff
                </a>
                <a
                  href="#"
                  className="px-3 py-2 text-sm font-medium hover:bg-red-700 rounded-button whitespace-nowrap cursor-pointer"
                >
                  Contact Us
                </a>
                <a
                  href="#"
                  className="px-3 py-2 text-sm font-medium hover:bg-red-700 rounded-button whitespace-nowrap cursor-pointer"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="px-3 py-2 text-sm font-medium hover:bg-red-700 rounded-button whitespace-nowrap cursor-pointer"
                >
                  Business / VIP&apos;s
                </a>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-white text-red-600 px-4 py-2 rounded-button font-medium hover:bg-gray-100 transition duration-150 whitespace-nowrap cursor-pointer">
                Login / Register
              </button>
              <div className="relative cursor-pointer">
                <i className="fas fa-shopping-cart text-xl"></i>
                <span className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  0
                </span>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-white hover:bg-red-700 p-2 rounded-button focus:outline-none whitespace-nowrap cursor-pointer"
              >
                <i
                  className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
                ></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-red-700 pb-4 px-4">
            <div className="space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium hover:bg-red-800 rounded-button whitespace-nowrap cursor-pointer"
              >
                Home
              </Link>
              <Link
                href="/booking"
                className="block px-3 py-2 text-base font-medium hover:bg-red-800 rounded-button whitespace-nowrap cursor-pointer"
              >
                Reservation
              </Link>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium hover:bg-red-800 rounded-button whitespace-nowrap cursor-pointer"
              >
                Event
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium hover:bg-red-800 rounded-button whitespace-nowrap cursor-pointer"
              >
                Tours
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium hover:bg-red-800 rounded-button whitespace-nowrap cursor-pointer"
              >
                Fleet
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium hover:bg-red-800 rounded-button whitespace-nowrap cursor-pointer"
              >
                Staff
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium hover:bg-red-800 rounded-button whitespace-nowrap cursor-pointer"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium hover:bg-red-800 rounded-button whitespace-nowrap cursor-pointer"
              >
                About Us
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium hover:bg-red-800 rounded-button whitespace-nowrap cursor-pointer"
              >
                Business / VIP&apos;s
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium hover:bg-red-800 rounded-button whitespace-nowrap cursor-pointer"
              >
                Partnership
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium hover:bg-red-800 rounded-button whitespace-nowrap cursor-pointer"
              >
                Blog
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base font-medium hover:bg-red-800 rounded-button whitespace-nowrap cursor-pointer"
              >
                FAQ
              </a>
              <div className="pt-4 flex items-center justify-between">
                <button className="bg-white text-red-600 px-4 py-2 rounded-button font-medium hover:bg-gray-100 transition duration-150 whitespace-nowrap cursor-pointer">
                  Login / Register
                </button>
                <div className="relative cursor-pointer">
                  <i className="fas fa-shopping-cart text-xl"></i>
                  <span className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    0
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=luxury%20black%20car%20with%20professional%20driver%20waiting%20outside%20airport%20in%20Japan%2C%20modern%20photography%20style%2C%20clean%20minimal%20design%2C%20red%20gradient%20on%20left%20side%20for%20text%20overlay%2C%20professional%20business%20transportation%20service&width=1440&height=500&seq=hero1&orientation=landscape')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-transparent"></div>
        </div>
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-lg text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Premium Taxi Service in Japan
            </h1>
            <p className="text-xl mb-8">
              English-speaking drivers, comfortable vehicles, and exceptional
              service for your journey in Japan.
            </p>
            <button 
              onClick={() => { if (typeof window !== 'undefined') window.location.href = '/booking'; }}
              className="bg-white text-red-600 px-8 py-3 rounded-button text-lg font-bold hover:bg-gray-100 transition duration-300 shadow-lg whitespace-nowrap cursor-pointer"
            >
              Book Now <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Airport Pickup Services Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Airport Pickup Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Book your airport taxi service with Hire Taxi Japan for a seamless
              travel experience.
            </p>

            <div className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg mt-6 shadow-md">
              <div className="flex items-center">
                <i className="fas fa-clock text-2xl mr-3"></i>
                <span className="text-lg font-medium">
                  Booking takes only 3 minutes
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-6">
              Please choose an area:
            </h3>

            {/* Main Tabs */}
            <div className="flex flex-wrap border-b border-gray-200 mb-6">
              {["Tokyo", "Kansai", "Nagoya", "Fukuoka", "Hokkaido"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium text-sm rounded-t-lg mr-2 mb-0 whitespace-nowrap cursor-pointer ${
                      activeTab === tab
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>

            {/* Sub Tabs */}
            <div className="flex flex-wrap mb-8">
              {activeTab === "Tokyo" && (
                <>
                  {[
                    "NRT (Narita)",
                    "HND (Haneda)",
                    "HND-NRT Airport Shuttle",
                    "Tokyo – Disney Resort",
                    "Cruise",
                  ].map((subTab) => (
                    <button
                      key={subTab}
                      onClick={() => setActiveSubTab(subTab)}
                      className={`px-5 py-2 rounded-full mr-3 mb-3 text-sm font-medium whitespace-nowrap cursor-pointer ${
                        activeSubTab === subTab
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {subTab}
                    </button>
                  ))}
                </>
              )}
              {activeTab !== "Tokyo" && (
                <div className="w-full text-center py-8 text-gray-500">
                  <i className="fas fa-plane-departure text-4xl mb-4 text-red-600"></i>
                  <p>Please select services for {activeTab} region</p>
                </div>
              )}
            </div>

            {/* Booking Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-map-marker-alt text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm"
                      placeholder="Enter pickup location"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Pickup Date & Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-calendar-alt text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm"
                      placeholder="Select date and time"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Number of Passengers
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-users text-gray-400"></i>
                    </div>
                    <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm appearance-none bg-white">
                      <option>1 Passenger</option>
                      <option>2 Passengers</option>
                      <option>3 Passengers</option>
                      <option>4 Passengers</option>
                      <option>5+ Passengers</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Destination
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-map-marker-alt text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm"
                      placeholder="Enter destination"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Vehicle Type
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-car text-gray-400"></i>
                    </div>
                    <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm appearance-none bg-white">
                      <option>Standard Sedan</option>
                      <option>Business Sedan</option>
                      <option>Luxury Sedan</option>
                      <option>Van (up to 6 passengers)</option>
                      <option>Minibus (up to 14 passengers)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link 
                    href="/booking"
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition duration-300 shadow-md whitespace-nowrap cursor-pointer inline-block text-center"
                  >
                    Get Quote <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest News
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest news and offers from Hire Taxi Japan
            </p>
          </div>

          <div className="relative">
            <Image
              src={newsItems[currentNewsIndex].image}
              alt={newsItems[currentNewsIndex].title}
              width={600}
              height={400}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <h3 className="text-2xl font-bold mb-2">{newsItems[currentNewsIndex].title}</h3>
                <p className="text-lg mb-2">{newsItems[currentNewsIndex].description}</p>
                <p className="text-sm">{newsItems[currentNewsIndex].date}</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white text-red-600 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition duration-300 z-10"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={() => setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white text-red-600 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition duration-300 z-10"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              There are various reasons to choose Hire Taxi Japan over our
              competitors. Some are mentioned below
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-md p-6 flex items-start">
              <div className="flex-shrink-0 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  English Speaking Drivers
                </h3>
                <p className="text-gray-600">
                  All our drivers speak fluent English, ensuring smooth
                  communication throughout your journey.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-md p-6 flex items-start">
              <div className="flex-shrink-0 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Licensed Service
                </h3>
                <p className="text-gray-600">
                  We operate with all required licenses and certifications,
                  ensuring legal and safe transportation.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-md p-6 flex items-start">
              <div className="flex-shrink-0 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Easy Booking
                </h3>
                <p className="text-gray-600">
                  Our streamlined booking process takes just 3 minutes, with
                  instant confirmation and 24/7 support.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl shadow-md p-6 flex items-start">
              <div className="flex-shrink-0 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <span className="text-xl font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Competitive Rates
                </h3>
                <p className="text-gray-600">
                  We offer transparent pricing with no hidden fees, providing
                  excellent value for premium service.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-xl shadow-md p-6 flex items-start">
              <div className="flex-shrink-0 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <span className="text-xl font-bold">5</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Credit Card Payment
                </h3>
                <p className="text-gray-600">
                  Convenient payment options including all major credit cards,
                  making transactions hassle-free.
                </p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-xl shadow-md p-6 flex items-start">
              <div className="flex-shrink-0 bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <span className="text-xl font-bold">6</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Over 3500 Bookings
                </h3>
                <p className="text-gray-600">
                  Join thousands of satisfied customers who trust us for their
                  transportation needs in Japan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Experience Our Service
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Watch our video to see how we provide exceptional transportation
              services across Japan
            </p>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <button className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition duration-300 cursor-pointer">
                <i className="fas fa-play text-2xl"></i>
              </button>
            </div>
            <Image
              src="https://readdy.ai/api/search-image?query=luxury%20black%20car%20with%20professional%20driver%20in%20front%20of%20famous%20Tokyo%20landmark%2C%20cinematic%20style%2C%20professional%20videography%20still%20frame%2C%20high%20quality%20video%20production&width=1024&height=576&seq=video1&orientation=landscape"
              alt="Service video thumbnail"
              width={1024}
              height={576}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Business Partners Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Business Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We&apos;re proud to partner with these prestigious organizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition duration-300">
              <i className="fas fa-hotel text-5xl text-gray-400 mb-2"></i>
              <span className="text-gray-600 font-medium">
                Tokyo Grand Hotel
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition duration-300">
              <i className="fas fa-plane text-5xl text-gray-400 mb-2"></i>
              <span className="text-gray-600 font-medium">Japan Airlines</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition duration-300">
              <i className="fas fa-building text-5xl text-gray-400 mb-2"></i>
              <span className="text-gray-600 font-medium">Mitsui Group</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition duration-300">
              <i className="fas fa-globe-asia text-5xl text-gray-400 mb-2"></i>
              <span className="text-gray-600 font-medium">
                Japan Tourism Board
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition duration-300">
              <i className="fas fa-university text-5xl text-gray-400 mb-2"></i>
              <span className="text-gray-600 font-medium">
                Mizuho Financial
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Travel Easy & Fast With Us
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hire Taxi Japan is one of the best options to travel in and around
              Tokyo. Our services include…
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <Image
                  src="https://readdy.ai/api/search-image?query=luxury%20airport%20transfer%20service%20in%20Japan%20with%20professional%20driver%20and%20black%20car%2C%20clean%20minimal%20background%2C%20professional%20photography&width=600&height=400&seq=service1&orientation=landscape"
                  alt="Airport Transfers"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Airport Transfers
                </h3>
                <p className="text-gray-600 mb-4">
                  Reliable and comfortable transportation to and from all major
                  airports in Japan.
                </p>
                <button className="text-red-600 font-medium hover:text-red-800 transition duration-300 flex items-center whitespace-nowrap cursor-pointer">
                  Learn more <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <Image
                  src="https://readdy.ai/api/search-image?query=luxury%20car%20for%20business%20meetings%20in%20Japan%2C%20corporate%20transportation%20service%2C%20professional%20driver%2C%20clean%20minimal%20background%2C%20professional%20photography&width=600&height=400&seq=service2&orientation=landscape"
                  alt="Corporate Services"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Corporate Services
                </h3>
                <p className="text-gray-600 mb-4">
                  Dedicated transportation solutions for business travelers and
                  corporate events.
                </p>
                <button className="text-red-600 font-medium hover:text-red-800 transition duration-300 flex items-center whitespace-nowrap cursor-pointer">
                  Learn more <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <Image
                  src="https://readdy.ai/api/search-image?query=luxury%20car%20for%20sightseeing%20tour%20in%20Japan%2C%20tourist%20attractions%2C%20professional%20driver%20as%20guide%2C%20clean%20minimal%20background%2C%20professional%20photography&width=600&height=400&seq=service3&orientation=landscape"
                  alt="Sightseeing Tours"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Sightseeing Tours
                </h3>
                <p className="text-gray-600 mb-4">
                  Customized tours to popular destinations with knowledgeable
                  English-speaking guides.
                </p>
                <button className="text-red-600 font-medium hover:text-red-800 transition duration-300 flex items-center whitespace-nowrap cursor-pointer">
                  Learn more <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our satisfied customers about their experience with Hire
              Taxi Japan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                <div className="mb-4 text-yellow-400 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>

                <p className="text-gray-600">&apos;{testimonial.comment}&apos;</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="col-span-1 lg:col-span-1">
              <div className="mb-4 font-bold text-2xl text-white">
                HIRE TAXI JAPAN
              </div>
              <p className="text-gray-400 mb-6">
                Hire Taxi Japan is the Best English Speaking Private Taxi
                Service in Japan.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                >
                  <i className="fab fa-facebook-f text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                >
                  <i className="fab fa-instagram text-xl"></i>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/booking"
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Reservations
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Business / VIP&apos;s
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Tours
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Fleet
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Partnership
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                About Us
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Staff
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    HTJ Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Video
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Our Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                Contact Us
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Quote
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Contact Form
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>Copyright © 2025 Hire Taxi Japan. All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
