let start = false
let click = document.getElementById('click');

addEventListener('click', () => {
    if(!start){
        start = true;
        click.style.display = 'none';
        var audio = new Audio('song.mp3');
        //audio.play();
    }
});
    

