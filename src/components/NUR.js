import Frame from "../frames/ReferenciaNUR.js";


export const NUR = ({
  VAR_TESTE_INCIAL,
  MAX_REFERENCIAS_PARA_RESETAR,
  QUANTIDADES_DE_TESTES,
  MIN_FRAME_Q1,
  MAX_FRAME_Q2,
}) => {
  const separandoItens = VAR_TESTE_INCIAL.split('-');
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

    const frame = [];

    let classesRef = {
      index: -1,
      classe: 5,
    };

    let cont = (MAX_REFERENCIAS_PARA_RESETAR - 1);

    /** COMEÇO DO ALGORITMO - NUR */
    for (let index = 0; index < separandoItens.length; index++) {

      const paginaComSigla = separandoItens[index];
      const paginaType = paginaComSigla[paginaComSigla.length - 1];
      const pagina = +paginaComSigla.replace(/.$/, '');

      const paginaEstaNoFrame = frame.findIndex((e) => { //Criar função buscar na memoria 
        return e.index === pagina;
      })

      if (paginaEstaNoFrame !== -1) {//Quando ja existe na memoria
        frame[paginaEstaNoFrame].alterarRef(paginaType);
        acertos += 1;
      } else {//Quando não existe na memoria
        faltas += 1;
        if (frame.length < frameDoTesteAtual) {//Quando tem espaço na memoria
          const referencia = new Frame(pagina, paginaType);
          frame.push(referencia);
        } else {//Quando a memoria da cheia
          classesRef = {
            index: -1,
            classe: 5,
          };

          frame.some((pagina, index) => {
            if (pagina.classe < classesRef.classe) {
              classesRef = {
                index: index,
                classe: pagina.classe,
              }
            }
            if (pagina.classe === 0) {
              return true;
            }
          });
          const substituir = classesRef.index;
          const estruturaPagina = new Frame(pagina, paginaType);
          frame.splice(substituir, 1);
          frame.push(estruturaPagina);
        }
      }
      if (index === cont) {
        cont += MAX_REFERENCIAS_PARA_RESETAR;
        frame.forEach((pagina) => {
          pagina.zerarRef();
        })
      }
    }
    /* FIM DO ALGORITMO - NUR */
    respostas.push(acertos);
    // console.log('ACERTO = ', acertos);
    // console.log('FALTAS = ', faltas);
    acertos = 0;
    faltas = 0;
  }
  return respostas
};
