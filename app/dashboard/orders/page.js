// app/dashboard/orders/page.js
"use client";
import { useState } from "react";
import OrderList from "@/app/components/OrderList/OrderList";
import OrderDetails from "@/app/components/orderDetails/orderDetails";
import CancelOrderModal from "@/app/components/CancelOrderModal/CancelOrderModal";

// داده‌های نمونه
const sampleOrders = [
  {
    id: "ORD-001",
    date: "1402/10/15",
    status: "pending",
    total: 12500000,
    itemsCount: 2,
    items: [
      {
        id: 1,
        name: "گوشی سامسونگ A52",
        price: 8000000,
        quantity: 1,
        image: "/img/products/phone1.jpg",
      },
      {
        id: 2,
        name: "قاب محافظ",
        price: 450000,
        quantity: 1,
        image: "/img/products/case1.jpg",
      },
    ],
    address: {
      fullName: "علی محمدی",
      phone: "09123456789",
      province: "تهران",
      city: "تهران",
      address: "خیابان ولیعصر، پلاک ۱۲۳",
      postalCode: "1234567890",
    },
    trackingCode: null,
  },
  {
    id: "ORD-002",
    date: "1402/10/18",
    status: "confirmed",
    total: 18500000,
    itemsCount: 1,
    items: [
      {
        id: 3,
        name: "گوشی آیفون 13",
        price: 18500000,
        quantity: 1,
        image: "/img/products/iphone13.jpg",
      },
    ],
    address: {
      fullName: "علی محمدی",
      phone: "09123456789",
      province: "تهران",
      city: "تهران",
      address: "خیابان ولیعصر، پلاک ۱۲۳",
      postalCode: "1234567890",
    },
    trackingCode: null,
  },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(sampleOrders);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

  const handleOrderSelect = (order) => {
    console.log("Order selected:", order);
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
  };

  const handleCancelOrder = (order) => {
    console.log("Cancel order:", order);
    setOrderToCancel(order);
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = (reason) => {
    console.log("Confirm cancel:", reason);
    // آپدیت وضعیت سفارش
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderToCancel.id
          ? { ...order, status: "cancelled", cancelReason: reason }
          : order
      )
    );

    setCancelModalOpen(false);
    setOrderToCancel(null);
    setSelectedOrder(null);
  };

  // اگر سفارشی انتخاب شده، جزئیات را نمایش بده
  if (selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        onBack={handleBackToList}
        onCancel={handleCancelOrder}
      />
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-black">سفارشات من</h1>
      </div>

      <OrderList
        orders={orders}
        onOrderSelect={handleOrderSelect}
        onOrderCancel={handleCancelOrder}
      />

      {/* مودال لغو سفارش - اینجا فراخوانی شده */}
      <CancelOrderModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
        order={orderToCancel}
      />
    </div>
  );
}
