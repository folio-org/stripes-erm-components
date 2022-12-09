export const MOD_SETTINGS_ENDPOINT = 'configurations/entries';

export const AGREEMENTS_ENDPOINT = 'erm/sas';
export const AGREEMENT_ENDPOINT = (id) => `${AGREEMENTS_ENDPOINT}/${id}`;
export const MOD_AGREEMENTS_REFDATA = 'erm/refdata';

export const INTERFACES_ENDPOINT = 'organizations-storage/interfaces';
export const INTERFACE_CREDENTIALS_ENDPOINT = (id) => `${INTERFACES_ENDPOINT}/${id}/credentials`;
