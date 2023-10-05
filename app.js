//Variable definition
const url = 'http://localhost:3000/api/articulos/'
const container = document.getElementById('tbody') 
const modalArticle = new bootstrap.Modal(document.getElementById('modalArticle'))
const form = document.getElementById('modal-form')
const nameArticle = document.getElementById('name')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const btnCreate = document.getElementById('btnCreate')


let result = ''
let option = ''
console.log(stock);

btnCreate.addEventListener('click', () => {
  nameArticle.value = ''
  price.value = ''
  stock.value = ''
  modalArticle.show()
  option = 'create'
})