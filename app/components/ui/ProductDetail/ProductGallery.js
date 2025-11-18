// components/ui/ProductDetail/ProductGallery.js
"use client";

import { useState } from "react";

const ProductGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* تصویر اصلی */}
      <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
        <img
          src={selectedImage}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* تصاویر کوچک */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === image
                ? "border-blue-500"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`${productName} - تصویر ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
