import "./Footer.css";
import github from "../../assets/github-icon.svg";
import linkedin from "../../assets/linkedin-icon.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__copyright">
        © 2024 Supersite, Powered by News API
      </div>
      <div className="footer__links-container">
        <Link to="/" className="footer__link footer__link__home">
          <p className="footer__home">Home</p>
        </Link>
        <a
          href="https://tripleten.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link footer__link__tripleten"
        >
          TripleTen
        </a>
        <a
          href="https://github.com/JAC874"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link footer__link__github"
        >
          <img
            src={github}
            alt="GitHub Profile Icon"
            className="footer__icon"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/jordoncunningham/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link footer__link__linkedin"
        >
          <img
            src={linkedin}
            alt="LinkedIn Profile Icon"
            className="footer__icon"
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
