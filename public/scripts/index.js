
    // Função para renderizar os resultados
    function renderResults(data) {
      const resultsDiv = document.getElementById('results');
      const listHeader = document.getElementById('list-header');
      resultsDiv.innerHTML = ''; // Limpa os resultados anteriores

      if (!data || data.length === 0) {
        resultsDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        listHeader.style.visibility = 'hidden'; // Esconde o cabeçalho se não houver resultados
        return;
      }

      listHeader.style.visibility = 'visible'; // Exibe o cabeçalho se houver resultados

      data.forEach(item => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
          <span>${item.id}</span>
          <span>${item.nome}</span>
          <span>${item.autor}</span>
          <span>${item.editora}</span>
          <span>${item.ano_lancamento}</span>
          <span>${item.quantidade}</span>
        `;

        resultsDiv.appendChild(listItem);
      });
    }

    // Função para buscar os dados da API
    async function fetchData(endpoint, query) {
      const errorMessageDiv = document.getElementById('error-message');
      errorMessageDiv.textContent = ''; // Limpa mensagens de erro

      try {
        const response = await fetch(`${endpoint}?nome=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        const data = await response.json();
        renderResults(data);
      } catch (error) {
        errorMessageDiv.textContent = error.message;
        console.error(error);
      }
    }

    // Configuração do formulário de pesquisa
    document.getElementById('searchLivroByTitleForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const query = document.getElementById('livroTitulo').value.trim();
      fetchData('http://localhost:3000/api/livros/nome', query);
    });