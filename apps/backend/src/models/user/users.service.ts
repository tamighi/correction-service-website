import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { comparePwd, hashPwd } from "src/helper";
import { AbstractService } from "../core";

import { UserDto } from "./dtos/user.dto";
import { User } from "./entities/user.entity";
import { AppConfigService } from "src/config/app/config.service";

@Injectable()
export class UsersService extends AbstractService<User, UserDto> {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
    protected readonly appConfigService: AppConfigService
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
    const count = await this.userRepository.count();

    if (count === 0) {
      const user = this.userRepository.create({
        identifier: this.appConfigService.default_user_id,
        password: await hashPwd(this.appConfigService.default_user_pwd as string),
      });
      await this.userRepository.save(user);
    }
  }

  entityToDto(user: User): UserDto {
    const userDto: UserDto = new UserDto();

    userDto.id = user.id;
    userDto.identifier = user.identifier;
    userDto.lastModified = user.lastModified

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

  async changePassword(id: number, newPassword: string) {
    const hashedPwd = await hashPwd(newPassword)

    const lastModified = new Date();

    lastModified.setMilliseconds(0);

    await this.userRepository.update(id, {
      password: hashedPwd,
      lastModified
    });
  }
}
