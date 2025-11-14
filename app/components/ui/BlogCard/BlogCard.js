// components/ui/BlogCard/BlogCard.js
const BlogCard = ({ product }) => (
  <a
    className="w-full mx-auto group transition-all block"
    href={product.href}
    aria-label={`مطالعه مقاله: ${product.title}`}
  >
    <div className="flex flex-col h-auto text-foreground box-border bg-content1 outline-none shadow-medium transition-transform-background motion-reduce:transition-none relative overflow-hidden rounded-3xl bg-linear-to-br from-stone-400 to-stone-500 p-0 border-0 group-hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
      <div className="relative h-80 sm:h-96 min-h-80 sm:min-h-96">
        {/* تصویر پس‌زمینه با افکت بلور */}
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover z-0 blur-sm group-hover:blur-md transition-all duration-500"
        />

        {/* گرادیانت overlay برای خوانایی بهتر متن */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent z-1"></div>

        {/* محتوای بالای کارت */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-start z-10">
          <div className="text-white text-right w-full">
            <span className="text-lg sm:text-xl group-hover:text-gray-100 transition-all duration-300 font-bold block leading-tight">
              {product.title}
            </span>
            <p className="text-sm sm:text-base opacity-90 mt-2">
              {product.date}
            </p>
          </div>
        </div>

        {/* محتوای پایین کارت */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 space-y-3 z-10">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-3 sm:p-4 text-white">
            <p className="text-xs sm:text-sm leading-relaxed text-right line-clamp-3">
              {product.excerpt}
            </p>
          </div>
        </div>
      </div>
    </div>
  </a>
);

export default BlogCard;
