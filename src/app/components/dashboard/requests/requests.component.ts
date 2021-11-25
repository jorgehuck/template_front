import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})

export class RequestsComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }  
  
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: 'activado'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: 'activado'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: 'activado'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: 'activado'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: 'activado'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', status: 'activado'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', status: 'activado'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', status: 'activado'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', status: 'activado'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', status: 'activado'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', status: 'activado'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', status: 'activado'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', status: 'activado'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', status: 'activado'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', status: 'activado'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', status: 'activado'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', status: 'activado'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', status: 'activado'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', status: 'activado'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', status: 'activado'},
];