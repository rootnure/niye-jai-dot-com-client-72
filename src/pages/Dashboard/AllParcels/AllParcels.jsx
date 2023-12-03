import SectionTitle from "../../../component/SectionTitle";

const AllParcels = () => {
  return (
    <section className="-mt-12 mb-12">
      <SectionTitle subHeading="All Bookings" heading="Parcels" />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="bg-my-primary text-white">
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllParcels;
