import { IsEmail } from "class-validator";
import { ObjectType, Field } from "type-graphql";
import { ID } from "type-graphql/dist/scalars/aliases";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column("text", { unique: true })
  @IsEmail()
  email: string;

  @Field()
  @Column()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;
}
