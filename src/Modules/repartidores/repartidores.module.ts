import { Module } from '@nestjs/common';
import { RepartidoresController } from './repartidores.controller';
import { RepartidoresService } from './repartidores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Repartidores from '../../entities/repartidores.entity';
import { LoggerMiddleware } from 'src/middlewares/logger';

@Module({
  imports: [TypeOrmModule.forFeature([Repartidores])],
  controllers: [RepartidoresController],
  providers: [RepartidoresService],
  exports: [RepartidoresService],
})
export class RepartidoresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('repartidores');
  }
}
