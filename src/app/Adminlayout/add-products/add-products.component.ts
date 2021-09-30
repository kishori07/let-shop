import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminUseOnlyService } from '../service/admin-use-only.service';
// import { SpecificationComponent } from '../specification/specification.component';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  imageUrl: any =
    'https://cdn.iconscout.com/icon/free/png-512/upload-mobile-1151295.png';
  file: any;
  productForm: FormGroup;
  generalForm: FormGroup;
  displayForm: FormGroup;
  hardwareForm: FormGroup;
  cameraForm: FormGroup;
  softwareForm: FormGroup;
  connectivityForm: FormGroup;
  sensorsForm: FormGroup;
  errMsg_gf = '';
  errMsg_df = '';
  errMsg_hf = '';
  errMsg_cf = '';
  errMsg_sf = '';
  errMsg_conf = '';
  errMsg_senf = '';
  displaySpecification: boolean = false;
  isCompleted_gf: boolean = false;
  isCompleted_df: boolean = false;
  isCompleted_hf: boolean = false;
  isCompleted_cf: boolean = false;
  isCompleted_sf: boolean = false;
  isCompleted_conf: boolean = false;
  isCompleted_senf: boolean = false;
  Images: any = [];
  checkImage: any = [];
  formData = new FormData();

  public tabIndex = 0;
  errMsg: string;

  constructor(
    private fb: FormBuilder,
    private prodadd: AdminUseOnlyService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.generalForm = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      priceInIndia: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
      formFactor: ['', [Validators.required]],
      dimension: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      batteryCapacity: ['', [Validators.required]],
      fastCharging: ['', [Validators.required]],
      wirelessCharging: ['', [Validators.required]],
      colors: ['', [Validators.required]],
    });
    this.displayForm = this.fb.group({
      screenSize: ['', [Validators.required]],
      touchScreen: ['', [Validators.required]],
      resolution: ['', [Validators.required]],
    });
    this.hardwareForm = this.fb.group({
      processor: ['', [Validators.required]],
      processorMake: ['', [Validators.required]],
      ram: ['', [Validators.required]],
      internalStorage: ['', [Validators.required]],
      expandableStorage: ['', [Validators.required]],
      expandableType: ['', [Validators.required]],
      dedicatedMicroSDslot: ['', [Validators.required]],
    });
    this.cameraForm = this.fb.group({
      rearCamera: ['', [Validators.required]],
      noOfRearCam: ['', [Validators.required]],
      rearAutofocus: ['', [Validators.required]],
      rearFlash: ['', [Validators.required]],
      frontCamera: ['', [Validators.required]],
      npOfFrontCamera: ['', [Validators.required]],
      popUpCamera: ['', [Validators.required]],
    });
    this.softwareForm = this.fb.group({
      Op: ['', [Validators.required]],
      skin: ['', [Validators.required]],
    });
    this.connectivityForm = this.fb.group({
      wifi: ['', [Validators.required]],
      gps: ['', [Validators.required]],
      bT: ['', [Validators.required]],
      usbType: ['', [Validators.required]],
      microUSb: ['', [Validators.required]],
      lighting: ['', [Validators.required]],
      headphones: ['', [Validators.required]],
      noOfSims: ['', [Validators.required]],
      Active4gOnBothSim: ['', [Validators.required]],
      simType: ['', [Validators.required]],
    });
    this.sensorsForm = this.fb.group({
      fingerPrintSensor: ['', [Validators.required]],
      proximitySensor: ['', [Validators.required]],
      accelerometer: ['', [Validators.required]],
      ambientLight: ['', [Validators.required]],
      gyroscope: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.openDialog();
    this.productForm = this.fb.group({
      brandName: ['', Validators.required],
      modelName: ['', Validators.required],
      productId: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      // imgUrl: ['',Validators.required],
      rating: ['', Validators.required],
      productAvail: ['', Validators.required],
      imgUrl: new FormControl([], [Validators.required]),
      category: ['', Validators.required],
    });
    // this.specForm = this.fb.group({

    // })
  }
  openDialog(): void {

    let dialogRef = this.dialog.open(DialogForCategoryComponent, {
      width: '450px',
      height : '350px',
      disableClose: true
    });
      dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      ;
    });
  }
  onSelectFile(event) {
    debugger;
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.file = event.target;
        let fileInput = event.target.files[i];
        var reader = new FileReader();
        reader.onload = (event) => {
          this.Images.push(reader.result);
        };

        reader.readAsDataURL(fileInput);
        this.formData.append(
          'productImage',
          this.file.files[i],
          fileInput['name']
        );
      }
    }
  
  }

  get pfc() {
    return this.productForm.controls;
  }
  private setStates(i: number) {
    switch (i) {
      case 0: {
        this.isCompleted_gf = false;
        this.isCompleted_df = false;
        this.isCompleted_hf = false;
        this.isCompleted_cf = false;
        this.isCompleted_sf = false;
        this.isCompleted_conf = false;
        this.isCompleted_senf = false;
        break;
      }
      case 1: {
        this.isCompleted_df = false;
        this.isCompleted_hf = false;
        this.isCompleted_cf = false;
        this.isCompleted_sf = false;
        this.isCompleted_conf = false;
        this.isCompleted_senf = false;
        break;
      }
      case 2: {
        this.isCompleted_hf = false;
        this.isCompleted_cf = false;
        this.isCompleted_sf = false;
        this.isCompleted_conf = false;
        this.isCompleted_senf = false;
        break;
      }
      case 3: {
        this.isCompleted_cf = false;
        this.isCompleted_sf = false;
        this.isCompleted_conf = false;
        this.isCompleted_senf = false;
        break;
      }
      case 4: {
        this.isCompleted_sf = false;
        this.isCompleted_conf = false;
        this.isCompleted_senf = false;
      }
      case 5: {
        this.isCompleted_conf = false;
        this.isCompleted_senf = false;
      }
      case 7: {
        this.isCompleted_senf = false;
      }
      default: {
        break;
      }
    }
  }
  public onChangeTab(event: any) {
    this.tabIndex = event.selectedIndex;
    this.setStates(event.selectedIndex);
    console.log(this.tabIndex);
  }

  OnSubmitGeneralform() {
    console.log(this.generalForm.value);
    this.errMsg_gf = '';
    if (this.generalForm.invalid) {
      this.errMsg_gf = 'Please fill all details correctly.';
      return false;
    }
    this.isCompleted_gf = true;
    // if (!this.isNewPolicy) {
    //     this.isCompleted_pp = true;
    // }
    setTimeout(() => {
      this.tabIndex++;
    }, 100);
  }
  OnSubmitDisplayForm() {
    console.log(this.displayForm.value);
    this.errMsg_df = '';
    if (this.displayForm.invalid) {
      this.errMsg_df = 'Please fill all details correctly.';
      return false;
    }
    this.isCompleted_df = true;
    // if (!this.isNewPolicy) {
    //     this.isCompleted_pp = true;
    // }
    setTimeout(() => {
      this.tabIndex++;
    }, 100);
  }
  onSubmitHardwareForm() {
    console.log(this.hardwareForm.value);
    this.errMsg_hf = '';
    if (this.hardwareForm.invalid) {
      this.errMsg_hf = 'Please fill all details correctly.';
      return false;
    }
    this.isCompleted_hf = true;
    // if (!this.isNewPolicy) {
    //     this.isCompleted_pp = true;
    // }
    setTimeout(() => {
      this.tabIndex++;
    }, 100);
  }
  onSubmitSoftwareForm() {
    console.log(this.softwareForm.value);
    this.errMsg_sf = '';
    if (this.softwareForm.invalid) {
      this.errMsg_sf = 'Please fill all details correctly.';
      return false;
    }
    this.isCompleted_sf = true;
    // if (!this.isNewPolicy) {
    //     this.isCompleted_pp = true;
    // }
    setTimeout(() => {
      this.tabIndex++;
    }, 100);
  }
  onSubmitCameraForm() {
    console.log(this.cameraForm.value);
    this.errMsg_cf = '';
    if (this.cameraForm.invalid) {
      this.errMsg_cf = 'Please fill all details correctly.';
      return false;
    }
    this.isCompleted_cf = true;
    // if (!this.isNewPolicy) {
    //     this.isCompleted_pp = true;
    // }
    setTimeout(() => {
      this.tabIndex++;
    }, 100);
  }
  onSubmitSensorForm() {
    console.log(this.sensorsForm.value);
    this.errMsg_senf = '';
    if (this.sensorsForm.invalid) {
      this.errMsg_senf = 'Please fill all details correctly.';
      return false;
    }
    this.isCompleted_senf = true;
    // if (!this.isNewPolicy) {
    //     this.isCompleted_pp = true;
    // }
    setTimeout(() => {
      this.tabIndex++;
    }, 100);
  }
  onSubmitProductForm() {
    console.log(this.productForm.value);
    this.errMsg = '';
    if (this.productForm.invalid) {
      this.errMsg = 'Please fill all details correctly.';
      return false;
    } else {
      const gf = this.generalForm.value;
      const df = this.displayForm.value;
      const hf = this.hardwareForm.value;
      const sf = this.softwareForm.value;
      const cf = this.cameraForm.value;
      const conf = this.connectivityForm.value;
      const senf = this.sensorsForm.value;
      const productSpecification: {} = {
        general: gf,
        display: df,
        hardware: hf,
        software: sf,
        camera: cf,
        connectivity: conf,
        sensors: senf,
        
      };
      console.log(productSpecification);
      this.prodadd.addSpecification(productSpecification).subscribe((res) => {
        console.log(res);
      })
    }
  }
  onSubmitConectivityForm() {
    console.log(this.connectivityForm.value);
    this.errMsg_conf = '';
    if (this.connectivityForm.invalid) {
      this.errMsg_conf = 'Please fill all details correctly.';
      return false;
    }
    this.isCompleted_conf = true;
    // if (!this.isNewPolicy) {
    //     this.isCompleted_pp = true;
    // }
    setTimeout(() => {
      this.tabIndex++;
    }, 100);
  }
  // onSubmit() {
  //   ($('#basicModal') as any).modal('show');
  //     // this.Toasts.info('Please do Login !');

  // }
  OnSubmitSpec() {
    console.log(this.productForm.value.category);
    const product = this.productForm.value;
    this.formData.append('productBrandName', product.brandName);
    this.formData.append('Description', product.description);
    this.formData.append('productModel', product.modelName);
    this.formData.append('StarRating', product.rating);
    this.formData.append('productId', product.productId);
    this.formData.append('productAvailability', product.productAvail);
    this.formData.append('productPrice', product.price);
    this.formData.append('category', product.category);
    // this.formData.append('specId', specId)
    this.prodadd.addProducts(this.formData).subscribe((Res) => {});
    this.productForm.reset();
    this.productForm.patchValue({
      imgUrl: '',
    });
    this.router.navigateByUrl('/adminHome');
  }
}
@Component({
  // selector: 'Dialog-For-Category',
  templateUrl: '../add-products/dialog-for-category/dialog-for-category.component.html',
})
export class DialogForCategoryComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DialogForCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
    
  }
  getCat(c) {
    console.log(c);
    
  }
}
