use axum::{
    routing::post,
    Router,
};
use axum::http::header;
use std::net::SocketAddr;
use tokio::fs;
use tower_http::cors::CorsLayer;
use crate::controllers::upload_controller::upload_handler;
use crate::models::upload_model::AppState;

mod controllers;
mod models;
mod views;

#[tokio::main]
async fn main() {
    let upload_folder = "./data".to_string();
    if !fs::metadata(&upload_folder).await.is_ok() {
        fs::create_dir_all(&upload_folder).await.unwrap();
    }

    let state = AppState { upload_folder };

    let cors = CorsLayer::new()
        .allow_origin("http://localhost:4812".parse::<header::HeaderValue>().unwrap())
        .allow_methods([axum::http::Method::GET, axum::http::Method::POST])
        .allow_headers([header::CONTENT_TYPE])
        .allow_credentials(true);

    let app = Router::new()
        .route("/upload", post(upload_handler))
        .layer(cors)
        .with_state(state);

    let addr = SocketAddr::from(([0, 0, 0, 0], 4813));
    println!("Server running on port 4813");
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}