import { observer } from 'mobx-react-lite';
import { Zone } from '../../../store/zone/zone';

interface BuildingViewProps {
  zone: Zone;
}

function BuildingView({ zone }: BuildingViewProps) {
  return (
    <div>
      {zone.buildings.asArray.map((building) => {
        return <div key={building.$modelType}></div>;
      })}
    </div>
  );
}

export default observer(BuildingView);
