const Banner = () => {
  return (
    <div
      className="hero mt-12"
      style={{
        backgroundImage: "url(https://i.ibb.co/wLVTPhj/Delivery5.jpg)",
      }}>
      <div className="hero-overlay bg-my-primary bg-opacity-40"></div>
      <div className="hero-content text-center">
        <div className="max-w-lg py-40">
          <h1 className="mb-5 text-6xl font-bold leading-[4rem]">
            Welcome To
            <br />
            NiyeJai Dot Com
          </h1>
          <p className="my-4 font-medium text-lg">
            Your Trusted Courier Service in the town
          </p>
          <div className="join">
            <input
              type="text"
              placeholder="Consignment ID"
              className="input input-bordered join-item"
            />
            <button className="btn bg-my-primary bg-opacity-80 hover:bg-my-primary hover:bg-opacity-100 text-white border-0 join-item">
              Track Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
