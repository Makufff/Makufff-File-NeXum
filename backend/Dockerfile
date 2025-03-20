FROM rust:1.76-slim AS builder

WORKDIR /app

COPY Cargo.toml Cargo.lock ./

RUN mkdir src && \
    echo "fn main() {}" > src/main.rs && \
    cargo build --release && \
    rm -f src/main.rs

COPY src/ ./src/

RUN cargo build --release

FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN mkdir -p /app/data

COPY --from=builder /app/target/release/backend /app/backend

COPY --from=builder /app/data/. /app/data/

EXPOSE 4813

CMD ["./backend"]