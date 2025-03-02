import { Processor, Process } from '@nestjs/bull'; // <-- Importe do BULL
import { Job } from 'bull';
import { RedisService } from '../redis/redis.service';

@Processor('sorteio') // Nome da fila
export class DrawConsumer {
    constructor(
        private readonly redisService: RedisService
    ) {}
  @Process('processar-sorteio')
  async handleSorteio(job: Job<{ userId: string; participantes: any[] }>) {
    const { userId, participantes } = job.data;
    const pairs = this.shuffle(participantes);
    await this.redisService.savePair(userId, pairs);
  }

  private shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }
}