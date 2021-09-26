var huter=0;
const title=document.getElementById('titre')
window.addEventListener('wheel',wheel);
function wheel(e) {
    huter+=Math.sign(e.deltaY)*-1
    title.style.fontSize=huter+"px"
};