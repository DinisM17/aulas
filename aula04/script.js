function calcular(){
    let a=prompt("a:");
    let b=prompt("b:");
    let suma = parseInt(a) + parseInt(b);
    document.getElementById("result").innerHTML = "Resultado: " + suma;
}

disciplinas = ["Matemática", "Português", "História", "Geografia", "Ciências"];
notas = [8, 7.5, 9, 6.5, 8.5];

function geretabela() {
        let tabela = "<table border='1'><tr><th>Disciplina</th><th>Nota</th></tr>";

        for (let i = 0; i < disciplinas.length; i++) {
            tabela += `<tr><td>${disciplinas[i]}</td><td>${notas[i]}</td></tr>`;
        }

        tabela += "</table>";

        document.getElementById("resultado").innerHTML = tabela;
    }

    geretabela();

function adicionarNota(event) {
    event.preventDefault(); // evita o reload do formulário

    const disciplina = document.getElementById("disciplina").value;
    const nota = parseFloat(document.getElementById("nota").value);

    // Validação simples
    if (disciplina.trim() === "" || isNaN(nota)) {
        alert("Preencha corretamente todos os campos!");
        return;
    }

    // Adiciona aos arrays
    disciplinas.push(disciplina);
    notas.push(nota);

    // Limpa os campos
    document.getElementById("disciplina").value = "";
    document.getElementById("nota").value = "";

    // Atualiza a tabela
    geretabela();
}

window.onload = function() {
    geretabela();
    document.getElementById("form-nota").addEventListener("submit", adicionarNota);
};
