import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Deviant } from "../target/types/deviant";

describe("deviant", () => {
  const provider = anchor.AnchorProvider.env();
  const wallet = provider.wallet as anchor.Wallet;
  anchor.setProvider(provider);

  const program = anchor.workspace.Deviant as Program<Deviant>;

  const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey( // metaplex metadata program id
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );

  const name = "deviant";
  const symbol = "DEVI";
  const uri =
    "https://gist.githubusercontent.com/prasmalla/447c6cf49f50bd25616d20b09f9db446/raw/c142d0af6f239bbceedec47ccc7ccb46162b1e1b/marbles-1.json";

  it("Mint!", async () => {
    // Derive the mint address and the associated token account address

    const mintKeypair: anchor.web3.Keypair = anchor.web3.Keypair.generate();
    const tokenAddress = anchor.utils.token.associatedAddress({
      mint: mintKeypair.publicKey,
      owner: wallet.publicKey,
    });
    console.log(`Token address: ${tokenAddress}`);
    console.log(`Owner: ${wallet.publicKey}`);
    console.log(`Public key: ${mintKeypair.publicKey}`);

    // Derive the metadata and master edition addresses

    const metadataAddress = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mintKeypair.publicKey.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )[0];
    console.log(`Metadata address: ${metadataAddress}`);

    const masterEditionAddress = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mintKeypair.publicKey.toBuffer(),
        Buffer.from("edition"),
      ],
      TOKEN_METADATA_PROGRAM_ID
    )[0];
    console.log(`Master edition address: ${masterEditionAddress}`);

    // Transact with the on-chain program

    await program.methods
      .initialize(name, symbol, uri)
      .accounts({
        associatedTokenAccount: tokenAddress,
        metadataAccount: metadataAddress,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        mint: mintKeypair.publicKey,
        masterEditionAccount: masterEditionAddress,
      })
      .signers([mintKeypair])
      .rpc();
  });
});
