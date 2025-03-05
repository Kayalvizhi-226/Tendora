import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders", {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}` },
        });
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? <p>No orders found.</p> : (
        orders.map((order) => (
          <div key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p>Total: ${order.totalPrice}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderPage;
