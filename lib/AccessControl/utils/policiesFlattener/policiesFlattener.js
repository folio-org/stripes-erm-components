import orderBy from 'lodash/orderBy';

const policiesFlattener = (inputPolicies) => {
  const policies = inputPolicies.flatMap(inputPol => inputPol.policies.map(policy => ({ policy, type: inputPol.type })));

  return orderBy(
    policies.filter((policy, index, self) => index === self.findIndex(p => p.policy.id === policy.policy.id && p.type === policy.type)),
    [
      (item) => item.type?.toLowerCase?.() ?? '',
      (item) => item.policy?.name?.toLowerCase?.() ?? '',
    ],
    ['asc', 'asc']
  );
};

export default policiesFlattener;
