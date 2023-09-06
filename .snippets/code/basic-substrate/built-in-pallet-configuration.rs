parameter_types! {
    // The amount of funds that must be reserved for an asset
    pub const AssetDeposit: Balance = 100;
    // The amount of funds that must be reserved when creating 
    // a new transfer approval
    pub const ApprovalDeposit: Balance = 1;
    // The basic amount of funds that must be reserved when adding metadata 
    // to your asset
    pub const MetadataDepositBase: Balance = 10;
    // The additional funds that must be reserved for the number of bytes 
    // you store in your metadata
    pub const MetadataDepositPerByte: Balance = 1;
    // Maximum lenght for the asset symbol and friendly name
    pub const StringLimit: u32 = 50;
}

// Implementing the Assets config trait for the runtime
impl pallet_assets::Config for Runtime {
    type RuntimeEvent = RuntimeEvent;

    // Stores the balances in an unsigned integer of 128bits
    type Balance = u128;
    // The id of an asset can be defined as an unsigned integer of 64 bits
    type AssetId = u64;
    // Uses module Balances as mechanism for currency operations
    type Currency = Balances;

    // Configure the module by referencing the previously
    // defined constants
    type AssetDeposit = AssetDeposit;
    type MetadataDepositBase = MetadataDepositBase;
    type MetadataDepositPerByte = MetadataDepositPerByte;
    type ApprovalDeposit = ApprovalDeposit;
    type StringLimit = StringLimit;

    // More configuration
    type AssetIdParameter = u64;
    // Defines the allowed origins to create assets
    type CreateOrigin = 
        frame_support::traits::AsEnsureOriginWithArg<frame_system::EnsureSigned<AccountId>>;
    // Root can create assets
    type ForceOrigin = EnsureRoot<AccountId>;
    type AssetAccountDeposit = frame_support::traits::ConstU128<1>;
    type Freezer = ();
    type Extra = ();
    type WeightInfo = pallet_assets::weights::SubstrateWeight<Runtime>;
    type RemoveItemsLimit = frame_support::traits::ConstU32<1000>;
    #[cfg(feature = "runtime-benchmarks")]
    type BenchmarkHelper = ();
    type CallbackHandle = ();
}