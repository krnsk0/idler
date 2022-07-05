import { observer } from 'mobx-react-lite';
import { Zone } from '../../../../store/zone/zone';
import ActionButton from './ActionButton/ActionButton';
import { styles } from './ShipView.styles';

interface ShipViewProps {
  zone: Zone;
}

function ShipView({ zone }: ShipViewProps) {
  return (
    <div css={styles.shipsContainer}>
      {zone.actions.asArray.map((action) => {
        return <ActionButton action={action} key={action.name} />;
      })}
    </div>
  );
}

export default observer(ShipView);
