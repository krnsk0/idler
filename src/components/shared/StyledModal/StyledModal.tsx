import Modal from 'react-modal';

import { useMediaQuery } from '../../shared/useMediaQuery';
import { useTheme } from '@emotion/react';

const baseContentStyles = {
  border: '1px solid black',
  borderRadius: 0,
  overflow: 'hidden' as const,
  padding: '0em' as const,
  display: 'flex' as const,
  flexDirection: 'column' as const,
};

const mobileModalOuter = {
  ...baseContentStyles,
};

const desktopModalOuter = {
  ...baseContentStyles,
  margin: '2em 20vw' as const,
};

interface StyledModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  extraStyles?: React.CSSProperties;
}

export const StyledModal = ({
  isOpen,
  onRequestClose,
  children,
  extraStyles,
}: StyledModalProps) => {
  const { isDesktop } = useMediaQuery();

  const theme = useTheme();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'none',
          zIndex: 10,
        },
        content: isDesktop
          ? {
              ...desktopModalOuter,
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.primary,
              ...extraStyles,
            }
          : {
              ...mobileModalOuter,
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.primary,
              ...extraStyles,
            },
      }}
    >
      {children}
    </Modal>
  );
};
