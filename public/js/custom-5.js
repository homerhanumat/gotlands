"use strict";

/**************************************************************
 *
 * Dropdown
 *
 *************************************************************/

// Show dropdown when mouse enters button-like anchor
// hide when mouse leaves dropdown area
window.addEventListener('load', function () {

    // keep track of mouse
    // initialize positions to keep trck of mouse
    var xPos = 0;
    var yPos = 0;
    function registerMousePosition(e) {
        xPos = e.pageX;
        yPos = e.pageY;
    }
    var bodyElement = document.querySelector("body");
    bodyElement.addEventListener("mousemove", registerMousePosition, false);

    // when mouse enters a primary nav link, immediately hide all
    // dropdown lists
    var primaryLinks = Array.from(document.querySelectorAll('.primary-navlink'));
    var dropdownLists = Array.from(document.querySelectorAll('.dropdown-content'));
    primaryLinks.forEach(function (link) {
        link.addEventListener('mouseenter', function () {
            dropdownLists.forEach(function (list) {
                list.classList.remove('show');
            });
        });
    });

    var dropdowns = Array.from(document.querySelectorAll('.dropdown'));

    dropdowns.forEach(function (dropdown) {

        var dropdownAnchor = dropdown.querySelector('.dropbtn');
        var dropdownList = dropdown.querySelector('.dropdown-content');

        // when mouse enters dropdown anchor, show the list, and
        // make sure all other lists get hidden
        dropdownAnchor.addEventListener('mouseenter', function () {
            for (var i = 0; i < dropdowns.length; i++) {
                if (dropdowns[i] == dropdown) {
                    dropdownList.classList.add('show');
                } else {
                    var otherList = dropdowns[i].querySelector('.dropdown-content');
                    otherList.classList.remove('show');
                }
            }
        });

        dropdown.addEventListener('mouseleave', function () {
            dropdownList.classList.remove('show');
        });
    });
});

// Close the dropdown menu if the user clicks outside of it
// (fallback in case diagonal-exit mouse movement defeats the above code;
// might be worth writing code to more reliably detect user intentions from mouse
// movement)
window.addEventListener('click', function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});

/*************************************************************
 *
 * Toggle Navbar and Sidebar
 *
 ************************************************************/

window.addEventListener('load', function () {
    var icon = document.querySelector('.icon');
    var navbar = document.querySelector('nav');
    var sidebar = document.querySelector('.sidebar');
    var newsIcon = document.querySelector('.news-icon');
    icon.addEventListener('click', function () {
        if (navbar.classList.contains('responsive')) {
            navbar.classList.remove('responsive');
        } else {
            navbar.classList.add('responsive');
            if (sidebar) {
                sidebar.classList.remove('responsive');
            }
        }
    });
    if (newsIcon) {
        newsIcon.addEventListener('click', function () {
            if (sidebar.classList.contains('responsive')) {
                sidebar.classList.remove('responsive');
            } else {
                sidebar.classList.add('responsive');
                navbar.classList.remove('responsive');
            }
        });
    }
});

/***********************************************************
 *
 * Use Tags to Filter Blog-Post List
 * (borrowed from Marijn Havebeke:  http://marijnhaverbeke.nl/blog)
 *
 ***********************************************************/

function getTags() {
    var tags = document.location.hash.slice(1).split(",");
    if (!tags[0].length) tags.pop();
    /* the following converts %20 to space, in each tag */
    return tags.map(decodeURI);
}

function filterList() {
    var tags = getTags();
    var posts = document.body.getElementsByClassName("post");
    for (var i = 0; i < posts.length; ++i) {
        var post = posts[i],
            visible = true;
        var ptags = post.getAttribute("data-tags").split(",");
        for (var j = 0; j < tags.length; ++j) {
            if (ptags.indexOf(tags[j]) == -1) {
                visible = false;
            }
        }post.style.display = visible ? "" : "none";
    }
    var tagElts = document.body.getElementsByClassName("tag");
    for (var _i = 0; _i < tagElts.length; ++_i) {
        var elt = tagElts[_i];
        elt.className = "tag" + (tags.indexOf(elt.textContent) > -1 ? " selected" : "");
    }
}

function filterTag(tag) {
    var tags = getTags();
    var known = tags.indexOf(tag);
    if (known == -1) {
        tags.push(tag);
    } else {
        tags.splice(known, 1);
    }
    document.location.hash = tags.length ? "#" + tags.join(",") : "";
}

window.addEventListener('load', filterList);
window.addEventListener('hashchange', filterList);

/***********************************************************
 *
 * Carousel (modified from https://github.com/codepo8/simple-carousel)
 *
 ***********************************************************/
function carousel() {

    // Read necessary elements from the DOM once
    var boxes = document.querySelectorAll('.carouselbox');
    if (boxes.length == 0) {
        return;
    }

    boxes.forEach(function (box) {
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
        next.addEventListener('click', function () {
            navigate(1);
        });
        prev.addEventListener('click', function () {
            navigate(-1);
        });

        // show the first element
        navigate(0);
    });
}

window.addEventListener('load', carousel);
