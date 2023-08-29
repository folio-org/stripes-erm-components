export const NEXT = 'next';
export const PREV = 'prev';

// THIS SHOULD BE SET BY CALLING CODE, ONLY DEFAULTED TO AVOID DIVISION BY UNDEFINED
export const DEFAULT_PAGINATION_SIZE = 25;
// Only here because we need argument 3 from onNeedMoreData
// and want to avoid "magic number" sonarlint
export const MCL_NEED_MORE_DATA_PREV_NEXT_ARG_INDEX = 3;
