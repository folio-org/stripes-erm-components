import { Tags as KintTags } from '@k-int/stripes-kint-components';

// Consider whether it's worth this just for the translations to be centralised
const Tags = (tagsProps) => {
  return <KintTags {...tagsProps} intlKey="stripes-erm-components" />;
};

export default Tags;
