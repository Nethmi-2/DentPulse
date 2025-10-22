import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  // Create product
  createProduct: async (newProduct) => {
    if (
      !newProduct.summary ||
      !newProduct.budget ||
      !newProduct.audience ||
      !newProduct.venue ||
      !newProduct.date ||
      !newProduct.time ||
      !newProduct.status
    ) {
      return { success: false, message: "Please fill all the fields." };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Campaign created successfully." };
  },

  // Fetch products
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  // Delete product
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  // Update product status
  // store/product.js (Zustand)
updateProductStatus: async (pid, newStatus) => {
  // PATCH to the correct route
  const res = await fetch(`/api/products/${pid}`, {  // remove /status
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });

  const data = await res.json();
  if (!data.success) return { success: false };

  // Update local state immediately
  set((state) => ({
    products: state.products.map((p) =>
      p._id === pid ? { ...p, status: newStatus } : p
    ),
  }));

  return { success: true };
},

}));
