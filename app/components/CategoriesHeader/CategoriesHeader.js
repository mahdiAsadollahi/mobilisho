// components/CategoriesSection/CategoriesHeader.js
import { TfiLayoutGrid2Alt } from "react-icons/tfi";

const CategoriesHeader = () => {
  return (
    <div className="pr-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-4 md:gap-4">
          <div className="flex justify-center items-center w-12 h-12 bg-white border border-gray-200 rounded-xl hover:bg-white text-primary">
            <TfiLayoutGrid2Alt className="text-[22px] leading-none" />
          </div>
          <div className="flex flex-col items-start justify-center gap-1">
            <h3 className="text-lg md:text-3xl ml-8 tracking-[-0.065em]">
              دسته ها
            </h3>
            <span className="tracking-[-0.065em] text-xs text-gray-400 cursor-pointer">
              نمایش همه
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesHeader;
