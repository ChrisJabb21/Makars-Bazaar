import Rating from "../components/Rating";
import { getProduct } from "../ProductService";
import { parseRequestUrl } from "../utils";

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById('add-button').addEventListener('click',
    ()=> {
      document.location.hash = `/cart/${request.id}`;
    }
    );
  },

  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if(product.error){
      return (`<div>${product.error}</div>`)
    }
    return `
    <div class="content">
      <div class="back-to-result">
        <br>
        <a href="/#/"> <span> <i class="fas fa-arrow-circle-left"></i> <span>Back to browse</a>
      </div>
      <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="details-info">
        <ul>
          <li>
            <h1>${product.name}</h1>
          </li>
          <li>
          ${Rating.render({
            value: product.rating,
            text: `${product.numOfReviews} <span> reviews</span>`,
          })}
          </li>
          <li>
          Price: <strong>$${product.price}</strong>
          </li>
          <li>
          Description:
          <div>
          ${product.description}
          </div>
          </li>
        </ul>
        </div>
        <div class="details-action">
          <ul>
            <li>
            Price: $${product.price}
            </li>
            <li>
              Status : 
                ${
                  product.countInStock > 0 
                  ? `<span class="success">In Stock</span>`
                  : `<span class="error">Unavailable</span>`
              }
            </li>
            <li>

            ${
              product.countInStock > 0 
              ? `<button onclick="location.href='http://localhost:9000/#/cart/${product.id}';" type="button" id="add-button" class="btn btn-primary"> Add to Cart</div>`
              : `<button class="btn-danger disabled" type="button" disabled>Product Unavailable</button>`      
            }
            </li>
          </ul>
        </div>
      </div>
    </div>`
  },
};
export default ProductScreen;
