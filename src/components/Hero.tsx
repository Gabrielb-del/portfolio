import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TypeAnimation } from 'react-type-animation';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import ParticlesBackground from './ParticlesBackground';

const HeroContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`;

const AnimatedBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, 
    ${({ theme }) => theme.colors.backgroundLight} 0%, 
    ${({ theme }) => theme.colors.background} 100%
  );
  opacity: 0.5;
  transition: transform ${({ theme }) => theme.transitions.default};
`;

const ContentWrapper = styled(motion.div)`
  text-align: center;
  z-index: 1;
  color: ${({ theme }) => theme.colors.text};
  padding: 0 20px;
`;

const IntroText = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  font-weight: 500;
`;

const Name = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 700;
  margin: 0;
  background: ${({ theme }) => theme.gradients.primary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -1px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-top: 1rem;
  opacity: 0.8;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1rem;
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
`;

const ScrollDot = styled(motion.div)`
  width: 6px;
  height: 6px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  margin-top: 8px;
`;

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <HeroContainer id="inicio">
      <ParticlesBackground />
      <AnimatedBackground
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      />
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
        
        
        <SocialLinks
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
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