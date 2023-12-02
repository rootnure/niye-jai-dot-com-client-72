import { FaLinkedin, FaSquareFacebook, FaYoutube } from "react-icons/fa6";
import Container from "../../../component/Container";
import Logo from "../Logo/Logo";
import footerBg from "./footer.svg";
import footerBgSm from "./footerSM.svg";
import googlePlayBadge from "./google-play-badge.svg";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url(${
          window.screen.width < 1024 ? footerBgSm : footerBg
        })`,
      }}
      className="bg-cover p-12 lg:py-0 text-center lg:text-left">
      <Container>
        <div className="footer lg:p-10 text-white lg:pt-16">
          <aside className="w-full lg:w-auto flex lg:flex-none flex-col items-center text-center">
            <div className="invert saturate-0">
              <Logo />
            </div>
            <p className="leading-6">
              NiyeJai Dot Com
              <br />
              Mobile App Coming Soon...
            </p>
            <img
              src={googlePlayBadge}
              alt="Google Play Badge"
              className="max-h-12"
            />
          </aside>
          <nav className="w-full lg:w-auto flex lg:flex-none flex-col items-center">
            <header className="text-white text-lg font-bold uppercase px-6 border-b mb-2">
              Links
            </header>
            <a className="link link-hover hover:text-gray-700">About Us</a>
            <a className="link link-hover hover:text-gray-700">Enterprize</a>
            <a className="link link-hover hover:text-gray-700">Coverage Area</a>
            <a className="link link-hover hover:text-gray-700">
              Privacy Policy
            </a>
            <a className="link link-hover hover:text-gray-700">FAQs</a>
          </nav>
          <nav className="w-full lg:w-auto flex lg-flex-none flex-col items-center">
            <header className="text-white text-lg font-bold uppercase px-6 border-b mb-2">
              Contacts
            </header>
            <p className="leading-6">
              Shopup, Ground Floor,
              <br />
              CMK Tower, Bijoynagar,
              <br />
              Gulsan, Dhaka-1202
            </p>
            <p className="leading-6">
              Hotline:
              <a
                href="tel:+8801234567890"
                className="link link-hover hover:text-gray-700 ms-1">
                +880 1234-567890
              </a>
            </p>
            <p className="leading-6">
              E-Mail:
              <a
                href="mailto:contact@niyejai.com"
                className="link link-hover hover:text-gray-700 ms-1">
                contact@niyejai.com
              </a>
            </p>
          </nav>
          <nav className="w-full lg:w-auto flex lg-flex-none flex-col items-center">
            <header className="text-white text-lg font-bold uppercase px-6 border-b mb-2">
              Connect With Us
            </header>
            <div className="flex gap-4">
              <a className="link link-hover hover:text-gray-700">
                <FaSquareFacebook className="text-3xl" />
              </a>
              <a className="link link-hover hover:text-gray-700">
                <FaLinkedin className="text-3xl" />
              </a>
              <a className="link link-hover hover:text-gray-700">
                <FaYoutube className="text-3xl" />
              </a>
            </div>
            <p className="mt-1">
              <small>2023 &copy; NiyeJai Dot Com</small>
            </p>
          </nav>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
