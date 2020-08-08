import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountdownService } from '../services/countdown.service';

@Component({
  selector: 'app-countdown-input',
  templateUrl: './countdown-input.component.html',
  styleUrls: ['./countdown-input.component.scss']
})
export class CountdownInputComponent implements OnInit {
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
  }

  submitForm(): void {
    this.formGroup.updateValueAndValidity();

    if (this.formGroup.invalid) {
      return;
    }

    const newTargetDate = new Date();
    const { hours, minutes } = this.formGroup.value;
    newTargetDate.setHours(hours, minutes, 0, 0);
    this.countdownService.addTargetTime(newTargetDate);
  }

}
