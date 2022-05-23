import { Block } from 'src/block/block.entity';
import { Comment } from 'src/comment/comment.entity';
import { Follow } from 'src/follow/follow.entity';
import { GroupUser } from 'src/groupuser/groupuser.entity';
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
import { ChatUser } from 'src/chatuser/chatuser.entity';
import { Chat } from 'src/chat/chat.entity';
import { Sticker } from 'src/sticker/sticker.entity';

const now = () => String(Date.now());

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column('varchar')
  kakaoId: string;

  @Column({ type: 'varchar', default: now() })
  nickname: string;

  @Column({ type: 'varchar', default: null })
  profileImageUrl: string;

  @Column({ type: 'int', default: 0 })
  characterImageId: number;

  @Column({ type: 'int', default: 0 })
  backgroundColorId: number;

  @Column({ type: 'int', default: 0 })
  careerId: number;

  @Column({ type: 'int', default: 0 })
  yearId: number;

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
  followingUserIds: Follow[];

  // 사용자 : 팔로워 = 1 : N
  @OneToMany(() => Follow, (follow) => follow.otherId, { cascade: true })
  @JoinColumn({ name: 'follower' })
  followerUserIds: Follow[];

  // 사용자 : 차단 = 1 : N
  @OneToMany(() => Block, (block) => block.userId, { cascade: true })
  @JoinColumn({ name: 'blocker' })
  blockerUserIds: Block[];

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

  // 사용자 : 스티커 = 1 : N
  @OneToMany(() => Sticker, (sticker) => sticker.userId, { cascade: true })
  @JoinColumn({ name: 'stickers' })
  stickers: Sticker[];

  // 사용자 : 채팅방 = 1 : N
  @OneToMany(() => ChatUser, (chatUser) => chatUser.user, { cascade: true })
  @JoinColumn({ name: 'chatRooms' })
  rooms: ChatUser[];

  // 사용자 : 채팅 = 1 : N
  @OneToMany(() => Chat, (chat) => chat.user, { cascade: true })
  @JoinColumn({ name: 'chats' })
  chats: Chat[];
}
