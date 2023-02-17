// faz a requisição AJAX para carregar os dados do arquivo JSON
var xhr = new XMLHttpRequest();
xhr.open("GET", "dados.json");
xhr.onload = function () {
  if (xhr.status === 200) {
    // converte a resposta em um array de objetos
    var data = JSON.parse(xhr.responseText);

    // seleciona os elementos do DOM
    var searchInput = document.getElementById("search");
    var filterCheckboxes = document.getElementsByName("filter-local");
    var resultsList = document.getElementById("results");

    // adiciona os listeners de busca e filtro
    searchInput.addEventListener("input", function () {
      updateList(data);
    });
    for (var i = 0; i < filterCheckboxes.length; i++) {
      filterCheckboxes[i].addEventListener("change", function () {
        updateList(data);
      });
    }

    // atualiza a lista com os dados iniciais
    updateList(data);
  }
};
xhr.send();

// função que atualiza a lista de resultados
function updateList(data) {
  // seleciona os elementos do DOM
  var searchInput = document.getElementById("search");
  var filterCheckboxes = document.getElementsByName("filter-local");
  var resultsList = document.getElementById("results");

  // obtém o valor do campo de busca
  var searchTerm = searchInput.value.trim().toLowerCase();

  // obtém os valores dos checkboxes selecionados
  var selectedFilters = [];
  for (var i = 0; i < filterCheckboxes.length; i++) {
    if (filterCheckboxes[i].checked) {
      selectedFilters.push(filterCheckboxes[i].value);
    }
  }

  // filtra os dados com base no termo de busca e nos filtros selecionados
  var filteredData = data.filter(function (item) {
    if (selectedFilters.length > 0 && !selectedFilters.includes(item.local)) {
      return false;
    }
    if (
      searchTerm.length > 0 &&
      !item.nome.toLowerCase().includes(searchTerm)
    ) {
      return false;
    }
    return true;
  });

  // atualiza a lista de resultados
  resultsList.innerHTML = "";
  for (var i = 0; i < filteredData.length; i++) {
    var item = filteredData[i];
    var li = document.createElement("li");
    li.innerHTML =
      "<strong>" + item.nome + "</strong>" +
      "<p>" + item.telefone + "</p>" 
      /*+ " (" + item.local + ")"*/;
    resultsList.appendChild(li);
  }

  // exibe mensagem de "nenhum resultado encontrado" se a lista estiver vazia
  if (filteredData.length === 0) {
    var li = document.createElement("li");
    li.innerHTML = "Nenhum resultado encontrado";
    resultsList.appendChild(li);
  }
}

// exibe o botão de impressão se houver resultados na tabela
if (filteredData.length > 0) {
  printButton.style.display = "block";
} else {
  printButton.style.display = "none";
}

// verifica se o último elemento filho da lista está vazio e remove a borda inferior
const lastResult = resultsTable.lastElementChild;
if (lastResult.textContent.trim() === "") {
  lastResult.style.borderBottom = "none";
}
