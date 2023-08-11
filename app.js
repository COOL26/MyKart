import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://fir-38a44-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const productsInDB = ref(database, "products");

onValue(productsInDB, function (snapshot) {
  //If our db got empty, we deleted all elements, then our snapshot will not exist.
  if (!snapshot.exists()) {
    list.innerHTML = "No items here...yet";
    return;
  }
  let productsArrayEnteries = Object.entries(snapshot.val()); //convert an object into 2d array having object keys and values.
  //let productsArrayKeys = Object.keys(snapshot.val()); //convert object to array of object keys.
  //let productsArrayValues = Object.Values(snapshot.val()); //convert object to array of object values.
  //console.log(productsArrayKeys);
  clearList();
  for (let product of productsArrayEnteries) {
    insertProducts(product);
  }
});

const products = document.getElementById("products");
const add = document.getElementById("add");
let list = document.getElementById("list");

function insertProducts(products) {
  let productId = products[0];
  let productVal = products[1];
  let listItem = document.createElement("li");
  listItem.textContent = `${productVal}`;
  listItem.classList.add("list-items");
  listItem.addEventListener("click", () => removeProducts(productId));
  list.append(listItem);
}

let removeProducts = (productId) => {
  let exactLocationOfProductsInDB = ref(database, `products/${productId}`);
  remove(exactLocationOfProductsInDB);
};

function clearInputField() {
  products.value = "";
}

function clearList() {
  list.innerHTML = "";
}

add.addEventListener("click", () => {
  const productsVal = products.value;
  if (productsVal === "") {
    document.getElementsByClassName("disp")[0].style.display = "block";
    setTimeout(function () {
      document.getElementsByClassName("disp")[0].style.display = "none";
    }, 3000);
    return;
  }
  clearInputField();
  push(productsInDB, productsVal);
});
