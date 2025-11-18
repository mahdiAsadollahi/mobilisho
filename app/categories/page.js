// pages/categories.js
import Head from "next/head";
import CategoryCard from "@/app/components/CategoryCard/CategoryCard";

const CategoriesPage = () => {
  const categories = [
    {
      id: 1,
      name: "آیفون",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/swappie-iphone-13-pro-sierra-blue-back.png",
      href: "/categories/iphone",
    },
    {
      id: 2,
      name: "اپل واچ",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/07/61Z8y0y2b0L-removebg-preview.png",
      href: "/categories/apple-watch",
    },
    {
      id: 3,
      name: "بک کاور",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/10/MGFL4-Photoroom.webp",
      href: "/categories/back-cover",
    },
    {
      id: 4,
      name: "کابل شارژ",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/10/61AGlGYVAUL-Photoroom.webp",
      href: "/categories/charging-cable",
    },
    {
      id: 5,
      name: "لپ تاپ",
      image:
        "https://tec.shuner.ir/wp-content/uploads/2025/10/305382_uvrdrb.webp",
      href: "/categories/laptop",
    },
    {
      id: 6,
      name: "هدفون",
      image: "https://tec.shuner.ir/wp-content/uploads/2025/07/4-8.jpg",
      href: "/categories/headphone",
    },
  ];

  return (
    <>
      <Head>
        <title>دسته‌بندی‌ها</title>
        <meta name="description" content="دسته‌بندی محصولات فروشگاه" />
      </Head>

      <main className="w-full min-h-screen">
        <div className="container flex flex-col justify-center text-[#1B1F22] md:max-w-[1200px] py-7 mx-auto">
          <div className="p-4">
            <div>
              <h2 className="md:text-2xl text-xl font-bold mb-8">
                دسته‌بندی‌ها
              </h2>
              <div className="flex flex-wrap gap-4 justify-center">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CategoriesPage;
