mod utils;

use base64::{engine::general_purpose, Engine as _};
use casper_types::account::AccountHash;
use casper_types::bytesrepr::ToBytes;
use casper_types::Key;
use utils::js_log::atob;
use utils::js_log::log;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Deployer {}

#[wasm_bindgen]
impl Deployer {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Deployer {}
    }

    pub fn hello(&mut self) -> String {
        let greetings = "Hello Web Assembly! My Name is Greg, I am glad you are looking under the hood, found any bug ? having an error log ? please kindly contact me on github at https://github.com/gRoussac/casper-deployer or per email at ".to_string();
        log(greetings);
        log(atob("Z3JlZ29yeUBpbnRlcmNob3VldHRlLm5ldA==".to_string())
            .as_string()
            .unwrap());
        "Greetings in return!".to_string()
    }

    pub fn account_hash_to_base64_encode(&mut self, _account_hash: &str) -> js_sys::JsString {
        _account_hash.as_base64().into()
    }
}

impl Default for Deployer {
    fn default() -> Self {
        Self::new()
    }
}

pub trait ToBase64 {
    fn as_base64(&self) -> String;
}

impl ToBase64 for &str {
    fn as_base64(&self) -> String {
        let account_hash = AccountHash::from_formatted_str(self).unwrap();
        let key = Key::from(account_hash).to_bytes().unwrap();
        general_purpose::STANDARD.encode(key) // base64.encode
    }
}
