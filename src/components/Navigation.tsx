import { motion } from 'framer-motion';
import styled from 'styled-components';

const Nav = styled(motion.nav)`
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => `${theme.colors.backgroundLight}80`};
  padding: 15px 10px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 15px;
  }
`;

const NavItem = styled(motion.a)`
  width: 10px;
  height: 10px;
  background: ${({ theme }) => theme.colors.textSecondary};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: scale(1.2);
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary};
    transform: scale(1.2);
  }

  &::before {
    content: attr(data-tooltip);
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    padding: 5px 10px;
    background: ${({ theme }) => theme.colors.backgroundLight};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
    visibility: visible;
    right: 25px;
  }
`;

const Navigation = () => {
  const sections = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'experiencia', label: 'Experiência' },
  ];

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Nav
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {sections.map(({ id, label }) => (
        <NavItem
          key={id}
          data-tooltip={label}
          onClick={() => handleClick(id)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      ))}
    </Nav>
  );
};

export default Navigation; 