### Anchor NFT Example

Mint NFT with Anchor on localnet using Metaplex metadata

Local validator will need to be started with mpl-metadata program
```
export METAPLEX_PROGRAM_ADDRESS="metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
solana program dump -u m ${METAPLEX_PROGRAM_ADDRESS} metaplex_token_metadata_program.so
solana-test-validator --bpf-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s metaplex_token_metadata_program.so --reset
```

With validator running, in a separate terminal window build, deploy and update the program ID in `Anchor.toml` and `lib.rs`

```
anchor build && anchor deploy
```

Run the test to mint the NFT

```
anchor run test
```

Use [ngrok](http://ngrok.com) to forward localhost and use as custom RPC endpoint in Solana explorer / wallet to view the minted NFT

```
ngrok http 8899
````

-IMPORTANT-
This uses centralized `json`  on Github for the NFT allowing to change the image and other properties

### Next Steps
Use the most recent solana-sdk and metaplex libraries with decentralized storage
