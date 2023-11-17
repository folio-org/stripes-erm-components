/* This function takes in a map of the resource and corresponding array of actionTypes and returns a false if
   the resource thats executing the refresh needs to be prevented from refreshing

   Eg: Assume you dont want to refresh the agreementLine resource because the agreement containing it has
    been deleted, you could just pass a ```shouldRefresh: preventResourceRefresh({ 'agreement': ['DELETE'] })```
    option to it and that would prevent it from refreshing
   */

const preventResourceRefresh = (resourceActionsMap) => (_, action) => {
  return !Object.entries(resourceActionsMap).some(([resourceName, actionTypes]) => (
    resourceName === action.meta.name &&
    actionTypes.some(actionType => action.meta?.originatingActionType.includes(actionType))) === true);
};

export default preventResourceRefresh;
