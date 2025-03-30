import { NamedCLTypeArg } from '@casper-api/api-interfaces';
import { Tabs } from '@casper-ui/tabs';
import { CLType } from 'casper-rust-wasm-sdk';

const customArg: NamedCLTypeArg = { name: '', cl_type: CLType.U8() };

const nameArg: NamedCLTypeArg = { name: 'name', cl_type: CLType?.String() };

const symbolArg: NamedCLTypeArg = { name: 'symbol', cl_type: CLType?.String() };

const decimalsArg: NamedCLTypeArg = { name: 'decimals', cl_type: CLType.U8() };

const ownerArg: NamedCLTypeArg = { name: 'owner', cl_type: CLType?.Key() };

const spenderArg: NamedCLTypeArg = { name: 'spender', cl_type: CLType?.Key() };

const recipientArg: NamedCLTypeArg = {
  name: 'recipient',
  cl_type: CLType?.Key(),
};

export const defaultTabs: { name: Tabs; types: NamedCLTypeArg[] }[] = [
  { name: Tabs.Custom, types: [] },
  {
    name: Tabs['CEP-18'],
    types: [
      { ...nameArg, install: true },
      { ...symbolArg, install: true },
      { ...decimalsArg, install: true },
      { name: 'total_supply', cl_type: CLType?.U256(), install: true },
      {
        name: 'enable_mint_burn',
        cl_type: CLType.U8(),
        install: true,
        optional: true,
      },
      {
        name: 'events_mode',
        cl_type: CLType.U8(),
        install: true,
        optional: true,
      },
      {
        name: 'admin_list',
        cl_type: CLType?.List(CLType?.Key()),
        install: true,
        optional: true,
      },
      {
        name: 'minter_list',
        cl_type: CLType?.List(CLType?.Key()),
        install: true,
        optional: true,
      },
      {
        name: 'none_list',
        cl_type: CLType?.List(CLType?.Key()),
        install: true,
        optional: true,
      },
      { name: 'address', cl_type: CLType?.Key() },
      { name: 'amount', cl_type: CLType?.U256() },
      ownerArg,
      spenderArg,
      recipientArg,
    ],
  },
  {
    name: Tabs['CEP-47'],
    types: [
      { ...nameArg, install: true },
      { ...symbolArg, install: true },
      { name: 'meta', cl_type: CLType?.String(), install: true },
      ownerArg,
      { name: 'token_id', cl_type: CLType?.U256() },
      {
        name: 'token_meta',
        cl_type: CLType?.Map(CLType?.String(), CLType?.String()),
      },
      { name: 'token_ids', cl_type: CLType?.List(CLType?.U256()) },
      {
        name: 'token_metas',
        cl_type: CLType?.List(CLType?.Map(CLType?.String(), CLType?.String())),
      },
      recipientArg,
      { name: 'count', cl_type: CLType?.U32() },
      spenderArg,
      { name: 'index', cl_type: CLType?.U256() },
    ],
  },
  {
    name: Tabs['CEP-78'],
    types: [
      {
        name: 'collection_name',
        cl_type: CLType?.String(),
        install: true,
        upgrade: true,
      },
      { name: 'collection_symbol', cl_type: CLType?.String(), install: true },
      { name: 'total_token_supply', cl_type: CLType?.U64(), install: true },
      {
        name: 'allow_minting',
        cl_type: CLType?.Bool(),
        install: true,
        optional: true,
      },
      {
        name: 'minting_mode',
        cl_type: CLType.U8(),
        install: true,
        optional: true,
      },
      { name: 'ownership_mode', cl_type: CLType.U8(), install: true },
      { name: 'nft_kind', cl_type: CLType.U8(), install: true },
      { name: 'nft_metadata_kind', cl_type: CLType.U8(), install: true },
      { name: 'metadata_mutability', cl_type: CLType.U8(), install: true },
      {
        name: 'holder_mode',
        cl_type: CLType.U8(),
        install: true,
        optional: true,
      },
      {
        name: 'owner_reverse_lookup_mode',
        cl_type: CLType.U8(),
        install: true,
        optional: true,
      },
      { name: 'token_id', cl_type: CLType?.U256() },
      { name: 'token_hash', cl_type: CLType?.Key() },
      { name: 'named_key_convention', cl_type: CLType.U8(), upgrade: true },
      {
        name: 'whitelist_mode',
        cl_type: CLType.U8(),
        optional: true,
        install: true,
      },
      {
        name: 'identifier_mode',
        cl_type: CLType.U8(),
        install: true,
        entry_point: true,
      },
      {
        name: 'burn_mode',
        cl_type: CLType.U8(),
        install: true,
        optional: true,
      },
      {
        name: 'operator_burn_mode',
        cl_type: CLType.U8(),
        install: true,
        optional: true,
        upgrade: true,
      },
      {
        name: 'json_schema',
        cl_type: CLType?.String(),
        install: true,
        optional: true,
      },
      { name: 'receipt_name', cl_type: CLType?.String() },
      { name: 'token_owner', cl_type: CLType?.Key() },
      { name: 'token_meta_data', cl_type: CLType?.String() },
      { name: 'source_key', cl_type: CLType?.Key() },
      { name: 'target_key', cl_type: CLType?.Key() },
      { name: 'operator', cl_type: CLType?.Key() },
      { name: 'approve_all', cl_type: CLType?.Bool() },
      { name: 'access_key_name', cl_type: CLType?.String(), upgrade: true },
      { name: 'hash_key_name', cl_type: CLType?.String(), upgrade: true },
      {
        name: 'acl_white_list',
        cl_type: CLType?.List(CLType?.Key()),
        install: true,
        optional: true,
      },
      {
        name: 'acl_package_mode',
        cl_type: CLType?.Bool(),
        install: true,
        optional: true,
        upgrade: true,
      },
      {
        name: 'package_operator_mode',
        cl_type: CLType?.Bool(),
        install: true,
        optional: true,
        upgrade: true,
      },
      {
        name: 'additional_required_metadata',
        cl_type: CLType?.List(CLType?.U8()),
        install: true,
        optional: true,
      },
      {
        name: 'optional_metadata',
        cl_type: CLType?.List(CLType?.U8()),
        install: true,
        optional: true,
      },
      {
        name: 'events_mode',
        cl_type: CLType.U8(),
        install: true,
        optional: true,
        upgrade: true,
      },
      {
        name: 'transfer_filter_contract',
        cl_type: CLType?.Key(),
        install: true,
        optional: true,
      },
    ],
  },
  {
    name: Tabs['CEP-85'],
    types: [
      { ...nameArg, install: true, entry_point: true },
      {
        name: 'uri',
        cl_type: CLType?.String(),
        install: true,
        entry_point: true,
      },
      {
        name: 'events_mode',
        cl_type: CLType.U8(),
        install: true,
        optional: true,
        upgrade: true,
        entry_point: true,
      },
      {
        name: 'enable_burn',
        cl_type: CLType?.Bool(),
        install: true,
        optional: true,
        entry_point: true,
      },
      {
        name: 'transfer_filter_contract',
        cl_type: CLType?.Key(),
        install: true,
        optional: true,
      },
      {
        name: 'transfer_filter_method',
        cl_type: CLType?.String(),
        install: true,
        optional: true,
      },
      {
        name: 'admin_list',
        cl_type: CLType?.List(CLType?.Key()),
        install: true,
        optional: true,
        entry_point: true,
      },
      {
        name: 'minter_list',
        cl_type: CLType?.List(CLType?.Key()),
        install: true,
        optional: true,
        entry_point: true,
      },
      {
        name: 'burner_list',
        cl_type: CLType?.List(CLType?.Key()),
        install: true,
        optional: true,
        entry_point: true,
      },
      {
        name: 'meta_list',
        cl_type: CLType?.List(CLType?.Key()),
        install: true,
        optional: true,
        entry_point: true,
      },
      {
        name: 'none_list',
        cl_type: CLType?.List(CLType?.Key()),
        install: true,
        optional: true,
        entry_point: true,
      },
      { name: 'package_hash', cl_type: CLType?.Key(), upgrade: true },
      recipientArg,
      ownerArg,
      { name: 'id', cl_type: CLType?.U256() },
      { name: 'amount', cl_type: CLType?.U256() },
      { name: 'ids', cl_type: CLType?.List(CLType?.U256()) },
      { name: 'amounts', cl_type: CLType?.List(CLType?.U256()) },
      { name: 'account', cl_type: CLType?.Key() },
      { name: 'accounts', cl_type: CLType?.List(CLType?.Key()) },
      { name: 'operator', cl_type: CLType?.Key() },
      { name: 'approved', cl_type: CLType?.Bool() },
      { name: 'from', cl_type: CLType?.Key() },
      { name: 'to', cl_type: CLType?.Key() },
      { name: 'data', cl_type: CLType?.ByteArray() },
      { name: 'total_supply', cl_type: CLType?.U256() },
      { name: 'total_supplies', cl_type: CLType?.List(CLType?.U256()) },
    ],
  },
];

export { customArg };
