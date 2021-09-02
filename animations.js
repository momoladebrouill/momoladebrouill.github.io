let huter=0
const title=document.getElementById('titre')
window.addEventListener('scroll',function(e) {
    huter+=360/6
    huter=huter%360
    title.style.color="hsl("+huter+",100%,50%)"

});