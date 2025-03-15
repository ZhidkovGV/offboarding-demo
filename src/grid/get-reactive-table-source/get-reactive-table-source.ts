import { effect, Signal } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

type GenericSortingDataAcessor<T, D> = (arg1: T, arg2: D) => string | number;
type MatSortingDataAcessor<T> = GenericSortingDataAcessor<T, string>;

/**
 * returns {@link MatTableDataSource} configured to reactivley consume data from provided signal source
 */
export const getReactiveTableSource = <T, D>({
  paginator,
  sort,
  dataSource,
  sortAcessor,
}: {
  paginator?: Signal<MatPaginator | undefined>;
  sort?: Signal<MatSort | undefined>;
  sortAcessor: GenericSortingDataAcessor<T, D>;
  dataSource: Signal<T[]>;
}): MatTableDataSource<T> => {
  const matTableDataSource = new MatTableDataSource<T>([]);

  if (paginator) {
    effect(() => {
      const matPaginatorRef = paginator();
      if (matPaginatorRef) {
        matTableDataSource.paginator = matPaginatorRef;
      }
    });
  }
  if (sort) {
    effect(() => {
      const matSortRef = sort();
      if (matSortRef) {
        matTableDataSource.sort = matSortRef;
        if (sortAcessor) {
          matTableDataSource.sortingDataAccessor =
            sortAcessor as MatSortingDataAcessor<T>;
        }
      }
    });
  }

  effect(() => {
    matTableDataSource.data = dataSource();
  });

  return matTableDataSource;
};


