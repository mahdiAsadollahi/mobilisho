"use client";

import {
  FaPhone,
  FaInstagram,
  FaPaperPlane,
  FaYoutube,
  FaShieldAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-3 pt-4 lg:px-9 border-t-2 bg-black text-white max-md:hidden -mt-14">
      {/* بخش تماس */}
      <div className="w-full flex md:flex-row-reverse flex-col items-start md:items-center justify-between gap-4 rounded-3xl bg-[#1c252c] mt-6 py-6 px-6 border-gray-500 max-w-[1100px] mx-auto">
        <div className="flex gap-8 items-center">
          <span className="boxer-tells flex gap-2 items-center">
            <span className="one-number text-white translate-y-0.5">
              09305617368
            </span>
            <div className="h-5 w-px border-l"></div>
            <span className="text-number text-lg">
              <FaPhone className="-translate-y-px pr-1 text-xl" />
            </span>
          </span>
        </div>
        <span className="support text-[#f7f8fa] text-lg translate-y-0.5">
          ما از ساعت <span className="text-white!">10</span> تا{" "}
          <span className="text-white!">22</span> پاسخگوی شما هستیم.
        </span>
      </div>

      {/* محتوای اصلی فوتر */}
      <div className="grid gap-10 gap-y-20 row-gap-6 mb-8 grid-cols-2 lg:grid-cols-3 py-14 max-w-[1100px] mx-auto">
        {/* لوگو و اطلاعات تماس */}
        <div className="">
          <a className="inline-flex items-center" href="/">
            <img
              loading="lazy"
              src="/img/logo.png"
              alt="لوگو فروشگاه"
              className="w-full h-[37px]! object-contain bg-white rounded-lg"
            />
          </a>
          <div className="mt-6 lg:max-w-xl">
            <p className="text-[15px] max-w-[70%] text-[#f7f8fa] leading-7">
              بیرجند - میدان آزادی - دور میدان
            </p>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div className="flex gap-2 mt-6 bg-[#1c252c] p-3 rounded-xl w-fit">
            <SocialIcon
              href="https://www.instagram.com/"
              icon={<FaInstagram />}
            />
            <SocialIcon
              href="https://www.instagram.com/"
              icon={<FaPaperPlane />}
            />
            <SocialIcon
              href="https://www.instagram.com/"
              icon={<FaYoutube />}
            />
          </div>
        </div>

        {/* لینک‌های دسترسی سریع و محبوب‌ها */}
        <div className="flex gap-20">
          <FooterLinks
            title="دسترسی سریع"
            links={[
              { href: "https://tec.shuner.ir/", text: "پنل کاربری" },
              { href: "https://tec.shuner.ir/", text: "کاربری" },
              { href: "#", text: "پنل کاربری" },
              { href: "#", text: "کاربری" },
            ]}
          />
          <FooterLinks
            title="محبوب ها"
            links={[
              { href: "https://tec.shuner.ir/", text: "لپ تاپ اپل" },
              { href: "https://tec.shuner.ir/", text: "موبایل اپل" },
              { href: "#", text: "لپ تاپ اپل" },
              { href: "#", text: "موبایل اپل" },
            ]}
          />
        </div>

        {/* نمادهای اعتماد */}
        <div>
          <div className="flex gap-3 justify-center items-center flex-wrap">
            <TrustSymbol
              src="https://tec.shuner.ir/wp-content/uploads/2025/10/elogo-1.png"
              href="#"
            />
          </div>
        </div>
      </div>

      {/* بخش کپی رایت */}
      <div className="flex flex-col-reverse justify-between pt-6 pb-10 border-t border-gray-500 border-dashed items-center lg:flex-row max-sm:flex max-lg:items-center max-lg:justify-center max-w-[1100px] mx-auto">
        <p className="text-xs flex items-end">
          © {new Date().getFullYear()} - تمامی حقوق محفوظ
        </p>
        <div className="flex justify-start items-start gap-4">
          <FaShieldAlt className="pt-0.5 opacity-80 text-xl" />
          <div className="flex flex-col-reverse items-start justify-center gap-1">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/mahdiAsadollahi/"
              className="text-xs font-bold transition-colors duration-300 hover:text-deep-purple-accent-400 flex flex-row-reverse items-center gap-2 justify-center"
            >
              Mahdi Asadollahi
            </a>
            <p className="text-xs text-[#f7f8fa]"> توسعه داده شده با ❤️</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// کامپوننت برای آیکون‌های شبکه‌های اجتماعی
const SocialIcon = ({ href, icon }) => {
  return (
    <div className="rounded-lg w-6 h-6 flex items-center justify-center cursor-pointer text-white transition-all transform hover:translate-y-[-5px]">
      <a href={href} target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
    </div>
  );
};

// کامپوننت برای لینک‌های فوتر
const FooterLinks = ({ title, links }) => {
  return (
    <div className="gap-2 text-sm">
      <p className="text-base font-bold tracking-wide text-white">{title}</p>
      <div className="flex flex-col mt-7 text-[#f7f8fa] gap-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="hover:text-white transform hover:translate-x-[-9px] transition-all"
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
};

// کامپوننت برای نمادهای اعتماد
const TrustSymbol = ({ src, href }) => {
  return (
    <div className="flex-col relative text-foreground box-border outline-none transition-transform-background motion-reduce:transition-none flex items-center w-24 h-22 overflow-hidden  border border-gray-700 justify-center bg-black shadow-none pt-0 rounded-[20px]">
      <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto wrap-break-words text-left subpixel-antialiased overflow-hidden">
        <div>
          <a href={href} target="_blank" rel="noopener noreferrer">
            <img src={src} alt="نماد اعتماد" className="w-full h-auto" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
