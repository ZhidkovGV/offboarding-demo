import { effect, Signal } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

type GenericSortingDataAcessor<T, D = string> = (
  arg1: T,
  arg2: D,
) => string | number;
type MatSortingDataAcessor<T> = GenericSortingDataAcessor<T, string>;

export const createReactiveDataSource = <T>(
  dataSource: Signal<T[]>,
): MatTableDataSource<T> => {
  const matTableDataSource = new MatTableDataSource<T>([]);
  effect(() => {
    matTableDataSource.data = dataSource();
  });

  return matTableDataSource;
};

export const applySorting = <T>(
  sort: Signal<MatSort | undefined>,
  sortAcessor?: MatSortingDataAcessor<T>,
) => {
  return (source: MatTableDataSource<T>) => {
    effect(() => {
      const matSortRef = sort();
      if (matSortRef) {
        source.sort = matSortRef;
        if (sortAcessor) {
          source.sortingDataAccessor = sortAcessor as MatSortingDataAcessor<T>;
        }
      }
    });

    return source;
  };
};

export const applyPaginator = <T>(
  paginator: Signal<MatPaginator | undefined>,
) => {
  return (source: MatTableDataSource<T>) => {
    effect(() => {
      const matPaginatorRef = paginator();
      if (matPaginatorRef) {
        source.paginator = matPaginatorRef;
      }
    });

    return source;
  };
};

export type TablePredicate<T, D = string> = (data: T, filter: D) => boolean;

export const applyFilter = <T, D extends string>(
  filter: Signal<D | undefined>,
  predicate?: TablePredicate<T, D>,
) => {
  return (source: MatTableDataSource<T>) => {
    effect(() => {
      const filterValue = filter();
      if (filterValue) {
        if (predicate) {
          source.filterPredicate = predicate as (
            data: T,
            filter: string,
          ) => boolean;
        }

        source.filter = filterValue;
      }
    });
    return source;
  };
};
