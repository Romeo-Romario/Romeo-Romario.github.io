function dropDown1() {
    document.getElementById("myDropdown1").classList.toggle("show");
  }
  


function dropDown2() {
  document.getElementById("myDropdown2").classList.toggle("show");
}
  

function dropDown3() {
  document.getElementById("myDropdown3").classList.toggle("show");
}
  
  // Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn') && !event.target.matches('.Dropbtn') ) {
    var dropdowns1 = document.getElementsByClassName("dropdown-content");
    var dropdowns2 = document.getElementsByClassName("Dropdown-content");
    var i;
    for (i = 0; i < dropdowns1.length; i++) {
      var openDropdown = dropdowns1[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
    for(i = 0; i < dropdowns2.length; i++) {
      var openDropdown = dropdowns2[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

let touched = false;

document.getElementById("rightUpper").addEventListener("touchstart", function(e) {
    e.preventDefault(); 
    dropDown2();
});

document.getElementById("polinomial_degree").addEventListener("touchstart", function(e) {
    e.preventDefault();
    touched = true;
    dropDown3();
});


document.getElementById("rightUpper").addEventListener("click", function() {
    if (!touched) dropDown2();
    touched = false; 
});

document.getElementById("polinomial_degree").addEventListener("click", function() {
    if (!touched) dropDown3();
    touched = false;
});
