use clap::{Parser, ValueEnum};
mod model;
mod service;
mod storage;
pub use service::*;

#[derive(Parser)]
#[command(
  name = "Todo CLI",
  author = "Vo Quang Chien",
  version = "1.0",
  about = "Simple todo app written in Rust Programming Language!"
)]
struct CliArgs {
  /// Name of todo item want to add
  #[arg(short, long, value_name = "item_name")]
  add: Option<String>,

  /// Id of item want to mark as completed
  #[arg(short, long, value_name = "item_id")]
  complete: Option<u32>,

  /// Id of item want to mark as uncompleted
  #[arg(short, long, value_name = "item_id")]
  uncomplete: Option<u32>,

  /// Id of item want to delete,
  /// note that it won't destroy data record,
  /// if you want to destory a item, use `--destroy` option.
  #[arg(short, long, value_name = "item_id")]
  delete: Option<u32>,

  /// Restore a deleted todo item
  #[arg(short, long, value_name = "item_id")]
  restore: Option<u32>,

  /// Id of item to want destroy, this will actually destroy the data record,
  #[arg(long, value_name = "item_id")]
  destroy: Option<u32>,

  /// Destory all `deleted` marked todo items,
  /// this will actually destroy the data record,
  #[arg(long)]
  destroy_deleted: bool,

  /// Clear all records, make all list empty
  #[arg(long, value_name = "item_id")]
  clear: bool,

  /// List todo items
  #[arg(short, long, value_name = "list_type")]
  list: Option<Option<ListType>>,
}

#[derive(Debug, Copy, Clone, PartialEq, Eq, PartialOrd, Ord, ValueEnum)]
enum ListType {
  /// All todo items
  All,

  /// All completed todo tiems [default]
  Completed,

  /// All uncompleted todo tiems
  Uncompleted,

  /// All deleted todo tiems
  Deleted,
}

fn main() {
  let args = CliArgs::parse();

  if let Some(name) = args.add {
    match add_item(&name) {
      Ok(s) => println!("{s}"),
      Err(e) => eprintln!("Add '{name}' fail: {e}"),
    }
  }

  if let Some(id) = args.complete {
    match complete_item(id) {
      Ok(s) => println!("{s}"),
      Err(e) => eprintln!("Complete todo '{id}' fail: {e}"),
    }
  }

  if let Some(id) = args.uncomplete {
    match uncomplete_item(id) {
      Ok(s) => println!("{s}"),
      Err(e) => eprintln!("Uncomplete todo '{id}' fail: {e}"),
    }
  }

  if let Some(id) = args.delete {
    match delete_item(id) {
      Ok(s) => println!("{s}"),
      Err(e) => eprintln!("Delete todo '{id}' fail: {e}"),
    }
  }

  if let Some(id) = args.restore {
    match restore_item(id) {
      Ok(s) => println!("{s}"),
      Err(e) => eprintln!("Restore todo '{id}' fail: {e}"),
    }
  }

  if let Some(id) = args.destroy {
    match destroy_item(id) {
      Ok(s) => println!("{s}"),
      Err(e) => eprintln!("Destroy todo '{id}' fail: {e}"),
    };
  }

  if args.destroy_deleted {
    match destroy_deleted() {
      Ok(s) => println!("{s}"),
      Err(e) => eprintln!("Destroy all deleted todos fail: {e}"),
    };
  }

  if args.clear {
    match clear() {
      Ok(s) => println!("{s}"),
      Err(e) => eprintln!("Clear all todos fail: {e}"),
    };
  }

  let mut already_listed = false;

  if let Some(None) = args.list {
    default_list();
    already_listed = true;
  }

  if let Some(Some(list_type)) = args.list {
    use ListType::*;
    match list_type {
      All => match list_all() {
        Ok(s) => println!("{s}"),
        Err(e) => eprint!("List all todos fail: {e}"),
      },
      Completed => match list_completed() {
        Ok(s) => println!("{s}"),
        Err(e) => eprint!("List completed todos fail: {e}"),
      },
      Uncompleted => default_list(),
      Deleted => match list_deleted() {
        Ok(s) => println!("{s}"),
        Err(e) => eprint!("List deleted todos fail: {e}"),
      },
    }
    already_listed = true;
  }

  if !already_listed {
    default_list();
  }
}

fn default_list() {
  match list_uncompleted() {
    Ok(s) => println!("{s}"),
    Err(e) => eprint!("List uncompleted todos fail: {e}"),
  }
}
