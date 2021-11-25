import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ReclamoService } from '../../../services/reclamo.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ReclamosModalComponent } from '../reclamos-modal/reclamos-modal.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit, AfterViewInit {
  search: any = '';
  dataSource = new MatTableDataSource<any>();
  resultsLength = 0;
  displayedColumns = [
    'id',
    'cuit',
    'razon_social',
    'an8',
    'email',
    'origen_id',
    'fecha_reclamo',
    'estado_id',
    'acciones',
  ];
  formGroup = this.formBuilder.group({ stringSearch: '' });

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild('sort1', { static: true })
  sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private reclamoService: ReclamoService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => {
    //   // this.paginator.pageIndex = 0;
    //   this.loadTableData();
    // });

    // this.paginator?.page.subscribe(() => {
    //   this.loadTableData();
    // });
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadTableData();
  }

  /**
   * Buscador...
   */
   onSearch(): void {
    const { stringSearch } = this.formGroup.value;
    this.search = stringSearch;
    console.log("onSearch: ", this.search);
    
    this.loadTableData();
  }

  /**
   * Se presionó Enter dentro del input de busqueda
   */
   onKeyUp(key: any) {
    if (key.keyCode == 13) {
      const { stringSearch } = this.formGroup.value;

      if (stringSearch === null || stringSearch.length === 0) {
        this.loadTableData();
      }

      this.onSearch();
    }
  }

  /**
   * 
   */
  loadTableData() {
    this.reclamoService
      .list(this.paginator, this.sort, this.search)
      .subscribe((r: any) => {
        this.dataSource.data = r;
        console.log('loadTableData', r);
      });
  }

  /**
   * 
   * @param reclamoId 
   */
  reclamoShow(reclamoId: any) {
    const dialogRef = this.dialog.open(ReclamosModalComponent, {
      width: '600px',
      data: { reclamoId },
    });
  }

  /**
   *
   */
  reclamoResponse(reclamoId: number) {
    this.router.navigate([`/response/${reclamoId}`]);
  }
}
