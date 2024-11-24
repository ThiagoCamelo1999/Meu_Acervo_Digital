document.addEventListener('DOMContentLoaded', function () {
  const bookList = document.getElementById('bookList'); // Corrigido para 'bookList'

  // Função para buscar livros
  async function fetchLivros() {
    const response = await fetch(`http://localhost:3000/api/livros/all`);
    const data = await response.json();
    renderLivros(data); // Passa os dados diretamente
  }

  // Função para renderizar os livros na tela
  function renderLivros(livros) {
    bookList.innerHTML = ''; // Limpar a lista de livros

    livros.forEach(livro => { // Corrigido para 'livro' no loop
      const li = document.createElement('li');
      li.innerHTML = ` 
        <span>${livro.id}</span>
        <span>${livro.nome}</span>
        <span>${livro.autor}</span>
        <span>${livro.editora}</span>
        <span>${livro.ano_lancamento}</span>
        <span>${livro.quantidade}</span> <!-- Exibindo a quantidade -->
      `;
      bookList.appendChild(li); // Corrigido de 'livroList' para 'bookList'
    });
  }

  // Inicializa a busca com todos os livros quando a página for carregada
  fetchLivros();
});
