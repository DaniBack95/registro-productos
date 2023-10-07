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
  option = "create";
});

//Function show results
const display = (articles) => {
  articles.forEach((article) => {
    results += `<tr>
                  <td>${article.id}</td>
                  <td>${article.nameProduct}</td>
                  <td>$${article.price}</td>
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
    "This is a confirm dialog.",
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
