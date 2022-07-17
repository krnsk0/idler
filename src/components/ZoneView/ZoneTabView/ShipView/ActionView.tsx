import { observer } from 'mobx-react-lite';
import { Zone } from '../../../../store/zone/zone';
import TechButton from './TechButton/TechButton';
import ActionButton from './ActionButton/ActionButton';
import { styles } from './ActionView.styles';
import { ActionNames } from '../../../../store/zone/actions/actionNames';
import { Divider } from '../../../shared/Divider/Divider';

interface ActionViewProps {
  zone: Zone;
}

function ActionView({ zone }: ActionViewProps) {
  return (
    <>
      <div css={styles.shipOuter}>
        <Divider text={'ship'} width={374} />
        <div css={styles.shipContainer}>
          <div css={styles.shipColumn}>
            <ActionButton action={zone.actions[ActionNames.HARVEST]} />
            <ActionButton action={zone.actions[ActionNames.GENERATE]} />
            <ActionButton action={zone.actions[ActionNames.THAW]} />
          </div>
          <div css={styles.shipColumn}>
            <TechButton />
            <ActionButton action={zone.actions[ActionNames.COMPRESS]} />
          </div>
        </div>
      </div>
      <div css={styles.shipOuter}>
        <Divider text={'colony'} width={374} />
        <div css={styles.shipContainer}>
          <div css={styles.shipColumn}>
            <ActionButton action={zone.actions[ActionNames.HARVEST]} />
            <ActionButton action={zone.actions[ActionNames.GENERATE]} />
            <ActionButton action={zone.actions[ActionNames.THAW]} />
          </div>
          <div css={styles.shipColumn}>
            <TechButton />
            <ActionButton action={zone.actions[ActionNames.COMPRESS]} />
          </div>
        </div>
      </div>
    </>
  );
}

export default observer(ActionView);
