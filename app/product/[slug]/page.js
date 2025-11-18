"use client";

import { useParams } from "next/navigation";
import Breadcrumb from "@/app/components/ui/Breadcrumb/Breadcrumb";
import ProductGallery from "@/app/components/ui/ProductDetail/ProductGallery";
import ProductInfo from "@/app/components/ui/ProductDetail/ProductInfo";
import ProductSpecs from "@/app/components/ui/ProductDetail/ProductSpecs";
import ProductTabs from "@/app/components/ui/ProductDetail/ProductTabs";
import RelatedProducts from "@/app/components/ui/ProductDetail/RelatedProducts";
import ProductComments from "@/app/components/ui/ProductDetail/ProductComments";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug;

  // داده‌های نمونه - در واقعیت از API دریافت می‌شود
  const product = {
    id: 1,
    name: "ایرپاد پرو ۲ اورجینال اپل مدل ۲۰۲۴ رنگ سفید - نات اکتیو",
    englishName: "AirPods Pro 2nd Generation",
    images: [
      "https://tec.shuner.ir/wp-content/uploads/2025/07/1-min-1.webp",
      "https://tec.shuner.ir/wp-content/uploads/2025/07/2-min-1.png",
    ],
    price: 16499000,
    originalPrice: 17500000,
    satisfactionRate: 92,
    reviewCount: 24,
    features: [
      { label: "برند", value: "ایرپاد" },
      { label: "حافظه", value: "۲۵۶ گیگ" },
      { label: "گرافیک", value: "آر تی ایکس" },
      { label: "رم", value: "۲۴ گیگ" },
    ],
    deliveryTime: "۲۴ ساعته",
    hasWarranty: true,
    inStock: true,
    specifications: [
      { name: "حافظه", value: "۲۵۶ گیگ" },
      { name: "گرافیک", value: "آر تی ایکس" },
      { name: "رم", value: "۲۴ گیگ" },
    ],
    description: "توضیحات کامل محصول...",
  };

  const breadcrumbItems = [
    { label: "خانه", href: "/" },
    { label: "هدفون", href: "/product-category/هدفون" },
    { label: product.name, href: "#" },
  ];

  const relatedProducts = [
    {
      id: 1,
      name: "ایرپاد پرو ۲ اورجینال اپل – نات اکتیو",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/1-min-1-300x300.webp",
      price: 16499000,
      originalPrice: 17500000,
      discount: 6,
      rating: 4.5,
      href: "https://tec.shuner.ir/product/airpods-pro-2nd-generation/",
      freeShipping: true,
    },
    {
      id: 2,
      name: "هدست پلی استیشن سونی اسلیم چریکی",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/1-min-300x300.png",
      price: 4750000,
      originalPrice: 4900000,
      discount: 3,
      rating: 4.2,
      href: "https://tec.shuner.ir/product/%d9%87%d8%af%d8%b3%d8%aa-%d9%be%d9%84%db%8c-%d8%a7%d8%b3%d8%aa%db%8c%d8%b4%d9%86-%d8%b3%d9%88%d9%86%db%8c-%d8%a7%d8%b3%d9%84%db%8c%d9%85-%da%86%d8%b1%db%8c%da%a9%db%8c-%d9%85%d8%af%d9%84-pulse-elite-w/",
      freeShipping: false,
    }
  ];

  const handleAddToCart = () => {
    // منطق افزودن به سبد خرید
    console.log("افزودن به سبد خرید");
  };

  const handleAddToWishlist = () => {
    // منطق افزودن به علاقه‌مندی‌ها
    console.log("افزودن به علاقه‌مندی‌ها");
  };

  if (!slug) {
    return (
      <div className="flex justify-center items-center h-64">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <main className="w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="bg-white rounded-xl shadow-sm mt-4 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* گالری محصول */}
            <div className="lg:col-span-5">
              <ProductGallery
                images={product.images}
                productName={product.name}
              />
            </div>

            {/* اطلاعات محصول */}
            <div className="lg:col-span-4">
              <ProductInfo product={product} />
            </div>

            {/* مشخصات و قیمت */}
            <div className="lg:col-span-3">
              <ProductSpecs
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            </div>
          </div>
        </div>

        {/* تب‌های محصول */}
        <ProductTabs product={product} />

        {/* بخش نظرات */}
        <ProductComments productId={product.id} />

        {/* محصولات مرتبط */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </main>
  );
}
