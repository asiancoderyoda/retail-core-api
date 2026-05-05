import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../../database/entities/tenant-layer/user.entity";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) { }

    create(data: Partial<User>) {
        return this.repo.create(data);
    }

    save(user: User) {
        return this.repo.save(user);
    }

    findByExternalAuthId(externalAuthId: string) {
        return this.repo.findOne({
            where: { externalAuthId },
            relations: {
                organization: true,
            },
        });
    }
}