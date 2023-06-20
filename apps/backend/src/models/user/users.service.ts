import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { comparePwd, hashPwd } from "src/helper/bcrypt";
import { AbstractService } from "src/models/abstract/abstract.service";
import { Repository } from "typeorm";
import { UserDto } from "./dtos/user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService extends AbstractService<User, UserDto> {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>
  ) {
    super(userRepository);

    this.createDefaultUser();
  }

  async validateUser(identifier: string, password: string) {
    const user: User | null = await this.repository.findOneBy({
      identifier: identifier,
    });
    if (!user || !(await comparePwd(password, user.password))) {
      return null;
    }
    return this.entityToDto(user);
  }

  async createDefaultUser() {
    const [_, count] = await this.userRepository.findAndCount();

    if (count === 0) {
      const user = this.userRepository.create({
        identifier: "123",
        password: await hashPwd("123"),
      });
      await this.userRepository.save(user);
    }
  }

  entityToDto(user: User): UserDto {
    const userDto: UserDto = new UserDto();

    userDto.id = user.id;
    userDto.identifier = user.identifier;

    return userDto;
  }

  async findOneByIdentifier(identifier: string) {
    const user: User | null = await this.repository.findOneBy({
      identifier: identifier,
    });
    if (!user) {
      return null;
    }

    return this.entityToDto(user);
  }
}
