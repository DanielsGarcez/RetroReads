let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function() {
    nextImage();
}, 5500);

function nextImage() {
    count++;
    if (count > 4) {
        count = 1;
    }

    // Corrigido: Assumindo que os IDs dos elementos são "radio1", "radio2", "radio3", etc.
    document.getElementById("radio" + count).checked = true;
}