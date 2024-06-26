FROM node:latest as base
#FROM rust:latest as rust
LABEL org.opencontainers.image.source="https://github.com/gnostr-org/gnostr-drives"
LABEL org.opencontainers.image.description="gnostr-drives-docker"
RUN touch updated
RUN echo $(date +%s) > updated
RUN apt-get update
RUN apt-get install bash libssl-dev pkg-config python-is-python3 systemd -y
RUN chmod +x /usr/bin/systemctl
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
WORKDIR /tmp
RUN git clone --recurse-submodules -j2 --branch v0.0.1 --depth 1 https://github.com/gnostr-org/gnostr-drives.git
WORKDIR /tmp/gnostr-drives
#RUN . $HOME/.cargo/env && cargo build --release && cargo install --path .
RUN install ./serve /usr/local/bin
ENV PATH=$PATH:/usr/bin/systemctl
RUN ps -p 1 -o comm=
EXPOSE 80 6102 8080 ${PORT}
VOLUME /src
FROM base as gnostr-drives

