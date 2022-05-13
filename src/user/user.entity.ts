import { Block } from 'src/block/block.entity';
import { Comment } from 'src/comment/comment.entity';
import { Follow } from 'src/follow/follow.entity';
import { GroupUser } from 'src/group/group-user.entity';
import { Group } from 'src/group/group.entity';
import { Point } from 'src/point/point.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column('varchar')
  kakaoId: string;

  @Column({ type: 'varchar', default: String(Date.now()) })
  nickname: string;

  @Column({ type: 'varchar', default: null })
  profileImageUrl: string;

  @Column({ type: 'int', default: null })
  careerId: number;

  @Column({ type: 'varchar', default: null })
  year: string;

  @Column({ type: 'text', default: null })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;

  // 사용자 : 점수 = 1 : N
  @OneToMany(() => Point, (point) => point.userId, { cascade: true })
  @JoinColumn({ name: 'point' })
  point: Point[];

  // 사용자 : 팔로잉 = 1 : N
  @OneToMany(() => Follow, (follow) => follow.userId, { cascade: true })
  @JoinColumn({ name: 'following' })
  following: Follow[];

  // 사용자 : 팔로워 = 1 : N
  @OneToMany(() => Follow, (follow) => follow.userId, { cascade: true })
  @JoinColumn({ name: 'follower' })
  follower: Follow[];

  // 사용자 : 차단 = 1 : N
  @OneToMany(() => Block, (block) => block.userId, { cascade: true })
  @JoinColumn({ name: 'blocker' })
  blocker: Block[];

  // 사용자 : 그룹(호스트) = 1 : N
  @OneToMany(() => Group, (group) => group.host, { cascade: true })
  @JoinColumn({ name: 'hostGroups' })
  hostGroups: Group[];

  // 사용자 : 그룹(참여자) = 1 : N
  @OneToMany(() => GroupUser, (groupUser) => groupUser.guest, { cascade: true })
  @JoinColumn({ name: 'guestGroups' })
  guestGroups: Group[];

  // 사용자 : 댓글 = 1 : N
  @OneToMany(() => Comment, (comment) => comment.userId, { cascade: true })
  @JoinColumn({ name: 'guestGroups' })
  comments: Comment[];
}
