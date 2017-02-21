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
    const navbar = document.querySelector('nav');
    const sidebar = document.querySelector('.sidebar');
    const newsIcon = document.querySelector('.news-icon')
    icon.addEventListener('click', function() {
        if ( navbar.classList.contains('responsive') ) {
            navbar.classList.remove('responsive');
        } else {
            navbar.classList.add('responsive');
            sidebar.classList.remove('responsive');
        }
        });

    newsIcon.addEventListener('click', function(){
        if ( sidebar.classList.contains('responsive') ) {
            sidebar.classList.remove('responsive');
        } else {
           sidebar.classList.add('responsive');
           navbar.classList.remove('responsive');
        }
    });
});


/***********************************************************
 *
 * Carousel (borrowed from https://github.com/codepo8/simple-carousel)
 *
 ***********************************************************/

carousel = (function(){

    // Read necessary elements from the DOM once
    var box = document.querySelector('.carouselbox');
    var next = box.querySelector('.next');
    var prev = box.querySelector('.prev');

    // Define the global counter, the items and the
    // current item
    var counter = 0;
    var items = box.querySelectorAll('.carouselcontent li');
    var amount = items.length;
    var current = items[0];

    box.classList.add('active');

    // navigate through the carousel

    function navigate(direction) {

        // hide the old current list item
        current.classList.remove('current');

        // calculate the new position
        counter = (counter + direction) % amount;
        counter = counter < 0 ? amount - 1 : counter;

        // set new current element
        // and add CSS class
        current = items[counter];
        current.classList.add('current');
    }

    // add event handlers to buttons
    next.addEventListener('click', function(ev) {
        navigate(1);
    });
    prev.addEventListener('click', function(ev) {
        navigate(-1);
    });

    // show the first element
    // (when direction is 0 counter doesn't change)
    navigate(0);

})();