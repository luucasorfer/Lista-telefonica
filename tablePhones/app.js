// Seleciona o campo de entrada de pesquisa
const searchInput = document.getElementById('search-input');

// Seleciona o elemento <tbody> da tabela
const phoneList = document.getElementById('phone-list');

// Faz uma requisição para carregar o arquivo JSON com os números de telefone
fetch('phones.json')
  .then(response => response.json())
  .then(phones => {
    // Itera sobre todos os números de telefone e cria uma nova linha na tabela para cada um
    phones.forEach(phone => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('strong');
      const phoneCell = document.createElement('p');

      nameCell.textContent = phone.nome;
      phoneCell.textContent = phone.telefone;

      row.appendChild(nameCell);
      row.appendChild(phoneCell);

      phoneList.appendChild(row);
    });
    
    // Adiciona um ouvinte de evento para a tecla pressionada no campo de entrada de pesquisa
    searchInput.addEventListener('keyup', function(event) {
      // Converte o valor do campo de entrada de pesquisa para minúsculas
      const searchTerm = event.target.value.toLowerCase();
      
      // Itera sobre todas as linhas da tabela
      Array.from(phoneList.getElementsByTagName('tr')).forEach(function(row) {
        // Seleciona todas as células da linha atual
        const cells = row.getElementsByTagName('td');
        
        // Define uma variável para rastrear se a linha atual contém a pesquisa
        let hasMatch = false;
        
        // Itera sobre todas as células da linha atual
        Array.from(cells).forEach(function(cell) {
          // Converte o valor da célula para minúsculas e verifica se ele contém a pesquisa
          if (row.textContent.toLowerCase().includes(searchTerm)) {
            hasMatch = true;
          }
        });
        
        // Exibe ou oculta a linha atual com base no resultado da pesquisa
        if (hasMatch) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
