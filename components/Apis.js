import Loading from "./Loading";

function Api({ entries, loading }) {
  return (
    <>
      <div className="m-4 grid grid-cols-1 gap-y-0 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
        {!loading && <Loading />}
        {loading &&
          entries.map((entry, i) => (
            <div
              key={i}
              className="card-back m-3 border-gray-300 shadow rounded-md hover:text-white hover:bg-black p-4"
            >
              <a
                className="text-md sm:text-xl md:text-xxl lg:text-3xl font-semibold"
                href={`/${entry.Category}/${entry.API}`}
              >
                {entry.API}
              </a>
              <p>{entry.Description}</p>
            </div>
          ))}
      </div>
    </>
  );
}
export default Api;