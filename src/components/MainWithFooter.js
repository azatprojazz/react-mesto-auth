import Main from './Main';
import Footer from './Footer';

function MainWithFooter({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
  return (
    <>
      <Main
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}
        onEditAvatar={onEditAvatar}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        cards={cards}
      />
      <Footer />
    </>
  );
}

export default MainWithFooter;
