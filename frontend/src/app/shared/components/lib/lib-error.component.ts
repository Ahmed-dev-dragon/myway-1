import { Component } from '@angular/core';

@Component({
  selector: 'app-lib-404-error',
  template: `
    <style>
      .not-found-container {
        background-color: white;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-inline: auto;
        width: 100%;
        height: calc(100vh - 10rem);

        .not-found-error {
          font-size: 100px;
        }

        .not-found {
          font-size: 90px;
        }
      }
    </style>
    <div class="not-found-container">
      <h1 class="not-found-error">404</h1>
      <h2 class="not-found">This itom Not Found lib</h2>
      <button
        pButton
        type="button"
        label="Return To the Dashboard"
        icon="bi bi-arrow-left"
      ></button>
    </div>
  `,
})
export class LibErrorComponent {}
