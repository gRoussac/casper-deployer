# Casper Rust/Wasm SDK 1.6 Juliet

The Rust/Wasm SDK allows developers and users to interact with the Casper Blockchain using Rust or TypeScript. It provides a way to embed the [casper-client-rs](https://github.com/casper-ecosystem/casper-client-rs) into another application without the CLI interface. The SDK exposes a list of types and methods from a subset of the Casper client.

You can use the Casper Rust/Wasm SDK in two ways:

- In a <strong>Rust application</strong> by importing the SDK crate.
- In a <strong>Typescript application</strong> by importing the SDK Wasm file and the Typescript interfaces.

This page covers different examples of using the SDK.

⚠ WARNING: This application is for testing and development purposes. Do NOT use private keys or perform real transactions on the testnet/mainnet unless you fully understand the security risks.

## Install

<details>
  <summary><strong><code>Rust Project</code></strong></summary>

## Rust Project

Add the SDK as a dependency of your project:

> Cargo.toml

```toml
casper-rust-wasm-sdk = { version = "1.0.0", git = "https://github.com/casper-ecosystem/casper-rust-wasm-sdk.git" }
```

## Usage

> main.rs

```rust
use casper_rust_wasm_sdk::{types::verbosity::Verbosity, SDK};

let sdk = SDK::new(
  Some("https://node.testnet.casper.network".to_string()),
  Some(Verbosity::High)
);
```

</details>

<details>
  <summary><strong><code>Typescript Project</code></strong></summary>

## Typescript Project

You can directly use the content of the [pkg folder](pkg/) for a browser project or [pkg-nodejs](pkg-nodejs/) for a Node project.

Or you can use the [TODO][npm package](https://todo)

#### Build package with Wasm pack

If you want to compile the Wasm package from Rust you may need to install `wasm-pack` for ease of use.

```shell
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

```shell
$ make prepare
$ make pack
```

This will create a `pkg` and `pkg-nodejs` containing the Typescript interfaces. You can find more details about building the SDK for Javascript with `wasm-pack` in the [wasm-pack documention](https://rustwasm.github.io/docs/wasm-pack/commands/build.html).

This folder contains a Wasm binary, a JS wrapper file, Typescript types definitions, and a package.json file that you can load in your project.

```shell
$ tree pkg
pkg
├── casper_rust_wasm_sdk_bg.wasm
├── casper_rust_wasm_sdk_bg.wasm.d.ts
├── casper_rust_wasm_sdk.d.ts
├── casper_rust_wasm_sdk.js
├── LICENSE
├── package.json
└── README.md
```

## Usage

<details>
  <summary><strong><code>React</code></strong></summary>

## Web React

> package.json

```json
{
  "name": "my-react-app",
  "dependencies": {
    // This path is relative
    "casper-rust-wasm-sdk": "file:pkg", // [TODO] Npm package
    ...
}
```

The React app needs to load the Wasm file through a dedicated `init()` method as per this example:

> App.tsx

```ts
import init, {
  SDK,
  Verbosity,
} from 'casper-rust-wasm-sdk';

const node_address = 'https://node.testnet.casper.network';
const verbosity = Verbosity.High;

function App() {
  const [wasm, setWasm] = useState(false);
  const fetchWasm = async () => {
    await init();
    setWasm(true);
  };

  useEffect(() => {
    initApp(); // take care here to initiate app only once and not on every effect
  }, []);

  const initApp = async () => {
  if (!wasm) {
    await fetchWasm();
  };

  const sdk = new SDK(node_address, verbosity);
  console.log(sdk);
  ...
}
```

#### Frontend React example

You can look at a very basic example of usage in the [React example app](examples/frontend/react/src/App.tsx).

```shell
$ cd ./examples/frontend/react
$ npm install
$ npm start
```

</details>
<details>
  <summary><strong><code>Angular</code></strong></summary>

## Web Angular

> package.json

```json
{
  "name": "my-angular-app",
  "dependencies": {
    // This path is relative
    "casper-rust-wasm-sdk": "file:pkg", // [TODO] Npm package
    ...
}
```

The Angular app needs to load the Wasm file through a dedicated `init()` method as per this example. You can import it into a component through a service but it is advised to import it through a factory with the injection token [APP_INITIALIZER](https://angular.io/api/core/APP_INITIALIZER).

> wasm.factory.ts

```js
import init, { SDK, Verbosity } from 'casper-rust-wasm-sdk';

export const SDK_TOKEN = new InjectionToken() < SDK > 'SDK';
export const WASM_ASSET_PATH =
  new InjectionToken() < string > 'wasm_asset_path';
export const NODE_ADDRESS = new InjectionToken() < string > 'node_address';
export const VERBOSITY = new InjectionToken() < Verbosity > 'verbosity';

type Params = {
  wasm_asset_path: string,
  node_address: string,
  verbosity: Verbosity,
};

export const fetchWasmFactory = async (params: Params): Promise<SDK> => {
  const wasm = await init(params.wasm_asset_path);
  return new SDK(params.node_address, params.verbosity);
};
```

> wasm.module.ts

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SDK_TOKEN, fetchWasmFactory, provideSafeAsync } from './wasm.factory';

const providers = provideSafeAsync(SDK_TOKEN, fetchWasmFactory);

@NgModule({
  imports: [CommonModule],
  providers,
})
export class WasmModule {}
```

You can look at a basic example of factory usage in the [Angular example app](examples/frontend/angular/libs/util/services/wasm/src/lib/wasm.factory.ts).

Add the SDK Wasm file to the assets of your project with the path parameter being ` wasm_asset_path:'assets/casper_rust_wasm_sdk_bg.wasm'`, Angular will then copy the file from `pkg` in `assets` on build making it available for the fetch Wasm factory.

> project.json

```json
"assets": [
  ...,
  {
    "input": "pkg",
    "glob": "casper_rust_wasm_sdk_bg.wasm",
    "output": "assets"
  }
]
```

#### Frontend Angular example

You can look at a more advanced example of usage in the [Angular example app](examples/frontend/angular/src/app/app.component.ts).

```shell
$ cd ./examples/frontend/angular
$ npm install
$ npm start
$ npm build
```

</details>

<details>
  <summary><strong><code>Node</code></strong></summary>

## Desktop Node

> package.json

```json
{
  "name": "my-node-app",
  "dependencies": {
    // This path is relative
    "casper-rust-wasm-sdk": "file:pkg-nodejs", // [TODO] Npm package
    ...
}
```

The Node app loads the SDK with `require()`. You can find more details about building the SDK for [Node with wasm-pack](https://rustwasm.github.io/docs/wasm-bindgen/reference/deployment.html#nodejs).
Note that this method requires a version of Node.js with WebAssembly support, which is currently Node 8 and above.

> index.ts

```ts
// with require
const casper_sdk = require('casper-rust-wasm-sdk');
const { SDK } = casper_sdk;

// or with import
import { SDK } from 'casper-rust-wasm-sdk';

const node_address = 'https://node.testnet.casper.network';
const sdk = new SDK(node_address);
console.log(sdk);
```

#### Desktop Node example

You can look at a very basic example of usage in the [Node example app](examples/desktop/node/index.ts).

```shell
$ cd ./examples/desktop/node
$ npm install
$ npm start
```

</details>

</details>

## Usage

### RPC call examples

<details>
  <summary><strong><code>Rust</code></strong></summary>
<br>

You can find all RPC methods on the [RPC doc](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-rust/casper_rust_wasm_sdk/rpcs/). Below are several examples of RPC methods intended for use on Testnet.

#### Get deploy by deploy hash

```rust
use casper_rust_wasm_sdk::types::deploy_hash::DeployHash;

let deploy_hash =
    DeployHash::new("a8778b2e4bd1ad02c168329a1f6f3674513f4d350da1b5f078e058a3422ad0b9")
        .unwrap();

let finalized_approvals = true;
let get_deploy = sdk
    .get_deploy(deploy_hash, Some(finalized_approvals), None, None)
    .await;

let deploy = get_deploy.unwrap().result.deploy;
let deploy_header = deploy.header();
let timestamp = deploy_header.timestamp();
println!("{timestamp}");
```

#### Get auction state information

```rust
let get_auction_info = sdk.get_auction_info(None, None, None).await;

let auction_state = get_auction_info.unwrap().result.auction_state;
let state_root_hash = auction_state.state_root_hash();
println!("{:?}", state_root_hash);
let block_height = auction_state.block_height();
println!("{block_height}");
```

#### Get peers from the network

```rust
let get_peers = sdk.get_peers(None, None).await;

let peers = get_peers.unwrap().result.peers;
for peer in &peers {
    println!("{:?}", peer)
}
```

#### Get the latest block information

```rust
let get_block = sdk.get_block(None, None, None).await;

let get_block = sdk.get_block(None, None, None).await;

let block = get_block.unwrap().result.block.unwrap();
let block_hash = block.hash();
println!("{:?}", block_hash);
```

You can find more examples by reading [Rust integration tests](../tests/integration/rust/).

</details>

<details>
  <summary><strong><code>Typescript</code></strong></summary>
<br>

You can find all RPC methods on the [RPC doc](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-wasm/classes/SDK.html). Below are several examples of RPC methods intended for use on Testnet.

#### Get deploy by deploy hash

```ts
import { Deploy } from 'casper-rust-wasm-sdk';

const deploy_hash_as_string =
  'a8778b2e4bd1ad02c168329a1f6f3674513f4d350da1b5f078e058a3422ad0b9';
const finalized_approvals = true;

const get_deploy_options = sdk.get_deploy_options({
  deploy_hash_as_string,
  finalized_approvals,
});

const deploy_result = await sdk.get_deploy(get_deploy_options);

const deploy: Deploy = deploy_result.deploy;
const timestamp = deploy.timestamp();
const header = deploy.toJson().header; // DeployHeader type not being exposed right now by the SDK you can convert every type to JSON
console.log(timestamp, header);
```

#### Get auction state information

```ts
const get_auction_info = await sdk.get_auction_info();

const auction_state = get_auction_info.auction_state;
const state_root_hash = auction_state.state_root_hash.toString();
const block_height = auction_state.block_height.toString();
console.log(state_root_hash, block_height);
```

#### Get peers from the network

```ts
const get_peers = await sdk.get_peers();

const peers = get_peers.peers;
peers.forEach((peer) => {
  console.log(peer);
});
```

#### Get the latest block information

```ts
const get_block = await sdk.get_block();

let block = get_block.block;
let block_hash = block.hash;
console.log(block_hash);
```

You can find more examples in [NodeJs examples](../examples/desktop/node/index.ts) or in the [Angular example app](../examples/frontend/angular/src/app/app.component.ts) or in the [React example app](../examples/frontend/react/src/App.tsx) or by reading [Puppeteer e2e tests](../tests/e2e/puppeteer/tests.spec.ts).

</details>

### More examples

<details>
  <summary><strong><code>Deploys and Transfers</code></strong></summary>
<br>
<details>
    <summary>Making a Transfer</summary>

#### Rust

```rust
use casper_rust_wasm_sdk::types::deploy_params::{
    deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
};

pub const CHAIN_NAME: &str = "integration-test";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const PAYMENT_AMOUNT: &str = "100000000";
pub const TRANSFER_AMOUNT: &str = "2500000000";
pub const TTL: &str = "1h";
pub const TARGET_ACCOUNT: &str =
    "018f2875776bc73e416daf1cf0df270efbb52becf1fc6af6d364d29d61ae23fe44";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY,            // sender account
    None,                  // optional secret key to sign transfer deploy
    None,                  // optional timestamp
    Some(TTL.to_string()), // optional TTL
);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);

let make_transfer = sdk
    .make_transfer(
        TRANSFER_AMOUNT,
        TARGET_ACCOUNT, // target account
        None,           // optional transfer_id
        deploy_params,
        payment_params,
    )
    .unwrap();
println!("{:?}", make_transfer.header().timestamp());
```

#### Typescript

```ts
import {
  DeployStrParams,
  PaymentStrParams,
  getTimestamp,
} from 'casper-rust-wasm-sdk';

const chain_name = 'integration-test';
const public_key =
  '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
const secret_key = undefined;
const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
const ttl = '1h'; // or undefined
const payment_amount = '100000000';
const transfer_amount = '2500000000';
const target_account =
  '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54';

const deploy_params = new DeployStrParams(
  chain_name,
  public_key,
  secret_key,
  timestamp,
  ttl
);

const payment_params = new PaymentStrParams(payment_amount);

const transfer_deploy = sdk.make_transfer(
  transfer_amount,
  target_account,
  undefined, // transfer_id
  deploy_params,
  payment_params
);
const transfer_deploy_as_json = transfer_deploy.toJson();
console.log(transfer_deploy_as_json);
```

</details>

<details>
    <summary>Transfer</summary>
<br>
Sends a [`Transfer Deploy`] to the network for execution. (Alias for make_transfer + put_deploy)

#### Rust

```rust
use casper_rust_wasm_sdk::types::deploy_params::{
    deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
};

pub const CHAIN_NAME: &str = "integration-test";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
pub const PAYMENT_AMOUNT: &str = "100000000";
pub const TRANSFER_AMOUNT: &str = "2500000000";
pub const TTL: &str = "1h";
pub const TARGET_ACCOUNT: &str =
    "018f2875776bc73e416daf1cf0df270efbb52becf1fc6af6d364d29d61ae23fe44";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY, // sender account
    Some(SECRET_KEY.to_string()),
    None,                  // optional timestamp
    Some(TTL.to_string()), // optional TTL
);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);

let transfer = sdk
    .transfer(
        TRANSFER_AMOUNT,
        TARGET_ACCOUNT,
        None, // optional transfer_id
        deploy_params,
        payment_params,
        None,
        None,
    )
    .await;
println!("{:?}", transfer.as_ref().unwrap().result.deploy_hash);
```

#### Typescript

```ts
import {
  DeployStrParams,
  PaymentStrParams,
  getTimestamp,
} from 'casper-rust-wasm-sdk';

const chain_name = 'casper-net-1';
const public_key =
  '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const timestamp = getTimestamp(); // or Date.now().toString(); // or undefined
const ttl = '1h'; // or undefined
const payment_amount = '100000000';
const transfer_amount = '2500000000';
const target_account =
  '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54';

const deploy_params = new DeployStrParams(
  chain_name,
  public_key,
  secret_key,
  timestamp,
  ttl
);

const payment_params = new PaymentStrParams(payment_amount);

const transfer_result = await sdk.transfer(
  transfer_amount,
  target_account,
  undefined, // transfer_id
  deploy_params,
  payment_params
);
const transfer_result_as_json = transfer_result.toJson();
console.log(transfer_result_as_json);
```

</details>

<details>
    <summary>Making a Deploy</summary>

#### Rust

```rust
use casper_rust_wasm_sdk::types::deploy_params::{
    deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
    session_str_params::SessionStrParams,
};

pub const CHAIN_NAME: &str = "integration-test";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const PAYMENT_AMOUNT: &str = "5000000000";
pub const CONTRACT_HASH: &str =
    "hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743";
pub const ENTRY_POINT: &str = "set_variables";
pub const TTL: &str = "1h";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY,            // sender account
    None,                  // optional secret key to sign deploy
    None,                  // optional timestamp
    Some(TTL.to_string()), // optional TTL
);

let session_params = SessionStrParams::default();
session_params.set_session_hash(CONTRACT_HASH);
session_params.set_session_entry_point(ENTRY_POINT);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);

let deploy = awaitsdk
    .make_deploy(deploy_params, session_params, payment_params)
    .unwrap();
println!("{:?}", deploy.header().timestamp());
```

#### Typescript

```ts
import {
  DeployStrParams,
  PaymentStrParams,
  SessionStrParams,
  getTimestamp,
} from 'casper-rust-wasm-sdk';

const chain_name = 'integration-test';
const public_key =
  '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
const payment_amount = '5000000000';
const contract_hash =
  'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';

const deploy_params = new DeployStrParams(chain_name, public_key);

const session_params = new SessionStrParams();
session_params.session_hash = contract_hash;
session_params.session_entry_point = 'set_variables';

const payment_params = new PaymentStrParams(payment_amount);

const deploy = sdk.make_deploy(deploy_params, session_params, payment_params);
const deploy_as_json = deploy.toJson();
console.log(deploy_as_json);
```

</details>

<details>
    <summary>Deploy</summary>
<br>
Sends a [`Deploy`] to the network for execution. (Alias for make_deploy + put_deploy)

#### Rust

```rust
let sdk = SDK::new(
    Some("http://127.0.0.1:11101".to_string()),
    Some(Verbosity::High),
);

use casper_rust_wasm_sdk::types::deploy_params::{
    deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
    session_str_params::SessionStrParams,
};

pub const CHAIN_NAME: &str = "casper-net-1";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
pub const PAYMENT_AMOUNT: &str = "5000000000";
pub const CONTRACT_HASH: &str =
    "hash-6646c99b3327954b47035bbc31343d9d96a833a9fc9c8c6d809b29f2482b0abf";
pub const ENTRY_POINT: &str = "set_variables";
pub const TTL: &str = "1h";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY, // sender account
    Some(SECRET_KEY.to_string()),
    None,                  // optional timestamp
    Some(TTL.to_string()), // optional TTL
);

let session_params = SessionStrParams::default();
session_params.set_session_hash(CONTRACT_HASH);
session_params.set_session_entry_point(ENTRY_POINT);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);

let deploy = sdk
    .deploy(deploy_params, session_params, payment_params, None, None)
    .await;
println!("{:?}", deploy.as_ref().unwrap().result.deploy_hash);
```

#### Typescript

```ts
import {
  DeployStrParams,
  PaymentStrParams,
  SessionStrParams,
  getTimestamp,
} from 'casper-rust-wasm-sdk';

const chain_name = 'casper-net-1';
const public_key =
  '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const payment_amount = '5000000000';
const contract_hash =
  'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';

const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

const session_params = new SessionStrParams();
session_params.session_hash = contract_hash;
session_params.session_entry_point = 'set_variables';

const payment_params = new PaymentStrParams(payment_amount);

const deploy_result = await sdk.deploy(
  deploy_params,
  session_params,
  payment_params
);
const deploy_result_as_json = deploy_result.toJson();
console.log(deploy_result_as_json);
```

</details>

<details>
    <summary>Put Deploy</summary>

#### Rust

Puts a [`Deploy`] to the network for execution.

```rust
use casper_rust_wasm_sdk::types::{
    deploy::Deploy,
    deploy_params::{
        deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
        session_str_params::SessionStrParams,
    },
};

pub const CHAIN_NAME: &str = "casper-net-1";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
pub const PAYMENT_AMOUNT: &str = "5000000000";
pub const CONTRACT_HASH: &str =
    "hash-6646c99b3327954b47035bbc31343d9d96a833a9fc9c8c6d809b29f2482b0abf";
pub const ENTRY_POINT: &str = "set_variables";
pub const TTL: &str = "1h";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY, // sender account
    Some(SECRET_KEY.to_string()),
    None,                  // optional timestamp
    Some(TTL.to_string()), // optional TTL
);

let session_params = SessionStrParams::default();
session_params.set_session_hash(CONTRACT_HASH);
session_params.set_session_entry_point(ENTRY_POINT);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);

let deploy =
    Deploy::with_payment_and_session(deploy_params, session_params, payment_params).unwrap();

let put_deploy = sdk.put_deploy(deploy, None, None).await;
println!("{:?}", put_deploy.as_ref().unwrap().result.deploy_hash);
```

Puts a [`Transfer Deploy`] to the network for execution.

```rust
use casper_rust_wasm_sdk::types::{
    deploy::Deploy,
    deploy_params::{deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams},
};

pub const CHAIN_NAME: &str = "casper-net-1";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
pub const PAYMENT_AMOUNT: &str = "100000000";
pub const TRANSFER_AMOUNT: &str = "2500000000";
pub const TARGET_ACCOUNT: &str =
    "018f2875776bc73e416daf1cf0df270efbb52becf1fc6af6d364d29d61ae23fe44";
pub const TTL: &str = "1h";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY, // sender account
    Some(SECRET_KEY.to_string()),
    None,                  // optional timestamp
    Some(TTL.to_string()), // optional TTL
);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);

let transfer_deploy = Deploy::with_transfer(
    TRANSFER_AMOUNT,
    TARGET_ACCOUNT,
    None,
    deploy_params,
    payment_params,
)
.unwrap();

let put_deploy = sdk.put_deploy(transfer_deploy, None, None).await;
println!("{:?}", put_deploy.as_ref().unwrap().result.deploy_hash);
```

#### Typescript

Puts a [`Deploy`] to the network for execution.

```ts
import {
  Deploy,
  DeployStrParams,
  PaymentStrParams,
  SessionStrParams,
  getTimestamp,
} from 'casper-rust-wasm-sdk';

const chain_name = 'casper-net-1';
const public_key =
  '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const payment_amount = '5000000000';
const contract_hash =
  'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
const entry_point = 'set_variables';

const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

const session_params = new SessionStrParams();
session_params.session_hash = contract_hash;
session_params.session_entry_point = entry_point;

const payment_params = new PaymentStrParams(payment_amount);

const deploy = Deploy.withPaymentAndSession(
  deploy_params,
  session_params,
  payment_params
);

const put_deploy_result = await sdk.put_deploy(deploy);
const put_deploy_result_as_json = put_deploy_result.toJson();
console.log(put_deploy_result_as_json);
```

Puts a [`Transfer Deploy`] to the network for execution.

```ts
import {
  Deploy,
  DeployStrParams,
  PaymentStrParams,
  SessionStrParams,
  getTimestamp,
} from 'casper-rust-wasm-sdk';

const chain_name = 'casper-net-1';
const public_key =
  '0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129';
const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const payment_amount = '100000000';
const transfer_amount = '2500000000';
const target_account =
  '0187adb3e0f60a983ecc2ddb48d32b3deaa09388ad3bc41e14aeb19959ecc60b54';

const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

const payment_params = new PaymentStrParams(payment_amount);

const transfer_deploy = Deploy.withTransfer(
  transfer_amount,
  target_account,
  undefined, // transfer_id
  deploy_params,
  payment_params
);

const put_deploy_result = await sdk.put_deploy(transfer_deploy);
const put_deploy_result_as_json = put_deploy_result.toJson();
console.log(put_deploy_result_as_json);
```

</details>

<details>
    <summary>Sign Deploy</summary>

#### Rust

```rust
pub const SECRET_KEY: &str = "";
... //  same code as 'Making a Deploy' example
let unsigned_deploy = sdk.make_deploy(deploy_params, session_params, payment_params).unwrap();
let signed_deploy = sdk.sign_deploy(unsigned_deploy, SECRET_KEY);
```

#### Typescript

```ts
const secret_key = '';
... //  same code as 'Making a Deploy' example
const unsigned_deploy = sdk.make_deploy(deploy_params, session_params, payment_params);
const signed_deploy = unsigned_deploy.sign(secret_key);
```

</details>

<details>
    <summary>Wait Deploy</summary>

#### Rust

Developers using Rust can utilize the wait_deploy function to wait for a specific deploy event. This is achieved by providing the desired event URL, deploy hash, and an optional timeout duration. Once the deploy is processed, the resulting data, such as the deploy's cost, can be easily accessed and utilized in subsequent logic.

```rust
pub const DEFAULT_EVENTS_ADDRESS: &str = "http://127.0.0.1:18101/events/main";

let deploy_hash = "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";

let timeout_duration = None; // Some(30000) for 30s instead of default timeout duration of 60s

// Wait for deploy
let event_parse_result = sdk
    .wait_deploy(DEFAULT_EVENTS_ADDRESS, &deploy_hash, timeout_duration)
    .await
    .unwrap();
let deploy_processed = event_parse_result.body.unwrap().deploy_processed.unwrap();
println!("{:?}", deploy_processed);
```

#### Typescript

In TypeScript, the waitDeploy function provides a similar capability to wait for a specific deploy event. Developers can leverage this function by specifying the event address, deploy hash, and an optional timeout duration. The received EventParseResult object can then be processed to extract valuable information, such as the cost of the deploy.

```ts
const events_address = 'http://127.0.0.1:18101/events/main';

const deploy_hash =
  'c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4';

const timeout_duration = undefined; // 30000 for 30s instead of default timeout duration of 60s

// Wait for deploy
const eventParseResult: EventParseResult = await sdk.waitDeploy(
  events_address,
  install_result_as_json.deploy_hash,
  timeout_duration
);
console.log(eventParseResult.body.DeployProcessed);
const cost =
  eventParseResult.body?.DeployProcessed?.execution_result.Success?.cost;
console.log(`deploy cost ${cost}`);
```

</details>

<details>
    <summary>Watch Deploy</summary>

#### Rust

The watch_deploy functionality facilitates actively monitoring deploy events. By creating a deploy watcher, developers can subscribe to specific deploy hashes and define custom callback functions to handle these events. The watcher is then started, and as deploy events occur, the specified callback functions are executed. This mechanism enables real-time responsiveness to deploy events within Rust applications.

```rust
use casper_rust_wasm_sdk::deploy_watcher::watcher::{
    DeploySubscription, EventHandlerFn,
};

pub const DEFAULT_EVENTS_ADDRESS: &str = "http://127.0.0.1:18101/events/main";

let deploy_hash = "c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4";

let timeout_duration = None; // Some(30000) for 30s instead of default timeout duration of 60s

// Creates a watcher instance
let mut watcher = sdk.watch_deploy(DEFAULT_EVENTS_ADDRESS, timeout_duration);

// Create a callback function handler of your design
let event_handler_fn = get_event_handler_fn(deploy_hash.to_string());

let mut deploy_subscriptions: Vec<DeploySubscription> = vec![];
deploy_subscriptions.push(DeploySubscription::new(
    deploy_hash.to_string(),
    EventHandlerFn::new(event_handler_fn),
));

// Subscribe and start watching
let _ = watcher.subscribe(deploy_subscriptions);
let results = watcher.start().await;
watcher.stop();
println!("{:?}", results);
```

#### Typescript

Similarly, TypeScript developers can utilize the watchDeploy function to actively watch for deploy events on the Casper blockchain. By creating a deploy watcher and defining callback functions, developers can subscribe to specific deploy hashes and respond dynamically as events unfold.

```ts
import { EventParseResult, DeploySubscription } from 'casper-rust-wasm-sdk';

const events_address = 'http://127.0.0.1:18101/events/main';

const deploy_hash =
  'c94ff7a9f86592681e69c1d8c2d7d2fed89fd1a922faa0ae74481f8458af2ee4';

// Creates a watcher instance
const watcher = sdk.watchDeploy(events_address);

// Create a callback function handler of your design
const getEventHandlerFn = (deployHash: string) => {
  const eventHandlerFn = (eventParseResult: EventParseResult) => {
    console.log(`callback for ${deployHash}`);
    if (eventParseResult.err) {
      return false;
    } else if (
      eventParseResult.body?.DeployProcessed?.execution_result.Success
    ) {
      console.log(
        eventParseResult.body?.DeployProcessed?.execution_result.Success
      );
      return true;
    } else {
      console.error(
        eventParseResult.body?.DeployProcessed?.execution_result.Failure
      );
      return false;
    }
  };
  return eventHandlerFn;
};

const eventHandlerFn = getEventHandlerFn(deploy_hash);

const deploySubscription: DeploySubscription = new DeploySubscription(
  deploy_hash,
  eventHandlerFn
);
const deploySubscriptions: DeploySubscription[] = [deploySubscription];

// Subscribe and start watching
watcher.subscribe(deploySubscriptions);
const results = await watcher.start();
watcher.stop();
console.log(results);
```

</details>

</details>

<details>
    <summary><strong><code>CEP-78</code></strong></summary>

#### Install

- <strong>Rust</strong>

```rust
use casper_rust_wasm_sdk::{
    helpers::json_pretty_print,
    types::{
        deploy_hash::DeployHash,
        deploy_params::{
            deploy_str_params::DeployStrParams, payment_str_params::PaymentStrParams,
            session_str_params::SessionStrParams,
        },
    },
};

pub const CHAIN_NAME: &str = "casper-net-1";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----"#;
pub const ARGS_JSON: &str = r#"[
{"name": "collection_name", "type": "String", "value": "enhanced-nft-1"},
{"name": "collection_symbol", "type": "String", "value": "ENFT-1"},
{"name": "total_token_supply", "type": "U64", "value": 10},
{"name": "ownership_mode", "type": "U8", "value": 0},
{"name": "nft_kind", "type": "U8", "value": 1},
{"name": "allow_minting", "type": "Bool", "value": true},
{"name": "owner_reverse_lookup_mode", "type": "U8", "value": 0},
{"name": "nft_metadata_kind", "type": "U8", "value": 2},
{"name": "identifier_mode", "type": "U8", "value": 0},
{"name": "metadata_mutability", "type": "U8", "value": 0},
{"name": "events_mode", "type": "U8", "value": 1}
]"#;
pub const PAYMENT_AMOUNT_CONTRACT_CEP78: &str = "500000000000";
pub const CEP78_CONTRACT: &str = "cep78.wasm";
pub const DEPLOY_TIME: Duration = time::Duration::from_millis(45000);

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY,
    Some(SECRET_KEY.to_string()),
    None,
    None,
);

let session_params = SessionStrParams::default();
session_params.set_session_args_json(ARGS_JSON);

let file_path = CEP78_CONTRACT;
let module_bytes = match read_wasm_file(file_path) {
    Ok(module_bytes) => module_bytes,
    Err(err) => {
        return Err(format!("Error reading file {}: {:?}", file_path, err));
    }
};

session_params.set_session_bytes(module_bytes.into());

let install = sdk
    .install(deploy_params, session_params, PAYMENT_AMOUNT_CONTRACT_CEP78, None)
    .await;

let deploy_hash_result = install.as_ref().unwrap().result.deploy_hash;
println!("{:?}", deploy_hash_result);

println!("wait {:?}", DEPLOY_TIME);
thread::sleep(DEPLOY_TIME); // Let's wait for deployment

let finalized_approvals = true;
let deploy_hash = DeployHash::from(deploy_hash_result);
let get_deploy = sdk
    .get_deploy(deploy_hash, Some(finalized_approvals), None, None)
    .await;
let get_deploy = get_deploy.unwrap();
let result = &get_deploy.result.execution_results.get(0).unwrap().result;
println!("{}", json_pretty_print(result, Some(Verbosity::High))).unwrap();
```

with

```rust
fn read_wasm_file(file_path: &str) -> Result<Vec<u8>, io::Error> {
    let root_path = Path::new("./wasm/");
    let path = root_path.join(file_path);
    let mut file = File::open(path)?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;
    Ok(buffer)
}
```

- <strong>Typescript</strong>

```ts
import {
  ...
  DeployStrParams,
  SessionStrParams,
  PaymentStrParams,
  publicKeyFromSecretKey,
  Bytes,
} from 'casper-rust-wasm-sdk';

const chain_name = 'casper-net-1';
  const secret_key = `-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----`;
const public_key = publicKeyFromSecretKey(secret_key);
const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

const session_params = new SessionStrParams();
session_params.session_args_json = JSON.stringify([
  {"name": "collection_name", "type": "String", "value": "enhanced-nft-1"},
  {"name": "collection_symbol", "type": "String", "value": "ENFT-1"},
  {"name": "total_token_supply", "type": "U64", "value": 10},
  {"name": "ownership_mode", "type": "U8", "value": 0},
  {"name": "nft_kind", "type": "U8", "value": 1},
  {"name": "allow_minting", "type": "Bool", "value": true},
  {"name": "owner_reverse_lookup_mode", "type": "U8", "value": 0},
  {"name": "nft_metadata_kind", "type": "U8", "value": 2},
  {"name": "identifier_mode", "type": "U8", "value": 0},
  {"name": "metadata_mutability", "type": "U8", "value": 0},
  {"name": "events_mode", "type": "U8", "value": 1}
]);
const payment_amount = '500000000000';

const buffer = await loadFile();
const wasm = buffer && new Uint8Array(buffer);
const wasmBuffer = wasm?.buffer;
if (!wasmBuffer) {
  console.error('Failed to read wasm file.');
  return;
}

session_params.session_bytes = Bytes.fromUint8Array(wasm);

const install_result = await sdk.install(
  deploy_params,
  session_params,
  payment_amount
);
const install_result_as_json = install_result.toJson();
console.log(install_result_as_json.deploy_hash);
```

with

```ts
async function loadFile() {
  try {
    const fileBuffer = await fs.readFile('cep78.wasm');
    return fileBuffer.buffer; // Returns an ArrayBuffer
  } catch (error) {
    throw new Error('Error reading file: ' + error.message);
  }
}
```

#### Mint

- <strong>Rust</strong>

```rust
pub const CHAIN_NAME: &str = "casper-net-1";
pub const PUBLIC_KEY: &str =
    "0169d8d607f3ba04c578140398ceb1bd5296c653f965256bd7097982b9026c5129";
pub const SECRET_KEY: &str = r#"-----BEGIN PRIVATE KEY-----
    -----END PRIVATE KEY-----"#;
pub const CONTRACT_HASH: &str =
    "hash-c12808431d490e2c463c2f968d0a4eaa0f9d57842508d9041aa42e2bd21eb96c";
pub const ENTRYPOINT_MINT: &str = "mint";
pub const TOKEN_OWNER: &str =
    "account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611";
pub const PAYMENT_AMOUNT: &str = "5000000000";

let deploy_params = DeployStrParams::new(
    CHAIN_NAME,
    PUBLIC_KEY,
    Some(SECRET_KEY.to_string()),
    None,
    None,
);
let mut session_params = SessionStrParams::default();
session_params.set_session_hash(CONTRACT_HASH);
session_params.set_session_entry_point(ENTRYPOINT_MINT);

let args = Vec::from([
    "token_meta_data:String='test_meta_data'".to_string(),
    format!("token_owner:Key='{TOKEN_OWNER}'").to_string(),
]);
session_params.set_session_args(args);

let payment_params = PaymentStrParams::default();
payment_params.set_payment_amount(PAYMENT_AMOUNT);
let call_entrypoint = sdk
    .call_entrypoint(deploy_params, session_params, payment_params, None)
    .await;
let deploy_hash_result = call_entrypoint.as_ref().unwrap().result.deploy_hash;
println!("{:?}", deploy_hash_result);
```

- <strong>Typescript</strong>

```ts
import {
  ...
  DeployStrParams,
  SessionStrParams,
  PaymentStrParams,
  publicKeyFromSecretKey,
  Bytes,
} from 'casper-rust-wasm-sdk';

const chain_name = 'casper-net-1';
const secret_key = '';
const public_key = publicKeyFromSecretKey(secret_key);
const contract_hash =
  'hash-5be5b0ef09a7016e11292848d77f539e55791cb07a7012fbc336b1f92a4fe743';
const entry_point = 'mint';
const token_owner = 'account-hash-878985c8c07064e09e67cc349dd21219b8e41942a0adc4bfa378cf0eace32611';

const deploy_params = new DeployStrParams(chain_name, public_key, secret_key);

const session_params = new SessionStrParams();
session_params.session_hash = contract_hash;
session_params.session_entry_point = entry_point;
session_params.session_args_simple = ["token_meta_data:String='test_meta_data'", `token_owner:Key='${token_owner}'`];

const call_entrypoint_result = await sdk.call_entrypoint(
  deploy_params,
  session_params,
  payment_amount
);
const call_entrypoint_result_as_json = call_entrypoint_result.toJson();
console.log(call_entrypoint_result_as_json.deploy_hash);
```

</details>

### Desktop Electron demo app

<details open>
  <summary><strong><code>Example of usage of the SDK in a Desktop application</code></strong></summary>

<br>

![Casper Electron App](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/blob/dev-1.6/docs/images/get_status-electron.png)

The Electron based demo app loads the Angular example build. You can use this app on your computer to test every action the SDK can take.

```shell
$ cd ./examples/desktop/electron
$ npm install
$ npm start
$ npm build
```

You can download an alpha version of the app illustrating the SDK here:

- [Microsoft Windows](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/raw/dev-1.6/examples/desktop/electron/release/Casper%20Webclient%201.0.0.exe)
- [GNU/Linux AppImage](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/blob/dev-1.6/examples/desktop/electron/release/Casper%20Webclient-1.0.0.AppImage)
- [GNU/Linux Snap](https://github.com/casper-ecosystem/casper-rust-wasm-sdk/raw/dev-1.6/examples/desktop/electron/release/casper-webclient_1.0.0_amd64.snap)
- [Mac][TODO]

</details>

---

<br>

## Rust API

- [Modules and Structs](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-rust/casper_rust_wasm_sdk/)

- [Full item list](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-rust/casper_rust_wasm_sdk/all.html)

### SDK

- [SDK Struct and methods](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-rust/casper_rust_wasm_sdk/struct.SDK.html)

### RPC

- [RPC List](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-rust/casper_rust_wasm_sdk/rpcs/index.html)

### Deploy Params

- [Params and Args simple](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-rust/casper_rust_wasm_sdk/types/deploy_params/index.html)

### Deploy

- [Deploy Type and static builder](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-rust/casper_rust_wasm_sdk/types/deploy/struct.Deploy.html)

### Deploy Watcher

- [Deploy Watcher](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-rust/casper_rust_wasm_sdk/deploy_watcher/index.html)
- [DeploySubscription](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-rust/casper_rust_wasm_sdk/deploy_watcher/struct.DeploySubscription.html)
- [EventParseResult](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-rust/casper_rust_wasm_sdk/deploy_watcher/struct.EventParseResult.html)

### Types

- [Current exposed types](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-rust/casper_rust_wasm_sdk/types/index.html)

### Helpers functions

- [Rust helpers](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-rust/casper_rust_wasm_sdk/helpers/index.html)

## Typescript API

- [Full item list](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-wasm/index.html)

### SDK

- [SDK Class and methods](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-wasm/classes/SDK.html)

### Deploy Params

- [Deploy Params](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-wasm/classes/DeployStrParams.html)
- [Session Params](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-wasm/classes/SessionStrParams.html)
- [Payment Params](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-wasm/classes/PaymentStrParams.html)
- [Dictionary Item Params](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-wasm/classes/DictionaryItemStrParams.html)

### Deploy

- [Deploy Type and static builder](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-wasm/classes/Deploy.html)

### Deploy Watcher

- [Deploy Watcher](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-wasm/classes/DeployWatcher.html)
- [DeploySubscription](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-wasm/classes/DeploySubscription.html)
- [EventParseResult](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-wasm/classes/EventParseResult.html)

### Types

- [Current exposed types](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-wasm/modules.html)

### Helpers functions

- [TS helpers](https://casper-ecosystem.github.io/casper-rust-wasm-sdk/juliet/api-wasm/modules.html#Functions)

## Casper Wallet

In Typescript the `window.CasperWalletProvider` is wrapped into `CasperWallet` Class.
Two ways to sign a deploy, either signDeploy

```ts
deploy = await wallet.signDeploy(deploy, public_key); // public_key can be undefined for current active address in the wallet
```

or signDeployHash and adding signature to the deploy

```ts
const public_key = await wallet.getActivePublicKey();
const signature = await wallet.signDeployHash(
  deploy.hash.toString(),
  public_key
);
signature && (deploy = deploy.addSignature(public_key, signature));
```

## Testing

Tests are run against NCTL by default. Alternately, you may configure another network in corresponding configuration. Tests assume a `secret_key.pem` will be located in the root `tests` directory, or one level higher at `../NCTL/casper-node/utils/nctl/assets/net-1/users/user-1/`. This path can be changed in the configuration or .env file.
(Rust tests must be run with `--test-threads=1`)

- Unit tests can be run at root folder with

```shell
make test
```

[configured with .env](.env) or [configured in module](src/sdk/rpcs/mod.rs)

- [Rust Integration tests](tests/integration/rust/) can be run with

```shell
make integration-test
```

[configured in config](tests/integration/rust/src/config.rs)

- [Jest/Puppeteer E2E tests](tests/e2e/) can be run with

```shell
cd tests/e2e/puppeteer
npm install
```

then

```shell
make e2e-test
```

[configured with .env](.env) or [puppeteer config](tests/e2e/puppeteer/config.ts)

`SECRET_KEY_NCTL_PATH` (alternative is direct keys `SECRET_KEY_USER_1` and `SECRET_KEY_USER_2` from [casper-node-launcher-js](https://github.com/casper-network/casper-node-launcher-js/tree/main) )

Example of .env

```
SECRET_KEY_NCTL_PATH=/casper/casper-nctl-2-docker/assets/users/user-1/
# SECRET_KEY_USER_1 = MC4CAQAwBQYDK2VwBCIEII8ULlk1CJ12ZQ+bScjBt/IxMAZNggClWqK56D1/7CbI
# SECRET_KEY_USER_2 = MC4CAQAwBQYDK2VwBCIEIJTD9IlUYzuMHbvAiFel/uqd6V7vUtUD19IEQlo6SAFC
# NODE_ADDRESS=http://localhost:7777
# EVENTS_ADDRESS=http://localhost:9999/events/main
# SPECULATIVE_ADDRESS=http://localhost:7778
# CHAIN_NAME=casper-net-1
# SECRET_KEY_NAME=secret_key.pem
```

## Todo

- Expose more CL Types and Casper Client result Types
- EventStream for other events than transaction processed

⚠ **Reminder**: Do not use private keys or perform real transactions on the testnet/mainnet unless you are fully aware of the security risks.
