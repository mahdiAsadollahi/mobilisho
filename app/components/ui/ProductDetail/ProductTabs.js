// components/ui/ProductDetail/ProductTabs.js
"use client";

import { useState } from "react";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("specifications");

  const tabs = [
    { id: "description", label: "توضیحات" },
    { id: "specifications", label: "مشخصات فنی" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "specifications":
        return (
          <div className="space-y-4">
            {product.specifications.map((spec, index) => (
              <div key={index} className="flex border-b border-gray-100 py-3">
                <div className="w-1/3 text-gray-600 font-medium">
                  {spec.name}
                </div>
                <div className="w-2/3 text-gray-900">{spec.value}</div>
              </div>
            ))}
          </div>
        );

      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm mt-6 p-6">
      {/* تب‌ها */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`pb-4 px-1 font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* محتوای تب‌ها */}
      <div className="min-h-[200px]">{renderTabContent()}</div>
    </div>
  );
};

export default ProductTabs;
