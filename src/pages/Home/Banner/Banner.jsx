import { FaMagnifyingGlass } from "react-icons/fa6";

const Banner = () => {
  return (
    <section
      className="hero mb-36 relative"
      style={{
        backgroundImage: "url(https://i.ibb.co/wLVTPhj/Delivery5.jpg)",
      }}>
      <div className="hero-overlay bg-my-primary bg-opacity-40"></div>
      <div className="hero-content text-center">
        <div className="max-w-lg py-72">
          <h1 className="mb-5 text-6xl font-bold">
            <br />
            Welcome To
            <br />
            NiyeJai Dot Com
          </h1>
          <p className="my-4 font-medium text-lg">
            Your Trusted Courier Service in the town
          </p>
        </div>
      </div>
      <div className="absolute -bottom-20 bg-white w-1/2 shadow-lg rounded-lg">
        <div className="join w-full bg-my-secondary bg-opacity-20 p-16 ">
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
