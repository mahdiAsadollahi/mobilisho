// app/blog/[slug]/loading.js
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="animate-pulse">
        <div className="h-[500px] bg-gray-200 rounded-2xl mb-8"></div>
        <div className="max-w-276 mx-auto -mt-32">
          <div className="bg-white p-5 sm:p-10 rounded-2xl">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
