import { OutputRef } from "@angular/core";

export type InferOutput<T, K extends keyof T> =
  T[K] extends OutputRef<infer T> ? T : never;
