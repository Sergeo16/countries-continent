import { useEffect } from 'react';

export default function ModalContent({ country, closeModal }) {

  // 1️⃣ Ajout d'un écouteur de la touche Échappe (Escape)
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEsc);
    
    // Nettoyage de l'écouteur à la fermeture du modal
    return () => document.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  return (
    <div 
      onClick={closeModal}
      className="fixed z-10 top-0 left-0 w-full h-full bg-gray-800/95 flex justify-center items-center"
    >
      <div 
        onClick={e => e.stopPropagation()}
        className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 max-w-md relative rounded-lg p-7 bg-gray-50 shadow-lg"
      >
        {/* 2️⃣ Bouton de fermeture */}
        <button 
          onClick={closeModal}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-sm bg-red-600 text-white hover:bg-red-700 rounded-full"
        >
          ✕
        </button>

        {/* 3️⃣ Contenu du Modal */}
        <h2 className="text-2xl font-bold mb-4 text-center">Informations sur {country.name.common}</h2>

        <p className="text-lg mb-2">
          <span className="font-semibold">Langue(s)</span>: 
          {Object.entries(country.languages).map(([key, value]) => value).join(', ')}
        </p>

        <p className="text-lg mb-2">
          <span className="font-semibold">Capitale</span>: 
          {country.capital?.[0] ?? 'Non disponible'}
        </p>

        <p className="text-lg mb-2">
          <span className="font-semibold">Population</span>: 
          {country.population}
        </p>
      </div>
    </div>
  )
}
