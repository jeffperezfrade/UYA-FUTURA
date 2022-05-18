export class Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  img_url: string;

  constructor(
    name: string,
    price: number,
    description: string,
    img_url: string,
  ) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.img_url = img_url;
  }
}