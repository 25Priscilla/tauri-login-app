use serde::Serialize;

#[derive(Serialize)]
struct LoginResult {
    success: bool,
    message: String,
}

// Example login command. Replace the check below with a real call to your
// backend, a local database, or an OS keychain lookup.
#[tauri::command]
fn login(username: String, password: String) -> LoginResult {
    let username = username.trim();

    if username.is_empty() || password.is_empty() {
        return LoginResult {
            success: false,
            message: "Enter a username and password.".into(),
        };
    }

    // Placeholder credential check — swap this out for real authentication.
    if username == "admin" && password == "password" {
        LoginResult {
            success: true,
            message: format!("Welcome back, {username}."),
        }
    } else {
        LoginResult {
            success: false,
            message: "Incorrect username or password.".into(),
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
