import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="shell">
      <h1>Angular CSP Nonce (Option A)</h1>
      <p class="badge">If you see this styled badge, the nonce worked.</p>
      <div style="color: red;width: 300px;height: 300px;">Inline style in attributes is not supported. move the style to the style tag.</div>
    </main>
  `,
  styles: [`
    .shell { padding: 24px; font: 14px/1.4 system-ui, Arial, sans-serif; }
    .badge { display:inline-block; padding:8px 12px; border-radius:8px; color:#fff; background:#1976d2; }
  `]
})
export class AppComponent {}
