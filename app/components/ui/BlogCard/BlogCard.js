// components/ui/BlogCard/BlogCard.js
const BlogCard = ({ product }) => (
  <a
    className="w-full mx-auto group transition-all block max-w-[420px]"
    href={product.href}
    aria-label={`مطالعه مقاله: ${product.title}`}
  >
    <div className="flex flex-col h-auto text-foreground box-border bg-content1 outline-none shadow-medium transition-transform-background motion-reduce:transition-none relative overflow-hidden rounded-3xl bg-linear-to-br from-stone-400 to-stone-500 p-0 border-0 group-hover:shadow-lg transition-all duration-300">
      <div className="relative h-96 min-h-96">
        {/* تصویر پس‌زمینه با افکت بلور */}
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover z-0 blur-xs group-hover:blur-md transition-all duration-500"
        />

        {/* محتوای بالای کارت */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
          <div className="text-white text-right">
            <span className="text-xl group-hover:text-gray-100 transition-all duration-300 font-bold block">
              {product.title}
            </span>
            <p className="text-base opacity-90 mt-1">{product.date}</p>
          </div>
        </div>

        {/* محتوای پایین کارت */}
        <div className="absolute bottom-6 left-6 right-6 space-y-3 z-10">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 text-white">
            <p className="text-sm leading-relaxed text-right">
              {product.excerpt}
            </p>
          </div>
        </div>
      </div>
    </div>
  </a>
);

export default BlogCard;
