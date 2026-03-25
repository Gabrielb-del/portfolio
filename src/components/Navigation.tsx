import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
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
  background: ${({ theme }) => `${theme.colors.surface}b5`};
  padding: 15px 10px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: 50%;
    top: auto;
    bottom: 16px;
    transform: translateX(50%);
    flex-direction: row;
    gap: 14px;
    padding: 10px 14px;
    border-radius: 999px;
  }
`;

const NavItem = styled(motion.button)<{ $active: boolean }>`
  width: 16px;
  height: 16px;
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
  display: grid;
  place-items: center;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
    transform: ${({ $active }) => ($active ? 'scale(1.1)' : 'scale(1)')};
    transition: all 0.2s ease;
  }

  &:hover {
    transform: scale(1.2);
  }

  &::before {
    content: attr(data-tooltip);
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    padding: 6px 10px;
    background: ${({ theme }) => theme.colors.backgroundLight};
    color: ${({ theme }) => theme.colors.text};
    border-radius: 8px;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 14px;
    height: 14px;

    span {
      width: 7px;
      height: 7px;
    }

    &::before {
      display: none;
    }
  }
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}cc`};
  background: ${({ theme }) => `${theme.colors.primary}24`};
  box-shadow: 0 0 18px ${({ theme }) => `${theme.colors.primary}80`};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 14px;
    height: 14px;
  }
`;

const Navigation = () => {
  const sections = useMemo(() => [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Jornada' },
    { id: 'skills', label: 'Skills' },
    { id: 'projetos', label: 'Projetos' },
  ], []);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    let raf: number | null = null;

    const computeActive = () => {
      const anchorY = window.innerHeight * 0.35;
      let bestId = sections[0]?.id ?? 'inicio';
      let bestDist = Number.POSITIVE_INFINITY;

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - anchorY);

        if (dist < bestDist) {
          bestDist = dist;
          bestId = s.id;
        }
      }

      setActiveSection((current) => (current === bestId ? current : bestId));
    };

    const onScrollOrResize = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        computeActive();
      });
    };

    computeActive();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [sections]);

  const handleClick = (id: string) => {
    setActiveSection(id);
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
          $active={activeSection === id}
          type="button"
          data-tooltip={label}
          aria-label={`Ir para ${label}`}
          onClick={() => handleClick(id)}
          whileTap={{ scale: 0.9 }}
        >
          {activeSection === id && (
            <ActiveIndicator
              layoutId="active-nav-indicator"
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            />
          )}
          <span />
        </NavItem>
      ))}
    </Nav>
  );
};

export default Navigation; 