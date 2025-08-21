export const ENABLED_ENGINES_QUERY_KEY = ['AccessControl', 'enabledEngines'];


export const CAN_ACCESS_BASE_QUERY_KEY = ['AccessControl', 'canAccess'];
export const CAN_ACCESS_RESTRICTION_BASE_QUERY_KEY = (restriction) => [...CAN_ACCESS_BASE_QUERY_KEY, restriction];
