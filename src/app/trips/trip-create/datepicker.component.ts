import {Component, Input} from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { TripCreateComponent } from './trip-create.component';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class DatepickerComponent {

  @Input()
  dateupdateHandler: Function;

  hoveredDate: NgbDate;
  startDate: NgbDate;
  endDate: NgbDate;

  constructor(calendar: NgbCalendar) {
    this.startDate = null;
    this.endDate = null;
  }

  onDateSelection(date: NgbDate) {
    if (!this.startDate && !this.endDate) {
      this.startDate = date;
    } else if (this.startDate && !this.endDate && date.after(this.startDate)) {
      this.endDate = date;
    } else {
      this.endDate = null;
      this.startDate = date;
    }
    this.dateupdateHandler(this.startDate, this.endDate);
  }

  isHovered(date: NgbDate) {
    return this.startDate && !this.endDate && this.hoveredDate && date.after(this.startDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.startDate) && date.before(this.endDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.startDate) || date.equals(this.endDate) || this.isInside(date) || this.isHovered(date);
  }
}
