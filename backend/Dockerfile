FROM rustlang/rust:nightly AS builder

WORKDIR /app

COPY Cargo.toml Cargo.lock ./

RUN mkdir -p src && \
    echo "fn main() {}" > src/main.rs && \
    cargo +nightly build --release && \
    rm -rf src

COPY src ./src
RUN cargo +nightly build --release

FROM rustlang/rust:nightly

WORKDIR /app

RUN mkdir -p /app/data

COPY --from=builder /app/target/release/backend /app/backend

EXPOSE 4813

CMD ["./backend"]