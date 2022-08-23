import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { AGREEMENT_ENDPOINT } from '../endpoints';

const useAgreement = ({
  afterQueryCall = () => null,
  agreementId,
  catchQueryCall = () => null,
  queryOptions
}) => {
  const ky = useOkapiKy();
  const agreementPath = AGREEMENT_ENDPOINT(agreementId);

  const {
    data: agreement = {
      contacts: [],
      orgs: []
    },
    isLoading: isAgreementLoading,
    ...rest
  } = useQuery(
    ['ERM', 'Agreement', agreementId, agreementPath], // This pattern may need to be expanded to other fetches in Nolana
    () => ky.get(agreementPath).json()
      .then((res) => {
        afterQueryCall(res);

        return res;
      })
      .catch(catchQueryCall),
    queryOptions
  );

  return ({
    agreement,
    isAgreementLoading,
    ...rest
  });
};

export default useAgreement;
