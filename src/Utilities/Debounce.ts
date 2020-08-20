export class DebounceSubscription<T extends Function> {
  call: T;
  frameHandle: number | null = null;

  constructor(call: T) {
    this.call = call;
  }

  cancel = () => {
    if (this.frameHandle !== null) {
      window.cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  };

  run = (...args: any[]) => {
    this.cancel();
    this.frameHandle = window.requestAnimationFrame(() => {
      this.call.apply(this, args);
    });
  };
}

export function debounce<T extends Function>(call: T): DebounceSubscription<T> {
  return new DebounceSubscription(call);
};
