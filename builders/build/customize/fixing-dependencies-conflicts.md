---
title: Fixing Dependencies Conflicts
description: Learn how to manage and resolve double reference issues of dependencies when customizing your Tanssi Appchain template with a Rust-based tool called Diener.
---

# Fixing Dependencies Conflicts {: #fixing-dependencies-conflicts }

## Introduction {: #introduction }

Developers building on top of the [Templates offered by Tanssi](/builders/build/templates/){target=_blank} might want to add some external dependencies into their runtime to expand certain functionality.

The Tanssi repository and the templates take all the dependencies from [a fork](https://github.com/moondance-labs/polkadot-sdk){target=_blank} of the official Polkadot SDK repository. This fork is maintained by the Tanssi engineering team, which usually contributes actively to the Substrate development by fixing issues and enhancing functionalities, and, as a result, the fork repository frequently stays temporarily ahead of the official one.

A double reference issue may arise when adding an external dependency, such as a pallet from a third party. This happens if a Tanssi module references a dependency from the Polkadot SDK fork repository, and the third party references the same dependency from the official Polkadot SDK repository. To solve this issue, the references to the dependencies must be unified.

## Solving Dependencies Conflicts with Diener {: #solving-dependencies-conflicts-diener }

To efficiently handle the dependencies and their origins, you can check out the tool [diener](https://github.com/paritytech/diener){target=_blank}. 

If the `diener` executable file, the cloned [Polkadot SDK repository](https://github.com/paritytech/polkadot-sdk){target=_blank}, and your Tanssi fork are located in the same folder, step into the Tanssi fork folder and execute the following command:

```bash
../diener patch --crates-to-patch ../polkadot-sdk \
    --target https://github.com/paritytech/polkadot-sdk \
    --point-to-git https://github.com/moondance-labs/polkadot-sdk \
    --point-to-git-branch {{ repository.tanssi.release_branch }}
```

This command applies the changes to the `Cargo.toml` file, patching the dependencies, and solving the double reference issues.

You can visit the [diener documentation](https://docs.rs/crate/diener/latest){target=_blank} to learn more about the tool and other extra functions it offers.
