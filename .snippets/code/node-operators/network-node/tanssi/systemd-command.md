--base-path /var/lib/tanssi-data/ \
--name INSERT_YOUR_TANSSI_NODE_NAME \
--node-key-file /var/lib/tanssi-data/node-key \
--database paritydb \
--rpc-port 9944 \
--prometheus-port 9615 \
--prometheus-external \
--listen-addr /ip4/0.0.0.0/tcp/30333 \
--public-addr /ip4/INSERT_YOUR_IP_ADDRESS/tcp/30333 \
--state-pruning archive \
--blocks-pruning archive \
--rpc-cors=all \
--unsafe-rpc-external \
--rpc-methods=safe \
--telemetry-url 'wss://telemetry.polkadot.io/submit/ 0'