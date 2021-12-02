export const MRU = ({
  VAR_TESTE_INCIAL,
  MAX_REFERENCIAS_PARA_RESETAR,
  QUANTIDADES_DE_TESTES,
  MIN_FRAME_Q1,
  MAX_FRAME_Q2,
}) => {
  const separandoItens = VAR_TESTE_INCIAL.replace(/W/g, '').replace(/R/g, '').split('-');
  separandoItens.pop();
  
  const respostas = [];
  let acertos = 0;
  let faltas = 0;

  const intervalosDeFrames = Math.trunc((MAX_FRAME_Q2 - MIN_FRAME_Q1) / (QUANTIDADES_DE_TESTES))+1;
  const numerosDeFrames = typeof(QUANTIDADES_DE_TESTES) === 'string' ? +intervalosDeFrames : QUANTIDADES_DE_TESTES.length;

  let interV = MIN_FRAME_Q1;
  for (let indexTeste = 0; indexTeste < numerosDeFrames; indexTeste++) {
    let frame = [];
    const frameDoTesteAtual = typeof(QUANTIDADES_DE_TESTES) === 'string' ? interV : QUANTIDADES_DE_TESTES[indexTeste];
    interV += +QUANTIDADES_DE_TESTES;

    /** COMEÇO DO ALGORITMO - SEGUNDA CHANCE */
    for (let index = 0; index < separandoItens.length; index++) {
      const pagina = separandoItens[index];
      const paginaEstaNoFrame = frame.findIndex((e) => { 
        return e === pagina; 
      })
      
      if(paginaEstaNoFrame !== -1) {
        if(paginaEstaNoFrame > 0 && paginaEstaNoFrame !== frame.length) {
          const newList = [];

          frame.forEach((nome) => {
            if (nome !== pagina) {
              newList.push(nome);
            }
          });

          newList.push(pagina);
          frame = newList;
        } else if (paginaEstaNoFrame === 0) {
          frame.shift();
          frame.push(pagina);
        }
        acertos += 1;
      } else {
        faltas += 1;
        if(frame.length < frameDoTesteAtual) {
          frame.push(pagina);
        } else {
          frame.shift();
          frame.push(pagina);
        }
      }
    }
    /* FIM DO ALGORITMO - SEGUNDA CHANCE */
    // console.log('ACERTO = ', acertos);
    // console.log('FALTAS = ', faltas);
    respostas.push(acertos);
    acertos = 0;
    faltas = 0;
  }
  return respostas;
};
