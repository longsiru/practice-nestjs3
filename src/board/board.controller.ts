import { Board } from './../../dist/board/board.model.d';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { title } from 'process';
import { CreateBoardDto } from './dto/creacte-board.dto';

@Controller('boards')
export class BoardController {
  //bordService를 boardController에서 이용할 수 있게 해주기 (Dependency injection),typescript에 type로 구성
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

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  //id로 게시물을 가져오기
  //localhost:5000?id=osidos&title=ewewe,这时有两个param，想把这两个一次性拿到的时候，
  //@Param() param:string
  //特定的话：@Param('id') id: string
  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardService.getBoardById(id);
  }

  //id로 해당 게시물을 지우기.
  @Delete('/:id')
  deleteBoardById(@Param('id') id: string): void {
    this.boardService.deleteBoardById(id);
  }
}
