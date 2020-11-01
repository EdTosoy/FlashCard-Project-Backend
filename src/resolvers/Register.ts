import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcrypt";
import { User } from "../entity/User";

@Resolver()
export class Register {
  @Authorized()
  @Query(() => String)
  async hello() {
    return "helllow po";
  }
  @Mutation(() => User)
  async register(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });

    return user;
  }
}
