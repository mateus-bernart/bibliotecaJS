//command line interface

//npm init -y (criou package.json)
// type: module

import path from "path";
import { contaPalavras } from "./index.js";
import fs from "fs";
import trataErros from "./erros/funcoesErro.js";
import { montaSaidaArquivo } from "./helpers.js";
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
  .version("0.0.1")
  .option("-t, --texto <string>", "Caminho do texto a ser processado")
  .option(
    "-d, --destino <string>",
    "Caminho da pasta onde salvar o arquivo de resultados"
  )
  .action((options) => {
    const { texto, destino } = options; //desestruturação, pegando variaveis de options e salvando dentro de duas variaveis separadas
    if (!texto || !destino) {
      console.error(
        chalk.red("Erro: Favor inserir caminho de origem e destino")
      );
      program.help();
      return;
    }

    const caminhoTexto = path.resolve(texto);
    const caminhoDestino = path.resolve(destino);

    try {
      processaArquivo(caminhoTexto, caminhoDestino);
      console.log(chalk.green("Texto processado com sucesso!"));
    } catch (erro) {
      console.log(chalk.red("Ocorreu um erro no processamento: "), erro);
    }
  });

program.parse();

function processaArquivo(texto, destino) {
  fs.readFile(texto, "utf-8", (erro, texto) => {
    try {
      if (erro) throw erro; //captura o erro na sua primeira instancia e lança para o catch interrompendo o fluxo
      const resultado = contaPalavras(texto);
      criaESalvaArquivo(resultado, destino);
    } catch (erro) {
      //captura o erro para nao se propagar e informar coisas abstratas.
      console.log(trataErros(erro));
    }
  });
}

async function criaESalvaArquivo(listaPalavras, endereco) {
  const arquivoNovo = `${endereco}/resultado.txt`;
  const textoPalavras = montaSaidaArquivo(listaPalavras);
  try {
    await fs.promises.writeFile(arquivoNovo, textoPalavras);
    console.log("arquivo criado");
  } catch (erro) {
    throw erro;
  }
}

//Then
// function criaESalvaArquivo(listaPalavras, endereco) {
//   const arquivoNovo = `${endereco}/resultado.txt`;
//   const textoPalavras = JSON.stringify(listaPalavras);

//   fs.promises
//     .writeFile(arquivoNovo, textoPalavras)
//     .then(() => {
//       console.log("Arquivo criado!");
//     })
//     .catch((erro) => {
//       throw erro;
//     })
//     .finally(() => console.log("Operação finalizada."));
// }

//sincrono: um apos o outro
//assincrono: paralelo a outros processos/requisições
// - leitura e manipulacao de arquivos em disco
// - comunicacao entre cliente e servidor
// - operacoes em banco de dados

// promessas: (object promise) representa a eventual conclusao (ou falha) de uma operacao assincrona e seu valor resultante.
// funcoes assincronas retornam objetos promise.

//diferenca async await e then
//facilidade de escrita do async
