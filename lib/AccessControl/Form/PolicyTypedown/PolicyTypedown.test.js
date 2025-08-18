import { useState } from 'react';

// import { screen } from '@folio/jest-config-stripes/testing-library/react';

import { mockTypedownGetter, renderWithIntl } from '@folio/stripes-erm-testing';
import { PolicyTypedown } from './index';
import { translationsProperties } from '../../../../test/jest/helpers';
import { flattenedPolicies } from '../../../../test/jest/resources';

const POLICY_TYPEDOWN_ID = 'policy-typedown-test';
const POLICY_TYPEDOWN_LABEL = `Typedown-${POLICY_TYPEDOWN_ID}`;


// Always render with the policies options flattened from useClaimPolicies for now
// Set it up so it acts like its in a Form
const TestComponent = () => {
  // For this test we want to use it like its a form component
  const [selectedPolicy, setSelectedPolicy] = useState();

  // console.log("FP: %o", flattenedPolicies);

  return (
    <PolicyTypedown
      id={POLICY_TYPEDOWN_ID}
      input={{
        name: 'myField',
        onChange: (val) => setSelectedPolicy(val),
        value: selectedPolicy
      }}
      policies={[...flattenedPolicies, { type: 'made-up-type', policy: { id: 'made-up-id' } }]}
    />
  );
};


jest.mock('@k-int/stripes-kint-components', () => {
  const { mockKintComponents } = jest.requireActual('@folio/stripes-erm-testing');
  const KintComps = jest.requireActual('@k-int/stripes-kint-components');

  const MockTypedown = ({ dataOptions, ...props } = {}) => {
    return mockTypedownGetter(dataOptions, true)(props);
  };

  return ({
    ...KintComps,
    ...mockKintComponents,
    Typedown: MockTypedown
  });
});

jest.mock('./PolicyRenderComponents', () => {
  return ({
    AcquisitionUnitPolicy: jest.fn(({ policy: { policy: { name } = {} } = {} }) => (
      <>
        <div>AcquisitionUnitPolicy</div>
        <div>POLICY NAME: {name}</div>
      </>
    ))
  });
});

let renderComponent;
describe('PolicyTypedown', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(<TestComponent />, translationsProperties);
  });

  test('renders Typedown', () => {
    const { getByText } = renderComponent;

    expect(getByText(POLICY_TYPEDOWN_LABEL)).toBeInTheDocument();
  });

  test('renders correct number of policy options', () => {
    const { getAllByText } = renderComponent;
    // The claimPolicies AND the special type one
    expect(getAllByText('AcquisitionUnitPolicy')).toHaveLength(flattenedPolicies.length);
  });

  test.each(flattenedPolicies.map(cp => cp.policy.name))('%s option renders', (policyName) => {
    const { getByText } = renderComponent;
    expect(getByText(`POLICY NAME: ${policyName}`)).toBeInTheDocument();
  });

  // And the special made up option
  test('made up type option renders', () => {
    const { getByText } = renderComponent;
    expect(getByText('made-up-type · made-up-id')).toBeInTheDocument();
  });
});
