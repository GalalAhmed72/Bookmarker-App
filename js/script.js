var documentHtml = document;
var BName = documentHtml.getElementById("BookName"),
  BUrl = documentHtml.getElementById("BookUrl"),
  search = documentHtml.getElementById("search"),
  btn1 = documentHtml.getElementById("updata-btn1"),
  btn2 = documentHtml.getElementById("updata-btn2"),
  CalpitalAlert = documentHtml.getElementById("CalpitalAlert"),
  urlAlert = documentHtml.getElementById("urlAlert"),
  alertExite = documentHtml.getElementById("alertExite"),
  indexvalue = 0;

function setlocal() {
  localStorage.setItem("allbock", JSON.stringify(BookContainer));
}

function getlocal() {
  return JSON.parse(localStorage.getItem("allbock"));
}

if (getlocal() == null) {
  var BookContainer = [];
} else {
  BookContainer = getlocal();
  display();
}

btn1.onclick = function () {
  if ((regexName() == true) & (regexUrl() == true)) {
    create();
  } else {
  }
};

function create() {
  var sitedetels = {
    BookName: BName.value,
    BookUrl: BUrl.value,
  };

  BookContainer.push(sitedetels);
  console.log(BookContainer);
  display();
  setlocal();
  reser();
}

function display() {
  var trs = ``;
  for (var i = 0; i < BookContainer.length; i++) {
    trs += `
      <tr>
        <td>${BookContainer[i].BookName}</td>
        <td>${BookContainer[i].BookUrl}</td>
        <td>
            <div class="hstack gap-3 justify-content-center">
            <a href="${BookContainer[i].BookUrl}" target="_blank" visite(${i}) class="btn btn-outline-dark"><i class="fa-solid  fa-eye"></i></a>
            <button onclick="setdata(${i})" class="btn btn-outline-warning"><i class="fa-solid  fa-edit"></i></button>
            <button onclick="deleteData(${i})"  class="btn btn-outline-danger"><i class="fa-solid  fa-trash"></i></button>  
            </div>
        </td>

      </tr>
    `;
  }
  documentHtml.getElementById("tableData").innerHTML = trs;
  reser();
}

function deleteData(index) {
  BookContainer.splice(index, 1);
  setlocal();
  display();
}

function reser() {
  BName.value = "";
  BUrl.value = "";
}

function searchFun() {
  var searchValue = search.value.toLowerCase();
  var trs = ``;
  for (var i = 0; i < BookContainer.length; i++) {
    if (BookContainer[i].BookName.toLowerCase().includes(searchValue)) {
      trs += `
      <tr>
        <td>${BookContainer[i].BookName.toLowerCase().replaceAll(searchValue,`<span class="bg-info">${searchValue}</span>`
        )}</td>
        <td>${BookContainer[i].BookUrl}</td>
        <td>
            <div class="hstack gap-3 justify-content-center">
            <a href="${
              BookContainer[i].BookUrl
            }" target="_blank" visite(${i}) class="btn btn-outline-dark"><i class="fa-solid  fa-eye"></i></a>
            <button onclick="setdata(${i})" class="btn btn-outline-warning"><i class="fa-solid  fa-edit"></i></button>
            <button onclick="deleteData(${i})"  class="btn btn-outline-danger"><i class="fa-solid  fa-trash"></i></button>  
            </div>
        </td>

      </tr>
    `;
    }
  }
  documentHtml.getElementById("tableData").innerHTML = trs;
}

function setdata(index) {
  indexvalue = index;
  BName.value = BookContainer[index].BookName;
  BUrl.value = BookContainer[index].BookUrl;

  btn1.classList.add("d-none");
  btn2.classList.remove("d-none");
}

function update() {
  var sitedetels = {
    BookName: BName.value,
    BookUrl: BUrl.value,
  };
  BookContainer.splice(indexvalue, 1, sitedetels);
  setlocal();
  btn1.classList.remove("d-none");
  btn2.classList.add("d-none");
  display();
}

function regexName() {
  var regex = /^[A-Z][a-z]{1,9}$/;
  var Nregex = BName.value;
  if (/^[A-Z]/.test(Nregex) == true) {
    if (/[a-z]{1,9}$/.test(Nregex) == true) {
      BName.classList.add('is-valid')
      BName.classList.remove('is-invalid')
      CalpitalAlert.classList.add("d-none");
      return true;
    } else {
      CalpitalAlert.classList.remove("d-none");
      CalpitalAlert.innerHTML = "you shoud enter 3-9 small leter";
      BName.classList.remove('is-valid')
      BName.classList.add('is-invalid')
      return false;
    }
  } else {
    CalpitalAlert.innerHTML = "you shoud enter capital liter";
    CalpitalAlert.classList.remove("d-none");
    BName.classList.remove('is-valid')
    BName.classList.add('is-invalid')
    return false;
  }
}

function regexUrl() {
  
  var Urlregex = BUrl.value;

  if (Urlregex === "") {
    urlAlert.classList.remove("d-none");
    return false;
  } else {
    var isExite = false;
    for (var i = 0; i < BookContainer.length; i++) {
      if (BookContainer[i].BookUrl == Urlregex) {
        //false match
        alertExite.classList.remove("d-none");
        isExite = true;
      }
    }
    if (isExite == true) {
      urlAlert.classList.add("d-none");

      alertExite.classList.remove("d-none"); //show alert
      return false;
    } else {
      alertExite.classList.add("d-none"); //hide alert
    }

    urlAlert.classList.add("d-none");
    return true;
  }
}

