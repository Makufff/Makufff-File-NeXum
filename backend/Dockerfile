FROM rust:1.76 as builder

WORKDIR /app

COPY Cargo.toml Cargo.lock ./

RUN mkdir -p src && echo "fn main() {}" > src/main.rs
RUN cargo build --release

RUN rm -rf src

COPY . .

RUN cargo build --release

FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN mkdir -p /app/data

COPY --from=builder /app/target/release/backend /app/backend
COPY --from=builder /app/data /app/data

EXPOSE 4813

CMD ["./backend"]