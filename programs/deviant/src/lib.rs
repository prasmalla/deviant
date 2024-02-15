use anchor_lang::prelude::*;

declare_id!("F9r3DZXQ4tJD4MbQokKBcKzck9EzBXkeTWNUzyuvSyR4");

#[program]
pub mod deviant {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
