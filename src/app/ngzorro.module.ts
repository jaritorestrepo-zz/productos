import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  imports: [
    NzButtonModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzMenuModule,
    NzMessageModule,
    NzTableModule,
  ],
  exports: [
    NzButtonModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzMenuModule,
    NzMessageModule,
    NzTableModule,
  ],
})
export class NgZorroModule {}
