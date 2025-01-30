import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrm from './config/database.confing'
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { SeederModule } from './Modules/seeder/seeder.module';
import { RealtimeGateway } from './realtime/realtime.gateway';
import { ClientesModule } from './Modules/clients/clients.module';
import { ZonasModule } from './Modules/zones/zonas.module';
import { RepartidoresModule } from './Modules/repartidores/repartidores.module';
import { RealtimeModule } from './realtime/realtime.module';

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
    AuthModule, ZonasModule, 
    RepartidoresModule, RealtimeModule, 
    SeederModule, ClientesModule,
    JwtModule.register({
      global:true,
      signOptions:{expiresIn: '1h'},
      secret: process.env.JWT_SECRET,
    })
  ],
  controllers: [AppController],
  providers: [AppService, 
    RealtimeGateway 
  ],
})
export class AppModule {}
