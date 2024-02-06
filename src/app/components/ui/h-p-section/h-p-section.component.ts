import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-h-p-section',
  templateUrl: './h-p-section.component.html',
  styleUrls: ['./h-p-section.component.css']
})
export class HPSectionComponent {
  @Input({ required: true }) heading: string | undefined;
  @Input({ required: true }) paragraph: string | undefined;
  @Input() alignCentre: boolean = false;

}
