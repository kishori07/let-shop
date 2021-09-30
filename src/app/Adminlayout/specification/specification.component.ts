import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.css']
})
export class SpecificationComponent implements OnInit {
  
  @Input() isVisible: boolean = false;
 
  generalForm: FormGroup;
  displayForm: FormGroup;
  HardwareForm: FormGroup;
  cameraForm: FormGroup;
  softwareForm: FormGroup;
  connectivityForm: FormGroup;
  sensorsForm: FormGroup;
  errMsg_gf = "";
  errMsg_df = "";
  errMsg_hf = "";
  errMsg_cf = "";
  errMsg_sf = "";
  errMsg_conf = "";
  errMsg_senf = "";
  displaySpecification: boolean = false;
  isCompleted_gf: boolean = false;
  isCompleted_df: boolean = false;
  isCompleted_hf: boolean = false;
  isCompleted_cf: boolean = false;
  isCompleted_sf: boolean = false;
  isCompleted_conf: boolean = false;
  isCompleted_senf: boolean = false;
 public tabIndex = 0;
  constructor(private fb: FormBuilder,) {
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
    this.HardwareForm = this.fb.group({
      processor: ['', [Validators.required]],
      processorMake: ['', [Validators.required]],
      ram: ['', [Validators.required]],
      internalStorage: ['', [Validators.required]],
      expandableStorage: ['', [Validators.required]],
      expandableType: ['', [Validators.required]],
      dedicatedMicroSlot: ['', [Validators.required]],
    });
    this.cameraForm = this.fb.group({
      rearCamera: ['', [Validators.required]],
      noOfRearCamera: ['', [Validators.required]],
      rearAutofocus: ['', [Validators.required]],
      rearFlash: ['', [Validators.required]],
      frontCamera: ['', [Validators.required]],
      NoOfFrontCamera: ['', [Validators.required]],
      popUpCamera: ['', [Validators.required]],
    });
    this.softwareForm = this.fb.group({
      op: ['', [Validators.required]],
      skin: ['', [Validators.required]],
    });
    this.connectivityForm = this.fb.group({
      wifi: ['', [Validators.required]],
      gps: ['', [Validators.required]],
      bT: ['', [Validators.required]],
      usbType: ['', [Validators.required]],
      microUSB: ['', [Validators.required]],
      lighting: ['', [Validators.required]],
      headphones: ['', [Validators.required]],
      noOfSims: ['', [Validators.required]],
      active4G: ['', [Validators.required]],
      sim: [['', [Validators.required]],]
    });
    this.sensorsForm = this.fb.group({
      inDisplayFingerPrint: ['', [Validators.required]],
      proximity: ['', [Validators.required]],
      accelerometer: ['', [Validators.required]],
      ALS: ['', [Validators.required]],
      gyro:['', [Validators.required]],
    })
    
   }
//   callPopUp() {
//    ($('#basicModal') as any).modal('show');
// }
  ngOnInit(): void {
    // if (this.isVisible) {
   
    //  }
        
  }

private setStates(i: number) {
    switch (i) {
      case 0: {
        this.isCompleted_gf= false;
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
    this.errMsg_gf = "";
    if (this.generalForm.invalid) {
      this.errMsg_gf = "Please fill all details correctly.";
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
    this.errMsg_df = "";
    if (this.displayForm.invalid) {
      this.errMsg_df = "Please fill all details correctly.";
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
}
