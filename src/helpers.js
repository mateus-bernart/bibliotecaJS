function filtraOcorrencias(paragrafo) {
  return Object.keys(paragrafo).filter((chave) => paragrafo[chave] > 1);
  //retorna um array apenas com chaves com +1 palavras
}

function montaSaidaArquivo(listaPalavras) {
  let textoFinal = "";
  listaPalavras.forEach((paragrafo, indice) => {
    const duplicadas = filtraOcorrencias(paragrafo).join(", "); // array

    // retira paragrafos sem palavras duplicadas
    if (duplicadas.length > 1) {
      textoFinal += `Palavras duplicadas no parágrafo ${
        indice + 1
      }: ${duplicadas} \n`;
    }
  });
  return textoFinal;
}

export { montaSaidaArquivo };
