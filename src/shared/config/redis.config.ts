import { Redis } from 'ioredis';

export const redisClient = new Redis({
    host: 'http://localhost:6379',
    port: parseInt('http://localhost:6379'),
  });