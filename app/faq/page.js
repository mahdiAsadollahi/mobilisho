"use client";

import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

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
      question: "آیا محصولات اورجینال هستند؟",
      answer:
        "بله، تمامی محصولات موجود در فروشگاه اورجینال بوده و همراه با گارانتی معتبر شرکتی یا گارانتی فروشگاه ارائه می‌شوند. در صورت مشاهده هرگونه مغایرت، امکان بازگشت کالا وجود دارد.",
    },
    {
      question: "هزینه و زمان ارسال چقدر است؟",
      answer:
        "ارسال به سراسر کشور انجام می‌شود. سفارش‌های تهران معمولاً طی ۲۴ ساعت و شهرستان‌ها بین ۲ تا ۴ روز کاری به دست شما می‌رسد. هزینه ارسال بر اساس وزن و مقصد در صفحه پرداخت نمایش داده می‌شود و برای سفارش‌های بالای مبلغ مشخص، ارسال رایگان است.",
    },
    {
      question: "امکان پرداخت درب منزل وجود دارد؟",
      answer:
        "بله، برای برخی شهرها و محصولات امکان پرداخت درب منزل (پس از کرایه) فراهم است. کافی است در مرحله نهایی خرید، گزینه پرداخت در محل را انتخاب کنید. در صورت عدم پشتیبانی از این روش، فقط پرداخت آنلاین فعال خواهد بود.",
    },
    {
      question: "گارانتی محصولات چگونه است؟",
      answer:
        "همه محصولات دارای گارانتی هستند. لوازم جانبی اورجینال دارای گارانتی شرکتی و محصولات وارداتی دارای گارانتی فروشگاه هستند. مدت گارانتی روی صفحه هر محصول درج شده است. در صورت بروز مشکل، کافی است با پشتیبانی تماس بگیرید.",
    },
    {
      question: "شرایط بازگشت کالا چیست؟",
      answer:
        "تا ۷ روز پس از دریافت کالا، در صورت سالم بودن بسته‌بندی و استفاده‌نشدن، امکان بازگشت یا تعویض وجود دارد. برای محصولات معیوب، هزینه ارسال برگشت به عهده فروشگاه است. برای انصراف از خرید، هزینه ارسال به عهده مشتری خواهد بود.",
    },
    {
      question: "چطور از اصل بودن محصول مطمئن شوم؟",
      answer:
        "تمامی محصولات دارای هولوگرام، کارت گارانتی و فاکتور رسمی هستند. همچنین می‌توانید کد اصالت محصول را از سایت رسمی برند مربوطه استعلام کنید. در صورت هرگونه ابهام، پشتیبانی آماده راهنمایی شماست.",
    },
    {
      question: "امکان خرید اقساطی وجود دارد؟",
      answer:
        "بله، برای سفارش‌های بالای مبلغ مشخص، امکان پرداخت اقساطی از طریق سرویس‌های اعتباری همکار فراهم است. در مرحله پرداخت، گزینه خرید اقساطی را انتخاب کنید تا شرایط و مدت بازپرداخت نمایش داده شود.",
    },
    {
      question: "سفارش خود را چطور پیگیری کنم؟",
      answer:
        "پس از ثبت سفارش، کد رهگیری از طریق پیامک برای شما ارسال می‌شود. می‌توانید از طریق بخش «پیگیری سفارش» در سایت یا تماس با پشتیبانی، وضعیت سفارش خود را در هر لحظه بررسی کنید.",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container flex flex-col bg-white dark:bg-gray-800 mt-10 rounded-3xl justify-center text-[#1B1F22] dark:text-gray-100 md:max-w-[900px] py-7 mx-auto shadow-sm">
        <div className="flex justify-start items-center mb-10 pr-6 gap-4">
          <div className="flex justify-center items-center w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <FaQuestionCircle className="text-blue-500 text-2xl" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">سوالات متداول</h3>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              شاید جواب سوالت رو اینجا پیدا کردی
            </span>
          </div>
        </div>

        <div className="px-2 w-full">
          {faqItems.map((item, index) => {
            const isOpen = !!openItems[index];

            return (
              <div key={index} className="mb-2">
                <div
                  className={`faqItemCustom transition-all duration-300 ${
                    isOpen
                      ? "bg-[#fafafa] dark:bg-gray-700/40 rounded-t-xl"
                      : "hover:bg-[#fafafa] dark:hover:bg-gray-700/30 rounded-xl"
                  }`}
                >
                  <h2>
                    <button
                      onClick={() => toggleItem(index)}
                      className="flex py-4 w-full h-full gap-3 items-center tap-highlight-transparent outline-none focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 transition-opacity px-4 rounded-t-xl"
                      type="button"
                      aria-expanded={isOpen}
                    >
                      <div className="flex-1 flex flex-col text-start">
                        <span
                          className={`text-foreground text-medium transition-all duration-300 ${
                            isOpen ? "text-blue-600 dark:text-blue-400" : ""
                          }`}
                        >
                          {item.question}
                        </span>
                      </div>
                      <span
                        className={`text-gray-400 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen ? "rotate-0" : "-rotate-90"
                        }`}
                      >
                        <IoIosArrowDown className="text-xl" />
                      </span>
                    </button>
                  </h2>

                  <div
                    className={`grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <section className="bg-white dark:bg-gray-800 rounded-b-xl">
                        <div className="px-4 py-4 text-justify text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.answer}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>

                {index < faqItems.length - 1 && (
                  <hr className="shrink-0 bg-gray-200 dark:bg-gray-700 border-none w-full h-px my-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
