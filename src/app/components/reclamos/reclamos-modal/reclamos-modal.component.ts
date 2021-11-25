import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReclamoService} from "../../../services/reclamo.service";

@Component({
  selector: 'app-reclamos-modal',
  templateUrl: './reclamos-modal.component.html',
  styleUrls: ['./reclamos-modal.component.scss']
})
export class ReclamosModalComponent implements OnInit {
  public rd:any = {}
  public respuesta:any = {}

  constructor(
    public reclamoService: ReclamoService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.reclamoGet()
  }

  reclamoGet() {
    this.reclamoService.show(this.data.reclamoId).subscribe((r: any) => {
      console.log(r);
      this.rd = r;
      this.respuesta = r.Respuesta[0];
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
