// app/blog/preview/[id]/loading.js
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* هدر لودینگ */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse py-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      {/* محتوای لودینگ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          {/* تصویر لودینگ */}
          <div className="h-80 sm:h-96 bg-gray-200 rounded-2xl mb-8"></div>

          {/* محتوای لودینگ */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* وضعیت لودینگ */}
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>

            {/* عنوان لودینگ */}
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>

            {/* خلاصه لودینگ */}
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>

            {/* متادیتا لودینگ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              ))}
            </div>

            {/* محتوای اصلی لودینگ */}
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 bg-gray-200 rounded"
                  style={{ width: `${90 - i * 5}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
