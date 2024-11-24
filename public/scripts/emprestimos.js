console.log('Arquivo JavaScript carregado');

// Manipula os formulários e botões da página
document.addEventListener("DOMContentLoaded", () => {
  // Registrar um novo empréstimo
  document.getElementById("createLoanForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const matricula = document.getElementById("matricula").value;
    const livroId = document.getElementById("livroId").value;

    const messageElement = document.getElementById("create-loan-message");
    messageElement.textContent = ''; // Limpa mensagem anterior

    try {
      const response = await fetch('http://localhost:3000/api/emprestimos/criar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matricula, livro_id: livroId }),
      });

      const data = await response.json();

      if (response.ok) {
        messageElement.textContent = "Empréstimo registrado com sucesso!";
        messageElement.style.color = "green";
        document.getElementById("createLoanForm").reset(); // Limpa o formulário
        loadLoanList(); // Atualiza a lista de empréstimos
      } else {
        messageElement.textContent = data.error || "Erro ao registrar empréstimo.";
        messageElement.style.color = "red";
      }
    } catch (error) {
      console.error(error);
      messageElement.textContent = "Erro de conexão com o servidor.";
      messageElement.style.color = "red";
    }

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
      messageElement.textContent = '';
    }, 5000);
  });

  // Carregar lista de empréstimos
  function loadLoanList() {
    fetch('http://localhost:3000/api/emprestimos/all')
      .then((response) => response.json())
      .then((data) => {
        const loanListElement = document.getElementById('loan-list');
        loanListElement.innerHTML = ''; // Limpa a lista anterior

        data.forEach((loan) => {
          const alunoNome = loan.aluno?.nome || 'Nome não disponível';
          const livroNome = loan.livro?.nome || 'Título não disponível';
          const status = loan.status || 'Status não disponível';

          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <span>${alunoNome}</span>
            <span>${livroNome}</span>
            <span>${status}</span>
          `;

          if (status !== 'Devolvido') {
            const returnButton = document.createElement('button');
            returnButton.textContent = 'Devolver';
            returnButton.onclick = () => devolverEmprestimo(loan.id); // Chama a função de devolução
            listItem.appendChild(returnButton);
          }

          loanListElement.appendChild(listItem);
        });
      })
      .catch((error) => console.error('Erro ao carregar a lista de empréstimos:', error));
  }

  // Função para devolver o empréstimo
  function devolverEmprestimo(emprestimoId) {
    fetch(`http://localhost:3000/api/emprestimos/devolver/${emprestimoId}`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
          loadLoanList(); // Recarregar a lista após a devolução
        } else {
          alert('Erro ao devolver o empréstimo');
        }
      })
      .catch((error) => console.error('Erro ao devolver empréstimo:', error));
  }

  

  // Carregar lista ao iniciar
  loadLoanList();
});
