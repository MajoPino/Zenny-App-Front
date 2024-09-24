import Chart from 'chart.js/auto';
import { GenerateInfo, utility } from './Diagrams/IncomOutcomeDgr';

const ctx = document.getElementById('chart3');

const red = '#EE5454';
const green = '#65D8A4';
const blue = '#6F86FF';
const yellow = '#FFBD3C';
const mint = '#C0E1C8';
const pink = '#F79FFF';
const orange = '#FF8D3B';
const cyan = '#5FDEEF';
const purple = '#BB76F1';

const categories = ['Gastos', 'Ingresos'];
const dataNumber = await GenerateInfo(1)
const options = {
  responsive: true,
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
        red, green
      ],
      borderColor: [
        red, green
      ]
    }]
  },
  options: options
});

// Dropdown table content

const id = 1;

const array = await GenerateInfo(id); 
const outcomes = array[0];
const incomes = array[1];
  
console.log(outcomes);
console.log(incomes);

const utilityR = await utility(array);
console.log(utility);

const IncomeOutcome = document.getElementById('IncomeOutcome')
console.log(IncomeOutcome);

IncomeOutcome.innerHTML = `
<tr class="gastos1">
  <th scope="row"><i class="bi bi-arrow-down"></i></th>
  <td>Gastos</td>
  <td>$${outcomes}</td>
</tr>
<tr class="ingresos1">
  <th scope="row"><i class="bi bi-arrow-up"></i></th>
  <td>Ingresos</td>
  <td>$${incomes}</td>
</tr>
<tr class="total1">
  <td>Utilidad</td>
  <td>$${utilityR}</td>
</tr>`