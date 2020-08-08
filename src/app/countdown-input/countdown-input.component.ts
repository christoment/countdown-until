import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountdownService } from '../services/countdown.service';

@Component({
  selector: 'app-countdown-input',
  templateUrl: './countdown-input.component.html',
  styleUrls: ['./countdown-input.component.scss']
})
export class CountdownInputComponent implements OnInit {
  @Input() addLabel = 'Add';
  @Input() showCancel = false;
  @Input() initialDate = new Date();;
  @Output() add = new EventEmitter<Date>();
  @Output() cancel = new EventEmitter<Date>();

  formGroup: FormGroup;

  constructor(
    private countdownService: CountdownService,
    fb: FormBuilder,
  ) {
    const now = new Date();
    this.formGroup = fb.group({
      hours: [now.getHours(), [Validators.required, Validators.min(0), Validators.max(23)]],
      minutes: [now.getMinutes(), [Validators.required, Validators.min(0), Validators.max(59)]],
    });
  }

  ngOnInit(): void {
    if (this.initialDate) {
      this.formGroup.setValue({
        hours: this.initialDate.getHours(),
        minutes: this.initialDate.getMinutes(),
      });
    }
  }

  submitForm(): void {
    this.formGroup.updateValueAndValidity();

    if (this.formGroup.invalid) {
      return;
    }

    const newTargetDate = new Date();
    const payload = this.formGroup.value;

    newTargetDate.setHours(payload.hours, payload.minutes, 0, 0);
    this.add.emit(newTargetDate);
  }

}
