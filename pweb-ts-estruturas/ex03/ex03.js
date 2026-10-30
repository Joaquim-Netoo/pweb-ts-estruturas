function calcularTotal(valor, parcelas) {
    return parcelas <= 3 ? valor : valor * 1.02 ** parcelas;
}
function simularParcelamento(preco, entrada) {
    let financiado = preco;
    if (typeof entrada !== 'undefined') {
        financiado = preco - entrada;
    }
    let linhas = '';
    for (let parcelas = 1; parcelas <= 12; parcelas++) {
        if (parcelas === 7 || parcelas === 8 || parcelas === 9 || parcelas === 11) {
            continue;
        }
        const total = calcularTotal(financiado, parcelas);
        const valorParcela = total / parcelas;
        if (valorParcela < 50) {
            break;
        }
        const juros = parcelas <= 3 ? 'sem juros' : '2% a.m.';
        linhas += `<tr><td>${parcelas}x</td><td>R$ ${valorParcela.toFixed(2)}</td><td>R$ ${total.toFixed(2)}</td><td>${juros}</td></tr>`;
    }
    return linhas;
}
const campoPreco = document.getElementById('preco');
const campoEntrada = document.getElementById('entrada');
const botao = document.getElementById('simular');
const saida = document.getElementById('resultado');
const corpoTabela = document.getElementById('parcelas');
botao.addEventListener('click', () => {
    const preco = Number(campoPreco.value);
    const entradaVazia = campoEntrada.value === '';
    const entrada = Number(campoEntrada.value);
    corpoTabela.innerHTML = '';
    if (preco <= 0 || entrada < 0) {
        saida.textContent = 'Informe valores válidos';
        saida.className = 'erro';
        return;
    }
    if (entrada >= preco) {
        saida.textContent = 'A entrada cobre o valor total. Não há parcelas.';
        saida.className = 'alerta';
        return;
    }
    saida.textContent = `Valor financiado: R$ ${(preco - entrada).toFixed(2)}`;
    saida.className = '';
    corpoTabela.innerHTML = entradaVazia ? simularParcelamento(preco) : simularParcelamento(preco, entrada);
});
export {};
//# sourceMappingURL=ex03.js.map