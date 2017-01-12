/* When the user clicks on the button,
 toggle between hiding and showing the dropdown content */
window.addEventListener('load', function () {
    const dropdown = document.querySelector("#myDropdown");
    dropdown.addEventListener('click', this.classList.toggle('show'))
})


// Close the dropdown menu if the user clicks outside of it
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
})