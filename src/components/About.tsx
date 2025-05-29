import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutSection = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: 100px 20px;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentWrapper = styled(motion.div)`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 3rem;
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 2rem;
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

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const EducationSection = styled(motion.div)`
  margin-top: 4rem;
  padding-top: 4rem;
  border-top: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
`;

const EducationItem = styled(motion.div)`
  margin-bottom: 2rem;
  text-align: center;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }
`;

const Year = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 1.1rem;
`;

const SectionTitle = styled(motion.h3)`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const About = () => {
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
    "Excel Avançado",
    "Power BI",
    "Inglês Intermediário",
  ];

  return (
    <AboutSection>
      <Container>
        <ContentWrapper>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Title variants={fadeInUp}>Sobre Mim</Title>
            <Description variants={fadeInUp}>
              Tenho experiência em desenvolvimento de sistemas de informação e sou apaixonado por desenvolvimento de software e automação. Atualmente, trabalho na B&B Capital como Assistente de Planejamento, onde desenvolvo soluções técnicas para otimizar processos operacionais.
            </Description>

            <motion.div
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
            </motion.div>

            <EducationSection
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <SectionTitle variants={fadeInUp}>Educação</SectionTitle>
              <motion.div variants={staggerContainer}>
                <EducationItem variants={fadeInUp}>
                  <Year>2023 - 2026</Year>
                  <h3>Sistemas de Informação - ITE (3º ano)</h3>
                </EducationItem>
                <EducationItem variants={fadeInUp}>
                  <Year>2022</Year>
                  <h3>Certificado em Desenvolvedor Full Stack - SENAC</h3>
                </EducationItem>
                <EducationItem variants={fadeInUp}>
                  <Year>2022</Year>
                  <h3>Ensino Médio Completo</h3>
                </EducationItem>
              </motion.div>
            </EducationSection>
          </motion.div>
        </ContentWrapper>
      </Container>
    </AboutSection>
  );
};

export default About; 