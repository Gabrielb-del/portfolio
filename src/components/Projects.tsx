import { motion } from 'framer-motion';
import styled from 'styled-components';

const ProjectsSection = styled.section`
  min-height: 100vh;
  width: 100%;
  padding: 100px 20px;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
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
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => `${theme.colors.backgroundLight}80`};
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
  padding: 20px;
  cursor: pointer;
  
  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 40px;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
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

  return (
    <ProjectsSection>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Title variants={fadeInUp}>Projetos</Title>
          <motion.div variants={staggerContainer}>
            <ProjectsGrid>
              <EmptyState 
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <h3>Em breve</h3>
                <p>Projetos serão adicionados em breve...</p>
              </EmptyState>
            </ProjectsGrid>
          </motion.div>
        </motion.div>
      </Container>
    </ProjectsSection>
  );
};

export default Projects; 