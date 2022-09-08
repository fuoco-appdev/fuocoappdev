import {Disposable} from './disposable';

export abstract class Controller implements Disposable {
    public dispose(): void {};
}