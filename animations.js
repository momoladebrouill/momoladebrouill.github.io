let huter=0
const title=document.getElementById('titre')
window.addEventListener('scroll',function(e) {
    huter+=Math.sign(e.deltaY)*10
    title.style.fontSize=huter+"px"
});