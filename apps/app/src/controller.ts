import { Disposable } from './disposable';

export abstract class Controller implements Disposable {
  public abstract initialize(renderCount: number): void;
  public abstract dispose(renderCount: number): void;
}
