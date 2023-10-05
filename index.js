//Variable definition
const url = 'http://localhost:3000/api/articulos/'
const container = document.getElementById('tbody') 
const modalArticle = new bootstrap.Modal(document.getElementById('modalArticle'))
const form = document.getElementById('modal-form')
const nameArticle = document.getElementById('name')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const btnCreate = document.getElementById('btnCreate')


let results = ''
let option = ''
console.log(stock);

btnCreate.addEventListener('click', () => {
  nameArticle.value = ''
  price.value = ''
  stock.value = ''
  modalArticle.show()
  option = 'create'
})


//Function show results
const display = (articles)=> {
  articles.forEach(article => {
    results = `<tr>
                  <td>${article.id}</td>
                  <td>${article.nameArticle}</td>
                  <td>${article.price}</td>
                  <td>${article.stock}</td>
                  <td class="text-center"><a class="btnEdit btn btn-primary">Edit</a> <a class="btnDelete btn btn-primary">Delet</a></td>

              </tr>`
  });

  container.innerHTML = results
}

// Modal procedure
fetch(url) 
  .then(response => response.json())
  .then(data => display(data)) 
  .catch(error => console.log(error))