let alunos = [];

// Função para gerar nomes aleatórios
function gerarNomeAleatorio() {
    const nomes = ["Ana", "Bruno", "Carlos", "Daniela", "Eduardo", "Fernanda", "Gabriel", "Helena", "Igor", "Joana"];
    const sobrenomes = ["Silva", "Souza", "Oliveira", "Lima", "Santos", "Pereira", "Ferreira", "Costa", "Almeida", "Melo"];
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    return `${nome} ${sobrenome}`;
}

// Função para gerar RGM aleatório
function gerarRgmAleatorio() {
    return Math.floor(100000 + Math.random() * 900000); // Gera um número de 6 dígitos
}

// Função para gerar nota aleatória entre 0 e 10
function gerarNotaAleatoria() {
    return (Math.random() * 10).toFixed(1); // Gera uma nota com 1 casa decimal
}

// Função para gerar um aluno com notas variáveis para testar diferentes cenários
function gerarAluno() {
    let nome = gerarNomeAleatorio();
    let rgm = gerarRgmAleatorio();
    let parc = gerarNotaAleatoria();
    let exer = gerarNotaAleatoria();
    let proj = gerarNotaAleatoria();
    let regi = gerarNotaAleatoria();
    let nf = parseFloat(parc) + parseFloat(exer) + parseFloat(proj) + parseFloat(regi);

    // Ajusta a nota final para criar alunos com diferentes status
    if (Math.random() < 0.33) {
        nf = (Math.random() * 4).toFixed(1); // Nota baixa para reprovados
    } else if (Math.random() < 0.66) {
        nf = (Math.random() * 6 + 4).toFixed(1); // Nota média para exame
    } else {
        nf = (Math.random() * 4 + 6).toFixed(1); // Nota alta para aprovados
    }

    return {
        nome: nome,
        rgm: rgm,
        nota_parc: parc,
        nota_exer: exer,
        nota_proj: proj,
        nota_regi: regi,
        nota_final: nf
    };
}

// Botão para cadastrar manualmente
$("#btnCadastrar").click(function() {
    let nome = $("#nome").val();
    let rgm = $("#rgm").val();
    let parc = Number($("#nota_parc").val());
    let exer = Number($("#nota_exer").val());
    let proj = Number($("#nota_proj").val());
    let regi = Number($("#nota_regi").val());

    if (parc < 0 || parc > 10 || exer < 0 || exer > 10 || proj < 0 || proj > 10 || regi < 0 || regi > 10) {
        alert("As notas devem estar entre 0 e 10.");
        return;
    }

    alunos.push({
        nome: nome,
        rgm: rgm,
        nota_parc: parc,
        nota_exer: exer,
        nota_proj: proj,
        nota_regi: regi,
        nota_final: parc + exer + proj + regi
    });

    $("#formulario")[0].reset();
});

// Botão para gerar automaticamente 10 alunos
$("#btnGerar").click(function() {
    alunos = []; // Limpa a lista de alunos
    for (let i = 0; i < 10; i++) {
        alunos.push(gerarAluno());
    }
    alert("10 alunos gerados aleatoriamente!");
});

// Botão para exibir a tabela de alunos
$("#btnExibir").click(function() {
    let saida = "<table border='1'>";
    saida += `
        <tr>
            <th>Nome 🧑</th>
            <th>RGM 🆔</th>
            <th>Nota Parcial 📝</th>
            <th>Nota Exercício 🏋️‍♂️</th>
            <th>Nota Projeto 📚</th>
            <th>Nota Regimental 🎓</th>
            <th>Nota Final 🔢</th>
            <th>Conceito ✅</th>
        </tr>`;

    alunos.forEach(aluno => {
        saida += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.rgm}</td>
                <td>${aluno.nota_parc}</td>
                <td>${aluno.nota_exer}</td>
                <td>${aluno.nota_proj}</td>
                <td>${aluno.nota_regi}</td>
                <td>${aluno.nota_final}</td>
                <td class="${calcConceito(aluno.nota_final)}">${calcConceito(aluno.nota_final)}</td>
            </tr>`;
    });

    saida += "</table>";
    $("#resposta").html(saida);
});

// Função para calcular conceito
function calcConceito(nf) {
    nf = parseFloat(nf);
    if (nf >= 6) {
        return "aprovado";
    } else if (nf < 1) {
        return "reprovado";
    } else {
        return "exame";
    }
}
