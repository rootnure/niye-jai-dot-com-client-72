import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src="https://i.ibb.co/QmsbwYQ/logo.png"
        alt="Niye Jai Dot Com logo"
        className="h-12"
      />
    </Link>
  );
};

export default Logo;
