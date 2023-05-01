import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavPanelComponent } from './nav-panel.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NavPanelComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [NavPanelComponent],
})
export class NavPanelModule {}
