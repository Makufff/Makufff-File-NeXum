use rand::Rng;
use rand::distributions::Alphanumeric;
use rand::thread_rng;
use std::path::PathBuf;
use tokio::fs;

#[derive(Clone)]
pub struct AppState {
    pub upload_folder: String,
}

pub async fn save_file(
    upload_folder: &str,
    content_type: &str,
    data: &[u8],
) -> Result<String, std::io::Error> {
    let random_name: String = thread_rng()
        .sample_iter(&Alphanumeric)
        .take(32)
        .map(char::from)
        .collect();
    
    let ext = match content_type {
        "image/png" => ".png",
        "image/webp" => ".webp",
        "image/jpeg" => ".jpg",
        "image/gif" => ".gif",
        "image/bmp" => ".bmp",
        _ => unreachable!(),
    };
    
    let filename = format!("{}{}", random_name, ext);
    let file_path = PathBuf::from(upload_folder).join(&filename);
    
    fs::write(&file_path, data).await?;
    Ok(format!("/data/{}", filename))
}