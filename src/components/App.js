import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { authApi } from '../utils/authApi';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import MainWithFooter from './MainWithFooter';
import InfoTooltip from './InfoTooltip';
import Loader from './Loader';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards([...cards, ...cardsData]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      authApi
        .validateToken(token)
        .then(({ data }) => {
          if (data) {
            setLoggedIn(true);
            setUserEmail(data.email);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo({ name, about })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setNewAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .addLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards(cards.map((card) => (card._id === newCard._id ? newCard : card)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((cards) => cards._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleRegisterClick = (email, password) => {
    authApi
      .registerUser(email, password)
      .then((res) => {
        navigate('/sign-in', { replace: true });
        setIsRegistrationSuccess(true);
        handleSignup('Вы успешно зарегистрировались!');
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        handleSignup('Что-то пошло не так! Попробуйте еще раз.');
      });
  };

  const handleLoginClick = (email, password) => {
    authApi
      .loginUser(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        handleSignup('Что-то пошло не так! Попробуйте еще раз.');
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  function handleSignout() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
  }

  function handleSignup(message) {
    setIsInfoTooltipMessage(message);
    setIsInfoTooltipOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(name, link) {
    setSelectedCard({
      isOpen: true,
      name,
      link,
    });
  }

  function closePopupsByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({
      ...selectedCard,
      isOpen: false,
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="page">
          <Header userEmail={userEmail} onSignout={handleSignout} />
          <Routes>
            <Route path="/sign-up" element={<Register onSignup={handleRegisterClick} />} />
            <Route path="/sign-in" element={<Login onSignin={handleLoginClick} />} />
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={MainWithFooter}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
          </Routes>
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onOverlay={closePopupsByOverlay}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onOverlay={closePopupsByOverlay}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onOverlay={closePopupsByOverlay}
        />

        <PopupWithForm title="Вы уверены?" name="remove" submitBtnText="Да" onOverlay={closePopupsByOverlay} />

        <InfoTooltip
          name="infoTooltip"
          isOpen={isInfoTooltipOpen}
          message={isInfoTooltipMessage}
          isSuccess={isRegistrationSuccess}
          onClose={closeAllPopups}
          onOverlay={closePopupsByOverlay}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} onOverlay={closePopupsByOverlay} />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
