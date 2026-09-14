import { Mission } from '../types';

export const MISSIONS: Mission[] = [
  // =========================================================================
  // MUNDO 1: EU NO MUNDO DIGITAL
  // =========================================================================
  {
    id: 'm1-1',
    worldId: 'mundo-1',
    areaId: 'm1-a1',
    title: 'Partilho ou Protejo?',
    subtitle: 'A tua identidade e pegada digital sob a lupa',
    xpReward: 120,
    estimatedMinutes: 8,
    step1Descobre: {
      title: 'A Tua Pegada Digital Não se Apaga com Borracha',
      cards: [
        {
          icon: 'Fingerprint',
          title: 'O que é a Pegada Digital?',
          text: 'É o rasto de tudo o que fazes na Internet: fotos publicadas, pesquisas, comentários em vídeos e jogos online.',
          highlight: 'Fica gravada em servidores e pode ser vista por outras pessoas no futuro.',
        },
        {
          icon: 'Shield',
          title: 'Dados Pessoais Sensíveis',
          text: 'A morada da tua casa, o nome da tua escola, número de telemóvel e localização em tempo real nunca devem ser públicos.',
          example: 'Publicar foto do bilhete de cinema com o local e hora revela onde estás agora!',
        },
        {
          icon: 'EyeOff',
          title: 'A Regra do Cartaz na Escola',
          text: 'Antes de publicar algo, pensa: "Se eu colasse isto no placard de entrada da minha escola, teria orgulho?"',
          highlight: 'Se a resposta for "não" ou tiveres dúvidas, NÃO publiques.',
        },
      ],
      quickCheck: {
        question: 'Qual destes dados NUNCA deves colocar na biografia do teu perfil de um jogo online?',
        options: [
          'A tua alcunha favorita no jogo (gamer tag)',
          'O teu anime ou desporto preferido',
          'A tua morada de casa e o nome da tua escola',
          'A cor que mais gostas',
        ],
        correctIndex: 2,
        explanation: 'Muito bem! A morada e a escola são dados pessoais que permitem identificar onde vives e estudas, pondo a tua segurança em risco.',
      },
    },
    step2Experimenta: {
      type: 'fake_detector',
      title: 'Laboratório de Publicações: Partilhar vs. Proteger',
      instruction: 'Analisa 3 publicações de redes sociais e decide se cada uma é Segura para Publicar ou Perigosa.',
      context: 'Observa os detalhes das imagens e legendas antes de decidir.',
      payload: {
        posts: [
          {
            id: 'p1',
            user: 'Sara_Gamer12',
            avatar: '🎮',
            content: 'Adoro este jogo! Consegui nível 25 na arena. Quem quiser juntar-se à equipa diga nos comentários!',
            imageCaption: 'Captura de ecrã do jogo sem dados reais',
            isSafe: true,
            feedbackSafe: 'Correto! Não revela morada, apelidos, nem rotinas privadas.',
            feedbackUnsafe: 'Na verdade, este post é seguro! Apenas partilha progresso do jogo sem dados pessoais.',
          },
          {
            id: 'p2',
            user: 'Tiago_Skater',
            avatar: '🛹',
            content: 'Sozinho em casa na Rua das Flores n.º 42 até às 20h! Venham ter comigo!',
            imageCaption: 'Foto da fachada do prédio com a porta aberta',
            isSafe: false,
            feedbackSafe: 'Cuidado! Isto é extremamente perigoso: revela morada exata e que está sozinho.',
            feedbackUnsafe: 'Excelente olho de águia! Revelar morada e que se está sozinho é um risco grave de segurança física.',
          },
          {
            id: 'p3',
            user: 'Dinis_6B',
            avatar: '🎒',
            content: 'Finalmente o meu cartão da escola novo! Já posso entrar na cantina.',
            imageCaption: 'Foto do cartão escolar com nome completo, número de processo e turma',
            isSafe: false,
            feedbackSafe: 'Atenção! Cartões escolares têm números de identificação e escola que não devem ser expostos.',
            feedbackUnsafe: 'Muito bem! O cartão escolar contém dados de identificação institucional confidenciais.',
          },
        ],
      },
    },
    step3Desafio: {
      title: 'Desafio do Inspetor de Privacidade',
      scenario: 'Um amigo teu do 6.º ano quer criar um canal de vídeos de truques de bicicleta. Ajuda-o a configurar o canal.',
      questions: [
        {
          id: 'q1',
          prompt: 'Qual é o nome de utilizador mais seguro e adequado para o canal dele?',
          type: 'single_choice',
          options: [
            'Rodrigo_Ferreira_2013_Lisboa',
            'PedaladaRadical_06',
            'Rodrigo_Escola_GilVicente',
            'Rui_Silva_Telemovel_912345678',
          ],
          correctAnswer: 1,
          explanation: '"PedaladaRadical_06" é criativo e não revela nome completo, ano de nascimento nem cidade onde vive.',
          hint: 'Evita nomes que contenham o teu ano de nascimento, apelidos de família ou localização.',
        },
        {
          id: 'q2',
          prompt: 'Ele gravou um vídeo a andar de bicicleta em frente à porta de sua casa, e a placa com o nome da rua aparece nítida. O que deves aconselhar?',
          type: 'single_choice',
          options: [
            'Publicar na mesma, ninguém vai reparar numa placa pequena.',
            'Cortar esse pedaço do vídeo ou desfocar a placa da rua antes de publicar.',
            'Dizer nos comentários que aquela rua é falsa.',
            'Mudar o título do vídeo para despistar.',
          ],
          correctAnswer: 1,
          explanation: 'Exato! Desfocar ou cortar pequenos detalhes de localização impede que estranhos descubram onde ele mora.',
          hint: 'A edição simples de imagem e vídeo permite mascarar moradas e matrículas.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Auditoria da Minha Pegada Digital',
      tagline: 'Aplica o que aprendeste no teu dispositivo pessoal ou de família.',
      duration: '15 minutos',
      instructions: [
        'Pesquisa o teu nome próprio e apelido (ou a tua alcunha) entre aspas no Google.',
        'Verifica se aparece alguma fotografia ou informação que não gostarias que um desconhecido visse.',
        'Entra nas definições de uma aplicação que uses (jogo, rede social ou YouTube) e confirma se o perfil está Privado.',
      ],
      tips: [
        'Pede a ajuda de um adulto se precisares de alterar definições de conta familiar.',
        'Desativa sempre a "Partilha de Localização em Tempo Real" nas fotos.',
      ],
      reflectionPrompt: 'O que descobriste sobre a tua presença online? Que definição alteraste para ficar mais protegido?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 120,
      badgeId: 'guardiao-privacidade',
      rewardTitle: 'Guardião da Privacidade!',
      celebrationMessage: 'Completaste com sucesso a tua primeira grande missão de proteção de identidade.',
    },
  },

  {
    id: 'm1-2',
    worldId: 'mundo-1',
    areaId: 'm1-a2',
    title: 'Quebra o Código: Passwords Fortes',
    subtitle: 'Cria cofres impenetráveis para as tuas contas',
    xpReward: 140,
    estimatedMinutes: 10,
    step1Descobre: {
      title: 'Como os Piratas Informáticos Adivinham Passwords',
      cards: [
        {
          icon: 'Key',
          title: 'O Tamanho Conta Muito!',
          text: 'Uma palavra-passe com 8 letras simples é descoberta por um computador em segundos. Com 14 caracteres variados, demora séculos!',
          highlight: 'Usa pelo menos 12 a 14 caracteres.',
        },
        {
          icon: 'Shuffle',
          title: 'A Receita Mágica de 4 Ingredientes',
          text: 'Mistura sempre: Letras Maiúsculas (A), Minúsculas (a), Números (123) e Símbolos especiais (!?#@).',
          example: 'Em vez de "benfica123", usa "O$meuClube_Vence2026!"',
        },
        {
          icon: 'Brain',
          title: 'A Técnica da Frase-Passe',
          text: 'Pensa numa frase divertida da tua vida: "O meu gato comeu 3 sardinhas em Faro!" e usa as iniciais: "Omgc3seF!"',
          highlight: 'Fácil de memorizar para ti, impossível de adivinhar para um robô.',
        },
      ],
      quickCheck: {
        question: 'Qual das seguintes palavras-passe é a MAIS SEGURA de todas?',
        options: [
          '12345678',
          'joaopedro2013',
          'Tr!ceps#Azul_92',
          'password1234',
        ],
        correctIndex: 2,
        explanation: 'Excelente! "Tr!ceps#Azul_92" tem maiúsculas, minúsculas, caracteres especiais e números, sem dados óbvios.',
      },
    },
    step2Experimenta: {
      type: 'password_tester',
      title: 'Simulador de Força de Palavras-Passe',
      instruction: 'Testa diferentes palavras-passe no nosso verificador criptográfico em tempo real e atinge 100% de segurança.',
      context: 'Experimenta adicionar símbolos e criar uma frase-passe.',
      payload: {
        initialCandidate: 'escola123',
      },
    },
    step3Desafio: {
      title: 'Desafio do Cofre Digital',
      scenario: 'Recebeste um aviso de que a tua palavra-passe foi exposta numa fuga de dados antiga. Precisas de criar uma nova.',
      questions: [
        {
          id: 'q1',
          prompt: 'Por que razão deves evitar usar a MESMA palavra-passe em todos os teus jogos e contas?',
          type: 'single_choice',
          options: [
            'Porque o navegador não guarda mais do que uma.',
            'Se um jogo sofrer uma fuga de informação, os atacantes testam a mesma senha no teu email e restantes contas.',
            'Porque fica mais difícil para os teus amigos usarem a tua conta.',
            'Porque a velocidade da Internet diminui.',
          ],
          correctAnswer: 1,
          explanation: 'Exato! Esse ataque chama-se "credential stuffing": uma única chave roubada abre todas as tuas portas.',
          hint: 'Pensa no perigo de ter uma única chave mestra para casa, cacifo e carro.',
        },
        {
          id: 'q2',
          prompt: 'Qual destas práticas reforça ainda mais uma conta, além da palavra-passe?',
          type: 'single_choice',
          options: [
            'Escrever a palavra-passe num post-it colado no monitor.',
            'Ativar a Autenticação de Dois Fatores (2FA / Código de verificação por SMS ou app).',
            'Partilhar a senha com o melhor amigo da turma para ele guardar.',
            'Desligar o Wi-Fi todas as noites.',
          ],
          correctAnswer: 1,
          explanation: 'Fantástico! Com 2FA (dois fatores), mesmo que alguém descubra a tua senha, não consegue entrar sem o segundo código.',
          hint: 'Procura a opção que exige um segundo passo de confirmação além da senha.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Missão do Guardião do Cofre',
      tagline: 'Fortalece uma das tuas palavras-passe reais.',
      duration: '10 minutos',
      instructions: [
        'Escolhe uma conta de escola ou de um jogo pessoal.',
        'Cria uma frase-passe secreta com mais de 12 caracteres usando maiúsculas, números e símbolos.',
        'Atualiza a senha nessa conta (não a partilhes com ninguém, nem mesmo colegas!).',
      ],
      tips: [
        'Nunca guardes senhas em documentos chamados "passwords.txt" no computador.',
      ],
      reflectionPrompt: 'Conseguiste transformar a tua senha antiga numa frase-passe forte? Que método usaste?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 140,
      badgeId: 'mestre-seguranca',
      rewardTitle: 'Mestre da Segurança!',
      celebrationMessage: 'O teu cofre digital está agora trancado a sete chaves invioláveis.',
    },
  },

  {
    id: 'm1-3',
    worldId: 'mundo-1',
    areaId: 'm1-a2',
    title: 'Salva a Tua Conta: Alerta Phishing!',
    subtitle: 'Identifica anzóis, mensagens falsas e links armadilhados',
    xpReward: 150,
    estimatedMinutes: 10,
    step1Descobre: {
      title: 'O que é o Phishing (A "Pesca" de Vítimas)?',
      cards: [
        {
          icon: 'Fish',
          title: 'O Truque da Urgência Falsa',
          text: 'Mensagens que dizem: "A tua conta será APAGADA em 2 horas! Clica já aqui!" tentam assustar-te para não pensares com calma.',
          highlight: 'Empresas sérias nunca exigem ação desesperada imediata.',
        },
        {
          icon: 'Link2',
          title: 'O Segredo dos Links Disfarçados',
          text: 'O texto pode dizer "www.netflix.com", mas se passares o rato por cima sem clicar, o endereço real pode ser "www.netfl1x-premios.xyz".',
          example: 'Letras trocadas (como zero em vez de O) são o truque n.º 1.',
        },
        {
          icon: 'Gift',
          title: 'Prémios Milagrosos e Skins Grátis',
          text: '"Parabéns! Foste o visitante n.º 1 000 000 e ganhaste um iPhone ou 5000 moedas no jogo!"',
          highlight: 'Se é bom demais para ser verdade, é 100% burla.',
        },
      ],
      quickCheck: {
        question: 'Recebes um email supostamente da direção da tua escola a pedir para clicares num link e introduzires a tua senha. O que fazes?',
        options: [
          'Clicas logo para não ficares com falta disciplinar.',
          'Ignoras e partilhas nos grupos de WhatsApp com toda a turma.',
          'Não clicas no link e falas diretamente com o professor de TIC ou na secretaria da escola.',
          'Respondes ao email com insultos.',
        ],
        correctIndex: 2,
        explanation: 'Perfeito! Nunca insiras credenciais através de links de email não solicitados. A confirmação direta é a atitude mais inteligente.',
      },
    },
    step2Experimenta: {
      type: 'phishing_analyzer',
      title: 'Inspetor de Emails e Mensagens Suspeitas',
      instruction: 'Analisa o email recebido e clica nos 4 elementos de perigo escondidos antes que o vírus se ative.',
      context: 'Procura o remetente suspeito, o senso de urgência absurdo, erros de escrita e links adulterados.',
      payload: {
        emailData: {
          senderName: 'Equipa de Segurança Epic Games',
          senderEmail: 'suporte-urgente@fortn1te-skins-gratis.net',
          subject: 'URGENTE: A tua conta será suspensa em 15 minutos!!!',
          date: 'Hoje, 03:42',
          body: 'Olá Utilizador! Detetamos um erro grave na sua conta. Para não perder todas as suas skins e itens raros, deve clicar no botão abaixo em 15 minutos e confirmar a sua palavra-passe de acesso.',
          actionButtonText: 'SALVAR CONTA AGORA (http://login-falso.xyz/hack)',
          footerNote: 'Epic Games Inc. Todos os direitos reservados. Sem erros garantidos.',
          clues: [
            { id: 'clue-sender', label: 'Endereço de email estranho (.net não oficial com letras trocadas)' },
            { id: 'clue-urgency', label: 'Ameaça de 15 minutos e pontuação exagerada (!!!)' },
            { id: 'clue-link', label: 'Link aponta para domínio desconhecido (.xyz)' },
            { id: 'clue-generic', label: 'Trata por "Olá Utilizador" em vez do teu nome de conta' },
          ],
        },
      },
    },
    step3Desafio: {
      title: 'Desafio do Radar Anti-Fraude',
      scenario: '3 situações chegaram à caixa de correio da tua turma. Identifica qual delas é uma tentativa real de Phishing.',
      questions: [
        {
          id: 'q1',
          prompt: 'Qual destas mensagens no telemóvel tem o formato clássico de phishing (Smishing)?',
          type: 'single_choice',
          options: [
            'A tua mãe envia: "Filho, compra pão quando saíres das aulas."',
            'SMS de número desconhecido: "A sua encomenda CTT tem taxas alfandegárias de 1,99€. Pague em 24h em ctt-desbloqueio.cc ou a encomenda será devolvida."',
            'Notificação da app oficial de meteorologia avisando de chuva para amanhã.',
            'SMS do teu operador móvel a confirmar o saldo mensal contratado.',
          ],
          correctAnswer: 1,
          explanation: 'Correto! Essa é uma das fraudes mais comuns em Portugal. Os CTT nunca enviam links desse género para cobranças urgentes.',
          hint: 'Procura a mensagem com link com domínio estranho (.cc) e ameaça de cancelamento de encomenda.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Detetive Familiar Anti-Phishing',
      tagline: 'Ajuda a tua família a não cair em golpes comuns.',
      duration: '15 minutos',
      instructions: [
        'Explica a alguém em tua casa (pais, avós ou irmãos) como funciona a burla dos CTT ou das entregas por SMS.',
        'Ensina-lhes a regra do "Nunca clicar em links de SMS de números estranhos".',
        'Cria uma frase de código familiar para quando alguém pedir dinheiro em emergências.',
      ],
      tips: [
        'A melhor segurança digital é a partilha de conhecimento com quem mais gostamos.',
      ],
      reflectionPrompt: 'A quem explicaste este perigo? Qual foi a reação deles ao saberem dos links falsos?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 150,
      badgeId: 'mestre-seguranca',
      rewardTitle: 'Especialista Anti-Phishing!',
      celebrationMessage: 'Nenhum anzol digital vai conseguir apanhar-te desprevenido.',
    },
  },

  {
    id: 'm1-4',
    worldId: 'mundo-1',
    areaId: 'm1-a3',
    title: 'O que Farias? Respeita e Protege',
    subtitle: 'Netiqueta, prevenção de ciberbullying e empatia digital',
    xpReward: 130,
    estimatedMinutes: 8,
    step1Descobre: {
      title: 'A Tua Palavra tem Peso do Outro Lado do Ecrã',
      cards: [
        {
          icon: 'HeartHandshake',
          title: 'Atrás do Ecrã Está uma Pessoa Real',
          text: 'O que escrevemos num jogo ou numa rede social afeta os sentimentos de alguém como nós.',
          highlight: 'Se não dirias cara a cara, não digas através de um teclado.',
        },
        {
          icon: 'ShieldAlert',
          title: 'O Ciberbullying Deixa Rasto',
          text: 'Insultar repetidamente, criar grupos para gozar com alguém ou partilhar fotos sem autorização é crime.',
          example: 'Tirar print e espalhar uma mensagem privada é trair a confiança.',
        },
        {
          icon: 'UserCheck',
          title: 'Não Sejas Apenas Espectador',
          text: 'Se vires alguém a ser maltratado num grupo, apoia a vítima em privado e avisa um adulto ou professor de confiança.',
          highlight: 'Ficar calado dá força a quem está a praticar o bullying.',
        },
      ],
      quickCheck: {
        question: 'Num grupo de WhatsApp da turma, alguém partilha uma fotografia embaraçosa de um colega e começam as gargalhadas. O que deves fazer?',
        options: [
          'Encaminhar para outros grupos para que todos se riam também.',
          'Dizer que a atitude está errada, apoiar o colega e falar com o professor ou diretor de turma.',
          'Comentar a foto com emojis a chorar de rir.',
          'Desinstalar o WhatsApp e não dizer nada a ninguém.',
        ],
        correctIndex: 1,
        explanation: 'Bravo! Ter a coragem de dizer que não tem piada e pedir ajuda a um professor protege a comunidade escolar e trava a humilhação.',
      },
    },
    step2Experimenta: {
      type: 'netiquette_fixer',
      title: 'Transformador de Mensagens: Da Toxicidade à Empatia',
      instruction: 'Reescreve mensagens agressivas de um chat de jogo ou trabalho de grupo, transformando-as em mensagens construtivas.',
      context: 'Na comunicação digital, o tom calmo e respeitoso resolve problemas em vez de criar discussões inúteis.',
      payload: {
        scenarios: [
          {
            original: 'ÉS UM INÚTIL! POR TUA CAUSA PERDEMOS O JOGO TODO, NUNCA MAIS JOGAS COMIGO!',
            improved: 'Estivemos quase! Na próxima ronda tenta ficar mais junto da equipa para nos protegermos.',
            principle: 'Focar na solução do jogo em vez de atacar pessoalmente o jogador.',
          },
          {
            original: 'A tua parte do trabalho de TIC está horrível, nem sequer sabes usar o computador!',
            improved: 'Reparei que faltam alguns pontos no teu resumo. Queres que revejamos juntos logo à tarde?',
            principle: 'Oferecer ajuda colaborativa e dar feedback específico com educação.',
          },
        ],
      },
    },
    step3Desafio: {
      title: 'Dilemas Éticos do Cidadão Digital',
      scenario: 'Analisa o caso e escolhe a atitude de liderança positiva.',
      questions: [
        {
          id: 'q1',
          prompt: 'O que significa escrever frases inteiras EM LETRAS MAIÚSCULAS na Internet?',
          type: 'single_choice',
          options: [
            'Significa que o teclado é mais moderno.',
            'Na Netiqueta, equivale a GRITAR e soa agressivo e indelicado.',
            'Gasta menos bateria do telemóvel.',
            'É a forma oficial de escrever trabalhos escolares.',
          ],
          correctAnswer: 1,
          explanation: 'Correto! Em ambientes virtuais, MAIÚSCULAS equivalem a elevar a voz. Reserva-as apenas para destacar uma palavra pontual.',
          hint: 'Lembra-te do volume da voz quando vês letras garrafais.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Pacto de Netiqueta da Turma',
      tagline: 'Cria uma regra de ouro para a comunicação da tua turma.',
      duration: '10 minutos',
      instructions: [
        'Pensa no grupo de mensagens da tua turma ou amigos.',
        'Escreve uma "Regra de Ouro" que ajude todos a sentirem-se respeitados e ouvidos.',
        'Partilha essa regra amanhã no início da aula de TIC.',
      ],
      tips: [
        'Exemplo: "Antes de enviar piadas sobre alguém, perguntar: isso iria magoar-me se fosse comigo?"',
      ],
      reflectionPrompt: 'Qual é a tua Regra de Ouro para uma convivência digital saudável?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 130,
      badgeId: 'mestre-netiqueta',
      rewardTitle: 'Mestre da Netiqueta!',
      celebrationMessage: 'Com a tua atitude, tornas o espaço digital mais seguro e acolhedor para todos.',
    },
  },

  {
    id: 'm1-5',
    worldId: 'mundo-1',
    areaId: 'm1-a4',
    title: 'Desafio do Bem-Estar e Ambiente',
    subtitle: 'Equilíbrio digital, ergonomia e sustentabilidade tecnológica',
    xpReward: 130,
    estimatedMinutes: 8,
    step1Descobre: {
      title: 'Corpo Saudável & Planeta Sustentável',
      cards: [
        {
          icon: 'SunMedium',
          title: 'A Regra dos 20-20-20',
          text: 'A cada 20 minutos de ecrã, olha para um ponto a 20 pés (cerca de 6 metros de distância) durante 20 segundos.',
          highlight: 'Descansa os músculos dos olhos e previne dores de cabeça.',
        },
        {
          icon: 'Armchair',
          title: 'Ergonomia em Frente ao Computador',
          text: 'Costas direitas apoiadas na cadeira, pés no chão, e o topo do ecrã alinhado à altura dos teus olhos.',
          example: 'Não uses o portátil deitado na cama com o pescoço dobrado!',
        },
        {
          icon: 'Recycle',
          title: 'O Problema do Lixo Eletrónico (E-Waste)',
          text: 'Telemóveis velhos, baterias e cabos contêm metais pesados tóxicos. Nunca vão para o lixo indiferenciado!',
          highlight: 'Devem ser depositados num Ponto Eletrão ou loja de reciclagem.',
        },
      ],
      quickCheck: {
        question: 'O que deves fazer a uma bateria estragada ou a um telemóvel antigo avariado?',
        options: [
          'Deitar no balde do lixo comum da cozinha.',
          'Enterrar no jardim de casa.',
          'Entregar num Ponto Eletrão ou ponto de recolha próprio em lojas de tecnologia.',
          'Queimar na lareira.',
        ],
        correctIndex: 2,
        explanation: 'Exato! Os componentes eletrónicos contêm lítio e metais raros que são reciclados com segurança em Pontos Eletrão, protegendo os solos e a água.',
      },
    },
    step2Experimenta: {
      type: 'fake_detector',
      title: 'Diagnóstico de Ergonomia no Posto de Estudo',
      instruction: 'Compara duas posturas de estudo ao computador e identifica a correta.',
      context: 'Observa o alinhamento da coluna, distância do ecrã e posição dos pulsos.',
      payload: {
        postures: [
          {
            id: 'posture-a',
            name: 'Postura Corcunda no Sofá',
            isCorrect: false,
            feedback: 'Pescoço dobrado em 45º causa tensão severa e dores musculares a médio prazo.',
          },
          {
            id: 'posture-b',
            name: 'Postura Ergonómica Neutra',
            isCorrect: true,
            feedback: 'Excelente! Cotovelos a 90 graus, ecrã à altura da vista e pés bem assentes.',
          },
        ],
      },
    },
    step3Desafio: {
      title: 'Desafio do Equilíbrio Digital',
      scenario: 'Calcula o teu tempo de ecrã saudável.',
      questions: [
        {
          id: 'q1',
          prompt: 'Quantas horas antes de dormir é recomendado desligar os ecrãs para ter um sono reparador?',
          type: 'single_choice',
          options: [
            'Deves ter o telemóvel ligado debaixo da almofada a noite toda.',
            'Pelo menos 1 hora antes de dormir, pois a luz azul inibe a melatonina (hormona do sono).',
            'Não faz diferença alguma.',
            'Apenas 30 segundos.',
          ],
          correctAnswer: 1,
          explanation: 'Muito bem! A luz azul dos ecrãs engana o cérebro fazendo-o pensar que ainda é dia, prejudicando a qualidade do sono.',
          hint: 'Pensa no efeito da luz azul no ciclo do sono.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Caça ao Lixo Eletrónico em Casa',
      tagline: 'Liberta gavetas e protege o meio ambiente.',
      duration: '15 minutos',
      instructions: [
        'Com a autorização dos teus pais, procura cabos velhos partidos ou pilhas gastas esquecidas numa gaveta.',
        'Cria uma pequena caixa de recolha de pilhas em casa ("Pilhão caseiro").',
        'Leva as pilhas para o pilhão da tua escola ou do supermercado.',
      ],
      tips: [
        'Cada pilha reciclada evita a poluição de centenas de litros de água subterrânea.',
      ],
      reflectionPrompt: 'Encontraste pilhas ou aparelhos antigos para reciclar? Onde os vais entregar?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 130,
      badgeId: 'guardiao-privacidade',
      rewardTitle: 'Amigo do Bem-Estar e do Planeta!',
      celebrationMessage: 'O teu corpo e a Terra agradecem a tua consciência digital.',
    },
  },

  {
    id: 'm1-boss',
    worldId: 'mundo-1',
    areaId: 'm1-a5',
    title: 'BOSS FINAL: O Guardião Digital',
    subtitle: 'A grande prova de defesa digital do 6.º ano',
    xpReward: 250,
    estimatedMinutes: 12,
    isBoss: true,
    step1Descobre: {
      title: 'A Prova Mestra de Segurança e Cidadania',
      cards: [
        {
          icon: 'Award',
          title: 'O Guardião Exige Mestria Total',
          text: 'Vais enfrentar uma simulação integrada: auditoria de senhas, link malicioso mascarado e resposta a um ataque de difamação online.',
          highlight: 'Usa tudo o que aprendeste no Mundo 1 para conquistar o troféu.',
        },
      ],
      quickCheck: {
        question: 'Qual é o princípio orientador de um verdadeiro Guardião Digital?',
        options: [
          'Proteger os meus dados, respeitar os outros na rede e cuidar da saúde física e ambiental.',
          'Partilhar tudo o que vejo o mais rápido possível.',
          'Usar sempre a mesma senha para não me esquecer.',
          'Insultar quem joga mal para que aprenda mais rápido.',
        ],
        correctIndex: 0,
        explanation: 'Excelente! Ser um Guardião Digital significa responsabilidade pessoal, empatia coletiva e respeito pelo planeta.',
      },
    },
    step2Experimenta: {
      type: 'phishing_analyzer',
      title: 'Auditoria Crítica de Segurança Máxima',
      instruction: 'Desmonta a última tentativa de invasão ao portal da escola identificando todos os pontos de falha.',
      context: 'Um hacker enviou um convite falso para o Baile da Escola.',
      payload: {
        emailData: {
          senderName: 'Direção Escolar Festas',
          senderEmail: 'admin@escola-festas-vip.tk',
          subject: 'Bilhetes Grátis para o Baile: Clica JÁ!',
          date: 'Agora mesmo',
          body: 'Parabéns aluno! Foste selecionado para a zona VIP do baile. Descarrega o ficheiro "convite_vip.exe" e corre no teu PC agora.',
          actionButtonText: 'DESCARREGAR CONVITE (.exe)',
          footerNote: 'Mensagem gerada automaticamente.',
          clues: [
            { id: 'c1', label: 'Domínio suspeito .tk não oficial' },
            { id: 'c2', label: 'Ficheiro executável perigoso (.exe) num suposto convite' },
          ],
        },
      },
    },
    step3Desafio: {
      title: 'O Teste Final do Guardião',
      scenario: 'Resolve o caso final com precisão cirúrgica.',
      questions: [
        {
          id: 'q1',
          prompt: 'Um colega pede-te a tua palavra-passe para te passar uma fase difícil de um jogo. O que deves fazer?',
          type: 'single_choice',
          options: [
            'Dar a senha só por 10 minutos.',
            'Recusar com simpatia: a palavra-passe é intransmissível e pessoal; podes dar-lhe dicas por voz ou jogar em modo cooperativo.',
            'Dar a senha e mudá-la para o ano.',
            'Dar a senha em troca de 5 euros.',
          ],
          correctAnswer: 1,
          explanation: 'Comportamento exemplar de Guardião Digital! Credenciais nunca se partilham com ninguém.',
          hint: 'Passwords são estritamente pessoais e intransmissíveis.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Juramento do Guardião Digital',
      tagline: 'Assume o compromisso ético do 6.º ano.',
      duration: '5 minutos',
      instructions: [
        'Lê em voz alta o compromisso do Guardião Digital.',
        'Compromete-te a apoiar os colegas da tua turma que tenham dificuldades com segurança online.',
      ],
      tips: ['A verdadeira sabedoria digital está em proteger os outros.'],
      reflectionPrompt: 'O que significa para ti ser um "Guardião Digital" na tua escola?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 250,
      badgeId: 'guardiao-digital-boss',
      rewardTitle: 'Troféu Supremo: Guardião Digital!',
      celebrationMessage: 'Parabéns! Venceste o Boss do Mundo 1 com honra e distinção!',
    },
  },

  // =========================================================================
  // MUNDO 2: DETETIVE DIGITAL
  // =========================================================================
  {
    id: 'm2-1',
    worldId: 'mundo-2',
    areaId: 'm2-a1',
    title: 'A Pergunta Perfeita',
    subtitle: 'Palavras-chave cirúrgicas para encontrar respostas reais',
    xpReward: 120,
    estimatedMinutes: 8,
    step1Descobre: {
      title: 'Motores de Pesquisa Não São Pessoas: Pensam em Palavras-Chave',
      cards: [
        {
          icon: 'Search',
          title: 'Elimina as Palavras "Ruído"',
          text: 'Em vez de escreveres: "Olá senhor Google, podes dizer-me por favor qual é o animal mais rápido do mundo?", escreve apenas as palavras nucleares.',
          highlight: 'Usa: "animal terrestre mais rápido velocidade".',
        },
        {
          icon: 'Quote',
          title: 'O Poder das Aspas " "',
          text: 'Se colocares uma frase entre aspas como "D. Afonso Henriques nasceu", o motor procura a sequência exata de palavras.',
          example: 'Útil para encontrar autores de citações ou títulos de poemas.',
        },
        {
          icon: 'MinusCircle',
          title: 'O Operador Menos (-)',
          text: 'Queres pesquisar sobre o animal jaguar e não sobre a marca de carros? Escreve: jaguar animal -carro.',
          highlight: 'O sinal menos retira todos os resultados indesejados.',
        },
      ],
      quickCheck: {
        question: 'Se quiseres descobrir a data de inauguração da Ponte 25 de Abril em Lisboa, qual é a pesquisa mais eficiente?',
        options: [
          'Quando foi inaugurada aquela ponte grande em Lisboa vermelha?',
          '"Ponte 25 de Abril" data inauguracao Lisboa',
          'Quero saber a data da ponte faz favor',
          'Ponte lisboa vermelha carros',
        ],
        correctIndex: 1,
        explanation: 'Excelente! Usar o nome exato entre aspas e as palavras-chave "data", "inauguração" e "Lisboa" devolve a resposta no primeiro resultado.',
      },
    },
    step2Experimenta: {
      type: 'fake_detector',
      title: 'Simulador de Palavras-Chave de Pesquisa',
      instruction: 'Analisa 3 fórmulas de pesquisa para um trabalho sobre energias renováveis em Portugal e escolhe a mais precisa.',
      context: 'Um bom detetive digital poupa tempo eliminando ruído.',
      payload: {
        queries: [
          { query: 'coisas de vento em portugal que dão eletricidade', score: 'Fraca (muito vaga e informal)' },
          { query: '"energia eolica" portugal producao dados estatisticos', score: 'Excelente (precisa, com aspas e foco)' },
        ],
      },
    },
    step3Desafio: {
      title: 'O Enigma do Arquivo Histórico',
      scenario: 'Precisas de encontrar um documento escolar específico.',
      questions: [
        {
          id: 'q1',
          prompt: 'Qual operador permite pesquisar apenas ficheiros em formato PDF no Google?',
          type: 'single_choice',
          options: [
            'filetype:pdf',
            'quero:pdf',
            'doc=pdf',
            'abrir.pdf.ja',
          ],
          correctAnswer: 0,
          explanation: 'Correto! Escrever por exemplo: "aprendizagens essenciais TIC 6 ano filetype:pdf" descarrega diretamente o documento oficial.',
          hint: 'A palavra em inglês para tipo de ficheiro é "filetype".',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Missão Ninja da Pesquisa',
      tagline: 'Testa os operadores no teu motor de busca.',
      duration: '10 minutos',
      instructions: [
        'Abre o Google ou outro motor de busca.',
        'Pesquisa uma curiosidade científica usando aspas e o operador menos (-).',
        'Compara os resultados com uma pesquisa comum sem operadores.',
      ],
      tips: ['Exemplo: "sistema solar" planetas -plutao'],
      reflectionPrompt: 'Que tema pesquisaste e que diferença notaste ao usar aspas?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 120,
      badgeId: 'detetive-fontes',
      rewardTitle: 'Pesquisador Ninja!',
      celebrationMessage: 'Agora encontras agulhas em palheiros digitais em poucos segundos.',
    },
  },

  {
    id: 'm2-3',
    worldId: 'mundo-2',
    areaId: 'm2-a2',
    title: 'Fiável ou Fake? Avaliar Fontes',
    subtitle: 'Os 4 filtros de ouro para nunca seres enganado',
    xpReward: 140,
    estimatedMinutes: 10,
    step1Descobre: {
      title: 'Nem Tudo o que Está no Ecrã é Verdade',
      cards: [
        {
          icon: 'UserCheck',
          title: '1. Quem é o Autor?',
          text: 'O artigo tem o nome do autor? É um cientista, jornalista ou especialista reconhecido? Ou é um perfil anónimo "User999"?',
          highlight: 'Sem autor identificado, a credibilidade desce drasticamente.',
        },
        {
          icon: 'Calendar',
          title: '2. Qual é a Data?',
          text: 'Uma notícia de 2014 partilhada hoje pode ser completamente desatualizada e criar alarme falso sobre um vírus ou tempo.',
          example: 'Verifica sempre o dia, mês e ano da publicação.',
        },
        {
          icon: 'Globe',
          title: '3. Qual é o Domínio do Site?',
          text: 'Sites que terminam em .gov (governo), .edu (universidades) ou de órgãos de comunicação conhecidos são muito mais fiáveis do que sites gratuitos .blogspot ou .xyz.',
          highlight: 'Desconfia de sites cheios de anúncios piscantes.',
        },
        {
          icon: 'GitCompare',
          title: '4. Cruzamento de Fontes',
          text: 'Se um facto for mesmo real e importante, estará noticiado em mais do que um jornal conceituado. Se só um blog estranho fala nisso, é quase certo que é falso!',
          highlight: 'Regra de ouro: Confirma sempre em 2 ou 3 fontes independentes.',
        },
      ],
      quickCheck: {
        question: 'Encontras um site a dizer que foi descoberta uma cura milagrosa para a constipação comendo cascas de banana com mostarda. Não tem autor nem data e o site chama-se "saude-milagre-hoje.biz". O que deves concluir?',
        options: [
          'É verdade, vou já comer cascas de banana.',
          'É uma fonte duvidosa e sem qualquer validação científica ou médica credível.',
          'Se está no Google, é porque foi aprovado por médicos.',
          'Vou partilhar com os meus avós antes que esgotem as bananas.',
        ],
        correctIndex: 1,
        explanation: 'Excelente raciocínio crítico! A ausência de autor, o domínio duvidoso e a promessa milagrosa são sintomas claros de desinformação perigosa.',
      },
    },
    step2Experimenta: {
      type: 'source_evaluator',
      title: 'Laboratório de Verificação de Fontes',
      instruction: 'Analisa dois artigos sobre vida em Marte e aplica o teste dos 4 Filtros (Autor, Data, Domínio e Referências).',
      context: 'Um bom detetive compara sempre duas fontes antagónicas.',
      payload: {
        sources: [
          {
            id: 's1',
            title: 'Descoberta água líquida e sinais de minerais na cratera Jezero',
            author: 'Dra. Helena Matos, Astrobióloga (Agência Espacial Europeia)',
            date: '14 de Fevereiro de 2025',
            domain: 'esa.int (Agência Espacial Europeia)',
            peerReviewed: true,
            status: 'Fiável',
          },
          {
            id: 's2',
            title: 'Cientistas encontram pirâmide alienígena em Marte e o governo esconde!',
            author: 'Anónimo (GamerBoy99)',
            date: 'Sem data especificada',
            domain: 'ovnis-segredos-ocultos.xyz',
            peerReviewed: false,
            status: 'Não Fiável (Fake/Clickbait)',
          },
        ],
      },
    },
    step3Desafio: {
      title: 'O Julgamento da Notícia',
      scenario: 'Avalia a credibilidade de um artigo viral.',
      questions: [
        {
          id: 'q1',
          prompt: 'O que significa o termo "Clickbait" (Títulos Isca)?',
          type: 'single_choice',
          options: [
            'Uma técnica para pescar peixes virtuais em jogos.',
            'Títulos sensacionalistas e exagerados desenhados para fazer as pessoas clicarem e gerarem dinheiro com publicidade.',
            'Um botão de atualização do sistema operativo.',
            'Um tipo especial de fibra ótica de alta velocidade.',
          ],
          correctAnswer: 1,
          explanation: 'Correto! O clickbait usa frases dramáticas como: "NÃO VAIS ACREDITAR NO QUE ACONTECEU A SEGUIR!!!" para enganar curiosos.',
          hint: 'Pensa em títulos que criam curiosidade forçada para ganhar visualizações.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Inspetor de Notícias em Família',
      tagline: 'Leva a verificação de fontes para a mesa de jantar.',
      duration: '15 minutos',
      instructions: [
        'Escolhe uma notícia partilhada recentemente num grupo de família ou amigos.',
        'Aplica os 4 Filtros: Quem escreveu? Quando? Onde foi publicado? Outros jornais noticiaram o mesmo?',
        'Dá o teu parecer fundamentado.',
      ],
      tips: ['Usa ferramentas como o Polígrafo ou Fact-Checking oficial da imprensa portuguesa.'],
      reflectionPrompt: 'Que notícia analisaste e qual foi a tua conclusão segundo os 4 filtros?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 140,
      badgeId: 'cacador-fake-news',
      rewardTitle: 'Caçador de Fake News!',
      celebrationMessage: 'O teu escudo de pensamento crítico repele qualquer boato inventado.',
    },
  },

  {
    id: 'm2-5',
    worldId: 'mundo-2',
    areaId: 'm2-a4',
    title: 'Organiza o Caos: Pastas e Ficheiros',
    subtitle: 'Estruturação lógica da informação digital pessoal',
    xpReward: 130,
    estimatedMinutes: 8,
    step1Descobre: {
      title: 'Um Disco Rígido Desarrumado é Como um Quarto Caótico',
      cards: [
        {
          icon: 'Folder',
          title: 'A Árvore de Pastas (Hierarquia)',
          text: 'Nunca guardes todos os ficheiros soltos no Ambiente de Trabalho (Desktop)! Cria uma pasta principal e subpastas temáticas.',
          example: 'Documentos > 6_Ano > TIC > Modulo_Seguranca > Trabalho_Final.docx',
        },
        {
          icon: 'FileText',
          title: 'Nomes de Ficheiros Claros e Semânticos',
          text: 'Nomes como "trabalho1.docx" ou "asdfghj.pdf" são um pesadelo quando precisas de encontrar algo daqui a 3 meses.',
          highlight: 'Usa a fórmula: [Disciplina]_[Tema]_[NomeDoAluno]_[Data]',
        },
        {
          icon: 'Archive',
          title: 'Cópia de Segurança (Backup)',
          text: 'Trabalhos importantes devem ter sempre uma cópia guardada na nuvem da escola (Google Drive/OneDrive) ou numa pen drive.',
          highlight: 'Se o computador avariar na véspera da entrega, o backup salva a tua nota!',
        },
      ],
      quickCheck: {
        question: 'Qual dos seguintes nomes de ficheiro é o MAIS ORGANIZADO para entregar à professora de TIC?',
        options: [
          'trabalho_final_final_agora_vai.docx',
          'TIC_6B_TrabalhoSeguranca_JoaoSilva_2026.docx',
          'doc1.docx',
          'sem_titulo.docx',
        ],
        correctIndex: 1,
        explanation: 'Perfeito! Identifica a disciplina, a turma, o assunto do trabalho, o nome do autor e o ano. Impossível de perder ou confundir!',
      },
    },
    step2Experimenta: {
      type: 'file_organizer',
      title: 'Simulador de Organização de Ficheiros',
      instruction: 'Arrasta os 4 ficheiros dispersos no Ambiente de Trabalho para as respetivas pastas corretas da árvore escolar.',
      context: 'Cria uma estrutura lógica e limpa para o teu ano letivo.',
      payload: {
        files: [
          { id: 'f1', name: 'Apresentacao_Planetas.pptx', targetFolder: 'Ciencias_Naturais' },
          { id: 'f2', name: 'Algoritmo_Robo.sb3', targetFolder: 'TIC_Programacao' },
          { id: 'f3', name: 'Redacao_DomQuixote.docx', targetFolder: 'Portugues' },
          { id: 'f4', name: 'Grafico_Temperaturas.xlsx', targetFolder: 'Matematica' },
        ],
        folders: ['Ciencias_Naturais', 'TIC_Programacao', 'Portugues', 'Matematica'],
      },
    },
    step3Desafio: {
      title: 'Desafio da Gestão de Ficheiros',
      scenario: 'Arruma o arquivo do projeto de turma.',
      questions: [
        {
          id: 'q1',
          prompt: 'Qual é a principal vantagem de guardar um documento final em formato PDF antes de enviar por email?',
          type: 'single_choice',
          options: [
            'O ficheiro fica com o dobro do tamanho.',
            'O formato PDF preserva a formatação exata (fontes, imagens e margens) em qualquer computador ou telemóvel.',
            'O PDF apaga o nome do professor.',
            'Só funciona em computadores muito antigos.',
          ],
          correctAnswer: 1,
          explanation: 'Correto! O PDF (Portable Document Format) garante que o teu trabalho é visto exatamente como tu desenhaste, sem letras desconfiguradas.',
          hint: 'Pensa na compatibilidade entre diferentes sistemas operativos.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Operação Desktop Impecável',
      tagline: 'Organiza o teu computador escolar ou familiar.',
      duration: '15 minutos',
      instructions: [
        'Abre o teu computador ou tablet.',
        'Cria uma pasta principal chamada "Escola_6Ano".',
        'Cria subpastas para as tuas disciplinas principais (TIC, Português, Matemática, etc.).',
        'Move pelo menos 5 ficheiros soltos para as pastas correspondentes.',
      ],
      tips: ['Um ambiente de trabalho arrumado aumenta a tua concentração e velocidade de estudo.'],
      reflectionPrompt: 'Quantos ficheiros organizaste nas novas pastas? Como ficou o teu Desktop?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 130,
      badgeId: 'detetive-fontes',
      rewardTitle: 'Mestre da Organização!',
      celebrationMessage: 'A tua árvore de ficheiros é agora um exemplo de rigor e produtividade.',
    },
  },

  {
    id: 'm2-boss',
    worldId: 'mundo-2',
    areaId: 'm2-a5',
    title: 'BOSS FINAL: O Grande Mistério',
    subtitle: 'Resolve o caso da falsa notícia viral que abalou a cidade',
    xpReward: 260,
    estimatedMinutes: 12,
    isBoss: true,
    step1Descobre: {
      title: 'O Dossiê do Grande Mistério',
      cards: [
        {
          icon: 'FileSearch',
          title: 'O Boato do Monstro no Rio Tejo',
          text: 'Um vídeo com milhões de partilhas afirma que uma criatura gigante emergiu em Lisboa. Milhares de pessoas estão em pânico. Tu foste contratado como Detetive Chefe para investigar.',
          highlight: 'Tens de cruzar a data da foto original, o registo meteorológico e o parecer do Instituto Hidrográfico.',
        },
      ],
      quickCheck: {
        question: 'Qual é a primeira ação correta de um detetive perante uma imagem chocante na Internet?',
        options: [
          'Partilhar logo com todos os contactos para avisar do perigo.',
          'Fazer uma pesquisa reversa de imagem (Google Imagens / TinEye) para descobrir de onde veio a foto original e quando foi tirada.',
          'Comentar com insultos na página que publicou.',
          'Acreditar imediatamente se a foto parecer muito realista.',
        ],
        correctIndex: 1,
        explanation: 'Excelente! A pesquisa reversa de imagem revela frequentemente que a foto é de um filme antigo de 2012 ou tirada noutro país.',
      },
    },
    step2Experimenta: {
      type: 'source_evaluator',
      title: 'Mesa de Investigação Forense Digital',
      instruction: 'Analisa as 3 pistas do caso: a foto manipulada, o comunicado oficial e a data do vídeo original.',
      context: 'Encontra a prova cabal que desmonta o embuste.',
      payload: {
        sources: [
          {
            id: 'case-p1',
            title: 'Foto Viral do Rio Tejo',
            author: 'Conta Anónima de TikTok',
            date: 'Ontem à noite',
            status: 'Descoberta: Montagem de Photoshop de um tronco de árvore com efeitos de água de um filme de 2015',
          },
          {
            id: 'case-p2',
            title: 'Boletim da Capitania do Porto de Lisboa',
            author: 'Comandante da Capitania',
            date: 'Hoje de manhã',
            status: 'Confirmação oficial: Navegação 100% normal, sem qualquer anomalia detetada por radares.',
          },
        ],
      },
    },
    step3Desafio: {
      title: 'Veredito Final do Detetive',
      scenario: 'Apresenta as tuas conclusões à comissão de jornalistas.',
      questions: [
        {
          id: 'q1',
          prompt: 'Com base nas provas recolhidas, qual é a conclusão científica e investigativa?',
          type: 'single_choice',
          options: [
            'O monstro existe e vai atacar a ponte.',
            'Trata-se de uma imagem manipulada retirada de contexto para gerar cliques e partilhas virais, desmentida por dados oficiais das autoridades.',
            'Devemos fechar a escola durante um mês.',
            'A culpa é da chuva.',
          ],
          correctAnswer: 1,
          explanation: 'Brilhante! Concluíste o inquérito com recurso a factos verificáveis e cruzamento de fontes oficiais.',
          hint: 'Assenta a tua resposta em factos comprovados pelas autoridades marítimas.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Desmascarar um Mito Popular',
      tagline: 'Investiga uma lenda urbana ou boato que circula na tua escola.',
      duration: '15 minutos',
      instructions: [
        'Lembra-te de um boato que tenhas ouvido recentemente sobre jogos, internet ou escola.',
        'Pesquisa em sites de fact-checking portugueses se esse tema já foi investigado.',
        'Anota a explicação real para contar aos teus amigos.',
      ],
      tips: ['A verdade é sempre mais fascinante do que a ficção inventada para ganhar visualizações.'],
      reflectionPrompt: 'Que boato ou mito investigaste e qual é a explicação verdadeira?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 260,
      badgeId: 'grande-misterio-boss',
      rewardTitle: 'Troféu Supremo: O Grande Mistério!',
      celebrationMessage: 'Derrotaste o Boss do Mundo 2! És oficialmente um Detetive Digital de Elite.',
    },
  },

  // =========================================================================
  // MUNDO 3: IA & EU
  // =========================================================================
  {
    id: 'm3-1',
    worldId: 'mundo-3',
    areaId: 'm3-a1',
    title: 'Encontra a IA no Teu Dia a Dia',
    subtitle: 'Como as máquinas aprendem com padrões e dados',
    xpReward: 130,
    estimatedMinutes: 8,
    step1Descobre: {
      title: 'A Inteligência Artificial Já Vive no Teu Telemóvel',
      cards: [
        {
          icon: 'Brain',
          title: 'O que é a IA?',
          text: 'São sistemas informáticos que analisam milhões de exemplos para aprender a reconhecer padrões e tomar decisões sem terem sido programados passo a passo para cada detalhe.',
          highlight: 'Aprende através de dados e treino (Machine Learning).',
        },
        {
          icon: 'Music',
          title: 'Recomendações no Spotify e YouTube',
          text: 'Quando o algoritmo te sugere uma música nova parecida com as que ouviste a semana passada, é uma IA a calcular as tuas preferências.',
          example: 'Classifica estilos musicais e hábitos de audição.',
        },
        {
          icon: 'ScanFace',
          title: 'Reconhecimento Facial e Tradução',
          text: 'Desbloquear o telemóvel com a cara, filtros do TikTok e traduzir texto por fotografia são exemplos práticos de visão por computador e IA.',
          highlight: 'Reconhece traços geométricos do rosto.',
        },
      ],
      quickCheck: {
        question: 'Qual das seguintes ferramentas NÃO utiliza Inteligência Artificial?',
        options: [
          'Uma lâmpada com um interruptor mecânico tradicional na parede.',
          'Um filtro que identifica a tua cara e coloca orelhas de gato em vídeo em tempo real.',
          'O assistente de voz Siri ou Google Assistente a responder a perguntas faladas.',
          'O corretor inteligente do telemóvel que prevê a próxima palavra que vais escrever.',
        ],
        correctIndex: 0,
        explanation: 'Exato! Um interruptor mecânico é apenas um circuito elétrico simples que abre e fecha a corrente, sem qualquer processamento de dados ou IA.',
      },
    },
    step2Experimenta: {
      type: 'fake_detector',
      title: 'Identificador de IA em Aplicações Reais',
      instruction: 'Examina 3 tecnologias e classifica se utilizam modelos de Inteligência Artificial ou lógica mecânica simples.',
      context: 'Aprende a detetar onde a IA está a atuar no mundo contemporâneo.',
      payload: {
        items: [
          { name: 'Carro Autónomo a desviar-se de peões com sensores e visão computacional', usesAI: true },
          { name: 'Calculadora de bolso solar a fazer 2 + 2', usesAI: false },
          { name: 'Filtro anti-spam do email a aprender novas palavras de burlas', usesAI: true },
        ],
      },
    },
    step3Desafio: {
      title: 'O Cérebro das Máquinas',
      scenario: 'Explica como um computador aprende a distinguir um cão de um gato.',
      questions: [
        {
          id: 'q1',
          prompt: 'Como é que um modelo de IA aprende a identificar fotos de gatos?',
          type: 'single_choice',
          options: [
            'Um programador descreve cada pelo de cada gato do mundo.',
            'O modelo analisa centenas de milhares de fotos de gatos e não-gatos, ajustando parâmetros matemáticos até acertar com precisão.',
            'O computador tem sentimentos e adora animais.',
            'A câmara do telemóvel tem um chip biológico.',
          ],
          correctAnswer: 1,
          explanation: 'Correto! Chama-se treino com dados rotulados (Machine Learning): através de milhares de exemplos, a rede neuronal deteta orelhas pontiagudas, bigodes e formatos típicos.',
          hint: 'Pensa no conceito de treino com grandes quantidades de exemplos (dados).',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Caçador de IA no Quotidiano',
      tagline: 'Mapeia a IA que usas na tua rotina diária.',
      duration: '10 minutos',
      instructions: [
        'Anota 3 momentos do teu dia de hoje em que tenhas interagido com IA (ex: assistente de voz, jogo, feed de vídeos, mapas GPS).',
        'Reflete: essa IA poupou-te tempo ou aprendeu algo sobre ti?',
      ],
      tips: ['Repara em como as sugestões mudam consoante o que clicas.'],
      reflectionPrompt: 'Quais foram os 3 exemplos de IA que encontraste no teu dia?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 130,
      badgeId: 'explorador-ia',
      rewardTitle: 'Explorador de IA!',
      celebrationMessage: 'Começaste a desvendar o funcionamento do motor tecnológico do século XXI.',
    },
  },

  {
    id: 'm3-2',
    worldId: 'mundo-3',
    areaId: 'm3-a2',
    title: 'Mestre dos Prompts',
    subtitle: 'Como dar instruções claras, com contexto e limites a uma IA',
    xpReward: 150,
    estimatedMinutes: 10,
    step1Descobre: {
      title: 'Um Prompt Fraco Dá uma Resposta Genérica; Um Bom Prompt Cria Ouro',
      cards: [
        {
          icon: 'Target',
          title: 'A Fórmula do Prompt Perfeito',
          text: 'Papel + Tarefa + Contexto + Formato + Limites.',
          example: '"Age como um professor de História do 6.º ano. Explica os castelos medievais em Portugal numa lista de 3 pontos para um aluno de 11 anos, sem ultrapassar 100 palavras."',
        },
        {
          icon: 'HelpCircle',
          title: 'Sê Específico e Dá Exemplos',
          text: 'Em vez de: "Escreve uma história", diz: "Escreve uma história de aventura de 2 parágrafos sobre um robô que adora plantar flores no recreio da escola."',
          highlight: 'Quanto mais contexto deres, melhor será o resultado.',
        },
        {
          icon: 'AlertTriangle',
          title: 'Nunca Partilhes Segredos no Prompt',
          text: 'Tudo o que escreves numa IA pode ser usado para treinar futuros modelos. Nunca coloques nomes completos, moradas, senhas ou segredos da tua família.',
          highlight: 'Privacidade sempre em primeiro lugar!',
        },
      ],
      quickCheck: {
        question: 'Qual destes prompts vai gerar o melhor resumo para um trabalho escolar de TIC?',
        options: [
          'Faz um resumo sobre a netiqueta.',
          'Quero saber coisas da internet para a aula.',
          'Atua como monitor de TIC. Explica 3 regras essenciais de netiqueta para alunos do 6.º ano, usando linguagem simples e exemplos práticos, em tópicos curtos.',
          'Escreve muito texto rápido.',
        ],
        correctIndex: 2,
        explanation: 'Excelente! Este prompt define o papel (monitor de TIC), o público-alvo (alunos do 6.º ano), a quantidade (3 regras), o tom (linguagem simples) e a estrutura (tópicos curtos).',
      },
    },
    step2Experimenta: {
      type: 'prompt_crafter',
      title: 'Laboratório Interativo de Engenharia de Prompts',
      instruction: 'Ajusta os componentes do prompt (Papel, Tarefa, Restrições e Público) e compara as respostas da IA.',
      context: 'Experimenta transformar um prompt vago num prompt de mestre.',
      payload: {
        baseTopic: 'A Importância da Reciclagem de Eletrónicos',
        weakPrompt: 'Fala sobre reciclagem.',
        strongPrompt: 'Age como um divulgador de ciência para jovens de 12 anos. Explica porque não devemos deitar baterias no lixo comum, em 3 frases de impacto com um emoji em cada.',
      },
    },
    step3Desafio: {
      title: 'Desafio do Construtor de Prompts',
      scenario: 'Precisas de usar uma IA para criar uma tabela comparativa.',
      questions: [
        {
          id: 'q1',
          prompt: 'Qual instrução garante que a IA responde no formato mais limpo para colar num relatório escolar?',
          type: 'single_choice',
          options: [
            '"Apresenta o resultado numa tabela com 3 colunas: Conceito, Significado e Exemplo Prático."',
            '"Escreve tudo corrido sem pontos nem vírgulas."',
            '"Fala como se fosses um pirata do século XVII."',
            '"Inventa o que quiseres."',
          ],
          correctAnswer: 0,
          explanation: 'Correto! Pedir um formato estruturado (tabela, tópicos, contagem de palavras) poupa tempo e organiza o raciocínio.',
          hint: 'Procura a opção que define colunas e estrutura tabular clara.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Criar um Guia de Estudos com IA',
      tagline: 'Desenvolve um prompt educativo para te ajudar a estudar.',
      duration: '15 minutos',
      instructions: [
        'Com a supervisão de um professor ou encarregado de educação, escreve um prompt sobre um tema difícil de uma aula.',
        'Pede à IA para criar 3 perguntas de teste para ti.',
        'Tenta responder às perguntas sem ver as soluções.',
      ],
      tips: ['Lembra-te: a IA deve ser tua tutora de treino, e não fazer o trabalho por ti!'],
      reflectionPrompt: 'Que tema escolheste e como é que o prompt estruturado te ajudou a testar conhecimentos?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 150,
      badgeId: 'mestre-prompts',
      rewardTitle: 'Mestre dos Prompts!',
      celebrationMessage: 'Dominas a linguagem para orientar ferramentas de IA com mestria e rigor.',
    },
  },

  {
    id: 'm3-3',
    worldId: 'mundo-3',
    areaId: 'm3-a3',
    title: 'Apanha o Erro da IA: Alucinações',
    subtitle: 'Por que razão a IA inventa factos e como conferir tudo',
    xpReward: 140,
    estimatedMinutes: 9,
    step1Descobre: {
      title: 'A IA Fala com Muita Certeza... Mesmo Quando Mente!',
      cards: [
        {
          icon: 'HelpCircle',
          title: 'O que é uma "Alucinação" da IA?',
          text: 'Como as IAs funcionam prevendo palavras prováveis e não consultando uma base de verdade absoluta, por vezes inventam datas, nomes de livros ou fórmulas falsas.',
          highlight: 'Fala com um tom confiante que parece 100% verdadeiro!',
        },
        {
          icon: 'BookOpen',
          title: 'A Regra da Verificação Cruzada',
          text: 'Nunca copies e coles diretamente uma resposta da IA para um trabalho de escola. Confirma datas e factos no teu manual escolar ou enciclopédia.',
          example: 'Uma IA já afirmou que o Tratado de Zamora foi assinado num submarino em 1980!',
        },
        {
          icon: 'Scale',
          title: 'Ética e Direitos de Autor',
          text: 'Apresentar um texto gerado por IA como se tivesse sido escrito por ti é plágio e desonestidade intelectual.',
          highlight: 'Usa a IA para ter ideias e rever, mas escreve tu com as tuas próprias palavras.',
        },
      ],
      quickCheck: {
        question: 'Pediste a uma IA para listar 3 livros escritos por Fernando Pessoa para crianças, e ela inventou títulos que nunca existiram. Como deves agir?',
        options: [
          'Acredito na IA, ela sabe mais do que a biblioteca da escola.',
          'Verifico no catálogo da Biblioteca Nacional ou pergunto ao professor de Português antes de usar essa informação.',
          'Mudo o nome do autor para Camões.',
          'Apago o computador.',
        ],
        correctIndex: 1,
        explanation: 'Excelente! A verificação em fontes bibliográficas oficiais é a única garantia contra as alucinações das ferramentas de inteligência artificial.',
      },
    },
    step2Experimenta: {
      type: 'ai_hallucination_check',
      title: 'Laboratório Caça-Alucinações',
      instruction: 'Lê um texto gerado por IA sobre monumentos de Portugal e clica nas 2 informações completamente falsas inventadas pelo modelo.',
      context: 'Treina o teu olhar crítico para não engolires respostas de máquina sem pensar.',
      payload: {
        aiGeneratedText: 'A Torre de Belém foi construída em Lisboa no século XVI. Curiosamente, foi transferida para o topo da Serra da Estrela em 1920 para servir de farol de neve com luzes laser azuis. Hoje é um monumento nacional muito visitado junto ao Rio Tejo.',
        falseClaims: [
          'transferida para o topo da Serra da Estrela em 1920',
          'farol de neve com luzes laser azuis',
        ],
      },
    },
    step3Desafio: {
      title: 'Desafio do Revisor Crítico',
      scenario: 'Um colega teu usou IA para fazer um trabalho de história e não reviu o texto.',
      questions: [
        {
          id: 'q1',
          prompt: 'Qual é a melhor forma ética de utilizar uma ferramenta de IA num trabalho de TIC do 6.º ano?',
          type: 'single_choice',
          options: [
            'Pedir à IA para fazer o trabalho todo, copiar e colar sem ler.',
            'Utilizar a IA como assistente de ideias, pesquisar e confirmar os factos em manuais e indicar na bibliografia que a ferramenta foi consultada.',
            'Dizer à professora que foste tu que inventaste a IA.',
            'Pagar a alguém na internet.',
          ],
          correctAnswer: 1,
          explanation: 'Correto! A transparência e o trabalho autoral do aluno são fundamentais na disciplina de TIC e em toda a vida académica.',
          hint: 'Transparência, esforço próprio e citação honesta das ferramentas.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Detetor de Alucinações ao Vivo',
      tagline: 'Coloca uma IA à prova com uma pergunta armadilhada.',
      duration: '10 minutos',
      instructions: [
        'Com um adulto, pergunta a uma IA sobre algo muito específico da tua terra ou aldeia (um café, uma rua ou uma pessoa fictícia).',
        'Vê se a IA inventa detalhes plausíveis para agradar à pergunta.',
        'Regista o que ela acertou e onde inventou factos.',
      ],
      tips: ['Experimenta perguntar: "Em que ano é que o dinossauro de Faro aprendeu a andar de bicicleta?"'],
      reflectionPrompt: 'Que pergunta armadilhada fizeste e como reagiu o modelo de IA?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 140,
      badgeId: 'explorador-ia',
      rewardTitle: 'Crítico de IA Certificado!',
      celebrationMessage: 'Desenvolveste imunidade contra alucinações algorítmicas.',
    },
  },

  {
    id: 'm3-boss',
    worldId: 'mundo-3',
    areaId: 'm3-a5',
    title: 'BOSS FINAL: O Desafio da IA',
    subtitle: 'Audita um ensaio complexo gerado por máquina e sê o Juiz Supremo',
    xpReward: 270,
    estimatedMinutes: 12,
    isBoss: true,
    step1Descobre: {
      title: 'A Bancada do Tribunal de Inteligência Artificial',
      cards: [
        {
          icon: 'Cpu',
          title: 'O Ensaio Sob Julgamento',
          text: 'Um assistente de IA gerou um artigo sobre Segurança e Privacidade que contém promessas perigosas, factos adulterados e violação de dados.',
          highlight: 'Tens de emitir o parecer técnico e corrigir o texto.',
        },
      ],
      quickCheck: {
        question: 'Porque é que o ser humano deve ser sempre o "piloto" final nas decisões assistidas por IA?',
        options: [
          'Porque a IA não tem consciência moral, empatia humana nem responsabilidade cívica.',
          'Porque os computadores gastam muita eletricidade se pensarem sozinhos.',
          'Porque a IA tem medo de errar.',
          'Porque a lei proíbe robôs de falarem com crianças.',
        ],
        correctIndex: 0,
        explanation: 'Excelente! A IA é apenas uma ferramenta matemática poderosa. A responsabilidade moral e o discernimento ético pertencem sempre às pessoas.',
      },
    },
    step2Experimenta: {
      type: 'ai_hallucination_check',
      title: 'Balança de Julgamento da IA',
      instruction: 'Identifica a sugestão perigosa de privacidade num texto gerado por IA.',
      context: 'A IA sugeriu carregar fotos de passaportes para um servidor não seguro.',
      payload: {
        aiGeneratedText: 'Para proteger as suas palavras-passe, deve colocá-las num documento público na Internet com o seu nome completo para que a comunidade o ajude a recordar se as esquecer.',
        falseClaims: ['colocá-las num documento público na Internet com o seu nome completo'],
      },
    },
    step3Desafio: {
      title: 'Veredito do Juiz da IA',
      scenario: 'Emite a decisão final do tribunal.',
      questions: [
        {
          id: 'q1',
          prompt: 'Qual é o maior risco de carregar ficheiros com fotos e dados pessoais de outras pessoas numa ferramenta aberta de IA?',
          type: 'single_choice',
          options: [
            'A foto pode ficar com cores demasiado escuras.',
            'Viola o Regulamento Geral sobre a Proteção de Dados (RGPD) e a privacidade dessas pessoas, pois os dados podem ser memorizados e partilhados pelo sistema.',
            'O ecrã do computador pode partir com o peso da imagem.',
            'A IA fica lenta a calcular equações de matemática.',
          ],
          correctAnswer: 1,
          explanation: 'Correto! Os dados pessoais e fotos de terceiros estão protegidos pela lei europeia (RGPD) e nunca devem ser submetidos a plataformas de IA sem consentimento.',
          hint: 'Pensa nas leis de proteção de dados e privacidade dos cidadãos (RGPD).',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Carta Aberta aos Criadores de IA',
      tagline: 'Escreve uma recomendação ética para os cientistas de computadores.',
      duration: '10 minutos',
      instructions: [
        'Pensa no que gostarias que as empresas de IA garantissem aos jovens de 11 e 12 anos.',
        'Escreve 2 princípios fundamentais (ex: proteção da privacidade, não manipulação).',
      ],
      tips: ['A voz dos jovens é essencial na criação de tecnologia justa.'],
      reflectionPrompt: 'Qual é a tua principal exigência para uma IA segura para as escolas?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 270,
      badgeId: 'juiz-ia-boss',
      rewardTitle: 'Troféu Supremo: Juiz da IA!',
      celebrationMessage: 'Derrotaste o Boss do Mundo 3 com espírito crítico exemplar!',
    },
  },

  // =========================================================================
  // MUNDO 4: COMUNICAR & COLABORAR
  // =========================================================================
  {
    id: 'm4-1',
    worldId: 'mundo-4',
    areaId: 'm4-a1',
    title: 'Escolhe a Ferramenta Certa',
    subtitle: 'Texto, áudio, vídeo, comunicação síncrona e assíncrona',
    xpReward: 120,
    estimatedMinutes: 8,
    step1Descobre: {
      title: 'Nem Tudo Deve Ser uma Mensagem de WhatsApp ou Reunião de Vídeo',
      cards: [
        {
          icon: 'Clock',
          title: 'Síncrono vs. Assíncrono',
          text: 'Síncrono acontece ao mesmo tempo (chamada de vídeo, telefonema). Assíncrono permite ler e responder quando for conveniente (email, fórum escolar).',
          highlight: 'Não interrompas alguém com chamadas se um email claro resolver!',
        },
        {
          icon: 'Mail',
          title: 'Quando Usar o Email Escolar?',
          text: 'Para falar com professores, submeter trabalhos formais ou pedir autorizações. Exige um assunto claro, saudação ("Bom dia, Professora...") e despedida cordial.',
          example: 'Assunto: Dúvida no Trabalho de TIC — João Silva 6.º B',
        },
        {
          icon: 'Users',
          title: 'Ambientes Virtuais de Aprendizagem (LMS)',
          text: 'Plataformas como o Google Classroom ou Teams servem para centralizar tarefas, prazos e materiais de apoio partilhados.',
          highlight: 'Mantém as notificações organizadas para não perderes datas.',
        },
      ],
      quickCheck: {
        question: 'São 21h30 e tens uma dúvida que precisas de esclarecer com a professora para a aula da próxima quinta-feira. Qual é o canal correto?',
        options: [
          'Ligar para o telemóvel pessoal da professora a essa hora da noite.',
          'Enviar um email educado através do email institucional da escola, aguardando resposta durante o horário laboral.',
          'Mandar mensagem no Instagram privado da professora.',
          'Ir a casa da professora tocar à campainha.',
        ],
        correctIndex: 1,
        explanation: 'Excelente respeito pelos limites profissionais! O email institucional é o canal oficial e permite à professora responder no seu horário de trabalho.',
      },
    },
    step2Experimenta: {
      type: 'fake_detector',
      title: 'Seletor de Canais de Comunicação',
      instruction: 'Associa 3 situações ao canal de comunicação mais adequado.',
      context: 'Saber escolher a ferramenta poupa tempo e evita conflitos.',
      payload: {
        scenarios: [
          { need: 'Combinar a que horas nos encontramos no portão da escola logo à tarde', bestTool: 'Mensagem rápida / Chat de amigos' },
          { need: 'Entregar o ficheiro final do projeto de TIC com anexo de 15MB', bestTool: 'Plataforma Escolar / Email institucional com anexo' },
          { need: 'Ensaio de teatro com colegas que estão em isolamento em casa', bestTool: 'Videoconferência síncrona com câmara e som' },
        ],
      },
    },
    step3Desafio: {
      title: 'Desafio do Comunicador Eficiente',
      scenario: 'Prepara um contacto formal.',
      questions: [
        {
          id: 'q1',
          prompt: 'Qual dos seguintes assuntos (Subject) de email é o MAIS CLARO para enviar à direção de turma?',
          type: 'single_choice',
          options: [
            'ola professora socorroooo',
            'Justificação de Falta do Aluno Pedro Costa (6.º A) - 12 de Outubro',
            'olhe veja la isto',
            '(sem assunto)',
          ],
          correctAnswer: 1,
          explanation: 'Correto! A linha de assunto deve resumir exatamente o motivo da mensagem e quem a envia.',
          hint: 'Procura o assunto que resume o conteúdo e identifica o aluno.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Redigir um Email Perfeito',
      tagline: 'Escreve um rascunho de mensagem escolar impecável.',
      duration: '10 minutos',
      instructions: [
        'Abre a tua caixa de correio escolar.',
        'Escreve um rascunho de email dirigido a um professor a agradecer uma aula ou a tirar uma dúvida real.',
        'Garante que tem: Assunto informativo, Saudação formal, Texto claro em parágrafos, Despedida atenciosa e Assinatura com nome e turma.',
      ],
      tips: ['Lê em voz alta antes de enviar para verificar a pontuação.'],
      reflectionPrompt: 'Que assunto escolheste e como estruturaste a saudação e assinatura?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 120,
      badgeId: 'mestre-netiqueta',
      rewardTitle: 'Especialista em Canais Digitais!',
      celebrationMessage: 'Comunicação precisa e respeitosa em qualquer situação.',
    },
  },

  {
    id: 'm4-4',
    worldId: 'mundo-4',
    areaId: 'm4-a4',
    title: 'Equipa Digital: Trabalho na Nuvem',
    subtitle: 'Colaboração em tempo real, comentários e histórico de versões',
    xpReward: 140,
    estimatedMinutes: 9,
    step1Descobre: {
      title: 'Trabalhar em Grupo Sem Apagar o Trabalho dos Colegas',
      cards: [
        {
          icon: 'FileSpreadsheet',
          title: 'Documentos Partilhados na Nuvem',
          text: 'Vários alunos podem escrever no mesmo documento ao mesmo tempo. Cada um tem um cursor colorido diferente.',
          highlight: 'Nunca mais precisas de andar a mandar "trabalho_v1", "v2", "v3" por pen drive!',
        },
        {
          icon: 'MessageSquare',
          title: 'Usa Comentários e Sugestões',
          text: 'Se não concordas com uma frase de um colega, não a apagues sem avisar! Deixa um comentário: "Sugiro alterarmos para X, o que achas?"',
          example: 'O trabalho em equipa cresce com diálogo, não com imposição.',
        },
        {
          icon: 'History',
          title: 'A Máquina do Tempo (Histórico de Versões)',
          text: 'Se alguém apagar acidentalmente metade do texto, não entres em pânico! No menu "Histórico de versões" podes recuperar qualquer momento anterior.',
          highlight: 'Nada se perde quando colaboramos na nuvem.',
        },
      ],
      quickCheck: {
        question: 'Estás a fazer um trabalho de TIC com mais 2 colegas num documento Google Docs. Reparas que um colega escreveu um parágrafo com alguns erros. Qual é a melhor atitude?',
        options: [
          'Apagar o texto dele e escrever insultos no chat.',
          'Inserir um comentário simpático a explicar o que pode ser melhorado ou falar com ele na chamada.',
          'Fechar o documento e sair do grupo.',
          'Mudar a cor de fundo do documento para preto para ninguém conseguir ler.',
        ],
        correctIndex: 1,
        explanation: 'Excelente espírito de equipa! Deixar comentários construtivos preserva a relação do grupo e ensina o colega com respeito mútuo.',
      },
    },
    step2Experimenta: {
      type: 'fake_detector',
      title: 'Simulador de Permissões na Nuvem',
      instruction: 'Analisa os 3 níveis de permissão (Leitor, Comentador e Editor) e escolhe o correto para cada situação.',
      context: 'Partilhar com a permissão errada pode levar a que estranhos apaguem o teu trabalho.',
      payload: {
        cases: [
          { target: 'Colegas da tua equipa que vão escrever o texto contigo', role: 'Editor' },
          { target: 'Professora para corrigir e dar notas com observações na margem', role: 'Comentador ou Editor' },
          { target: 'Público geral para ler o jornal da escola sem estragar a página', role: 'Apenas Leitor' },
        ],
      },
    },
    step3Desafio: {
      title: 'Desafio do Gestor de Projeto',
      scenario: 'Resolve um conflito de versões num trabalho de equipa.',
      questions: [
        {
          id: 'q1',
          prompt: 'O que deves fazer se precisares de ver quem escreveu uma determinada parte do trabalho de grupo?',
          type: 'single_choice',
          options: [
            'Ligar para a polícia dos computadores.',
            'Consultar o Histórico de Versões do documento, onde cada edição aparece marcada com a cor e nome do autor.',
            'Adivinhar pela letra.',
            'Apagar o ficheiro e recomeçar do zero.',
          ],
          correctAnswer: 1,
          explanation: 'Correto! O Histórico de Versões regista exatamente quem alterou o quê, com data e hora ao segundo.',
          hint: 'Menu Ficheiro > Histórico de versões.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Documento Colaborativo com um Amigo',
      tagline: 'Cria uma folha de projeto partilhada na nuvem escolar.',
      duration: '15 minutos',
      instructions: [
        'Cria um novo documento de texto no teu Drive escolar.',
        'Partilha com um colega de turma com permissão de "Comentador".',
        'Pede-lhe para ler uma frase tua e deixar uma sugestão nos comentários.',
        'Responde ao comentário e marca-o como "Resolvido".',
      ],
      tips: ['Aprender a resolver comentários colaborativos é uma competência profissional essencial.'],
      reflectionPrompt: 'Com quem colaboraste e que sugestão foi deixada no documento partilhado?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 140,
      badgeId: 'equipa-digital',
      rewardTitle: 'Colaborador Digital de Excelência!',
      celebrationMessage: 'Agora és capaz de liderar e colaborar em projetos digitais na nuvem sem falhas.',
    },
  },

  {
    id: 'm4-boss',
    worldId: 'mundo-4',
    areaId: 'm4-a5',
    title: 'BOSS FINAL: Mestre da Comunicação',
    subtitle: 'Lidera a campanha digital da escola e resolve uma crise de comunicação',
    xpReward: 260,
    estimatedMinutes: 12,
    isBoss: true,
    step1Descobre: {
      title: 'A Grande Campanha Escolar',
      cards: [
        {
          icon: 'Send',
          title: 'O Desafio da Campanha Solidária',
          text: 'A escola quer organizar uma angariação de alimentos e brinquedos. Como Mestre da Comunicação, tens de definir o público-alvo, redigir o cartaz digital, enviar a circular por email e gerir as permissões dos voluntários.',
          highlight: 'Precisas de coordenar tudo com clareza, empatia e sem ruído digital.',
        },
      ],
      quickCheck: {
        question: 'Qual é o segredo de uma comunicação digital de sucesso?',
        options: [
          'Enviar 50 mensagens por hora para que ninguém se esqueça.',
          'Mensagem clara, canal adequado ao público, respeito pelos horários e tom colaborativo.',
          'Usar todas as cores do arco-íris no texto.',
          'Obrigar todos os alunos a subscreverem um canal do YouTube.',
        ],
        correctIndex: 1,
        explanation: 'Excelente! A clareza de objetivos, a adequação ao público e a sobriedade são a chave da comunicação eficaz.',
      },
    },
    step2Experimenta: {
      type: 'netiquette_fixer',
      title: 'Redação da Circular Oficial',
      instruction: 'Elimina palavras agressivas e formata um convite caloroso para toda a comunidade educativa.',
      context: 'Um comunicado da escola deve ser inspirador e acessível.',
      payload: {
        scenarios: [
          {
            original: 'TODOS TÊM DE TRAZER COMIDA SENÃO LEVAM FALTA DISCIPLINAR!',
            improved: 'Contamos com a generosidade de todos na campanha solidária da nossa escola. Cada contributo faz a diferença!',
            principle: 'Motivação positiva em vez de ameaças vazias.',
          },
        ],
      },
    },
    step3Desafio: {
      title: 'Desafio da Coordenação de Equipa',
      scenario: 'Um voluntário apagou sem querer a lista de inscrições.',
      questions: [
        {
          id: 'q1',
          prompt: 'Como resolves o problema sem culpar ninguém nem perder a lista?',
          type: 'single_choice',
          options: [
            'Expulsar o voluntário do grupo com insultos.',
            'Aceder com calma ao Histórico de Versões do documento partilhado, restaurar a versão de há 30 minutos e explicar ao colega como usar o modo "Comentador".',
            'Cancelar a campanha de solidariedade.',
            'Dizer que a culpa é do computador da escola.',
          ],
          correctAnswer: 1,
          explanation: 'Liderança madura e serena! A tecnologia permite restaurar dados e a pedagogia ensina o colega a não repetir o erro.',
          hint: 'Usa a tecnologia (histórico de versões) e mantém a compostura.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Apresentação Oral Apoiada por TIC',
      tagline: 'Cria uma mensagem que inspire os teus colegas.',
      duration: '15 minutos',
      instructions: [
        'Prepara uma breve mensagem de 1 minuto sobre um tema da tua preferência.',
        'Grava um pequeno áudio ou treina em frente a alguém, usando um tom calmo e expressivo.',
      ],
      tips: ['A boa comunicação oral e digital complementam-se perfeitamente.'],
      reflectionPrompt: 'Como correu a gravação do teu áudio e que cuidados tiveste com o tom de voz?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 260,
      badgeId: 'mestre-comunicacao-boss',
      rewardTitle: 'Troféu Supremo: Mestre da Comunicação!',
      celebrationMessage: 'Derrotaste o Boss do Mundo 4! A tua voz digital lidera pelo exemplo.',
    },
  },

  // =========================================================================
  // MUNDO 5: CRIAR & PROGRAMAR
  // =========================================================================
  {
    id: 'm5-1',
    worldId: 'mundo-5',
    areaId: 'm5-a1',
    title: 'O Robô Obedece: Pensar em Algoritmos',
    subtitle: 'Sequências de instruções lógicas sem margem para dúvidas',
    xpReward: 140,
    estimatedMinutes: 10,
    step1Descobre: {
      title: 'Os Computadores São Rápidos, Mas Não Têm Imaginação!',
      cards: [
        {
          icon: 'Cpu',
          title: 'O que é um Algoritmo?',
          text: 'É uma sequência finita de passos lógicos e ordenados para resolver um problema ou realizar uma tarefa.',
          example: 'A receita de um bolo ou as instruções de montagem de um brinquedo são algoritmos da vida real!',
        },
        {
          icon: 'CornerDownRight',
          title: 'A Ordem dos Fatores Importa Muito',
          text: 'Se mandares o robô "Avançar 3 passos" antes de "Abrir a porta", ele vai bater contra a madeira e partir-se!',
          highlight: 'Cada passo depende do passo anterior.',
        },
        {
          icon: 'Terminal',
          title: 'Precisão e Clareza',
          text: 'Não podes dizer ao computador: "Põe aí um bocadinho de queijo". Tens de dizer: "Adicionar 50 gramas de queijo ralado".',
          highlight: 'Zero ambiguidades!',
        },
      ],
      quickCheck: {
        question: 'Qual é a sequência lógica correta para o algoritmo "Lavar os Dentes"?',
        options: [
          'Escovar os dentes > Pôr pasta na escova > Guardar a escova > Abrir a boca.',
          'Pôr pasta na escova > Abrir a boca e escovar durante 2 minutos > Bochechar com água > Lavar a escova.',
          'Bochechar com água > Pôr pasta > Dormir > Ir para a casa de banho.',
          'Guardar a escova > Abrir a torneira > Comer um rebuçado.',
        ],
        correctIndex: 1,
        explanation: 'Excelente! A ordem cronológica dos passos é essencial para o algoritmo atingir o seu objetivo com sucesso.',
      },
    },
    step2Experimenta: {
      type: 'block_algorithm',
      title: 'Simulador do Robô no Labirinto',
      instruction: 'Monta a sequência de blocos de movimento (Avançar, Virar à Direita, Virar à Esquerda) para guiar o robô até à bateria sem cair nos buracos.',
      context: 'Clica em "Executar Algoritmo" para ver o robô a seguir as tuas instruções passo a passo.',
      payload: {
        targetSteps: ['avancar', 'avancar', 'virar_direita', 'avancar'],
        gridSize: 4,
        targetPos: { x: 2, y: 1 },
      },
    },
    step3Desafio: {
      title: 'Desafio do Caçador de Erros (Bugs)',
      scenario: 'O algoritmo do robô aspirador tem uma falha.',
      questions: [
        {
          id: 'q1',
          prompt: 'O que significa fazer a "Depuração" (Debugging) de um programa de computador?',
          type: 'single_choice',
          options: [
            'Limpar o pó do teclado com uma trincha.',
            'Procurar, identificar e corrigir erros lógicos no código do programa.',
            'Mudar a língua do sistema operativo para inglês.',
            'Instalar um jogo novo.',
          ],
          correctAnswer: 1,
          explanation: 'Correto! O termo "Bug" (bicho) nasceu quando uma traça real causou um curto-circuito num dos primeiros computadores. "Depurar" é remover os erros do código.',
          hint: 'Procura o significado técnico de encontrar e resolver falhas no código.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Algoritmo Humano Desligado (Unplugged)',
      tagline: 'Programa um membro da tua família como se fosse um robô.',
      duration: '15 minutos',
      instructions: [
        'Escolhe uma tarefa simples (ex: fazer uma sanduíche ou desenhar uma casa geométrica).',
        'Escreve numa folha de papel as instruções passo a passo exatas.',
        'Pede a um irmão ou encarregado de educação para ser o "robô" e seguir estritamente o que escreveste, sem inventar nada.',
        'Observa onde o robô se baralhou e corrige o teu algoritmo.',
      ],
      tips: ['Vais perceber como os humanos assumem coisas óbvias que os computadores desconhecem!'],
      reflectionPrompt: 'Que tarefa programaste na folha e que erro engraçado o teu "robô humano" cometeu?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 140,
      badgeId: 'pensador-computacional',
      rewardTitle: 'Pensador Algorítmico!',
      celebrationMessage: 'Compreendeste como os computadores pensam e estruturam comandos lógicos.',
    },
  },

  {
    id: 'm5-3',
    worldId: 'mundo-5',
    areaId: 'm5-a2',
    title: 'Desmonta o Problema: Decomposição',
    subtitle: 'Dividir grandes enigmas em pedaços pequenos e fáceis de resolver',
    xpReward: 140,
    estimatedMinutes: 9,
    step1Descobre: {
      title: 'A Arte de Dividir para Conquistar',
      cards: [
        {
          icon: 'Scissors',
          title: 'O que é a Decomposição?',
          text: 'É a capacidade de pegar num problema enorme e assustador (como programar um jogo inteiro) e parti-lo em partes pequeninas e simples.',
          example: 'Jogo = Personagem + Cenário + Pontuação + Colisão com Inimigos.',
        },
        {
          icon: 'Repeat',
          title: 'Reconhecimento de Padrões',
          text: 'Se o teu personagem tem de saltar 4 vezes seguidas da mesma forma, não escrevas o código 4 vezes. Usa um ciclo: "Repetir 4 vezes: saltar".',
          highlight: 'Poupa linhas de código e evita repetições cansativas.',
        },
        {
          icon: 'Sparkles',
          title: 'Abstração: Focar no Essencial',
          text: 'Não precisas de desenhar cada folha de uma árvore no teu jogo; basta um círculo verde e um tronco castanho para o jogador reconhecer.',
          highlight: 'Ignora detalhes irrelevantes e foca-te na mecânica.',
        },
      ],
      quickCheck: {
        question: 'Queres programar um quiz de perguntas sobre os rios de Portugal. Qual é a melhor forma de decompor a tarefa?',
        options: [
          'Escrever tudo ao mesmo tempo no bloco de notas sem pensar.',
          'Dividir em: 1) Pesquisar as 5 perguntas; 2) Criar as variáveis de pontos; 3) Desenhar o ecrã de início; 4) Programar a verificação de respostas.',
          'Desistir porque é muito difícil.',
          'Copiar um jogo de corridas de carros.',
        ],
        correctIndex: 1,
        explanation: 'Excelente decomposição! Ao quebrar o projeto em 4 etapas claras e sequenciais, a tarefa torna-se realizável e motivadora.',
      },
    },
    step2Experimenta: {
      type: 'fake_detector',
      title: 'Caçador de Padrões e Ciclos',
      instruction: 'Analisa o percurso do robô e substitui os passos repetidos por um bloco de ciclo "Repetir X vezes".',
      context: 'Programadores experientes adoram simplificar código.',
      payload: {
        rawSequence: ['Avançar', 'Avançar', 'Avançar', 'Avançar', 'Avançar'],
        optimizedSequence: 'Repetir 5 vezes: [Avançar]',
      },
    },
    step3Desafio: {
      title: 'Desafio do Arquiteto de Software',
      scenario: 'Planeia a arquitetura de uma história interativa.',
      questions: [
        {
          id: 'q1',
          prompt: 'Qual destes conceitos de pensamento computacional serve para esconder detalhes desnecessários?',
          type: 'single_choice',
          options: [
            'Decomposição',
            'Abstração',
            'Bugging',
            'Formatação de disco',
          ],
          correctAnswer: 1,
          explanation: 'Correto! A Abstração permite aos programadores concentrarem-se no que é vital, ignorando complexidades secundárias.',
          hint: 'Conceito que começa por "Abs..." e filtra apenas o que importa.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Decompor o Quarto da Bagunça',
      tagline: 'Aplica o pensamento computacional à organização física.',
      duration: '10 minutos',
      instructions: [
        'Olha para uma tarefa que pareça gigante em tua casa (ex: arrumar a secretária ou a mochila).',
        'Decompõe-na em exatamente 4 micro-passos de 2 minutos cada.',
        'Executa um a um.',
      ],
      tips: ['Dividir em blocos de tempo pequenos acaba com a preguiça!'],
      reflectionPrompt: 'Como decompuseste a tua tarefa e qual foi a sensação de a cumprir passo a passo?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 140,
      badgeId: 'pensador-computacional',
      rewardTitle: 'Estrategista da Decomposição!',
      celebrationMessage: 'Nenhum problema complexo te intimidará a partir de agora.',
    },
  },

  {
    id: 'm5-5',
    worldId: 'mundo-5',
    areaId: 'm5-a3',
    title: 'Fazer Acontecer: Condições e Variáveis',
    subtitle: 'Programação por blocos com decisões "Se... Então" e contadores de pontos',
    xpReward: 160,
    estimatedMinutes: 11,
    step1Descobre: {
      title: 'Como os Jogos Tomam Decisões Inteligentes',
      cards: [
        {
          icon: 'HelpCircle',
          title: 'A Estrutura Condicional (Se... Então... Senão)',
          text: 'Se a vida do jogador for igual a zero, então mostra "Fim de Jogo". Senão, continua a partida.',
          example: 'SE estiver a chover, ENTÃO levo guarda-chuva, SENÃO vou de óculos de sol.',
        },
        {
          icon: 'Database',
          title: 'O que é uma Variável?',
          text: 'É como uma caixa mágica com uma etiqueta onde guardas um valor que pode mudar ao longo do tempo (como o número de moedas apanhadas, vidas ou tempo restante).',
          highlight: 'Nome da variável: "Pontos". Valor inicial: 0. Quando apanho gema: Pontos = Pontos + 10.',
        },
        {
          icon: 'Sparkles',
          title: 'Eventos (Quando Alguém Carregar na Tecla...)',
          text: 'Em linguagens de blocos (como o Scratch), os blocos amarelos de evento iniciam as ações: "Quando a bandeira verde for clicada" ou "Quando a tecla Barra de Espaço for premida".',
          highlight: 'Dá vida e interatividade imediata.',
        },
      ],
      quickCheck: {
        question: 'O que acontece à variável "Moedas" se o código for: [Mudar Moedas por 5] quando o gato toca no peixe?',
        options: [
          'O valor da variável Moedas diminui 5.',
          'O valor da variável Moedas aumenta em 5 unidades.',
          'O jogo fecha sozinho.',
          'A cor do gato muda para azul.',
        ],
        correctIndex: 1,
        explanation: 'Muito bem! "Mudar variável por X" soma esse valor ao total acumulado na variável de pontuação do jogador.',
      },
    },
    step2Experimenta: {
      type: 'block_algorithm',
      title: 'Laboratório de Código: Condição e Pontuação',
      instruction: 'Testa o algoritmo no simulador de blocos: Move o herói para recolher as duas gemas e vê a variável "Pontos" subir para 20.',
      context: 'Os blocos visuais permitem criar jogos sem erros de sintaxe.',
      payload: {
        targetSteps: ['avancar', 'apanhar_gema', 'avancar', 'apanhar_gema'],
        initialScore: 0,
      },
    },
    step3Desafio: {
      title: 'Desafio do Desenvolvedor de Jogos',
      scenario: 'Configura a lógica de fim de jogo (Game Over).',
      questions: [
        {
          id: 'q1',
          prompt: 'Qual dos seguintes blocos condicionais representa a regra correta de vitória?',
          type: 'single_choice',
          options: [
            'Se <Pontos = 100> então: [Tocar som Vitória] e [Parar tudo].',
            'Se <Pontos = 0> então: [Tocar som Vitória].',
            'Repetir 10 vezes: [Mudar Pontos por -50].',
            'Quando tecla [Espaço] premida: [Apagar computador].',
          ],
          correctAnswer: 0,
          explanation: 'Correto! A condição avalia se os pontos atingiram a meta de vitória (100) para acionar a celebração sonora e terminar a partida.',
          hint: 'Procura o bloco que compara Pontos com a meta 100 e para o jogo com vitória.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'O Meu Primeiro Mini-Jogo no Scratch',
      tagline: 'Cria ou explora um projeto de blocos na escola.',
      duration: '20 minutos',
      instructions: [
        'Abre o Scratch online (scratch.mit.edu) ou a aplicação de blocos da escola.',
        'Cria um personagem que ande com as setas do teclado.',
        'Adiciona um objeto para apanhar que faça subir uma variável de pontos com som.',
      ],
      tips: ['Partilha o link do teu projeto com o professor de TIC na próxima aula.'],
      reflectionPrompt: 'Que personagem escolheste e que mecânica divertida conseguiste programar?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 160,
      badgeId: 'primeiro-programa',
      rewardTitle: 'Programador de Blocos!',
      celebrationMessage: 'Compreendeste o poder das variáveis e condições lógicas.',
    },
  },

  {
    id: 'm5-boss',
    worldId: 'mundo-5',
    areaId: 'm5-a5',
    title: 'BOSS FINAL: Criador Digital',
    subtitle: 'O grande teste de programação do labirinto autónomo',
    xpReward: 300,
    estimatedMinutes: 15,
    isBoss: true,
    step1Descobre: {
      title: 'A Batalha Final da Programação',
      cards: [
        {
          icon: 'Gamepad2',
          title: 'O Desafio Supremo do Criador',
          text: 'O robô TIC QUEST está preso no labirinto cibernético mais complexo da plataforma. Precisas de combinar ciclos de repetição, condições lógicas de obstáculos e desvios para alcançar o núcleo digital e salvar o sistema.',
          highlight: 'Este é o desafio final que te consagrará como Mestre Digital!',
        },
      ],
      quickCheck: {
        question: 'Qual é a maior vantagem de usar ciclos "Repetir até que..." em algoritmos de robótica?',
        options: [
          'Gasta menos tinta no monitor.',
          'O robô continua a avançar autonomamente até encontrar a condição de paragem (ex: "tocar na meta"), sem precisares de saber de antemão quantos passos exatos são necessários.',
          'O robô ganha velocidade supersónica instantânea.',
          'Faz com que o robô cante canções.',
        ],
        correctIndex: 1,
        explanation: 'Brilhante! Os ciclos condicionais ("Repetir até que...") conferem verdadeira autonomia ao algoritmo, adaptando-se a distâncias variáveis.',
      },
    },
    step2Experimenta: {
      type: 'block_algorithm',
      title: 'Arena de Programação do Criador Digital',
      instruction: 'Monta o algoritmo de navegação completo: Avançar, desviar à esquerda, apanhar a chave dourada e entrar no portal final.',
      context: 'Todos os teus conhecimentos de lógica computacional em ação!',
      payload: {
        targetSteps: ['avancar', 'virar_esquerda', 'avancar', 'apanhar_gema', 'avancar', 'virar_direita', 'avancar'],
        gridSize: 5,
        isBossLevel: true,
      },
    },
    step3Desafio: {
      title: 'O Enigma da Otimização de Código',
      scenario: 'O processador do robô tem memória limitada e precisa de um código enxuto.',
      questions: [
        {
          id: 'q1',
          prompt: 'Qual destas duas formas de código é mais elegante, eficiente e profissional?',
          type: 'single_choice',
          options: [
            'Escrever 20 blocos "Avançar 1 passo" um a seguir ao outro.',
            'Usar o bloco: [Repetir 20 vezes: [Avançar 1 passo]].',
            'Mudar a cor do ecrã.',
            'Desligar o robô a meio do caminho.',
          ],
          correctAnswer: 1,
          explanation: 'Correto! Os ciclos reduzem 20 instruções para apenas 2 blocos, facilitando a leitura, manutenção e diminuindo a probabilidade de bugs.',
          hint: 'Lembra-te do poder dos ciclos de repetição.',
        },
      ],
    },
    step4MissaoReal: {
      title: 'Manifesto do Criador Digital',
      tagline: 'O teu plano para o futuro tecnológico.',
      duration: '10 minutos',
      instructions: [
        'Pensa numa ideia de aplicação ou jogo que gostarias de criar no futuro para ajudar pessoas ou a tua escola.',
        'Descreve o objetivo e as principais mecânicas em 3 linhas.',
      ],
      tips: ['Grandes programadores começaram com ideias simples no 6.º ano!'],
      reflectionPrompt: 'Qual é o teu sonho de projeto digital e como a programação te vai ajudar a realizá-lo?',
      deliverableType: 'reflection',
    },
    step5Recompensa: {
      xp: 300,
      badgeId: 'criador-jogos-boss',
      rewardTitle: 'Troféu Supremo: Criador Digital!',
      celebrationMessage: 'Completaste o Mundo 5! Conquistaste a coroa do Pensamento Computacional e da Criação Digital!',
    },
  },
];

export function getMissionById(id: string): Mission | undefined {
  return MISSIONS.find(m => m.id === id);
}

export function getMissionsByWorld(worldId: string): Mission[] {
  return MISSIONS.filter(m => m.worldId === worldId);
}
