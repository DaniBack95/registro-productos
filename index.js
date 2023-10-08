//Variable definition
const url = "http://localhost:3000/api/products/";
const container = document.getElementById("tbody");
const modalArticle = new bootstrap.Modal(
  document.getElementById("modalArticle")
);
const form = document.getElementById("modal-form");
const nameArticle = document.getElementById("name");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const btnCreate = document.getElementById("btnCreate");

let results = "";
let option = "";

btnCreate.addEventListener("click", () => {
  nameArticle.value = "";
  price.value = "";
  stock.value = "";
  modalArticle.show();
  option = "toCreate";
});

//Function show results
const display = (articles) => {
  articles.forEach((article) => {
    results += `<tr>
                  <td>${article.id}</td>
                  <td>${article.nameProduct}</td>
                  <td>${article.price}</td>
                  <td>${article.stock}</td>
                  <td class="text-center d-flex justify-content-evenly"><a class="btnEdit btn btn-primary">Edit</a> <a class="btnDelete btn btn-danger">Delet</a></td>

              </tr>`;
  });

  container.innerHTML = results;
};

// Modal procedure
fetch(url)
  .then((response) => response.json())
  .then((data) => display(data))
  .catch((error) => console.log(error));

const on = (element, eventt, selector, handler) => {
  element.addEventListener(eventt, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

// Deletion procedure
on(document, "click", ".btnDelete", (e) => {
  const row = e.target.parentNode.parentNode;
  const id = row.firstElementChild.innerHTML;

  alertify.confirm(
    "¡Eliminar producto!",
    "¿Está seguro de eliminar este producto?",
    function () {
      
      fetch(url + id, {
        method: "DELETE", 
      })
        .then((res) => res.json()) 
        .then(() => location.reload()) 
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    function () {
      alertify.error("Cancel");
    })
});

// Update procedure
let idForm = 0

on(document, "click", ".btnEdit", (e) => {
  const row = e.target.parentNode.parentNode;
  idForm = row.children[0].innerHTML
  const nameForm = row.children[1].innerHTML
  const priceForm = row.children[2].innerHTML
  const stockForm = row.children[3].innerHTML

  nameArticle.value = nameForm
  price.value = priceForm
  stock.value = stockForm

  option = 'toEdit'
  modalArticle.show()
});


// Create procedure
form.addEventListener('submit', (e)=> {
  e.preventDefault()
  if(option === 'toCreate') {
    fetch(url, {
      method:'POST',
      headers: {
        'content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        nameProduct:nameArticle.value,
        price:price.value,
        stock:stock.value
      })
    }) 

    .then(response => response.json())
    .then(data => {
      const newArticle = [] 
      newArticle.push(data)
      display(newArticle)
    })
  }

  if (option === 'toEdit') {
    fetch(url+idForm, {
      method: 'PUT', 
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        nameProduct:nameArticle.value,
        price:price.value,
        stock:stock.value
      })
    })

    .then(response => response.json())
    .then(response => location.reload())
  }

  modalArticle.hide()
})