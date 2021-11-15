import { Injectable, NgZone } from "@angular/core";

const noop = () => {};

@Injectable({
  providedIn: "root",
})
export class ZoneAwareProxyService {
  private static log(msg, params: any[] = []): void {
    // console.log.apply(console, [`%c[ZoneAwareProxyService]: ${msg}`, 'color: #b0b0b0b0;'].concat(params));
  }

  constructor(private ngZone: NgZone) {}

  public run(fn, fnName, ...params: any[]): Promise<any> {
    const asyncResult = this.wrapAllCallbacksToRunInsideNgZone(
      fn,
      fnName,
      params
    );
    ZoneAwareProxyService.log(`running ${fnName} outside angular zone`, params);
    this.ngZone.runOutsideAngular(() => fn.apply(null, params));
    return asyncResult;
  }

  // wrapping all function to run inside angular zone when invoked
  private wrapAllCallbacksToRunInsideNgZone(
    fn: any,
    fnName: any,
    params: any[]
  ): Promise<any> {
    let mainPromise = null;

    params.forEach((param) => {
      // in case the param is a function -
      // we'll treat it as the callback function and resolve the promise when the function is invoked.
      if (typeof param === "function") {
        mainPromise = new Promise((resolve) => {
          param = this.wrapSingleCallbackToRunInsideNgZone(
            fnName,
            param,
            resolve
          );
        });
      }

      if (typeof param === "object") {
        Object.keys(param).forEach((key) => {
          if (typeof param[key] === "function") {
            // any other functions are still needs to run inside angular zone when invoked thus wrapping them
            const promise = new Promise((resolve) => {
              param[key] = this.wrapSingleCallbackToRunInsideNgZone(
                fnName,
                param[key],
                resolve,
                key
              );
            });

            // in case we have a 'callback' property -
            // we'll treat it as the callback function and resolve the promise when the callback is invoked.
            if (key === "callback") {
              mainPromise = promise;
            }
          }
        });
      }
    });

    // in case we didn't found any 'callback' functions -
    // we'll make our own callback function and resolve the promise when the callback is invoked.
    if (!mainPromise) {
      params.forEach((param) => {
        if (typeof param === "object") {
          mainPromise = new Promise((resolve) => {
            param.callback = this.wrapSingleCallbackToRunInsideNgZone(
              fnName,
              noop,
              resolve
            );
          });
        }
      });
    }

    return mainPromise;
  }

  private wrapSingleCallbackToRunInsideNgZone(
    fnName,
    callbackFunc,
    resolve,
    callbackName?
  ): (...args: any[]) => void {
    if (!callbackName) {
      callbackName = callbackFunc.name || "anonymous";
    }

    ZoneAwareProxyService.log(
      `wrapping ${fnName}'s callback "${callbackName}" to run inside angular zone`
    );

    return (...args: any[]) => {
      ZoneAwareProxyService.log(
        `running ${fnName}'s callback "${callbackName}" inside angular zone`,
        args
      );
      this.ngZone.run(callbackFunc, null, args);
      resolve.apply(null, args);
    };
  }
}
