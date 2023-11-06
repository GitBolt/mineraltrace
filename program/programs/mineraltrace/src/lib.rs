use anchor_lang::prelude::*;

declare_id!("wndguEocAYMYBb1sFbzc8cpvt35zwWc4LxpGi7tEg9X");

#[program]
mod mineraltrace {
    use super::*;
    pub fn initialize_user(
        ctx: Context<Initialize>,
        name: String,
        user_type: String,
        company: String,
    ) -> Result<()> {
        let user = &mut ctx.accounts.user;
        let clock = Clock::get()?;
        user.name = name;
        user.owner = *ctx.accounts.signer.key;
        user.user_type = user_type;
        user.company = company;
        user.date_created = clock.unix_timestamp as u64;
        Ok(())
    }

    pub fn create_item(
        ctx: Context<InitializeItem>,
        item_id: u32,
        name: String,
        location: String,
        amount: u32,
        purity: u32,
    ) -> Result<()> {
        let item = &mut ctx.accounts.item;
        let clock = Clock::get()?;
        item.name = name;
        item.owner = *ctx.accounts.signer.key;
        item.location = location;
        item.amount_in_gm = amount;
        item.purity = purity;
        item.date_created = clock.unix_timestamp as u64;
        Ok(())
    }

}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init, 
        payer = signer, 
        space = 8 + (4 + 10) + 32 + (4 + 10) + (4 + 10) + 8,
        seeds = [b"user", signer.key().as_ref()], 
        bump
    )]
    pub user: Account<'info, User>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(item_id : u32)]
pub struct InitializeItem<'info> {
    #[account(
        init,
        payer= signer,
        space = 8 + (4 + 20) + 32 + (4 + 20) + 4 + 4 + 8,
        seeds = [b"item", signer.key().as_ref(), item_id.to_le_bytes().as_ref()], 
        bump
    )]
    pub item: Account<'info, Item>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct User {
    pub name: String,
    pub owner: Pubkey,
    pub user_type: String,
    pub company: String,
    pub date_created: u64,
}

#[account]
pub struct Item {
    pub name: String,
    pub owner: Pubkey,
    pub location: String,
    pub amount_in_gm: u32,
    pub purity: u32,
    pub date_created: u64,
}
