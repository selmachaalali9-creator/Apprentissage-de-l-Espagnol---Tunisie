import type { CourseData } from '../types';

export const courseData: CourseData = {
    '3A': [
        {
            id: '3a-presente-indicativo',
            title: 'Le Présent de l\'Indicatif',
            type: 'lesson',
            content: {
                title: 'Le Présent de l\'Indicatif (Verbes Réguliers)',
                introduction: 'Le présent de l\'indicatif est utilisé pour parler d\'actions habituelles, de vérités générales ou d\'actions qui se déroulent au moment où l\'on parle.',
                audioSrc: 'https://storage.googleapis.com/aai-web-samples/espagnol-present.mp3',
                audioTranscription: `Le Présent de l'Indicatif (Verbes Réguliers). Le présent de l'indicatif est utilisé pour parler d'actions habituelles, de vérités générales ou d'actions qui se déroulent au moment où l'on parle. Verbes en -AR (Ex: hablar). On enlève la terminaison -ar et on ajoute les terminaisons suivantes : hablo, hablas, habla, hablamos, habláis, hablan. Verbes en -ER (Ex: comer). On enlève la terminaison -er et on ajoute les terminaisons suivantes : como, comes, come, comemos, coméis, comen. Verbes en -IR (Ex: vivir). On enlève la terminaison -ir et on ajoute les terminaisons suivantes : vivo, vives, vive, vivimos, vivís, viven.`,
                sections: [
                    {
                        title: 'Verbes en -AR (Ex: hablar)',
                        content: 'On enlève la terminaison -ar et on ajoute les terminaisons suivantes :',
                        examples: ['hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan']
                    },
                    {
                        title: 'Verbes en -ER (Ex: comer)',
                        content: 'On enlève la terminaison -er et on ajoute les terminaisons suivantes :',
                        examples: ['como', 'comes', 'come', 'comemos', 'coméis', 'comen']
                    },
                    {
                        title: 'Verbes en -IR (Ex: vivir)',
                        content: 'On enlève la terminaison -ir et on ajoute les terminaisons suivantes :',
                        examples: ['vivo', 'vives', 'vive', 'vivimos', 'vivís', 'viven']
                    }
                ]
            }
        },
        {
            id: '3a-presente-ejercicio',
            title: 'Exercice: Le Présent',
            type: 'exercise',
            content: {
                title: 'Exercice sur le Présent de l\'Indicatif',
                questions: [
                    {
                        id: 'q1',
                        type: 'fill-in-the-blank',
                        question: 'Yo (hablar) __________ español.',
                        answer: 'hablo',
                        explanation: 'Pour la première personne du singulier (Yo) avec les verbes en -ar, la terminaison est -o.'
                    },
                    {
                        id: 'q2',
                        type: 'mcq',
                        question: 'Nosotros (vivir) __________ en Túnez.',
                        options: ['vive', 'vivimos', 'viven', 'vivo'],
                        answer: 'vivimos',
                        explanation: 'Pour la première personne du pluriel (Nosotros) avec les verbes en -ir, la terminaison est -imos.'
                    },
                    {
                        id: 'q3',
                        type: 'fill-in-the-blank',
                        question: 'Ella (comer) __________ una manzana.',
                        answer: 'come',
                        explanation: 'Pour la troisième personne du singulier (Él/Ella/Usted) avec les verbes en -er, la terminaison est -e.'
                    },
                ]
            }
        },
        {
            id: '3a-escucha-mercado',
            title: 'Exercice d\'Écoute: Au Marché',
            type: 'listening_exercise',
            content: {
                title: 'Compréhension Orale: Au Marché',
                audioSrc: 'https://storage.googleapis.com/aai-web-samples/espagnol-marche.mp3',
                transcription: `
- Vendedor: ¡Buenos días! ¿Qué le pongo?
- Cliente: Buenos días. Quería un kilo de tomates y medio kilo de pimientos, por favor.
- Vendedor: Aquí tiene. Los tomates están muy buenos hoy. ¿Algo más?
- Cliente: Sí, también me llevo un melón. ¿Cuánto es todo?
- Vendedor: Son cinco euros con veinte.
- Cliente: Aquí tiene. ¡Gracias!
- Vendedor: A usted. ¡Que tenga un buen día!
                `,
                questions: [
                    {
                        id: 'lq1',
                        type: 'mcq',
                        question: '¿Dónde tiene lugar la conversación?',
                        options: ['En una frutería', 'En una panadería', 'En una carnicería', 'En una farmacia'],
                        answer: 'En una frutería',
                        explanation: 'La conversación trata sobre la compra de tomates, pimientos y un melón, productos que se venden en una frutería o un mercado.'
                    },
                    {
                        id: 'lq2',
                        type: 'mcq',
                        question: '¿Qué fruta compra el cliente?',
                        options: ['Manzanas', 'Naranjas', 'Un melón', 'Plátanos'],
                        answer: 'Un melón',
                        explanation: 'El cliente dice explícitamente "también me llevo un melón".'
                    },
                    {
                        id: 'lq3',
                        type: 'fill-in-the-blank',
                        question: 'El precio total de la compra es de ______ euros con veinte.',
                        answer: 'cinco',
                        explanation: 'El vendedor dice "Son cinco euros con veinte" al final de la conversación.'
                    }
                ]
            }
        },
        {
            id: '3a-ser-estar',
            title: 'Ser et Estar',
            type: 'lesson',
            content: {
                title: 'Les verbes "Ser" et "Estar"',
                introduction: 'En espagnol, il y a deux verbes pour "être": "ser" et "estar". Ils ne sont pas interchangeables.',
                sections: [
                    {
                        title: 'Quand utiliser "Ser" ?',
                        content: '"Ser" est utilisé pour des caractéristiques permanentes ou essentielles.',
                        examples: ['Yo soy tunecino. (Identité)', 'La mesa es de madera. (Matière)', 'Son las tres de la tarde. (Heure)']
                    },
                    {
                        title: 'Quand utiliser "Estar" ?',
                        content: '"Estar" est utilisé pour des états temporaires, des localisations ou des conditions.',
                        examples: ['Estoy cansado. (État temporaire)', 'Túnez está en África. (Localisation)', 'La sopa está caliente. (Condition)']
                    },
                ]
            }
        },
        {
            id: '3a-pronombres-tonicos',
            title: 'Les Pronoms Toniques',
            type: 'lesson',
            content: {
                title: 'Les Pronoms Personnels Toniques',
                introduction: 'Les pronoms toniques (tónicos) sont utilisés pour insister sur la personne ou après une préposition. Ils sont différents des pronoms sujets que l\'on utilise avec les verbes.',
                sections: [
                    {
                        title: 'Quels sont les pronoms toniques ?',
                        content: 'Voici la liste des pronoms toniques et leur équivalent en pronom sujet :',
                        examples: [
                            'Sujet: yo -> Tonique: mí (moi)',
                            'Sujet: tú -> Tonique: ti (toi)',
                            'Sujet: él -> Tonique: él (lui)',
                            'Sujet: ella -> Tonique: ella (elle)',
                            'Sujet: nosotros/as -> Tonique: nosotros/as (nous)',
                            'Sujet: vosotros/as -> Tonique: vosotros/as (vous)',
                            'Sujet: ellos/ellas -> Tonique: ellos/ellas (eux/elles)',
                        ]
                    },
                    {
                        title: 'Utilisation après une préposition',
                        content: 'La principale utilisation des pronoms toniques est après les prépositions comme "a", "de", "en", "para", "por", "sin", "con".',
                        examples: [
                            'Este regalo es para mí. (Ce cadeau est pour moi.)',
                            'Hablan de ti. (Ils parlent de toi.)',
                            'Voy a la fiesta sin él. (Je vais à la fête sans lui.)'
                        ]
                    },
                    {
                        title: 'Cas spéciaux : conmigo, contigo',
                        content: 'Avec la préposition "con", les pronoms "mí" et "ti" fusionnent pour former des mots uniques :',
                        examples: [
                            '¿Vienes conmigo al cine? (Tu viens avec moi au cinéma ?)',
                            'No quiero ir contigo. (Je ne veux pas aller avec toi.)',
                            'Attention: les autres formes ne changent pas (con él, con ella, con nosotros...)'
                        ]
                    },
                    {
                        title: 'Pour insister ou mettre l\'emphase',
                        content: 'On peut utiliser le pronom tonique en début de phrase (précédé de "a") pour insister sur la personne concernée, notamment avec des verbes comme "gustar".',
                        examples: [
                            'A mí, me gusta el fútbol. (Moi, j\'aime le football.)',
                            'A ti, te duele la cabeza. (Toi, tu as mal à la tête.)',
                            'A ella, le encanta viajar. (Elle, elle adore voyager.)'
                        ]
                    }
                ]
            }
        },
        {
            id: '3a-articulos',
            title: 'Les Articles',
            type: 'lesson',
            content: {
                title: 'Les Articles Définis et Indéfinis',
                introduction: 'En espagnol, comme en français, les articles s\'accordent en genre (masculin/féminin) et en nombre (singulier/pluriel) avec le nom qu\'ils accompagnent.',
                sections: [
                    {
                        title: 'Articles Définis (Le, La, Les)',
                        content: 'Ils désignent quelque chose de spécifique. En espagnol : el, la, los, las.',
                        examples: ['El libro (le livre)', 'La mesa (la table)', 'Los coches (les voitures)', 'Las casas (les maisons)']
                    },
                    {
                        title: 'Articles Indéfinis (Un, Une, Des)',
                        content: 'Ils désignent quelque chose de non spécifique. En espagnol : un, una, unos, unas.',
                        examples: ['Un perro (un chien)', 'Una flor (une fleur)', 'Unos gatos (des chats)', 'Unas sillas (des chaises)']
                    }
                ]
            }
        },
        {
            id: '3a-articulos-ejercicio',
            title: 'Exercice: Les Articles',
            type: 'exercise',
            content: {
                title: 'Exercice sur les Articles',
                questions: [
                    {
                        id: 'art1',
                        type: 'mcq',
                        question: 'Necesito comprar ___ libro para la clase.',
                        options: ['un', 'una', 'el', 'la'],
                        answer: 'un',
                        explanation: '"Libro" est un nom masculin singulier. Pour parler d\'un livre non spécifique, on utilise l\'article indéfini "un".'
                    },
                    {
                        id: 'art2',
                        type: 'fill-in-the-blank',
                        question: '___ capital de Túnez es Túnez.',
                        answer: 'La',
                        explanation: '"Capital" est un nom féminin singulier. On parle d\'une capitale spécifique, donc on utilise l\'article défini "La".'
                    },
                    {
                        id: 'art3',
                        type: 'mcq',
                        question: 'En el jardín, hay ___ flores muy bonitas.',
                        options: ['unos', 'unas', 'los', 'las'],
                        answer: 'unas',
                        explanation: '"Flores" est un nom féminin pluriel. On parle de fleurs de manière générale, donc on utilise l\'article indéfini "unas".'
                    }
                ]
            }
        }
    ],
    'BAC': [
        {
            id: 'bac-futuro-simple',
            title: 'Le Futur Simple',
            type: 'lesson',
            content: {
                title: 'Le Futur Simple de l\'Indicatif',
                introduction: 'Le futur simple exprime une action qui se déroulera dans l\'avenir. En espagnol, il se forme en ajoutant des terminaisons à l\'infinitif du verbe.',
                sections: [
                    {
                        title: 'Terminaisons (pour tous les groupes)',
                        content: 'Les terminaisons sont les mêmes pour les verbes en -ar, -er et -ir.',
                        examples: ['-é', '-ás', '-á', '-emos', '-éis', '-án']
                    },
                    {
                        title: 'Exemple avec "hablar"',
                        content: 'L\'infinitif "hablar" + les terminaisons.',
                        examples: ['hablaré', 'hablarás', 'hablará', 'hablaremos', 'hablaréis', 'hablarán']
                    },
                    {
                        title: 'Verbes Irréguliers',
                        content: 'Certains verbes ont une racine irrégulière au futur, mais utilisent les mêmes terminaisons.',
                        examples: ['decir -> dir-', 'hacer -> har-', 'poder -> podr-', 'querer -> querr-', 'saber -> sabr-']
                    }
                ]
            }
        },
        {
            id: 'bac-futuro-ejercicio',
            title: 'Exercice: Le Futur',
            type: 'exercise',
            content: {
                title: 'Exercice sur le Futur Simple',
                questions: [
                    {
                        id: 'q1',
                        type: 'fill-in-the-blank',
                        question: 'Mañana, yo (ir) __________ al mercado.',
                        answer: 'iré',
                        explanation: 'Le verbe "ir" est irrégulier au futur. Sa racine est "ir-" et la terminaison pour "yo" est -é.'
                    },
                    {
                        id: 'q2',
                        type: 'mcq',
                        question: '¿Qué (hacer) __________ tú el próximo año?',
                        options: ['hacerás', 'harás', 'haceré', 'haré'],
                        answer: 'harás',
                        explanation: 'Le verbe "hacer" est irrégulier au futur. Sa racine est "har-" et la terminaison pour "tú" est -ás.'
                    },
                    {
                        id: 'q3',
                        type: 'fill-in-the-blank',
                        question: 'Nosotros (viajar) __________ a España en verano.',
                        answer: 'viajaremos',
                        explanation: '"Viajar" est un verbe régulier. On garde l\'infinitif et on ajoute la terminaison -emos pour "nosotros".'
                    },
                    {
                        id: 'q4',
                        type: 'fill-in-the-blank',
                        question: 'Ellos no (poder) __________ venir a la fiesta.',
                        answer: 'podrán',
                        explanation: 'Le verbe "poder" est irrégulier au futur. Sa racine est "podr-" et la terminaison pour "ellos" est -án.'
                    },
                ]
            }
        },
        {
            id: 'bac-subjuntivo',
            title: 'Le Subjonctif Présent',
            type: 'lesson',
            content: {
                title: 'Introduction au Subjonctif Présent',
                introduction: 'Le subjonctif est un mode utilisé pour exprimer des doutes, des désirs, des émotions, des ordres négatifs ou des situations hypothétiques.',
                sections: [
                    {
                        title: 'Formation des verbes réguliers',
                        content: 'Pour les verbes en -ar, on utilise les terminaisons en -e. Pour les verbes en -er et -ir, on utilise les terminaisons en -a.',
                        examples: ['hable, hables, hable...', 'coma, comas, coma...', 'viva, vivas, viva...']
                    },
                    {
                        title: 'Déclencheurs du subjonctif',
                        content: 'Le subjonctif est souvent introduit par des expressions comme :',
                        examples: ['Quiero que...', 'Espero que...', 'Es necesario que...', 'Quizás...']
                    }
                ]
            }
        },
        {
            id: 'bac-escucha-viaje',
            title: 'Exercice d\'Écoute: Plan de Viaje',
            type: 'listening_exercise',
            content: {
                title: 'Compréhension Orale: Plan de Viaje',
                audioSrc: 'https://storage.googleapis.com/aai-web-samples/espagnol-viaje.mp3',
                transcription: `
- Ana: ¡Hola Carlos! Estaba pensando... ¿por qué no hacemos un viaje este año?
- Carlos: ¡Hola Ana! ¡Qué buena idea! Me apunto. ¿Adónde te gustaría ir?
- Ana: Pues, he oído que Andalucía es preciosa en primavera. Podríamos visitar Sevilla y Granada.
- Carlos: ¡Suena genial! Me encanta la arquitectura y la historia. ¿Cuándo sería la mejor fecha?
- Ana: Creo que en abril o mayo, para evitar el calor del verano.
- Carlos: Perfecto. Entonces, tenemos que mirar los vuelos y buscar algún hotel.
- Ana: Sí. Si quieres, yo busco los vuelos y tú miras los hoteles. ¿Te parece?
- Carlos: De acuerdo. Y también deberíamos planificar qué monumentos visitar.
- Ana: ¡Claro! La Alhambra en Granada es imprescindible. Y la Giralda en Sevilla.
- Carlos: Vale, investigo un poco y hablamos mañana con más detalles.
- Ana: ¡Estupendo! ¡Qué ilusión!
                `,
                questions: [
                    {
                        id: 'lq_bac1',
                        type: 'mcq',
                        question: '¿Cuál es el tema principal de la conversación?',
                        options: ['El clima en España', 'La historia de Andalucía', 'La planificación de un viaje', 'La reserva de un hotel'],
                        answer: 'La planificación de un viaje',
                        explanation: 'Ana y Carlos discuten todos los aspectos de la planificación de un viaje: destino, fecha, vuelos, hoteles y visitas.'
                    },
                    {
                        id: 'lq_bac2',
                        type: 'mcq',
                        question: '¿Qué ciudades de Andalucía quieren visitar?',
                        options: ['Madrid y Barcelona', 'Sevilla y Granada', 'Córdoba y Málaga', 'Valencia y Bilbao'],
                        answer: 'Sevilla y Granada',
                        explanation: 'Ana sugiere explícitamente visitar Sevilla y Granada.'
                    },
                    {
                        id: 'lq_bac3',
                        type: 'fill-in-the-blank',
                        question: 'Según Ana, la mejor estación para viajar es la ________.',
                        answer: 'primavera',
                        explanation: 'Ana dice "Andalucía es preciosa en primavera" y sugiere abril o mayo, que son meses de primavera.'
                    },
                     {
                        id: 'lq_bac4',
                        type: 'mcq',
                        question: '¿Qué monumento menciona Ana como "imprescindible" en Granada?',
                        options: ['La Mezquita', 'La Giralda', 'La Alhambra', 'El Alcázar'],
                        answer: 'La Alhambra',
                        explanation: 'Ana dice textualmente "La Alhambra en Granada es imprescindible".'
                    }
                ]
            }
        },
        {
            id: 'bac-imperativo',
            title: 'L\'Impératif',
            type: 'lesson',
            content: {
                title: 'L\'Impératif (Afirmativo y Negativo)',
                introduction: 'L\'impératif est utilisé pour donner des ordres, des conseils, des instructions ou faire des demandes.',
                sections: [
                    {
                        title: 'Impératif Affirmatif',
                        content: 'Pour donner un ordre positif. Les formes pour "tú" et "vosotros" sont spécifiques. Les autres sont empruntées au subjonctif présent.',
                        examples: ['Habla (tú)', 'Comed (vosotros)', '¡Venga usted!', '¡Salgamos nosotros!']
                    },
                    {
                        title: 'Impératif Négatif',
                        content: 'Pour donner un ordre négatif (une interdiction). Toutes les formes sont construites avec "no" + le subjonctif présent.',
                        examples: ['No hables (tú)', 'No comáis (vosotros)', 'No venga usted', 'No salgamos nosotros']
                    },
                    {
                        title: 'Irréguliers courants (forme "tú")',
                        content: 'Certains verbes ont des formes irrégulières à l\'impératif affirmatif pour "tú".',
                        examples: ['decir -> di', 'hacer -> haz', 'ir -> ve', 'poner -> pon', 'salir -> sal', 'ser -> sé', 'tener -> ten', 'venir -> ven']
                    }
                ]
            }
        },
        {
            id: 'bac-imperativo-ejercicio',
            title: 'Exercice: L\'Impératif',
            type: 'exercise',
            content: {
                title: 'Exercice sur l\'Impératif',
                questions: [
                    {
                        id: 'imp1',
                        type: 'fill-in-the-blank',
                        question: '(Abrir, tú) __________ la ventana, por favor.',
                        answer: 'Abre',
                        explanation: 'Pour l\'impératif affirmatif de "tú" avec les verbes réguliers en -ir, on utilise la 3ème personne du singulier du présent de l\'indicatif.'
                    },
                    {
                        id: 'imp2',
                        type: 'mcq',
                        question: '¡No (hablar, vosotros) __________ tan alto!',
                        options: ['hablad', 'habléis', 'hablan', 'hablar'],
                        answer: 'habléis',
                        explanation: 'Pour l\'impératif négatif, on utilise "no" + le subjonctif présent. Pour "vosotros" avec un verbe en -ar, c\'est -éis.'
                    },
                    {
                        id: 'imp3',
                        type: 'fill-in-the-blank',
                        question: '(Hacer, tú) __________ los deberes ahora mismo.',
                        answer: 'Haz',
                        explanation: '"Hacer" est un verbe irrégulier à l\'impératif affirmatif pour "tú". La forme correcte est "haz".'
                    },
                    {
                        id: 'imp4',
                        type: 'mcq',
                        question: '(Decir, usted) __________ la verdad.',
                        options: ['Di', 'Diga', 'Dice', 'Decid'],
                        answer: 'Diga',
                        explanation: 'Pour l\'impératif formel ("usted"), on utilise la 3ème personne du singulier du subjonctif présent.'
                    }
                ]
            }
        },
        {
            id: 'bac-pronombres-interrogativos',
            title: 'Les Pronoms Interrogatifs',
            type: 'lesson',
            content: {
                title: 'Les Pronoms Interrogatifs (Qué, Quién, Cuál...)',
                introduction: 'Les pronoms interrogatifs sont utilisés pour poser des questions sur des personnes, des choses, des lieux, etc. Ils portent toujours un accent écrit (tilde) pour les différencier des pronoms relatifs.',
                sections: [
                    {
                        title: 'Quién / Quiénes (Qui)',
                        content: 'Utilisé uniquement pour se référer à des personnes. "Quién" est singulier, "Quiénes" est pluriel.',
                        examples: [
                            '¿Quién es ese hombre? (Qui est cet homme ?)',
                            '¿Con quién hablas? (Avec qui parles-tu ?)',
                            '¿Quiénes son tus profesores? (Qui sont tes professeurs ?)'
                        ]
                    },
                    {
                        title: 'Qué (Que / Quoi / Quel)',
                        content: 'Très polyvalent. On l\'utilise pour demander une définition ou pour s\'informer sur des choses en général. Devant un nom, il signifie "Quel(le)".',
                        examples: [
                            '¿Qué es esto? (Qu\'est-ce que c\'est ?)',
                            '¿Qué quieres comer? (Que veux-tu manger ?)',
                            '¿Qué libro lees? (Quel livre lis-tu ?)'
                        ]
                    },
                    {
                        title: 'Cuál / Cuáles (Lequel / Lesquels / Quel)',
                        content: 'Implique une sélection ou un choix dans un groupe défini. "Cuál" est singulier, "Cuáles" est pluriel. On l\'utilise là où on utiliserait "lequel/laquelle" en français, ou "quel" devant le verbe être.',
                        examples: [
                            'Hay dos coches. ¿Cuál prefieres? (Il y a deux voitures. Laquelle préfères-tu ?)',
                            '¿Cuál es tu color favorito? (Quelle est ta couleur préférée ? - choix parmi toutes les couleurs)',
                            '¿Cuáles son tus asignaturas preferidas? (Quelles sont tes matières préférées ? - choix parmi toutes les matières)'
                        ]
                    },
                    {
                        title: 'Différence clé : ¿Qué? vs ¿Cuál?',
                        content: 'C\'est une confusion fréquente. Devant le verbe "ser", on utilise "¿Qué?" pour demander une définition et "¿Cuál?" pour identifier un élément parmi d\'autres. Attention : devant un nom, on utilise toujours "Qué" pour dire "Quel".',
                        examples: [
                            '¿Qué es la geografía? (On demande une définition.)',
                            '¿Cuál es la capital de España? (On demande d\'identifier une ville parmi un groupe de villes possibles.)',
                            'Incorrect: *¿Cuál coche te gusta?* -> Correct: ¿Qué coche te gusta?'
                        ]
                    },
                    {
                        title: 'Autres Mots Interrogatifs',
                        content: 'Voici d\'autres mots essentiels pour poser des questions.',
                        examples: [
                            'Dónde: ¿Dónde está el museo? (Où)',
                            'Cuándo: ¿Cuándo es tu cumpleaños? (Quand)',
                            'Cómo: ¿Cómo te llamas? (Comment)',
                            'Cuánto/a/os/as: ¿Cuánto cuesta? (Combien)'
                        ]
                    }
                ]
            }
        }
    ]
};