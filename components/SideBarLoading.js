function SideBarLoading() {
    return (
      <>
        {Array(20)
          .fill(0)
          .map((item,i) => (
            <div key={i} className="border m-4 border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1  py-1">
                  <div className="h-2 bg-slate-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
}
export default SideBarLoading;