import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../shared/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../shared/interfaces";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  form: FormGroup;
  product: Product;
  submitted = false;

  constructor(private productServ: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        return this.productServ.getById(params['id'])
      })
    ).subscribe(product => {
      this.product = product;
      this.form = new FormGroup({
        type: new FormControl(product.type, Validators.required),
        title: new FormControl(product.title, Validators.required),
        photo: new FormControl(product.photo, Validators.required),
        info: new FormControl(product.info, Validators.required),
        price: new FormControl(product.price, Validators.required),
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;

    this.productServ.update({
      ...this.product,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    }).subscribe(res => {
      this.submitted = false;
      this.router.navigate(['/admin', 'dashboard'])
    })
  }

}
