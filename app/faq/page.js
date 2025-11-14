"use client";

import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { BsSuitHeart } from "react-icons/bs";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqItems = [
    {
      question: "ریل تایم یا SPA قالب بوم یعنی چی؟",
      answer:
        "پاسخ مربوط به سوال اول در اینجا نمایش داده می‌شود. این بخش می‌تواند اطلاعات کامل‌تری درباره سوال ارائه دهد.",
    },
    {
      question: "قالب بوم چند تا استایل داره ؟",
      answer:
        "پاسخ مربوط به سوال دوم در اینجا نمایش داده می‌شود. می‌توانید جزئیات بیشتری در این قسمت قرار دهید.",
    },
    {
      question: "پشتیبانی قالب بود چطوری است ؟",
      answer:
        "پاسخ مربوط به سوال سوم در اینجا نمایش داده می‌شود. اطلاعات پشتیبانی و راه‌های ارتباطی در این بخش آورده می‌شود.",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-gray-50 py-8">
      <div className="container flex flex-col bg-white mt-10 rounded-3xl justify-center text-[#1B1F22] md:max-w-[900px] py-7 mx-auto">
        {/* Header Section */}
        <div className="flex justify-start items-center mb-10 pr-6 gap-4">
          <FaQuestionCircle className="text-gray-600 text-4xl" />
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">سوالات متداول</h3>
            <span className="text-gray-600 text-sm">
              شاید جواب سوالت رو اینجا پیدا کردی
            </span>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="px-2 w-full">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-2">
              <div
                className={`faqItemCustom transition-all duration-300 ${
                  openItems[index]
                    ? "bg-[#fafafa] rounded-t-xl"
                    : "hover:bg-[#fafafa]"
                }`}
              >
                <h2>
                  <button
                    onClick={() => toggleItem(index)}
                    className="flex py-4 w-full h-full gap-3 items-center tap-highlight-transparent outline-none focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 transition-opacity px-4 rounded-t-xl"
                    type="button"
                  >
                    <div className="flex-1 flex flex-col text-start">
                      <span
                        className={`text-foreground text-medium transition-all ${
                          openItems[index] ? "text-blue-600" : ""
                        }`}
                      >
                        {item.question}
                      </span>
                    </div>
                    <span
                      className={`text-gray-400 transition-transform duration-300 ${
                        openItems[index] ? "rotate-0" : "-rotate-90"
                      }`}
                    >
                      <IoIosArrowDown className="text-xl" />
                    </span>
                  </button>
                </h2>

                {openItems[index] && (
                  <section className="bg-white rounded-b-xl">
                    <div className="px-4 py-4 text-justify text-gray-700 leading-relaxed">
                      {item.answer}
                    </div>
                  </section>
                )}
              </div>

              {/* Separator */}
              {index < faqItems.length - 1 && (
                <hr className="shrink-0 bg-gray-200 border-none w-full h-px my-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
