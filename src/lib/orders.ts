let orders = [
  {
    id: 1,
    customer: "Ahmed Khan",
    email: "ahmed@example.com",
    items: [
      { name: "Classic Navy Fit Shirt", qty: 2, price: 2499 },
    ],
    total: 4998,
    status: "Delivered",
    date: "2026-06-20",
  },
  {
    id: 2,
    customer: "Sara Ali",
    email: "sara@example.com",
    items: [
      { name: "Black Formal Trousers", qty: 1, price: 3299 },
    ],
    total: 3299,
    status: "Processing",
    date: "2026-06-24",
  },
  {
    id: 3,
    customer: "Usman Raza",
    email: "usman@example.com",
    items: [
      { name: "White Formal Shirt", qty: 1, price: 2199 },
      { name: "Navy Chino Trousers", qty: 1, price: 2999 },
    ],
    total: 5198,
    status: "Shipped",
    date: "2026-06-23",
  },
  {
    id: 4,
    customer: "Hamza Ali",
    email: "hamza@example.com",
    items: [
      { name: "Blue Checked Casual Shirt", qty: 1, price: 1999 },
    ],
    total: 1999,
    status: "Cancelled",
    date: "2026-06-22",
  },
];

export interface Order {
  id: number;
  customer: string;
  email: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: string;
  date: string;
}

export function getOrders(): Order[] {
  return orders;
}

export function updateOrderStatus(id: number, status: string): Order | null {
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  orders[idx] = { ...orders[idx], status };
  return orders[idx];
}

let nextId = 5;

export function addOrder(order: Omit<Order, "id" | "date">): Order {
  const newOrder: Order = {
    ...order,
    id: nextId++,
    date: new Date().toISOString().split("T")[0],
  };
  orders.unshift(newOrder);
  return newOrder;
}

export function getOrderStats() {
  return {
    total: orders.length,
    processing: orders.filter((o) => o.status === "Processing").length,
    shipped: orders.filter((o) => o.status === "Shipped").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
    revenue: orders
      .filter((o) => o.status === "Delivered")
      .reduce((sum, o) => sum + o.total, 0),
  };
}
