import { inject } from "@angular/core";
import { CanActivateFn, RedirectCommand, Router } from "@angular/router";
import { OffboardingProcessService } from "../offboarding-service";
import { map, catchError, of } from "rxjs";

export const offboardingProcessExistsGuard: CanActivateFn = ({ paramMap }) => {
  const id = paramMap.get("id")!;
  const offboaridngService = inject(OffboardingProcessService);
  const notFoundPath = inject(Router).parseUrl("/404");

  return offboaridngService.get(id).pipe(
    map(() => true),
    catchError(() => of(new RedirectCommand(notFoundPath))),
  );
};
