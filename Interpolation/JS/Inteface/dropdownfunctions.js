import { set_expression, set_method , set_polinomial_degree, getnodes, change_nods } from "./storage.js";


function enableInputs(){
    const aInput = document.getElementById("a_limit");
    const bInput = document.getElementById("b_limit");
    
    // Enable input fields
    aInput.disabled = false;
    bInput.disabled = false;

    // Reset values to -1 and 1
    aInput.value = -1;
    bInput.value = 1;
}


let tri_change = false;
let deg_change = false;

const inter_num = "Number of\nPoints of Interpolation:";

function _1(){
    set_expression("sin(x) + 0.5 * sin(3 * x)");
    document.getElementById("leftcell").innerHTML = this.innerHTML;
}
function _2(){
    set_expression("(x^2 - 1) / (x^2 + 1)");
    document.getElementById("leftcell").innerHTML = this.innerHTML;
}
function _3(){
    set_expression("(1 / 10) * sin(x^3) * 4 * cos(x^2)");
    document.getElementById("leftcell").innerHTML = this.innerHTML;
}
function _4(){
    set_expression("1 / (1 + 25 * x^2)");
    document.getElementById("leftcell").innerHTML = this.innerHTML;
}
function _5(){
    set_expression("1 / (1 + exp(-x))");
    document.getElementById("leftcell").innerHTML = this.innerHTML;
}
function _6(){
    set_expression("exp(-x) * sin(x)");
    document.getElementById("leftcell").innerHTML = this.innerHTML;
}
function _7(){
    set_expression("exp((-x^2)/2)");
    document.getElementById("leftcell").innerHTML = this.innerHTML;
}


document.getElementById("WW").addEventListener("click", _1);
document.getElementById("RR").addEventListener("click", _2);
document.getElementById("sincos").addEventListener("click", _3);
document.getElementById("FF").addEventListener("click", _4);
document.getElementById("sigmoid").addEventListener("click", _5);
document.getElementById("exponential_decay_with_oscillations").addEventListener("click", _6);
document.getElementById("gaussian").addEventListener("click", _7);



function _L(){
    set_method("lagrange");
    document.getElementById("rightcell").textContent = "Lagrange";
    if(tri_change){
        enableInputs();
        tri_change = false;
    }
    if(deg_change){
        document.getElementById("inter_point").textContent = inter_num;
        deg_change = false;
    }
}
function _N(){
    set_method("nyton");
    document.getElementById("rightcell").textContent = "Nyton";
    if(tri_change){
        enableInputs();
        tri_change = false;
    }
    if(deg_change){
        document.getElementById("inter_point").textContent = inter_num;
        deg_change = false;
    }
}
function _T(){
    set_method("trigonom");
    document.getElementById("rightcell").textContent = "Trigonometry";
    //Disable a and b inputs
    document.getElementById("a_limit").disabled = true;
    document.getElementById("a_limit").value = 0;
    document.getElementById("b_limit").disabled = true;
    document.getElementById("b_limit").value = (2*Math.PI).toFixed(4);
    tri_change = true;
    if(deg_change){
        document.getElementById("inter_point").textContent = inter_num;
        deg_change = false;
    }
}
function _S(){
    set_method("spline");
    document.getElementById("rightcell").textContent = 'Splines';
    if(tri_change){
        enableInputs();
        tri_change = false;
    }
    document.getElementById("polinomial_degree").disabled = false;
    document.getElementById("inter_point").textContent = "Number of\ninterpolation intervals";
    deg_change = true;
}


document.getElementById("LLL").addEventListener("click", _L);
document.getElementById("NNN").addEventListener("click", _N);
document.getElementById("TTT").addEventListener("click", _T);
document.getElementById("SSS").addEventListener("click", _S);


function deg_1(){
    set_polinomial_degree(1);
    document.getElementById("polinomial_degree").textContent = 1;
}
function deg_3(){
    set_polinomial_degree(3);
    document.getElementById("polinomial_degree").textContent = 3;
}

document.getElementById("pol_deg_1").addEventListener("click", deg_1);
document.getElementById("pol_deg_3").addEventListener("click", deg_3);


//Chebyshev nodes

function nodes(){
    if(getnodes()){
        document.getElementById("chb_nodes").textContent = "Off";
        change_nods();
    }
    else{
        document.getElementById("chb_nodes").textContent = "On";
        change_nods();
    }
}

document.getElementById("chb_nodes").addEventListener("click", nodes);




