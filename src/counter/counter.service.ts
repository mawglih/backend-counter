import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Counter } from './counter.entity';

@Injectable()
export class CounterService {
  constructor(@InjectRepository(Counter) private repo: Repository<Counter>) {
    this.repo = repo;
  }
  create() {
    const counter = this.repo.create();
    counter.value = 0;
    return this.repo.save(counter);
  }
  findOne(id: number) {
    console.log('service id', id);
    return this.repo.findOne(id);
  }
  async increment(id: number, value: number) {
    const counter = await this.findOne(id);
    if (!counter) {
      this.create();
    }
    counter.value += value;
    return this.repo.save(counter);
  }
  async resetCounter(id: number) {
    const counter = await this.findOne(id);
    if (!counter) {
      throw new NotFoundException('counter tew tew');
    }
    counter.value = 0;
    return this.repo.save(counter);
  }
  find() {
    return this.repo.find();
  }
}
