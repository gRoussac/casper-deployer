import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tabs, TabsComponent } from '@casper-ui/tabs';
import { ArgumentComponent } from '@casper-ui/argument';
import { customArg, defaultTabs } from './tabs';
import { StorageService } from '@casper-util/storage';
import { NamedCLTypeArg, State } from '@casper-api/api-interfaces';
import { DeployerService } from '@casper-data/data-access-deployer';
import { Subscription } from 'rxjs';
import { CLType } from 'casper-rust-wasm-sdk';

interface ArgumentEntry<T = unknown> {
  name: string;
  type: string | TypeObject;
  value: T;
}

interface TypeObject {
  Option?: string;
  List?: string | TypeObject;
  Tuple1?: string[];
  Tuple2?: string[];
  Tuple3?: string[];
  Map?: { key: string; value: string };
  ByteArray?: number;
  Result?: { ok: string; err: string };
}

const sortByName = (a: NamedCLTypeArg, b: NamedCLTypeArg) => {
  const typeA = a['name'].toString().toUpperCase();
  const typeB = b['name'].toString().toUpperCase();
  if (typeA < typeB) {
    return -1;
  } else if (typeA > typeB) {
    return 1;
  }
  return 0;
};

@Component({
  selector: 'casper-deployer-arg-builder',
  standalone: true,
  imports: [CommonModule, TabsComponent, ArgumentComponent],
  templateUrl: './arg-builder.component.html',
  styleUrls: ['./arg-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArgBuilderComponent implements AfterViewInit, OnDestroy {
  @Input() set isOpen(value: boolean) {
    this._isOpen = value;
    this.addArgs();
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() argumentChanged: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('form') formElt!: ElementRef;
  Tabs = Tabs;
  default = Tabs.Custom;
  active: Tabs = this.default;
  defaultTabs = defaultTabs.map((tab) => ({
    name: tab.name,
    types: tab.types.slice().sort(sortByName),
  }));
  argument = '';
  hasWasm!: boolean;

  private _isOpen = false;
  private getStateSubscription!: Subscription;

  constructor(
    private readonly storageService: StorageService,
    private readonly deployerService: DeployerService,
  ) {}

  ngAfterViewInit(): void {
    this.getStateSubscription = this.deployerService
      .getState()
      .subscribe((state: State) => {
        if (undefined !== state.has_wasm) {
          this.hasWasm = !!state.has_wasm;
        }
      });
  }

  ngOnDestroy(): void {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
  }

  activateContent(tabIndex: Tabs) {
    this.active = tabIndex;
  }

  add() {
    this.defaultTabs[this.active].types.push(customArg);
  }

  trackByFn = (index: number, item: NamedCLTypeArg): string =>
    item['name'].toString();

  build() {
    this.argument = '[';
    const collection = this.formElt.nativeElement.children as HTMLCollection;

    Array.from(collection).forEach((collection: Element) => {
      const children = Array.from(collection.children);

      if (!(children[2] as HTMLInputElement).value) {
        return;
      }
      const entry: ArgumentEntry = {
        name: this.parseName(
          children[2] as HTMLInputElement,
          (children[1] as HTMLInputElement).value,
          (children[0] as HTMLInputElement).value,
        ),
        type: this.parseType(
          children[2] as HTMLInputElement,
          (children[1] as HTMLInputElement).value,
        ),
        value: this.parseValue(
          children[2] as HTMLInputElement,
          (children[1] as HTMLInputElement).value,
        ),
      };

      this.argument += JSON.stringify(entry) + ',';
    });

    this.argument = this.argument.slice(0, -1); // Remove trailing comma
    this.argument += ']';

    this.argument && this.argumentChanged.emit(this.argument);
  }

  private parseName(
    input: HTMLInputElement,
    type: string,
    name: string,
  ): string {
    const inputValue = input.value.trim();
    switch (type) {
      case CLType.Option(CLType.Any()).toString():
      case CLType.List(CLType.Any()).toString():
      case CLType.ByteArray().toString():
      case CLType.Result(CLType.Any(), CLType.Any()).toString():
      case CLType.Map(CLType.Any(), CLType.Any()).toString():
      case CLType.Tuple1(CLType.Any()).toString():
      case CLType.Tuple2(CLType.Any(), CLType.Any()).toString():
      case CLType.Tuple3(CLType.Any(), CLType.Any(), CLType.Any()).toString(): {
        const parsedInput = JSON.parse(inputValue);
        return parsedInput.name || name;
      }
      default:
        return name;
    }
  }

  private parseType(input: HTMLInputElement, type: string) {
    const inputValue = input.value.trim();
    switch (type) {
      case CLType.Option(CLType.Any()).toString(): {
        const parsedInput = JSON.parse(inputValue);
        return { Option: parsedInput.type.Option };
      }
      case CLType.List(CLType.Any()).toString(): {
        const parsedInput = JSON.parse(inputValue);
        return { List: parsedInput.type.List };
      }
      case CLType.ByteArray().toString(): {
        const parsedInput = JSON.parse(inputValue);
        return { ByteArray: parsedInput.type.ByteArray };
      }
      case CLType.Result(CLType.Any(), CLType.Any()).toString(): {
        const parsedInput = JSON.parse(inputValue);
        return { Result: parsedInput.type.Result };
      }
      case CLType.Map(CLType.Any(), CLType.Any()).toString(): {
        const parsedInput = JSON.parse(inputValue);
        return { Result: parsedInput.type.Map };
      }
      case CLType.Tuple1(CLType.Any()).toString(): {
        const parsedInput = JSON.parse(inputValue);
        return { Tuple1: parsedInput.type.Tuple1 };
      }
      case CLType.Tuple2(CLType.Any(), CLType.Any()).toString(): {
        const parsedInput = JSON.parse(inputValue);
        return { Tuple2: parsedInput.type.Tuple2 };
      }
      case CLType.Tuple3(CLType.Any(), CLType.Any(), CLType.Any()).toString(): {
        const parsedInput = JSON.parse(inputValue);
        return { Tuple3: parsedInput.type.Tuple3 };
      }
      default:
        return type;
    }
  }

  private parseValue<T>(input: HTMLInputElement, type: string): T {
    const inputValue = input.value.trim();

    switch (type) {
      case CLType.Bool().toString():
        return (inputValue.toLowerCase() === 'true') as unknown as T;
      case CLType.I32().toString():
      case CLType.I64().toString():
      case CLType.U8().toString():
      case CLType.U32().toString():
      case CLType.U64().toString():
      case CLType.U128().toString():
      case CLType.U256().toString():
      case CLType.U512().toString():
        return Number(inputValue) as unknown as T;
      case CLType.Unit().toString():
        return null as unknown as T;
      case CLType.String().toString():
        return inputValue as unknown as T;
      case CLType.Key().toString():
      case CLType.URef().toString():
      case CLType.PublicKey().toString():
      case CLType.Any().toString():
        return inputValue as unknown as T;
      default: {
        const test = JSON.parse(inputValue);
        return test.value as unknown as T;
      }
    }
  }

  private addArgs() {
    const args: [] = this.storageService.get('args');
    this.defaultTabs[0].types = [];
    args &&
      args.forEach((arg) => {
        this.defaultTabs[0].types.push(arg);
      });
  }
}
