// declaration.d.ts
/// <reference types="vite/client" />
declare module '*.scss';
declare module '*.json' {
  const value: any;
  export default value;
}
