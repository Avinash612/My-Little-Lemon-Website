import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faLocationDot,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Footer.css';
import logoWhiteImage from './assets/logo-white.png';
import pages from '../../utils/pages';

const contacts = [
  { icon: faLocationDot, info: '678 Pisa Ave, Chicago, IL 60611' },
  { icon: faPhone, info: '(312) 593-2744' },
  { icon: faEnvelope, info: 'customer@littlelemon.com' }
];

const socials = [
  { icon: faFacebook, name: 'facebook' },
  { icon: faTwitter, name: 'twitter' },
  { icon: faInstagram, name: 'instagram' },
  { icon: faYoutube, name: 'youtube' }
];

const navLinks = [...pages.values()].filter(page => page.anchorable);

const Footer = () => (
  <footer className="site-footer">
    <div className="container grid">
      <div className="site-footer-brand">
        <img src={logoWhiteImage} alt="Little Lemon" className="site-footer-logo" />
      </div>
      <nav className="site-footer-nav">
        <h4>Sitemap</h4>
        <ul>
          {navLinks.map((navLink, index) => (
            <li key={index}>
              <Link to={navLink.path}>{navLink.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <section className="site-footer-contact">
        <h4>Contact us</h4>
        <address>
          {contacts.map(({ icon, info }, index) => (
            <p key={index}>
              <FontAwesomeIcon icon={icon} /> {info}
            </p>
          ))}
        </address>
      </section>
      <section className="site-footer-social">
        <h4>Connect with us</h4>
        <div className="social-links">
          {socials.map(({ icon, name }, index) => (
            <a key={index} href={`https://www.${name}.com`} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon={icon} size="lg" />
            </a>
          ))}
        </div>
      </section>
    </div>
  </footer>
);

export default Footer;