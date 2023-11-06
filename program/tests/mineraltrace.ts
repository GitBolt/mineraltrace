describe("MineralTrace", () => {
  const username = "Aabis";
  const userRole = "Producer";
  const userCompany = "MineralTrace";

  const itemId = 2;
  const itemName = "Gold";
  const itemLocation = "XYZ, India";
  const amountInGm = 50;
  const purity = 88; // This is in percentage

  const [item] = web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("item"),
      pg.wallet.publicKey.toBuffer(),
      new BN(itemId).toArrayLike(Buffer, "le", 4),
    ],
    pg.program.programId
  );

  const [user] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("user"), pg.wallet.publicKey.toBuffer()],
    pg.program.programId
  );

  console.log(
    "Item Account: ",
    item.toBase58(),
    "\nUser Account: ",
    user.toBase58()
  );

  // it("Created User", async () => {
  //   const txHash = await pg.program.methods
  //     .initializeUser(username, userRole, userCompany)
  //     .accounts({
  //       user,
  //       signer: pg.wallet.publicKey,
  //       systemProgram: web3.SystemProgram.programId,
  //     })
  //     .rpc();
  //   console.log(`Signature: ${txHash}`);
  // });

  it("Created Item", async () => {
    const txHash = await pg.program.methods
      .createItem(itemId, itemName, itemLocation, amountInGm, purity)
      .accounts({
        item,
        signer: pg.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();
    console.log(`Signature: ${txHash}`);
  });
});
