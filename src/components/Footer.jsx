import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-4">
      <p>
        Designed by{" "}
        <a
          href="https://venkatasai24.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-500"
        >
          Venkata Sai
        </a>
      </p>
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="https://github.com/venkatasai24"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <FontAwesomeIcon
            icon={faGithub}
            size="2x"
            className="text-white group-hover:text-black transition-colors duration-300"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/venkata-sai-vedurupaka"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            size="2x"
            className="text-white group-hover:text-blue-700 transition-colors duration-300"
          />
        </a>
        <a
          href="https://www.instagram.com/venkatasai__24"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            size="2x"
            className="text-white group-hover:text-pink-500 transition-colors duration-300"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
