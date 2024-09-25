import Chart from 'chart.js/auto';
import { GenerateArray } from './Diagrams/byCategoryDiagrmas';
import { GenerateInfo } from './Diagrams/IncomOutcomeDgr';

const id = localStorage.getItem('id');
const ctx = document.getElementById('chart2');

const red = '#EE5454';
const green = '#65D8A4';
const blue = '#6F86FF';
const yellow = '#FFBD3C';
const mint = '#C0E1C8';
const pink = '#F79FFF';
const orange = '#FF8D3B';
const cyan = '#5FDEEF';
const purple = '#BB76F1';

const categories = ['Hogar', 'Salud', 'Arriendo', 'Facturas y mensualidades', 'Alimentación', 'Transporte', 'Entretenimiento', 'Ropa', 'Varios'];
const dataNumber = await GenerateArray(1)
const options = {
  responsive: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: 'teko', // Cambia la fuente de las etiquetas del eje x
          size: 1, // Cambia el tamaño de la fuente de las etiquetas del eje x
          weight: 100,
        },
        color: '#121212',
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      ticks: {
        font: {
          family: 'teko', // Cambia la fuente de las etiquetas del eje x
          size: 1, // Cambia el tamaño de la fuente de las etiquetas del eje x
        },
      },
    },
  },
};

 new Chart(ctx, {
    type: 'pie',
    data: {
      labels: categories,
      datasets: [{
        label: 'Total',
        data: dataNumber,
        borderWidth: 1,
        backgroundColor: [
            green, mint, cyan, blue, purple, pink, red, orange, yellow
        ],
        borderColor: [
            green, mint, cyan, blue, purple, pink, red, orange, yellow
        ]
      }]
    },
    options: options
  });

//----------------------------------------------------------------

// Dropdown table content

const array = await GenerateArray(id);

const HogarCat = array[0];
const SaludCat = array[1];
const ArriendoCat = array[2];
const FacturasMensualidadesCat = array[3];
const AlimentacionCat = array[4];
const TransporteCat = array[5];
const EntretenimientoCat = array[6];
const RopaCat = array[7];
const VariosCat = array[8];

const arrayTwo = await GenerateInfo(id);
const outcomes = arrayTwo[0];

const HogarPer = Math.round((HogarCat / outcomes) * 100);
const SaludPer = Math.round((SaludCat / outcomes) * 100);
const ArriendoPer = Math.round((ArriendoCat / outcomes) * 100);
const FacturasMensualidadesPer = Math.round((FacturasMensualidadesCat / outcomes) * 100);
const AlimentacionPer = Math.round((AlimentacionCat / outcomes) * 100);
const TransportePer = Math.round((TransporteCat / outcomes) * 100);
const EntretenimientoPer = Math.round((EntretenimientoCat / outcomes) * 100);
const RopaPer = Math.round((RopaCat / outcomes) * 100);
const VariosPer = Math.round((VariosCat / outcomes) * 100);

console.log(`
  ${HogarCat}
  ${SaludCat}
  ${ArriendoCat}
  ${FacturasMensualidadesCat}
  ${AlimentacionCat}
  ${TransporteCat}
  ${EntretenimientoCat}
  ${RopaCat}
  ${VariosCat}
Total: ${outcomes}`);

const PieSpents = document.getElementById('PieSpents');

PieSpents.innerHTML = `
<tr class="hogar1">
  <th scope="row"><i class="bi bi-house-fill"></i></th>
  <td>Hogar</td>
  <td>$${HogarCat}</td>
  <td>${HogarPer}%</td>
</tr>
<tr class="salud1">
  <th scope="row"><i class="bi bi-bandaid-fill"></i></th>
  <td>Salud</td>
  <td>$${SaludCat}</td>
  <td>${SaludPer}%</td>
</tr>
<tr class="arriendo1">
  <th scope="row"><i class="bi bi-building-exclamation"></i></th>
  <td>Arriendo</td>
  <td>$${ArriendoCat}</td>
  <td>${AlimentacionPer}%</td>
</tr>
<tr class="facturas1">
  <th scope="row"><i class="bi bi-receipt"></i></th>
  <td>Facturas y mensualidades</td>
  <td>$${FacturasMensualidadesCat}</td>
  <td>${FacturasMensualidadesPer}%</td>
</tr>
<tr class="alimentacion1">
  <th scope="row"><i class="bi bi-basket2-fill"></i></th>
  <td>Alimentación</td>
  <td>$${AlimentacionCat}</td>
  <td>${AlimentacionPer}%</td>
</tr>
<tr class="transporte1">
  <th scope="row"><i class="bi bi-car-front-fill"></i></th>
  <td>Transporte</td>
  <td>$${TransporteCat}</td>
  <td>${TransportePer}%</td>
</tr>
<tr class="entretenimiento1">
  <th scope="row"><i class="bi bi-emoji-smile-fill"></i></th>
  <td>Entretenimiento</td>
  <td>$${EntretenimientoCat}</td>
  <td>${EntretenimientoPer}%</td>
</tr>
<tr class="ropa1">
  <th scope="row"><img src="../../public/imgs/shirt.svg" alt="shirt"></th>
  <td>Ropa</td>
  <td>$${RopaCat}</td>
  <td>${RopaPer}%</td>
</tr>
<tr class="varios1">
  <th scope="row"><i class="bi bi-box-seam-fill"></i></th>
  <td>Varios</td>
  <td>$${VariosCat}</td>
  <td>${VariosPer}%</td>
</tr>
<tr class="total1">
  <td colspan="2">TOTAL</td>
  <td>$${outcomes}</td>
</tr>
`;