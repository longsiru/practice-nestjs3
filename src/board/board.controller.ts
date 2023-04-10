import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/creacte-board.dto';
import { Board, BoardStatus } from './board.model';

@Controller('boards')
export class BoardController {
  //1.bordService를 boardController에서 이용할 수 있게 해주기 (Dependency injection),typescript에 type로 구성
  //private 사용하는 이유는 파라미터에서 암목족으로 프로퍼티로 바뀌게 되어서 앞으로 퍼티로선언되어서 바로 이 클레스안에서 this를 이용할 수 있다.
  constructor(private boardService: BoardService) {}
  @Get('/')
  getAllBoard(): Board[] {
    //array
    return this.boardService.getAllBoards();
  }

  // @Post()
  // createBoard(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Board {
  //   return this.boardService.createBoard(title, description);
  // }
  //2.create board
  @Post()
  //6.pipe를 이용해서 유효성 체크-> npm install class-validator class-transformer --save
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  //3.id로 게시물을 가져오기
  //localhost:5000?id=osidos&title=ewewe,这时有两个param，想把这两个一次性拿到的时候，
  //@Param() param:string
  //特定的话：@Param('id') id: string
  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardService.getBoardById(id);
  }

  //4.id로 해당 게시물을 지우기.
  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    this.boardService.deleteBoardById(id);
  }
  //5.특정 게시물의 상테 업데이트
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') staus: BoardStatus,
  ) {
    return this.boardService.updateBoardStatus(id, staus);
  }

  //6.pipe를 이용해서 유효성 체크-> npm install class-validator class-transformer --save
}
