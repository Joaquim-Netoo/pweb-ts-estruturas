const formatarReal = (valor) => {
    return `R$ ${valor.toFixed(2)}`;
};
function lerPrecos(texto) {
    const linhas = texto.split('\n');
    const precos = [];
    let ignorados = 0;
    for (let i = 0; i < linhas.length; i++) {
        if (precos.length === 20) {
            break;
        }
        const linha = linhas[i].trim().replace(',', '.');
        if (linha === '') {
            continue;
        }
        const preco = Number(linha);
        if (!Number.isFinite(preco) || preco <= 0) {
            ignorados++;
            continue;
        }
        precos.push(preco);
    }
    return { precos, ignorados };
}
function somarItens(...precos) {
    let soma = 0;
    for (const preco of precos) {
        soma += preco;
    }
    return soma;
}
function calcularDesconto(total, valor) {
    if (typeof valor === 'number') {
        return (total * valor) / 100;
    }
    switch (valor.toUpperCase()) {
        case 'BEMVINDO':
            return calcularDesconto(total, 10);
        case 'PROMO20':
            return calcularDesconto(total, 20);
        case 'MENOS15':
            return total >= 100 ? 15 : 0;
        default:
            return 0;
    }
}
const campoItens = document.getElementById('itens');
const campoCupom = document.getElementById('cupom');
const campoFidelidade = document.getElementById('fidelidade');
const botao = document.getElementById('fechar');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const { precos, ignorados } = lerPrecos(campoItens.value);
    if (precos.length === 0) {
        saida.textContent = 'Nenhum item válido';
        saida.className = 'erro';
        return;
    }
    const textoIgnorados = ignorados > 0 ? ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})` : '';
    const subtotal = somarItens(...precos);
    const linhas = [`Itens: ${precos.length}${textoIgnorados}`, `Subtotal: ${formatarReal(subtotal)}`];
    let total = subtotal;
    const cupom = campoCupom.value.trim().toUpperCase();
    if (cupom !== '') {
        const descontoCupom = calcularDesconto(total, cupom);
        linhas.push(descontoCupom > 0 ? `Cupom ${cupom}: - ${formatarReal(descontoCupom)}` : 'Cupom inválido ou não aplicável');
        total -= descontoCupom;
    }
    if (campoFidelidade.checked) {
        const descontoFidelidade = calcularDesconto(total, 5);
        linhas.push(`Fidelidade (5%): - ${formatarReal(descontoFidelidade)}`);
        total -= descontoFidelidade;
    }
    linhas.push(`Total a pagar: ${formatarReal(total)}`);
    saida.textContent = linhas.join('\n');
    saida.className = 'sucesso';
});
export {};
//# sourceMappingURL=ex05.js.map