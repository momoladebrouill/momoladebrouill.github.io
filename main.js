let mots = [
    "Florian j'ai l'impression tes pets ils ont toujours le même bruit.",
    "Le masque c'est sur le nez !",
    "Non.",
    "Les nouilles crues ne se mangent pas",
    "Une phrase c'est <u>sujet</u>+<u>verbe</u>+<u>complément</u>.",
    "(a+b)² = a²+2ab+b², c'est comme ça, c'est le binome de Newton",
    "Si ton tonton tond ton tonton, ton tonton tondu sera.",
    "César est mort.",
    "Paul se pèle au pôle dans sa pile de pulls et de polos pales.",
    "<i>La clim d'humour man qui fait des rollers</i>",
    "Attention à la mousse!",
    "Il y'a vingt six lettres dans l'alphabet pourtant dans cette phrase il n'y en a que 24 différentes. (vous pouvez verifier, ce morceau ne comptant pas)",
    "2b||!2b telle est la question 😶‍🌫️",
    "Paul est mort RIP Paul",
    "Humour, toujours !",
    "Chacule pom polom pom",
    "Zabolomock",
    "J E A N",
    "Oui.",
    '"Mais en vrai la nature sah" ~ Florian Muratore',
    "Bonum vinium la edificat cor hominis <i>*danse élégante*</i>",
    '"L\'amour c\'est comme les pets, si tu dois forcer c\'est certainement du caca" ~ HGGSP Quote',
    "Si un bar te passes en haut, on peut dire que le Bartolomeo ! ~ 💐 Quote",
    '"Florian, il aime ses couilles, pourtant il n\'est pas PD" ~ Gay Quote',
    "On peut mettre des classes dans une liste et des listes dans des classes",
    "Relate à balle",
    'BUG BUG BUG BUG BUG : "Madame ça bug"',
    '"La liberté commence où l\'ignorance finit" ~ Seigneur Muselier(sous couverture d\'un panel de lycéens)',
    "Hypo et tata yeah ! Hypo et tata yeaaah. Hypo et touki touki hypo et touki touki yeaaa!",
    "Dans la foret d'Amazonie y a un arbre qui s 'appelle l'Hévéa et qui sert a fabriquer le caoutchouc ducoup quand tu achète un pneu au final tu paie la d'hévéa",
    '"Dans le monde des fous le borgne n\'as plus qu\'un œil" ~ Dicton STI',
    "Pour vous, une OlarriQuote : <i>Arthur Plee vous êtes une Plaie</i>",
    '"Depuis que j\'ai appris que l\'humanité entière est peut être bâti sur un mensonge, je me prend toutes les chaises" ~ Spé HGGSP quote',
    "Pas besoin de devenir en BG quand on l'est",
    "ℕℤⅅℚℝℂ",
    "Je chie donc j'essuie",
    "Toute fonction continue sur un segment y est uniformément continue (Théorème de Heine)"

];
const span = document.getElementById('fromage');
const bouton = document.getElementById('autre ');
const zic = new Audio('https://static.bodet-time.com/mp3/Melodie-P-Carillon-fin.mp3');
let index;

function fromager() {
    zic.pause();
    zic.currentTime = 0;
    zic.play();
    index = parseInt(Math.random() * mots.length);
    span.innerHTML = mots[index];
    mots.splice(index, 1);
    bouton.textContent = "Une autre ! (plus que " + mots.length + ") ";
    if (mots.length == 0) {
        span.textContent = "VOUS AVEZ TOUT VU AHAHAHA ";
        bouton.style.display = "none ";
    }
}
