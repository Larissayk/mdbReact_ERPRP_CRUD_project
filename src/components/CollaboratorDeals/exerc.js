// - Crie uma variável que irá guardar o array com nome e valor dos produtos
// - Crie uma variável 'posicao' para guardar o produto escolhido pelo usuário
// - Crie uma variável 'porcentagem' que irá guardar qual porcentagem o usuário digitou
// - Procure no array qual produto foi escolhido pelo usuário
// - Calcule o desconto do produto
// - Printe na tela a seguinte frase: "Produto xxx com desconto é R$ xxx"

// Dica: você pode usar a função .toFixed(digits) para limitar o numero de casas decimais do desconto.

var produtos = [
  { 
      nome: "Torta de maçã", 
      preco: 7.5 
  },
  {
    nome: "Bolo",
    preco: 4.0
  },
  {
    nome: "Mousse",
    preco: 5.25
  },
  {
    nome: "Pudim de leite",
    preço: 6.7
  }
];

// var readline = require('readline-sync');
// var produtoEscolhido = parseInt(readline.question("Escolha um número de 0 a 3, onde 0: Torta de maçã, 1: Bolo, 2: Mousse, 3: Pudim de Leite."));
// var porcentagem = parseInt(readline.question(  "Escolha um número de 0 a 100, referente a porcentagem do desconto"));
var produtoEscolhido = parseInt(prompt('Escolha um número de 0 a 3, onde 0: Torta de maçã, 1: Bolo, 2: Mousse, 3: Pudim de Leite.'));
console.log(`produto escolhido: ${produtoEscolhido}, ${produto[produtoEscolhido].nome}`);
var porcentagem = parseInt(prompt('Escolha um número de 0 a 100, referente a porcentagem do desconto'));
console.log(`porcentagem: ${porcentagem}`);
var valorDesconto = (((produto[produtoEscolhido].preco)/porcentagem)*100).toFixed(2);
console.log(`Valor desconto: ${valorDesconto}`);

console.log(`O valor do produto ${produto[produtoEscolhido].nome} com desconto de ${porcentagem}% é R$${valorDesconto}`);