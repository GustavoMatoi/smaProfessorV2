import React, {useState, useEffect} from "react"
import {Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import estilo from "../estilo"
import {useFonts} from "expo-font"
import BotaoSelect from "../BotaoSelect";

export default props => {
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/Montserrat.ttf'),
    })
    const [opcoes, setOpcoes] = useState([])
    const [titulo, setTitulo] = useState('')

    useEffect(() => {
      if (props.grupoMuscular == 'Alongamento'){
        setOpcoes(['Elevação de joelhos', 
        'Rotação de Tronco', 
        'Rotação de braços', 
        'Ponte', 
        'Rolando como uma bola',
        'Super-homem',
        'Carangueijo',
        'Exercício isométrico de pescoço - para frente e para trás',
        'Exercício isométrico de pescoço - para os lados',
        'Alongamento com equilíbrio de uma perna',
        'Alongamento de uma perna',
        'Afundo baixo com um braço elevado',
        'Alongamento Borboleta',
        'Alongamento com articulação dos ombros',
        'Alongamento da mão e do extensor do ombro',
        'Alongamento da parte interna da coxa',
        'Alongamento de abdominais e região lombar',
        'Alongamento de deltóide',
        'Alongamento de glúteos deitado',
        'Alongamento de peitoral na parede',
        'Alongamento de Quadríceps',
        'Alongamento de Tríceps',
        'Alongamento de Glúteo Máximo',
        'Alongamento do Peitoral',
        'Alongamento dos músculos extensores da coluna',
        'Alongamento lateral de oblíquos e grande dorsal',
        'Alongamento posiçao fetal',
        'Postura gato-vaca'])
        setTitulo('Exercícios de Alongamento')
      }
      
      if (props.grupoMuscular == 'Aerobico'){
        setOpcoes(['Esteira', 'Bicicleta Ergométrica', 'Elíptico', 'Corda'])
        setTitulo('Exercícios Aeróbicos')
      }

      if(props.grupoMuscular == "Peitoral"){
        setOpcoes(['Flexão de braços',
                  'Crossover (peito, tríceps)',
                  'Flexão de braços com repulsão',
                  'Flexão de braço fechado',
                  'Supino reto com barra ',
                  'Voador peitoral ',
                  'Adução de ombro no cross over ',
                  'Fly inclinado com halteres ',
                  'Pullover com halteres',
                  'Supino reto com Halteres ',
                  'Supino declinado com halteres ',
                  'Supino reto no Smith ',
                  'Supino inclinado com barra ',
                  'Supino inclinado com halteres ',
                  'Crucifixo na máquina ',
                  'Crucifixo declinado com halteres ',
                  'Crucifixo inclinado com halteres ',
                  'Crucifixo com halteres ',
                  'Crossover polia baixa em pé ',
                  'Pullover com barra',
                  'Flexão de braço unilateral',
                  'Fly com halteres',
                  'Fly declinado com halteres',
                  'Supino declinado com barra ',
                  'Supino declinado no smith ',
                  'Supino inclinado no Smith ',
                  'Woodchoppers polia baixa ou halter',
                  'Woodchoppers ajoelhado polia baixa ou halter',
                  'Woodchoppers polia alta',
                  'Woodchoppers ajoelhado polia alta',
                  'Extensão de ombro na polia com barra',
                  'Extensão de ombro na polia com corda',
                  'Flexão de ombro com halteres ',
                  'Flexão de ombro com barra ',
                  'Flexão de ombro na polia baixa ',
                ])
                setTitulo('Peitoral')
      }

        if(props.grupoMuscular == 'Tríceps'){
          setOpcoes(['Flexão de braços',
                      'Flexão de braços com repulsão',
                      'Flexão de braço fechado',
                      'Desenvolvimento de ombro ',
                      'Tríceps Francês ',
                      'Tríceps corda ',
                      'Tríceps testa ',
                      'Tríceps na polia (pulley) ',
                      'Tríceps em máquina paralela ',
                      'Tríceps inclinado com barra ',
                      'Tríceps inclinado no banco com halteres ',
                      'Mergulhos em banco ',
                      'Tríceps no supino ',
                      'Supino reto com barra ',
                      'Crossover (peito, tríceps)',
                      'Voador invertido',
                      'Flexão de braço unilateral',
                      'Supino declinado com barra ',
                      'Supino declinado no smith ',
                      'Supino inclinado no Smith ',
                      'Extensão de ombro na polia com barra',
                      'Extensão de ombro na polia com corda',
                      'Burpee',
                      'Burpee de uma perna',
        ])
        setTitulo('Tríceps')
        }

        if(props.grupoMuscular == 'Deltóide'){
          setOpcoes(['Flexão de braços',
                      'Flexão de braços com repulsão',
                      'Flexão de braço fechado',            
                      'Elevação frontal com barra',
                      'Elevação lateral com halteres',            
                      'Desenvolvimento de ombro ',
                      'Crucifixo invertido com halteres ',            
                      'Supino reto com barra ',
                      'Voador invertido',            
                      'Pullover com halteres',
                      'Fly com halteres',            
                      'Fly declinado com halteres',
                      'Supino declinado com barra ',            
                      'Supino declinado no smith ',
                      'Supino inclinado no Smith ',            
                      'Woodchoppers polia baixa ou halter',
                      'Woodchoppers ajoelhado polia baixa ou halter',            
                      'Woodchoppers polia alta',
                      'Woodchoppers ajoelhado polia alta',            
                      'Desenvolvimento com halteres',
                      'Elevação frontal na polia baixa',             
                      'Abdução horizontal de ombro curvado na polia baixa',
                      'Puxada alta com barra (deltóide, trapézio)',            
                      'Abdução horizontal inclinado com cabeça no banco',
                      'Desenvolvimento Arnold com halteres',            
                      'Supino militar sentado com barra',
                      'Supino militar sentado no Smith',            
                      'Supino militar em pé com barra',
                      'Supino militar em pé no Smith',            
                      'Elevação de ombro com halteres',
                      'Elevação frontal de ombro com halteres',            
                      'Elevação lateral de ombro com cabo',
                      'Abdução horizontal de ombro deitado com halteres',            
                      'Elevação unilateral de ombro com halteres',
                      'Prancha lateral com levantamento de braço ',            
                      'Remada alta na polia baixa',
                      'Remada alta unilateral',            
                      'Remada alta com halteres',
                      'Remada alta no Smith',            
                      'Rotação interna de ombro na polia baixa',
                      'Rotação interna de ombro sentado',            
                      'Rotação interna de ombro em pé',
                      'Rotação interna de ombro deitado',            
                      'Extensão de ombro na polia com barra',
                      'Extensão de ombro na polia com corda ',            
                      'Flexão de ombro com halteres ',
                      'Flexão de ombro com barra ',            
                      'Flexão de ombro na polia baixa ',
                      'Burpee',            
                      'Burpee de uma perna',
                      'Ponte de ombro',            
                      'Ponte reversa com uma perna',
                      'Ponte lateral',            
                      'Ponte lateral com elevação de uma perna',           
        ])
        setTitulo('Deltóide')
        }
        if(props.grupoMuscular == 'Trapézio'){
          setOpcoes(['Desenvolvimento de ombro ',
                    'Barra Fixa (chinup) pegada aberta ',
                    'Barra fixa (chinup) pegada fechada',
                    'Barra fixa (chinup) pegada triângulo',
                    'Barra fixa (chinup) pegada invertida',
                    'Graviton',
                    'Remada no banco inclinado com halteres ',
                    'Crucifixo invertido com halteres ',
                    'Puxada pegada aberta ',
                    'Puxada pegada fechada ',
                    'Puxada barra V ',
                    'Remada inclinada com barra ',
                    'Voador invertido',
                    'Desenvolvimento com halteres',
                    'Abdução horizontal de ombro curvado na polia baixa ',
                    'Puxada alta com barra (deltóide, trapézio)',
                    'Desenvolvimento Arnold com halteres',
                    'Supino militar sentado com barra',
                    'Supino militar sentado no Smith',
                    'Supino militar em pé com barra',
                    'Supino militar em pé no Smith',
                    'Encolhimento de ombros',
                    'Encolhimento de ombros com cabo',
                    'Encolhimento de ombros com halteres',
                    'Contração de ombros em aparelho Smith',
                    'Remada alta na polia baixa',
                    'Remada alta unilateral',
                    'Remada alta com halteres',
                    'Remada alta no Smith'
        ])
        setTitulo('Trapézio')

        }
        if(props.grupoMuscular == 'Costas'){
          setOpcoes(['Remada com halteres'])
          setTitulo('Costas')

        }

        if(props.grupoMuscular == 'Bíceps'){
          setOpcoes(['Remada com halteres',
                     'Rosca Hammer',
                     'Rosca concentrada',               
                     'Rosca bíceps com barra',
                     'Rosca bíceps com Stiff',               
                     'Rosca bíceps com halteres',
                     'Rosca martelo',               
                     'Rosca sobre a cabeça',
                     'Rosca bíceps com cabo',               
                     'Rosca bíceps na barra EZ',
                     'Rosca bíceps com halteres no banco inclinado',               
                     'Rosca bíceps martelo no banco inclinado',
                     'Rosca Scoot',               
                     'Rosca na polia baixa',
                     'Rosca invertida na polia baixa',               
                     'Rosca bíceps inversa',
                     'Barra Fixa (chinup) pegada aberta ',               
                     'Barra fixa (chinup) pegada fechada',
                     'Barra fixa (chinup) pegada triângulo',               
                     'Barra fixa (chinup) pegada invertida',
                     'Graviton',               
                     'Remada ',
                     'Remada Articulada',               
                     'Remada baixa com triângulo',
                     'Remada baixa com corda',               
                     'Remada baixa com barra',
                     'Remada no banco inclinado com halteres ',               
                     'Puxada pegada aberta ',
                     'Puxada pegada fechada ',               
                     'Puxada barra V',
                     'Remada inclinada com barra ',               
                     'Fly com halteres',
                     'Fly declinado com halteres',                              
        ])
        setTitulo('Bíceps')
        }
        if(props.grupoMuscular == 'Antebraços'){
          setOpcoes(['Rosca para pulsos com barra atrás das costas', 
                    'Flexão de punho com barra',
                    'Flexão de punho com halteres',
                    'Extensão de punho com barra',
                    'Extensão de punho com halteres'])
        
          setTitulo('Antebraços')
          }
        if(props.grupoMuscular == 'Grande dorsal'){
          setOpcoes(['Barra Fixa (chinup) pegada aberta ',
                    'Barra fixa (chinup) pegada fechada',
                    'Barra fixa (chinup) pegada triângulo',
                    'Barra fixa (chinup) pegada invertida',
                    'Graviton',
                    'Remada ',
                    'Remada Articulada',
                    'Remada baixa com triângulo',
                    'Remada baixa com corda',
                    'Remada baixa com barra',
                    'Remada no banco inclinado com halteres ',
                    'Puxada pegada aberta ',
                    'Puxado pegada fechada ',
                    'Puxada barra V ',
                    'Remada inclinada com barra ',
                    'Prancha com deslocamento',
                    'Voador invertido',
                    'Pullover com halteres',
                    'Pullover com barra',
                    'Woodchoppers polia alta',
                    'Woodchoppers ajoelhado polia alta',
                    'Rotação interna de ombro na polia baixa',
                    'Rotação interna de ombro sentado',
                    'Rotação interna de ombro em pé',
                    'Rotação interna de ombro deitado',
                  ])
          setTitulo('Grande dorsal')
        }

        if(props.grupoMuscular == 'Redondo maior'){
          setOpcoes(['Barra Fixa (chinup) pegada aberta ',
                    'Barra fixa (chinup) pegada fechada',
                    'Barra fixa (chinup) pegada triângulo',
                    'Barra fixa (chinup) pegada invertida',
                    'Graviton',
                    'Voador invertido',
                  ])
          setTitulo('Redondo maior')
        }

        if(props.grupoMuscular == 'Rombóide'){
          setOpcoes(['Barra Fixa (chinup) pegada aberta ',
                    'Barra fixa (chinup) pegada fechada',
                    'Barra fixa (chinup) pegada triângulo',
                    'Barra fixa (chinup) pegada invertida',
                    'Graviton',
                    'Remada ',
                    'Remada Articulada',
                    'Remada baixa com triângulo',
                    'Remada baixa com corda',
                    'Remada baixa com barra',
                    'Remada no banco inclinado com halteres ',
                    'Crucifixo invertido com halteres ',
                    'Remada inclinada com barra ',
                    'Voador invertido',
                    'Pullover com barra',
                    'Abdução horizontal de ombro curvado na polia baixa',
                    'Abdução horizontal inclinado com cabeça no banco'
        ])
          setTitulo('Rombóide')
        }
        
        if(props.grupoMuscular == 'Abdominais'){
          setOpcoes(['Prancha',
                     'Prancha com levantamento de perna',     
                     'Prancha com pés no banco',     
                     'Prancha estendida de lado',     
                     'Prancha lateral com rotação de tronco',     
                     'Prancha twister de quadril',     
                     'Pull-in com bola suíça',     
                     'Abdominal deitado',     
                     'Abdominal declinado',     
                     'Abdominal sentado',     
                     'Inclinação lateral de tronco com halteres',     
                     'Inclinação lateral no banco romano',     
                     'Hip thrust',     
                     'Plank lateral',     
                     'Abdominais com aparelho de solo',     
                     'Abdominais com bola suíça',     
                     'Abdominais com deslizamento de pernas',     
                     'Abdominais - pernas em bola suíça',     
                     'Abdominal com mãos sobre a cabeça',     
                     'Flexão de tronco na polia alta',     
                     'Abdominal no banco declinado',     
                     'Abdominal com braço cruzado',     
                     'Abdominal Oblíquo',     
                     'Abdominal tesoura',     
                     'Abdominal bicicleta',     
                     'Elevação de joelhos em barras paralelas',     
                     'Elevação de joelhos em suspensão',     
                     'Elevação de pernas em barras paralelas',     
                     'Elevação de pernas em suspensão',     
                     'Escalador de montanha',     
                     'Flexão lateral de tronco na bola',     
                     'Flexão lateral de tronco no banco',     
                     'Prancha três apoios com rotação de tronco',     
                     'Inclinação lateral com barra',     
                     'Inclinação lateral do tronco na polia baixa',     
                     'Abdominal limpa para-brisas',     
                     'Abdominal canivete',     
                     'Abdominal Rollout',     
                     'Tocar os calcanhares deitado',     
                     'Abdominal russo',     
                     'Woodchoppers polia baixa ou halter',     
                     'Woodchoppers ajoelhado polia baixa ou halter',     
                     'Woodchoppers polia alta',     
                     'Woodchoppers ajoelhado polia alta',
                     'Flexão de braço unilateral'
        ])
        setTitulo('Abdominais')
        }

        if(props.grupoMuscular == 'Transverso abdominal'){
          setOpcoes(['Prancha com deslocamento', 'Prancha com braços estendido'])
          setTitulo('Transverso abdominal')
        }

        if(props.grupoMuscular == 'Paravertebrais'){
          setOpcoes(['Extensão de tronco',
                    'Prancha com deslocamento',
                    'Prancha com braços estendido',
                    'Flexão de braço unilateral',
                    'Woodchoppers polia baixa ou halter',
                    'Woodchoppers ajoelhado polia baixa ou halter',
                  ])
          setTitulo('Paravertebrais')
        }

        if(props.grupoMuscular == 'Glúteo máximo'){
          setOpcoes(['Prancha com levantamento de perna',
                    'Agachamento livre',
                    'Leg Press 180°',
                    'Agachamento Búlgaro',
                    'Stiff',
                    'Avanço',
                    'Agachamento em aparelho Smith',
                    'Agachamento sumô',
                    'Agachamento com barra',
                    'Kickback de uma perna com cabo',
                    'Lunge com barra',
                    'Agachamento no banco',
                    'Agachamento com barra com uma perna',
                    'Agachamento com barra em postura aberta',
                    'Agachamento com barra frontal',
                    'Agachamento com halteres',
                    'Agachamento com halteres em um banco',
                    'Agachamento com rosca de bíceps',
                    'Agachamento com salto',
                    'Agachamento com salto de 180°',
                    'Agachamento com salto do prisioneiro',
                    'Agachamento com uma perna',
                    'Agachamento Cossaco Alternado',
                    'Agachamento de postura estreita',
                    'Agachamento de Prisioneiro',
                    'Agachamento de Urso',
                    'Agachamento Dividido',
                    'Agachamento dividido do prisioneiro',
                    'Agachamento em plie com halteres',
                    'Agachamento hack com barra',
                    'Agachamento Jefferson',
                    'Agachamento lateral em split',
                    'Agachamento modificado em aparelho Smith',
                    'Agachamento com uma perna na cadeira',
                    'Agachamento na parede',
                    'Agachamento no Ar',
                    'Agachamento Pistola',
                    'Agachamento com barra sobre a cabeça',
                    'Agachamento sustentado com lounge reverso',
                    'Agachamento Zecher',
                    'Alta ascensão da coxa',
                    'Alternador alcance e recuo',
                    'Batidas de pé deitado',
                    'Burpee',
                    'Burpee de uma perna',
                    'Chute de burro',
                    'Chute traseiro',
                    'Corrida estacionária',
                    'Glúteos em 4 apoios',
                    'Agachamento Terra',
                    'Lunge',
                    'Lunge com halteres',
                    'Lunge crossover do prisioneiro',
                    'Lunge crossover',
                    'Lunge de alcance anterior',
                    'Estocada de costas',
                    'Estocada de joelhos para salto do corredor',
                    'Estocada de lado equilibrando em um pé',
                    'Estocada de reverência',
                    'Estocada diagonal',
                    'Estocada lateral',
                    'Estocada lateral com rosca de bíceps',
                    'Estocada lateral do prisioneiro',
                    'Estocada prisioneiro',
                    'Estocada prisioneiro alternada',
                    'Estocada reversa prisioneiro',
                    'Estocada reversa prisioneiro',
                    'Marchando com o quadril elevado',
                    'Ombros elevados com aumento do quadril',
                    'Ombros e pés elevados para aumento do quadril',
                    'Peso morto com uma perna',
                    'Peso morto lateral com um braço',
                    'Polichinelos',
                    'Ponte de ombro',
                    'Ponte reversa com uma perna',
                    'Ponte lateral',
                    'Saltos lado a lado',
                    'Saltos lunge',
                    'Step no banco',
                    'Step ups com barra',
                    'Step ups com halteres',
                    'Step up com aumento de joelho',
                ])   
          setTitulo('Glúteo máximo')
        }

        if(props.grupoMuscular == 'Isquiotibiais'){
          setOpcoes(['Prancha com levantamento de perna',
                    'Woodchoppers polia baixa ou halter',
                    'Leg Press 180°',
                    'Stiff',
                    'Avanço',
                    'Cadeira Flexora',
                    'Agachamento em aparelho Smith',
                    'Agachamento sumô',
                    'Agachamento com barra',
                    'Kickback de uma perna com cabo',
                    'Levantamento de quadris (ponte)',
                    'Lunge com barra',
                    'Peso morto romeno',
                    'Agachamento no banco',
                    'Agachamento com barra com uma perna',
                    'Agachamento com barra em postura aberta',
                    'Agachamento com barra frontal',
                    'Agachamento com halteres',
                    'Agachamento com halteres em um banco',
                    'Agachamento com rosca de bíceps',
                    'Agachamento com salto',
                    'Agachamento com salto de 180°',
                    'Agachamento com salto do prisioneiro',
                    'Agachamento com uma perna',
                    'Agachamento de Prisioneiro',
                    'Agachamento de Urso',
                    'Agachamento Dividido',
                    'Agachamento dividido do prisioneiro',
                    'Agachamento em plie com halteres',
                    'Agachamento hack com barra',
                    'Agachamento Jefferson',
                    'Agachamento lateral em split',
                    'Agachamento modificado em aparelho Smith',
                    'Agachamento com uma perna na cadeira',
                    'Agachamento no Ar',
                    'Agachamento Pistola',
                    'Agachamento com barra sobre a cabeça',
                    'Agachamento sustentado com lounge reverso',
                    'Agachamento Zecher',
                    'Alta ascensão da coxa',
                    'Alternador alcance e recuo',
                    'Batidas de pé deitado',
                    'Chute de burro',
                    'Chute traseiro',
                    'Corrida estacionária',
                    'Glúteos em 4 apoios',
                    'Agachamento Terra',
                    'Levantamento de perna',
                    'Lunge',
                    'Lunge com halteres',
                    'Lunge com rosca de bíceps em movimento de boliche',
                    'Lunge crossover do prisioneiro',
                    'Lunge crossover',
                    'Lunge de alcance anterior',
                    'Marchando com o quadril elevado',
                    'Ombros elevados com aumento do quadril',
                    'Ombros e pés elevados para aumento do quadril',
                    'Peso morto com uma perna',
                    'Peso morto lateral com um braço',
                    'Ponte de ombro',
                    'Ponte reversa com uma perna',
                    'Saltos lunge',
                    'Step no banco',
                    'Step ups com barra',
                    'Step ups com halteres',
                    'Step up com aumento de joelho'
                  ])
          setTitulo('Isquiotibiais')
        }
        if(props.grupoMuscular == 'Rombóides'){
            setOpcoes(['Voador invertido',
                      'Abdução horizontal de ombro curvado na polia baixa',
                      'Abdução horizontal inclinado com cabeça no banco'])
            setTitulo('Rombóides')
        }
      if(props.grupoMuscular == 'Serrátil anterior'){
        setOpcoes(['Pullover com barra',
                  'Desenvolvimento com halteres',
                  'Desenvolvimento Arnold com halteres',
                  'Supino militar sentado com barra',
                  'Supino militar sentado no Smith',
                  'Supino militar em pé com barra',
                  'Supino militar em pé no Smith',
                  'Remada alta na polia baixa',
                  'Remada alta unilateral',
                  'Remada alta com halteres',
                  'Remada alta no Smith',
                  ''])
        setTitulo('Serrátil anterior')
      }

      if(props.grupoMuscular == 'Ombros'){
        setOpcoes(['Flexão de braço unilateral'])
        setTitulo('Ombros')
      }

      if(props.grupoMuscular == 'Paravertebrais'){
        setOpcoes(['Extensão de tronco',
                  'Prancha com deslocamento',
                  'Prancha com braços estendido',
                  'Flexão de braço unilateral',
                  'Woodchoppers polia baixa ou halter',
                  'Woodchoppers ajoelhado polia baixa ou halter'])
        setTitulo('Paravertebrais')
      }
      
      if(props.grupoMuscular == 'Adutores'){
        setOpcoes(['Abdominal tesoura',
                  'Woodchoppers polia baixa ou halter',
                  'Cadeira Adutora',
                  'Adução de quadris com cabo',
                  'Agachamento Cossaco Alternado',
                  'Posição círculos de perna',
                  'Step no banco',
                  'Step ups com barra',
                  'Step ups com halteres',
                  'Step up com aumento de joelho'])
        setTitulo('Adutores')
      }

      if(props.grupoMuscular == 'Coraco braquial'){
        setOpcoes(['Woodchoppers polia baixa ou halter',
                  'Woodchoppers ajoelhado polia baixa ou halter',
                  'Woodchoppers polia alta',
                  'Woodchoppers ajoelhado polia alta'])
        setTitulo('Coraco braquial')
      }

      if(props.grupoMuscular == 'Levantador da escápula'){
        setOpcoes(['Encolhimento de ombros',
                  'Encolhimento de ombros com cabo',
                  'Encolhimento de ombros com halteres',
                  'Contração de ombros em aparelho Smith'])
        setTitulo('Levantador da escápula')
      }

      if(props.grupoMuscular == 'Subescapular'){
        setOpcoes(['Rotação interna de ombro na polia baixa', 'Rotação interna de ombro sentado', 'Rotação interna de ombro em pé', 'Rotação interna de ombro deitado'])
        setTitulo('Subescapular')
      }

      if(props.grupoMuscular == 'Supraespinhal'){
        setOpcoes(['Rotação externa de ombro na polia baixa', 'Rotação externa de ombro sentado ', 'Rotação externa de ombro em pé ', 'Rotação externa de ombro deitado '])
        setTitulo('Supraespinhal')
      }

      if(props.grupoMuscular == 'Redondo menor'){
        setOpcoes(['Rotação externa de ombro na polia baixa', 'Rotação externa de ombro sentado ', 'Rotação externa de ombro em pé ', 'Rotação externa de ombro deitado '])
        setTitulo('Redondo menor')
      }

      if(props.grupoMuscular == 'Infraespinhal'){
        setOpcoes(['Rotação externa de ombro na polia baixa','Rotação externa de ombro sentado ','Rotação externa de ombro em pé ','Rotação externa de ombro deitado '])
        setTitulo('Infraespinhal')
      }

      if(props.grupoMuscular == 'Latíssimo do dorso'){
        setOpcoes(['Rotação externa de ombro na polia baixa', 'Rotação externa de ombro sentado ', 'Rotação externa de ombro em pé ', 'Rotação externa de ombro deitado '])
        setTitulo('Latíssimo do dorso')
      }

      if(props.grupoMuscular == 'Tríceps porção longa'){
        setOpcoes(['Extensão de ombro na polia com barra ', 'Extensão de ombro na polia com corda'])
        setTitulo('Tríceps porção longa')
      }

      
      if(props.grupoMuscular == 'Peitoral maior'){
        setOpcoes(['Extensão de ombro na polia com barra ', 'Extensão de ombro na polia com corda'])
        setTitulo('Peitoral maior')
      }

      if(props.grupoMuscular == 'Peitoral e coracobraquial'){
        setOpcoes(['Flexão de ombro com halteres ', 'Flexão de ombro com barra ', 'Flexão de ombro na polia baixa '])
        setTitulo('Peitoral e coracobraquial')
      }

      if(props.grupoMuscular == 'Bíceps braquial'){
        setOpcoes(['Flexão de ombro com halteres ', 'Flexão de ombro com barra ', 'Flexão de ombro na polia baixa '])
        setTitulo('Bíceps braquial')
      }

      if(props.grupoMuscular == 'Quadríceps'){
        setOpcoes(['Woodchoppers polia baixa ou halter',
                  'Agachamento livre',
                  'Leg Press 180°',
                  'Agachamento Búlgaro',
                  'Avanço',
                  'Agachamento em aparelho Smith',
                  'Cadeira extensora ',
                  'Agachamento com barra',
                  'Lunge com barra',
                  'Agachamento no banco',
                  'Agachamento com barra com uma perna',
                  'Agachamento com barra em postura aberta',
                  'Agachamento com barra frontal',
                  'Agachamento com halteres',
                  'Agachamento com halteres em um banco',
                  'Agachamento com rosca de bíceps',
                  'Agachamento com salto',
                  'Agachamento com salto de 180°',
                  'Agachamento com salto do prisioneiro',
                  'Agachamento com uma perna',
                  'Agachamento Cossaco Alternado',
                  'Agachamento de postura estreita',
                  'Agachamento de Prisioneiro',
                  'Agachamento de Urso',
                  'Agachamento Dividido',
                  'Agachamento dividido do prisioneiro',
                  'Agachamento em plie com halteres',
                  'Agachamento hack com barra',
                  'Agachamento Jefferson',
                  'Agachamento lateral em split',
                  'Agachamento modificado em aparelho Smith',
                  'Agachamento com uma perna na cadeira',
                  'Agachamento na parede',
                  'Agachamento no Ar',
                  'Agachamento Pistola',
                  'Agachamento com barra sobre a cabeça',
                  'Agachamento sustentado com lounge reverso',
                  'Agachamento Zecher',
                  'Alta ascensão da coxa',
                  'Alternador alcance e recuo',
                  'Batidas de pé deitado',
                  'Burpee',
                  'Burpee de uma perna',
                  'Chute traseiro',
                  'Corrida estacionária',
                  'Levantamento da parte interna da coxa ',
                  'Lunge',
                  'Lunge com halteres',
                  'Lunge com rosca de bíceps em movimento de boliche',
                  'Lunge crossover do prisioneiro',
                  'Lunge crossover',
                  'Lunge de alcance anterior',
                  'Estocada de costas',
                  'Estocada de joelhos para salto do corredor',
                  'Estocada de lado equilibrando em um pé',
                  'Estocada de reverência',
                  'Estocada diagonal',
                  'Estocada lateral',
                  'Estocada lateral com rosca de bíceps',
                  'Estocada lateral do prisioneiro',
                  'Estocada prisioneiro',
                  'Estocada prisioneiro alternada',
                  'Estocada reversa prisioneiro',
                  'Estocada transversal com alcance de pé',
                  'Polichinelo',
                  'Saltos lado a lado',
                  'Saltos lunge',
                  'Step no banco',
                  'Step ups com barra',
                  'Step ups com halteres',
                  'Step up com aumento de joelho'])
        setTitulo('Quadríceps')
      }

      if(props.grupoMuscular == 'Reto femoral'){
        setOpcoes(['Agachamento livre',
                'Cadeira extensora',
                'Agachamento de postura estreita',
                'Ponte lateral',
                'Ponte lateral com elevação de uma perna'])
        setTitulo('Reto femoral')
        }

      if(props.grupoMuscular == 'Panturrilha'){
        setOpcoes(['Leg Press 180°',
                  'Agachamento em aparelho Smith',
                  'Elevação de panturrilha máquina',
                  'Elevação de panturrilha livre',
                  'Elevação de panturrilha sentado',
                  'Lunge com barra',
                  'Agachamento no banco',
                  'Agachamento com halteres em um banco',
                  'Agachamento com salto',
                  'Agachamento hack com barra',
                  'Agachamento na parede',
                  'Burpee',
                  'Bootstrappers',
                  'Burpee de uma perna',
                  'Corrida estacionária',
                  'Elevação de panturrilhas balançada em pé',
                  'Elevação de panturrilhas de pé com barra',
                  'Lunge',
                  'Lunge com halteres',
                  'Lunge com rosca de bíceps em movimento de boliche',
                  'Lunge crossover do prisioneiro',
                  'Lunge crossover',
                  'Lunge de alcance anterior',
                  'Polichinelos',
                  'Saltos lado a lado',
                  'Saltos lunge',
                  'Step no banco',
                  'Step ups com barra',
                  'Step ups com halteres',
                  'Step up com aumento de joelho'])
        setTitulo('Panturrilha')
      }

      if(props.grupoMuscular == 'Glúteo médio e mínimo'){
        setOpcoes(['Cadeira abdutora', 'Levantamento da parte interna da coxa' , 'Ponte lateral com elevação de uma perna ' , 'Posição círculos de perna'])
        setTitulo('Glúteo médio e mínimo')
      }

      if(props.grupoMuscular == 'Reto e iliopsoas'){
        setOpcoes(['Elevação de pernas '])
        setTitulo('Reto e iliopsoas')
      }
    }, [props.grupoMuscular])
    
      return (
                <BotaoSelect
                onChange={() =>{console.log(opcoes.length)}}
                titulo={titulo} max={1} 
                options={opcoes}>
                    
                </BotaoSelect>
      );
    };


const style = StyleSheet.create({
})