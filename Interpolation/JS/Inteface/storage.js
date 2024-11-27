
function F1(x) {
    return Math.sin(x) + 0.5 * Math.sin(3 * x);
}
function F2(x) {
    return (x ** 2 - 1) / (x ** 2 + 1);
}
function F3(x) {
    return (1 / 10) * Math.sin(x ** 3) * 4 * Math.cos(x ** 2);
}
function F4(x) {
    return 1 / (1 + 25 * x ** 2);
}
function F5(x) {
    return 1 / (1 + Math.exp(-x));
}
function F6(x) {
    return Math.exp(-x) * Math.sin(x);
}

function F7(x){
    return Math.exp(-(x**2)/2);
}

let func_dict = new Object();
func_dict["sin(x) + 0.5 * sin(3 * x)"] = F1;
func_dict["(x^2 - 1) / (x^2 + 1)"] = F2;
func_dict["(1 / 10) * sin(x^3) * 4 * cos(x^2)"] = F3;
func_dict["1 / (1 + 25 * x^2)"] = F4;
func_dict["1 / (1 + exp(-x))"] = F5;
func_dict["exp(-x) * sin(x)"] = F6;
func_dict["exp((-x^2)/2)"] = F7;

export function get_dict(){
    return func_dict;
}

let expression = "";
export function set_expression (newexpression){ expression = newexpression; }
export function get_expression (){return expression;}


let method = "";
export function set_method(newmethod){ method = newmethod; }
export function get_method(){return method;}
let polinomail_degree = 1;
export function set_polinomial_degree(new_pol_deg){
    polinomail_degree = new_pol_deg;
}
export function get_polinomial_degree(){return polinomail_degree;}

let chebyshev_nods = false;
export function change_nods(){
    if(chebyshev_nods){
        chebyshev_nods = false;
    }
    else{
        chebyshev_nods = true;
    }}

export function getnodes(){
    return chebyshev_nods;
}
