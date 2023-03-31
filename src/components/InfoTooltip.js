import success from '../images/success.svg';
import unsuccess from '../images/unsuccess.svg';

function InfoTooltip({ name, isOpen, onOverlay, onClose, isSuccess }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlay}>
      <div className="popup__container popup__container-info">
        <button
          className="popup__close-btn opacity-on-hover"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img className="popup__img-success" src={isSuccess ? success : unsuccess} alt="#" />
        <h3 className="popup__title-success">
          {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
