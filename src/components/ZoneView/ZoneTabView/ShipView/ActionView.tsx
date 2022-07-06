import { observer } from 'mobx-react-lite';
import { Zone } from '../../../../store/zone/zone';
import ActionButton from './ActionButton/ActionButton';
import { styles } from './ActionView.styles';
import TechButton from './TechButton/TechButton';

interface ActionViewProps {
  zone: Zone;
}

function ActionView({ zone }: ActionViewProps) {
  return (
    <div css={styles.shipsContainer}>
      {zone.actions.unlockedAsArray.map((action) => {
        return <ActionButton action={action} key={action.name} />;
      })}
      <TechButton />
    </div>
  );
}

export default observer(ActionView);
