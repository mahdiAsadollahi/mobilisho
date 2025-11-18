// app/dashboard/orders/components/OrderList.jsx
import OrderCard from "@/app/components/OrderCard/OrderCard";

const OrderList = ({ orders, onOrderSelect, onOrderCancel }) => {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          سفارشی یافت نشد
        </h3>
        <p className="text-gray-500">شما هنوز هیچ سفارشی ثبت نکرده‌اید.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onSelect={onOrderSelect}
          onCancel={onOrderCancel}
        />
      ))}
    </div>
  );
};

export default OrderList;
