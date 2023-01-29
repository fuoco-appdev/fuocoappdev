import { createStore, withProps } from "@ngneat/elf";
import { Model } from "../model";

export interface UserState {}

export class UserModel extends Model {
    constructor() {
        super(createStore(
            {name: 'user'},
            withProps<UserState>({}),
        ));
    }
}