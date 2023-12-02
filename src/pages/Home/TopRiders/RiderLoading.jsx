const RiderLoading = () => {
  return (
    <div className="card border rounded-md lg:rounded-lg">
      <div className="h-32 bg-my-primary rounded-t-md lg:rounded-t-lg p-2 lg:p-6">
        <div className=" text-white flex items-center justify-between">
          <h2 className="skeleton h-8 w-16"></h2>
          <p className="skeleton h-2 w-4 rounded-full"></p>
        </div>
      </div>
      <div className="absolute top-16 left-0 right-0 flex justify-center">
        <figure className="skeleton rounded-full h-32 w-32"></figure>
      </div>
      <div className="card-body pt-20">
        <h2 className="skeleton h-6 w-full"></h2>
        <div className="card-actions">
          <div className="skeleton badge h-2 w-16"></div>
          <div className="skeleton badge h-2 w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default RiderLoading;
