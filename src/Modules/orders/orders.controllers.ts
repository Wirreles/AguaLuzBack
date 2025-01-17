import { AuthGuard } from 'src/guards/AuthGuard';
import { OrdersService } from './orders.service';
import {
  Controller,
  Get,
  Post,
  HttpCode,
  UseGuards,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrderDto } from '../../dto/orders.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(200)
  @Get(':id')
  getOrders(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrders(id);
  }

  @HttpCode(201)
  @Post()
  addOrders(@Body() order: OrderDto) {
    return this.ordersService.addOrders(order);
  }

}
