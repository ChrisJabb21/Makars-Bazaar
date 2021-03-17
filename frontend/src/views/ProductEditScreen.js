import { getProduct, updateProduct, uploadProductImage } from "../productService";
import { hideLoading, parseRequestUrl, showLoading, showMessage } from "../utils";

const ProductEditScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("edit-product-form")
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      showLoading();
      const data = await updateProduct({
        _id: request.id,
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        image: document.getElementById('image').value, 
        price: document.getElementById('price').value, 
        brand: document.getElementById('brand').value, 
        countInStock: document.getElementById('countInStock').value, 
        description: document.getElementById('description').value, 
      });
      hideLoading();
      if(data.error){
        showMessage(data.error);
      } else {
        document.location.hash = '/productlist';
      }
    });
    document.getElementById('image-file')
    .addEventListener('change', async(e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      showLoading();
      const data = await uploadProductImage(formData);
      hideLoading();
      if(data.error){
        showMessage(data.error);
      } else {
        showMessage('Image uploaded successfully.');
        document.getElementById('image').value = data.image;
      }
    });
  },

  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    return `
    <div class="content">
      <div>
        <a class="btn btn-primary" href="/#/productlist">Back to products</a>
      </div>
      <div class="form-container">
        <form id="edit-product-form">
          <ul class="form-items">
            <li>
              <h1>Edit Product</h1>
              <h2>Product Id : ${product._id.substring(0,8)}...</h2>
            </li>
            <li>
              <label for="name">Name</label>
              <input type="text" name="name" value="${product.name}" id="name" />
            </li>  
            <li>
              <label for="price">Price</label>
              <input type="number" step="any" name="price" value="${product.price}" id="price" />
            </li>
            <li>
              <label for="image">Product Image (preferred size: 680px x 830px)</label>
              <input type="text" name="image" value="${product.image}" id="image" />
              <input type="file" name="image-file" id="image-file" />
            </li>
            <li>
              <label for="brand">Brand</label>
              <input type="text" name="brand" value="${product.brand}" id="brand" />
            </li>
            <li>
              <label for="countInStock">Count in Stock</label>
              <input type="text" name="countInStock" value="${product.countInStock}" id="countInStock" />
            </li>
            <li>
              <label for="category">Category</label>
              <input type="text" name="category" value="${product.category}" id="category" />
            </li>
            <li>
              <label for="description">Description</label>
              <input type="text" name="description" value="${product.description}" id="description" />
            </li>
            <li>
              <button type="submit" class="btn btn-primary">Update</button>
            </li>
          </ul>
        </form>
      </div>
    </div>
    `;
  },
};

export default ProductEditScreen;