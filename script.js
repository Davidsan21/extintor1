let extintores = JSON.parse(localStorage.getItem('extintores')) || [];
let editIndex = -1;  // Índice do extintor em edição

// Modal de edição
const modal = document.getElementById('editModal');
const closeBtn = document.getElementsByClassName('close')[0];

// Abrir modal de edição
function abrirModal(index) {
    const extintor = extintores[index];
    editIndex = index; // Armazena o índice do extintor sendo editado

    // Preenche os campos do modal com os dados do extintor
    document.getElementById('editPrefixo').value = extintor.prefixo;
    document.getElementById('editNumero').value = extintor.numero;
    document.getElementById('editValidade').value = extintor.validade;
    document.getElementById('editTipo').value = extintor.tipo;

    // Exibe o modal
    modal.style.display = 'block';
}

// Fechar o modal
closeBtn.onclick = function() {
    modal.style.display = 'none';
};

// Fechar o modal se clicar fora dele
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Função para carregar os extintores do localStorage
// Função para carregar os extintores do localStorage
function carregarExtintores() {
    const tableBody = document.getElementById('extintoresTableBody');
    tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

    const hoje = new Date(); // Data atual

    extintores.forEach((extintor, index) => {
        const tr = document.createElement('tr');
        
        // Converter validade para objeto Date
        const validade = new Date(extintor.validade);

        // Calcular a data de 20 dias antes da validade
        const data20DiasAntes = new Date(validade);
        data20DiasAntes.setDate(validade.getDate() - 20);

        // Determinar a cor de fundo baseada na validade
        let corFundo = '';
        if (validade < hoje) {
            corFundo = 'red'; // Extintor vencido
        } else if (data20DiasAntes <= hoje && validade > hoje) {
            corFundo = 'yellow'; // Extintor com 20 dias para vencer
        }

        tr.innerHTML = `
            <td>${extintor.prefixo}</td>
            <td>${extintor.numero}</td>
            <td>${extintor.validade}</td>
            <td>${extintor.tipo}</td>
            <td><button class="delete-btn" onclick="deletarExtintor(${index})">Excluir</button></td>
        `;
        
        // Aplica a cor de fundo na linha
        if (corFundo) {
            tr.style.backgroundColor = corFundo;
        }

        tr.ondblclick = function() {
            abrirModal(index); // Abre o modal ao clicar duas vezes
        };
        tableBody.appendChild(tr);
    });
}


// Função para cadastrar extintores
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const prefixo = document.getElementById('prefixo').value;
    const numero = document.getElementById('numero').value;
    const validade = document.getElementById('validade').value;
    const tipo = document.getElementById('tipo').value;

    const extintor = {
        prefixo,
        numero,
        validade,
        tipo
    };

    if (editIndex === -1) {
        extintores.push(extintor); // Adiciona novo extintor
    } else {
        extintores[editIndex] = extintor; // Atualiza extintor existente
        editIndex = -1; // Reseta o índice de edição
    }

    localStorage.setItem('extintores', JSON.stringify(extintores));

    document.getElementById('cadastroForm').reset();
    modal.style.display = 'none';  // Fecha o modal de edição

    carregarExtintores();
});

// Função para excluir extintores
function deletarExtintor(index) {
    extintores.splice(index, 1);
    localStorage.setItem('extintores', JSON.stringify(extintores));
    carregarExtintores();
}

window.onload = function() {
    carregarExtintores();
};

// Função para abrir o modal de edição e preencher os campos
function abrirModalDeEdicao(extintor) {
    const modal = document.getElementById('editModal');
    const editPrefixo = document.getElementById('editPrefixo');
    const editNumero = document.getElementById('editNumero');
    const editValidade = document.getElementById('editValidade');
    const editTipo = document.getElementById('editTipo');

    // Preenche os campos com os dados do extintor
    editPrefixo.value = extintor.prefixo;
    editNumero.value = extintor.numero;
    
    // Formata a data para o formato brasileiro (DD/MM/AAAA) e define no campo
    const validadeFormatada = new Date(extintor.validade);
    const validadeISO = validadeFormatada.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    editValidade.value = validadeISO; // O campo 'date' precisa do formato ISO

    editTipo.value = extintor.tipo;

    modal.style.display = 'block';
}
