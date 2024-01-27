import { Disposable } from './disposable';

export abstract class Controller implements Disposable {
  public abstract initialize(renderCount: number): void;
  public abstract load(renderCount: number): void;
  public abstract disposeInitialization(renderCount: number): void;
  public abstract disposeLoad(renderCount: number): void;
}
