let count = 1;
document.getElementById("radio1").checked = true;
setInterval( function(){
    nextImage();
}, 2000)

function nextImage(){
    count++;
    if(count>2){
        count = 1;
    }

    document.getElementById("radio2"+count).checked = true;
    
}