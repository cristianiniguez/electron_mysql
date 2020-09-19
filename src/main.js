const { BrowserWindow, Notification } = require('electron')
const { getConnection } = require('./database')

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
    console.log(error)
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
  createProduct
}