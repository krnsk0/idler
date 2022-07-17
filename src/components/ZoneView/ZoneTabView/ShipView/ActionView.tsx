import { observer } from 'mobx-react-lite';
import { Zone } from '../../../../store/zone/zone';
import TechButton from './TechButton/TechButton';
import ActionButton from './ActionButton/ActionButton';
import { styles } from './ActionView.styles';

interface ActionViewProps {
  zone: Zone;
}

function ActionView({ zone }: ActionViewProps) {
  return (
    <div css={styles.shipContainer}>
      <div css={styles.shipColumn}>
        {zone.actions.unlockedAsArray.map((action) => {
          return <ActionButton action={action} key={action.name} />;
        })}
      </div>
      <div css={styles.shipColumn}>
        <TechButton />
      </div>
    </div>
  );
}

export default observer(ActionView);
