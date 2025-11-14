// app/loading.js
export default function Loading() {
  return (
    <main className="w-full min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="container mx-auto max-w-2xl text-center">
        {/* لوگو یا آیکون لودینگ */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* اسپینر اصلی */}
            <div className="w-24 h-24 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>

            {/* آیکون مرکزی */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">ش</span>
              </div>
            </div>
          </div>
        </div>

        {/* متن لودینگ */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          در حال بارگذاری...
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
          لطفاً چند لحظه صبر کنید
        </p>

        {/* نوار پیشرفت */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-8 max-w-md mx-auto overflow-hidden">
          <div className="bg-primary h-3 rounded-full animate-pulse w-3/4"></div>
        </div>

        {/* نکات متحرک */}
        <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 animate-pulse">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>در حال بارگذاری محتوا</span>
          </div>
          <div
            className="flex items-center justify-center gap-2 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>آماده‌سازی مطالب</span>
          </div>
          <div
            className="flex items-center justify-center gap-2 animate-pulse"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span>تقریبا آماده است</span>
          </div>
        </div>

        {/* انیمیشن اضافی */}
        <div className="mt-12 flex justify-center space-x-2 rtl:space-x-reverse">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </main>
  );
}
