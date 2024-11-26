document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("searchEmprestimosForm");
    const resultsList = document.getElementById("results");
    const listHeader = document.getElementById("list-header");
    const errorMessage = document.getElementById("error-message");
  
    // Função para renderizar os resultados
    function renderResults(data) {
      resultsList.innerHTML = ""; // Limpa os resultados anteriores
      errorMessage.textContent = ""; // Limpa mensagens de erro
  
      if (!data || data.length === 0) {
        // Se não houver resultados
        resultsList.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        listHeader.style.visibility = "hidden"; // Esconde o cabeçalho
        errorMessage.textContent = "Nenhum resultado encontrado para o termo pesquisado."; // Exibe a mensagem de erro
        errorMessage.style.color = "red"; // Exibe a mensagem de erro em vermelho
        return;
      }
  
      // Exibe os resultados caso sejam encontrados
      listHeader.style.visibility = "visible"; // Exibe o cabeçalho
      data.forEach((item) => {
        const emprestimos = item.emprestimos || [];
        emprestimos.forEach((emprestimo) => {
          const listItem = document.createElement("li");
  
          // Determinar a data de devolução ou se está pendente
          const dataDevolucao =
            emprestimo.status === "Devolvido"
              ? new Date(emprestimo.data_devolucao).toLocaleDateString()
              : emprestimo.status === "Atrasado"
              ? "Atrasado"
              : "Pendente";
  
          listItem.innerHTML = ` 
            <span>${emprestimo.id || "N/A"}</span>
            <span>${item.nome || emprestimo.aluno?.nome || "Aluno não disponível"}</span>
            <span>${emprestimo.livro?.nome || "Livro não disponível"}</span>
            <span>${emprestimo.status || "Status não disponível"}</span>
            <span>${new Date(emprestimo.data_emprestimo).toLocaleDateString() || "N/A"}</span>
            <span>${dataDevolucao}</span>
          `;
          resultsList.appendChild(listItem);
        });
      });
    }
  
    // Função para buscar dados de empréstimos
    async function fetchEmprestimos(query, searchType) {
      const endpoint =
        searchType === "aluno"
          ? `http://localhost:3000/api/emprestimos/aluno?nome=${encodeURIComponent(query)}`
          : `http://localhost:3000/api/emprestimos/livro?nome=${encodeURIComponent(query)}`;
  
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Nenhum empréstimo encontrado para o termo pesquisado.");
          }
          throw new Error("Erro ao buscar empréstimos.");
        }
        const data = await response.json();
        renderResults(data);
      } catch (error) {
        console.error(error);
        errorMessage.textContent = error.message;
        errorMessage.style.color = "red"; // Destaca o erro com cor vermelha
        listHeader.style.visibility = "hidden"; // Esconde o cabeçalho se erro ocorrer
      }
    }
  
    // Evento de submissão do formulário
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("searchInput").value.trim();
      const searchType = document.querySelector('input[name="searchType"]:checked').value;
      if (query) {
        fetchEmprestimos(query, searchType);
      }
    });
});
