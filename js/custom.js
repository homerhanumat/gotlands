// Show dropdoen when mouse enters  anchor
// hide when mouse leaves dropdown area
window.addEventListener('load', function() {
    const dropbtn = document.querySelector(".dropbtn");
    const dropdown = document.querySelector("#myDropdown");
    dropbtn.addEventListener('mouseenter', function() {
        dropdown.classList.add('show');
    });
    dropdown.addEventListener('mouseleave',function() {
        dropdown.classList.remove('show');
    });
});


// Close the dropdown menu if the user clicks outside of it
// (Not likley to happen given previous code)
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for ( var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});