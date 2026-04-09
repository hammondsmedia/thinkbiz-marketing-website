import { Redis } from '@upstash/redis'

// Lazy singleton — defers construction until first use so that placeholder
// environment variables (used in CI / local dev without Redis) don't crash
// the module at import time.
let _redis: Redis | null = null

function getRedis(): Redis {
  if (!_redis) {
    _redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  }
  return _redis
}

// Proxy object so call-sites can keep `redis.get(...)` syntax unchanged.
export const redis: Redis = new Proxy({} as Redis, {
  get(_target, prop) {
    return getRedis()[prop as keyof Redis]
  },
})
