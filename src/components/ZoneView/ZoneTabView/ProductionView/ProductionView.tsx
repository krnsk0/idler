import { observer } from 'mobx-react-lite';
import { Zone } from '../../../../store/zone/zone';
import ProducerButton from './ProducerButton/ProducerButton';
import { styles } from './ProdutionView.styles';

interface ProductionViewProps {
  zone: Zone;
}

function ProductionView({ zone }: ProductionViewProps) {
  return (
    <div css={styles.producersContainer}>
      {zone.producers.unlockedAsArray.map((building) => {
        return <ProducerButton building={building} key={building.name} />;
      })}
    </div>
  );
}

export default observer(ProductionView);
