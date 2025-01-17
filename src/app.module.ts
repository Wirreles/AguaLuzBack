import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './Modules/products/products.module';
import { AuthModule } from './Modules/auth/auth.module';
import { UsersModule } from './Modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrm from './config/database.confing'
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './Modules/categories/categories.module';
import { OrdersModule } from './Modules/orders/orders.module';
import { JwtModule } from '@nestjs/jwt';
import { SeederModule } from './Modules/seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory:(configService: ConfigService)=>
        configService.get('typeorm')
    }),
    ProductsModule, AuthModule, UsersModule, 
    CategoriesModule, OrdersModule, SeederModule,
    JwtModule.register({
      global:true,
      signOptions:{expiresIn: '1h'},
      secret: process.env.JWT_SECRET,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
