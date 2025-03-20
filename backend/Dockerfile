FROM rustlang/rust:nightly as builder

WORKDIR /app

COPY Cargo.toml ./

RUN mkdir -p src && echo "fn main() {}" > src/main.rs
RUN cargo update && cargo build --release

RUN rm -rf src

COPY src ./src
COPY data ./data

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