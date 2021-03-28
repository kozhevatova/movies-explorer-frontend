import './InfoPopup.css';

const InfoPopup = ({ closePopup, isOpen, message, onClick }) => {
  return (
    <section className={`popup ${isOpen && 'popup_opened'}`} onClick={onClick}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" onClick={closePopup}></button>
        <p className="popup__message">{message}</p>
      </div>
    </section>
  );
}

export default InfoPopup;