import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

export const PlayerSelector = ({ onPlayerSelectorClick }: { onPlayerSelectorClick(): void; }) => {
  return (
    <div className='row'>
      <div className='col-12 text-center'>
        <h1 className='pt-5'>Player Selector</h1>
        <div className='pt-5'>
          <GiPerspectiveDiceSixFacesRandom size={250} onClick={onPlayerSelectorClick} />
        </div>
      </div>
    </div>
  );
};
