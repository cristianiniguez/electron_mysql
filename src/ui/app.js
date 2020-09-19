const { remote } = require('electron')
console.log(remote)
const main = remote.require('./main')

// Elements
const $productForm = document.getElementById('product-form')

// Events
$productForm.addEventListener('submit', async e => {
  e.preventDefault()

  const newProduct = {
    name: $productForm['name'].value,
    price: parseFloat($productForm['price'].value),
    description: $productForm['description'].value
  }

  const result = await main.createProduct(newProduct)
  console.log(result)
})