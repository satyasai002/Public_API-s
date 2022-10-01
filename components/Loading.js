function Loading(){
    return (
      <>
        {Array(20)
          .fill(0)
          .map((item,i) => (
            <div key={i}  className="border m-4 border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-300 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
}
export default Loading;