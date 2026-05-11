import { createSlice } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
  items: [
    { 
      id: '1', 
      name: 'iPhone 15 Pro', 
      description: 'Титановий корпус, чип A17 Pro, найкраща камера.', 
      price: 45000, 
      image: 'https://picsum.photos/id/160/400/400' 
    },
    { 
      id: '2', 
      name: 'MacBook Air M3', 
      description: 'Надтонкий ноутбук для роботи та творчості.', 
      price: 55000, 
      image: 'https://picsum.photos/id/0/400/400' 
    },
    { 
      id: '3', 
      name: 'Sony WH-1000XM5', 
      description: 'Найкраще шумопоглинання на ринку.', 
      price: 12000, 
      image: 'https://picsum.photos/id/3/400/400' 
    },
    { 
      id: '4', 
      name: 'iPad Pro M2', 
      description: 'Потужність комп’ютера у форматі планшета.', 
      price: 38000, 
      image: 'https://picsum.photos/id/20/400/400' 
    },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}, 
});

export default productsSlice.reducer;