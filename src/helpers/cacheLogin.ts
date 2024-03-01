import { MemoryCache } from 'memory-cache-node';

const itemsExpirationCheckIntervalInSecs = 10 * 60;
const maxItemCount = 1000000;
export const memoryCache =
    new MemoryCache(itemsExpirationCheckIntervalInSecs, maxItemCount);
