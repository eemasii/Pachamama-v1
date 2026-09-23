export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  unit?: string;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category = 
  | 'Todos'
  | 'Frutos secos'
  | 'Semillas y Cereales'
  | 'Harinas y Legumbres'
  | 'Suplementos y Té'
  | 'Orgánicos';
  