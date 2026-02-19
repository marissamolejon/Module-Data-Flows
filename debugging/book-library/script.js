let myLibrary = [];

window.addEventListener("load", function () {
  populateStorage();

});

function populateStorage() {
  if (myLibrary.length === 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
  }
  render();
}
function submit() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const check = document.getElementById("check").checked;

  if (title === "" || author === "" || pages === "") {
    alert("Please fill all fields!");
    return;
  }

  let book = new Book(title, author, pages, check);
  myLibrary.push(book);
  render();

  // reset form
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("check").checked = false;
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;

  // delete old rows (keep header)
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }

  for (let i = 0; i < myLibrary.length; i++) {
    let row = table.insertRow(1);

    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);

    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;

    // Read button
    let changeBut = document.createElement("button");
    
    changeBut.className = "btn btn-success";
    changeBut.innerText = myLibrary[i].check ? "Yes" : "No";

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    wasReadCell.appendChild(changeBut);

    // Delete button
    let delButton = document.createElement("button");
    delButton.className = "btn btn-warning";
    delButton.innerHTML = "Delete";

    delButton.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });

    deleteCell.appendChild(delButton);
  }
}
