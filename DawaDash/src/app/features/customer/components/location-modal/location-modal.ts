import {
  Component,
  ElementRef,
  OnInit,
  afterNextRender,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MapPicker } from '../map-picker/map-picker';

@Component({
  selector: 'app-location-modal',
  imports: [MapPicker],
  templateUrl: './location-modal.html',
  styleUrl: './location-modal.css',
  host: { '(document:keydown.escape)': 'closed.emit()' }, // Esc closes the modal
})
export class LocationModal implements OnInit {
  address = input.required<string>();
  saved = output<string>();
  closed = output<void>();

  draft = signal(''); // what is currently typed (or picked on the map)
  showMap = signal(false);

  private readonly box = viewChild.required<ElementRef<HTMLInputElement>>('box');

  constructor() {
    // Put the cursor in the text field as soon as the modal appears
    afterNextRender(() => {
      const input = this.box().nativeElement;
      input.focus();
      input.select();
    });
  }

  ngOnInit() {
    this.draft.set(this.address());
  }

  confirm() {
    const value = this.draft().trim();
    if (value) {
      this.saved.emit(value);
    }
  }
}