import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { TypeAnimation } from 'react-type-animation';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const HeroContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: transparent;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.gradients.softGlow};
  opacity: 0.35;
`;

const ContentWrapper = styled(motion.div)`
  text-align: center;
  z-index: 1;
  color: ${({ theme }) => theme.colors.text};
  padding: 1.5rem 1.25rem;
  width: min(920px, 92vw);
  border: 1px solid ${({ theme }) => `${theme.colors.primary}26`};
  border-radius: 24px;
  backdrop-filter: blur(10px);
  background: linear-gradient(
    180deg,
    ${({ theme }) => `${theme.colors.backgroundLight}cc`} 0%,
    ${({ theme }) => `${theme.colors.background}a8`} 100%
  );
  box-shadow: ${({ theme }) => theme.shadows.large};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: min(94vw, 500px);
    padding: 1.15rem 0.95rem;
    border-radius: 18px;
  }
`;

const IntroText = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 600;
`;

const Name = styled(motion.h1)`
  font-size: clamp(2.3rem, 6vw, 4.8rem);
  font-weight: 700;
  margin: 0;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
`;

const Subtitle = styled(motion.p)`
  margin: 1rem auto 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.7;
  max-width: 680px;
`;

const CtaRow = styled(motion.div)`
  margin-top: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 0.65rem;
  }
`;

const PrimaryButton = styled.a`
  text-decoration: none;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem 1.15rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}80`};
  background: ${({ theme }) => `${theme.colors.primary}26`};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => `${theme.colors.primary}3d`};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    text-align: center;
  }
`;

const GhostButton = styled(PrimaryButton)`
  background: transparent;
  border-color: ${({ theme }) => `${theme.colors.textSecondary}55`};
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 1rem;
  }
`;

const SocialIcon = styled(motion.a)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.8rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  z-index: 2;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const ScrollDot = styled(motion.div)`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  margin-top: 8px;
`;

const Hero = () => {
  const [showName, setShowName] = useState(false);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <HeroContainer id="inicio">
      <AnimatedBackground />
      <ContentWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <IntroText>
          <TypeAnimation
            sequence={[
              'Prazer, meu nome é',
              () => setShowName(true)
            ]}
            speed={50}
            cursor={false}
          />
        </IntroText>
        <Name
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: showName ? 1 : 0, 
            scale: showName ? 1 : 0.8 
          }}
          transition={{
            duration: 1,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          Gabriel Baunilia
        </Name>
        <Subtitle
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          Crio experiências digitais leves, transformando ideias em interfaces simples, funcionais e bem construídas.
        </Subtitle>
        <CtaRow
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          <PrimaryButton href="#projetos">Ver projetos</PrimaryButton>
          <GhostButton href="#sobre">Conhecer minha jornada</GhostButton>
        </CtaRow>
        <SocialLinks
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          <SocialIcon 
            href="https://www.linkedin.com/in/gabriel-baunilia-a363a826b/" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedin />
          </SocialIcon>
          <SocialIcon 
            href="https://github.com/Gabrielb-del" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
          </SocialIcon>
          <SocialIcon 
            href="https://instagram.com/_bauniliaxcz" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaInstagram />
          </SocialIcon>
        </SocialLinks>
      </ContentWrapper>
      
      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={handleScroll}
      >
        Role para baixo
        <ScrollDot
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default Hero; 