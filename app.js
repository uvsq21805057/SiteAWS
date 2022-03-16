window.addEventListener('DOMContentLoaded', () => {
    // Transformation des cases de la grille en Array //
    const cases = Array.from(document.querySelectorAll('.case'));
    const tourJoueur = document.querySelector('.tour');
    const vicJ1 = document.getElementById('scoreJ1');
    const vicJ2 = document.getElementById('scoreJ2');
    const egal = document.getElementById('egalite');
    const boutonReset = document.getElementById('reset');
    const boutonAide = document.getElementById('aide');
    const boutonRegle = document.getElementById('regle');
    const resultat = document.querySelector('.affichageResultat');

    // Variables Globale mémoire du jeu //
    let grille = [
        '', '', '', 
        '', '', '', 
        '', '', ''
    ];
    var joueurActuel = 'X';
    var scoreJoueur1 = 0;
    var scoreJoueur2 = 0;
    var scoreNul = 0;
    var etatRound = true;

    // Fonction ajout élément dans une case //
    function ajoutElementGrille(element) {
        grille[element] = joueurActuel;
    }

    const tabVictoire = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Fonction qui vérifie l'alignement des logos //
    function checkVictoire() {
        let victoire = false;
        for (let i = 0; i <= 7; i++) {
            const buffertab = tabVictoire[i];
            const tabvic1 = grille[buffertab[0]];
            const tabvic2 = grille[buffertab[1]];
            const tabvic3 = grille[buffertab[2]];
            if (tabvic1 === '' || tabvic2 === '' || tabvic3 === '') {
                continue;
            }
            // Alignement de trois cases avec le même logo //
            if ( (tabvic1 === tabvic2) && (tabvic2 === tabvic3) ) {
                victoire = true;
                break;
            }
        }

        // Cas : Victoire //
        if (victoire == true) {
            if (joueurActuel === 'X') {
                //alert("LE GAGNANT EST LE JOUEUR1 !");
                alertVictoireJ1();
                scoreJoueur1 = scoreJoueur1 + 1;
                vicJ1.textContent = scoreJoueur1;
            }
            else {
                alertVictoireJ2();
                scoreJoueur2 = scoreJoueur2 + 1;
                vicJ2.textContent = scoreJoueur2;
            }
                etatRound = false;
                return;
            }
            
        // Cas : Match Nul //
        if (
            grille[0] !== ('') &&
            grille[1] !== ('') &&
            grille[2] !== ('') &&
            grille[3] !== ('') &&
            grille[4] !== ('') &&
            grille[5] !== ('') &&
            grille[6] !== ('') &&
            grille[7] !== ('') &&
            grille[8] !== ('') &&
            grille[9] !== ('') 
        ) {
            alertMatchNul();
            scoreNul = scoreNul + 1;
            egal.textContent = scoreNul;  
        }
    }

    // Fonction lié au bouton Regle //
    function afficheRegle() {;
        window.open('regle.html','width = 500, height = 500');
    }

    // Fonction lié au bouton Aide //
    function afficheAide() {
        window.open('aide.html','width = 500, height = 500');
    }

    // Fonction qui affiche le résultat à l'utilisateur //
    function alertVictoireJ1() {
        resultat.innerHTML = 'Gagnant: [Joueur 1]';;
        resultat.classList.remove('buffer');
    };

    function alertVictoireJ2() {
        resultat.innerHTML = 'Gagnant: [Joueur 2]';
        resultat.classList.remove('buffer');
    };

    function alertMatchNul() {
        resultat.innerHTML = 'Match Nul';
        resultat.classList.remove('buffer');
    };

    // Vérification si une case est déjà joué //
    function checkCasevalue(element){
        if (element.innerText === 'X' || element.innerText === 'O'){
            return false;
        }
        return true;
    };

    // Fonction Tour Joueur1 --> Joueur2 //
    function swapJoueur() {
        tourJoueur.classList.remove(`J${joueurActuel}`);
        if (joueurActuel === 'X') {
            joueurActuel = 'O';
        }
        else {
            joueurActuel = 'X';
        }
        tourJoueur.innerText = joueurActuel;
        tourJoueur.classList.add(`J${joueurActuel}`);
    };

    const jouer = (element, index) => {
        if( (checkCasevalue(element) === true) &&
            (etatRound == true) ) {
            element.innerText = joueurActuel;
            element.classList.add(`J${joueurActuel}`);
            ajoutElementGrille(index);
            checkVictoire();
            swapJoueur();
        }
    }
    
    // Fonction pour recommencer une partie //
    function afficheNouvelleGrille() {
        grille = [
            '', '', '', 
            '', '', '', 
            '', '', ''
        ];
        
        etatRound = true;
        resultat.classList.add('buffer');

        // Iniatilisation de la partie avec le Joueur1 //
        if (joueurActuel === 'O') {
            swapJoueur();
        }

        cases.forEach(element => {
            element.innerText = '';
            element.classList.remove('JX');
            element.classList.remove('JO');
        });
    };

    // Click dans une case --> Appel fonction jouer() //
    cases.forEach( (element, index) => {
        element.addEventListener('click', () => jouer(element, index));
    });

    // Lien click Bouton --> fonction //
    boutonReset.addEventListener('click', afficheNouvelleGrille);
    boutonRegle.addEventListener('click', afficheRegle);
    boutonAide.addEventListener('click', afficheAide);
});