The class heirarchy:

```mermaid

graph TD;
  Z[Unlockable] --> A[ZoneEntity]
  Z[Unlockable] --> K[BaseTech]
  A[ZoneEntity] --> B[ProducerConsumer]
  A[ZoneEntity] --> C[BaseAction]
  E[StorageProvider] --> D[BaseBuilding]
  B[ProducerConsumer] --> E[StorageProvider]
  A[ZoneEntity] --> H[BaseResource]
  B[ProducerConsumer] --> I[BaseJob]
  Z[Unlockable] --> J[Tech]
  A[ZoneEntity] --> L[Resources]
  A[ZoneEntity] --> M[Buildings]
  A[ZoneEntity] --> N[Power]


```
