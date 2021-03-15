import { getProduct } from "../productService";
import { parseRequestUrl } from "../utils";

const ProductEditScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    return `${product.name}`;

  },

};

export default ProductEditScreen;