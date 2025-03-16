import { UrlSegment } from "@angular/router";

export interface NavOption {
  display: string;
  link: string | UrlSegment[];
}

export type NavOptions = NavOption[]
