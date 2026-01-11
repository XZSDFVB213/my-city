import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TableContext {
  restaurantId: string;
  tableId: string;
}

@Injectable({ providedIn: 'root' })
export class TableService {
  private tableSubject = new BehaviorSubject<TableContext | null>(null);
  table$ = this.tableSubject.asObservable();
  private KEY = 'table_context';

  setTable(ctx: TableContext) {
    localStorage.setItem(this.KEY, JSON.stringify(ctx));
  }

  getTable(): TableContext | null {
    const raw = localStorage.getItem(this.KEY);
    this.tableSubject.next(raw ? JSON.parse(raw) : null);
    return raw ? JSON.parse(raw) : null;
  }

  clear() {
    localStorage.removeItem(this.KEY);
  }

  isDineIn(restaurantId: string): boolean {
    const ctx = this.getTable();
    return !!ctx && ctx.restaurantId === restaurantId;
  }
}
