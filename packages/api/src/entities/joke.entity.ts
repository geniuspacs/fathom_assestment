import { Joke } from "@joke_geniuspacs/lib";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'jokes'})
export default class JokeEntity implements Joke {
    @PrimaryColumn()
    id!: number;

    @Column()
    type!: string;

    @Column()
    setup!: string;

    @Column()
    punchline!: string;
}