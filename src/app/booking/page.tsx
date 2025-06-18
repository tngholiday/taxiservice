"use client";
import React, { useState, useRef, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const rideOptions = [
  {
    name: "Luxury Sedan",
    time: "1 min",
    timeValue: 1,
    desc: "Premium sedan with leather seats and professional chauffeur",
    icon: "🚘",
    capacity: "4 passengers",
    features: ["Leather seats", "Climate control", "WiFi", "Refreshments"],
    price: 2500
  },
  {
    name: "Luxury SUV",
    time: "2 min",
    timeValue: 2,
    desc: "Spacious luxury SUV for comfortable group travel",
    icon: "🚙",
    capacity: "6 passengers",
    features: ["Premium leather", "Climate control", "WiFi", "Refreshments"],
    price: 3500
  },
  {
    name: "Luxury Van",
    time: "3 min",
    timeValue: 3,
    desc: "Executive van for larger groups with extra comfort",
    icon: "🚐",
    capacity: "8 passengers",
    features: ["Premium leather", "Climate control", "WiFi", "Refreshments", "Extra luggage space"],
    price: 4500
  }
];

const tabs = ["DAILY RIDES", "OUTSTATION", "RENTALS"];

const areaOptions = [
  { label: "Tokyo", airports: ["NRT (Narita)", "HND (Haneda)", "HND-NRT Airport Shuttle", "Tokyo – Disney Resort", "Cruise"] },
  { label: "Kansai", airports: ["KIX (Kansai)", "ITM (Itami)"] },
  { label: "Nagoya", airports: ["NGO (Chubu Centrair)"] },
  { label: "Fukuoka", airports: ["FUK (Fukuoka)"] },
  { label: "Hokkaido", airports: ["CTS (New Chitose)"] },
];

// Add a mapping of airport to terminals
const airportTerminals: Record<string, string[]> = {
  "NRT (Narita)": ["Terminal 1", "Terminal 2", "Terminal 3"],
  "HND (Haneda)": ["Terminal 1", "Terminal 2", "Terminal 3", "International Terminal"],
  "KIX (Kansai)": ["Terminal 1", "Terminal 2"],
  "ITM (Itami)": ["Main Terminal"],
  "NGO (Chubu Centrair)": ["Terminal 1", "Terminal 2"],
  "FUK (Fukuoka)": ["Domestic Terminal", "International Terminal"],
  "CTS (New Chitose)": ["Domestic Terminal", "International Terminal"],
};

// Add a mapping of airport+terminal to coordinates
const terminalCoords: Record<string, { lat: number; lng: number }> = {
  // Narita International Airport (NRT)
  "NRT (Narita)-Terminal 1": { lat: 35.7720, lng: 140.3929 },
  "NRT (Narita)-Terminal 2": { lat: 35.7765, lng: 140.3869 },
  "NRT (Narita)-Terminal 3": { lat: 35.7792, lng: 140.3847 },
  // Haneda Airport (HND)
  "HND (Haneda)-Terminal 1": { lat: 35.5494, lng: 139.7866 },
  "HND (Haneda)-Terminal 2": { lat: 35.5493, lng: 139.7798 },
  "HND (Haneda)-Terminal 3": { lat: 35.5494, lng: 139.7846 },
  "HND (Haneda)-International Terminal": { lat: 35.5494, lng: 139.7798 },
  // Kansai International Airport (KIX)
  "KIX (Kansai)-Terminal 1": { lat: 34.4347, lng: 135.2327 },
  "KIX (Kansai)-Terminal 2": { lat: 34.4284, lng: 135.2366 },
  // Itami Airport (ITM)
  "ITM (Itami)-Main Terminal": { lat: 34.7855, lng: 135.4382 },
  // Chubu Centrair International Airport (NGO)
  "NGO (Chubu Centrair)-Terminal 1": { lat: 34.8584, lng: 136.8052 },
  "NGO (Chubu Centrair)-Terminal 2": { lat: 34.8572, lng: 136.8037 },
  // Fukuoka Airport (FUK)
  "FUK (Fukuoka)-Domestic Terminal": { lat: 33.5859, lng: 130.4506 },
  "FUK (Fukuoka)-International Terminal": { lat: 33.5902, lng: 130.4428 },
  // New Chitose Airport (CTS)
  "CTS (New Chitose)-Domestic Terminal": { lat: 42.7752, lng: 141.6923 },
  "CTS (New Chitose)-International Terminal": { lat: 42.7772, lng: 141.6876 },
};

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState("DAILY RIDES");
  const [toLocation, setToLocation] = useState("");
  const [dropoffSearch, setDropoffSearch] = useState("");
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const toInputRef = useRef<HTMLInputElement>(null);
  const dropoffInputRef = useRef<HTMLInputElement>(null);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedAirport, setSelectedAirport] = useState("");
  const [areaAirportTab, setAreaAirportTab] = useState("AREA");
  const [selectedTerminal, setSelectedTerminal] = useState("");
  const [dropoffCoords, setDropoffCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('leaflet').Map | null>(null);
  const markerRef = useRef<import('leaflet').Marker | null>(null);
  const dropoffMarkerRef = useRef<import('leaflet').Marker | null>(null);
  const polylineRef = useRef<import('leaflet').Polyline | null>(null);

  // Sample locations for dropdowns
  const commonLocations = [
    "Tokyo Station",
    "Shinjuku Station",
    "Shibuya Station",
    "Ginza",
    "Roppongi",
    "Akihabara",
    "Ueno",
    "Asakusa",
    "Tokyo Skytree",
    "Tokyo Disneyland"
  ];

  const filteredToLocations = commonLocations.filter(loc => 
    loc.toLowerCase().includes(toLocation.toLowerCase())
  );

  const filteredDropoffLocations = commonLocations.filter(loc => 
    loc.toLowerCase().includes(dropoffSearch.toLowerCase())
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let L: typeof import('leaflet');
    (async () => {
      L = (await import('leaflet')).default;
      const defaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      L.Marker.prototype.options.icon = defaultIcon;
      if (!mapRef.current && mapContainerRef.current) {
        mapRef.current = L.map(mapContainerRef.current, {
          center: [35.772, 140.392],
          zoom: 13,
          zoomControl: false,
        });
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);
      }
      // Set marker and view if terminal is selected
      if (selectedAirport && selectedTerminal && mapRef.current) {
        const key = `${selectedAirport}-${selectedTerminal}`;
        const coords = terminalCoords[key];
        if (coords) {
          mapRef.current.setView([coords.lat, coords.lng], 16);
          if (markerRef.current) {
            markerRef.current.setLatLng([coords.lat, coords.lng]);
          } else {
            markerRef.current = L.marker([coords.lat, coords.lng])
              .addTo(mapRef.current)
              .bindPopup(`${selectedTerminal}`)
              .openPopup();
          }
        }
      }
      // Enable map click for drop-off after terminal is selected
      if (selectedAirport && selectedTerminal && mapRef.current) {
        mapRef.current.off('click');
        mapRef.current.on('click', function (e: import('leaflet').LeafletMouseEvent) {
          const key = `${selectedAirport}-${selectedTerminal}`;
          const terminal = terminalCoords[key];
          if (!terminal || !mapRef.current) return;
          const { lat, lng } = e.latlng;
          setDropoffCoords({ lat, lng });
          if (dropoffMarkerRef.current) {
            dropoffMarkerRef.current.setLatLng([lat, lng]);
          } else {
            dropoffMarkerRef.current = L.marker([lat, lng])
              .addTo(mapRef.current)
              .bindPopup('Drop-off Location')
              .openPopup();
          }
          const points: import('leaflet').LatLngTuple[] = [
            [terminal.lat, terminal.lng],
            [lat, lng]
          ];
          if (polylineRef.current) {
            polylineRef.current.setLatLngs(points);
          } else {
            polylineRef.current = L.polyline(points, { color: 'blue' }).addTo(mapRef.current);
          }
          const d = mapRef.current.distance([terminal.lat, terminal.lng], [lat, lng]) / 1000;
          setDistance(d);
        });
      }
    })();
    // No cleanup for demo; in production, clean up map instance on unmount
  }, [selectedAirport, selectedTerminal]);

  // Function to handle dropoff location selection
  const handleDropoffSelect = (location: string) => {
    setDropoffSearch(location);
    setShowDropoffDropdown(false);
    
    // Find coordinates for the selected location
    const locationCoords = {
      "Tokyo Station": { lat: 35.6812, lng: 139.7671 },
      "Shinjuku Station": { lat: 35.6895, lng: 139.7004 },
      "Shibuya Station": { lat: 35.6580, lng: 139.7016 },
      "Ginza": { lat: 35.6716, lng: 139.7639 },
      "Roppongi": { lat: 35.6618, lng: 139.7340 },
      "Akihabara": { lat: 35.7022, lng: 139.7745 },
      "Ueno": { lat: 35.7142, lng: 139.7744 },
      "Asakusa": { lat: 35.7147, lng: 139.7967 },
      "Tokyo Skytree": { lat: 35.7103, lng: 139.8091 },
      "Tokyo Disneyland": { lat: 35.6329, lng: 139.8804 }
    };

    const coords = locationCoords[location as keyof typeof locationCoords];
    if (coords && mapRef.current) {
      setDropoffCoords(coords);
      mapRef.current.setView([coords.lat, coords.lng], 15);
      
      // Update or create dropoff marker
      if (dropoffMarkerRef.current) {
        dropoffMarkerRef.current.setLatLng([coords.lat, coords.lng]);
      } else {
        dropoffMarkerRef.current = L.marker([coords.lat, coords.lng])
          .addTo(mapRef.current)
          .bindPopup(`Drop-off: ${location}`)
          .openPopup();
      }

      // Draw route if terminal is selected
      if (selectedAirport && selectedTerminal) {
        const key = `${selectedAirport}-${selectedTerminal}`;
        const terminal = terminalCoords[key];
        if (terminal) {
          const points: [number, number][] = [
            [terminal.lat, terminal.lng],
            [coords.lat, coords.lng]
          ];
          if (polylineRef.current) {
            polylineRef.current.setLatLngs(points);
          } else {
            polylineRef.current = L.polyline(points, { color: 'blue' }).addTo(mapRef.current);
          }
          const d = mapRef.current.distance([terminal.lat, terminal.lng], [coords.lat, coords.lng]) / 1000;
          setDistance(d);
        }
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left Panel */}
      <div className="w-full md:w-[40%] bg-white flex flex-col min-h-[300px] md:min-h-screen shadow-lg relative">
        {/* Header */}
        <div className="p-4 border-b">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Book a Ride</h1>
          <p className="text-gray-600 text-sm md:text-base">Select your destination and preferred vehicle</p>
        </div>
      
        {/* Tabs */}
        <div className="flex border-b px-2 md:px-4 pt-2 gap-2 md:gap-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 md:px-3 py-2 md:py-1 text-sm md:text-base font-semibold rounded mb-1 whitespace-nowrap ${
                activeTab === tab
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-red-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Area/Airport Tabs */}
        <div className="flex flex-col gap-2 px-2 md:px-4 py-3 border-b">
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded-t font-semibold text-sm border-b-2 transition-colors duration-150 ${
                areaAirportTab === "AREA" 
                  ? "border-red-600 text-red-600" 
                  : "border-transparent text-gray-400"
              }`}
              onClick={() => setAreaAirportTab("AREA")}
            >
              AREA
            </button>
            <button
              className={`px-4 py-2 rounded-t font-semibold text-sm border-b-2 transition-colors duration-150 ${
                areaAirportTab === "AIRPORT" 
                  ? "border-red-600 text-red-600" 
                  : "border-transparent text-gray-400"
              }`}
              onClick={() => selectedArea && setAreaAirportTab("AIRPORT")}
              disabled={!selectedArea}
            >
              AIRPORT
            </button>
          </div>
          {/* AREA TAB CONTENT */}
          {areaAirportTab === "AREA" && (
            <div className="flex flex-wrap gap-2 mb-2">
              {areaOptions.map(area => (
                <button
                  key={area.label}
                  className={`px-4 py-2 rounded border text-sm font-medium transition-colors duration-150 ${
                    selectedArea === area.label 
                      ? "bg-red-600 text-white border-red-600" 
                      : "bg-white text-gray-700 border-gray-200 hover:bg-red-50"
                  }`}
                  onClick={() => {
                    setSelectedArea(area.label);
                    setSelectedAirport("");
                    setAreaAirportTab("AIRPORT");
                  }}
                >
                  {area.label}
                </button>
              ))}
            </div>
          )}
          {/* AIRPORT TAB CONTENT */}
          {areaAirportTab === "AIRPORT" && selectedArea && (
            <div className="flex flex-wrap gap-2 mb-2">
              {areaOptions.find(a => a.label === selectedArea)?.airports.map(ap => (
                <button
                  key={ap}
                  className={`px-4 py-2 rounded border text-sm font-medium transition-colors duration-150 ${
                    selectedAirport === ap 
                      ? "bg-red-600 text-white border-red-600" 
                      : "bg-white text-gray-700 border-gray-200 hover:bg-red-50"
                  }`}
                  onClick={() => setSelectedAirport(ap)}
                >
                  {ap}
                </button>
              ))}
            </div>
          )}
          {/* Show rest of form only if both area and airport are selected */}
          {selectedArea && selectedAirport && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 font-semibold">TO</label>
                  {airportTerminals[selectedAirport] ? (
                    <select
                      className="w-full bg-white border border-gray-200 rounded px-3 py-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600"
                      value={selectedTerminal}
                      onChange={e => setSelectedTerminal(e.target.value)}
                    >
                      <option value="">Select Terminal</option>
                      {airportTerminals[selectedAirport].map(terminal => (
                        <option key={terminal} value={terminal}>{terminal}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="relative">
                      <input
                        ref={toInputRef}
                        className="w-full bg-white border border-gray-200 rounded px-3 py-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600"
                        placeholder="Enter destination"
                        value={toLocation}
                        onChange={(e) => {
                          setToLocation(e.target.value);
                          setShowToDropdown(true);
                        }}
                        onFocus={() => setShowToDropdown(true)}
                      />
                      {showToDropdown && toLocation && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                          {filteredToLocations.length > 0 ? (
                            filteredToLocations.map((location, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 hover:bg-red-50 cursor-pointer text-sm"
                                onClick={() => {
                                  setToLocation(location);
                                  setShowToDropdown(false);
                                }}
                              >
                                {location}
                              </div>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">No locations found</div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-semibold">WHEN</label>
                  <div className="space-y-2">
                    <div className="relative">
                      <input
                        ref={dropoffInputRef}
                        className="w-full bg-white border border-gray-200 rounded px-3 py-3 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600"
                        placeholder="Search dropoff location"
                        value={dropoffSearch}
                        onChange={(e) => {
                          setDropoffSearch(e.target.value);
                          setShowDropoffDropdown(true);
                        }}
                        onFocus={() => setShowDropoffDropdown(true)}
                      />
                      {showDropoffDropdown && dropoffSearch && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                          {filteredDropoffLocations.length > 0 ? (
                            filteredDropoffLocations.map((location, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 hover:bg-red-50 cursor-pointer text-sm"
                                onClick={() => handleDropoffSelect(location)}
                              >
                                {location}
                              </div>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">No locations found</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Available Rides */}
        <div className="px-2 md:px-4 py-3 text-xs md:text-sm text-gray-600 font-semibold">AVAILABLE RIDES</div>
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <div className="grid grid-cols-1 gap-3">
            {rideOptions.map((ride) => (
              <div
                key={ride.name}
                onClick={() => setSelectedRide(ride.name)}
                className={`bg-white rounded-lg shadow-sm border transition-all duration-200 cursor-pointer ${
                  selectedRide === ride.name 
                    ? 'border-red-500 shadow-md bg-red-50' 
                    : 'border-gray-100 hover:border-red-200 hover:shadow-md'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      selectedRide === ride.name ? 'bg-red-100' : 'bg-red-50'
                    }`}>
                      <span className="text-2xl">{ride.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold ${
                            selectedRide === ride.name ? 'text-red-700' : 'text-gray-900'
                          }`}>{ride.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedRide === ride.name 
                              ? 'bg-red-200 text-red-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>{ride.capacity}</span>
                        </div>
                        <span className={`text-sm font-medium ${
                          selectedRide === ride.name ? 'text-red-600' : 'text-red-600'
                        }`}>{ride.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{ride.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {ride.features.map((feature, index) => (
                          <span 
                            key={index} 
                            className={`text-xs px-2 py-1 rounded-full border ${
                              selectedRide === ride.name
                                ? 'bg-red-50 text-red-600 border-red-100'
                                : 'bg-gray-50 text-gray-600 border-gray-100'
                            }`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`px-4 py-3 border-t rounded-b-lg flex items-center justify-end ${
                  selectedRide === ride.name ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'
                }`}>
                  <button className={`font-medium text-sm ${
                    selectedRide === ride.name 
                      ? 'text-red-700 hover:text-red-800' 
                      : 'text-red-600 hover:text-red-700'
                  }`}>
                    {selectedRide === ride.name ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Summary Bar */}
        {selectedRide && (
          <div className="fixed bottom-0 left-0 md:left-[40%] right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {rideOptions.find(ride => ride.name === selectedRide)?.icon}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedRide}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedArea} → {selectedAirport}
                      {selectedTerminal && ` (${selectedTerminal})`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Fare</p>
                  <p className="text-xl font-bold text-gray-900">
                    ¥{rideOptions.find(ride => ride.name === selectedRide)?.price.toLocaleString()}
                  </p>
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Right Panel: Leaflet Map */}
      <div className="w-full md:w-[60%] min-h-[300px] md:min-h-screen relative flex items-center justify-center bg-gray-100">
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-[300px] md:h-full rounded" style={{ minHeight: '300px', zIndex: 1 }}></div>
        {distance && dropoffCoords && (
          <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded px-4 py-2 shadow text-red-600 text-sm z-10">
            Distance: {distance.toFixed(2)} km
          </div>
        )}
      </div>
    </div>
  );
}