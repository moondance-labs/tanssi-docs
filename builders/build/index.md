---
title: Build Your Network
description: Install the software to compile your Tanssi-powered network, configure genesis state and core functions, test locally, and prepare for deployment.
icon: material-widgets-outline
template: index-page.html
---

# Build Your Network

Launching your Tanssi-powered network gives you the flexibility to choose between pre-configured templates or fully customized solutions. Whether you're aiming for simplicity or fine-tuned control, Tanssi provides the tools and guidance to bring your vision to life. This section covers everything from selecting a template to customizing modules, testing, and deploying your network.

## The Path to Deployment

Deploying a network with Tanssi can be straightforward or highly customizable, depending on your requirements. The diagram below provides a clear breakdown of these options to guide your decision.

```mermaid
flowchart TD
    Start[Choose a template]
    Start --> Path1[Template is sufficient]
    Start --> Path2[Template needs customization]

    Path1 --> Deploy1[Deploy via Tanssi dApp]

    Path2 --> Fork[Fork the Tanssi repository]
    Fork --> Customize[Customize your network]
    Customize --> Test[Run tests]
    Test --> Deploy2[Deploy via Tanssi dApp]

    style Path1 fill:#151719,stroke:#4ecdc4,stroke-width:2px
    style Path2 fill:#151719,stroke:#4ecdc4,stroke-width:2px
    style Fork fill:#151719,stroke:#4ecdc4,stroke-width:2px
    style Customize fill:#151719,stroke:#4ecdc4,stroke-width:2px
    style Test fill:#151719,stroke:#4ecdc4,stroke-width:2px
    style Start fill:#151719,stroke:#4ecdc4,stroke-width:2px
    style Deploy1 fill:#151719,stroke:#4ecdc4,stroke-width:2px
    style Deploy2 fill:#151719,stroke:#4ecdc4,stroke-width:2px

    %% arrow style
    linkStyle default stroke-width:2px,stroke:#ccc
```

Now that you’ve explored the deployment paths, the next step is to learn more about each template so you can choose the one that best fits your needs. To get started, check out the section below.

## Explore What This Section Covers

:::INSERT_GENERATED_CARDS:::
