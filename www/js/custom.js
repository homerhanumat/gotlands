/**************************************************************
 *
 * Dropdown
 *
 *************************************************************/

// Show dropdown when mouse enters button-like anchor
// hide when mouse leaves dropdown area
window.addEventListener('load', function() {

    // keep track of mouse
    // initialize positions to keep trck of mouse
    let xPos = 0;
    let yPos = 0;
    function registerMousePosition(e) {
        xPos = e.pageX;
        yPos = e.pageY;
    }
    const bodyElement = document.querySelector("body");
    bodyElement.addEventListener("mousemove", registerMousePosition, false);


    // when mouse enters a primary nav link, immediately hide all
    // dropdown lists
    const primaryLinks = Array.from(document.querySelectorAll('.primary-navlink'));
    const dropdownLists = Array.from(document.querySelectorAll('.dropdown-content'));
    primaryLinks.forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            dropdownLists.forEach(function(list) {
               list.classList.remove('show') ;
            });
        });
    });

    const dropdowns = Array.from(document.querySelectorAll('.dropdown'));
    dropdowns.forEach(function(dropdown){

        const dropdownAnchor = dropdown.querySelector('.dropbtn');
        const dropdownList = dropdown.querySelector('.dropdown-content');

        // when mouse enter dropdown anchor, show the list, and
        // make sure all other lists get hidden
        dropdownAnchor.addEventListener('mouseenter',function() {
            for (let i = 0; i < dropdowns.length; i++ ) {
                if ( dropdowns[i] == dropdown ) {
                    dropdownList.classList.add('show');
                } else {
                    const otherList = dropdowns[i].querySelector('.dropdown-content');
                    otherList.classList.remove('show');
                }
            }

        });

        // when mouse leaves anchor headed up or sideways, user probably
        // does not want to see the list, so hide it after adecent interval
        /*dropdownAnchor.addEventListener('mouseleave', function() {
            window.setTimeout(function() {
                const rect = dropdownAnchor.getBoundingClientRect();
                if ( yPos < rect.bottom ) dropdownList.classList.remove('show');
            }, 500);
        }); */



        // if mouse leaves list sideways or down, user probably does not
        // need the list, so hide it after a decent interval
        /* dropdownList.addEventListener('mouseleave', function() {
            window.setTimeout(function() {
                const rect = dropdownList.getBoundingClientRect();
                if ( yPos > rect.top ) dropdownList.classList.remove('show');
            }, 500);
        }); */

        dropdown.addEventListener('mouseleave', function() {
           window.setTimeout(function() {
               dropdownList.classList.remove('show');
           }, 500) ;
        });

    });
});


// Close the dropdown menu if the user clicks outside of it
// (fallback in case diagonal-exit mouse movement defeats the above code;
// might be worth writing code to more reliably detect user intentions from mouse
// movement)
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for ( let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});

/*************************************************************
 *
 * Toggle Navbar
 *
 ************************************************************/

window.addEventListener('load', function() {
    const icon = document.querySelector('.icon');
    const navbarWrapper = document.querySelector('.navbarWrapper');
    const navbar = document.querySelector('nav');
    const main = document.querySelector('.main');
    const sidebar = document.querySelector('.sidebar');
    const newsIcon = document.querySelector('div .news-icon')
    icon.addEventListener('click', function() {
        if ( navbarWrapper.classList.contains('responsive') ) {
            navbarWrapper.classList.remove('responsive');
            navbarWrapper.classList.add('clear');
            navbarWrapper.style.float = "none";
            main.style.float = "left";
            main.style.width = "100%";
        } else {
            navbarWrapper.classList.add('responsive');
            navbarWrapper.classList.remove('clear');
            navbarWrapper.style.float = "left";
            main.style.float = "right";
            main.style.width = "80%";
            sidebar.classList.remove('responsive');
            sidebar.style.display = "none";
        }
        });

    newsIcon.addEventListener('click', function(){
        if ( sidebar.classList.contains('responsive') ) {
            sidebar.classList.remove('responsive');
            sidebar.style.display = "none";
            main.style.width = "100%";
        } else {
           sidebar.classList.add('responsive');
           main.style.width = "50%";
           main.style.float = "left";
           navbarWrapper.classList.remove('responsive');
           sidebar.style.display = "block";
        }
    });
});