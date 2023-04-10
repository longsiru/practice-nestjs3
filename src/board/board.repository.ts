import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.model';

//@EntityRepository(Boards)
export class BoardRepository extends Repository<Board> {}
