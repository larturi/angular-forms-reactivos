import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html'})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get calleNoValido() {
    return this.forma.get('direccion.calle').invalid && this.forma.get('direccion.calle').touched;
  }

  get numeroNoValido() {
    return this.forma.get('direccion.numero').invalid && this.forma.get('direccion.numero').touched;
  }

  get localidadNoValido() {
    return this.forma.get('direccion.localidad').invalid && this.forma.get('direccion.localidad').touched;
  }

  get pass1NoValido() {
    return this.forma.get('password1').invalid && this.forma.get('password1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('password1').value;
    const pass2 = this.forma.get('password2').value;

    return (pass1 === pass2) ? false : true;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre   : ['', [Validators.required, Validators.minLength(5)] ],
      apellido : ['', [Validators.required, this.validadores.noMalasPalabras]],
      correo   : ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario  : ['', , this.validadores.existeUsuario],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      direccion: this.fb.group({
          calle    : ['', [Validators.required] ],
          numero   : ['', [Validators.required] ],
          localidad: ['', [Validators.required] ],
      }),
      pasatiempos: this.fb.array([])
    },
    {
      validators: this.validadores.passwordsIguales('password1', 'password2')
    }
    );
  }

  crearListeners() {
    this.forma.valueChanges.subscribe(valor => {
      console.log(valor);
    });
  }

  cargarDataAlFormulario() {
    this.forma.reset({
      nombre: 'Leandro',
      apellido: 'Arturi',
      correo: 'lea@gmail.com',
      password1: '123',
      password2: '123',
      direccion:
        {
            calle: 'False',
            numero: '1234',
            localidad: 'CABA'
        }
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
     console.log(this.forma);

     if (this.forma.invalid) {

        return Object.values(this.forma.controls).forEach( control => {

          if (control instanceof FormGroup) {
            Object.values(control.controls).forEach( controlHijo => controlHijo.markAsTouched());
          } else {
            control.markAsTouched();
          }

        });
     }

     // this.forma.reset();
  }

}
