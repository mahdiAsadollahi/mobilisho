"use client";
import React from "react";

function Navbar() {
  return (
    <nav className="d-flex w-full shadow-xs">
      <section className="d-flex flex-row">
        <h1>موبایلی شو</h1>

        <section className="search-container">
          <input placeholder="دنبال چی هستی ؟..." />
          <button>جستجو</button>
        </section>

        <button>
          <span>ورود به</span>
          <h3>حساب کاربری</h3>
        </button>

        <button>
          <span>مبلغ</span>
          <h3>0 تومان</h3>
        </button>
      </section>

      <section>
        <button>دسته بندی ها</button>

        <ul>
          <li>
            <a href="#">فروشگاه</a>
          </li>
          <li>
            <a href="#">بلاگ</a>
          </li>
          <li>
            <a href="#">موقعیت های شغلی</a>
          </li>
          <li>
            <a href="#">سوالات متداول</a>
          </li>
          <li>
            <a href="#">تماس با ما</a>
          </li>
        </ul>
      </section>
    </nav>
  );
}

export default Navbar;
