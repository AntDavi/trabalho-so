import Frame from '../frames/ReferenciaSegundaChance.js';

export const SegundaChance = ({
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

  const intervalosDeFrames = Math.round((MAX_FRAME_Q2 - MIN_FRAME_Q1) / (QUANTIDADES_DE_TESTES)) + 1;
  const numerosDeFrames = typeof (QUANTIDADES_DE_TESTES) === 'string' ? +intervalosDeFrames : QUANTIDADES_DE_TESTES.length;

  let interV = MIN_FRAME_Q1;
  for (let indexTeste = 0; indexTeste < numerosDeFrames; indexTeste++) {
    const frameDoTesteAtual = typeof (QUANTIDADES_DE_TESTES) === 'string' ? interV : QUANTIDADES_DE_TESTES[indexTeste];
    interV += +QUANTIDADES_DE_TESTES;

    let frame = [];

    let cont = (MAX_REFERENCIAS_PARA_RESETAR - 1);

    /** COMEÇO DO ALGORITMO - SEGUNDA CHANCE */
    for (let index = 0; index < separandoItens.length; index++) {
      const pagina = separandoItens[index];
      const paginaEstaNoFrame = frame.findIndex((e) => {
        return e.index === pagina;
      })

      if (paginaEstaNoFrame !== -1) {
        if (frame[paginaEstaNoFrame].isRef === 0) {
          frame[paginaEstaNoFrame].alterarRef();
        }
        acertos += 1;
      } else {
        faltas += 1;
        if (frame.length < frameDoTesteAtual) {
          const referencia = new Frame(pagina, 1);
          frame.push(referencia);
        } else {

          let achouMenor = false;
          const novaLista = frame.slice();

          frame.some((pagina) => {
            if (pagina.isRef === 0) {
              novaLista.shift();
              achouMenor = true;
              return true;
            } else {
              novaLista.shift();
              const data = new Frame(pagina.index, 0);
              novaLista.push(data);
            }
          });

          if (!achouMenor) {
            novaLista.shift();
          }

          const novaPagina = new Frame(pagina, 1);
          frame = novaLista;
          frame.push(novaPagina);
        }
      }
      if (index === cont) {
        cont += MAX_REFERENCIAS_PARA_RESETAR;
        frame.forEach((pagina) => {
          pagina.zerarRef();
        })
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
