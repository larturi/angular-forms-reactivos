import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReturnStatement } from '@angular/compiler';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html'})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Leandro',
    apellido: 'Arturi',
    correo: 'lea.arturi@gmail.com',
    pais: 'ARG',
    genero: 'M'
  };

  paises: any[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
          .subscribe( paises => {
             this.paises = paises;

             this.paises.unshift({
            nombre: '[Seleccione pais]',
            codigo: ''
          });

        });
  }

  guardar(form: NgForm) {

    if (form.invalid) {

      Object.values(form.controls).forEach( control => {
        control.markAsTouched();
      });

      return;
    }

    console.log(form.value);
  }

}
