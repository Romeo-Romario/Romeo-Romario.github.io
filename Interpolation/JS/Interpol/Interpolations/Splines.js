import * as f from "./Linspace.js";

function initialize_matrix(N, b_vec){
    let number_of_equations = N+3
    let Matrix = []
    for (let num = 0; num < number_of_equations; num++){
        Matrix.push(new Array(number_of_equations + 1).fill(0))
        if(num == 0){
            Matrix[num][num] = -1/2;
            Matrix[num][num+2]  = 1/2;
        }
        else if(num == number_of_equations - 1){
            Matrix[num][num] = 1/2;
            Matrix[num][num-2] = -1/2;
        }
        else{
            Matrix[num][num] = 2/3;
            Matrix[num][num-1] = 1/6;
            Matrix[num][num+1] = 1/6;
        }
        Matrix[num][number_of_equations + 1] = b_vec[num];
    }
    return Matrix;
}


function row_mult(matrix, index, number){
    for(let i=0; i < matrix[index].length; i++){
        matrix[index][i] = matrix[index][i]*number;
    }
}

function substract_rows(matrix, newrow_index, mainrow_index){
    let local_multiplaer = matrix[newrow_index][mainrow_index];
    for(let col = mainrow_index; col < matrix[newrow_index].length; col++){
        matrix[newrow_index][col] = matrix[newrow_index][col] - matrix[mainrow_index][col] * local_multiplaer;
    }
}

function coefficients_count(matrix, n){
    let number_of_equations = n+3;
    let multiplier = 0.0;
    let result = [];
    for (let i = 0; i < number_of_equations; i++){
        multiplier = 1/matrix[i][i];
        row_mult(matrix, i, multiplier);
        for(let j=0; j < number_of_equations; j++){
            if(matrix[j][i] === 0 || j === i){
                continue;
            }
            else{
                substract_rows(matrix, j, i);
            }
        }
    }
    for(let last=0; last < matrix.length; last++){
        result.push(matrix[last][number_of_equations + 1]);
    }
    return result
}

function B_1(x){
    if(Math.abs(x) < 1){
        return 1 - Math.abs(x);
    }
    else if(Math.abs(x) >= 1){
        return 0;
    }
}

function B_3(x){
    if(Math.abs(x) < 1){
        return (1/6) * (Math.pow((2 - Math.abs(x)), 3) - 4 * Math.pow((1 - Math.abs(x)), 3));
    }
    else if((Math.abs(x) >= 1) && (Math.abs(x) <= 2)){
        return (1/6) * Math.pow((2-Math.abs(x)), 3);
    }
    else if(Math.abs(x) > 2){
        return 0;
    }
}





export function S_1(x_k, y_k, n, h, x){
    let result =0;
    for(let k = 0; k < n+1; k++){
        result += y_k[k] * B_1((x - x_k[k])/h);
    }
    return result;
}

export function S_3(x_k, y_k, n, func, h, a, b, x){
    let x_vec = [...x_k];
    x_vec.push(x_vec[x_vec.length-1] + h);
    x_vec.splice(0,0,x_vec[0] - h);

    let b_vector = [...y_k];
    b_vector.push(func(b));
    b_vector.splice(0,0, func(a));



    let matrix = initialize_matrix(n, b_vector);
    let alpha_vec = coefficients_count(matrix, n);
    let result = 0.0;

    for (let k = 0; k < n+3; k++){
        result+=alpha_vec[k] * B_3((x - x_vec[k])/h);
    }
    return result;
}


