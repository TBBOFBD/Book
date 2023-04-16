#![allow(unused)]

use titanium::desktop::memory::*;
extern crate libc;
use libc::c_char;
use std::ffi::CStr;
use std::str;

const OFFSET: usize = 0x7ffdce77ae94;
const APPNAME: &str = "hack";

type SetToType = [c_char;11];
const SET_TO: SetToType = [072,065,067,075,069,068,075,069,089,045,045];

fn main() {
    // Injecting ourselves into the process handle (this process, you can also inject into other processes)
    let handle = get_handle(APPNAME).expect("Failed to get process handle");

    // We make a `DataMember` that has an offset referring to its location in memory
    let member: DataMember<SetToType> = DataMember::new_offset(handle, vec![OFFSET]);
    // The memory refered to is now the same
    println!(
        "Memory location: &x: {}, member: {}",
        OFFSET,
        member.get_offset().expect("Failed to get member's offset")
    );
    let value_i8 = unsafe {
        member.read().expect("Failed to read member's value")
    };
    let c_str: &CStr = unsafe { CStr::from_ptr(&value_i8 as *const SetToType as *const c_char) };
    let str_slice: &str = c_str.to_str().unwrap();
    // The value of the member is the same as the variable
    println!(
        "Member value: {}",
        str_slice
    );

    // We can write to and modify the value of the variable using the member
    member.write(&SET_TO).unwrap();
    let value_i8 = unsafe {
        member.read().expect("Failed to read member's value")
    };
    let c_str: &CStr = unsafe { CStr::from_ptr(&value_i8 as *const SetToType as *const c_char) };
    let str_slice: &str = c_str.to_str().unwrap();
    println!(
        "New Member value: {}",
        str_slice
    );
}