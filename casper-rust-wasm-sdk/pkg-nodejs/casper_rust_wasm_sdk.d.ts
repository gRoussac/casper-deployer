/* tslint:disable */
/* eslint-disable */
/**
 * Converts a hexadecimal string to a regular string.
 *
 * # Arguments
 *
 * * `hex_string` - The hexadecimal string to convert.
 *
 * # Returns
 *
 * A regular string containing the converted value.
 */
export function hexToString(hex_string: string): string;
/**
 * Converts a hexadecimal string to a Uint8Array.
 *
 * # Arguments
 *
 * * `hex_string` - The hexadecimal string to convert.
 *
 * # Returns
 *
 * A Uint8Array containing the converted value.
 */
export function hexToUint8Array(hex_string: string): Uint8Array;
/**
 * Converts a Uint8Array to a `Bytes` object.
 *
 * # Arguments
 *
 * * `uint8_array` - The Uint8Array to convert.
 *
 * # Returns
 *
 * A `Bytes` object containing the converted value.
 */
export function uint8ArrayToBytes(uint8_array: Uint8Array): Bytes;
/**
 * Converts motes to CSPR (Casper tokens).
 *
 * # Arguments
 *
 * * `motes` - The motes value to convert.
 *
 * # Returns
 *
 * A string representing the CSPR amount.
 */
export function motesToCSPR(motes: string): string;
/**
 * Pretty prints a JSON value.
 *
 * # Arguments
 *
 * * `value` - The JSON value to pretty print.
 * * `verbosity` - An optional verbosity level for pretty printing.
 *
 * # Returns
 *
 * A pretty printed JSON value as a JsValue.
 */
export function jsonPrettyPrint(value: any, verbosity?: Verbosity | null): any;
/**
 * Converts a secret key to a corresponding public key.
 *
 * # Arguments
 *
 * * `secret_key` - The secret key in PEM format.
 *
 * # Returns
 *
 * A JsValue containing the corresponding public key.
 * If an error occurs during the conversion, JavaScript error is returned.
 */
export function publicKeyFromSecretKey(secret_key: string): any;
/**
 * Generates a secret key using the Ed25519 algorithm and returns it as a PEM-encoded string.
 *
 * # Returns
 *
 * A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
 *
 * # Errors
 *
 * Returns an error if the secret key generation or serialization fails.
 */
export function generateSecretKey(): any;
/**
 * Generates a secret key using the secp256k1 algorithm and returns it as a PEM-encoded string.
 *
 * # Returns
 *
 * A `JsValue` containing the PEM-encoded secret key or a JavaScript error if an error occurs.
 *
 * # Errors
 *
 * Returns an error if the secret key generation or serialization fails.
 */
export function generateSecretKey_secp256k1(): any;
/**
 * Converts a formatted account hash to a base64-encoded string (cep-18 key encoding).
 *
 *
 * # Arguments
 *
 * * `formatted_account_hash` - A hex-formatted string representing the account hash.
 * Example: "account-hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f"
 *
 * # Returns
 *
 * Returns the base64-encoded string.
 * Example: "ALSFwHTO98yszQMClJ0gQ6txM6vbFM+ofoOSlFwL2Apf"
 */
export function accountHashToBase64Key(formatted_account_hash: string): string;
/**
 * Converts a formatted key hash to a base64-encoded string (CEP-18 key encoding) for use in JavaScript.
 *
 * This function acts as a wrapper around `get_base64_key_from_key_hash` and maps errors to JavaScript-compatible errors.
 *
 * # Arguments
 *
 * * `formatted_key_hash` - A hex-formatted string representing the key hash.
 * Example: "hash-b485c074cef7ccaccd0302949d2043ab7133abdb14cfa87e8392945c0bd80a5f"
 *
 * # Returns
 *
 * Returns a `Result` containing the base64-encoded string on success.
 * Example: "AbSFwHTO98yszQMClJ0gQ6txM6vbFM+ofoOSlFwL2Apf"
 *
 * # Errors
 *
 * This function returns a `JsError` if:
 * - The input string is not a valid formatted key hash.
 * - The conversion to bytes or base64 encoding fails.
 *
 * The error message is formatted as a JavaScript-compatible string.
 */
export function keyHashToBase64Key(formatted_key_hash: string): string;
/**
 * Gets the current timestamp.
 *
 * # Returns
 *
 * A JsValue containing the current timestamp.
 */
export function getTimestamp(): any;
/**
 * Encodes the given metadata using the lower-level Blake2b hashing algorithm.
 *
 * # Arguments
 *
 * * `meta_data` - A string containing the metadata to be hashed.
 *
 * # Returns
 *
 * A JsValue containing the hash generated using the Blake2b algorithm.
 */
export function encodeLowerBlake2b(meta_data: string): any;
/**
 * Converts a key and value into a formatted dictionary item key for ditionaries queries.
 *
 * # Arguments
 *
 * * `key` - A string representation of a account/contract hash as a Key.
 * * `value` - A string representation of the value, for now restricted to parse as U256 or Key
 *
 * # Returns
 *
 * A string representing the formatted dictionary item key.
 */
export function makeDictionaryItemKey(key: Key, value: string): string;
export enum CLTypeEnum {
  Bool = 0,
  I32 = 1,
  I64 = 2,
  U8 = 3,
  U32 = 4,
  U64 = 5,
  U128 = 6,
  U256 = 7,
  U512 = 8,
  Unit = 9,
  String = 10,
  Key = 11,
  URef = 12,
  PublicKey = 13,
  Option = 14,
  List = 15,
  ByteArray = 16,
  Result = 17,
  Map = 18,
  Tuple1 = 19,
  Tuple2 = 20,
  Tuple3 = 21,
  Any = 22,
}
export enum Verbosity {
  Low = 0,
  Medium = 1,
  High = 2,
}
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */
type ReadableStreamType = "bytes";
export class AccessRights {
  free(): void;
  static NONE(): number;
  static READ(): number;
  static WRITE(): number;
  static ADD(): number;
  static READ_ADD(): number;
  static READ_WRITE(): number;
  static ADD_WRITE(): number;
  static READ_ADD_WRITE(): number;
  constructor(access_rights: number);
  static from_bits(read: boolean, write: boolean, add: boolean): AccessRights;
  is_readable(): boolean;
  is_writeable(): boolean;
  is_addable(): boolean;
  is_none(): boolean;
}
export class AccountHash {
  free(): void;
  constructor(account_hash_hex_str: string);
  static fromFormattedStr(formatted_str: string): AccountHash;
  static fromPublicKey(public_key: PublicKey): AccountHash;
  toFormattedString(): string;
  toHexString(): string;
  static fromUint8Array(bytes: Uint8Array): AccountHash;
  toJson(): any;
}
export class AccountIdentifier {
  free(): void;
  constructor(formatted_str: string);
  static fromFormattedStr(formatted_str: string): AccountIdentifier;
  static fromPublicKey(key: PublicKey): AccountIdentifier;
  static fromAccountHash(account_hash: AccountHash): AccountIdentifier;
  toJson(): any;
}
export class ArgsSimple {
  private constructor();
  free(): void;
}
export class BlockHash {
  free(): void;
  constructor(block_hash_hex_str: string);
  static fromDigest(digest: Digest): BlockHash;
  toJson(): any;
  toString(): string;
}
export class BlockIdentifier {
  free(): void;
  constructor(block_identifier: BlockIdentifier);
  static from_hash(hash: BlockHash): BlockIdentifier;
  static fromHeight(height: bigint): BlockIdentifier;
  toJson(): any;
}
/**
 * Represents the body of an event, containing processed deploy information.
 */
export class Body {
  private constructor();
  free(): void;
  get DeployProcessed(): DeployProcessed | undefined;
  set DeployProcessed(value: DeployProcessed | null | undefined);
}
export class Bytes {
  free(): void;
  constructor();
  static fromUint8Array(uint8_array: Uint8Array): Bytes;
}
export class CLType {
  free(): void;
  static Bool(): CLType;
  static I32(): CLType;
  static I64(): CLType;
  static U8(): CLType;
  static U32(): CLType;
  static U64(): CLType;
  static U128(): CLType;
  static U256(): CLType;
  static U512(): CLType;
  static Unit(): CLType;
  static String(): CLType;
  static Key(): CLType;
  static URef(): CLType;
  static PublicKey(): CLType;
  static Option(_inner_type: CLType): CLType;
  static List(_inner_type: CLType): CLType;
  static ByteArray(): CLType;
  static Result(_inner_type: CLType, _error_type: CLType): CLType;
  static Map(_key_type: CLType, _value_type: CLType): CLType;
  static Tuple1(_value_type: CLType): CLType;
  static Tuple2(_value_type: CLType, _value_type2: CLType): CLType;
  static Tuple3(_value_type: CLType, _value_type2: CLType, _value_type3: CLType): CLType;
  static Any(): CLType;
  constructor(cl_type: CLTypeEnum);
  toString(): string;
}
export class CasperWallet {
  free(): void;
  constructor();
  /**
   * Signs a deploy with the provided or active public key.
   *
   * This function requests a connection to the wallet, retrieves the public key
   * (either provided or active), serializes the deploy, signs it, and returns the
   * signed deploy.
   *
   * # Arguments
   *
   * * `deploy` - The deploy object to be signed.
   * * `public_key` - An optional public key string. If `None`, the active public key is used.
   *
   * # Returns
   *
   * * `Ok(Deploy)` - The signed deploy object.
   * * `Err(JsError)` - An error if the connection fails, the public key retrieval fails,
   *   the serialization fails, the signing fails, or if the signing is cancelled.
   *
   * # Errors
   *
   * This function returns a `JsError` if:
   * * The connection to the wallet could not be established.
   * * The public key could not be retrieved.
   * * The deploy serialization fails.
   * * The signing operation fails.
   * * The signing is cancelled by the user.
   */
  signDeploy(deploy: Deploy, public_key?: string | null): Promise<Deploy>;
  /**
   * Alias for the `sign_message` function, specifically for signing deploy hashes.
   *
   * This function calls `sign_message` to sign the provided deploy hash with the
   * given or active public key.
   *
   * # Arguments
   *
   * * `deploy_hash` - The deploy hash string to be signed.
   * * `public_key` - An optional public key string. If `None`, the active public key is used.
   *
   * # Returns
   *
   * * `Ok(String)` - The signature string.
   * * `Err(JsError)` - An error if the signing process fails.
   *
   * # Alias
   *
   * This function is available as `signDeployHash`.
   */
  signDeployHash(deploy_hash: string, public_key?: string | null): Promise<string>;
  /**
   * Signs a message with the provided or active public key.
   *
   * This function requests a connection to the wallet, retrieves the public key
   * (either provided or active), signs the message, and returns the signature.
   *
   * # Arguments
   *
   * * `message` - The message string to be signed.
   * * `public_key` - An optional public key string. If `None`, the active public key is used.
   *
   * # Returns
   *
   * * `Ok(String)` - The signature string.
   * * `Err(JsError)` - An error if the connection fails, the public key retrieval fails,
   *   the signing fails, or if the signing is cancelled.
   *
   * # Errors
   *
   * This function returns a `JsError` if:
   * * The connection to the wallet could not be established.
   * * The public key could not be retrieved.
   * * The signing operation fails.
   * * The signing is cancelled by the user.
   */
  signMessage(message: string, public_key?: string | null): Promise<string>;
  connect(): Promise<boolean>;
  disconnect(): Promise<boolean>;
  isConnected(): Promise<boolean>;
  getVersion(): Promise<string>;
  getActivePublicKey(): Promise<string>;
  switchAccount(): Promise<boolean>;
}
export class ContractHash {
  free(): void;
  constructor(contract_hash_hex_str: string);
  static fromFormattedStr(formatted_str: string): ContractHash;
  toFormattedString(): string;
  static fromUint8Array(bytes: Uint8Array): ContractHash;
}
export class ContractPackageHash {
  free(): void;
  constructor(contract_package_hash_hex_str: string);
  static fromFormattedStr(formatted_str: string): ContractPackageHash;
  toFormattedString(): string;
  static fromUint8Array(bytes: Uint8Array): ContractPackageHash;
}
export class Deploy {
  free(): void;
  constructor(deploy: any);
  toJson(): any;
  static withPaymentAndSession(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): Deploy;
  static withTransfer(amount: string, target_account: string, transfer_id: string | null | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Deploy;
  withTTL(ttl: string, secret_key?: string | null): Deploy;
  withTimestamp(timestamp: string, secret_key?: string | null): Deploy;
  withChainName(chain_name: string, secret_key?: string | null): Deploy;
  withAccount(account: PublicKey, secret_key?: string | null): Deploy;
  withEntryPointName(entry_point_name: string, secret_key?: string | null): Deploy;
  withHash(hash: ContractHash, secret_key?: string | null): Deploy;
  withPackageHash(package_hash: ContractPackageHash, secret_key?: string | null): Deploy;
  withModuleBytes(module_bytes: Bytes, secret_key?: string | null): Deploy;
  withSecretKey(secret_key?: string | null): Deploy;
  withStandardPayment(amount: string, secret_key?: string | null): Deploy;
  withPayment(payment: any, secret_key?: string | null): Deploy;
  withSession(session: any, secret_key?: string | null): Deploy;
  validateDeploySize(): boolean;
  sign(secret_key: string): Deploy;
  addSignature(public_key: string, signature: string): Deploy;
  TTL(): string;
  timestamp(): string;
  chainName(): string;
  account(): string;
  args(): any;
  addArg(js_value_arg: any, secret_key?: string | null): Deploy;
  readonly hash: DeployHash;
}
export class DeployHash {
  free(): void;
  constructor(deploy_hash_hex_str: string);
  static fromDigest(digest: Digest): DeployHash;
  toJson(): any;
  toString(): string;
}
/**
 * Represents processed deploy information.
 */
export class DeployProcessed {
  private constructor();
  free(): void;
  deploy_hash: string;
  account: string;
  timestamp: string;
  ttl: string;
  dependencies: string[];
  block_hash: string;
  /**
   * Result of the execution, either Success or Failure.
   */
  execution_result: ExecutionResult;
}
export class DeployStrParams {
  free(): void;
  constructor(chain_name: string, session_account: string, secret_key?: string | null, timestamp?: string | null, ttl?: string | null);
  setDefaultTimestamp(): void;
  setDefaultTTL(): void;
  get secret_key(): string | undefined;
  set secret_key(value: string);
  get timestamp(): string | undefined;
  set timestamp(value: string | null | undefined);
  get ttl(): string | undefined;
  set ttl(value: string | null | undefined);
  get chain_name(): string | undefined;
  set chain_name(value: string);
  get session_account(): string | undefined;
  set session_account(value: string);
}
/**
 * Represents a subscription to deploy events for wasm32 target architecture.
 */
export class DeploySubscription {
  free(): void;
  /**
   * Constructor for DeploySubscription for wasm32 target architecture.
   *
   * # Arguments
   *
   * * `deploy_hash` - Deploy hash to identify the subscription.
   * * `event_handler_fn` - Handler function for deploy events.
   */
  constructor(deploy_hash: string, event_handler_fn: Function);
  /**
   * Deploy hash to identify the subscription.
   */
  deployHash: string;
  /**
   * Handler function for deploy events.
   */
  eventHandlerFn: Function;
}
/**
 * Represents a deploy watcher responsible for monitoring deploy events.
 *
 * This struct allows clients to subscribe to deploy events, start watching for events,
 * or wait for an event and handle the received deploy event data.
 *
 * # Fields
 *
 * * `events_url` - The URL for deploy events.
 * * `deploy_subscriptions` - Vector containing deploy subscriptions.
 * * `active` - Reference-counted cell indicating whether the deploy watcher is active.
 * * `timeout_duration` - Duration representing the optional timeout for watching events.
 */
export class DeployWatcher {
  free(): void;
  /**
   * Creates a new `DeployWatcher` instance.
   *
   * # Arguments
   *
   * * `events_url` - The URL for deploy events.
   * * `timeout_duration` - Optional duration in milliseconds for watching events. If not provided,
   *   a default timeout of 60,000 milliseconds (1 minute) is used.
   *
   * # Returns
   *
   * A new `DeployWatcher` instance.
   */
  constructor(events_url: string, timeout_duration?: bigint | null);
  /**
   * Subscribes to deploy events.
   *
   * # Arguments
   *
   * * `deploy_subscriptions` - Vector of deploy subscriptions to be added.
   *
   * # Returns
   *
   * Result indicating success or an error message.
   */
  subscribe(deploy_subscriptions: DeploySubscription[]): void;
  /**
   * Unsubscribes from deploy events based on the provided deploy hash.
   *
   * # Arguments
   *
   * * `deploy_hash` - The deploy hash to unsubscribe.
   *
   * This method removes the deploy subscription associated with the provided deploy hash.
   */
  unsubscribe(deploy_hash: string): void;
  /**
   * Starts watching for deploy events (JavaScript-friendly).
   *
   * # Returns
   *
   * Result containing the serialized deploy events data or an error message.
   */
  start(): Promise<any>;
  /**
   * Stops watching for deploy events.
   *
   * This method sets the deploy watcher as inactive and stops the event listener if it exists.
   */
  stop(): void;
}
export class DictionaryAddr {
  free(): void;
  constructor(bytes: Uint8Array);
}
export class DictionaryItemIdentifier {
  private constructor();
  free(): void;
  static newFromAccountInfo(account_hash: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
  static newFromContractInfo(contract_addr: string, dictionary_name: string, dictionary_item_key: string): DictionaryItemIdentifier;
  static newFromSeedUref(seed_uref: string, dictionary_item_key: string): DictionaryItemIdentifier;
  static newFromDictionaryKey(dictionary_key: string): DictionaryItemIdentifier;
  toJson(): any;
}
export class DictionaryItemStrParams {
  free(): void;
  constructor();
  setAccountNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
  setContractNamedKey(key: string, dictionary_name: string, dictionary_item_key: string): void;
  setUref(seed_uref: string, dictionary_item_key: string): void;
  setDictionary(value: string): void;
  toJson(): any;
}
export class Digest {
  free(): void;
  constructor(digest_hex_str: string);
  static fromString(digest_hex_str: string): Digest;
  static fromRaw(bytes: Uint8Array): Digest;
  toJson(): any;
  toString(): string;
}
export class EraId {
  free(): void;
  constructor(value: bigint);
  value(): bigint;
}
/**
 * Represents the result of parsing an event, containing error information and the event body.
 */
export class EventParseResult {
  private constructor();
  free(): void;
  get err(): string | undefined;
  set err(value: string | null | undefined);
  get body(): Body | undefined;
  set body(value: Body | null | undefined);
}
/**
 * Represents the result of an execution, either Success or Failure.
 */
export class ExecutionResult {
  private constructor();
  free(): void;
  /**
   * Optional Success information.
   */
  get Success(): Success | undefined;
  /**
   * Optional Success information.
   */
  set Success(value: Success | null | undefined);
  /**
   * Optional Failure information.
   */
  get Failure(): Failure | undefined;
  /**
   * Optional Failure information.
   */
  set Failure(value: Failure | null | undefined);
}
/**
 * Represents a failure response containing an error message.
 */
export class Failure {
  private constructor();
  free(): void;
  error_message: string;
}
export class GetAccountResult {
  private constructor();
  free(): void;
  toJson(): any;
  readonly api_version: any;
  readonly account: any;
  readonly merkle_proof: string;
}
export class GetAuctionInfoResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetAuctionInfoResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the auction state as a JsValue.
   */
  readonly auction_state: any;
}
export class GetBalanceResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetBalanceResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the balance value as a JsValue.
   */
  readonly balance_value: any;
  /**
   * Gets the Merkle proof as a string.
   */
  readonly merkle_proof: string;
}
export class GetBlockResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetBlockResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the block information as a JsValue.
   */
  readonly block: any;
}
export class GetBlockTransfersResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetBlockTransfersResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the block hash as an Option<BlockHash>.
   */
  readonly block_hash: BlockHash | undefined;
  /**
   * Gets the transfers as a JsValue.
   */
  readonly transfers: any;
}
/**
 * A struct representing the result of the `get_chainspec` function.
 */
export class GetChainspecResult {
  private constructor();
  free(): void;
  /**
   * Converts the `GetChainspecResult` to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the chainspec bytes as a JsValue.
   */
  readonly chainspec_bytes: any;
}
export class GetDeployResult {
  private constructor();
  free(): void;
  /**
   * Converts the result to a JSON JavaScript value.
   */
  toJson(): any;
  /**
   * Gets the API version as a JavaScript value.
   */
  readonly api_version: any;
  /**
   * Gets the deploy information.
   */
  readonly deploy: Deploy;
}
export class GetDictionaryItemResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetDictionaryItemResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the dictionary key as a String.
   */
  readonly dictionary_key: string;
  /**
   * Gets the stored value as a JsValue.
   */
  readonly stored_value: any;
  /**
   * Gets the merkle proof as a String.
   */
  readonly merkle_proof: string;
}
export class GetEraInfoResult {
  private constructor();
  free(): void;
  toJson(): any;
  readonly api_version: any;
  readonly era_summary: any;
}
/**
 * Wrapper struct for the `GetEraSummaryResult` from casper_client.
 */
export class GetEraSummaryResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetEraSummaryResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the era summary as a JsValue.
   */
  readonly era_summary: any;
}
/**
 * Wrapper struct for the `GetNodeStatusResult` from casper_client.
 */
export class GetNodeStatusResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetNodeStatusResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the chainspec name as a String.
   */
  readonly chainspec_name: string;
  /**
   * Gets the starting state root hash as a Digest.
   */
  readonly starting_state_root_hash: Digest;
  /**
   * Gets the list of peers as a JsValue.
   */
  readonly peers: any;
  /**
   * Gets information about the last added block as a JsValue.
   */
  readonly last_added_block_info: any;
  /**
   * Gets the public signing key as an Option<PublicKey>.
   */
  readonly our_public_signing_key: PublicKey | undefined;
  /**
   * Gets the round length as a JsValue.
   */
  readonly round_length: any;
  /**
   * Gets information about the next upgrade as a JsValue.
   */
  readonly next_upgrade: any;
  /**
   * Gets the build version as a String.
   */
  readonly build_version: string;
  /**
   * Gets the uptime information as a JsValue.
   */
  readonly uptime: any;
  /**
   * Gets the reactor state information as a JsValue.
   */
  readonly reactor_state: any;
  /**
   * Gets the last progress information as a JsValue.
   */
  readonly last_progress: any;
  /**
   * Gets the available block range as a JsValue.
   */
  readonly available_block_range: any;
  /**
   * Gets the block sync information as a JsValue.
   */
  readonly block_sync: any;
}
/**
 * A wrapper for the `GetPeersResult` type from the Casper client.
 */
export class GetPeersResult {
  private constructor();
  free(): void;
  /**
   * Converts the result to JSON format as a JavaScript value.
   */
  toJson(): any;
  /**
   * Gets the API version as a JSON value.
   */
  readonly api_version: any;
  /**
   * Gets the peers as a JSON value.
   */
  readonly peers: any;
}
/**
 * Wrapper struct for the `GetStateRootHashResult` from casper_client.
 */
export class GetStateRootHashResult {
  private constructor();
  free(): void;
  /**
   * Alias for state_root_hash_as_string
   */
  toString(): string;
  /**
   * Converts the GetStateRootHashResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the state root hash as an Option<Digest>.
   */
  readonly state_root_hash: Digest | undefined;
  /**
   * Gets the state root hash as a String.
   */
  readonly state_root_hash_as_string: string;
}
/**
 * Wrapper struct for the `GetValidatorChangesResult` from casper_client.
 */
export class GetValidatorChangesResult {
  private constructor();
  free(): void;
  /**
   * Converts the GetValidatorChangesResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the validator changes as a JsValue.
   */
  readonly changes: any;
}
export class GlobalStateIdentifier {
  free(): void;
  constructor(global_state_identifier: GlobalStateIdentifier);
  static fromBlockHash(block_hash: BlockHash): GlobalStateIdentifier;
  static fromBlockHeight(block_height: bigint): GlobalStateIdentifier;
  static fromStateRootHash(state_root_hash: Digest): GlobalStateIdentifier;
  toJson(): any;
}
export class HashAddr {
  free(): void;
  constructor(bytes: Uint8Array);
}
export class IntoUnderlyingByteSource {
  private constructor();
  free(): void;
  start(controller: ReadableByteStreamController): void;
  pull(controller: ReadableByteStreamController): Promise<any>;
  cancel(): void;
  readonly type: ReadableStreamType;
  readonly autoAllocateChunkSize: number;
}
export class IntoUnderlyingSink {
  private constructor();
  free(): void;
  write(chunk: any): Promise<any>;
  close(): Promise<any>;
  abort(reason: any): Promise<any>;
}
export class IntoUnderlyingSource {
  private constructor();
  free(): void;
  pull(controller: ReadableStreamDefaultController): Promise<any>;
  cancel(): void;
}
export class Key {
  free(): void;
  constructor(key: Key);
  toJson(): any;
  static fromURef(key: URef): Key;
  static fromDeployInfo(key: DeployHash): Key;
  static fromAccount(key: AccountHash): Key;
  static fromHash(key: HashAddr): Key;
  static fromTransfer(key: Uint8Array): TransferAddr;
  static fromEraInfo(key: EraId): Key;
  static fromBalance(key: URefAddr): Key;
  static fromBid(key: AccountHash): Key;
  static fromWithdraw(key: AccountHash): Key;
  static fromDictionaryAddr(key: DictionaryAddr): Key;
  asDictionaryAddr(): DictionaryAddr | undefined;
  static fromEraSummary(): Key;
  static fromUnbond(key: AccountHash): Key;
  static fromChainspecRegistry(): Key;
  static fromChecksumRegistry(): Key;
  toFormattedString(): string;
  static fromFormattedString(formatted_str: string): Key;
  static fromDictionaryKey(seed_uref: URef, dictionary_item_key: Uint8Array): Key;
  isDictionaryKey(): boolean;
  intoAccount(): AccountHash | undefined;
  intoHash(): HashAddr | undefined;
  asBalance(): URefAddr | undefined;
  intoURef(): URef | undefined;
  urefToHash(): Key | undefined;
  withdrawToUnbond(): Key | undefined;
}
/**
 * Wrapper struct for the `ListRpcsResult` from casper_client.
 */
export class ListRpcsResult {
  private constructor();
  free(): void;
  /**
   * Converts the ListRpcsResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the name of the RPC.
   */
  readonly name: string;
  /**
   * Gets the schema of the RPC as a JsValue.
   */
  readonly schema: any;
}
export class Path {
  free(): void;
  constructor(path: any);
  static fromArray(path: any): Path;
  toJson(): any;
  toString(): string;
  is_empty(): boolean;
}
export class PaymentStrParams {
  free(): void;
  constructor(payment_amount?: string | null, payment_hash?: string | null, payment_name?: string | null, payment_package_hash?: string | null, payment_package_name?: string | null, payment_path?: string | null, payment_args_simple?: Array<any> | null, payment_args_json?: string | null, payment_args_complex?: string | null, payment_version?: string | null, payment_entry_point?: string | null);
  get payment_amount(): string | undefined;
  set payment_amount(value: string);
  get payment_hash(): string | undefined;
  set payment_hash(value: string);
  get payment_name(): string | undefined;
  set payment_name(value: string);
  get payment_package_hash(): string | undefined;
  set payment_package_hash(value: string);
  get payment_package_name(): string | undefined;
  set payment_package_name(value: string);
  get payment_path(): string | undefined;
  set payment_path(value: string);
  get payment_args_simple(): Array<any> | undefined;
  set payment_args_simple(value: Array<any>);
  get payment_args_json(): string | undefined;
  set payment_args_json(value: string);
  get payment_args_complex(): string | undefined;
  set payment_args_complex(value: string);
  get payment_version(): string | undefined;
  set payment_version(value: string);
  get payment_entry_point(): string | undefined;
  set payment_entry_point(value: string);
}
export class PeerEntry {
  private constructor();
  free(): void;
  readonly node_id: string;
  readonly address: string;
}
export class PublicKey {
  free(): void;
  constructor(public_key_hex_str: string);
  static fromUint8Array(bytes: Uint8Array): PublicKey;
  toAccountHash(): AccountHash;
  toPurseUref(): URef;
  toJson(): any;
}
export class PurseIdentifier {
  free(): void;
  constructor(key: PublicKey);
  static fromAccountHash(account_hash: AccountHash): PurseIdentifier;
  static fromURef(uref: URef): PurseIdentifier;
  toJson(): any;
}
export class PutDeployResult {
  private constructor();
  free(): void;
  /**
   * Converts PutDeployResult to a JavaScript object.
   */
  toJson(): any;
  /**
   * Gets the API version as a JavaScript value.
   */
  readonly api_version: any;
  /**
   * Gets the deploy hash associated with this result.
   */
  readonly deploy_hash: DeployHash;
}
export class QueryBalanceResult {
  private constructor();
  free(): void;
  /**
   * Converts the QueryBalanceResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the balance as a JsValue.
   */
  readonly balance: any;
}
export class QueryGlobalStateResult {
  private constructor();
  free(): void;
  /**
   * Converts the QueryGlobalStateResult to a JsValue.
   */
  toJson(): any;
  /**
   * Gets the API version as a JsValue.
   */
  readonly api_version: any;
  /**
   * Gets the block header as a JsValue.
   */
  readonly block_header: any;
  /**
   * Gets the stored value as a JsValue.
   */
  readonly stored_value: any;
  /**
   * Gets the Merkle proof as a string.
   */
  readonly merkle_proof: string;
}
export class SDK {
  free(): void;
  /**
   * Parses deploy options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing deploy options to be parsed.
   *
   * # Returns
   *
   * Parsed deploy options as a `GetDeployOptions` struct.
   */
  get_deploy_options(options: any): getDeployOptions;
  /**
   * Retrieves deploy information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetDeployOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetDeployResult` or an error.
   */
  get_deploy(options?: getDeployOptions | null): Promise<GetDeployResult>;
  /**
   * Retrieves deploy information using the provided options, alias for `get_deploy_js_alias`.
   */
  info_get_deploy(options?: getDeployOptions | null): Promise<GetDeployResult>;
  /**
   * Parses state root hash options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing state root hash options to be parsed.
   *
   * # Returns
   *
   * Parsed state root hash options as a `GetStateRootHashOptions` struct.
   */
  get_state_root_hash_options(options: any): getStateRootHashOptions;
  /**
   * Retrieves state root hash information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_state_root_hash(options?: getStateRootHashOptions | null): Promise<GetStateRootHashResult>;
  /**
   * Retrieves state root hash information using the provided options (alias for `get_state_root_hash_js_alias`).
   *
   * # Arguments
   *
   * * `options` - An optional `GetStateRootHashOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetStateRootHashResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  chain_get_state_root_hash(options?: getStateRootHashOptions | null): Promise<GetStateRootHashResult>;
  /**
   * Parses query balance options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing query balance options to be parsed.
   *
   * # Returns
   *
   * Parsed query balance options as a `QueryBalanceOptions` struct.
   */
  query_balance_options(options: any): queryBalanceOptions;
  /**
   * Retrieves balance information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `QueryBalanceOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `QueryBalanceResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  query_balance(options?: queryBalanceOptions | null): Promise<QueryBalanceResult>;
  /**
   * Get options for speculative execution from a JavaScript value.
   */
  get_speculative_exec_options(options: any): getSpeculativeExecOptions;
  /**
   * JS Alias for speculative execution.
   *
   * # Arguments
   *
   * * `options` - The options for speculative execution.
   *
   * # Returns
   *
   * A `Result` containing the result of the speculative execution or a `JsError` in case of an error.
   */
  speculative_exec(options?: getSpeculativeExecOptions | null): Promise<SpeculativeExecResult>;
  /**
   * JS Alias for `sign_deploy`.
   *
   * # Arguments
   *
   * * `deploy` - The deploy to sign.
   * * `secret_key` - The secret key for signing.
   *
   * # Returns
   *
   * The signed `Deploy`.
   */
  sign_deploy(deploy: Deploy, secret_key: string): Deploy;
  /**
   * Parses balance options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing balance options to be parsed.
   *
   * # Returns
   *
   * Parsed balance options as a `GetBalanceOptions` struct.
   */
  get_balance_options(options: any): getBalanceOptions;
  /**
   * Retrieves balance information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_balance(options?: getBalanceOptions | null): Promise<GetBalanceResult>;
  /**
   * JS Alias for `get_balance_js_alias`.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBalanceOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBalanceResult` or a `JsError` in case of an error.
   */
  state_get_balance(options?: getBalanceOptions | null): Promise<GetBalanceResult>;
  /**
   * Parses block options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing block options to be parsed.
   *
   * # Returns
   *
   * Parsed block options as a `GetBlockOptions` struct.
   */
  get_block_options(options: any): getBlockOptions;
  /**
   * Retrieves block information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBlockOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_block(options?: getBlockOptions | null): Promise<GetBlockResult>;
  /**
   * JS Alias for the `get_block` method to maintain compatibility.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBlockOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBlockResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  chain_get_block(options?: getBlockOptions | null): Promise<GetBlockResult>;
  /**
   * JS Alias for `make_transfer`.
   *
   * # Arguments
   *
   * * `amount` - The transfer amount.
   * * `target_account` - The target account.
   * * `transfer_id` - Optional transfer identifier.
   * * `deploy_params` - The deploy parameters.
   * * `payment_params` - The payment parameters.
   *
   * # Returns
   *
   * A `Result` containing the created `Deploy` or a `JsError` in case of an error.
   */
  make_transfer(amount: string, target_account: string, transfer_id: string | null | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams): Deploy;
  /**
   * Creates a new DeployWatcher instance to watch deploys (JavaScript-friendly).
   *
   * # Arguments
   *
   * * `events_url` - The URL to monitor for deploy events.
   * * `timeout_duration` - An optional timeout duration in seconds.
   *
   * # Returns
   *
   * A `DeployWatcher` instance.
   */
  watchDeploy(events_url: string, timeout_duration?: number | null): DeployWatcher;
  /**
   * Waits for a deploy event to be processed asynchronously (JavaScript-friendly).
   *
   * # Arguments
   *
   * * `events_url` - The URL to monitor for deploy events.
   * * `deploy_hash` - The deploy hash to wait for.
   * * `timeout_duration` - An optional timeout duration in seconds.
   *
   * # Returns
   *
   * A JavaScript `Promise` resolving to either the processed `EventParseResult` or an error message.
   */
  waitDeploy(events_url: string, deploy_hash: string, timeout_duration?: number | null): Promise<Promise<any>>;
  /**
   * Calls a smart contract entry point with the specified parameters and returns the result.
   *
   * # Arguments
   *
   * * `deploy_params` - The deploy parameters.
   * * `session_params` - The session parameters.
   * * `payment_amount` - The payment amount as a string.
   * * `node_address` - An optional node address to send the request to.
   *
   * # Returns
   *
   * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the call.
   */
  call_entrypoint(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_amount: string, node_address?: string | null): Promise<PutDeployResult>;
  /**
   * Deserialize query_contract_key_options from a JavaScript object.
   */
  query_contract_key_options(options: any): queryContractKeyOptions;
  /**
   * JavaScript alias for query_contract_key with deserialized options.
   */
  query_contract_key(options?: queryContractKeyOptions | null): Promise<QueryGlobalStateResult>;
  constructor(node_address?: string | null, verbosity?: Verbosity | null);
  getNodeAddress(node_address?: string | null): string;
  setNodeAddress(node_address?: string | null): void;
  getVerbosity(verbosity?: Verbosity | null): Verbosity;
  setVerbosity(verbosity?: Verbosity | null): void;
  get_account_options(options: any): getAccountOptions;
  get_account(options?: getAccountOptions | null): Promise<GetAccountResult>;
  state_get_account_info(options?: getAccountOptions | null): Promise<GetAccountResult>;
  /**
   * Parses auction info options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing auction info options to be parsed.
   *
   * # Returns
   *
   * Result containing parsed auction info options as a `GetAuctionInfoOptions` struct,
   * or a `JsError` if deserialization fails.
   */
  get_auction_info_options(options: any): getAuctionInfoOptions;
  /**
   * Retrieves auction information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetAuctionInfoOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetAuctionInfoResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_auction_info(options?: getAuctionInfoOptions | null): Promise<GetAuctionInfoResult>;
  get_era_info_options(options: any): getEraInfoOptions;
  get_era_info(options?: getEraInfoOptions | null): Promise<GetEraInfoResult>;
  /**
   * Parses era summary options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing era summary options to be parsed.
   *
   * # Returns
   *
   * Parsed era summary options as a `GetEraSummaryOptions` struct.
   */
  get_era_summary_options(options: any): getEraSummaryOptions;
  /**
   * Retrieves era summary information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetEraSummaryOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetEraSummaryResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_era_summary(options?: getEraSummaryOptions | null): Promise<GetEraSummaryResult>;
  /**
   * Retrieves node status information using the provided options.
   *
   * # Arguments
   *
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `node_address` - An optional string specifying the node address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `GetNodeStatusResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_node_status(verbosity?: Verbosity | null, node_address?: string | null): Promise<GetNodeStatusResult>;
  /**
   * Retrieves validator changes using the provided options.
   *
   * # Arguments
   *
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `node_address` - An optional string specifying the node address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `GetValidatorChangesResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_validator_changes(verbosity?: Verbosity | null, node_address?: string | null): Promise<GetValidatorChangesResult>;
  /**
   * Lists available RPCs using the provided options.
   *
   * # Arguments
   *
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `node_address` - An optional string specifying the node address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `ListRpcsResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the listing process.
   */
  list_rpcs(verbosity?: Verbosity | null, node_address?: string | null): Promise<ListRpcsResult>;
  /**
   * JS Alias for `make_deploy`.
   *
   * # Arguments
   *
   * * `deploy_params` - The deploy parameters.
   * * `session_params` - The session parameters.
   * * `payment_params` - The payment parameters.
   *
   * # Returns
   *
   * A `Result` containing the created `Deploy` or a `JsError` in case of an error.
   */
  make_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams): Deploy;
  /**
   * JS Alias for transferring funds.
   *
   * # Arguments
   *
   * * `amount` - The amount to transfer.
   * * `target_account` - The target account.
   * * `transfer_id` - An optional transfer ID (defaults to a random number).
   * * `deploy_params` - The deployment parameters.
   * * `payment_params` - The payment parameters.
   * * `verbosity` - The verbosity level for logging (optional).
   * * `node_address` - The address of the node to connect to (optional).
   *
   * # Returns
   *
   * A `Result` containing the result of the transfer or a `JsError` in case of an error.
   */
  transfer(amount: string, target_account: string, transfer_id: string | null | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity | null, node_address?: string | null): Promise<PutDeployResult>;
  /**
   * Asynchronously retrieves the chainspec.
   *
   * # Arguments
   *
   * * `verbosity` - An optional `Verbosity` parameter.
   * * `node_address` - An optional node address as a string.
   *
   * # Returns
   *
   * A `Result` containing either a `GetChainspecResult` or a `JsError` in case of an error.
   */
  get_chainspec(verbosity?: Verbosity | null, node_address?: string | null): Promise<GetChainspecResult>;
  /**
   * Puts a deploy using the provided options.
   *
   * # Arguments
   *
   * * `deploy` - The `Deploy` object to be sent.
   * * `verbosity` - An optional `Verbosity` level for controlling the output verbosity.
   * * `node_address` - An optional string specifying the node address to use for the request.
   *
   * # Returns
   *
   * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the deploy process.
   */
  put_deploy(deploy: Deploy, verbosity?: Verbosity | null, node_address?: string | null): Promise<PutDeployResult>;
  /**
   * JS Alias for `put_deploy_js_alias`.
   *
   * This function provides an alternative name for `put_deploy_js_alias`.
   */
  account_put_deploy(deploy: Deploy, verbosity?: Verbosity | null, node_address?: string | null): Promise<PutDeployResult>;
  /**
   * JavaScript alias for deploying with deserialized parameters.
   *
   * # Arguments
   *
   * * `deploy_params` - Deploy parameters.
   * * `session_params` - Session parameters.
   * * `payment_params` - Payment parameters.
   * * `verbosity` - An optional verbosity level.
   * * `node_address` - An optional node address.
   *
   * # Returns
   *
   * A result containing PutDeployResult or a JsError.
   */
  deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams, verbosity?: Verbosity | null, node_address?: string | null): Promise<PutDeployResult>;
  /**
   * JS Alias for speculative transfer.
   *
   * # Arguments
   *
   * * `amount` - The amount to transfer.
   * * `target_account` - The target account.
   * * `transfer_id` - An optional transfer ID (defaults to a random number).
   * * `deploy_params` - The deployment parameters.
   * * `payment_params` - The payment parameters.
   * * `maybe_block_id_as_string` - An optional block ID as a string.
   * * `maybe_block_identifier` - An optional block identifier.
   * * `verbosity` - The verbosity level for logging (optional).
   * * `node_address` - The address of the node to connect to (optional).
   *
   * # Returns
   *
   * A `Result` containing the result of the speculative transfer or a `JsError` in case of an error.
   */
  speculative_transfer(amount: string, target_account: string, transfer_id: string | null | undefined, deploy_params: DeployStrParams, payment_params: PaymentStrParams, maybe_block_id_as_string?: string | null, maybe_block_identifier?: BlockIdentifier | null, verbosity?: Verbosity | null, node_address?: string | null): Promise<SpeculativeExecResult>;
  /**
   * Parses block transfers options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing block transfers options to be parsed.
   *
   * # Returns
   *
   * Parsed block transfers options as a `GetBlockTransfersOptions` struct.
   */
  get_block_transfers_options(options: any): getBlockTransfersOptions;
  /**
   * Retrieves block transfers information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetBlockTransfersOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetBlockTransfersResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_block_transfers(options?: getBlockTransfersOptions | null): Promise<GetBlockTransfersResult>;
  /**
   * Parses dictionary item options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing dictionary item options to be parsed.
   *
   * # Returns
   *
   * Parsed dictionary item options as a `GetDictionaryItemOptions` struct.
   */
  get_dictionary_item_options(options: any): getDictionaryItemOptions;
  /**
   * Retrieves dictionary item information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `GetDictionaryItemOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `GetDictionaryItemResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  get_dictionary_item(options?: getDictionaryItemOptions | null): Promise<GetDictionaryItemResult>;
  /**
   * JS Alias for `get_dictionary_item_js_alias`
   */
  state_get_dictionary_item(options?: getDictionaryItemOptions | null): Promise<GetDictionaryItemResult>;
  /**
   * Retrieves peers asynchronously.
   *
   * # Arguments
   *
   * * `verbosity` - Optional verbosity level.
   * * `node_address` - Optional node address.
   *
   * # Returns
   *
   * A `Result` containing `GetPeersResult` or a `JsError` if an error occurs.
   */
  get_peers(verbosity?: Verbosity | null, node_address?: string | null): Promise<GetPeersResult>;
  /**
   * Parses query global state options from a JsValue.
   *
   * # Arguments
   *
   * * `options` - A JsValue containing query global state options to be parsed.
   *
   * # Returns
   *
   * Parsed query global state options as a `QueryGlobalStateOptions` struct.
   */
  query_global_state_options(options: any): queryGlobalStateOptions;
  /**
   * Retrieves global state information using the provided options.
   *
   * # Arguments
   *
   * * `options` - An optional `QueryGlobalStateOptions` struct containing retrieval options.
   *
   * # Returns
   *
   * A `Result` containing either a `QueryGlobalStateResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the retrieval process.
   */
  query_global_state(options?: queryGlobalStateOptions | null): Promise<QueryGlobalStateResult>;
  /**
   * Installs a smart contract with the specified parameters and returns the result.
   *
   * # Arguments
   *
   * * `deploy_params` - The deploy parameters.
   * * `session_params` - The session parameters.
   * * `payment_amount` - The payment amount as a string.
   * * `node_address` - An optional node address to send the request to.
   *
   * # Returns
   *
   * A `Result` containing either a `PutDeployResult` or a `JsError` in case of an error.
   *
   * # Errors
   *
   * Returns a `JsError` if there is an error during the installation.
   */
  install(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_amount: string, node_address?: string | null): Promise<PutDeployResult>;
  /**
   * Deserialize query_contract_dict_options from a JavaScript object.
   */
  query_contract_dict_options(options: any): queryContractDictOptions;
  /**
   * JavaScript alias for query_contract_dict with deserialized options.
   */
  query_contract_dict(options?: queryContractDictOptions | null): Promise<GetDictionaryItemResult>;
  /**
   * This function allows executing a deploy speculatively.
   *
   * # Arguments
   *
   * * `deploy_params` - Deployment parameters for the deploy.
   * * `session_params` - Session parameters for the deploy.
   * * `payment_params` - Payment parameters for the deploy.
   * * `maybe_block_id_as_string` - An optional block ID as a string.
   * * `maybe_block_identifier` - Optional block identifier.
   * * `verbosity` - Optional verbosity level.
   * * `node_address` - Optional node address.
   *
   * # Returns
   *
   * A `Result` containing either a `SpeculativeExecResult` or a `JsError` in case of an error.
   */
  speculative_deploy(deploy_params: DeployStrParams, session_params: SessionStrParams, payment_params: PaymentStrParams, maybe_block_id_as_string?: string | null, maybe_block_identifier?: BlockIdentifier | null, verbosity?: Verbosity | null, node_address?: string | null): Promise<SpeculativeExecResult>;
}
export class SessionStrParams {
  free(): void;
  constructor(session_hash?: string | null, session_name?: string | null, session_package_hash?: string | null, session_package_name?: string | null, session_path?: string | null, session_bytes?: Bytes | null, session_args_simple?: Array<any> | null, session_args_json?: string | null, session_args_complex?: string | null, session_version?: string | null, session_entry_point?: string | null, is_session_transfer?: boolean | null);
  get session_hash(): string | undefined;
  set session_hash(value: string);
  get session_name(): string | undefined;
  set session_name(value: string);
  get session_package_hash(): string | undefined;
  set session_package_hash(value: string);
  get session_package_name(): string | undefined;
  set session_package_name(value: string);
  get session_path(): string | undefined;
  set session_path(value: string);
  get session_bytes(): Bytes | undefined;
  set session_bytes(value: Bytes);
  get session_args_simple(): ArgsSimple | undefined;
  set session_args_simple(value: Array<any>);
  get session_args_json(): string | undefined;
  set session_args_json(value: string);
  get session_args_complex(): string | undefined;
  set session_args_complex(value: string);
  get session_version(): string | undefined;
  set session_version(value: string);
  get session_entry_point(): string | undefined;
  set session_entry_point(value: string);
  get is_session_transfer(): boolean | undefined;
  set is_session_transfer(value: boolean);
}
export class SignatureResponse {
  private constructor();
  free(): void;
  is_cancelled(): boolean;
  get_signature_hex(): string;
  get_signature(): Uint8Array;
}
export class SpeculativeExecResult {
  private constructor();
  free(): void;
  /**
   * Convert the result to JSON format.
   */
  toJson(): any;
  /**
   * Get the API version of the result.
   */
  readonly api_version: any;
  /**
   * Get the block hash.
   */
  readonly block_hash: BlockHash;
  /**
   * Get the execution result.
   */
  readonly execution_result: any;
}
/**
 * Represents a success response containing a cost value.
 */
export class Success {
  private constructor();
  free(): void;
  cost: string;
}
export class TransferAddr {
  free(): void;
  constructor(bytes: Uint8Array);
}
export class URef {
  free(): void;
  constructor(uref_hex_str: string, access_rights: number);
  static fromFormattedStr(formatted_str: string): URef;
  static fromUint8Array(bytes: Uint8Array, access_rights: number): URef;
  toFormattedString(): string;
  toJson(): any;
}
export class URefAddr {
  free(): void;
  constructor(bytes: Uint8Array);
}
export class getAccountOptions {
  private constructor();
  free(): void;
  get account_identifier(): AccountIdentifier | undefined;
  set account_identifier(value: AccountIdentifier | null | undefined);
  get account_identifier_as_string(): string | undefined;
  set account_identifier_as_string(value: string | null | undefined);
  get maybe_block_id_as_string(): string | undefined;
  set maybe_block_id_as_string(value: string | null | undefined);
  get maybe_block_identifier(): BlockIdentifier | undefined;
  set maybe_block_identifier(value: BlockIdentifier | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
}
/**
 * Options for the `get_auction_info` method.
 */
export class getAuctionInfoOptions {
  private constructor();
  free(): void;
  get maybe_block_id_as_string(): string | undefined;
  set maybe_block_id_as_string(value: string | null | undefined);
  get maybe_block_identifier(): BlockIdentifier | undefined;
  set maybe_block_identifier(value: BlockIdentifier | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
}
/**
 * Options for the `get_balance` method.
 */
export class getBalanceOptions {
  private constructor();
  free(): void;
  get state_root_hash_as_string(): string | undefined;
  set state_root_hash_as_string(value: string | null | undefined);
  get state_root_hash(): Digest | undefined;
  set state_root_hash(value: Digest | null | undefined);
  get purse_uref_as_string(): string | undefined;
  set purse_uref_as_string(value: string | null | undefined);
  get purse_uref(): URef | undefined;
  set purse_uref(value: URef | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
}
/**
 * Options for the `get_block` method.
 */
export class getBlockOptions {
  private constructor();
  free(): void;
  get maybe_block_id_as_string(): string | undefined;
  set maybe_block_id_as_string(value: string | null | undefined);
  get maybe_block_identifier(): BlockIdentifier | undefined;
  set maybe_block_identifier(value: BlockIdentifier | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
}
/**
 * Options for the `get_block_transfers` method.
 */
export class getBlockTransfersOptions {
  private constructor();
  free(): void;
  get maybe_block_id_as_string(): string | undefined;
  set maybe_block_id_as_string(value: string | null | undefined);
  get maybe_block_identifier(): BlockIdentifier | undefined;
  set maybe_block_identifier(value: BlockIdentifier | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
}
/**
 * Options for the `get_deploy` method.
 */
export class getDeployOptions {
  private constructor();
  free(): void;
  get deploy_hash_as_string(): string | undefined;
  set deploy_hash_as_string(value: string | null | undefined);
  get deploy_hash(): DeployHash | undefined;
  set deploy_hash(value: DeployHash | null | undefined);
  get finalized_approvals(): boolean | undefined;
  set finalized_approvals(value: boolean | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
}
/**
 * Options for the `get_dictionary_item` method.
 */
export class getDictionaryItemOptions {
  private constructor();
  free(): void;
  get state_root_hash_as_string(): string | undefined;
  set state_root_hash_as_string(value: string | null | undefined);
  get state_root_hash(): Digest | undefined;
  set state_root_hash(value: Digest | null | undefined);
  get dictionary_item_params(): DictionaryItemStrParams | undefined;
  set dictionary_item_params(value: DictionaryItemStrParams | null | undefined);
  get dictionary_item_identifier(): DictionaryItemIdentifier | undefined;
  set dictionary_item_identifier(value: DictionaryItemIdentifier | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
}
export class getEraInfoOptions {
  private constructor();
  free(): void;
  get maybe_block_id_as_string(): string | undefined;
  set maybe_block_id_as_string(value: string | null | undefined);
  get maybe_block_identifier(): BlockIdentifier | undefined;
  set maybe_block_identifier(value: BlockIdentifier | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
}
/**
 * Options for the `get_era_summary` method.
 */
export class getEraSummaryOptions {
  private constructor();
  free(): void;
  get maybe_block_id_as_string(): string | undefined;
  set maybe_block_id_as_string(value: string | null | undefined);
  get maybe_block_identifier(): BlockIdentifier | undefined;
  set maybe_block_identifier(value: BlockIdentifier | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
}
/**
 * Options for speculative execution.
 */
export class getSpeculativeExecOptions {
  private constructor();
  free(): void;
  /**
   * The deploy as a JSON string.
   */
  get deploy_as_string(): string | undefined;
  /**
   * The deploy as a JSON string.
   */
  set deploy_as_string(value: string | null | undefined);
  /**
   * The deploy to execute.
   */
  get deploy(): Deploy | undefined;
  /**
   * The deploy to execute.
   */
  set deploy(value: Deploy | null | undefined);
  /**
   * The block identifier as a string.
   */
  get maybe_block_id_as_string(): string | undefined;
  /**
   * The block identifier as a string.
   */
  set maybe_block_id_as_string(value: string | null | undefined);
  /**
   * The block identifier.
   */
  get maybe_block_identifier(): BlockIdentifier | undefined;
  /**
   * The block identifier.
   */
  set maybe_block_identifier(value: BlockIdentifier | null | undefined);
  /**
   * The node address.
   */
  get node_address(): string | undefined;
  /**
   * The node address.
   */
  set node_address(value: string | null | undefined);
  /**
   * The verbosity level for logging.
   */
  get verbosity(): Verbosity | undefined;
  /**
   * The verbosity level for logging.
   */
  set verbosity(value: Verbosity | null | undefined);
}
/**
 * Options for the `get_state_root_hash` method.
 */
export class getStateRootHashOptions {
  private constructor();
  free(): void;
  get maybe_block_id_as_string(): string | undefined;
  set maybe_block_id_as_string(value: string | null | undefined);
  get maybe_block_identifier(): BlockIdentifier | undefined;
  set maybe_block_identifier(value: BlockIdentifier | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
}
/**
 * Options for the `query_balance` method.
 */
export class queryBalanceOptions {
  private constructor();
  free(): void;
  get purse_identifier_as_string(): string | undefined;
  set purse_identifier_as_string(value: string | null | undefined);
  get purse_identifier(): PurseIdentifier | undefined;
  set purse_identifier(value: PurseIdentifier | null | undefined);
  get global_state_identifier(): GlobalStateIdentifier | undefined;
  set global_state_identifier(value: GlobalStateIdentifier | null | undefined);
  get state_root_hash_as_string(): string | undefined;
  set state_root_hash_as_string(value: string | null | undefined);
  get state_root_hash(): Digest | undefined;
  set state_root_hash(value: Digest | null | undefined);
  get maybe_block_id_as_string(): string | undefined;
  set maybe_block_id_as_string(value: string | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
}
export class queryContractDictOptions {
  private constructor();
  free(): void;
  get state_root_hash_as_string(): string | undefined;
  set state_root_hash_as_string(value: string | null | undefined);
  get state_root_hash(): Digest | undefined;
  set state_root_hash(value: Digest | null | undefined);
  get dictionary_item_params(): DictionaryItemStrParams | undefined;
  set dictionary_item_params(value: DictionaryItemStrParams | null | undefined);
  get dictionary_item_identifier(): DictionaryItemIdentifier | undefined;
  set dictionary_item_identifier(value: DictionaryItemIdentifier | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
}
export class queryContractKeyOptions {
  private constructor();
  free(): void;
  get global_state_identifier(): GlobalStateIdentifier | undefined;
  set global_state_identifier(value: GlobalStateIdentifier | null | undefined);
  get state_root_hash_as_string(): string | undefined;
  set state_root_hash_as_string(value: string | null | undefined);
  get state_root_hash(): Digest | undefined;
  set state_root_hash(value: Digest | null | undefined);
  get maybe_block_id_as_string(): string | undefined;
  set maybe_block_id_as_string(value: string | null | undefined);
  get contract_key_as_string(): string | undefined;
  set contract_key_as_string(value: string | null | undefined);
  get contract_key(): Key | undefined;
  set contract_key(value: Key | null | undefined);
  get path_as_string(): string | undefined;
  set path_as_string(value: string | null | undefined);
  get path(): Path | undefined;
  set path(value: Path | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
}
/**
 * Options for the `query_global_state` method.
 */
export class queryGlobalStateOptions {
  private constructor();
  free(): void;
  get global_state_identifier(): GlobalStateIdentifier | undefined;
  set global_state_identifier(value: GlobalStateIdentifier | null | undefined);
  get state_root_hash_as_string(): string | undefined;
  set state_root_hash_as_string(value: string | null | undefined);
  get state_root_hash(): Digest | undefined;
  set state_root_hash(value: Digest | null | undefined);
  get maybe_block_id_as_string(): string | undefined;
  set maybe_block_id_as_string(value: string | null | undefined);
  get key_as_string(): string | undefined;
  set key_as_string(value: string | null | undefined);
  get key(): Key | undefined;
  set key(value: Key | null | undefined);
  get path_as_string(): string | undefined;
  set path_as_string(value: string | null | undefined);
  get path(): Path | undefined;
  set path(value: Path | null | undefined);
  get node_address(): string | undefined;
  set node_address(value: string | null | undefined);
  get verbosity(): Verbosity | undefined;
  set verbosity(value: Verbosity | null | undefined);
}
