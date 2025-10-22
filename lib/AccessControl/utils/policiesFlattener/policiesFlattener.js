const policiesFlattener = (inputPolicies) => {
  const policies = inputPolicies.flatMap(inputPol => inputPol.policies.map(policy => ({ policy, type: inputPol.type })));
  return policies.filter((policy, index, self) => index === self.findIndex(p => p.policy.id === policy.policy.id && p.type === policy.type));
};

export default policiesFlattener;
