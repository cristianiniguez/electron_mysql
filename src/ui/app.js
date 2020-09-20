const { remote } = require('electron')
const main = remote.require('./main')

// Variables
let products = []
let editingStatus = false
let productId = ''

// Elements
const $productForm = document.getElementById('product-form')
const $productsList = document.getElementById('products')

// Functions
const getProducts = async () => {
  products = await main.getProducts()
  renderProducts(products)
}

const editProduct = async (id) => {
  const product = await main.getProductById(id)
  $productForm['name'].value = product.name
  $productForm['price'].value = product.price
  $productForm['description'].value = product.description
  editingStatus = true
  productId = product.id
}

const deleteProduct = async (id) => {
  const response = confirm('Are you sure you want to delete it?')
  if (response) {
    const result = await main.deleteProduct(id)
    console.log(result)
    getProducts()
  }
}

const renderProducts = (products) => {
  $productsList.innerHTML = ""
  products.forEach(product => {
    $productsList.innerHTML += `
      <div class="card card-body my-2 animate__animated animate__fadeInLeft">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <h3>${product.price}</h3>
        <p>
          <button class="btn btn-danger" onclick="deleteProduct(${product.id})">DELETE</button>
          <button class="btn btn-secondary" onclick="editProduct(${product.id})">EDIT</button>
        </p>
      </div>
    `
  })
}

// Events
$productForm.addEventListener('submit', async e => {
  e.preventDefault()

  const newProduct = {
    name: $productForm['name'].value,
    price: parseFloat($productForm['price'].value),
    description: $productForm['description'].value
  }

  if (!editingStatus) {
    const result = await main.createProduct(newProduct)
    console.log(result)
  } else {
    const result = await main.updateProduct(productId, newProduct)
    console.log(result)
    editingStatus = false
    productId = ""
  }

  $productForm.reset()
  $productForm['name'].focus()
  getProducts()
})

window.addEventListener('load', async () => {
  await getProducts()
})