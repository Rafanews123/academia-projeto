import { Exercise, WorkoutProgram, UserProfile, BodyWeightRecord, WorkoutSession, PersonalRecord } from '../types';

export const INITIAL_EXERCISES: Exercise[] = [
  {
    id: 'supino-reto-barra',
    name: 'Supino Reto com Barra',
    category: 'Peito',
    equipment: 'Barras',
    difficulty: 'Intermediário',
    primaryMuscle: 'Peitoral Maior',
    secondaryMuscles: ['Tríceps', 'Deltoide Anterior'],
    setupPosition: 'Deite-se no banco plano com os olhos alinhados abaixo da barra. Pés firmemente apoiados no chão.',
    executionSteps: [
      'Pegue a barra com pegada ligeiramente mais larga que os ombros.',
      'Desacople a barra e posicione-a na linha do meio do peito.',
      'Inspire e desça a barra de forma controlada até tocar levemente o peito.',
      'Empurre a barra para cima com força, expirando ao subir, estendendo os braços sem travar os cotovelos.'
    ],
    breathing: 'Inspire na descida, expire na subida.',
    rangeOfMotion: 'Completa: desde o toque leve no peito até a extensão quase total dos braços.',
    commonMistakes: [
      'Retirar os glúteos do banco.',
      'Bater a barra no peito (quicar).',
      'Abrir excessivamente os cotovelos a 90 graus.'
    ],
    tips: [
      'Mantenha as escápulas retraídas e deprimidas contra o banco.',
      'Mantenha os punhos firmes e alinhados com os antebraços.'
    ],
    defaultSets: 4,
    defaultReps: '8-10',
    defaultRest: 90,
    isFavorite: true,
    alternatives: ['supino-reto-halter', 'supino-inclinado-halter', 'crucifixo-polia'],
    animationType: 'bench-press',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-push-ups-in-a-gym-42996-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80',
    videoChapters: [
      { time: '00:00', title: 'Posicionamento Inicial e Pegada' },
      { time: '00:05', title: 'Desacoplamento e Descida Controlada' },
      { time: '00:12', title: 'Empuxo Explosivo e Respiração' }
    ]
  },
  {
    id: 'supino-inclinado-halter',
    name: 'Supino Inclinado com Halteres',
    category: 'Peito',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    primaryMuscle: 'Peitoral Superior',
    secondaryMuscles: ['Tríceps', 'Deltoide Anterior'],
    setupPosition: 'Ajuste o banco em inclinação de 30 a 45 graus. Segure os halteres apoiados nas coxas.',
    executionSteps: [
      'Utilize as coxas para ajudar a elevar os halteres até a altura dos ombros.',
      'Gire os punhos para a frente de modo que as palmas fiquem para a frente.',
      'Desça os halteres controladamente até a altura superior do peito.',
      'Pressione os halteres para cima e para dentro, contraindo o peitoral.'
    ],
    breathing: 'Inspire ao descer os halteres, expire ao empurrar.',
    rangeOfMotion: 'Ampla, permitindo bom alongamento na parte inferior.',
    commonMistakes: [
      'Inclinação do banco muito alta (acima de 60 graus), focando demais nos ombros.',
      'Deixar os halteres baterem no topo.'
    ],
    tips: [
      'Mantenha o peito estufado durante todo o movimento.'
    ],
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRest: 60,
    isFavorite: true,
    alternatives: ['supino-reto-barra', 'supino-inclinado-barra'],
    animationType: 'bench-press',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-lifting-weights-in-a-gym-42994-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80',
    videoChapters: [
      { time: '00:00', title: 'Ajuste do Banco e Apoio dos Halteres' },
      { time: '00:06', title: 'Execução com Foco no Peitoral Superior' }
    ]
  },
  {
    id: 'puxada-alta-polia',
    name: 'Puxada Alta na Polia (Frontal)',
    category: 'Costas',
    equipment: 'Polias',
    difficulty: 'Iniciante',
    primaryMuscle: 'Grande Dorsal',
    secondaryMuscles: ['Bíceps', 'Redondo Maior', 'Romboides'],
    setupPosition: 'Sente-se no aparelho ajustando o apoio para das coxas firmemente. Segure a barra com pegada pronada aberta.',
    executionSteps: [
      'Incline levemente o tronco para trás (cerca de 10-15 graus).',
      'Puxe a barra em direção à parte superior do peito, liderando com os cotovelos para baixo e para trás.',
      'Contraia as costas no ponto mais baixo.',
      'Retorne a barra de forma controlada até estender os braços.'
    ],
    breathing: 'Inspire ao subir a barra, expire ao puxar para baixo.',
    rangeOfMotion: 'Desde os braços estendidos até a barra quase tocar o peito.',
    commonMistakes: [
      'Usar balanço excessivo do corpo (momentum).',
      'Puxar a barra por trás do pescoço.'
    ],
    tips: [
      'Pense nos seus braços apenas como ganchos e puxe com os cotovelos.'
    ],
    defaultSets: 4,
    defaultReps: '10-12',
    defaultRest: 75,
    isFavorite: true,
    alternatives: ['barra-fixa', 'remada-curvada'],
    animationType: 'lat-pulldown',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-muscular-man-doing-exercises-with-weights-42995-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80',
    videoChapters: [
      { time: '00:00', title: 'Postura e Ajuste do Joelho' },
      { time: '00:08', title: 'Condução pelos Cotovelos e Contração Dorsal' }
    ]
  },
  {
    id: 'remada-curvada-barra',
    name: 'Remada Curvada com Barra',
    category: 'Costas',
    equipment: 'Barras',
    difficulty: 'Avançado',
    primaryMuscle: 'Grande Dorsal',
    secondaryMuscles: ['Trapézio', 'Romboides', 'Bíceps', 'Eretores da Espinha'],
    setupPosition: 'Em pé, pés na largura dos ombros, segure a barra com pegada pronada. Incline o tronco à frente formando cerca de 45 graus, mantendo a coluna neutra.',
    executionSteps: [
      'Puxe a barra em direção ao abdômen inferior / umbigo.',
      'Mantenha os cotovelos próximos ao corpo.',
      'Aperte as escápulas no topo do movimento por 1 segundo.',
      'Desça a barra controladamente.'
    ],
    breathing: 'Inspire na descida, expire na puxada.',
    rangeOfMotion: 'Desde os braços estendidos até a barra tocar levemente o abdômen.',
    commonMistakes: [
      'Arredondar a região lombar.',
      'Usar impulso com as pernas.'
    ],
    tips: [
      'Mantenha o core fortemente contraído para proteger a lombar.'
    ],
    defaultSets: 4,
    defaultReps: '8-10',
    defaultRest: 90,
    isFavorite: false,
    alternatives: ['puxada-alta-polia', 'remada-baixa-polia'],
    animationType: 'lat-pulldown',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-with-a-barbell-in-a-gym-42993-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    videoChapters: [
      { time: '00:00', title: 'Inclinação do Tronco e Estabilidade' },
      { time: '00:07', title: 'Puxada Rente ao Corpo' }
    ]
  },
  {
    id: 'agachamento-livre-barra',
    name: 'Agachamento Livre com Barra',
    category: 'Quadríceps',
    equipment: 'Barras',
    difficulty: 'Avançado',
    primaryMuscle: 'Quadríceps',
    secondaryMuscles: ['Glúteos', 'Posterior de coxa', 'Core', 'Eretores da Espinha'],
    setupPosition: 'Posicione a barra sobre os trapézios (barra alta) ou um pouco mais abaixo (barra baixa). Retire a barra do suporte.',
    executionSteps: [
      'Pés na largura dos ombros, pontas dos pés levemente para fora.',
      'Flexione joelhos e quadris simultaneamente, empurrando o quadril para trás como se fosse sentar.',
      'Desça até que as coxas fiquem pelo menos paralelas ao chão.',
      'Empurre o chão com os calcanhares para retornar à posição inicial, estendendo joelhos e quadris.'
    ],
    breathing: 'Inspire fundo antes de descer, mantenha a manobra de Valsalva, expire ao subir após o ponto de maior dificuldade.',
    rangeOfMotion: 'Profundidade com coxas paralelas ou abaixo.',
    commonMistakes: [
      'Deixar os joelhos caindo para dentro (valgo dinâmico).',
      'Elevar os calcanhares do chão.',
      'Curvar as costas.'
    ],
    tips: [
      'Olhe para um ponto fixo à frente para manter o equilíbrio.'
    ],
    defaultSets: 4,
    defaultReps: '6-8',
    defaultRest: 120,
    isFavorite: true,
    alternatives: ['leg-press-45', 'agachamento-smith'],
    animationType: 'squat',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-heavy-weights-in-a-gym-43000-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80',
    videoChapters: [
      { time: '00:00', title: 'Apoio da Barra e Posicionamento dos Pés' },
      { time: '00:08', title: 'Descida Profunda e Manutenção do Tronco Reto' }
    ]
  },
  {
    id: 'leg-press-45',
    name: 'Leg Press 45°',
    category: 'Quadríceps',
    equipment: 'Máquinas',
    difficulty: 'Iniciante',
    primaryMuscle: 'Quadríceps',
    secondaryMuscles: ['Glúteos', 'Posterior de coxa'],
    setupPosition: 'Sente-se no aparelho com as costas e cabeça firmemente apoiadas. Posicione os pés na plataforma na largura dos ombros.',
    executionSteps: [
      'Destrave a plataforma e segure nas alças laterais.',
      'Flexione os joelhos trazendo a plataforma em direção ao peito de forma controlada.',
      'Desça até que os joelhos formem um ângulo de aproximadamente 90 graus.',
      'Empurre a plataforma de volta à posição inicial sem travar totalmente os joelhos no topo.'
    ],
    breathing: 'Inspire ao descer, expire ao empurrar.',
    rangeOfMotion: 'Flexão de 90 graus sem que a lombar perca contato com o encosto.',
    commonMistakes: [
      'Retirar o quadril do encosto na parte inferior (perigo para a coluna).',
      'Travar os joelhos com força no topo.'
    ],
    tips: [
      'Posição dos pés mais alta na plataforma foca mais em glúteos e posteriores; mais baixa foca nos quadríceps.'
    ],
    defaultSets: 4,
    defaultReps: '10-12',
    defaultRest: 90,
    isFavorite: true,
    alternatives: ['agachamento-livre-barra'],
    animationType: 'leg-press',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-with-weights-in-a-gym-42992-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    videoChapters: [
      { time: '00:00', title: 'Posicionamento e Destravamento' },
      { time: '00:06', title: 'Amplitude Completa sem Curvar a Lombar' }
    ]
  },
  {
    id: 'desenvolvimento-militar-halteres',
    name: 'Desenvolvimento para Ombros com Halteres',
    category: 'Ombros',
    equipment: 'Halteres',
    difficulty: 'Intermediário',
    primaryMuscle: 'Deltoide Anterior e Lateral',
    secondaryMuscles: ['Tríceps', 'Trapézio'],
    setupPosition: 'Sente-se em um banco com encosto vertical ou ligeiramente inclinado. Segure os halteres na altura dos ombros com as palmas para a frente.',
    executionSteps: [
      'Pressione os halteres para cima acima da cabeça até que quase se toquem no topo.',
      'Mantenha o core firme e evite arquear excessivamente a coluna lombar.',
      'Desça os halteres de forma controlada até a altura das orelhas.'
    ],
    breathing: 'Inspire ao descer, expire ao empurrar para cima.',
    rangeOfMotion: 'Desde a altura dos ombros até a extensão completa dos braços.',
    commonMistakes: [
      'Usar impulso com o tronco.',
      'Descer os halteres abaixo do nível dos ombros em excesso.'
    ],
    tips: [
      'Mantenha os cotovelos levemente apontados para a frente, não totalmente alinhados para os lados.'
    ],
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRest: 60,
    isFavorite: true,
    alternatives: ['desenvolvimento-barra', 'elevacao-lateral'],
    animationType: 'shoulder-press',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-exercising-with-weights-in-a-gym-42998-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532029835096-18e26c4293f9?w=800&auto=format&fit=crop&q=80',
    videoChapters: [
      { time: '00:00', title: 'Alinhamento dos Halteres' },
      { time: '00:05', title: 'Pressão Vertical Controlada' }
    ]
  },
  {
    id: 'elevacao-lateral-halteres',
    name: 'Elevação Lateral com Halteres',
    category: 'Ombros',
    equipment: 'Halteres',
    difficulty: 'Iniciante',
    primaryMuscle: 'Deltoide Lateral',
    secondaryMuscles: ['Trapézio'],
    setupPosition: 'Em pé, pés na largura dos quadris, segure os halteres ao lado do corpo com uma leve flexão nos cotovelos.',
    executionSteps: [
      'Eleve os braços lateralmente até que fiquem paralelos ao chão (altura dos ombros).',
      'Mantenha os cotovelos levemente flexionados e liderando o movimento.',
      'Retorne os halteres controladamente à posição inicial.'
    ],
    breathing: 'Inspire embaixo, expire na elevação.',
    rangeOfMotion: 'Até a linha dos ombros.',
    commonMistakes: [
      'Usar balanço do corpo para levantar a carga.',
      'Elevar os braços acima da linha dos ombros.'
    ],
    tips: [
      'Use cargas moderadas para garantir a execução estrita.'
    ],
    defaultSets: 4,
    defaultReps: '12-15',
    defaultRest: 60,
    isFavorite: true,
    alternatives: ['desenvolvimento-militar-halteres'],
    animationType: 'shoulder-press',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-weights-in-the-gym-42991-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80',
    videoChapters: [
      { time: '00:00', title: 'Postura Inicial e Flexão Leve' },
      { time: '00:05', title: 'Elevação Controlada' }
    ]
  },
  {
    id: 'rosca-direta-barra-w',
    name: 'Rosca Direta com Barra W',
    category: 'Bíceps',
    equipment: 'Barras',
    difficulty: 'Iniciante',
    primaryMuscle: 'Bíceps Braquial',
    secondaryMuscles: ['Braquial', 'Braquiorradial'],
    setupPosition: 'Em pé, segure a barra W com pegada supinada na largura dos ombros. Corpo ereto e abdômen contraído.',
    executionSteps: [
      'Flexione os cotovelos elevando a barra em direção ao peito.',
      'Mantenha os cotovelos fixos junto às costelas durante todo o movimento.',
      'Contraia o bíceps no topo por um instante.',
      'Desça a barra de forma controlada até estender os braços.'
    ],
    breathing: 'Inspire ao descer, expire na subida.',
    rangeOfMotion: 'Amplitude completa.',
    commonMistakes: [
      'Balançar o tronco para dar impulso (roubar).',
      'Movimentar os cotovelos para a frente ao subir.'
    ],
    tips: [
      'Mantenha os punhos firmes na curva da barra W.'
    ],
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRest: 60,
    isFavorite: true,
    alternatives: ['rosca-alternada-halteres', 'rosca-martelo'],
    animationType: 'bicep-curl',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-bicep-curls-with-weights-42990-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80',
    videoChapters: [
      { time: '00:00', title: 'Pegada na Barra W' },
      { time: '00:06', title: 'Isolamento do Bíceps' }
    ]
  },
  {
    id: 'triceps-polia-corda',
    name: 'Tríceps na Polia com Corda',
    category: 'Tríceps',
    equipment: 'Polias',
    difficulty: 'Iniciante',
    primaryMuscle: 'Tríceps Braquial',
    secondaryMuscles: [],
    setupPosition: 'Em pé em frente à polia alta com acessório de corda. Segure as pontas com pegada neutra, cotovelos colados ao lado do corpo.',
    executionSteps: [
      'Empurre a corda para baixo, abrindo as pontas para fora no final do movimento para máxima contração.',
      'Retorne controladamente até que os antebraços fiquem paralelos ao chão.'
    ],
    breathing: 'Inspire ao subir, expire ao empurrar.',
    rangeOfMotion: 'Extensão completa.',
    commonMistakes: [
      'Projetar o corpo para a frente usando o peso do tronco.',
      'Deixar os cotovelos irem para a frente.'
    ],
    tips: [
      'Mantenha os cotovelos imóveis como dobradiças.'
    ],
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRest: 60,
    isFavorite: true,
    alternatives: ['triceps-testa-barra-w'],
    animationType: 'tricep-pushdown',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-in-the-gym-42989-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530822847156-5df683ec5ee1?w=800&auto=format&fit=crop&q=80',
    videoChapters: [
      { time: '00:00', title: 'Posicionamento Inicial' },
      { time: '00:05', title: 'Extensão e Abertura' }
    ]
  },
  {
    id: 'cadeira-flexora',
    name: 'Cadeira Flexora',
    category: 'Posterior de coxa',
    equipment: 'Máquinas',
    difficulty: 'Iniciante',
    primaryMuscle: 'Posterior de Coxa (Isquiotibiais)',
    secondaryMuscles: ['Panturrilhas'],
    setupPosition: 'Sente-se no aparelho com o rolo de apoio na parte posterior dos tornozelos.',
    executionSteps: [
      'Flexione os joelhos empurrando a alavanca para baixo e para trás o máximo possível.',
      'Segure nas alças laterais para manter o quadril firme.',
      'Retorne de forma controlada.'
    ],
    breathing: 'Inspire na extensão, expire na flexão.',
    rangeOfMotion: 'Completa.',
    commonMistakes: ['Elevar o quadril do banco durante a força.'],
    tips: ['Mantenha os pés em dorsiflexão.'],
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRest: 60,
    isFavorite: true,
    alternatives: ['mesa-flexora'],
    animationType: 'generic',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-lifting-weights-in-a-gym-42994-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    videoChapters: [{ time: '00:00', title: 'Execução na Cadeira Flexora' }]
  },
  {
    id: 'elevacao-pelvica',
    name: 'Elevação Pélvica com Barra',
    category: 'Glúteos',
    equipment: 'Barras',
    difficulty: 'Intermediário',
    primaryMuscle: 'Glúteo Máximo',
    secondaryMuscles: ['Posterior de coxa'],
    setupPosition: 'Costas apoiadas no banco, barra acolchoada sobre o quadril.',
    executionSteps: [
      'Apoie os pés firmemente no chão, joelhos a 90 graus.',
      'Empurre o quadril para cima contraindo os glúteos.',
      'Desça o quadril controladamente.'
    ],
    breathing: 'Inspire embaixo, expire na subida.',
    rangeOfMotion: 'Completa.',
    commonMistakes: ['Hiperextender a lombar no topo.'],
    tips: ['Mantenha o queixo colado no peito.'],
    defaultSets: 4,
    defaultReps: '10-12',
    defaultRest: 90,
    isFavorite: true,
    alternatives: ['agachamento-livre-barra'],
    animationType: 'squat',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-lifting-heavy-weights-in-a-gym-43000-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80',
    videoChapters: [{ time: '00:00', title: 'Execução da Elevação Pélvica' }]
  },
  {
    id: 'elevacao-gastrocnemios-em-pe',
    name: 'Elevação de Panturrilhas em Pé',
    category: 'Panturrilhas',
    equipment: 'Máquinas',
    difficulty: 'Iniciante',
    primaryMuscle: 'Gastrocnêmio',
    secondaryMuscles: ['Sóleo'],
    setupPosition: 'Ombros sob as ombreiras, pontas dos pés na borda da plataforma.',
    executionSteps: [
      'Deixe os calcanhares descerem para alongar.',
      'Eleve o corpo na ponta dos pés o mais alto possível.'
    ],
    breathing: 'Inspire embaixo, expire na subida.',
    rangeOfMotion: 'Amplitude máxima.',
    commonMistakes: ['Repetições curtas e rápidas.'],
    tips: ['Faça pausa de 1 segundo no topo.'],
    defaultSets: 4,
    defaultReps: '15-20',
    defaultRest: 45,
    isFavorite: true,
    alternatives: [],
    animationType: 'generic',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-with-weights-in-a-gym-42992-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    videoChapters: [{ time: '00:00', title: 'Panturrilhas em Pé' }]
  },
  {
    id: 'abdominal-infra-suspenso',
    name: 'Abdominal Infra na Barra (Elevação de Pernas)',
    category: 'Abdômen',
    equipment: 'Peso corporal',
    difficulty: 'Avançado',
    primaryMuscle: 'Reto Abdominal (Infra)',
    secondaryMuscles: ['Flexores do Quadril'],
    setupPosition: 'Pendure-se na barra fixa com pegada pronada.',
    executionSteps: [
      'Eleve as pernas estendidas à frente até 90 graus.',
      'Evite balançar o corpo.'
    ],
    breathing: 'Inspire embaixo, expire ao elevar.',
    rangeOfMotion: 'Da vertical à horizontal.',
    commonMistakes: ['Usar balanço (momentum).'],
    tips: ['Enrole a pelve para cima no topo.'],
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRest: 60,
    isFavorite: true,
    alternatives: [],
    animationType: 'crunch',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-doing-push-ups-in-a-gym-42996-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80',
    videoChapters: [{ time: '00:00', title: 'Elevação de Pernas Suspenso' }]
  }
];

export const INITIAL_PROGRAMS: WorkoutProgram[] = [
  {
    id: 'full-body-3x',
    name: 'Full Body 3x',
    objective: 'Estimular o corpo inteiro 3 vezes por semana com alta eficiência e recuperação otimizada.',
    frequency: '3 dias por semana (Seg, Qua, Sex)',
    daysPerWeek: 3,
    description: 'Programa clássico e altamente eficaz para ganho de força e hipertrofia, ideal para rotinas corridas.',
    estimatedDurationMin: 60,
    isCustom: false,
    schedule: [
      {
        dayOfWeek: 'Segunda-feira',
        workoutName: 'Full Body A - Foco Peito e Pernas',
        focusMuscles: ['Peito', 'Quadríceps', 'Ombros', 'Bíceps'],
        exercises: [
          { exerciseId: 'supino-reto-barra', sets: 4, targetReps: '8-10', restTime: 90 },
          { exerciseId: 'agachamento-livre-barra', sets: 4, targetReps: '6-8', restTime: 120 },
          { exerciseId: 'puxada-alta-polia', sets: 3, targetReps: '10-12', restTime: 75 },
          { exerciseId: 'desenvolvimento-militar-halteres', sets: 3, targetReps: '10-12', restTime: 60 },
          { exerciseId: 'rosca-direta-barra-w', sets: 3, targetReps: '10-12', restTime: 60 }
        ]
      },
      {
        dayOfWeek: 'Quarta-feira',
        workoutName: 'Full Body B - Foco Costas e Posterior',
        focusMuscles: ['Costas', 'Posterior de coxa', 'Tríceps', 'Abdômen'],
        exercises: [
          { exerciseId: 'remada-curvada-barra', sets: 4, targetReps: '8-10', restTime: 90 },
          { exerciseId: 'leg-press-45', sets: 4, targetReps: '10-12', restTime: 90 },
          { exerciseId: 'supino-inclinado-halter', sets: 3, targetReps: '10-12', restTime: 60 },
          { exerciseId: 'triceps-polia-corda', sets: 3, targetReps: '12-15', restTime: 60 }
        ]
      },
      {
        dayOfWeek: 'Sexta-feira',
        workoutName: 'Full Body C - Foco Glúteos e Ombros',
        focusMuscles: ['Glúteos', 'Ombros', 'Peito', 'Costas'],
        exercises: [
          { exerciseId: 'elevacao-lateral-halteres', sets: 4, targetReps: '12-15', restTime: 60 },
          { exerciseId: 'puxada-alta-polia', sets: 3, targetReps: '10-12', restTime: 75 },
          { exerciseId: 'supino-reto-barra', sets: 3, targetReps: '10-12', restTime: 90 }
        ]
      }
    ]
  },
  {
    id: 'divisao-5x',
    name: 'Divisão 5x (ABCDE)',
    objective: 'Máximo volume por grupo muscular com 5 sessões semanais dedicadas.',
    frequency: '5 dias por semana (Segunda a Sexta)',
    daysPerWeek: 5,
    description: 'Divisão tradicional de alta intensidade para atletas intermediários e avançados.',
    estimatedDurationMin: 50,
    isCustom: false,
    schedule: [
      {
        dayOfWeek: 'Segunda-feira',
        workoutName: 'Treino A - Peito e Tríceps',
        focusMuscles: ['Peito', 'Tríceps'],
        exercises: [
          { exerciseId: 'supino-reto-barra', sets: 4, targetReps: '8-10', restTime: 90 },
          { exerciseId: 'supino-inclinado-halter', sets: 3, targetReps: '10-12', restTime: 60 },
          { exerciseId: 'triceps-polia-corda', sets: 3, targetReps: '12-15', restTime: 60 }
        ]
      },
      {
        dayOfWeek: 'Terça-feira',
        workoutName: 'Treino B - Costas e Bíceps',
        focusMuscles: ['Costas', 'Bíceps'],
        exercises: [
          { exerciseId: 'puxada-alta-polia', sets: 4, targetReps: '10-12', restTime: 75 },
          { exerciseId: 'remada-curvada-barra', sets: 4, targetReps: '8-10', restTime: 90 },
          { exerciseId: 'rosca-direta-barra-w', sets: 3, targetReps: '10-12', restTime: 60 }
        ]
      },
      {
        dayOfWeek: 'Quarta-feira',
        workoutName: 'Treino C - Pernas Completas',
        focusMuscles: ['Quadríceps', 'Posterior de coxa'],
        exercises: [
          { exerciseId: 'agachamento-livre-barra', sets: 4, targetReps: '6-8', restTime: 120 },
          { exerciseId: 'leg-press-45', sets: 4, targetReps: '10-12', restTime: 90 }
        ]
      },
      {
        dayOfWeek: 'Quinta-feira',
        workoutName: 'Treino D - Ombros e Trapézio',
        focusMuscles: ['Ombros'],
        exercises: [
          { exerciseId: 'desenvolvimento-militar-halteres', sets: 4, targetReps: '10-12', restTime: 75 },
          { exerciseId: 'elevacao-lateral-halteres', sets: 4, targetReps: '12-15', restTime: 60 }
        ]
      },
      {
        dayOfWeek: 'Sexta-feira',
        workoutName: 'Treino E - Complementos',
        focusMuscles: ['Peito', 'Costas'],
        exercises: [
          { exerciseId: 'supino-inclinado-halter', sets: 3, targetReps: '10-12', restTime: 60 },
          { exerciseId: 'puxada-alta-polia', sets: 3, targetReps: '10-12', restTime: 75 }
        ]
      }
    ]
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Carlos Rafael',
  age: 28,
  height: 178,
  currentWeight: 78.5,
  goal: 'Hipertrofia',
  experience: 'Intermediário',
  units: 'kg',
  defaultRest: 60,
  soundEnabled: true,
  theme: 'dark',
  activeProgramId: 'full-body-3x'
};

export const INITIAL_WEIGHT_RECORDS: BodyWeightRecord[] = [
  { id: 'w1', date: '2026-10-23', weight: 77.2, bodyFat: 15.2 },
  { id: 'w2', date: '2026-10-30', weight: 77.6, bodyFat: 15.0 },
  { id: 'w3', date: '2026-11-06', weight: 77.9, bodyFat: 14.8 },
  { id: 'w4', date: '2026-11-13', weight: 78.2, bodyFat: 14.6 },
  { id: 'w5', date: '2026-11-20', weight: 78.5, bodyFat: 14.5 }
];

export const INITIAL_WORKOUT_SESSIONS: WorkoutSession[] = [
  {
    id: 'sess-1',
    programId: 'full-body-3x',
    programName: 'Full Body 3x',
    workoutName: 'Full Body A - Foco Peito e Pernas',
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
    durationSeconds: 3450,
    exercises: [
      {
        exerciseId: 'supino-reto-barra',
        exerciseName: 'Supino Reto com Barra',
        sets: [
          { setNumber: 1, weight: 70, reps: 10, completed: true },
          { setNumber: 2, weight: 75, reps: 8, completed: true },
          { setNumber: 3, weight: 75, reps: 8, completed: true },
          { setNumber: 4, weight: 70, reps: 9, completed: true }
        ]
      },
      {
        exerciseId: 'agachamento-livre-barra',
        exerciseName: 'Agachamento Livre com Barra',
        sets: [
          { setNumber: 1, weight: 80, reps: 8, completed: true },
          { setNumber: 2, weight: 85, reps: 6, completed: true },
          { setNumber: 3, weight: 85, reps: 6, completed: true }
        ]
      }
    ],
    notes: 'Ótimo treino, aumento de carga no supino!',
    volumeTotal: 3420,
    prsCount: 1
  }
];

export const INITIAL_PRS: PersonalRecord[] = [
  { id: 'pr-1', exerciseId: 'supino-reto-barra', exerciseName: 'Supino Reto com Barra', maxWeight: 75, maxReps: 8, date: '2026-11-19' },
  { id: 'pr-2', exerciseId: 'agachamento-livre-barra', exerciseName: 'Agachamento Livre com Barra', maxWeight: 85, maxReps: 6, date: '2026-11-19' },
  { id: 'pr-3', exerciseId: 'leg-press-45', exerciseName: 'Leg Press 45°', maxWeight: 220, maxReps: 10, date: '2026-11-21' }
];
