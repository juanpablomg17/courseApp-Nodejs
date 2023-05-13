import { Column, Entity, PrimaryColumn} from 'typeorm'

@Entity(
    'courses'
)
export class Courses {
    @PrimaryColumn({unique: true, primary: true})
    id: string;

    @Column({type: 'varchar', length: 255, unique: true})
    name: string;
}