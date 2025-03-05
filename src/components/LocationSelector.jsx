// import React, { useState, useEffect } from "react";

// const LocationSelector = () => {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);

//   const [selectedCountry, setSelectedCountry] = useState("Select Country");
//   const [selectedState, setSelectedState] = useState("Select State");
//   const [selectedCity, setSelectedCity] = useState("Select City");

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch("https://crio-location-selector.onrender.com/countries");
//         if (!response.ok) throw new Error("Failed to fetch countries");
//         const data = await response.json();
//         setCountries(data);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };

//     fetchCountries();
//   }, []);

//   const handleCountryChange = async (country) => {
//     setSelectedCountry(country);
//     setSelectedState("Select State");
//     setSelectedCity("Select City");
//     setStates([]);
//     setCities([]);

//     if (!country) return;

//     try {
//       const response = await fetch(
//         `https://crio-location-selector.onrender.com/country=${country}/states`
//       );
//       if (!response.ok) throw new Error("Failed to fetch states");
//       const data = await response.json();
//       setStates(data);
//     } catch (error) {
//       console.error("Error fetching states:", error);
//     }
//   };

//   const handleStateChange = async (state) => {
//     setSelectedState(state);
//     setSelectedCity("Select City");
//     setCities([]);

//     if (!state) return;

//     try {
//       const response = await fetch(
//         `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
//       );
//       if (!response.ok) throw new Error("Failed to fetch cities");
//       const data = await response.json();
//       setCities(data);
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//     }
//   };

//   const handleCityChange = (city) => {
//     setSelectedCity(city);
//   };

//   return (
//     <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
//       <div className="container p-4 border rounded shadow bg-white">
//         <div className="row justify-content-between text-center">
//           <div className="col-md-4 my-2">
//             <div className="dropdown">
//               <button
//                 className="btn btn-primary dropdown-toggle w-100"
//                 type="button"
//                 data-bs-toggle="dropdown">
//                 {selectedCountry}
//               </button>
//               <ul className="dropdown-menu w-100 custom-scroll">
//                 {countries.map((country) => (
//                   <li key={country}>
//                     <button className="dropdown-item" onClick={() => handleCountryChange(country)}>
//                       {country}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div className="col-md-4 my-2">
//             <div className="dropdown">
//               <button
//                 className="btn btn-secondary dropdown-toggle w-100"
//                 type="button"
//                 data-bs-toggle="dropdown"
//                 disabled={selectedCountry === "Select Country"}>
//                 {selectedState}
//               </button>
//               <ul className="dropdown-menu w-100 custom-scroll">
//                 {states.map((state) => (
//                   <li key={state}>
//                     <button className="dropdown-item" onClick={() => handleStateChange(state)}>
//                       {state}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div className="col-md-4 my-2">
//             <div className="dropdown">
//               <button
//                 className="btn btn-success dropdown-toggle w-100"
//                 type="button"
//                 data-bs-toggle="dropdown"
//                 disabled={selectedState === "Select State"}>
//                 {selectedCity}
//               </button>
//               <ul className="dropdown-menu w-100 custom-scroll">
//                 {cities.map((city) => (
//                   <li key={city}>
//                     <button className="dropdown-item" onClick={() => handleCityChange(city)}>
//                       {city}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {selectedCity !== "Select City" && (
//           <div className="text-center mt-3">
//             <p>
//               <strong>
//                 You selected {selectedCity}, {selectedState}, {selectedCountry}
//               </strong>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LocationSelector;
import React, { useState, useEffect } from "react";

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    // Fetch all countries on mount
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://crio-location-selector.onrender.com/countries");
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);

    if (!country) return;

    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
      if (!response.ok) throw new Error("Failed to fetch states");
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleStateChange = async (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setCities([]);

    if (!state) return;

    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`
      );
      if (!response.ok) throw new Error("Failed to fetch cities");
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div style={styles.container}>
      <h2>Select Location</h2>

      {/* Country Dropdown */}
      <select onChange={handleCountryChange} value={selectedCountry} style={styles.dropdown}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <select
        onChange={handleStateChange}
        value={selectedState}
        style={styles.dropdown}
        disabled={!selectedCountry}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        onChange={handleCityChange}
        value={selectedCity}
        style={styles.dropdown}
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* Display Selected Location */}
      {selectedCity && selectedState && selectedCountry && (
        <p style={styles.result}>
          You selected <strong>{selectedCity}, {selectedState}, {selectedCountry}</strong>
        </p>
      )}
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  dropdown: {
    width: "250px",
    padding: "8px",
    margin: "10px",
    fontSize: "16px",
  },
  result: {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default LocationSelector;
