import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  id: string;
  date: string;
  items: any[];
  totalAmount: number;
}

const initialState: { history: Order[] } = { history: [] };

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.history.unshift(action.payload); // Додаємо нове замовлення на початок списку
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;