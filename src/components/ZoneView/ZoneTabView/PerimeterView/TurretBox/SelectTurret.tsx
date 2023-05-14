import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';
import { Zone } from '../../../../../store/zone/zone';
import { useRef } from 'react';
import {
  DesktopTooltipTitle,
  TooltipPortalRenderer,
  TooltipText,
} from '../../../../shared/Tooltip/Tooltip';

function SelectTurret({ zone }: { zone: Zone }) {
  const turretIndex = zone.perimeter.turrets.length;
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <TooltipPortalRenderer containerRef={containerRef}>
        <DesktopTooltipTitle showDivider={true}>
          install new turret
        </DesktopTooltipTitle>
        <TooltipText italic={true} align={'center'}>
          select a new turret to install atop this defensive emplacement
        </TooltipText>
      </TooltipPortalRenderer>
      <div
        css={[styles.turretBox, styles.emptyTurretBox]}
        onClick={() => zone.perimeter.openTurretPurchaseModal(turretIndex)}
        ref={containerRef}
      >
        <div css={styles.plusSign}>+</div>
        <div>install</div>
        <div>turret</div>
      </div>
    </>
  );
}

export default observer(SelectTurret);
