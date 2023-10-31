export default [
    {
        grupoMuscular: 'peitoral', 
        exercicios: [
            {
                nome: 'Flexão de braços (peitoral, tríceps, deltóide)',
                variacoes: [' Braço aberto ',' Braço fechado '],
                execucao: [' unilateral ',' bilateral '],
            },
            {
                nome: 'Flexão de braços com repulsão (peitoral, tríceps, deltóide)' 
            },
            {
                nome: 'Supino (peitoral, deltóide, tríceps)',
                pegada: [' aberta ', 'fechada'],
                implemento: [' barra ', ' halter ', ' Smith '],
                postura: [ ' reto ', ' inclinado ', ' declinado ']
            },
            {
                nome: 'Crossover (peitoral, tríceps)',
                implemento: [' polia alta ', ' polia média '],
                postura: [ 'ereto ', ' inclinado ']
            },
            {
                nome: 'Pullover (peitoral, grande dorsal, tríceps)',
                implemento: [' halter ', ' barra '],
                postura: [' deitado ', ' sentado ', ' ajoelhado ']
            },
            {
                nome: 'Crucifixo (peitoral)',
                implemento: [' polia ', ' halter ', ' máquina '],
                postura: [' em pé ', ' deitado ', 'sentado ereto ', ' sentado inclinado ', ' sentado declinado '],
                execucao: [' unilateral ', ' bilateral ']
            }
        ]
    },
    {
        grupoMuscular: 'grande dorsal',
        exercicios: [
            {
                nome: 'Remada com halteres(grande dorsal, bíceps)',
                pegada: [ 'neutra ',' supinada ', ' pronada '],
                braco: [ ' aberto ', ' fechado ']
            },
            {
                nome: 'Barra Fixa (chinup) (grande dorsal, bíceps, redondo maior, rombóide, trapézio)',
                pegada: [' aberta ', ' fechada ', ' triângulo ', ' invertida ']
            },
            {
                nome: 'Graviton (grande dorsal, trapézio, bíceps, redondo maior, rombóide)'
            },
            {
                nome: 'Remada (grande dorsal, bíceps, rombóide)',
                pegada: [' neutra ', ' pronada ', ' supinada '],
                implemento: [' barra ', ' polia ', ' halter ', ' máquina ', ' banco '],
                postura: [' em pé ', ' sentado ', ' 3 apoios ereto ', ' 3 apoios inclinado '],
                execucao: [' unilateral ', ' bilateral ']
            },
            {
                nome: 'Puxada (grande dorsal, trapézio, bíceps)',
                pegada: [' abeerta ', ' fechada ', 'barra V ']
            },
            {
                nome: 'Woodchoppers  polia alta (grande dorsal, peitoral, coraco braquial, deltóide, abdominais)'
            },
            {
                nome: 'Woodchoppers ajoelhado polia alta (grande dorsal, peitoral, coraco braquial, deltóide, abdominais)'
            }
        ]
    },
    {
        grupoMuscular: 'bíceps',
        exercicios: [
            {
                nome: 'Rosca bíceps (bíceps)',
                pegada: [' neutra ', ' supinada ', ' pronada '],
                implemento: [' barra ',' halter ',' polia '],
                postura: [' em pé ', ' sentado ']
            },
            {
                nome: 'Rosca bíceps com Stiff (bíceps)'
            }
        ]
    },
    {
        grupoMuscular: 'tríceps',
        exercicios: [
            {
                nome: 'Tríceps (tríceps)',
                pegada: [' neutra ', ' supinada ', ' pronada '],
                implemento: [' barra ', ' corda ', ' máquina '],
                execucao: [' unilateral ', ' bilateral ']
            },
            {
                nome: 'Tríceps testa (tríceps)',
                pegada: [' neutra ', ' pronada '],
                implemento: [' barra ', ' polia ', ' halter '],
                postura: [' em pé ', ' deitado ', 'sentado ereto ', ' sentado inclinado ']
            },
            {
                nome: 'Mergulhos no banco (tríceps)'
            },
            {
                nome: 'Tríceps no supino (tríceps)'
            },
            {
                nome: 'Tríceps Kick back (Tríceps)',
                implemento: [' halter ', ' polia ']
            }
        ]
    },
    {
        grupoMuscular: 'abdominais',
        exercicios: [
            {
                nome: 'Prancha (abdominais)'
            },
            {
                nome: 'Prancha com levantamento de perna (abdominais, glúteo máximo, isquiotibiais)'
            },
            {
                nome: 'Prancha com pés no banco (abdominais) '
            },
            {
                nome: 'Prancha estendida de lado (abdominais)'
            },
            {
                nome: 'Prancha lateral com rotação de tronco (abdominais)'
            },
            {
                nome: 'Prancha twister de quadril (abdominais)'
            },
            {
                nome: 'Pull-in com bola suíça (abdominais)'
            },
            {
                nome: 'Abdominal deitado (abdominais)'
            },
            {
                nome: 'Abdominal declinado (abdominais)'
            },
            {
                nome: 'Abdominal sentado (abdominais)'
            },
            {
                nome: 'Inclinação lateral de tronco com halteres (abdominais)'
            },
            {
                nome: 'Inclinação lateral no banco romano (abdominais)'
            },
            {
                nome: 'Plank lateral (abdominais)'
            },
            {
                nome: 'Abdominais com aparelho de solo (abdominais)'
            },
            {
                nome: 'Abdominais com bola suíça (abdominais)'
            },
            {
                nome: 'Abdominais com deslizamento de pernas (abdominais) '
            },
            {
                nome: 'Abdominais - pernas em bola suíça (abdominais)'
            },
            {
                nome: 'Abdominal com mãos sobre a cabeça (abdominais)'
            },
            {
                nome: 'Flexão de tronco na polia alta (abdominais)'
            },
            {
                nome: 'Abdominal no banco declinado (abdominais)'
            },
            {
                nome: 'Abdominal com braço cruzado (abdominais)'
            },
            {
                nome: 'Abdominal Oblíquo (abdominais)'
            },
            {
                nome: 'Abdominal tesoura (Abdominais e adutores)'
            },
            {
                nome: 'Abdominal bicicleta (abdominais)'
            },
            {
                nome: 'Elevação de joelhos em barras paralelas (abdominais)'
            },
            {
                nome: 'Elevação de joelhos em suspensão (abdominais)'
            },
            {
                nome: 'Elevação de pernas em barras paralelas (abdominais)'
            },
            {
                nome: 'Elevação de pernas em suspensão (abdominais)'
            },
            {
                nome: 'Escalador de montanha (abdominais)'
            },
            {
                nome: 'Flexão lateral de tronco na bola (abdominais)'
            },
            {
                nome: 'Flexão lateral de tronco no banco (abdominais)'
            },
            {
                nome: 'Prancha três apoios com rotação de tronco (abdominais)'
            },
            {
                nome: 'Inclinação lateral com barra (abdominais)'
            },
            {
                nome: 'Inclinação lateral do tronco na polia baixa (abdominais)'
            },
            {
                nome: 'Abdominal limpa para-brisas (abdominais)'
            },
            {
                nome: 'Abdominal canivete (abdominais)'   
            },
            {
                nome: 'Abdominal Rollout (abdominais)'
            },
            {
                nome: 'Abdominal tesoura (Abdominais, adutores e abdutores do quadril)'
            },
            {
                nome: 'Tocar os calcanhares deitado (abdominais)'
            },
            {
                nome: 'Abdominal russo (abdominais)'
            },
            {
                nome: 'Prancha de inclinação elevada (abdominal)'
            },
            {
                nome: 'Prancha de um braço (Abdominal)'
            },
            {
                nome: 'Prancha lateral com levantamento de braço (abdominal e deltóide)'
            },
            {
                nome: 'Prancha tocando o ombro (abdominal)'
            }
        ]
    },
    {
        grupoMuscular: 'deltóide',
        exercicios: [
            {
                nome: 'Woodchoppers  polia baixa ou halter (deltóide, peitoral, coraco braquial, paravertebrais, abdominais, glúteo, isquiotibiais, quadríceps, adutores)'
            },
            {
                nome: 'Woodchoppers ajoelhado polia baixa ou halter (deltóide, peitoral, coraco braquial, deltóide, paravertebrais, abdominais)'
            },
            {
                nome: 'Desenvolvimento ombro (deltóide, trapézio, serrátil anterior)',
                implemento: [' barra ', ' halter ', ' máquina '],
                postura: [' em pé ', ' sentado ']
            },
            {
                nome: 'Abdução horizontal de ombro (deltóide, romboides, trapézio medial)',
                postura: [' deitado ', ' curvado ', ' sentado '],
                implemento: [' polia baixa ', ' halter ', ' máquina '],
                pegada: [' pronada ', ' neutra ']
            },
            {
                nome: 'Abdução horizontal inclinado com cabeça no banco (deltóide, rombóides)'
            },
            {
                nome: 'Desenvolvimento Arnold com halteres (deltóide, trapézio, serrátil anterior)'
            },
            {
                nome: 'Elevação frontal de ombro (deltóide)',
                pegada: [' neutra ', ' pronada ', ' supinada '],
                implemento: [' barra ', ' polia ', ' halter '],
                postura: [' em pé ', ' sentado ', ' inclinado '],
                execucao: [' unilateral ', ' bilateral ']
            },
            {
                nome: 'Elevação lateral de ombro (deltóide, rombóide, trapézio medial)',
                pegada: [' neutra ', ' supinada '],
                implemento: [' polia ', ' halter '],
                postura: [' em pé ', ' sentado ', ' inclinado '],
                execucao: [' unilateral ', ' bilateral ']
            },
            {
                nome: 'Remada alta (deltóide, trapézio, serrátil anterior)',
                implemento: [' Smith ', ' polia ', ' halter ', ' barra '],
                execucao: [' unilateral ', ' bilateral ']
            },
            {
                nome: 'Flexão de ombro (Deltóide, peitoral e coracobraquial, bíceps braquial)',
                implemento: [' barra ', ' polia ', ' halter ']
            }
        ]
    },
    {
        grupoMuscular: 'paravertebrais',
        exercicios: [
            {
                nome: 'Extensão de tronco (Paravertebrais)'
            }
        ]
    },
    {
        grupoMuscular: 'antebraços',
        exercicios: [
            {
                nome: 'Rosca para pulsos com barra atrás das costas (antebraços)' 
            },
            {
                nome: 'Flexão de punho (antebraços)',
                implemento: [' barra ', ' halter ']
            },
            {
                nome: 'Extensão de punho (antebraços)',
                implemento: [' barra ', ' halter ']
            }
        ]
    },
    {
        grupoMuscular: 'transverso abdominal',
        exercicios: [
            {
                nome: 'Prancha com deslocamento (transverso abdominal, grande dorsal, paravertebrais)',
            },
            {
                nome: 'Prancha com braços estendido (transverso abdominal, paravertebrais)'
            }
        ]
    },
    {
        grupoMuscular: 'trapézio',
        exercicios: [
            {
                nome: 'Encolhimento de ombros (trapézio, levantador da escápula)',
                implemento: [' polia ', ' halter ', ' Smith ', ' barra ']
            }
        ]
    },
    {
        grupoMuscular: 'subescapular',
        exercicios: [
            {
                nome: 'Rotação interna de ombro (Subescapular, deltóide, grande dorsal)',
                postura: [' sentado ', ' em pé ', ' deitado '],
                implemento: [' polia ', ' elástico ']
            },
            {
                nome: 'Rotação interna de ombro deitado (Subescapular, deltóide, grande dorsal)',
                implemento: [' polia baixa ', ' elástico ', ' halter ']
            }
        ]
    },
    {
        grupoMuscular: 'manguito rotador',
        exercicios: [
            {
                nome: 'Rotação externa de ombro (Manguito rotador- Redondo menor, Supraespinhal, infraespinhal)',
                postura: [' sentado ', ' em pé '],
                implemento: [' polia ', ' elástico ']
            },
            {
                nome: 'Rotação externa de ombro deitado (Manguito rotador- Redondo menor, Supraespinhal, infraespinhal)',
                implemento: [' polia baixa ', ' elástico ', ' halter ']
            }
        ]
    },
    {
        grupoMuscular: 'latíssimo do dorso',
        exercicios: [
            {
                nome: 'Extensão de ombro na polia (Latíssimo do dorso, deltóide, peitoral maior, tríceps porção longa)',
                variacoes: [' barra ', ' corda ']
            }
        ]
    }

]