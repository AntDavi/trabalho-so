import { FIFO } from './src/components/FIFO.js';
import { SegundaChance } from './src/components/SegundaChance.js';
import { MRU } from './src/components/MRU.js';
import { NUR } from './src/components/NUR.js';

const respostaCorreta = {
  Frames: [50, 70, 90],
  FIFO: [480, 662, 833],
  SegundaChance: [488, 666, 837],
  NUR: [484, 671, 839],
  MRU: [478, 657, 824],
}

function iniciarAlgortimos(grafico) {
  const valorTesteURI = document.getElementById('file');
  const bitR = document.getElementById('bitr').value;

  const quantidadesTeste = document.getElementById('interval-test').value;
  const Q1 = document.getElementById('min').value;
  const Q2 = document.getElementById('max').value;

  console.table(respostaCorreta);
  let data = {};

  let fileExtension = /text.*/;
  let fileTobeRead = valorTesteURI.files[0];
  if (fileTobeRead.type.match(fileExtension)) {
    let fileReader = new FileReader();
    fileReader.onload = function (e) {
      data = {
        VAR_TESTE_INCIAL: fileReader.result,
        MAX_REFERENCIAS_PARA_RESETAR: +bitR,
        QUANTIDADES_DE_TESTES: quantidadesTeste,
        MIN_FRAME_Q1: +Q1,
        MAX_FRAME_Q2: +Q2,
      }
      //Limpa dados do grafico
      grafico.data.labels.pop();
      grafico.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });
      grafico.update();
      //Inicia os algortimos
      const [dataFIFO, legendaBaixo] = FIFO(data);
      const dataMRU = MRU(data);
      const dataSG = SegundaChance(data);
      const dataNUR = NUR(data);
      //Estrutura pra o grafico
      const dataEstrutura = [
        {
          label: 'FIFO',
          data: dataFIFO,
          borderColor: "red",
          fill: false
        },
        {
          label: 'MRU',
          data: dataMRU,
          borderColor: "green",
          fill: false
        },
        {
          label: 'Segunda Chance',
          data: dataSG,
          borderColor: "blue",
          fill: false
        },
        {
          label: 'NUR',
          data: dataNUR,
          borderColor: "orange",
          fill: false
        },
      ]
      //Inicia um novo grafico
      grafico.data.labels = legendaBaixo;
      grafico.data.datasets = dataEstrutura;
      grafico.update();

      document.getElementById("tbody").innerHTML = '';

      for (var i = 0; i < dataFIFO.length; i++) {
        document.getElementById("tbody").innerHTML += `
          <tr class="table__row">
            <td class="row__cell">${legendaBaixo[i]}</td>
            <td class="row__cell">${dataFIFO[i]}</td>
            <td class="row__cell">${dataSG[i]}</td>
            <td class="row__cell">${dataNUR[i]}</td>
            <td class="row__cell">${dataMRU[i]}</td>
          </tr>
        `;
      }
    }
    fileReader.readAsText(fileTobeRead);
  }
}

(() => {

  const grafico = new Chart("myChart", {
    type: "line",
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      legend: {
        display: true,
        position: 'bottom',
      }
    }
  });

  document.getElementById('calcular').addEventListener('click', () => iniciarAlgortimos(grafico));
  const teste = {
    VAR_TESTE_INCIAL: '2W-1R-5R-5W-2R-0W-2R-7R-1W-7W-2R-7W-4R-2R-6W-1W-2W-3W-7R-5R',
    MAX_REFERENCIAS_PARA_RESETAR: 10,
    QUANTIDADES_DE_TESTES: [4],
    MIN_FRAME_Q1: 4,
    MAX_FRAME_Q2: 9,
  };

  console.log('TESTE', NUR(teste));
})();