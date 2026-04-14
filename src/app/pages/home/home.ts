import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  host: {
    '[class.dark-mode]': 'theme.isDarkMode()',
  },
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(public theme: ThemeService) {}
}
