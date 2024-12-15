import { useEffect } from "react";

export default function ModalContent({ country, closeModal }) {
  const closeOnEscapeKey = (e) => e.key === "Escape" && closeModal();

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Empêche le défilement de la page lors de l'ouverture du modal
    window.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, []);

  return (
    <div 
      onClick={closeModal}
      className="fixed z-10 top-0 left-0 w-full h-full bg-gray-800/95 flex justify-center items-center"
    >
      <div 
        onClick={e => e.stopPropagation()} 
        className="min-w-[500px] relative rounded p-7 bg-gray-50"
      >
        <button 
          onClick={closeModal}
          className="absolute top-2 right-1 w-8 h-8 flex items-center justify-center text-sm bg-red-600 text-white hover:bg-red-700 rounded"
        >
          X
        </button>

        <h2 className="text-2xl mb-4">Information sur {country.name.common}</h2>

        <p className="text-lg mb-2">
          <span className="font-semibold">Langue(s) :</span> {Object.values(country.languages).join(", ")}
        </p>

        <p className="text-lg mb-2">
          <span className="font-semibold">Capitale :</span> {country.capital?.[0] ?? 'Non disponible'}
        </p>

        <p className="text-lg mb-2">
          <span className="font-semibold">Population :</span> {country.population.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
