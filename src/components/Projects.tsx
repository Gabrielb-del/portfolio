import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProjectsSection = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: 100px 20px;
  background: ${({ theme }) => theme.colors.background};
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

const DevelopmentMessage = styled(motion.div)`
  text-align: center;
  padding: 40px;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const Projects = () => {
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

  return (
    <ProjectsSection>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Title variants={fadeInUp}>Projetos</Title>
          <DevelopmentMessage 
            variants={fadeInUp}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <h3>Em Desenvolvimento</h3>
            <p>Projetos serão adicionados em breve...</p>
          </DevelopmentMessage>
        </motion.div>
      </Container>
    </ProjectsSection>
  );
};

export default Projects; 