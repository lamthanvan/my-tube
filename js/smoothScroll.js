function smoothScroll() {
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]').not('[href="#0"]').click(function(event) {
            // On-page links
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 100
                    }, 1000, function() {
                        //Callback after animation
                        //Must change focus!
                        var $target = $(target);
                        $target.focus();
                        // if ($target.is(":focus")) { // Checking if the target was focused
                        //     return false;
                        // } else {
                        //     $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        //     $target.focus(); // Set focus again
                        // };
                    });
                }
            }
        });
}
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
        document.getElementById("topnav-container").style.top = "-50px";
    } else {
        document.getElementById("topnav-container").style.top = "0";
    }
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        document.getElementById("top-banner").className = "disappear";
    }else{
        document.getElementById("top-banner").className = "appear";
    }
}
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function topBarResponsive() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}