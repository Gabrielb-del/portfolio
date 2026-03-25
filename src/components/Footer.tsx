import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaCheck, FaGithub, FaInstagram, FaLinkedin, FaRegCopy } from 'react-icons/fa';

const FooterSection = styled.footer`
  position: relative;
  padding: 70px 20px 40px;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  background: linear-gradient(
    180deg,
    transparent 0%,
    ${({ theme }) => `${theme.colors.background}b8`} 55%,
    ${({ theme }) => `${theme.colors.background}dd`} 100%
  );
  border-top: 1px solid ${({ theme }) => `${theme.colors.primary}22`};

  @media (max-width: 768px) {
    padding: 56px 15px 30px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  gap: 1.2rem;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled(motion.h3)`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  font-size: 1rem;
  margin-bottom: 1.25rem;
  max-width: 720px;
`;

const ContactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const EmailButton = styled(motion.button)`
  border: 1px solid ${({ theme }) => `${theme.colors.primary}45`};
  background: ${({ theme }) => `${theme.colors.surface}95`};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 999px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;

  span {
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  &::after {
    content: '';
    position: absolute;
    left: -40%;
    top: 0;
    bottom: 0;
    width: 40%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => `${theme.colors.primary}18`} 45%,
      transparent 100%
    );
    transform: skewX(-18deg);
    opacity: 0;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => `${theme.colors.primary}80`};
    background: ${({ theme }) => `${theme.colors.primary}16`};
    box-shadow: 0 0 26px ${({ theme }) => `${theme.colors.primary}16`};
  }

  &:hover::after {
    opacity: 1;
    left: 120%;
    transition: left 0.55s ease, opacity 0.2s ease;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    text-align: center;
  }
`;

const CopiedPill = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => `${theme.colors.accent}80`};
  background: ${({ theme }) => `${theme.colors.accent}1f`};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.8rem;
  font-weight: 700;
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}45`};
  background: ${({ theme }) => `${theme.colors.surface}95`};
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => `${theme.colors.primary}80`};
    background: ${({ theme }) => `${theme.colors.primary}20`};
    box-shadow: 0 0 24px ${({ theme }) => `${theme.colors.primary}18`};
  }
`;

const Aside = styled.div`
  display: grid;
  gap: 0.85rem;
  align-content: start;
  justify-items: start;
`;

const BackToTopButton = styled(motion.button)`
  border: 1px solid ${({ theme }) => `${theme.colors.primary}45`};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => `${theme.colors.primary}14`};
    border-color: ${({ theme }) => `${theme.colors.primary}80`};
  }
`;

const BottomRow = styled.div`
  margin-top: 2rem;
  padding-top: 1.2rem;
  border-top: 1px solid ${({ theme }) => `${theme.colors.primary}18`};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Copy = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Footer = () => {
  const email = 'gabrielbaunilia123@gmail.com';
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
    }
  };

  return (
    <FooterSection id="contato">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <FooterGrid>
            <div>
              <Title>Contato</Title>
              <Text>
              Disponível para conversar sobre projetos e oportunidades.
              </Text>
              <ContactRow>
                <EmailButton
                  type="button"
                  onClick={copyEmail}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Copiar e-mail"
                >
                  <FaRegCopy />
                  <span>{email}</span>
                  <AnimatePresence initial={false}>
                    {copied && (
                      <CopiedPill
                        initial={{ opacity: 0, scale: 0.96, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -4 }}
                        transition={{ duration: 0.18 }}
                      >
                        <FaCheck />
                        Copiado
                      </CopiedPill>
                    )}
                  </AnimatePresence>
                </EmailButton>
                <ContactButton
                  href="https://www.linkedin.com/in/gabriel-baunilia-a363a826b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir LinkedIn"
                >
                  <FaLinkedin />
                </ContactButton>
                <ContactButton
                  href="https://github.com/Gabrielb-del"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir GitHub"
                >
                  <FaGithub />
                </ContactButton>
                <ContactButton
                  href="https://instagram.com/_bauniliaxcz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir Instagram"
                >
                  <FaInstagram />
                </ContactButton>
              </ContactRow>
            </div>

            <Aside>
              <BackToTopButton
                type="button"
                onClick={scrollToTop}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Voltar ao topo
              </BackToTopButton>
            </Aside>
          </FooterGrid>

          <BottomRow>
            <Copy>Gabriel Baunilia © 2026</Copy>
          </BottomRow>
        </motion.div>
      </Container>
    </FooterSection>
  );
};

export default Footer;

