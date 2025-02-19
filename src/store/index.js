import { create } from 'zustand';

const useStore = create((set) => ({
  customer: null,
  setCustomer: (customer) => set({ customer }),

  seller: null,
  setSeller: (seller) => set({ seller })
}));

export default useStore;
