import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { Location } from '../tenant-layer/location.entity';
import { Organization } from '../tenant-layer/organization.entity';

@Entity("file_uploads")
export class FileUpload {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Organization)
    organization: Organization;

    @ManyToOne(() => Location)
    location: Location;

    @Column()
    fileType: string;

    @Column()
    storageUrl: string;

    @Column()
    status: string;

    @CreateDateColumn()
    createdAt: Date;
}