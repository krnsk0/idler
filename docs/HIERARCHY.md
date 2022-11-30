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
```