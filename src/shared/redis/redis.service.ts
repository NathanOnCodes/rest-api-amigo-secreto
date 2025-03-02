import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService{
    private client: Redis
    constructor(){
        this.client = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT) || 6379,
        });
    }
    async savePair(userId: string, pares: any[], ttlSegundos = 2592000){
        await this.client.setex(`sorteio:${userId}`, ttlSegundos, JSON.stringify(pares));
    }

    async findPair(userId: string){
        const result = await this.client.get(`sorteio:${userId}`);
        return result ? JSON.parse(result) : null;
    }
}