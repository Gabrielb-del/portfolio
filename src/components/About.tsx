import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useState } from 'react';
import avatar from '../assets/avatar.png';

const AboutSection = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: 100px 20px;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin-bottom: 40px;
  }
`;

const ImageContainer = styled(motion.div)`
  flex: 0 0 300px;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.colors.primary};

  @media (max-width: 768px) {
    flex: 0 0 250px;
    height: 330px;
    width: 250px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoContainer = styled(motion.div)`
  flex: 1;
  max-width: 600px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 15px;
    margin-bottom: 25px;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  border: none;
  background: ${({ theme, active }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, active }) => active ? theme.colors.background : theme.colors.text};
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.primary};

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 1rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const SkillsSection = styled(motion.div)`
  text-align: center;
  padding-top: 40px;
  border-top: 1px solid ${({ theme }) => `${theme.colors.primary}30`};

  @media (max-width: 768px) {
    padding-top: 30px;
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
    margin-top: 1.5rem;
  }
`;

const SkillItem = styled(motion.div)`
  background: ${({ theme }) => `${theme.colors.backgroundLight}80`};
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1.2rem;
    font-size: 0.9rem;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const EducationSection = styled(motion.div)`
  @media (max-width: 768px) {
    margin-top: -1rem;
  }
`;

const EducationItem = styled(motion.div)`
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.2rem;
    margin: 0.5rem 0;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const Year = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const SectionTitle = styled(motion.h3)`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const About = () => {
  const [activeTab, setActiveTab] = useState<'about' | 'education'>('about');

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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const skills = [
    "Python",
    "JavaScript",
    "React",
    "HTML/CSS",
    "SQL",
    "Automação",
    "PHP",
    "GIT",
  ];

  return (
    <AboutSection>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Title variants={fadeInUp}>Sobre Mim</Title>
          <ContentWrapper>
            <ImageContainer variants={fadeInUp}>
              <img src={avatar} alt="Sua foto" />
            </ImageContainer>
            <InfoContainer>
              <TabContainer>
                <Tab 
                  active={activeTab === 'about'} 
                  onClick={() => setActiveTab('about')}
                >
                  Sobre Mim
                </Tab>
                <Tab 
                  active={activeTab === 'education'} 
                  onClick={() => setActiveTab('education')}
                >
                  Formação
                </Tab>
              </TabContainer>

              {activeTab === 'about' && (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <Description variants={fadeInUp}>
                  Desenvolvo sites modernos, responsivos e com foco em conversão — especialmente landing pages que apresentam seu serviço ou produto de forma clara, profissional e estratégica. Também utilizo Python em projetos paralelos para automatizar tarefas e otimizar processos, sempre buscando entregar soluções que economizam tempo e geram resultado.
                  </Description>
                </motion.div>
              )}

              {activeTab === 'education' && (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <EducationSection variants={staggerContainer}>
                    <motion.div variants={staggerContainer}>
                      <EducationItem variants={fadeInUp}>
                        <Year>2023 - 2026</Year>
                        <h3>Sistemas de Informação - ITE (3º ano)</h3>
                      </EducationItem>
                      <EducationItem variants={fadeInUp}>
                        <Year>2022</Year>
                        <h3>Certificado em Desenvolvedor Full Stack - SENAC</h3>
                      </EducationItem>
                    </motion.div>
                  </EducationSection>
                </motion.div>
              )}
            </InfoContainer>
          </ContentWrapper>

          <SkillsSection
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionTitle variants={fadeInUp}>Habilidades</SectionTitle>
            <SkillsGrid variants={staggerContainer}>
              {skills.map((skill, index) => (
                <SkillItem
                  key={skill}
                  variants={fadeInUp}
                  custom={index}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </SkillItem>
              ))}
            </SkillsGrid>
          </SkillsSection>
        </motion.div>
      </Container>
    </AboutSection>
  );
};

export default About; 