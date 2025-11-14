"use client";

import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// رفع مشکل آیکون marker در leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function ContactPage() {
  // مختصات دفتر (تهران، پاسداران)
  const position = [35.7654, 51.474];

  return (
    <main className="w-full min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-20">
        {/* Contact Section */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl lg:rounded-3xl px-4 sm:px-5 pb-4 sm:pb-5 shadow-sm">
          {/* Header */}
          <div className="px-4 sm:px-6 py-8 sm:py-12 mx-auto">
            <div className="text-center sm:text-right">
              <p className="font-medium text-primary text-sm sm:text-base">
                پشتیبانی
              </p>
              <h1 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white">
                تماس با ما
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto sm:mx-0">
                تیم دوستانه ما همیشه آماده برای تماس شما است.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-12 mt-8 sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
              {/* Phone */}
              <div className="text-center sm:text-right p-4 sm:p-0">
                <span className="inline-block p-3 text-primary rounded-full bg-[#f7f8fa] dark:bg-gray-800">
                  <FaPhone className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <h2 className="mt-4 text-base sm:text-lg font-medium text-gray-800 dark:text-white">
                  تلفن
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  شنبه تا پنجشنبه از 10 صبح تا 22 بعداز ظهر
                </p>
                <a
                  href="tel:0912345678"
                  className="mt-2 text-primary block text-sm sm:text-base"
                >
                  0912345678
                </a>
              </div>

              {/* Email */}
              <div className="text-center sm:text-right p-4 sm:p-0">
                <span className="inline-block p-3 text-primary rounded-full bg-[#f7f8fa] dark:bg-gray-800">
                  <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <h2 className="mt-4 text-base sm:text-lg font-medium text-gray-800 dark:text-white">
                  ایمیل
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  تیم ما همیشه آماده برای کمک است
                </p>
                <p className="mt-2 text-primary text-sm sm:text-base">
                  info@shuner.ir
                </p>
              </div>

              {/* Address */}
              <div className="text-center sm:text-right p-4 sm:p-0">
                <span className="inline-block p-3 text-primary rounded-full bg-[#f7f8fa] dark:bg-gray-800">
                  <FaMapMarkerAlt className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <h2 className="mt-4 text-base sm:text-lg font-medium text-gray-800 dark:text-white">
                  دفتر
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  از حضور شما خوشحال میشیم
                </p>
                <p className="mt-2 text-primary text-xs sm:text-sm leading-relaxed">
                  تهران، خیابان پاسداران، کوچه ۲، برج میلاد
                </p>
              </div>
            </div>
          </div>

          {/* Map Section با react-leaflet */}
          <div className="mt-6 sm:mt-8 lg:mt-10 px-2 sm:px-4 lg:px-6">
            <div
              className="rounded-xl lg:rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
              style={{ height: "300px", minHeight: "300px" }}
            >
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    <div className="text-center text-xs sm:text-sm">
                      <strong>شونر</strong>
                      <br />
                      تهران، خیابان پاسداران، کوچه ۲، برج میلاد
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
