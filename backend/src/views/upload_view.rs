use serde::Serialize;

#[derive(Serialize)]
pub struct UploadResponse {
    pub status: bool,
    pub message: String,
    pub file_paths: Vec<String>,
}