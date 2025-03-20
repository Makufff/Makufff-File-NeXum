use axum::{
    extract::{Multipart, State},
    http::StatusCode,
    response::{IntoResponse, Json},
};
use crate::models::upload_model::{AppState, save_file};
use crate::views::upload_view::UploadResponse;

pub async fn upload_handler(
    State(state): State<AppState>,
    mut multipart: Multipart,
) -> Result<impl IntoResponse, (StatusCode, Json<UploadResponse>)> {
    let mut file_paths = Vec::new();
    let max_files = 10;
    let max_file_size = 10 * 1024 * 1024;

    while let Some(field) = multipart.next_field().await.unwrap() {
        if file_paths.len() >= max_files {
            return Err((
                StatusCode::BAD_REQUEST,
                Json(UploadResponse {
                    status: false,
                    message: "Exceeded maximum number of files".to_string(),
                    file_paths: Vec::new(),
                }),
            ));
        }

        let name = field.name().unwrap_or("").to_string();
        if name != "images" {
            continue;
        }

        let content_type = field.content_type().unwrap_or("").to_string();
        let allowed_types = vec![
            "image/png",
            "image/webp",
            "image/jpeg",
            "image/gif",
            "image/bmp",
        ];
        if !allowed_types.contains(&content_type.as_str()) {
            return Err((
                StatusCode::BAD_REQUEST,
                Json(UploadResponse {
                    status: false,
                    message: "Only .png, .webp, .jpg, .gif, .bmp files are supported".to_string(),
                    file_paths: Vec::new(),
                }),
            ));
        }

        let data = field.bytes().await.unwrap();
        if data.len() > max_file_size {
            return Err((
                StatusCode::BAD_REQUEST,
                Json(UploadResponse {
                    status: false,
                    message: "File size exceeds limit".to_string(),
                    file_paths: Vec::new(),
                }),
            ));
        }

        let file_path = save_file(&state.upload_folder, &content_type, &data)
            .await
            .map_err(|e| (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(UploadResponse {
                    status: false,
                    message: format!("Failed to save file: {}", e),
                    file_paths: Vec::new(),
                }),
            ))?;
        file_paths.push(file_path);
    }

    if file_paths.is_empty() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(UploadResponse {
                status: false,
                message: "No files were uploaded".to_string(),
                file_paths: Vec::new(),
            }),
        ));
    }

    Ok(Json(UploadResponse {
        status: true,
        message: "Files uploaded successfully".to_string(),
        file_paths,
    }))
}