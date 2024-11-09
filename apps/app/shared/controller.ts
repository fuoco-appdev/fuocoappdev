import { Disposable } from './disposable';
import { Model } from './model';

export abstract class Controller implements Disposable {
  public abstract initialize: (renderCount: number) => void;
  public abstract load(renderCount: number): void;
  public abstract disposeInitialization(renderCount: number): void;
  public abstract disposeLoad(renderCount: number): void;
  public abstract get model(): Model;
  public updateSuspense(value: boolean): void {
    if (this.model.suspense !== value) {
      this.model.suspense = value;
    }
  }
}
