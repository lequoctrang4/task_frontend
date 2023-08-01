export interface ProductType {
  code: string;
  name: string;
  style: string;
  pattern: string;
  material: string;
  climate: string;
  publish_date: string;
  quantity: number;
  category_id: number;
  details: DetailsProductType[];
}

export interface DetailsProductType {
  color: string;
  size: string;
  price: number;
  sale_price: number;
  image: any[];
}
