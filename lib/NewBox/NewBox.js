import { FormattedMessage } from 'react-intl';
import InfoBox from '../InfoBox';

const NewBox = () => (
  <InfoBox
    type="success"
  >
    <FormattedMessage id="stripes-erm-components.new" />
  </InfoBox>
);

export default NewBox;
