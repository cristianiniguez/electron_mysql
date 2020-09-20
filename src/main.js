const { BrowserWindow, Notification } = require('electron')
const { getConnection } = require('./database')

async function getProducts() {
  try {
    const cn = await getConnection()
    const results = await cn.query('SELECT * FROM products ORDER BY id DESC')
    return results
  } catch (error) {
    console.error(error)
  }
}

async function deleteProduct(id) {
  try {
    const cn = await getConnection()
    const result = await cn.query('DELETE FROM products WHERE id = ?', id)
    return result
  } catch (error) {
    console.error(error)
  }
}

async function createProduct(product) {
  try {
    const cn = await getConnection()
    const result = await cn.query('INSERT INTO products SET ?', product)
    new Notification({
      title: 'Electro Mysql',
      body: 'New Product Saved Successfully'
    }).show()
    product.id = result.insertId
    return product
  } catch (error) {
    console.error(error)
  }
}

async function getProductById(id) {
  try {
    const cn = await getConnection()
    const results = await cn.query('SELECT * FROM products WHERE id = ?', id)
    return results[0]
  } catch (error) {
    console.error(error)
  }
}

async function updateProduct(id, product) {
  try {
    const cn = await getConnection()
    const result = await cn.query('UPDATE products SET ? WHERE id = ?', [product, id])
    return result
  } catch (error) {
    console.error(error)
  }
}

let window

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  window.loadFile('src/ui/index.html')
}

module.exports = {
  createWindow,
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}