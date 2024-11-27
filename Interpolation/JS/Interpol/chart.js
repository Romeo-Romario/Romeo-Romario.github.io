import * as f from "./Interpolations/Linspace.js";
import * as L from "./Interpolations/Lagrange.js";
import * as N from "./Interpolations/Nyton.js";
import * as t from "./Interpolations/Trigonometry.js";
import * as S from "./Interpolations/Splines.js";
import { Univerasal } from "./Counting.js";
import { get_dict, get_expression, get_method, get_polinomial_degree } from "../Inteface/storage.js";


// const xValues = [100,200,300,400,500,600,700,800,900,1000];

// new Chart("myChart", {
//   type: "line", // Default type for the chart
//   data: {
//     labels: xValues,
//     datasets: [{
//       type: "scatter",  // Set the first dataset to scatter
//       data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
//       borderColor: "red",
//       backgroundColor: "red", // Color of points
//       pointStyle: 'circle',   // Shape of points
//       fill: false
//     },{
//       data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
//       borderColor: "green",
//       fill: false
//     },{
//       data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
//       borderColor: "blue",
//       fill: false
//     }]
//   },
//   options: {
//     legend: {display: true}
//   }
// });

let myChart = null;

function Update(){

const method = get_method();
let aLimit = Number(document.getElementById("a_limit").value);
let bLimit = Number(document.getElementById("b_limit").value);

if(method === "trigonom"){
  aLimit = 0;
  bLimit = 2*Math.PI;
}

const expr = get_expression();
const dect = get_dict();
const inter_points = Math.round(Number(document.getElementById("N_interpolation_point").value), 0);
let X = f.linspace(aLimit, bLimit, 300);
let Y = f.arr_count(dect[expr], X);
let xi = [];
let yi = [];
if (method === "trigonom"){
  xi = f.linspace(aLimit, bLimit, inter_points*2);
  yi = f.arr_count(dect[expr], xi);
}
else if(method === "spline"){
    xi = f.linspace(aLimit, bLimit, inter_points+1);
    yi = f.arr_count(dect[expr], xi);
}
else{
    xi = f.linspace(aLimit, bLimit, inter_points);
    yi = f.arr_count(dect[expr], xi);
}



let y_interpolated = [];
const spline_deg = get_polinomial_degree();
if(method === "spline"){
    if(spline_deg === 1){
      y_interpolated = Univerasal(xi, yi, expr, "spline_1", aLimit, bLimit, inter_points, X);
    }
    if(spline_deg === 3){
      y_interpolated = Univerasal(xi, yi, expr, "spline_3", aLimit, bLimit, inter_points, X);
    }
}
else{
  y_interpolated = Univerasal(xi, yi, expr, method, aLimit, bLimit, inter_points, X);
}

let y_scat = [];
let index = 0;
for(let i = 0; i < X.length; i++){
    if(Y[i] === yi[index]){
        y_scat.push(yi[index]);
        index++;
    }
    else{
        y_scat.push(0);
    }
}


if (myChart) {
    myChart.destroy();
}


const ctx = document.getElementById("myChart").getContext("2d");


myChart = new Chart("myChart", {
  type: "line", // Default type for the chart
  data: {
    labels: X,
    datasets: [{
      data: Y,
      borderColor: "blue",
      fill: false,
      label: "Basic function",
      pointRadius: 0
    },{
      data: y_interpolated,
      borderColor: "red",
      fill: false,
      label: "Interpolated",
      pointRadius: 0
    }]
  },
  options: {
      legend: {display: true},
      responsive: true,
      grid: false
    }
});
}


document.getElementById("footage").addEventListener("click", Update);