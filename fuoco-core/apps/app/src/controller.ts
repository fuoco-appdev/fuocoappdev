import {Disposable} from './disposable';

export abstract class Controller implements Disposable {
    public abstract initialize(): void;
    public abstract dispose(): void;
}