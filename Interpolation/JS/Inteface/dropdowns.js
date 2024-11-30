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

document.getElementById("rightUpper").addEventListener("click", dropDown2);
document.getElementById("polinomial_degree").addEventListener("click", dropDown3);

document.getElementById("rightUpper").addEventListener("touchstart", dropDown2);
document.getElementById("polinomial_degree").addEventListener("touchstart", dropDown3);

function validateInput(input) {
  // Ensure the value is an integer greater than 2
  let value = parseInt(input.value, 10);
  if (isNaN(value) || value < 2) {
      input.value = 2;  // Set to minimum value if invalid
  }
}

// Add the event listener correctly
document.getElementById("N_interpolation_point").oninput = function() {
  validateInput(this);
};
