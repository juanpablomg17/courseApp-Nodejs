import { PrimaryGeneratedColumn, Column, Entity} from 'typeorm'

@Entity(
    'users'
)
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    fullname: string;

    @Column({type: 'varchar', length: 255, unique: true})
    email: string;
}