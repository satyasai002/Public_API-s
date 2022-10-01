import Loading from "./Loading";
function Api({data,loading}) {
    return (
      <div>
        {loading && (
          <div className="h-screen text-center sm:text-3xl">
            <div className="w-full">
              <h1 className="text-3xl sm:text-6xl font-mono p-3">{data.API}</h1>
              <h1 className=" p-3">
                <b>Description:</b>
                <a className="text-[#080] px-2">{`"${data.Description}"`}</a>
              </h1>
              <p className=" p-3">
                <b>Link:</b>
                <a className="text-[#08c] px-2" href={data.Link}>
                  {data.Link}
                </a>
              </p>
              <h1 className=" p-3">
                <b>Category:</b>
                <a className="text-[#080] px-2">{`"${data.Category}"`}</a>
              </h1>
              <h1 className=" p-3">
                <b>Auth:</b> {data.Auth !== "" ? data.Auth : "None"}
              </h1>
              <h1 className=" p-3">
                <b>HTTPS:</b> {data.HTTPS !== null ? "True" : "false"}
              </h1>
              <h1 className=" p-3">
                <b>Cors:</b> {data.Cors}
              </h1>
            </div>
          </div>
        )}
      </div>
    );
}
export default Api;