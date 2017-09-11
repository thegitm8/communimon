
interface DataCallback {
  (data: any): void;
}

interface CompletesCallback {
  (): void;
}

export class Subject<T> {
  private subscribes: DataCallback[];
  private completes: CompletesCallback[];
  private errors: DataCallback[];

  constructor() {
    this.subscribes = [];
    this.completes = [];
    this.errors = [];
  }
  public complete(): void {
    const cmplts = this.completes;
    this.completes = [];
    cmplts.forEach(cb => cb());
  }
  public next(data: any): void {
    this.subscribes.forEach(cb => cb(data));
  }
  public error(data: any): void {
    const errs = this.errors;
    this.errors = [];
    this.completes = [];
    errs.forEach(cb => cb(data));
  }
  public subscribe(cb: (data: any) => void, error?: (data: any) => void, complete?: () => void): void {
    if (cb) { this.subscribes.push(cb); }
    if (error) { this.errors.push(error); }
    if (complete) { this.completes.push(complete); }
  }
}

export class Observer<T> extends Subject<T> {

}

export class Observable<T> extends Subject<T> {
  public static create<T>(observer: (ob: Observer<T>) => void): Subject<T> {
    const s = new Subject<T>();
    observer(s);
    return s;
  }
}

// const test = Observable.create(observer => {
//   observer.next('Hello world!')
// })
// test.subscribe(data => {
//   assert.equal(data == 'Hello world!')
// })