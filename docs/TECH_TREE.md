The tech tree:

```mermaid

flowchart TD;
  A[BIOMASS_COMPRESSION]
  B[FARMING]
  C[SHELTER]
  D[CRYONICS]
  E[FORESTRY]
  F[STORAGE]
  G[BIOMASS_RECLAMATION]
  H[EXCAVATION]

  A --> B
  A --> C
  A --> H
  B --> D
  C --> D
  D --> E
  D --> F
  E --> G


```
