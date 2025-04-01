import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoImage from './assets/logo.png';
import './Header.css';
import pages from '../../utils/pages';

const navLinks = Array.from(pages.values()).filter(page => page.anchorable);

const Header = () => {
  const { pathname } = useLocation();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const toggleNav = () => setIsNavExpanded(!isNavExpanded);
  const closeNav = () => setIsNavExpanded(false);

  return (
    <header>
      <nav className="container grid nav-bar">
        <div className="nav-bar-logo">
          <Link to={pages.get('home').path}>
            <img src={logoImage} alt="Little Lemon logo" />
          </Link>
        </div>
        <button className="nav-bar-hamburger" type="button" onClick={toggleNav}>
          <FontAwesomeIcon icon={isNavExpanded ? faXmark : faBars} size="2x" />
        </button>
        <ul className={`nav-bar-links ${isNavExpanded ? 'expanded' : ''}`} onClick={closeNav}>
          {navLinks.map(({ path, name }, index) => (
            <li key={index}>
              <Link className={pathname === path ? 'current-location' : ''} to={path}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
