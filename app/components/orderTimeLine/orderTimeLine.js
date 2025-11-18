// app/dashboard/orders/components/OrderTimeline.jsx
"use client";

import {
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiHome,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";

const OrderTimeline = ({ status, order }) => {
  const steps = [
    {
      key: "pending",
      label: "در انتظار تایید",
      description: "سفارش ثبت شده و در انتظار تایید",
      icon: FiClock,
      color: "yellow",
    },
    {
      key: "confirmed",
      label: "تایید شده",
      description: "سفارش تایید و در حال آماده‌سازی",
      icon: FiPackage,
      color: "blue",
    },
    {
      key: "shipping",
      label: "در حال ارسال",
      description: "سفارش در راه مقصد شما",
      icon: FiTruck,
      color: "purple",
    },
    {
      key: "delivered",
      label: "تحویل شده",
      description: "سفارش با موفقیت تحویل داده شد",
      icon: FiHome,
      color: "green",
    },
  ];

  const getCurrentStepIndex = () => {
    switch (status) {
      case "pending":
        return 0;
      case "confirmed":
        return 1;
      case "shipping":
        return 2;
      case "delivered":
        return 3;
      case "cancelled":
        return -1;
      default:
        return -1;
    }
  };

  const getStatusColor = (color) => {
    const colors = {
      yellow: {
        bg: "bg-yellow-500",
        text: "text-yellow-600",
        light: "bg-yellow-50",
        border: "border-yellow-200",
      },
      blue: {
        bg: "bg-blue-500",
        text: "text-blue-600",
        light: "bg-blue-50",
        border: "border-blue-200",
      },
      purple: {
        bg: "bg-purple-500",
        text: "text-purple-600",
        light: "bg-purple-50",
        border: "border-purple-200",
      },
      green: {
        bg: "bg-green-500",
        text: "text-green-600",
        light: "bg-green-50",
        border: "border-green-200",
      },
      gray: {
        bg: "bg-gray-400",
        text: "text-gray-500",
        light: "bg-gray-50",
        border: "border-gray-200",
      },
    };
    return colors[color] || colors.gray;
  };

  const currentStepIndex = getCurrentStepIndex();
  const isCancelled = status === "cancelled";

  // تابع برای رندر آیکون مرحله فعلی
  const renderCurrentStepIcon = () => {
    if (currentStepIndex < 0) return null;

    const currentStep = steps[currentStepIndex];
    if (!currentStep?.icon) return null;

    const IconComponent = currentStep.icon;
    return <IconComponent className="text-white text-lg" />;
  };

  if (isCancelled) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h3 className="font-semibold text-black mb-6">روند سفارش</h3>

        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="text-red-500 text-2xl" />
          </div>
          <h4 className="text-lg font-semibold text-red-600 mb-2">
            سفارش لغو شده
          </h4>
          <p className="text-gray-600 text-sm">
            {order?.cancelReason
              ? `دلیل لغو: ${order.cancelReason}`
              : "این سفارش لغو شده است."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <h3 className="font-semibold text-black mb-6">روند سفارش</h3>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">پیشرفت سفارش</span>
          <span className="text-xs font-medium text-gray-700">
            {Math.round(((currentStepIndex + 1) / steps.length) * 100)}% کامل
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{
              width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Breadcrumb Steps */}
      <div className="relative mb-8">
        <div className="flex justify-between relative">
          {/* Connection Line */}
          <div
            className="absolute top-4 left-10 right-10 h-0.5 bg-gray-200 -translate-y-1/2 z-0 transition-all duration-500"
            style={{
              background: `linear-gradient(to left, #10b981 ${
                (currentStepIndex / (steps.length - 1)) * 100
              }%, #e5e7eb 0%)`,
            }}
          ></div>

          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const stepColor = getStatusColor(step.color);
            const StepIcon = step.icon;

            return (
              <div
                key={step.key}
                className="flex flex-col items-center relative z-10 flex-1"
              >
                {/* Step Indicator */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm ${
                      isCompleted
                        ? `${stepColor.bg} border-white text-white shadow-md`
                        : isCurrent
                        ? `bg-white ${stepColor.border} ${stepColor.text} shadow-md`
                        : "bg-white border-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <FiCheckCircle className="text-sm" />
                    ) : (
                      <StepIcon
                        className={`text-sm ${
                          isCurrent ? stepColor.text : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>

                  {/* Step Labels */}
                  <div className="mt-3 text-center">
                    <div
                      className={`text-xs font-medium transition-colors ${
                        isCurrent
                          ? stepColor.text
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.label}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 hidden sm:block leading-tight">
                      {step.description}
                    </div>
                  </div>
                </div>

                {/* Current Step Badge */}
                {isCurrent && (
                  <div
                    className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${stepColor.light} ${stepColor.text} animate-pulse`}
                  >
                    در حال انجام
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Status Card */}
      <div
        className={`p-4 rounded-lg border transition-all duration-300 ${
          currentStepIndex >= 0
            ? getStatusColor(steps[currentStepIndex].color).light
            : "bg-gray-50"
        } ${
          currentStepIndex >= 0
            ? getStatusColor(steps[currentStepIndex].color).border
            : "border-gray-200"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentStepIndex >= 0
                ? getStatusColor(steps[currentStepIndex].color).bg
                : "bg-gray-400"
            }`}
          >
            {renderCurrentStepIcon()}
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-1">
              {currentStepIndex >= 0
                ? steps[currentStepIndex].label
                : "وضعیت نامشخص"}
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              {currentStepIndex >= 0
                ? steps[currentStepIndex].description
                : "اطلاعاتی برای نمایش وجود ندارد"}
            </p>

            {/* Additional Info */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              {order?.trackingCode && currentStepIndex >= 2 && (
                <div className="flex items-center gap-1">
                  <span>کد رهگیری:</span>
                  <span className="font-mono text-gray-700">
                    {order.trackingCode}
                  </span>
                </div>
              )}

              {currentStepIndex === 0 && (
                <div className="flex items-center gap-1">
                  <FiClock className="text-yellow-500" />
                  <span>معمولاً ۱-۲ ساعت کاری</span>
                </div>
              )}

              {currentStepIndex === 1 && (
                <div className="flex items-center gap-1">
                  <FiPackage className="text-blue-500" />
                  <span>آماده‌سازی در انبار</span>
                </div>
              )}

              {currentStepIndex === 2 && (
                <div className="flex items-center gap-1">
                  <FiTruck className="text-purple-500" />
                  <span>تحویل ۲۴-۴۸ ساعته</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          {currentStepIndex === 2 && order?.trackingCode && (
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors shadow-sm whitespace-nowrap">
              پیگیری مرسوله
            </button>
          )}
        </div>
      </div>

      {/* Estimated Time */}
      {currentStepIndex < steps.length - 1 && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-blue-700">
            <FiClock className="text-blue-500" />
            <span>
              تخمین زمان باقی‌مانده: {currentStepIndex === 0 && "۱-۲ ساعت کاری"}
              {currentStepIndex === 1 && "۲۴ ساعت"}
              {currentStepIndex === 2 && "۱-۲ روز کاری"}
            </span>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3 text-xs">
          <button className="text-gray-600 hover:text-gray-800 transition-colors text-right">
            📞 تماس با پشتیبانی
          </button>
          <button className="text-gray-600 hover:text-gray-800 transition-colors text-right">
            ❓ سوالات متداول
          </button>
          <button className="text-gray-600 hover:text-gray-800 transition-colors text-right">
            📋 راهنمای پیگیری سفارش
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;
