import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onOverlay }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlay={onOverlay}
    >
      <input
        className="popup__input popup__input_content_name"
        value={name || ''}
        onChange={handleChangeName}
        type="text"
        id="user-name"
        name="name"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        required="required"
        placeholder="Введите имя"
      />
      <span className="popup__error" id="user-name-error"></span>
      <input
        className="popup__input popup__input_content_job"
        value={description || ''}
        onChange={handleChangeDescription}
        type="text"
        id="about"
        name="about"
        minLength="2"
        maxLength="200"
        autoComplete="off"
        required="required"
        placeholder="Род деятельности"
      />
      <span className="popup__error" id="about-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
