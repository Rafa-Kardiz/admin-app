import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { input } from '@angular/core';
import { tableModel } from '@models/tablemodel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TooltipModule } from 'primeng/tooltip';
import { output } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [TableModule, ButtonModule, IconFieldModule, InputIconModule, FloatLabelModule, TooltipModule],
  templateUrl: './table.html'
})
export class TableComponent implements OnInit {
  columns = input.required<tableModel[]>();
  data = input.required<any[]>();
  globalFilter: string[] = [];
  editAction = output<number>();
  deleteAction = output<number>();
  uniqueIdColumn = input.required<string>();

  ngOnInit(): void {
    const columnsList = this.columns();
    columnsList.forEach(colum => {
      this.globalFilter.push(colum.key)
    })
  }

  editData(id: number) {
    this.editAction.emit(id);
  }

  deleteData(id: number) {
    this.deleteAction.emit(id);
  }

}
