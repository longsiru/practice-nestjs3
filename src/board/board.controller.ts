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
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

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
    @Body('status', BoardStatusValidationPipe) staus: BoardStatus, //在这里我们会改变状态，也要检查我们换的状态是否存在，是否是有效值。。
  ) {
    return this.boardService.updateBoardStatus(id, staus);
  }

  //6.pipe를 이용해서 유효성 체크-> npm install class-validator class-transformer --save
  //7.특정한 게시물을 찾을 때 없는 경우 결과 값 처리
  //8.없는 게시물을 지우려 할 때 결과 값 처리
  //9.커스텀 파이프를(custom pipe) 이용한 유휴성 체크
  //10.postgresSQL 설치하기
  //11.typeorm application에서 이ㅇㅛㅇ하기 -> npm install pg typeorm @nestjs/typeorm --save
  //12.configs--》 tyoeorm config
  //13.entity
}
