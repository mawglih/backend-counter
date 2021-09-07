import { Controller, Post, Get, Patch, Delete, NotFoundException, Param, Body } from '@nestjs/common';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
import { CounterService } from './counter.service';

@Controller('counter')
export class CounterController {
  constructor(private counterService: CounterService) { }
  @Get('/create')
  createCounter() {
    return this.counterService.create();
  }

  @Patch('/:id')
  incrementCounter(@Param('id') id: string) {
    return this.counterService.increment(parseInt(id), 1)
  }

  @Get('/:id')
  async getCounter(@Param('id') id: string) {
    console.log('contr id', id);
    const counter = await this.counterService.findOne(parseInt(id));
    if (!counter) {
      throw new NotFoundException('counter does not exist');
    }
    return counter;
  }

  @Get()
  findAllCounters() {
    return this.counterService.find();
  }

  @Delete('/:id')
  resetCounter(@Param('id') id: string) {
    return this.counterService.resetCounter(parseInt(id));
  }
}
