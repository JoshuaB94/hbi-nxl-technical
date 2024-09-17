import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserActionsBar } from './components/user-actions-bar/user-actions-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserActionsBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'HBI NXL Technical';
}
