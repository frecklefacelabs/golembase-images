import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThumbnailGalleryComponent } from './thumbnail-gallery/thumbnail-gallery';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThumbnailGalleryComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
