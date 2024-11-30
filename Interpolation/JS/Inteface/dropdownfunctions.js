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

document.getElementById("LLL").addEventListener("touchstart", _L);
document.getElementById("NNN").addEventListener("touchstart", _N);
document.getElementById("TTT").addEventListener("touchstart", _T);
document.getElementById("SSS").addEventListener("touchstart", _S);

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

document.getElementById("pol_deg_1").addEventListener("touchstart", deg_1);
document.getElementById("pol_deg_3").addEventListener("touchstart", deg_3);

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
document.getElementById("chb_nodes").addEventListener("touchstart", nodes);



