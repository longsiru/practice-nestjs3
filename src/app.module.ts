//一个module可以在多个module里面使用。
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { typeORMConfig } from './configs/tyoeorm.configs';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardModule], //typeORMConfig和AppModule链接。
})
export class AppModule {}
