//一个module可以在多个module里面使用。
import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';

@Module({
  imports: [BoardModule],
})
export class AppModule {}
