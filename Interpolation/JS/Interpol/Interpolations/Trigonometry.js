import * as f from "./Linspace.js";

function count_A(inter_points_X, inter_points_Y,n){
    let suma = 0;
    let A1 = [];
    for(let k= 0; k < n+1; k++){
        for(let j=0; j < 2*n; j++){
            suma += inter_points_Y[j]*Math.cos(k*inter_points_X[j]);
        }
        A1.push((1/n)*suma);
        suma = 0;
    }
    return A1;
}


function count_B(inter_points_X, inter_points_Y, n){
    let suma = 0;
    let B1 = [];
    for( let k=1; k < n; k++){
        for (let j = 0; j < 2*n; j++){
            suma += inter_points_Y[j]*Math.sin(k*inter_points_X[j]);
        }
        B1.push((1/n)*suma);
        suma = 0;
    }
    return B1;
}


export function T(inter_points_X, inter_points_Y, n, x){
    let A1 = count_A(inter_points_X, inter_points_Y, n);
    let B1 = count_B(inter_points_X, inter_points_Y, n);
    let result = A1[0]/2;
    for(let k = 1; k < n; k++){
        result += (A1[k]*Math.cos(k*x) + B1[k-1]*Math.sin(k*x));
    }

    result += (A1[n]/2)*Math.cos(n*x);
    return  result;
}


