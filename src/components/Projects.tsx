import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import verificadorLeadsImg from '../assets/images/verificador-leads.jpeg';

type ProjectMediaType = 'image' | 'video' | 'gif';

type ProjectMedia = {
  type: ProjectMediaType;
  src: string;
  thumbSrc?: string;
  alt?: string;
  position?: string;
  fit?: 'cover' | 'contain';
};

type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  status: string;
  githubUrl?: string;
  media?: ProjectMedia[];
  mediaType?: ProjectMediaType;
  mediaSrc?: string;
  bullets: string[];
};

const borderFlow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

const ledPulse = keyframes`
  0%, 100% { opacity: 0.85; filter: saturate(1) brightness(1); }
  50% { opacity: 1; filter: saturate(1.25) brightness(1.2); }
`;

const ProjectsSection = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: 100px 20px;
  background: transparent;
  position: relative;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const Intro = styled(motion.p)`
  margin: 0 auto 2.2rem;
  max-width: 720px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.96rem;
    margin-bottom: 1.5rem;
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const ProjectCard = styled(motion.button) <{ $active?: boolean }>`
  width: 100%;
  border: 1.2px solid transparent;
  border-radius: 18px;
  padding: 1.1rem;
  background: ${({ theme }) => `${theme.colors.surface}b8`};
  min-height: 220px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-align: left;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1.3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => `${theme.colors.primary}cc`} 0%,
      ${({ theme }) => `${theme.colors.secondary}d2`} 35%,
      ${({ theme }) => `${theme.colors.accent}c8`} 55%,
      ${({ theme }) => `${theme.colors.secondary}d2`} 75%,
      ${({ theme }) => `${theme.colors.primary}cc`} 100%
    );
    background-size: 220% 100%;
    animation: ${({ $active }) => ($active ? `${borderFlow} 2.9s linear infinite, ${ledPulse} 1.8s ease-in-out infinite` : 'none')};
    z-index: 0;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 17px;
    background: ${({ theme }) => `${theme.colors.surface}f0`};
    z-index: 0;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
    animation: ${borderFlow} 2.9s linear infinite, ${ledPulse} 1.8s ease-in-out infinite;
  }

  &:hover .project-tag,
  &[data-active='true'] .project-tag {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => `${theme.colors.accent}b8`};
    background: ${({ theme }) => `${theme.colors.accent}26`};
    box-shadow: 0 0 14px ${({ theme }) => `${theme.colors.accent}33`};
  }

  > * {
    position: relative;
    z-index: 1;
  }

  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.12rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
    font-size: 0.94rem;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const Tag = styled.span`
  border-radius: 999px;
  border: 1px solid ${({ theme }) => `${theme.colors.secondary}66`};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.2rem 0.55rem;
  font-size: 0.78rem;
  transition: all 0.25s ease;
`;

const CardFooter = styled.div`
  margin-top: auto;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.86rem;
  font-weight: 600;
`;

const DetailsView = styled(motion.section)`
  border: 1.2px solid transparent;
  border-radius: 22px;
  background: ${({ theme }) => `${theme.colors.surface}ca`};
  padding: 1.25rem;
  margin-top: 0.2rem;
  overflow: hidden;
  position: relative;
  min-height: 430px;

  @media (max-width: 768px) {
    padding: 0.95rem;
    border-radius: 16px;
    min-height: auto;
  }

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1.3px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => `${theme.colors.primary}cc`} 0%,
      ${({ theme }) => `${theme.colors.secondary}d2`} 35%,
      ${({ theme }) => `${theme.colors.accent}c8`} 55%,
      ${({ theme }) => `${theme.colors.secondary}d2`} 75%,
      ${({ theme }) => `${theme.colors.primary}cc`} 100%
    );
    background-size: 220% 100%;
    animation: ${borderFlow} 3.1s linear infinite, ${ledPulse} 1.9s ease-in-out infinite;
    z-index: 0;
    opacity: 1;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 21px;
    background: ${({ theme }) => `${theme.colors.surface}ee`};
    z-index: 0;
    pointer-events: none;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  .project-tag {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => `${theme.colors.accent}b8`};
    background: ${({ theme }) => `${theme.colors.accent}22`};
    box-shadow: 0 0 14px ${({ theme }) => `${theme.colors.accent}2e`};
  }
`;

const DetailsLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 46%) minmax(320px, 54%);
  gap: 1.2rem;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    gap: 0.85rem;
  }
`;

const MediaColumn = styled(motion.div)`
  position: relative;
`;

const TextColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
`;

const DetailsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    gap: 0.55rem;
    margin-bottom: 0.55rem;
  }
`;

const HeaderTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const GithubBottomRow = styled.div`
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  z-index: 2;

  @media (max-width: 768px) {
    position: relative;
    right: auto;
    bottom: auto;
    width: 100%;
    justify-content: center;
    margin-top: 0.85rem;
  }
`;

const HeaderText = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.35rem;
    margin-bottom: 0.4rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.7;
    max-width: 760px;
  }
`;

const CloseButton = styled(motion.button)`
  border: 1px solid ${({ theme }) => `${theme.colors.primary}70`};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 999px;
  background: transparent;
  padding: 0.45rem 0.85rem;
  cursor: pointer;
  white-space: nowrap;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 0.6rem 0.85rem;
  }
`;

const GithubButton = styled(motion.a)`
  border: 1px solid ${({ theme }) => `${theme.colors.primary}70`};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 999px;
  background: transparent;
  padding: 0.45rem 0.85rem;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}14`};
    border-color: ${({ theme }) => `${theme.colors.primary}80`};
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    justify-content: center;
    padding: 0.6rem 0.85rem;
  }
`;

const MediaFrame = styled.div`
  width: 100%;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => `${theme.colors.secondary}5e`};
  overflow: hidden;
  min-height: clamp(300px, 45vw, 480px);
  max-height: 560px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    120deg,
    ${({ theme }) => `${theme.colors.backgroundLight}`} 0%,
    ${({ theme }) => `${theme.colors.surface}`} 100%
  );

  video,
  img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: clamp(300px, 45vw, 480px);
    max-height: 560px;
  }

  @media (max-width: 768px) {
    min-height: 240px;

    video,
    img {
      min-height: 240px;
      max-height: 320px;
    }
  }
`;

const MediaSlide = styled(motion.div)<{ $position?: string }>`
  position: absolute;
  inset: 0;

  video,
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    object-position: ${({ $position }) => $position ?? 'center center'};
  }
`;

const MediaControls = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.6rem;
  pointer-events: none;
`;

const MediaArrow = styled(motion.button)`
  pointer-events: auto;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}55`};
  background: ${({ theme }) => `${theme.colors.surface}b8`};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => `${theme.colors.primary}85`};
    background: ${({ theme }) => `${theme.colors.primary}16`};
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const ThumbsRow = styled.div`
  margin-top: 0.7rem;
  display: flex;
  gap: 0.55rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
`;

const ThumbButton = styled(motion.button)<{ $active: boolean }>`
  width: 64px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid ${({ theme, $active }) => ($active ? `${theme.colors.accent}aa` : `${theme.colors.primary}2e`)};
  background: ${({ theme }) => `${theme.colors.surface}b0`};
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  flex: 0 0 auto;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: ${({ $active }) => ($active ? 1 : 0.78)};
    transition: opacity ${({ theme }) => theme.transitions.fast};
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 40px;
  }
`;

const MediaPlaceholder = styled.div`
  min-height: 360px;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: 1.4rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    min-height: 220px;
    padding: 1rem;
    font-size: 0.92rem;
  }
`;

const DetailIntro = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;

const DetailList = styled.ul`
  margin: 0;
  padding-left: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: grid;
  gap: 0.45rem;
  line-height: 1.55;
`;

const CarouselWrapper = styled(motion.div)`
  margin-top: 1rem;
`;

const CarouselViewport = styled.div`
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0.35rem;
    width: 14px;
    pointer-events: none;
    z-index: 2;
  }

  &::before {
    left: 0;
    background: linear-gradient(
      90deg,
      ${({ theme }) => `${theme.colors.background}b8`} 0%,
      ${({ theme }) => `${theme.colors.background}66`} 48%,
      transparent 100%
    );
  }

  &::after {
    right: 0;
    background: linear-gradient(
      270deg,
      ${({ theme }) => `${theme.colors.background}b8`} 0%,
      ${({ theme }) => `${theme.colors.background}66`} 48%,
      transparent 100%
    );
  }
`;

const CarouselHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;

  h4 {
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: 768px) {
    margin-bottom: 0.55rem;

    h4 {
      font-size: 0.95rem;
    }
  }
`;

const CarouselActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CarouselButton = styled.button`
  border: 1px solid ${({ theme }) => `${theme.colors.primary}60`};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  padding: 0.25rem 0.55rem;
  cursor: pointer;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 0.8rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.35rem;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `${theme.colors.primary}55`};
    border-radius: 999px;
  }
`;

const CarouselCard = styled(motion.button)`
  width: 300px;
  min-width: 300px;
  max-width: 300px;
  scroll-snap-align: start;
  border: 1.2px solid transparent;
  border-radius: 14px;
  background: ${({ theme }) => `${theme.colors.surface}ad`};
  padding: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  cursor: pointer;
  display: grid;
  gap: 0.6rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1.2px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => `${theme.colors.primary}cc`} 0%,
      ${({ theme }) => `${theme.colors.secondary}d2`} 35%,
      ${({ theme }) => `${theme.colors.accent}c8`} 55%,
      ${({ theme }) => `${theme.colors.secondary}d2`} 75%,
      ${({ theme }) => `${theme.colors.primary}cc`} 100%
    );
    background-size: 220% 100%;
    animation: none;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.28s ease;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 13px;
    background: ${({ theme }) => `${theme.colors.surface}ef`};
    z-index: 0;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
    animation: ${borderFlow} 3s linear infinite, ${ledPulse} 1.9s ease-in-out infinite;
  }

  &:hover .project-tag {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => `${theme.colors.accent}b8`};
    background: ${({ theme }) => `${theme.colors.accent}26`};
    box-shadow: 0 0 14px ${({ theme }) => `${theme.colors.accent}33`};
  }

  > * {
    position: relative;
    z-index: 1;
  }

  h3 {
    font-size: 1rem;
    line-height: 1.25;
    max-height: 2.5em;
    overflow: hidden;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
    font-size: 0.9rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  min-height: 190px;

  @media (max-width: 768px) {
    width: 250px;
    min-width: 250px;
    max-width: 250px;
    padding: 0.78rem;

    h3 {
      font-size: 0.95rem;
    }

    p {
      font-size: 0.84rem;
    }

    min-height: 168px;
  }
`;


const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [mediaDirection, setMediaDirection] = useState<-1 | 1>(1);
  const [activeMediaIndexByProject, setActiveMediaIndexByProject] = useState<Record<string, number>>({});

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const projectBase = useMemo<Project[]>(
    () => [
      {
        id: "limpador-de-leads",
        title: "Limpador de Leads",
        description: "Automação em Python utilizando a biblioteca Selenium para limpar leads consultando um site.",
        longDescription: "Sistema desenvolvido em Python para atender à necessidade de limpeza e validação de leads empresariais, processando listas de CNPJs e realizando consultas automatizadas em um site privado utilizando Selenium e ChromeDriver. O sistema inicia sessões do navegador com a flag --remote-debugging-port=9222, preenche automaticamente formulários e coleta as respostas retornadas pela plataforma. Com base nos resultados obtidos, os dados são organizados e exportados para uma planilha Excel, contendo os CNPJs processados e as respectivas informações da consulta, realizando processos de validação, organização e estruturação dos dados, gerando uma base pronta para uso comercial e tomada de decisão.",
          tags: ["Python", "Selenium", "Automação"],
      status: "Finalizado",
      githubUrl: "https://github.com/Gabrielb-del",
      media: [
        { type: "image", src: verificadorLeadsImg, position: "center center", fit: "contain" }
      ],
      bullets: [
        "Redução significativa do tempo de análise e qualificação de leads.",
        "Processamento automatizado de grandes volumes de CNPJs.",
        "Geração de base de dados pronta para uso em vendas e prospecção."
      ]
      },
  {
    id: "discord-b4b",
    title: "Bots de Discord - PeterBot e RankingB4B",
    description: "Sistema de bots em Python para automação e gestão de equipes comerciais via Discord, com controle de operadores e rankings em tempo real.",
    longDescription:
          "Sistema de automação desenvolvido em Python utilizando bots para Discord, focado na gestão operacional de equipes comerciais. A solução é composta por múltiplos bots responsáveis pelo gerenciamento de operadores, controle de metas, monitoramento de desempenho e organização de dados em tempo real, processando informações enviadas via Discord e estruturando dados como contas abertas e contatos qualificados. O sistema mantém rankings atualizados automaticamente com base na performance dos operadores e disponibiliza comandos administrativos para gestão completa da equipe, incluindo adição, remoção e atualização de usuários. Além disso, conta com rotinas automatizadas para backup de dados em JSON e exportação de relatórios em Excel, garantindo organização, segurança das informações e suporte à tomada de decisão.",
    tags: ["Discord", "Python", "Bot"],
    status: "Finalizado",
    githubUrl: "https://github.com/Gabrielb-del/discord-b4b",
    mediaType: "gif",
    bullets: [
      "Automação completa da gestão de operadores e desempenho via Discord.",
      "Sistema de ranking em tempo real com atualização automática periódica.",
      "Processamento e estruturação de dados comerciais enviados por mensagens.",
      "Exportação de relatórios em Excel para análise e acompanhamento.",
    ]
      },
{
  id: "e-commerce-spfc",
    title: "E-commerce São Paulo FC",
      description: "E-commerce de produtos do São Paulo FC utilizando React.js",
        longDescription:
  "Modelo e-commerce desenvolvido com React.js, com foco em organização de código, navegação fluida e gerenciamento de estado. Conta com catálogo de produtos por categorias, carrinho de compras e uma área administrativa com autenticação, permitindo gerenciar produtos, categorias e visualizar vendas. O projeto também utiliza integração com API, rotas protegidas e Context API para controle global de estado.",
    tags: ["React.js", "API", "Context API"],
      status: "Finalizado",
      githubUrl: "https://github.com/Gabrielb-del/spfc-tasi",
        mediaType: "image",
        bullets: [
          "Integração com API para operações de CRUD.",
          "Área administrativa com autenticação e rotas protegidas.",
          "Gerenciamento de estado global com Context API."
        ]
}
    ],
[]
  );

const selectedProject = useMemo(
  () => projectBase.find((project) => project.id === selectedProjectId) ?? null,
  [projectBase, selectedProjectId]
);
const carouselProjects = useMemo(
  () => projectBase.filter((project) => project.id !== selectedProjectId),
  [projectBase, selectedProjectId]
);

const scrollCarousel = (direction: 'left' | 'right') => {
  if (!carouselRef.current) return;
  const amount = direction === 'left' ? -320 : 320;
  carouselRef.current.scrollBy({ left: amount, behavior: 'smooth' });
};

const handleSelectProject = (projectId: string) => {
  setSelectedProjectId((current) => (current === projectId ? current : projectId));
};

  useEffect(() => {
    if (!selectedProjectId) return;
    setActiveMediaIndexByProject((prev) => (prev[selectedProjectId] === undefined ? { ...prev, [selectedProjectId]: 0 } : prev));
  }, [selectedProjectId]);

  const getMediaItems = (project: Project): ProjectMedia[] => {
    if (project.media && project.media.length > 0) return project.media;
    if (project.mediaSrc && project.mediaType) {
      return [
        {
          type: project.mediaType,
          src: project.mediaSrc,
          alt: `Preview do projeto ${project.title}`,
        },
      ];
    }
    return [];
  };

  const renderMediaItem = (project: Project, item: ProjectMedia) => {
    const fitMode: 'cover' | 'contain' = item.fit ?? (item.type === 'video' ? 'cover' : 'contain');

    if (item.type === 'video') {
      return (
        <video
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
          style={{
            objectFit: fitMode,
            objectPosition: item.position ?? 'center center',
          }}
        />
      );
    }
    return (
      <img
        src={item.src}
        alt={item.alt ?? `Preview do projeto ${project.title}`}
        style={{
          objectFit: fitMode,
          objectPosition: item.position ?? 'center center',
        }}
      />
    );
  };

return (
  <ProjectsSection id="projetos">
    <Container>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Title variants={fadeInUp}>Laboratório de Projetos</Title>
        <Intro variants={fadeInUp}>
         Projetos realizados durante meus estudos e experiências profissionais.
        </Intro>
        <LayoutGroup>
          <AnimatePresence initial={false} mode="sync">
            {!selectedProject ? (
              <ProjectsGrid
                key="default-grid"
                variants={fadeInUp}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0.12, y: -4, transition: { duration: 0.28 } }}
              >
                {projectBase.map((project) => (
                  <ProjectCard
                    key={project.id}
                    $active={false}
                    data-active="false"
                    type="button"
                    layoutId={`project-card-${project.id}`}
                    onClick={() => handleSelectProject(project.id)}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <TagRow>
                      {project.tags.map((tag) => (
                        <Tag key={tag} className="project-tag">{tag}</Tag>
                      ))}
                    </TagRow>
                    <CardFooter>{project.status}</CardFooter>
                  </ProjectCard>
                ))}
              </ProjectsGrid>
            ) : (
              <motion.div
                key="expanded-view"
                initial={{ opacity: 0, y: 20, scale: 0.992 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0.15, y: -8, scale: 0.994 }}
                transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
              >
                <DetailsView layoutId={`project-card-${selectedProject.id}`}>
                  <motion.div
                    key={selectedProject.id}
                    initial={{ opacity: 0.35, y: 6, scale: 0.996 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <DetailsLayout>
                      <MediaColumn
                        initial={{ opacity: 0.5, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
                      >
                          {(() => {
                            const mediaItems = getMediaItems(selectedProject);
                            const activeIndexRaw = activeMediaIndexByProject[selectedProject.id] ?? 0;
                            const activeIndex = Math.min(Math.max(activeIndexRaw, 0), Math.max(mediaItems.length - 1, 0));
                            const activeItem = mediaItems[activeIndex];

                            const goTo = (nextIndex: number) => {
                              const clamped = Math.min(Math.max(nextIndex, 0), mediaItems.length - 1);
                              if (clamped === activeIndex) return;
                              setMediaDirection(clamped > activeIndex ? 1 : -1);
                              setActiveMediaIndexByProject((prev) => ({ ...prev, [selectedProject.id]: clamped }));
                            };

                            const prev = () => goTo(activeIndex - 1);
                            const next = () => goTo(activeIndex + 1);

                            if (mediaItems.length === 0 || !activeItem) {
                              return (
                                <MediaFrame>
                                  <MediaPlaceholder>
                                    Sem imagem, por enquanto...
                                  </MediaPlaceholder>
                                </MediaFrame>
                              );
                            }

                            return (
                              <>
                                <MediaFrame>
                                  <AnimatePresence initial={false} custom={mediaDirection} mode="sync">
                                    <MediaSlide
                                      key={activeItem.src}
                                      custom={mediaDirection}
                                      $position={activeItem.position}
                                      variants={{
                                        enter: (dir: -1 | 1) => ({
                                          opacity: 0,
                                          x: dir * 24,
                                          filter: 'blur(10px)',
                                          scale: 1.01,
                                        }),
                                        center: {
                                          opacity: 1,
                                          x: 0,
                                          filter: 'blur(0px)',
                                          scale: 1,
                                        },
                                        exit: (dir: -1 | 1) => ({
                                          opacity: 0,
                                          x: dir * -18,
                                          filter: 'blur(10px)',
                                          scale: 0.995,
                                        }),
                                      }}
                                      initial="enter"
                                      animate="center"
                                      exit="exit"
                                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                      {renderMediaItem(selectedProject, activeItem)}
                                    </MediaSlide>
                                  </AnimatePresence>

                                  {mediaItems.length > 1 && (
                                    <MediaControls>
                                      <MediaArrow
                                        type="button"
                                        onClick={prev}
                                        whileTap={{ scale: 0.96 }}
                                        aria-label="Mídia anterior"
                                      >
                                        ‹
                                      </MediaArrow>
                                      <MediaArrow
                                        type="button"
                                        onClick={next}
                                        whileTap={{ scale: 0.96 }}
                                        aria-label="Próxima mídia"
                                      >
                                        ›
                                      </MediaArrow>
                                    </MediaControls>
                                  )}
                                </MediaFrame>

                                {mediaItems.length > 1 && (
                                  <ThumbsRow>
                                    {mediaItems.map((m, idx) => (
                                      <ThumbButton
                                        key={`${m.src}-${idx}`}
                                        type="button"
                                        $active={idx === activeIndex}
                                        onClick={() => goTo(idx)}
                                        whileTap={{ scale: 0.98 }}
                                        aria-label={`Abrir mídia ${idx + 1}`}
                                      >
                                        <img src={m.thumbSrc ?? m.src} alt="" />
                                      </ThumbButton>
                                    ))}
                                  </ThumbsRow>
                                )}
                              </>
                            );
                          })()}
                      </MediaColumn>
                      <TextColumn
                        initial={{ opacity: 0.45, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.46, delay: 0.03, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <DetailsHeader>
                          <HeaderTopRow>
                            <HeaderText>
                              <h3>{selectedProject.title}</h3>
                            </HeaderText>
                            <CloseButton
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => setSelectedProjectId(null)}
                            >
                              Fechar detalhamento
                            </CloseButton>
                          </HeaderTopRow>

                          {/* GitHub button moved to bottom-right of card */}
                        </DetailsHeader>
                        <DetailIntro>{selectedProject.longDescription}</DetailIntro>
                        <DetailList>
                          {selectedProject.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </DetailList>
                        <TagRow>
                          {selectedProject.tags.map((tag) => (
                            <Tag key={tag} className="project-tag">{tag}</Tag>
                          ))}
                        </TagRow>
                        <CardFooter>{selectedProject.status}</CardFooter>

                        {selectedProject.githubUrl && (
                          <GithubBottomRow>
                            <GithubButton
                              href={selectedProject.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                            >
                              <FaGithub />
                              Acessar projeto no GitHub
                            </GithubButton>
                          </GithubBottomRow>
                        )}
                      </TextColumn>
                    </DetailsLayout>
                  </motion.div>
                </DetailsView>

                <CarouselWrapper
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.28 }}
                >
                  <CarouselHeader>
                    <h4>Outros projetos</h4>
                    <CarouselActions>
                      <CarouselButton type="button" onClick={() => scrollCarousel('left')}>◀</CarouselButton>
                      <CarouselButton type="button" onClick={() => scrollCarousel('right')}>▶</CarouselButton>
                    </CarouselActions>
                  </CarouselHeader>
                  <CarouselViewport>
                    <CarouselTrack ref={carouselRef}>
                      {carouselProjects.map((project) => (
                        <CarouselCard
                          key={project.id}
                          type="button"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleSelectProject(project.id)}
                        >
                          <h3>{project.title}</h3>
                          <p>{project.description}</p>
                          <TagRow>
                            {project.tags.map((tag) => (
                              <Tag key={tag} className="project-tag">{tag}</Tag>
                            ))}
                          </TagRow>
                          <CardFooter>{project.status}</CardFooter>
                        </CarouselCard>
                      ))}
                    </CarouselTrack>
                  </CarouselViewport>
                </CarouselWrapper>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </motion.div>
    </Container>
  </ProjectsSection>
);
};

export default Projects; 