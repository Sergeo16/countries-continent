import { useState, useEffect } from "react";
import ListCard from "./components/ListCard";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/region/Africa");
        if (!response.ok) throw new Error("Une erreur est survenue lors de la récupération des données.");
        
        const data = await response.json();
        
        const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        
        setCountries(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  //console.log(countries)

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="max-w-7xl mx-auto py-20 px-4">
        <h1 className="text-gray-50 text-4xl mb-4 text-center">Africa Countries Data</h1>
        <p className="text-gray-100 text-xl mb-8 text-center">
          Click on a card to reveal a country's information.
        </p>

        {loading && <p className="text-gray-50">Chargement des données...</p>}
        {error && <p className="text-red-500">Erreur : {error}</p>}

        {!loading && !error && ( 
          <ul className="grid min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 auto-rows-[200px]">
            {countries.map((country, index) => (
              <ListCard key={country.cca3} country={country} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
