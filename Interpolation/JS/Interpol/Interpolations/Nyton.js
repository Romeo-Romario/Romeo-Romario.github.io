import * as f from "./Linspace.js";
function F(i, k, arrX, arrY){
    if(k==1){
        return (arrY[i+1] - arrY[i])/(arrX[i+1] - arrX[i]);
    }
    else{
        return (F(i+1, k-1, arrX, arrY) - F(i, k-1, arrX, arrY))/(arrX[i+k] - arrX[i]);
    }
}

export function Nyton(arrX, arrY, n, x){
    let sum = arrY[0];
    let mult = 1;
    for(let k=0; k < n-1; k++){
        mult *= (x - arrX[k]);
        sum += F(0, k+1, arrX, arrY)*mult;
    }
    return sum;
}
