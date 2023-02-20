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
    var resultsTable = document.getElementById("results");

    // adiciona os listeners de busca e filtro
    searchInput.addEventListener("input", function () {
      updateTable(data);
    });
    for (var i = 0; i < filterCheckboxes.length; i++) {
      filterCheckboxes[i].addEventListener("change", function () {
        updateTable(data);
      });
    }

    // atualiza a tabela com os dados iniciais
    updateTable(data);
  }
};
xhr.send();

// função que atualiza a tabela de resultados
function updateTable(data) {
  // seleciona os elementos do DOM
  var searchInput = document.getElementById("search");
  var filterCheckboxes = document.getElementsByName("filter-local");
  var resultsTable = document.getElementById("results");
  // seleciona o elemento do botão de impressão
  var printButton = document.getElementById("print-button");

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

  // limpa a tabela de resultados
  resultsTable.innerHTML = "";

  // adiciona os dados filtrados à tabela
  if (filteredData.length > 0) {
    for (var i = 0; i < filteredData.length; i++) {
      var item = filteredData[i];
      var row = document.createElement("tr");
      row.innerHTML =
        "<td>" + "<strong>" + item.nome + "</strong>" +
        "<p>" + item.telefone + "</p>" + "</td>"
      resultsTable.appendChild(row);
    }
  }

  // exibe mensagem de "nenhum resultado encontrado" se a lista estiver vazia
  if (filteredData.length === 0) {
    var row = document.createElement("tr");
    row.innerHTML = "Nenhum resultado encontrado";
    resultsTable.appendChild(row);

    // esconde o botão de impressão
    printButton.style.display = "none";
  } else {
    // exibe o botão de impressão
    printButton.style.display = "inline-block";
  }

  
  // verifica se o último elemento filho da lista está vazio e remove a borda inferior
  const lastResult = resultsTable.lastElementChild;
  if (lastResult.textContent.trim() === "") {
    lastResult.style.borderBottom = "none";
  }

}