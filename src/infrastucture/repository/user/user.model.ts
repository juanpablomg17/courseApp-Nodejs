import { Column, Entity, PrimaryColumn} from 'typeorm'

@Entity(
    'users'
)
export class Users {
    @PrimaryColumn({unique: true, generated: 'uuid'})
    id: string;

    @Column({type: 'varchar', length: 255})
    fullname: string;

    @Column({type: 'varchar', length: 255, unique: true})
    email: string;
}