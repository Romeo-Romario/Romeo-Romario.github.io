import * as f from "./Interpolations/Linspace.js";
import * as L from "./Interpolations/Lagrange.js";
import * as N from "./Interpolations/Nyton.js";
import * as t from "./Interpolations/Trigonometry.js";
import * as S from "./Interpolations/Splines.js";
// import * as math from './mathjs';


export function Univerasal(xi, yi, func, method, a , b, number_of_points, arrX){
    let result = [];
    let h = 1;
    switch(method){
        case "lagrange":
            result = arrX.map(i => L.Lagrang(xi, yi, number_of_points, i));
            break;
        case "nyton":
            result = arrX.map(i=>N.Nyton(xi, yi, number_of_points,i));
            break;
        case "trigonom":
            result = arrX.map(i=>t.T(xi, yi, number_of_points, i));
            break;
        case "spline_1":
            h = (b - a)/number_of_points;
            result = arrX.map(i=>S.S_1(xi, yi, number_of_points, h, i));
            break;
        case "spline_3":
            h = (b - a)/number_of_points;
            result = arrX.map(i=>S.S_3(xi, yi, number_of_points, (x) => math.derivative(func, 'x').compile().evaluate({ x }), h, a, b, i));
            break;
    }
    return result;
}



