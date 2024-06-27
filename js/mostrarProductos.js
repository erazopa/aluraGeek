import { conexionApi } from "./conexionApi.js";

const lista = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
// const boton = document.getElementsByClassName("delete-button");

function crearCard(name, price, image, id) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `<div class="image-container">
                        <img class="img-productos"
                            src="${image}"
                            alt="${name}">
                    </div>
                    <div class="card-container--info">
                        <p>${name}</p>
                        <div class="card-container--value">
                            <p>${price}</p>
                            <button class="delete-button" data-id="${id}">
                                <img class="delete-img" src="/access/delete.jpg" alt="eliminar"> </button>
                        </div>
                    </div>`;

  lista.appendChild(card);
  return card;
}

const render = async () => {
  try {
    const listProduct = await conexionApi.productList();

    listProduct.forEach((product) => {
      lista.appendChild(
        crearCard(product.name, product.price, product.image, product.id)
      );
    });
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;

  conexionApi
    .createProducts(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

boton.addEventListener("click", () => {
  const id = document.querySelector("[data-id=]").value;
});

conexionApi
  .deleteProducts(id)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

render();
