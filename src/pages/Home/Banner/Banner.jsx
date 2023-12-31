import { FaMagnifyingGlass } from "react-icons/fa6";

const Banner = () => {
  return (
    <section
      className="hero mb-36 relative"
      style={{
        backgroundImage: "url(https://i.ibb.co/wLVTPhj/Delivery5.jpg)",
      }}>
      <div className="hero-overlay bg-my-primary bg-opacity-50"></div>
      <div className="hero-content text-center">
        <div className="max-w-2xl py-28 lg:py-60">
          <h1 className="mb-5 text-4xl md:text-5xl lg:text-6xl font-extrabold">
            <br />
            Welcome To
            <br />
            NiyeJai Dot Com
          </h1>
          <p className="my-4 font-extrabold text-base md:text-lg lg:text-xl">
            Your Trusted Courier Service in the town
          </p>
        </div>
      </div>
      <div className="absolute -bottom-12 md:-bottom-16 lg:-bottom-20 bg-white w-11/12 md:w-5/6 lg:w-1/2 shadow-lg rounded-lg">
        <div className="join w-full bg-my-secondary bg-opacity-20 p-8 md:py-10 md:px-12 lg:p-16 ">
          <input
            type="text"
            placeholder="Consignment ID"
            className="input join-item w-full"
          />
          <button className="btn bg-my-primary bg-opacity-80 hover:bg-my-primary hover:bg-opacity-100 text-white border-0 join-item">
            <FaMagnifyingGlass /> Track Parcel
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
