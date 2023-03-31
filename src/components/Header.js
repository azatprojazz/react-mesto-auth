import logo from '../images/header-logo.svg';
import Navbar from './Navbar';

function Header({ userEmail, onSignout }) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип Россия" />
      <Navbar userEmail={userEmail} onSignout={onSignout} />
    </header>
  );
}

export default Header;
