import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserLocationAccess } from "../../../database/entities/tenant-layer/user-location-access.entity";

@Injectable()
export class UserLocationAccessRepository {
  constructor(
    @InjectRepository(UserLocationAccess)
    private readonly repo: Repository<UserLocationAccess>
  ) {}

  create(data: Partial<UserLocationAccess>) {
    return this.repo.create(data);
  }

  saveMany(accessRows: UserLocationAccess[]) {
    return this.repo.save(accessRows);
  }

  findActiveLocationIdsByUser(userId: string) {
    return this.repo.find({
      where: {
        user: { id: userId },
        isActive: true,
      },
      relations: {
        location: true,
      },
    });
  }
}