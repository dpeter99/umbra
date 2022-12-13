var toggler = document.getElementsByClassName('nav-group-header');
var i;
console.log(toggler);

for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function() {
        this.parentElement.toggleAttribute("open");
        this.classList.toggle("caret-down");
    });
}