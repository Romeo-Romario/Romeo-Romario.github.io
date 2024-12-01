import * as f from "./Interpolations/Linspace.js";
import * as L from "./Interpolations/Lagrange.js";
import * as N from "./Interpolations/Nyton.js";
import * as t from "./Interpolations/Trigonometry.js";
import * as S from "./Interpolations/Splines.js";
import { Univerasal } from "./Counting.js";
import { get_method, get_polinomial_degree } from "../Inteface/storage.js";
import { get_func_el } from "../Inteface/mathFunc.js";


function convertLatexToMathExpression(latexString) {
  let result = latexString;

  // Handle nested fractions iteratively
  while (result.match(/\\frac\s*{[^{}]*}\s*{[^{}]*}/)) {
      result = result.replace(/\\frac\s*{([^{}]*)}\s*{([^{}]*)}/g, '($1)/($2)');
    }

  return result
    .replace(/\\(cos|sin|tan|log|ln|exp)\s*{([^}]*)}/g, '$1($2)') // Handle trigonometric functions
    .replace(/\\cdot/g, '*')                                       // Convert multiplication
    .replace(/\\sqrt\s*{([^}]*)}/g, 'sqrt($1)')                    // Convert square roots
    .replace(/\\left|\\right/g, '')                                // Remove "left" and "right"
    .replace(/[{}]/g, '')                                          // Remove remaining braces
    .replace(/\\/g, '');                                           // Remove stray backslashes
}

function changeLeg(){
  Plotly.relayout(TESTER, { showlegend: false });
}

function changebackLeg(){
  Plotly.relayout(TESTER, { showlegend: true });
}


let TESTER = document.getElementById('tester');

function Update(){


const method = get_method();
let aLimit = Number(document.getElementById("a_limit").value);
let bLimit = Number(document.getElementById("b_limit").value);

if(method === "trigonom"){
  aLimit = 0;
  bLimit = 2*Math.PI;
}

let func_el = get_func_el();
let latexString = func_el.latex();

let str_func = convertLatexToMathExpression(latexString);
console.log(str_func);
let F = math.compile(str_func);
try{
  let inter_points = Math.round(Number(document.getElementById("N_interpolation_point").value), 0);
  if(inter_points < 2){
    alert("Minimum value for Points of Interpolation is 2.");
    inter_points = 2;
  }
  let X = f.linspace(aLimit, bLimit, 300);
  let Y = f.arr_count((x) => F.evaluate({ x }), X);
  let xi = [];
  let yi = [];
  if (method === "trigonom"){
    xi = f.linspace(aLimit, bLimit, inter_points*2);
    yi = f.arr_count((x) => F.evaluate({ x }), xi);
  }
  else if(method === "spline"){
      xi = f.linspace(aLimit, bLimit, inter_points+1);
      yi = f.arr_count((x) => F.evaluate({ x }), xi);
  }
  else{
      xi = f.linspace(aLimit, bLimit, inter_points);
      yi = f.arr_count((x) => F.evaluate({ x }), xi);
  }
  
  
  
  let y_interpolated = [];
  const spline_deg = get_polinomial_degree();
  if(method === "spline"){
      if(spline_deg === 1){
        y_interpolated = Univerasal(xi, yi, str_func, "spline_1", aLimit, bLimit, inter_points, X);
      }
      if(spline_deg === 3){
        y_interpolated = Univerasal(xi, yi, str_func, "spline_3", aLimit, bLimit, inter_points, X);
      }
  }
  else{
    y_interpolated = Univerasal(xi, yi, str_func, method, aLimit, bLimit, inter_points, X);
  }
  


  // Plotly.purge(TESTER);

  Plotly.newPlot( TESTER, [
    {
      x: X,
      y: Y,
      name: "Main function",
      mode: 'lines',
      line:{
        width: 7,
        color: "blue"
      }
    },
    {
      x:xi,
      y:yi,
      name: "Interpolational Points",
      mode: "markers",
      marker: {
        size: 12, 
        color: "red" 
      }
    },
    {
      x:X,
      y:y_interpolated,
      name: "Interpolated Function",
      mode: 'lines',
      line:{
        dash: "dash",
        width: 7,
        color: "purple"
      }
    }
  ],
  {margin: { t: 0 },
  },
  {
    responsive: true,
    scrollZoom: true,
    displayModeBar: false
  },
  );

  
} catch(err){
  console.error("Error evaluating expression:", err);
  alert("Invalid formula");
}


}


document.getElementById("footage").addEventListener("click", Update);
document.getElementById("footage").addEventListener("touchstart", Update);

window.addEventListener('resize', () => {
  if(window.innerWidth <= 700){
     changeLeg();
  }
  else{
     changebackLeg();
  }
})

document.addEventListener("DOMContentLoaded", () => {
    if(window.innerWidth <= 700){
      changeLeg();
  }
  else{
      changebackLeg();
  }
});