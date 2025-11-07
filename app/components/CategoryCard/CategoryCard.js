// components/CategoriesSection/CategoryCard.js
import Link from "next/link";
import Image from "next/image";

const CategoryCard = ({ category }) => {
  return (
    <Link href={category.href} className="cursor-pointer">
      <div className="flex flex-col border border-gray-200 gap-3 md:gap-4 items-center justify-center w-[120px] h-[116px] md:w-[146px] md:h-[146px] bg-white rounded-[20px] transition-all hover:border-gray-300 overflow-visible">
        <Image
          width={80}
          height={80}
          loading="lazy"
          className="md:w-20 md:h-20 w-[60px] h-[60px] object-contain rounded"
          src={category.image}
          alt={category.name}
        />
        <div>
          <h4 className="text-sm text-center">{category.name}</h4>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
