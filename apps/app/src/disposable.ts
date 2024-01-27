export interface Disposable {
  disposeInitialization(renderCount: number): void;
}
