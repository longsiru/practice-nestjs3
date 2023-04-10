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

  //id로 해당 게시물을 가져오기.
  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  //id로 해당 게시물을 지우기.
  deleteBoardById(id: string): void {
    //删除就是删除没有return项目。因为什么都不return，所以不是Board而是void.filter()过滤
    this.boards.filter((board) => board.id !== id); //id不同的留下，ID一样的被删除。
  }

  //특정 게시물의 상테 업데이트

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id); //把想要的更新的board的id放到getBoardById里面的话，就能得到想更新的board的所有情报。这些情报放在board里
    board.status = status; //所以board能呼出status，更改它
    return board; //然后返回更新后的board
  }
}
