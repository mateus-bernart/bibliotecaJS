export function contaPalavras(texto) {
  const paragrafos = extraiParagrafos(texto);
  //flatMap é um filter com o map, ele adiciona elementos encapsulados em outros arrays na array principal
  const contagem = paragrafos.flatMap((paragrafo) => {
    if (!paragrafo) return [];
    return verificaPalavrasDuplicadas(paragrafo);
  });
  return contagem;
  //pode ser usado .reduce tambem
}

export function extraiParagrafos(texto) {
  return texto.toLowerCase().split("\n");
}

export function limpaPalavras(palavra) {
  return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

export function verificaPalavrasDuplicadas(texto) {
  const listaPalavras = texto.split(" ");
  const resultado = {};
  // objeto[propriedade] = valor;
  listaPalavras.forEach((palavra) => {
    if (palavra.length >= 3) {
      const palavraLimpa = limpaPalavras(palavra);
      resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
    }
  });
  return resultado;
}
