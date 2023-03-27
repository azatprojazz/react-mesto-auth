import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onOverlay }) {
  // Подписка на контекст
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value /* Значение инпута, полученное с помощью рефа */,
    });
    avatarRef.current.value = '';
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlay={onOverlay}
    >
      <input
        className="popup__input"
        ref={avatarRef}
        type="url"
        id="avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      />
      <span className="popup__error" id="avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
