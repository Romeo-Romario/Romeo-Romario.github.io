import * as f from "./Linspace.js";

export function Lagrang(X, Y, n, x){
    let Sum = 0;
    for(let i = 0; i < n; i++){
        let top = 1;
        let bottom = 1;
        for(let j = 0; j < n; j++){
            if(j===i){
                continue;
            }
            else{
                top *= (x - X[j]);
                bottom *= (X[i] - X[j]);
            }
        }
        Sum += Y[i] * (top/bottom);
    }
    return Sum;
}
