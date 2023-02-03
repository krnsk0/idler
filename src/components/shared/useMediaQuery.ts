import { useWindowSize } from 'rooks';
import { breakpoints } from '../../globalStyles';

export const useMediaQuery = () => {
  const { innerWidth } = useWindowSize();

  return {
    isMobile: (innerWidth ?? 0) < breakpoints.tablet,
    isTablet: (innerWidth ?? 0) >= breakpoints.tablet,
    isDesktop: (innerWidth ?? 0) >= breakpoints.desktop,
  };
};
