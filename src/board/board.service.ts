import { title } from 'process';
import { CreateBoardDto } from './dto/creacte-board.dto';
import { Board, BoardStatus } from './board.model';
import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid'; //uuid：npm install uuid --save。。v1是uuid的版本，我们用uuid这个名字来呼出。

@Injectable()
export class BoardService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards; //return 값 영러개 있으니까, type도 array으로 구성 해야한다.
  }

  // createBoard(title: string, description: string) {
  //   const board: Board = {
  //     //postman로 시행했다.
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board); //我们做了这个board，要用push把这个数据放到我们的boards数组中。
  //   return board; //return를 해서 board어떤한 title,description사용한 게시물이 만들어는지 이정보를 return해줘.
  // }

  createBoard(createBoardDto: CreateBoardDto) {
    //const title = createBoardDto.title;
    const { title, description } = createBoardDto;

    const board: Board = {
      //postman로 시행했다.
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board); //我们做了这个board，要用push把这个数据放到我们的boards数组中。
    return board; //return를 해서 board어떤한 title,description사용한 게시물이 만들어는지 이정보를 return해줘.
  }
}
