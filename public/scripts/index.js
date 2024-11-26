document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchLivroForm");
  const resultsList = document.getElementById("results");
  const listHeader = document.getElementById("list-header");
  const errorMessage = document.getElementById("error-message");

  // Função para renderizar os resultados
  function renderResults(data) {
      resultsList.innerHTML = ""; // Limpa os resultados anteriores
      errorMessage.textContent = ""; // Limpa mensagens de erro

      if (!data || data.length === 0) {
          resultsList.innerHTML = '<p>Nenhum resultado encontrado.</p>';
          listHeader.style.visibility = "hidden"; // Esconde o cabeçalho se não houver resultados
          return;
      }

      listHeader.style.visibility = "visible"; // Exibe o cabeçalho se houver resultados

      data.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
              <span>${item.id}</span>
              <span>${item.nome}</span>
              <span>${item.autor}</span>
              <span>${item.editora}</span>
              <span>${item.ano_lancamento}</span>
              <span>${item.quantidade}</span>
          `;
          resultsList.appendChild(listItem);
      });
  }

  // Função para buscar dados da API
  async function fetchData(query, searchType) {
      const endpoint =
          searchType === "titulo"
              ? `http://localhost:3000/api/livros/nome?nome=${encodeURIComponent(query)}`
              : `http://localhost:3000/api/livros/autor?autor=${encodeURIComponent(query)}`;

      const errorMessageDiv = document.getElementById('error-message');
      errorMessageDiv.textContent = ''; // Limpa mensagens de erro anteriores

      try {
          const response = await fetch(endpoint);
          if (!response.ok) {
              if (response.status === 404) {
                  throw new Error("Nenhum resultado encontrado para o termo pesquisado.");
              }
              throw new Error("Erro ao buscar os dados.");
          }

          const data = await response.json();
          renderResults(data);
      } catch (error) {
          errorMessageDiv.textContent = error.message; // Exibe a mensagem de erro
          errorMessageDiv.style.color = "red"; // Destaca o erro com cor vermelha
          console.error(error); // Loga o erro no console
      }
  }

  // Evento de submissão do formulário
  form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("searchInput").value.trim();
      const searchType = document.querySelector('input[name="searchType"]:checked').value; // Captura o tipo de pesquisa selecionado
      fetchData(query, searchType);
  });
});
