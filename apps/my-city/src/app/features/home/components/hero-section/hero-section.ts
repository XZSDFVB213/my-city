import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [MatButtonModule,RouterLink],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  scanQrCode() {
    alert('Откройте камеру телефона и наведите ее на QR-код на столе');
  }
}
