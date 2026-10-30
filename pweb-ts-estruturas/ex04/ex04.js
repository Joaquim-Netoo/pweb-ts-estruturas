const formatarReal = (valor) => {
    return `R$ ${valor.toFixed(2)}`;
};
const formatarMeses = (meses) => {
    const anos = Math.floor(meses / 12);
    const resto = meses % 12;
    const textoAnos = `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    const textoMeses = `${resto} ${resto === 1 ? 'mês' : 'meses'}`;
    if (anos === 0) {
        return textoMeses;
    }
    if (resto === 0) {
        return textoAnos;
    }
    return `${textoAnos} e ${textoMeses}`;
};
function calcularMeses(meta, deposito, taxa = 0.5) {
    let meses = 0;
    let saldo = 0;
    let depositado = 0;
    while (saldo < meta) {
        meses++;
        saldo = saldo * (1 + taxa / 100) + deposito;
        depositado += deposito;
        // Em dezembro, o 13º salário vira um depósito extra.
        if (meses % 12 === 0) {
            saldo += deposito;
            depositado += deposito;
        }
        if (meses === 600) {
            break;
        }
    }
    return { meses, saldo, depositado };
}
function exibirValor(rotulo, valor, formatar) {
    return `${rotulo}: ${formatar(valor)}`;
}
const campoMeta = document.getElementById('meta');
const campoDeposito = document.getElementById('deposito');
const campoTaxa = document.getElementById('taxa');
const botao = document.getElementById('calcular');
const saida = document.getElementById('resultado');
botao.addEventListener('click', () => {
    const meta = Number(campoMeta.value);
    const deposito = Number(campoDeposito.value);
    if (meta <= 0 || deposito <= 0) {
        saida.textContent = 'Informe valores positivos';
        saida.className = 'erro';
        return;
    }
    const { meses, saldo, depositado } = campoTaxa.value === ''
        ? calcularMeses(meta, deposito)
        : calcularMeses(meta, deposito, Number(campoTaxa.value));
    // O saldo decide, porque a meta pode ser atingida justamente no mês 600.
    if (saldo < meta) {
        saida.textContent = [
            'Meta inalcançável em 50 anos.',
            exibirValor(`Saldo após ${meses} meses`, saldo, formatarReal),
        ].join('\n');
        saida.className = 'erro';
        return;
    }
    // Abaixo de 12 meses, a contagem e o texto por extenso seriam iguais.
    const prazo = meses >= 12 ? `${meses} meses (${formatarMeses(meses)})` : formatarMeses(meses);
    saida.textContent = [
        `Você atinge a meta em ${prazo}.`,
        exibirValor('Saldo final', saldo, formatarReal),
        exibirValor('Total depositado', depositado, formatarReal),
        exibirValor('Rendimento', saldo - depositado, formatarReal),
    ].join('\n');
    saida.className = 'sucesso';
});
export {};
//# sourceMappingURL=ex04.js.map