// components/Footer.js

import { Container } from "react-bootstrap";
import styles from "./Footer.module.css"; // Importing the module.css file

const Footer = () => {
  return (
    <footer className={`footer text-center ${styles.footer}`}>
      <Container>
        <p className="mb-0">
          © {new Date().getFullYear()} Who is that voice? All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
