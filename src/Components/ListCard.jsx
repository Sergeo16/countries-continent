import { useState, memo } from "react";
import { createPortal } from "react-dom";
import ModalContent from "./ModalContent";

const ListCard = memo(({ country }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(prev => !prev);

  console.log(`Rendered : ${country.name}`);

  return (
    <>
      <li
        onClick={toggleModal}
        className="relative cursor-pointer rounded transition-transform duration-300 hover:-translate-y-1 will-change-transform"
      >
        <h2 className="absolute left-0 top-0 p-2 bg-gray-50 drop-shadow-[2px_2px_1px_rgba(0,0,0,0.5)] text-xl rounded">
          {country.name.common}
        </h2>
        <img
          className="w-full h-full object-cover rounded"
          src={country.flags.svg}
          alt={`Drapeau de ${country.name.common}`}
        />
      </li>

      {showModal &&
        createPortal(
          <ModalContent country={country} closeModal={toggleModal} />,
          document.body
        )}
    </>
  );
});

export default ListCard;
