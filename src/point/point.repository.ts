import { EntityRepository, Repository } from 'typeorm';
import { Point } from './point.entity';

@EntityRepository(Point)
export class PointRepository extends Repository<Point> {}
