FROM node:22-trixie-slim

USER root

RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		ca-certificates \
		curl \
		git \
		gzip \
		unzip \
		xz-utils \
	&& rm -rf /var/lib/apt/lists/*

USER node

RUN curl -fsSL https://moonrepo.dev/install/proto.sh | PROTO_HOME="$HOME/.proto" bash -s -- --yes

ENV PROTO_HOME=/home/node/.proto
ENV PATH=/home/node/.proto/bin:/home/node/.proto/shims:${PATH}