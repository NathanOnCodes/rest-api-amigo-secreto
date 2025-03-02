import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('sort') private sorteioQueue: Queue,
  ) {}

  async pushToQueue(data: { userId: string; participants: any[] }) {
    await this.sorteioQueue.add('process-sort', data);
  }
}