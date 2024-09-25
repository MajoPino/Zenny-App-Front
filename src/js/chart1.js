import Chart from 'chart.js/auto';
import { GenerateArray } from './Diagrams/byCategoryDiagrmas';
import { GenerateInfo } from './Diagrams/IncomOutcomeDgr';

const id = localStorage.getItem('id');

const DateToday = new Date();
const dayToday = DateToday.getDate();
const monthToday = DateToday.getMonth();

var exactMonth;

switch (monthToday) {
  case 0:
    exactMonth = 'Enero';
    break;

  case 1:
    exactMonth = 'Febrero';
    break;

  case 2:
    exactMonth = 'Marzo';
    break;

  case 3:
    exactMonth = 'Abril';
    break;

  case 4:
    exactMonth = 'Mayo';
    break;

  case 5:
    exactMonth = 'Junio';
    break;

  case 6:
    exactMonth = 'Julio';
    break;

  case 7:
    exactMonth = 'Agosto';
    break;

  case 8:
    exactMonth = 'Septiembre';
    break;

  case 9:
    exactMonth = 'Octubre';
    break;

  case 10:
    exactMonth = 'Noviembre';
    break;

  case 11:
    exactMonth = 'Diciembre';
    break;

}

console.log(exactMonth + ' ' + dayToday)

const dateMonth = document.getElementById('dateMonth');

dateMonth.innerHTML = `<h2 class="mb-1 dateMonth">${exactMonth} ${dayToday}</h2>`;

const ctx = document.getElementById('chart1');

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
const dataNumber = await GenerateArray(id)
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
          size: 15, // Cambia el tamaño de la fuente de las etiquetas del eje x
          weight: 100,
        },
        color: '#c0e1c8',
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
          size: 19, // Cambia el tamaño de la fuente de las etiquetas del eje x
        },
      },
    },
  },
};

new Chart(ctx, {
  type: 'bar',
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

const BarchartOne = document.getElementById('BarchartOne');

BarchartOne.innerHTML = `
<tr class="hogar1">
  <th scope="row"><i class="bi bi-house-fill"></i></th>
  <td>Hogar</td>
  <td>$${HogarCat}</td>
</tr>
<tr class="salud1">
  <th scope="row"><i class="bi bi-bandaid-fill"></i></th>
  <td>Salud</td>
  <td>$${SaludCat}</td>
</tr>
<tr class="arriendo1">
  <th scope="row"><i class="bi bi-building-exclamation"></i></th>
  <td>Arriendo</td>
  <td>$${ArriendoCat}</td>
</tr>
<tr class="facturas1">
  <th scope="row"><i class="bi bi-receipt"></i></th>
  <td>Facturas y mensualidades</td>
  <td>$${FacturasMensualidadesCat}</td>
</tr>
<tr class="alimentacion1">
  <th scope="row"><i class="bi bi-basket2-fill"></i></th>
  <td>Alimentación</td>
  <td>$${AlimentacionCat}</td>
</tr>
<tr class="transporte1">
  <th scope="row"><i class="bi bi-car-front-fill"></i></th>
  <td>Transporte</td>
  <td>$${TransporteCat}</td>
</tr>
<tr class="entretenimiento1">
  <th scope="row"><i class="bi bi-emoji-smile-fill"></i></th>
  <td>Entretenimiento</td>
  <td>$${EntretenimientoCat}</td>
</tr>
<tr class="ropa1">
  <th scope="row"><img src="../../public/imgs/shirt.svg" alt="shirt"></th>
  <td>Ropa</td>
  <td>$${RopaCat}</td>
</tr>
<tr class="varios1">
  <th scope="row"><i class="bi bi-box-seam-fill"></i></th>
  <td>Varios</td>
  <td>$${VariosCat}</td>
</tr>
<tr class="total1">
  <td colspan="2">TOTAL</td>
  <td>$${outcomes}</td>
</tr>

`;


/* const incomes = arrayTwo[1]; */