import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CLType, CLTypeEnum } from 'casper-rust-wasm-sdk';
import { NamedCLTypeArg } from '@casper-api/api-interfaces';

@Component({
  selector: 'casper-ui-argument',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './argument.component.html',
  styleUrls: ['./argument.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArgumentComponent {
  @Input() defaultType: NamedCLTypeArg = { name: '', cl_type: CLType.U8() };
  CLTypeEnum = CLTypeEnum;
  types = Object.keys(this.CLTypeEnum || {}).filter((key) =>
    isNaN(Number(key)),
  );
}
