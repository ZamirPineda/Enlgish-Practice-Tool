import type { TechDeck } from "@/features/data/techDecks_chunks/types";

export const techDecksPart4: TechDeck[] = [
  {
    id: "kafka",
    name: "Kafka",
    cards: [
      {
        prompt:
          "¿Cuál es la función principal de la plataforma Apache Kafka según el repositorio oficial?",
        answer:
          "Funcionar como una plataforma de streaming distribuida que permite publicar, suscribir, almacenar y procesar flujos de eventos.",
      },
      {
        prompt:
          "¿Qué componente de Kafka se encarga de la comunicación de red del lado del cliente y del seguimiento de solicitudes?",
        answer:
          "El componente NetworkClient gestiona las conexiones, las solicitudes de tipo ClientRequest y las respuestas ClientResponse.",
      },
      {
        prompt:
          "En el contexto de la identificación de componentes, ¿qué estructura representa una instantánea inmutable de nodos, temas y particiones?",
        answer:
          "La clase Cluster proporciona una visión inmutable de la topología actual del clúster de Kafka.",
      },
      {
        prompt:
          "¿Qué identificador de 128 bits se utiliza para garantizar la unicidad de las referencias a temas en el sistema?",
        answer:
          "La clase Uuid proporciona identificadores universalmente únicos de 128 bits para metadatos como los IDs de temas.",
      },
      {
        prompt:
          "¿Cómo se define una TopicPartition en las estructuras de datos fundamentales de Kafka?",
        answer:
          "Es una pareja que vincula el nombre de un tema (topic) con un número de partición específico.",
      },
      {
        prompt:
          "Cloze: La interfaz administrativa de Kafka para realizar tareas de gestión de forma asíncrona y no bloqueante es ____.",
        answer: "Admin",
      },
      {
        prompt:
          "¿Qué clase centraliza la configuración del cliente administrativo, incluyendo parámetros de red y seguridad?",
        answer:
          "AdminClientConfig define y valida todos los ajustes necesarios para el funcionamiento del AdminClient.",
      },
      {
        prompt:
          "¿Qué mecanismo utiliza Kafka para permitir que los componentes reaccionen a cambios de configuración dinámicos sin reiniciar?",
        answer:
          "La interfaz Reconfigurable permite a los componentes validar y aplicar cambios de configuración en tiempo de ejecución.",
      },
      {
        prompt:
          "¿Qué funcionalidad permite el uso de clases ConfigProvider en el sistema de configuración de Kafka?",
        answer:
          "Permiten recuperar valores de configuración desde fuentes externas como variables de entorno o archivos de propiedades.",
      },
      {
        prompt:
          "¿Cuál es la jerarquía base para todas las excepciones de la API pública en Kafka?",
        answer:
          "La mayoría de las excepciones de la API pública extienden la clase ApiException.",
      },
      {
        prompt: "Concepto: RetriableException",
        answer:
          "Definición: Categoría de excepciones que indica errores transitorios los cuales podrían resolverse si la operación se reintenta tras un retardo.",
      },
      {
        prompt:
          "¿Qué interfaz en el lado del servidor gestiona las Listas de Control de Acceso (ACL) y la lógica de autorización personalizada?",
        answer:
          "La interfaz Authorizer define los métodos para gestionar ACLs y aplicar políticas de autorización de acceso.",
      },
      {
        prompt:
          "¿Qué política permite validar y aplicar reglas personalizadas durante la creación de temas en el broker?",
        answer:
          "La interfaz CreateTopicPolicy permite imponer restricciones operativas u organizativas en la creación de nuevos temas.",
      },
      {
        prompt:
          "¿Qué componente rastrea el ciclo de vida de las conexiones a cada nodo, aplicando retrocesos exponenciales en caso de desconexión?",
        answer:
          "ClusterConnectionStates gestiona el estado de conexión a los nodos y controla los reintentos de conexión.",
      },
      {
        prompt:
          "¿Para qué sirve la clase ApiVersions en la comunicación entre clientes y brokers?",
        answer:
          "Gestiona las versiones de la API soportadas por los nodos para asegurar la compatibilidad entre clientes y brokers.",
      },
      {
        prompt:
          "¿Qué optimización permite el FetchSessionHandler para las lecturas con gran abanico (fan-out)?",
        answer:
          "Gestiona sesiones de recuperación que permiten realizar peticiones de fetch incrementales para reducir la transferencia de datos redundantes.",
      },
      {
        prompt:
          "¿Qué anotación se utiliza para indicar que una API no ofrece garantías de compatibilidad entre versiones?",
        answer:
          "La anotación Unstable se utiliza para marcar componentes de la API cuya compatibilidad futura no está garantizada.",
      },
      {
        prompt:
          "¿Qué estructura de datos asocia un permiso a un principal en un recurso específico de Kafka?",
        answer:
          "La clase AclBinding vincula un patrón de recurso con una entrada de control de acceso (AccessControlEntry).",
      },
      {
        prompt:
          "¿Cómo gestiona Kafka la transferencia eficiente de datos a través de diferentes algoritmos de compresión?",
        answer:
          "Mediante la interfaz Compression, que abstrae algoritmos como GZIP, Snappy, LZ4 y ZSTD.",
      },
      {
        prompt:
          "¿Qué permiten los encabezados (headers) de mensaje en los registros de Kafka?",
        answer:
          "Permiten adjuntar metadatos de aplicación definidos por el usuario en pares clave-valor a cada registro individual.",
      },
      {
        prompt:
          "¿Cuál es el punto de entrada principal para inicializar y arrancar un servidor de Kafka?",
        answer:
          "El objeto Kafka en el núcleo del servidor es el encargado de parsear argumentos e iniciar el ciclo de vida del broker.",
      },
      {
        prompt:
          "¿Qué componente desacopla la E/S de red del procesamiento lógico de las solicitudes en el servidor?",
        answer:
          "El RequestChannel actúa como intermediario gestionando colas de peticiones y respuestas entre hilos de red y procesadores.",
      },
      {
        prompt:
          "¿Qué protocolo utiliza Kafka para la gestión de metadatos en despliegues que no dependen de ZooKeeper?",
        answer:
          "Kafka utiliza el protocolo de consenso KRaft (Raft Consensus Protocol) para la gestión robusta de metadatos.",
      },
      {
        prompt:
          "¿Cuál es la función del KafkaMetadataLog en la implementación de KRaft?",
        answer:
          "Gestiona el registro de metadatos replicado, encargándose de añadir registros, gestionar el límite superior (High Watermark) y realizar truncamientos.",
      },
      {
        prompt:
          "¿Qué clase encapsula todo el estado y la lógica de negocio de una partición de tema en el broker?",
        answer:
          "La clase Partition gestiona el estado de una partición individual, incluyendo la gestión del líder y de las réplicas sincronizadas (ISR).",
      },
      {
        prompt:
          "¿Qué significa el término 'High Watermark' (HW) en el contexto de la replicación de Kafka?",
        answer:
          "Es el desplazamiento (offset) más alto que ha sido replicado con éxito a la mayoría del quorum de réplicas.",
      },
      {
        prompt:
          "¿Qué objeto rastrea si una réplica está lo suficientemente actualizada para pertenecer al conjunto ISR?",
        answer:
          "La clase Replica rastrea el estado de recuperación (fetch) y calcula el tiempo de última sincronización para determinar su elegibilidad en el ISR.",
      },
      {
        prompt:
          "¿Qué componente del servidor se encarga de la persistencia física, recuperación y mantenimiento de los registros en disco?",
        answer:
          "El LogManager supervisa el ciclo de vida completo de los UnifiedLog, incluyendo la creación, carga y borrado de segmentos.",
      },
      {
        prompt:
          "Cloze: El archivo ____ permite al broker evitar procesos de recuperación costosos al iniciar tras un apagado controlado.",
        answer: ".kafka_cleanshutdown",
      },
      {
        prompt:
          "¿Qué componente coordina el estado de las transacciones atómicas que involucran múltiples particiones de temas?",
        answer:
          "El TransactionCoordinator gestiona el ciclo de vida de las transacciones y coordina la escritura de marcadores de transacción.",
      },
      {
        prompt:
          "¿Qué función cumple el TransactionStateManager dentro de la arquitectura de transacciones?",
        answer:
          "Se encarga de almacenar y gestionar de forma persistente los metadatos de estado asociados a cada ID transaccional.",
      },
      {
        prompt:
          "¿Qué mecanismo se utiliza para liberar registros adquiridos por un consumidor compartido si no se confirman a tiempo?",
        answer:
          "El AcquisitionLockTimeoutHandler libera los registros cuyo bloqueo de adquisición ha expirado para que puedan ser reasignados.",
      },
      {
        prompt:
          "¿Cuál es el propósito fundamental del marco de trabajo Kafka Connect?",
        answer:
          "Facilitar el movimiento de datos entre Kafka y otros sistemas externos mediante conectores de origen (source) y sumidero (sink).",
      },
      {
        prompt:
          "¿Qué interfaz actúa como coordinador central para gestionar el ciclo de vida de los conectores y sus tareas en Connect?",
        answer:
          "La interfaz Herder gestiona el inicio, parada, pausa y reinicio de conectores y tareas, así como las actualizaciones de configuración.",
      },
      {
        prompt:
          "¿Cómo se garantiza la persistencia de configuraciones y desplazamientos en un despliegue distribuido de Kafka Connect?",
        answer:
          "Connect utiliza temas compactos de Kafka como almacenamiento persistente a través de implementaciones como KafkaConfigBackingStore.",
      },
      {
        prompt:
          "¿Qué política por defecto impide que los conectores de Connect sobrescriban configuraciones de cliente a nivel de worker?",
        answer:
          "La política NoneConnectorClientConfigOverridePolicy es el comportamiento predeterminado que prohíbe cualquier sobrescritura.",
      },
      {
        prompt:
          "¿Cuál es la función del RetryWithToleranceOperator en la ejecución de tareas de Kafka Connect?",
        answer:
          "Permite continuar el procesamiento incluso si ocurren errores en transformaciones o conversiones individuales, según niveles de tolerancia configurables.",
      },
      {
        prompt:
          "¿Qué es una Dead Letter Queue (DLQ) en el contexto de Kafka Connect?",
        answer:
          "Es un tema de Kafka al que se redirigen los registros que no pueden ser procesados tras agotar los reintentos en un conector de sumidero.",
      },
      {
        prompt:
          "¿Qué abstracción de Kafka Streams representa un flujo de registros de cambios (changelog) donde cada registro es una actualización de una clave?",
        answer:
          "La interfaz KTable representa este tipo de flujo de datos estructurado como una tabla primaria.",
      },
      {
        prompt:
          "¿Cuál es la diferencia principal entre una KTable y una GlobalKTable en Kafka Streams?",
        answer:
          "La GlobalKTable se replica completamente en todas las instancias de la aplicación, eliminando la necesidad de re-particionar datos en las uniones.",
      },
      {
        prompt:
          "¿Qué interfaz de la API de procesador (PAPI) proporciona acceso a metadatos de flujo y permite programar puntuaciones periódicas?",
        answer:
          "ProcessorContext ofrece acceso al entorno de ejecución y permite interactuar con los almacenes de estado y programar tareas.",
      },
      {
        prompt:
          "¿Qué funcionalidad de Kafka Streams permite a aplicaciones externas consultar directamente los almacenes de estado internos?",
        answer:
          "La API de Consultas Interactivas (Interactive Queries) permite extraer datos de los almacenes de estado locales o globales.",
      },
      {
        prompt:
          "Cloze: La estrategia ____ controla si los resultados agregados en Streams se emiten en cada actualización o solo cuando se cierra la ventana de tiempo.",
        answer: "EmitStrategy",
      },
      {
        prompt:
          "¿Qué estructura de Kafka Streams rastrea el estado de procesamiento en las particiones para garantizar la consistencia en las consultas?",
        answer:
          "La clase Position rastrea los desplazamientos procesados por un almacén de estado.",
      },
      {
        prompt:
          "¿Qué herramienta de línea de comandos se utiliza para gestionar configuraciones de entidades como brokers, temas y usuarios?",
        answer:
          "kafka-configs.sh invoca la clase ConfigCommand para la gestión de configuraciones dinámicas.",
      },
      {
        prompt:
          "¿Cuál es el script base encargado de configurar el entorno de ejecución Java y el classpath para todas las herramientas de Kafka?",
        answer:
          "kafka-run-class.sh es el punto de entrada central para la ejecución de aplicaciones Java en Kafka.",
      },
      {
        prompt:
          "¿Qué utilidad permite realizar pruebas de rendimiento midiendo la latencia de extremo a extremo de los mensajes?",
        answer:
          "kafka-e2e-latency.sh mide el tiempo de ida y vuelta de los mensajes para evaluar la capacidad de respuesta del sistema.",
      },
      {
        prompt:
          "¿Qué herramienta se encarga de formatear directorios de almacenamiento e inicializar los metadatos para el modo KRaft?",
        answer:
          "kafka-storage.sh utiliza la clase StorageTool para preparar los directorios de registro y los metadatos del clúster.",
      },
      {
        prompt:
          "¿Qué componente captura el estado completo del clúster de metadatos en un punto temporal específico en KRaft?",
        answer:
          "MetadataImage es el agregado inmutable que representa la totalidad de la información del clúster en un momento dado.",
      },
      {
        prompt:
          "¿Cómo se aplican los cambios incrementales a la imagen de metadatos en el controlador de Kafka?",
        answer:
          "Los objetos MetadataDelta procesan registros ApiMessage para aplicar actualizaciones y generar una nueva MetadataImage inmutable.",
      },
      {
        prompt:
          "¿Qué gestor del controlador se encarga de rastrear la validez de las sesiones de los brokers y sus latidos (heartbeats)?",
        answer:
          "BrokerHeartbeatManager supervisa la vivacidad de los brokers y el estado de sus sesiones dentro del clúster.",
      },
      {
        prompt:
          "¿Qué interfaz define las políticas para decidir en qué brokers y directorios se colocarán las réplicas de una partición?",
        answer:
          "La interfaz ReplicaPlacer establece el contrato para las políticas de colocación de réplicas en el clúster.",
      },
      {
        prompt:
          "¿Qué estrategia de colocación distribuye las réplicas priorizando la tolerancia a fallos entre diferentes racks?",
        answer:
          "StripedReplicaPlacer distribuye las réplicas de forma aleatoria y equilibrada entre racks y brokers disponibles.",
      },
      {
        prompt: "Concepto: QuorumState",
        answer:
          "Definición: Componente que centraliza la lógica de la máquina de estados de un nodo Raft, definiendo roles como Líder, Candidato o Seguidor.",
      },
      {
        prompt:
          "¿Qué clase almacena de forma persistente el estado de elección (época, líder y voto) de un nodo Raft?",
        answer:
          "ElectionState encapsula la información crítica del consenso que debe ser recuperada tras un reinicio del nodo.",
      },
      {
        prompt:
          "¿Qué utilidad permite la comunicación asíncrona y no bloqueante mediante el intercambio de mensajes de protocolo Raft?",
        answer:
          "KafkaNetworkChannel gestiona el envío y la recepción de solicitudes Raft de forma asíncrona.",
      },
      {
        prompt:
          "¿Para qué sirve el BatchMemoryPool en la implementación de Raft?",
        answer:
          "Optimiza el uso de memoria mediante la asignación y reutilización de instancias de ByteBuffer de tamaño fijo.",
      },
      {
        prompt:
          "¿Qué componente gestiona la membresía y el reequilibrio (rebalance) de los grupos de consumidores en Kafka?",
        answer:
          "El GroupCoordinator coordina la asignación de particiones y rastrea los desplazamientos (offsets) confirmados de los grupos.",
      },
      {
        prompt:
          "¿Qué marco de trabajo permite construir coordinadores como máquinas de estado replicadas gestionadas por particiones de temas?",
        answer:
          "CoordinatorRuntime proporciona la infraestructura para el estado consistente, procesamiento asíncrono y reconstrucción de estado mediante reproducción de registros.",
      },
      {
        prompt:
          "¿Cuál es el propósito del OffsetMetadataManager dentro de la coordinación de grupos?",
        answer:
          "Gestionar exclusivamente los desplazamientos confirmados y transaccionales, incluyendo su persistencia y expiración.",
      },
      {
        prompt:
          "¿Qué estrategia de asignación distribuye particiones en rangos contiguos, priorizando la estabilidad de los miembros estáticos?",
        answer:
          "RangeAssignor asigna rangos contiguos de particiones a cada miembro para facilitar la co-partición.",
      },
      {
        prompt:
          "¿Qué garantiza el proceso de limpieza de registros (log cleaning) en Kafka?",
        answer:
          "Garantiza que el registro retenga al menos el último valor para cada clave de mensaje, compactando el espacio ocupado en disco.",
      },
      {
        prompt:
          "¿Cuál es la función del LeaderEpochFileCache en la replicación de datos?",
        answer:
          "Mantiene un historial persistente de los mapeos entre épocas de líder y offsets iniciales para permitir truncamientos de log precisos en los seguidores.",
      },
      {
        prompt:
          "¿Qué permite la funcionalidad de 'Tiered Storage' (almacenamiento por niveles) en Kafka?",
        answer:
          "Permite mover segmentos de log antiguos a sistemas de almacenamiento remoto más económicos, liberando espacio en disco local.",
      },
      {
        prompt:
          "¿Qué componente coordina las tareas de copia, expiración y seguimiento de offsets en el almacenamiento por niveles?",
        answer:
          "El RemoteLogManager actúa como coordinador central para todas las operaciones relacionadas con el almacenamiento remoto de registros.",
      },
      {
        prompt:
          "¿Cómo evita el sistema el agotamiento de recursos durante las operaciones de copia a almacenamiento remoto?",
        answer:
          "Mediante el RLMQuotaManager, que aplica límites de tasa de bytes para controlar el tráfico de red hacia el almacenamiento remoto.",
      },
      {
        prompt:
          "¿Qué utilidad del servidor permite limitar la tasa de operaciones para mantener la estabilidad del sistema bajo carga?",
        answer:
          "La clase Throttler introduce retardos dinámicos cuando la tasa de operaciones observada supera un límite deseado.",
      },
      {
        prompt:
          "¿Qué herramienta se utiliza en el desarrollo de Kafka para generar automáticamente código Java a partir de esquemas JSON?",
        answer:
          "MessageGenerator procesa especificaciones JSON para crear clases de datos de mensajes con lógica de serialización incluida.",
      },
      {
        prompt:
          "¿Cuál es el objetivo de utilizar micro-benchmarks JMH en el proyecto Kafka?",
        answer:
          "Evaluar las características de latencia y rendimiento de componentes críticos como ACLs, cachés y protocolos de red.",
      },
      {
        prompt:
          "Cloze: En el entorno de Kafka Streams, las operaciones de ventana utilizan un ____ para determinar si los datos tardíos aún pueden ser procesados.",
        answer: "grace period (periodo de gracia)",
      },
      {
        prompt:
          "¿Qué clase representa el estado de una réplica individual en términos de sus desplazamientos finales y tiempos de actualización?",
        answer:
          "ReplicaState encapsula la información crítica como el logEndOffset y el lastCaughtUpTimeMs.",
      },
      {
        prompt:
          "¿Qué proceso asegura que los registros de metadatos sensibles no se expongan en los logs del sistema?",
        answer:
          "La clase RecordRedactor se encarga de censurar información como contraseñas o material de claves antes de la escritura en logs.",
      },
      {
        prompt:
          "¿Qué mecanismo asíncrono utiliza Kafka para retrasar la respuesta a una solicitud hasta que se cumpla una condición o expire un tiempo?",
        answer:
          "El patrón de purgatorio (purgatory) gestiona operaciones diferidas como DelayedProduce o DelayedFetch.",
      },
      {
        prompt:
          "¿Qué objeto de Kafka Connect representa una unidad fundamental de movimiento de datos ejecutada por un worker?",
        answer:
          "Una Task (tarea) es la instancia de ejecución que procesa los registros de datos tras la instanciación de un conector.",
      },
      {
        prompt:
          "¿Cuál es la función de un Converter en el ecosistema de Kafka Connect?",
        answer:
          "Transformar los datos entre el formato interno estructurado de Connect y el formato de bytes serializados de Kafka.",
      },
      {
        prompt:
          "¿Cómo garantiza Kafka Connect la entrega de exactamente una vez en tareas de origen?",
        answer:
          "Mediante el uso de un productor transaccional que confirma atómicamente los registros de origen y sus desplazamientos correspondientes.",
      },
    ],
  },
  {
    id: "kafka2",
    name: "Kafka2",
    cards: [
      {
        prompt:
          "¿Cuáles son los tres objetivos fundamentales que se buscan en los sistemas de datos según Martin Kleppmann?",
        answer:
          "Fiabilidad (Reliability), escalabilidad (Scalability) y mantenibilidad (Maintainability).",
      },
      {
        prompt:
          "En el contexto de sistemas distribuidos, ¿qué es la replicación (replication)?",
        answer:
          "Es el proceso de mantener una copia de los mismos datos en múltiples máquinas conectadas a través de una red.",
      },
      {
        prompt:
          "La partición de datos, también conocida como _____, es una estrategia para distribuir una base de datos en múltiples máquinas.",
        answer: "sharding",
      },
      {
        prompt:
          "En sistemas de datos, un error que está correlacionado entre nodos y tiende a causar más fallos que los fallos de hardware no correlacionados se conoce como _____.",
        answer: "error sistemático (systematic error)",
      },
      {
        prompt:
          "¿Qué efecto profundo tiene el modelo de datos elegido en una aplicación?",
        answer:
          "Determina lo que el software puede y no puede hacer, afectando la simplicidad del código de la aplicación.",
      },
      {
        prompt:
          "¿Para qué tipo de estructura de datos es particularmente adecuado un modelo de datos de documento?",
        answer:
          "Para datos con una estructura similar a un documento o árbol (relaciones uno a muchos), donde todo el árbol se carga a la vez.",
      },
      {
        prompt:
          "¿Cuál es el propósito principal de un índice en una base de datos?",
        answer:
          "Actuar como una estructura de datos adicional que ayuda a encontrar eficientemente el valor de una clave particular.",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja de mantener índices adicionales en una base de datos?",
        answer:
          "Incurre en una sobrecarga, especialmente en las escrituras, ya que el índice también debe actualizarse cada vez que se escriben datos.",
      },
      {
        prompt:
          "Un diseño de almacenamiento donde los valores de cada columna se almacenan juntos, en lugar de por filas, se llama _____.",
        answer: "almacenamiento orientado a columnas (column-oriented storage)",
      },
      {
        prompt:
          "¿Qué es la compatibilidad hacia adelante (forward compatibility) en la evolución de esquemas de datos?",
        answer:
          "Requiere que el código más antiguo ignore las adiciones realizadas por una versión más nueva del código, permitiendo la coexistencia.",
      },
      {
        prompt: "En Kafka, ¿qué es un bróker (broker)?",
        answer:
          "Es un servidor único en un clúster de Kafka que almacena datos de temas y sirve peticiones de productores y consumidores.",
      },
      {
        prompt:
          "¿Qué rol desempeña el líder de una partición (partition leader) en Kafka?",
        answer:
          "Es el único bróker responsable de gestionar todas las lecturas y escrituras para esa partición específica.",
      },
      {
        prompt:
          "¿Cuál es la función de las réplicas seguidoras (follower replicas) en Kafka?",
        answer:
          "Proporcionan redundancia copiando los mensajes del líder de la partición, permitiendo tomar el liderazgo si el líder falla.",
      },
      {
        prompt:
          "La herramienta de Kafka que consume mensajes de un clúster y los produce en otro se llama _____.",
        answer: "MirrorMaker",
      },
      {
        prompt:
          "En una replicación basada en líder, ¿cómo se añade un nuevo seguidor (follower)?",
        answer:
          "Copiando una instantánea (snapshot) de la base de datos del líder y luego solicitando todos los cambios de datos ocurridos desde la instantánea.",
      },
      {
        prompt:
          "¿Qué se entiende por 'retraso de replicación' (replication lag)?",
        answer:
          "Es el tiempo que tarda un cambio realizado en el líder en reflejarse en un seguidor en un sistema de replicación asíncrona.",
      },
      {
        prompt: "Concepto: Consistencia eventual (Eventual Consistency).",
        answer:
          "Definición: Una garantía de que, si no se realizan nuevas actualizaciones, todas las réplicas eventualmente convergerán al mismo valor.",
      },
      {
        prompt:
          "En la replicación multilíder, ¿cuál es el principal desafío que debe abordarse cuando los mismos datos se modifican simultáneamente en diferentes centros de datos?",
        answer:
          "La resolución de conflictos de escritura (write conflict resolution).",
      },
      {
        prompt:
          "En sistemas sin líder como Riak, los valores escritos simultáneamente que deben ser fusionados por el cliente se denominan _____.",
        answer: "hermanos (siblings)",
      },
      {
        prompt:
          "Cuando se particionan índices secundarios, ¿qué es un índice global (global index)?",
        answer:
          "Un índice que cubre datos de todas las particiones, y que a su vez debe ser particionado para evitar cuellos de botella.",
      },
      {
        prompt:
          "¿Qué significa la serializabilidad (serializability) en el contexto del aislamiento ACID?",
        answer:
          "Que el resultado de ejecutar transacciones concurrentes es el mismo que si se hubieran ejecutado en serie, una tras otra.",
      },
      {
        prompt:
          "La propiedad ACID que garantiza que una transacción se complete en su totalidad o no tenga ningún efecto se llama _____.",
        answer: "atomicidad (atomicity)",
      },
      {
        prompt:
          "¿Qué tipo de condición de carrera se previene con operaciones atómicas como 'comparar y establecer' (compare-and-set)?",
        answer:
          "Las actualizaciones perdidas (lost updates), donde dos clientes leen, modifican y escriben el mismo objeto simultáneamente.",
      },
      {
        prompt:
          "El problema de concurrencia donde una transacción lee algunos datos, otra transacción escribe datos que afectan a la primera, y la primera transacción es invalidada se llama _____.",
        answer: "sesgo de escritura (write skew)",
      },
      {
        prompt:
          "¿Cuál es la forma más simple de evitar problemas de concurrencia en transacciones?",
        answer:
          "Eliminar la concurrencia por completo ejecutando solo una transacción a la vez en serie (serial execution).",
      },
      {
        prompt:
          "El aislamiento de instantánea serializable (Serializable Snapshot Isolation - SSI) es una técnica de control de concurrencia _____.",
        answer: "optimista",
      },
      {
        prompt:
          "En un sistema distribuido, si envías una petición y no recibes respuesta, ¿por qué es imposible saber la causa exacta del fallo?",
        answer:
          "Porque no se puede distinguir si la petición se perdió, el nodo remoto está caído o la respuesta se perdió.",
      },
      {
        prompt:
          "Para medir el tiempo transcurrido (ej. timeouts) en un sistema distribuido, ¿qué tipo de reloj es generalmente seguro de usar?",
        answer:
          "Un reloj monotónico (monotonic clock), ya que no asume sincronización entre los relojes de diferentes nodos.",
      },
      {
        prompt:
          "La estrategia de resolución de conflictos que se basa en la marca de tiempo de un reloj local para decidir qué escritura conservar se llama _____ y es propensa a la pérdida de datos.",
        answer: "la última escritura gana (Last Write Wins - LWW)",
      },
      {
        prompt:
          "¿Qué garantía proporciona la linealizabilidad (linearizability) en un sistema distribuido?",
        answer:
          "Hace que el sistema parezca tener una sola copia de los datos, y que todas las operaciones sobre ella sean atómicas y se ejecuten en un orden bien definido.",
      },
      {
        prompt:
          "La difusión de orden total (total order broadcast) es un protocolo que garantiza que todos los nodos entreguen los mismos mensajes en el _____.",
        answer: "mismo orden",
      },
      {
        prompt:
          "El problema de conseguir que varios nodos se pongan de acuerdo sobre algo en un sistema distribuido se conoce como _____.",
        answer: "consenso (consensus)",
      },
      {
        prompt:
          "¿Cuál es el propósito del algoritmo de confirmación en dos fases (Two-Phase Commit - 2PC)?",
        answer:
          "Lograr la confirmación atómica de transacciones en múltiples nodos, asegurando que todos confirmen o todos aborten.",
      },
      {
        prompt:
          "Sistemas como ZooKeeper y etcd utilizan un algoritmo de _____ para replicar una pequeña cantidad de datos en todos los nodos.",
        answer:
          "difusión de orden total tolerante a fallos (fault-tolerant total order broadcast)",
      },
      {
        prompt:
          "¿Qué característica de ZooKeeper permite implementar un bloqueo distribuido (distributed lock)?",
        answer:
          "Sus operaciones atómicas linealizables, como 'comparar y establecer' (compare-and-set).",
      },
      {
        prompt: "En Kafka, ¿qué es un grupo de consumidores (consumer group)?",
        answer:
          "Un conjunto de consumidores que cooperan para consumir datos de un tema, donde cada partición es asignada a un solo consumidor del grupo.",
      },
      {
        prompt:
          "¿Cuál es el principal mecanismo de escalabilidad para el consumo de datos en Kafka?",
        answer:
          "Añadir más consumidores a un grupo de consumidores para distribuir la carga de las particiones.",
      },
      {
        prompt:
          "¿Qué sucede si se añaden más consumidores a un grupo que el número de particiones de un tema en Kafka?",
        answer:
          "Los consumidores adicionales permanecerán inactivos (idle) ya que no hay particiones disponibles para asignarles.",
      },
      {
        prompt:
          "En Kafka, el proceso de reasignar particiones entre los miembros de un grupo de consumidores se llama _____.",
        answer: "reequilibrio (rebalance)",
      },
      {
        prompt:
          "¿Qué ventaja ofrece la membresía de grupo estática (static group membership) en los consumidores de Kafka?",
        answer:
          "Evita un reequilibrio completo del grupo cuando un consumidor se reinicia, ya que se le reasignan las mismas particiones que tenía antes.",
      },
      {
        prompt:
          "En un consumidor de Kafka, el parámetro `fetch.min.bytes` controla la cantidad mínima de datos que el bróker debe tener antes de responder a una petición de obtención, reduciendo la carga en el _____ y el _____.",
        answer: "consumidor, bróker",
      },
      {
        prompt:
          "¿Qué sucede si un consumidor de Kafka no envía un 'heartbeat' al coordinador del grupo dentro del `session.timeout.ms`?",
        answer:
          "Se considera muerto y el coordinador del grupo inicia un reequilibrio para reasignar sus particiones a otros miembros.",
      },
      {
        prompt: "En Kafka, ¿qué es un 'offset' de consumidor?",
        answer:
          "Es un marcador que indica la posición del último mensaje que un consumidor ha procesado con éxito en una partición.",
      },
      {
        prompt:
          "Si `enable.auto.commit` está activado en un consumidor de Kafka, ¿cuándo se confirman los offsets?",
        answer:
          "Periódicamente en segundo plano, según el intervalo definido en `auto.commit.interval.ms`.",
      },
      {
        prompt:
          "¿Qué método de la API de consumidor de Kafka ofrece una confirmación de offset síncrona y bloqueante?",
        answer: "`commitSync()`",
      },
      {
        prompt:
          "¿Por qué es importante el orden correcto de las confirmaciones de offset al usar `commitAsync()` en Kafka?",
        answer:
          "Para evitar que una confirmación más antigua sobrescriba una más nueva en caso de reintentos, lo que podría causar más duplicados en un reequilibrio.",
      },
      {
        prompt:
          "¿Qué clase en la API de cliente de Kafka se utiliza para la gestión programática de temas, grupos de consumidores y configuraciones?",
        answer: "AdminClient",
      },
      {
        prompt:
          "¿Qué es una réplica sincronizada (In-Sync Replica - ISR) en Kafka?",
        answer:
          "Es una réplica que se mantiene al día con el líder de la partición y es elegible para convertirse en el nuevo líder si el actual falla.",
      },
      {
        prompt:
          "¿Cuál es el riesgo de habilitar `unclean.leader.election.enable` en Kafka?",
        answer:
          "Permite que una réplica no sincronizada se convierta en líder, lo que puede provocar la pérdida de mensajes.",
      },
      {
        prompt:
          "El parámetro de tema `min.insync.replicas` en Kafka especifica el número mínimo de réplicas que deben acusar recibo de una escritura para que esta se considere _____.",
        answer: "exitosa (successful)",
      },
      {
        prompt: "En un productor de Kafka, ¿qué significa configurar `acks=0`?",
        answer:
          "El productor no espera ninguna confirmación del bróker y asume que el mensaje se envió tan pronto como se escribe en el socket.",
      },
      {
        prompt: "En un productor de Kafka, ¿qué significa configurar `acks=1`?",
        answer:
          "El productor espera la confirmación solo del líder de la partición, sin esperar a las réplicas seguidoras.",
      },
      {
        prompt:
          "En un productor de Kafka, ¿qué significa configurar `acks=all`?",
        answer:
          "El productor espera la confirmación del líder después de que todas las réplicas sincronizadas (ISRs) hayan recibido el mensaje.",
      },
      {
        prompt:
          "Un error que puede resolverse intentando la misma operación de nuevo, como un fallo temporal de red, se conoce como _____.",
        answer: "error recuperable (retriable error)",
      },
      {
        prompt: "¿Qué problema resuelve el productor idempotente en Kafka?",
        answer:
          "Evita la duplicación de mensajes causada por reintentos del productor, asegurando que los mensajes se escriban exactamente una vez.",
      },
      {
        prompt:
          "La semántica de procesamiento exactamente una vez (exactly-once semantics) en Kafka se logra combinando un productor idempotente con _____.",
        answer: "transacciones (transactions)",
      },
      {
        prompt:
          "¿Qué es un 'productor zombi' en el contexto de las transacciones de Kafka?",
        answer:
          "Una instancia anterior de un productor que se creía fallida pero que intenta confirmar una transacción después de que una nueva instancia ya haya comenzado a trabajar.",
      },
      {
        prompt:
          "Para que un consumidor de Kafka solo lea mensajes de transacciones confirmadas, su `isolation.level` debe configurarse en _____.",
        answer: "read_committed",
      },
      {
        prompt: "¿Cuál es el propósito de Kafka Connect?",
        answer:
          "Facilitar la integración de datos, transmitiendo datos de manera fiable y escalable entre Kafka y otros sistemas como bases de datos o motores de búsqueda.",
      },
      {
        prompt:
          "En Kafka Connect, un conector que lee datos de un sistema externo y los escribe en Kafka se llama _____.",
        answer: "conector de origen (Source Connector)",
      },
      {
        prompt:
          "En Kafka Connect, un conector que lee datos de Kafka y los escribe en un sistema externo se llama _____.",
        answer: "conector de sumidero (Sink Connector)",
      },
      {
        prompt: "En Kafka, ¿cómo se logra la autenticación de clientes?",
        answer:
          "Mediante SASL (Simple Authentication and Security Layer) o mTLS/SSL.",
      },
      {
        prompt: "¿Qué son las ACLs (Access Control Lists) en Kafka?",
        answer:
          "Son reglas que definen qué permisos (leer, escribir, etc.) tiene un principal (usuario) sobre un recurso específico (tema, grupo).",
      },
      {
        prompt:
          "Una métrica JMX clave para la salud del clúster de Kafka, que debe ser cero en un clúster sano, es el número de _____.",
        answer: "particiones sub-replicadas (UnderReplicatedPartitions)",
      },
      {
        prompt: "¿Qué es una topología (topology) en Kafka Streams?",
        answer:
          "Es un grafo acíclico dirigido (DAG) de procesadores de flujo (nodos) y flujos (aristas) que define la lógica de procesamiento de la aplicación.",
      },
      {
        prompt:
          "La unidad básica de paralelismo en una aplicación de Kafka Streams es una _____.",
        answer: "tarea (task)",
      },
      {
        prompt:
          "La técnica de procesamiento por lotes que lee un conjunto de datos de entrada y produce un conjunto de datos de salida, sin responder a peticiones, se llama _____.",
        answer: "procesamiento por lotes (batch processing)",
      },
      {
        prompt:
          "Un sistema que consume y procesa eventos poco después de que ocurren, operando sobre datos ilimitados, se conoce como _____.",
        answer: "procesador de flujos (stream processor)",
      },
      {
        prompt:
          "En el procesamiento por lotes, ¿qué significa la 'materialización de estado intermedio'?",
        answer:
          "El proceso de escribir el resultado de una etapa del trabajo en un archivo temporal antes de que la siguiente etapa lo lea.",
      },
      {
        prompt:
          "La captura de cambios de datos (Change Data Capture - CDC) es el proceso de observar todos los cambios de datos en una base de datos y extraerlos en forma de _____.",
        answer: "flujo de eventos (stream of events)",
      },
      {
        prompt:
          "La filosofía de datos donde el registro de eventos es la fuente de verdad y la base de datos es una caché de su estado más reciente se resume en la frase: 'La verdad es el _____.'",
        answer: "registro (log)",
      },
      {
        prompt:
          "¿Qué ventaja principal ofrecen los eventos inmutables en un sistema de flujo de datos?",
        answer:
          "Facilitan la depuración y la auditoría, ya que capturan lo que realmente sucedió en un momento dado sin ser modificado.",
      },
      {
        prompt:
          "En el procesamiento de flujos, ¿cuál es la diferencia entre el tiempo del evento (event time) y el tiempo de procesamiento (processing time)?",
        answer:
          "El tiempo del evento es cuándo ocurrió el evento en el mundo real, mientras que el tiempo de procesamiento es cuándo es observado por el procesador.",
      },
      {
        prompt:
          "¿Qué es un evento 'rezagado' (straggler event) en el procesamiento de flujos?",
        answer:
          "Un evento que llega al procesador con un retraso significativo, después de que la ventana de tiempo a la que pertenece ya ha sido procesada.",
      },
      {
        prompt:
          "En el procesamiento de flujos, ¿qué tipo de unión (join) busca eventos relacionados de dos flujos que ocurren dentro de una ventana de tiempo?",
        answer: "Unión de flujo con flujo (stream-stream join).",
      },
      {
        prompt:
          "Una operación que puede ser reintentada múltiples veces sin cambiar el resultado más allá de la aplicación inicial se describe como _____.",
        answer: "idempotente (idempotent)",
      },
      {
        prompt:
          "Para asegurar la integridad de los datos, el proceso de verificar si los datos han sido corrompidos se conoce como _____.",
        answer: "auditoría (auditing)",
      },
      {
        prompt:
          "Debido a los riesgos de seguridad y privacidad, los datos personales se han descrito como un 'activo _____' o 'material peligroso'.",
        answer: "tóxico (toxic asset)",
      },
      {
        prompt:
          "En Kafka, ¿cuál es el sistema operativo recomendado para entornos de producción?",
        answer:
          "Linux, debido a su rendimiento y estabilidad para aplicaciones de servidor Java.",
      },
      {
        prompt:
          "El recolector de basura de Java recomendado para ejecutar Kafka, especialmente con grandes montones de memoria (heaps), es el _____.",
        answer: "Garbage-First Garbage Collector (G1GC)",
      },
      {
        prompt:
          "En la configuración de un productor de Kafka, `delivery.timeout.ms` establece un límite de tiempo superior para que un mensaje sea entregado, incluyendo _____ y _____.",
        answer: "reintentos, tiempo de espera de red",
      },
      {
        prompt: "¿Qué hace el parámetro `batch.size` en un productor de Kafka?",
        answer:
          "Controla la cantidad máxima de datos en bytes que el productor agrupará en un solo lote antes de enviarlo al bróker.",
      },
      {
        prompt:
          "¿Por qué es Avro un buen formato de serialización para un sistema de mensajería como Kafka?",
        answer:
          "Porque permite que el esquema evolucione de manera compatible, permitiendo que los consumidores lean mensajes con esquemas antiguos o nuevos.",
      },
      {
        prompt:
          "En Kafka, las cuotas (quotas) se pueden aplicar dinámicamente a clientes específicos para limitar su tasa de producción o consumo de _____.",
        answer: "bytes",
      },
      {
        prompt:
          "La interfaz `ConsumerRebalanceListener` en la API de consumidor de Kafka permite a una aplicación ejecutar código personalizado cuando las particiones son _____ o _____ de un consumidor.",
        answer:
          "asignadas (onPartitionsAssigned), revocadas (onPartitionsRevoked)",
      },
      {
        prompt:
          "Una elección de líder 'sucia' (unclean) en Kafka se refiere a la elección de un nuevo líder para una partición que _____ estaba en el conjunto de réplicas sincronizadas.",
        answer: "no",
      },
      {
        prompt:
          "¿Qué es una compactación de registro (log compaction) en Kafka?",
        answer:
          "Es una política de retención que asegura que Kafka retenga al menos la última actualización para cada clave de mensaje dentro de una partición.",
      },
      {
        prompt:
          "La métrica de JMX `RequestHandlerAvgIdlePercent` en un bróker de Kafka indica el porcentaje de tiempo que los hilos de manejo de peticiones están _____, siendo un indicador de la carga del bróker.",
        answer: "inactivos (idle)",
      },
      {
        prompt:
          "En un clúster de Kafka bien equilibrado, la métrica `LeaderCount` debería estar distribuida de manera _____ entre todos los brókeres.",
        answer: "uniforme",
      },
      {
        prompt:
          "Cuando un productor de Kafka recibe un error `LEADER_NOT_AVAILABLE`, ¿es este un error recuperable (retriable)?",
        answer:
          "Sí, porque el productor puede reintentar el envío después de que se elija un nuevo líder.",
      },
      {
        prompt: "¿Qué controla el parámetro de consumidor `auto.offset.reset`?",
        answer:
          "Define desde dónde comenzará a leer un consumidor cuando no tiene un offset inicial confirmado, con opciones como 'earliest' o 'latest'.",
      },
      {
        prompt:
          "¿Cuál es la función del particionador (partitioner) en un productor de Kafka?",
        answer:
          "Elegir la partición a la que se enviará un registro, generalmente basándose en la clave del registro para garantizar el orden por clave.",
      },
      {
        prompt:
          "El parámetro `max.in.flight.requests.per.connection` en un productor de Kafka, si se establece en un valor mayor que 1, puede romper el orden de los mensajes si hay _____, a menos que la idempotencia esté activada.",
        answer: "reintentos (retries)",
      },
      {
        prompt:
          "La herramienta `kafka-topics.sh` se utiliza para realizar operaciones de gestión de temas, como crear, modificar, eliminar y _____ información sobre ellos.",
        answer: "listar",
      },
      {
        prompt:
          "La herramienta `kafka-consumer-groups.sh` permite inspeccionar el estado de los grupos de consumidores, incluyendo el _____ por partición.",
        answer: "retraso (lag)",
      },
      {
        prompt:
          "Para asegurar que los mensajes de una partición se distribuyan entre diferentes racks de un centro de datos para una mayor disponibilidad, se debe configurar el parámetro `_____` en cada bróker.",
        answer: "broker.rack",
      },
      {
        prompt:
          "El mecanismo de autenticación SASL que utiliza un nombre de usuario y una contraseña en texto plano, y que no es seguro sin SSL/TLS, se llama _____.",
        answer: "PLAIN",
      },
      {
        prompt:
          "El mecanismo de autenticación SASL que utiliza un protocolo de desafío-respuesta para evitar enviar contraseñas en texto plano se llama _____.",
        answer: "SCRAM (Salted Challenge Response Authentication Mechanism)",
      },
      {
        prompt:
          "En Kafka, ¿qué permiso de ACL se requiere para que un productor escriba en un tema?",
        answer: "Topic:Write",
      },
      {
        prompt:
          "¿Qué es la elección de réplica preferida (preferred replica election) en Kafka?",
        answer:
          "Un proceso administrativo para restaurar el liderazgo de las particiones a sus réplicas preferidas originales, ayudando a reequilibrar la carga del clúster.",
      },
      {
        prompt:
          "La herramienta de línea de comandos `kafka-dump-log.sh` es útil para _____ e inspeccionar el contenido de los archivos de segmento de registro de Kafka.",
        answer: "depurar (debug)",
      },
      {
        prompt:
          "El almacenamiento en niveles (tiered storage) en Kafka permite mover segmentos de registro más antiguos a un almacenamiento de objetos más económico, mientras se mantiene una pequeña cantidad de datos en el almacenamiento local de _____ rendimiento.",
        answer: "alto",
      },
      {
        prompt:
          "En Kafka Streams, el estado local de una tarea (por ejemplo, para agregaciones o uniones) se almacena típicamente en una base de datos embebida como _____.",
        answer: "RocksDB",
      },
      {
        prompt:
          "Cuando una aplicación de Kafka Streams se reinicia, ¿cómo recupera su estado?",
        answer:
          "Restaurando el estado desde un changelog topic en Kafka, que contiene todos los cambios del estado local.",
      },
      {
        prompt: "¿Qué es una 'visión materializada' (materialized view)?",
        answer:
          "Un conjunto de datos derivado, como un índice o una tabla de agregados, que se mantiene actualizado a partir de un conjunto de datos primario.",
      },
      {
        prompt:
          "En arquitecturas de microservicios, la comunicación asíncrona a través de flujos de eventos es una alternativa a las llamadas síncronas de red como las API _____, promoviendo un acoplamiento más débil.",
        answer: "REST",
      },
      {
        prompt:
          "En el control de concurrencia, ¿qué es un 'fantasma' (phantom)?",
        answer:
          "Un tipo de condición de carrera donde una escritura en una transacción cambia el resultado de una consulta de rango en otra transacción.",
      },
      {
        prompt:
          "El bloqueo de dos fases (Two-Phase Locking - 2PL) es una técnica de control de concurrencia _____.",
        answer: "pesimista",
      },
      {
        prompt:
          "En un sistema distribuido, la suposición de que la red es fiable, la latencia es cero y el ancho de banda es infinito se conoce como las _____ de la computación distribuida.",
        answer: "falacias (fallacies)",
      },
      {
        prompt:
          "La API AdminClient de Kafka está diseñada para ser asíncrona, devolviendo objetos `_____` que se completan cuando la operación en el bróker finaliza.",
        answer: "Future",
      },
      {
        prompt:
          "¿Qué significa que el modelo de datos de un sistema es 'evolucionable' (evolvable)?",
        answer:
          "Que permite realizar cambios en el esquema de los datos (schema evolution) de forma compatible con versiones antiguas y nuevas del software.",
      },
      {
        prompt:
          "En Kafka, ¿cuál es el propósito de la configuración de cliente `client.dns.lookup`?",
        answer:
          "Controla cómo el cliente resuelve los nombres DNS, por ejemplo, para expandir un alias DNS a una lista completa de brókeres.",
      },
      {
        prompt:
          "El método `consumer.poll()` en la API de consumidor de Kafka no solo recupera registros, sino que también es responsable de mantener la sesión activa mediante el envío de _____ en segundo plano.",
        answer: "heartbeats",
      },
      {
        prompt:
          "En Kafka Connect, ¿cuál es la función de un convertidor (converter)?",
        answer:
          "Gestionar la serialización y deserialización de datos entre el formato del conector y el formato almacenado en Kafka (ej. JSON, Avro).",
      },
      {
        prompt:
          "Una arquitectura de replicación entre múltiples centros de datos donde un centro de datos es el principal y los otros son pasivos se llama _____.",
        answer: "activa-pasiva (active-passive)",
      },
      {
        prompt:
          "Una arquitectura de replicación donde cada centro de datos sirve tráfico de lectura y escritura y replica datos a los demás se llama _____.",
        answer: "activa-activa (active-active)",
      },
      {
        prompt:
          "¿Qué problema se debe evitar en la replicación activa-activa con más de dos centros de datos?",
        answer:
          "Bucles de replicación (replication loops), donde el mismo evento se replica indefinidamente entre los centros de datos.",
      },
      {
        prompt:
          "En Kafka, ¿qué son las transformaciones de mensaje único (Single Message Transformations - SMTs) en Kafka Connect?",
        answer:
          "Son operaciones ligeras que modifican mensajes individuales a medida que pasan por un conector, sin necesidad de un framework de procesamiento de flujos.",
      },
      {
        prompt:
          "¿Cuál es la función del nodo controlador (controller) en un clúster de Kafka?",
        answer:
          "Es un bróker elegido responsable de las tareas administrativas del clúster, como gestionar las elecciones de líderes de partición.",
      },
      {
        prompt:
          "En Kafka, la época del controlador (controller epoch) es un número que se incrementa cada vez que se elige un nuevo controlador para evitar el problema de _____.",
        answer: "cerebro dividido (split-brain)",
      },
    ],
  },
  {
    id: "modern_arch",
    name: "Modern Arch",
    cards: [
      {
        prompt:
          "¿Qué es una arquitectura monolítica según la descripción tradicional?",
        answer:
          "Un diseño de software donde una aplicación se construye como una única unidad con una base de código compartida y componentes integrados.",
      },
      {
        prompt:
          "En una arquitectura monolítica, ¿qué desafío principal surge al escalar la aplicación?",
        answer:
          "Requiere reproducir todo el sistema, lo cual es intensivo en recursos e ineficiente.",
      },
      {
        prompt: "¿Qué es la arquitectura de microservicios?",
        answer:
          "Un diseño que descompone una aplicación en servicios más pequeños e implementables que realizan funciones de negocio especializadas.",
      },
      {
        prompt:
          "¿Cuál es una ventaja clave de los microservicios en términos de escalabilidad?",
        answer:
          "Permite el escalado dirigido de servicios individuales de forma autónoma, optimizando el uso de recursos.",
      },
      {
        prompt:
          "Una desventaja de la arquitectura de microservicios es la complicación en la _____ y la integración del sistema.",
        answer: "comunicación entre servicios",
      },
      {
        prompt:
          "¿Para qué tipo de aplicaciones son más adecuadas las arquitecturas monolíticas?",
        answer:
          "Aplicaciones más pequeñas y sencillas donde la simplicidad de desarrollo y despliegue son prioritarias.",
      },
      {
        prompt:
          "¿Para qué tipo de aplicaciones son preferibles las arquitecturas de microservicios?",
        answer:
          "Sistemas grandes y complejos que requieren alta escalabilidad, flexibilidad y resiliencia.",
      },
      {
        prompt:
          "¿Qué principio de ingeniería de software aboga por dividir un sistema en secciones distintas y no superpuestas?",
        answer: "Separación de Intereses (Separation of Concerns - SoC).",
      },
      {
        prompt:
          "El principio _____ tiene como objetivo reducir la repetición de información y lógica en el desarrollo de software.",
        answer: "No te Repitas (Don't Repeat Yourself - DRY)",
      },
      {
        prompt:
          'Según la "Regla de Tres" para aplicar DRY, ¿cuándo se debe abstraer un fragmento de código?',
        answer:
          "Después de que se haya duplicado al menos dos veces, para evitar una abstracción prematura.",
      },
      {
        prompt: "¿Qué son los principios SOLID?",
        answer:
          "Un conjunto de cinco principios de diseño en programación orientada a objetos para crear software más comprensible, flexible y mantenible.",
      },
      {
        prompt:
          "En SOLID, ¿qué significa el Principio de Responsabilidad Única (SRP)?",
        answer:
          "Una clase debe tener una sola razón para cambiar, es decir, un solo trabajo.",
      },
      {
        prompt:
          "El Principio de Abierto/Cerrado (OCP) de SOLID establece que las entidades de software deben estar abiertas para la _____ pero cerradas para la _____.",
        answer: "extensión; modificación",
      },
      {
        prompt: "¿Qué garantiza el Principio de Sustitución de Liskov (LSP)?",
        answer:
          "Que los subtipos deben ser sustituibles por sus tipos base sin alterar la corrección del programa.",
      },
      {
        prompt:
          "El Principio de Segregación de Interfaces (ISP) de SOLID sugiere crear interfaces más _____ y _____ en lugar de una grande y de propósito general.",
        answer: "pequeñas; específicas",
      },
      {
        prompt:
          "¿Qué dicta el Principio de Inversión de Dependencias (DIP) de SOLID?",
        answer:
          "Los módulos de alto nivel no deben depender de los de bajo nivel; ambos deben depender de abstracciones.",
      },
      {
        prompt: "¿Qué es una arquitectura por capas (n-tier)?",
        answer:
          "Un patrón que organiza un sistema en capas horizontales, cada una con una responsabilidad específica, como la interfaz de usuario o la persistencia de datos.",
      },
      {
        prompt:
          "¿Cómo se restringe típicamente la comunicación en una arquitectura por capas estricta?",
        answer:
          "Una capa solo debe comunicarse con la capa inmediatamente inferior.",
      },
      {
        prompt: "¿Qué es la Arquitectura Orientada a Eventos (EDA)?",
        answer:
          "Un paradigma donde los componentes del sistema se comunican de forma asíncrona a través de la producción y consumo de eventos.",
      },
      {
        prompt:
          "Un ejemplo de uso de la Arquitectura Orientada a Eventos es el procesamiento de datos de IoT, donde los sensores publican datos como _____ a una plataforma central.",
        answer: "eventos",
      },
      {
        prompt:
          "¿Qué enfoque de diseño de software centra el proceso de desarrollo en una comprensión profunda del dominio del negocio?",
        answer: "Diseño Orientado al Dominio (Domain-Driven Design - DDD).",
      },
      {
        prompt: "En DDD, ¿qué es el Lenguaje Ubicuo?",
        answer:
          "Un lenguaje compartido que todos en el proyecto, tanto técnicos como expertos del dominio, utilizan para cerrar la brecha de comunicación.",
      },
      {
        prompt: "¿Qué es una arquitectura API-First?",
        answer:
          "Un enfoque de diseño que trata las APIs de la aplicación como el producto principal, comenzando el desarrollo con su diseño y documentación.",
      },
      {
        prompt:
          "La arquitectura _____ y nativa de la nube utiliza tecnologías como Docker y Kubernetes para crear aplicaciones resilientes, elásticas y fáciles de gestionar.",
        answer: "basada en contenedores",
      },
      {
        prompt:
          "¿Por qué es importante diseñar aplicaciones sin estado (stateless) en una arquitectura nativa de la nube?",
        answer:
          "Permite al orquestador escalar horizontalmente las instancias y reemplazar contenedores fallidos sin perder el contexto del usuario.",
      },
      {
        prompt: "¿Qué es la Infraestructura como Código (IaC)?",
        answer:
          "El uso de herramientas como Terraform para definir y gestionar la infraestructura de la nube en código, haciéndola reproducible y versionable.",
      },
      {
        prompt:
          "¿Cuál es el principio fundamental de la Arquitectura Limpia (Clean Architecture)?",
        answer:
          "La Regla de la Dependencia: las dependencias del código fuente solo pueden apuntar hacia adentro, hacia la lógica de negocio central.",
      },
      {
        prompt:
          "En la Arquitectura Limpia, ¿qué capa contiene las reglas de negocio de toda la empresa y las estructuras de datos?",
        answer: "La capa de Entidades (Entities).",
      },
      {
        prompt:
          "En la Arquitectura Limpia, la capa de _____ contiene las reglas de negocio específicas de la aplicación y orquesta el flujo de datos.",
        answer: "Casos de Uso (Use Cases)",
      },
      {
        prompt: "¿Qué es el patrón de arquitectura Serverless?",
        answer:
          "Un diseño nativo de la nube donde los desarrolladores despliegan código como funciones sin gestionar servidores, y el proveedor de la nube asigna recursos dinámicamente.",
      },
      {
        prompt:
          "¿Cuál es una desventaja común de la arquitectura Serverless relacionada con la latencia inicial?",
        answer:
          'El "arranque en frío" (cold start), que es un retraso durante la ejecución inicial de una función inactiva.',
      },
      {
        prompt:
          "El patrón _____ segrega las operaciones de lectura (Query) y escritura (Command) en modelos distintos para optimizar el rendimiento.",
        answer: "CQRS (Command Query Responsibility Segregation)",
      },
      {
        prompt:
          "¿Para qué tipo de sistemas es especialmente útil el patrón CQRS?",
        answer:
          "Sistemas con muchas lecturas (high-read), como dashboards o herramientas de informes, donde las lecturas superan ampliamente a las escrituras.",
      },
      {
        prompt:
          "¿Qué es la Arquitectura Hexagonal, también conocida como Puertos y Adaptadores?",
        answer:
          "Un patrón que aísla la lógica de negocio central de las preocupaciones externas (UI, base de datos) mediante el uso de puertos (interfaces) y adaptadores (implementaciones).",
      },
      {
        prompt:
          "¿Cuál es una ventaja clave de la Arquitectura Hexagonal en términos de pruebas?",
        answer:
          "Mejora la capacidad de prueba (testability) al permitir que la lógica de negocio central se pruebe de forma aislada de los detalles técnicos.",
      },
      {
        prompt:
          "La arquitectura basada en espacio (space-based) está diseñada para manejar alta carga eliminando la _____ como un cuello de botella.",
        answer: "base de datos central",
      },
      {
        prompt:
          "En la arquitectura basada en espacio, ¿qué son las Unidades de Procesamiento (Processing Units - PU)?",
        answer:
          "Unidades autónomas que contienen lógica de negocio, datos en memoria y, opcionalmente, mecanismos de mensajería o persistencia.",
      },
      {
        prompt:
          "El patrón de arquitectura Cliente-Servidor divide el trabajo entre el cliente, que maneja la _____, y el servidor, que gestiona los datos y la lógica de negocio.",
        answer: "interfaz de usuario",
      },
      {
        prompt:
          "¿Qué patrón previene fallos en cascada en sistemas distribuidos bloqueando temporalmente las solicitudes a servicios que fallan?",
        answer: "El patrón Cortocircuito (Circuit Breaker).",
      },
      {
        prompt:
          "La biblioteca Hystrix, desarrollada por Netflix, es un ejemplo de implementación del patrón _____.",
        answer: "Cortocircuito (Circuit Breaker)",
      },
      {
        prompt:
          "¿Qué patrón de arquitectura, también conocido como plug-in, consiste en un sistema central y módulos de extensión?",
        answer: "Arquitectura de micronúcleo (Microkernel).",
      },
      {
        prompt:
          "Un ejemplo de software que utiliza la arquitectura de micronúcleo es _____, que extiende su funcionalidad mediante temas y módulos.",
        answer: "WordPress o Drupal",
      },
      {
        prompt:
          "La arquitectura _____ descompone las tareas en una secuencia de pasos de procesamiento (filtros) conectados por canales (tuberías).",
        answer: "Tubería y Filtro (Pipe-Filter)",
      },
      {
        prompt:
          "Una ventaja de la arquitectura Tubería y Filtro es que los filtros pueden ejecutarse de forma _____, mejorando el rendimiento en sistemas multinúcleo.",
        answer: "concurrente",
      },
      {
        prompt: "¿Qué es la Arquitectura Orientada a Servicios (SOA)?",
        answer:
          "Un paradigma de diseño donde las aplicaciones se construyen para proporcionar servicios a otras aplicaciones a través de una red, utilizando protocolos de comunicación.",
      },
      {
        prompt:
          "Un componente clave en algunas implementaciones de SOA es el _____, que actúa como un centro de comunicación para gestionar el enrutamiento de mensajes entre servicios.",
        answer: "Bus de Servicios Empresariales (Enterprise Service Bus - ESB)",
      },
      {
        prompt:
          "¿Cuál es la diferencia fundamental entre monolítico y microservicios en cuanto a la integración de componentes?",
        answer:
          "En un monolito, los componentes están fuertemente acoplados en una sola unidad, mientras que en microservicios son servicios independientes y débilmente acoplados.",
      },
      {
        prompt: "¿Qué son los Micro-Frontends?",
        answer:
          "Un patrón arquitectónico que extiende el concepto de microservicios al desarrollo del frontend, dividiéndolo en aplicaciones más pequeñas e implementables de forma independiente.",
      },
      {
        prompt:
          "El principio de _____ en los micro-frontends asegura que si un micro-frontend falla, los demás continúan funcionando normalmente.",
        answer: "aislamiento de fallos (fault isolation)",
      },
      {
        prompt:
          "¿Qué tecnología ha surgido como el enfoque más popular para implementar micro-frontends debido a su flexibilidad en tiempo de ejecución y al intercambio inteligente de dependencias?",
        answer: "Module Federation.",
      },
      {
        prompt: "¿Cuándo NO se recomienda usar micro-frontends?",
        answer:
          "En equipos pequeños (<10 desarrolladores), cuando no se necesitan despliegues independientes o cuando la simplicidad importa más que la autonomía del equipo.",
      },
      {
        prompt: "¿Qué es un Data Mesh?",
        answer:
          "Un marco que descentraliza los datos dentro de una organización, permitiendo que diferentes grupos accedan, gestionen y analicen datos en modo de autoservicio.",
      },
      {
        prompt:
          "El principio de _____ en Data Mesh establece que cada equipo de dominio es responsable de gestionar sus propios datos.",
        answer: "propiedad del dominio (domain ownership)",
      },
      {
        prompt:
          'El principio de "Datos como Producto" en Data Mesh aborda el problema de la calidad de los datos y los silos de datos al tratar los datos analíticos como un producto para los consumidores.',
        answer:
          'Verdadero, su objetivo es hacer los datos descubribles, comprensibles, confiables y de alta calidad para sus "clientes".',
      },
      {
        prompt:
          "En Data Mesh, una plataforma de datos de _____ proporciona a los equipos de dominio las herramientas para gestionar datos de forma independiente.",
        answer: "autoservicio (self-serve)",
      },
      {
        prompt:
          "¿Qué es la gobernanza computacional federada en el contexto de Data Mesh?",
        answer:
          "Un principio que equilibra la autonomía del dominio con estándares globales para garantizar la interoperabilidad, seguridad y cumplimiento de los datos en toda la organización.",
      },
      {
        prompt:
          "¿Por qué la adopción ciega de tendencias arquitectónicas puede ser peligrosa?",
        answer:
          "Puede llevar a la sobreingeniería, a una falta de alineación con las necesidades del negocio y a brechas de habilidades en el equipo.",
      },
      {
        prompt:
          "En arquitecturas descentralizadas como los microservicios, ¿por qué tienden a aumentar los costos de infraestructura?",
        answer:
          "Debido a la mayor complejidad en el despliegue, la redundancia de recursos y el aumento del tráfico de red entre servicios.",
      },
      {
        prompt:
          "¿Cómo se comparan SOA y microservicios en términos de granularidad del servicio?",
        answer:
          "Los microservicios suelen ser de grano más fino, centrándose en una única capacidad de negocio, mientras que SOA puede tener servicios de grano más grueso que abarcan más funcionalidades.",
      },
      {
        prompt:
          "En una arquitectura de micronúcleo, ¿cómo se comunican los componentes plug-in con el sistema central?",
        answer:
          "A través de interfaces bien definidas, y el sistema central puede usar un registro de plug-ins para descubrirlos e interactuar con ellos.",
      },
      {
        prompt:
          "En el patrón Tubería y Filtro, el rendimiento de toda la arquitectura está limitado por el filtro más _____.",
        answer: "lento",
      },
      {
        prompt:
          "¿Qué es la consistencia eventual, una consideración en sistemas distribuidos como CQRS con bases de datos separadas?",
        answer:
          "Es un estado en el que los datos de lectura pueden no reflejar inmediatamente los cambios más recientes, resultando en datos obsoletos por un corto período.",
      },
      {
        prompt:
          "En la Arquitectura Limpia, los _____ actúan como un conjunto de convertidores, transformando datos entre el formato de los Casos de Uso y el de agencias externas como la base de datos.",
        answer: "Adaptadores de Interfaz (Interface Adapters)",
      },
      {
        prompt:
          "Para implementar la Inversión de Dependencias, a menudo se utilizan frameworks de _____.",
        answer: "Inyección de Dependencias (Dependency Injection - DI)",
      },
      {
        prompt: "¿Qué es un Sistema Autónomo (Self-Contained System - SCS)?",
        answer:
          "Una aplicación web autónoma que incluye la UI, la lógica y la persistencia, implementando un Bounded Context de DDD.",
      },
      {
        prompt:
          "¿Cuál es la forma de comunicación preferida entre Sistemas Autónomos (SCS) para mantener un bajo acoplamiento?",
        answer:
          "La integración en la interfaz de usuario (UI integration), por ejemplo, mediante transclusión.",
      },
      {
        prompt:
          "¿Cómo se relaciona un Sistema Autónomo (SCS) con los microservicios?",
        answer:
          "Un SCS es un tipo de microservicio más restrictivo y de grano más grueso; un SCS puede contener internamente múltiples microservicios por razones técnicas.",
      },
      {
        prompt:
          "En el patrón Maestro-Esclavo, ¿qué tipo de operaciones maneja la base de datos maestra?",
        answer: "Todas las operaciones de escritura.",
      },
      {
        prompt:
          "¿Qué tipo de operaciones manejan las bases de datos esclavas en el patrón Maestro-Esclavo?",
        answer: "Únicamente operaciones de lectura.",
      },
      {
        prompt: '¿Qué es un "Modulito" (Modulith)?',
        answer:
          "Un enfoque híbrido que combina elementos de arquitecturas monolíticas y de microservicios, manteniendo una estructura unificada pero con una fuerte modularidad interna.",
      },
      {
        prompt:
          "Una desventaja de la arquitectura por capas es que el flujo de datos a través de cada capa puede impactar negativamente en el _____.",
        answer: "rendimiento",
      },
      {
        prompt:
          "La arquitectura basada en espacio se inspira en el concepto de _____ del cómputo paralelo.",
        answer: "espacio de tuplas (tuple space)",
      },
      {
        prompt:
          "¿Qué ventaja ofrece la arquitectura Serverless en cuanto a costos?",
        answer:
          "Opera en un modelo de pago por uso, lo que puede llevar a ahorros significativos, especialmente para cargas de trabajo variables.",
      },
      {
        prompt:
          "Al combinar CQRS con Event Sourcing, el almacén de eventos se convierte en el modelo de _____ y la única fuente de verdad.",
        answer: "escritura (write model)",
      },
      {
        prompt:
          "¿Qué desafío de gestión de estado se presenta en los micro-frontends?",
        answer:
          "Sincronizar el estado entre diferentes micro-frontends que son desarrollados y desplegados de forma independiente.",
      },
      {
        prompt:
          "En el contexto de la nube, ¿qué son las sondas de preparación y actividad (readiness and liveness probes)?",
        answer:
          "Verificaciones de salud que aseguran que el tráfico solo se dirige a instancias de contenedores saludables y que las que fallan se reinician automáticamente.",
      },
      {
        prompt:
          "¿Cuál es el principal inconveniente de la arquitectura Cliente-Servidor en términos de fiabilidad?",
        answer:
          "El tiempo de inactividad del servidor puede interrumpir a todos los clientes, ya que es un punto único de fallo.",
      },
      {
        prompt:
          "La arquitectura de _____ permite el desarrollo, prueba y despliegue paralelo entre equipos de frontend y backend una vez que se define el contrato de la API.",
        answer: "API-First",
      },
      {
        prompt:
          "En la evolución de la arquitectura, el paso de monolitos a SOA representó un cambio hacia la _____ y la interoperabilidad de servicios.",
        answer: "reutilización",
      },
      {
        prompt:
          "La arquitectura de _____ se considera una extensión de los microservicios, reduciendo la granularidad del servicio a funciones individuales.",
        answer: "Serverless",
      },
      {
        prompt:
          "¿Qué patrón de diseño de SOA proporciona una interfaz unificada y de nivel superior a un conjunto de interfaces en un subsistema?",
        answer: "Fachada de Servicio (Service Facade).",
      },
      {
        prompt:
          "En Data Mesh, ¿cuál es el propósito de la gobernanza federada?",
        answer:
          "Establecer políticas y estándares globales que aseguren la interoperabilidad y seguridad de los datos, manteniendo al mismo tiempo la autonomía del dominio.",
      },
      {
        prompt:
          "La arquitectura Lambda combina el procesamiento por _____ y en _____ para manejar grandes volúmenes de datos.",
        answer: "lotes (batch); tiempo real (real-time)",
      },
      {
        prompt:
          "¿Cómo simplifica la arquitectura Kappa a la arquitectura Lambda?",
        answer:
          "Elimina la capa de procesamiento por lotes, centrándose únicamente en el procesamiento de flujos en tiempo real.",
      },
      {
        prompt:
          "La arquitectura Lambda es ideal para análisis de datos _____, mientras que Kappa se enfoca en el procesamiento en tiempo real.",
        answer: "históricos",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de un monolito en las primeras etapas de un proyecto?",
        answer:
          "Simplicidad en el desarrollo, pruebas y despliegue inicial debido a una única base de código.",
      },
      {
        prompt: "¿Qué es la arquitectura basada en celdas (cell-based)?",
        answer:
          "Un enfoque que descompone los servicios internamente en celdas y utiliza capas delgadas para enrutar el tráfico a la celda correcta, mejorando el aislamiento de fallos.",
      },
    ],
  },
  {
    id: "modern_data_stack",
    name: "Modern Data Stack",
    cards: [
      {
        prompt:
          "¿Qué proveedor de la nube se destaca por tener la gama más amplia de servicios y el mayor alcance global?",
        answer: "Amazon Web Services (AWS).",
      },
      {
        prompt:
          "¿En qué área sobresale Microsoft Azure en comparación con AWS y GCP?",
        answer:
          "En la integración empresarial y las configuraciones de nube híbrida, especialmente para ecosistemas de Microsoft.",
      },
      {
        prompt:
          "Google Cloud Platform (GCP) es reconocido como líder en qué campos específicos?",
        answer:
          "Análisis de datos, aprendizaje automático (ML) e inteligencia artificial (AI).",
      },
      {
        prompt:
          "En términos de rendimiento, ¿qué proveedor de la nube ofrece el rendimiento más consistente entre regiones debido a su extensa infraestructura global?",
        answer: "AWS.",
      },
      {
        prompt:
          "¿Para qué tipo de cargas de trabajo GCP a menudo ofrece un rendimiento superior?",
        answer: "Para cargas de trabajo de análisis de datos.",
      },
      {
        prompt: "El rendimiento de Azure es particularmente fuerte para _____.",
        answer: "aplicaciones y servicios centrados en Microsoft",
      },
      {
        prompt:
          "Entre AWS, Azure y GCP, ¿cuál ofrece los modelos de precios más complejos pero potencialmente más rentables?",
        answer:
          "AWS, con opciones como instancias reservadas, precios spot y descuentos por compromiso.",
      },
      {
        prompt:
          "¿Qué proveedor de la nube es a menudo la opción más barata para clientes empresariales que ya utilizan servicios de Microsoft?",
        answer: "Microsoft Azure.",
      },
      {
        prompt:
          "Además de las tarifas de servicio, ¿qué costos ocultos deben considerarse al estimar los gastos de la nube?",
        answer:
          "Costos de transferencia de datos (egreso), clases de almacenamiento premium y servicios de soporte.",
      },
      {
        prompt:
          "Al evaluar el costo total de propiedad de la nube, ¿qué costos relacionados con el personal deben tenerse en cuenta?",
        answer:
          "El costo de capacitar al personal y potencialmente contratar personal especializado en la nube.",
      },
      {
        prompt:
          "Una de las principales desventajas de AWS es que puede abrumar a los recién llegados con su gran cantidad de _____.",
        answer: "servicios y opciones",
      },
      {
        prompt:
          "Una ventaja clave de Azure es su fácil integración y migración para los servicios existentes de _____.",
        answer: "Microsoft",
      },
      {
        prompt:
          "Una debilidad de GCP en comparación con AWS y Azure es su catálogo de servicios más _____ y su limitado soporte para casos de uso empresariales tradicionales.",
        answer: "limitado",
      },
      {
        prompt: "Término: Apache Spark",
        answer:
          "Definición: Un motor de análisis unificado para el procesamiento de datos a gran escala, originalmente diseñado para análisis por lotes de alto rendimiento.",
      },
      {
        prompt: "Término: Apache Flink",
        answer:
          "Definición: Un motor de procesamiento distribuido que prioriza el flujo (stream-first) diseñado para manejar flujos de datos continuos e ilimitados con baja latencia.",
      },
      {
        prompt:
          "¿Cuál es la diferencia fundamental en el modelo de procesamiento entre Spark y Flink?",
        answer:
          "Spark utiliza un modelo de micro-lotes para el streaming, mientras que Flink implementa un verdadero procesamiento de flujo evento por evento.",
      },
      {
        prompt:
          "¿Qué framework, Spark o Flink, generalmente demuestra una latencia más baja en aplicaciones de streaming?",
        answer:
          "Flink, debido a su procesamiento evento por evento, a menudo logra latencias de milisegundos.",
      },
      {
        prompt:
          "¿Qué framework fue diseñado originalmente para el procesamiento por lotes y a menudo tiene una ventaja en esa área?",
        answer: "Apache Spark.",
      },
      {
        prompt: "¿Cómo trata Flink el procesamiento por lotes?",
        answer:
          "Lo trata como un caso especial del procesamiento de flujos, donde el flujo es limitado.",
      },
      {
        prompt:
          "En cuanto a la tolerancia a fallos, Spark utiliza un enfoque basado en _____ para reconstruir datos perdidos.",
        answer: "información de linaje (lineage)",
      },
      {
        prompt:
          "Flink utiliza un mecanismo de _____ distribuido para la tolerancia a fallos, lo que permite una rápida recuperación desde puntos de control periódicos.",
        answer: "instantáneas (snapshotting)",
      },
      {
        prompt:
          "¿Qué framework ofrece capacidades de ventanas (windowing) más avanzadas, como ventanas de tiempo de evento y de sesión?",
        answer: "Apache Flink.",
      },
      {
        prompt:
          "¿Para qué tipo de caso de uso se recomendaría elegir Apache Flink?",
        answer:
          "Procesamiento de flujos en tiempo real con latencia muy baja, como detección de fraudes o procesamiento complejo de eventos.",
      },
      {
        prompt: "¿En qué escenarios es Apache Spark a menudo la mejor opción?",
        answer:
          "Procesamiento por lotes de alto rendimiento, ETL y cuando se necesita una plataforma unificada para SQL, machine learning y grafos.",
      },
      {
        prompt:
          "La característica de Ejecución Adaptativa de Consultas (AQE) que optimiza los planes de consulta en tiempo de ejecución es una capacidad de _____.",
        answer: "Apache Spark",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia arquitectónica entre Kafka y RabbitMQ?",
        answer:
          "Kafka es un registro de confirmaciones distribuido (distributed commit log) para streaming de eventos, mientras que RabbitMQ es un agente de mensajes (message broker) tradicional.",
      },
      {
        prompt:
          "¿Qué sistema de mensajería utiliza un modelo 'pull' donde los consumidores extraen activamente los mensajes?",
        answer: "Apache Kafka.",
      },
      {
        prompt:
          "RabbitMQ utiliza un modelo '_____' donde el agente entrega mensajes a los consumidores.",
        answer: "push",
      },
      {
        prompt:
          "Si el objetivo principal es un historial duradero y la capacidad de reproducir eventos a gran escala, ¿qué tecnología es más adecuada?",
        answer:
          "Apache Kafka, debido a su retención de mensajes en disco y el seguimiento de offsets.",
      },
      {
        prompt:
          "Para enrutamiento complejo, colas de tareas y mensajería de baja latencia, ¿qué tecnología es la opción preferida?",
        answer: "RabbitMQ.",
      },
      {
        prompt:
          "En términos de rendimiento, ¿cuál de los dos, Kafka o RabbitMQ, generalmente ofrece un mayor rendimiento (throughput)?",
        answer:
          "Kafka, que puede manejar miles de millones de mensajes por segundo.",
      },
      {
        prompt:
          "El orden de los mensajes en Kafka está garantizado estrictamente dentro de una _____.",
        answer: "partición",
      },
      {
        prompt: "¿Qué es OLTP?",
        answer:
          "Procesamiento de Transacciones en Línea (Online Transaction Processing), optimizado para manejar un alto volumen de operaciones transaccionales simples en tiempo real.",
      },
      {
        prompt: "¿Qué es OLAP?",
        answer:
          "Procesamiento Analítico en Línea (Online Analytical Processing), optimizado para consultar y analizar grandes volúmenes de datos históricos.",
      },
      {
        prompt:
          "Los sistemas OLTP están optimizados para operaciones frecuentes de _____, mientras que los sistemas OLAP son de _____ intensivo.",
        answer: "escritura (insert, update, delete) / lectura",
      },
      {
        prompt:
          "¿Qué tipo de esquema de base de datos se usa típicamente en sistemas OLTP para garantizar la integridad de los datos?",
        answer: "Esquemas normalizados.",
      },
      {
        prompt:
          "¿Qué tipo de esquema de base de datos se utiliza en sistemas OLAP para acelerar las consultas de lectura?",
        answer:
          "Esquemas desnormalizados, como el esquema de estrella o copo de nieve.",
      },
      {
        prompt:
          "Procesar pagos con tarjeta de crédito o retiros en cajeros automáticos son ejemplos de casos de uso para sistemas _____.",
        answer: "OLTP",
      },
      {
        prompt:
          "Generar informes de ventas trimestrales o analizar tendencias de mercado son casos de uso típicos para sistemas _____.",
        answer: "OLAP",
      },
      {
        prompt:
          "¿Qué término describe la arquitectura que combina la flexibilidad de los data lakes con la fiabilidad y el rendimiento de los data warehouses?",
        answer: "Data Lakehouse.",
      },
      {
        prompt:
          "En una arquitectura de datos moderna, ¿qué significa 'schema-on-read'?",
        answer:
          "Permite cargar datos en su formato original y aplicar una estructura (esquema) solo cuando se leen para su análisis.",
      },
      {
        prompt:
          "Nombra un formato de tabla abierta que agrega transacciones ACID a los data lakes.",
        answer: "Delta Lake, Apache Iceberg o Apache Hudi.",
      },
      {
        prompt:
          "¿Cuál es el propósito de la Arquitectura Lambda en el procesamiento de datos?",
        answer:
          "Manejar el procesamiento de datos masivos utilizando una capa por lotes para datos históricos y una capa de velocidad para datos en tiempo real.",
      },
      {
        prompt:
          "¿Cómo simplifica la Arquitectura Kappa a la Arquitectura Lambda?",
        answer:
          "Elimina la capa por lotes, manejando tanto el procesamiento en tiempo real como el reprocesamiento histórico a través de una única ruta de streaming.",
      },
      {
        prompt:
          "En Kafka, ¿qué componente ha sido reemplazado por el protocolo KRaft?",
        answer: "Apache ZooKeeper.",
      },
      {
        prompt:
          "¿Cuál es uno de los principales beneficios de migrar de ZooKeeper a KRaft en Kafka?",
        answer:
          "Operaciones simplificadas, ya que elimina la necesidad de gestionar un sistema distribuido separado.",
      },
      {
        prompt: "¿Cómo mejora KRaft la escalabilidad del clúster de Kafka?",
        answer:
          "Permite un mayor número de particiones y brokers al eliminar el cuello de botella de metadatos que representaba ZooKeeper.",
      },
      {
        prompt:
          "En el modo KRaft, los metadatos del clúster de Kafka se almacenan como un _____ interno de Kafka.",
        answer: "tópico",
      },
      {
        prompt:
          "A partir de la versión 4.0, _____ se convierte en la única forma de ejecutar clústeres de Kafka.",
        answer: "KRaft",
      },
      {
        prompt: "¿Qué es una estrategia de multi-nube?",
        answer:
          "El uso de servicios de múltiples proveedores de nube para reducir la dependencia de un solo proveedor, mejorar la fiabilidad y optimizar las cargas de trabajo.",
      },
      {
        prompt:
          "¿Qué proveedor de la nube es ideal si una empresa está fuertemente invertida en el ecosistema de Microsoft?",
        answer: "Azure.",
      },
      {
        prompt:
          "¿Qué proveedor de la nube se recomienda para el desarrollo de aplicaciones nativas de la nube y el enfoque en análisis de datos y ML?",
        answer: "Google Cloud (GCP).",
      },
      {
        prompt:
          "El servicio de cómputo principal en AWS se llama _____, en Azure se llama Virtual Machines y en GCP se llama Compute Engine.",
        answer: "EC2 (Elastic Compute Cloud)",
      },
      {
        prompt:
          "El servicio de almacenamiento de objetos de AWS es S3, el de Azure es _____ y el de GCP es Cloud Storage.",
        answer: "Blob Storage",
      },
      {
        prompt:
          "Para bases de datos relacionales gestionadas, AWS ofrece RDS, Azure ofrece _____ y GCP ofrece Cloud SQL.",
        answer: "Azure SQL Database",
      },
      {
        prompt:
          "¿Qué servicio de AWS se especializa en ofrecer funciones sin servidor?",
        answer: "AWS Lambda.",
      },
      {
        prompt:
          "Azure Arc es el servicio de Microsoft Azure diseñado para gestionar entornos de _____.",
        answer: "nube híbrida y multinube",
      },
      {
        prompt:
          "Google Cloud Anthos permite a los usuarios construir y gestionar aplicaciones _____ en múltiples nubes y en las instalaciones.",
        answer: "basadas en contenedores (Kubernetes)",
      },
      {
        prompt:
          "Un beneficio clave de usar una arquitectura de lago de datos (data lake) de código abierto es evitar el '_____'.",
        answer: "vendor lock-in (dependencia del proveedor)",
      },
      {
        prompt:
          "En la arquitectura Medallion, la zona _____ contiene los datos crudos e inalterados tal como se ingirieron.",
        answer: "bronce",
      },
      {
        prompt:
          "La zona _____ en la arquitectura Medallion contiene datos que han sido limpiados, filtrados y enriquecidos.",
        answer: "plata",
      },
      {
        prompt:
          "Los datos en la zona _____ de la arquitectura Medallion están altamente agregados y listos para el consumo por parte de analistas de negocio y herramientas de BI.",
        answer: "oro",
      },
      {
        prompt:
          "¿Qué herramienta de orquestación de flujos de trabajo de código abierto es popular para definir, programar y monitorear flujos de trabajo como DAGs (Grafos Acíclicos Dirigidos)?",
        answer: "Apache Airflow.",
      },
      {
        prompt:
          "¿Qué formato de archivo columnar es comúnmente utilizado en los data lakes para un rendimiento analítico eficiente?",
        answer: "Apache Parquet o Apache ORC.",
      },
      {
        prompt:
          "¿Cuál es el principal desafío de una arquitectura ETL tradicional en términos de agilidad?",
        answer:
          "La falta de comunicación entre equipos y los largos tiempos de entrega para nuevas solicitudes de datos debido a su flujo rígido.",
      },
      {
        prompt:
          "La arquitectura de datos moderna colapsa silos de datos al unificar el almacenamiento de datos crudos y transformados en un _____.",
        answer: "cloud data lake",
      },
      {
        prompt:
          "Una característica clave de la arquitectura de datos moderna es el '_____', que permite a los equipos acceder y analizar datos por sí mismos.",
        answer: "autoservicio (self-serve)",
      },
      {
        prompt:
          "¿Por qué la arquitectura de datos moderna es generalmente más rentable que las arquitecturas ETL tradicionales?",
        answer:
          "Reduce la sobrecarga de gestión de datos al no requerir ETL y movimiento de datos, y los modelos de pago por uso son comunes.",
      },
      {
        prompt:
          "Para soportar agentes de IA, los sistemas de datos necesitan proporcionar señales en tiempo real, memoria a corto plazo y _____.",
        answer: "contexto histórico",
      },
      {
        prompt:
          "En una pila de datos moderna para IA, ¿qué rol cumplen Kafka y Flink?",
        answer:
          "Forman el sistema nervioso en tiempo real, proporcionando y procesando eventos en vivo para que los agentes perciban su entorno.",
      },
      {
        prompt:
          "En un sistema de procesamiento de datos, la capacidad de manejar contrapresión (backpressure) es crucial para evitar que el sistema se sobrecargue. ¿Qué framework, Flink o Spark, es conocido por su mejor manejo de la contrapresión?",
        answer: "Apache Flink.",
      },
      {
        prompt:
          "Una de las principales ventajas de Kafka es su alta _____, lo que lo hace ideal para procesar grandes volúmenes de datos de sensores o feeds de redes sociales.",
        answer: "capacidad de procesamiento (throughput)",
      },
      {
        prompt:
          "En el contexto de la nube, ¿cuál es el propósito de una 'VPC' (Virtual Private Cloud)?",
        answer:
          "Proporcionar una sección lógicamente aislada de la nube pública donde se pueden lanzar recursos en una red virtual definida por el usuario.",
      },
      {
        prompt:
          "¿Qué significa 'ACID' en el contexto de las transacciones de bases de datos?",
        answer:
          "Atomicidad, Consistencia, Aislamiento (Isolation) y Durabilidad.",
      },
      {
        prompt:
          "Los formatos de tabla de lakehouse como Delta Lake, Iceberg y Hudi aportan propiedades _____ a los data lakes.",
        answer: "ACID",
      },
      {
        prompt:
          "Si una organización necesita la selección de servicios más amplia y una infraestructura madura para escalar globalmente, ¿qué proveedor de nube debería elegir?",
        answer: "AWS.",
      },
      {
        prompt: "¿Qué es la 'computación sin servidor' (serverless computing)?",
        answer:
          "Un modelo de ejecución en la nube donde el proveedor de la nube gestiona dinámicamente la asignación de recursos de máquina, y los precios se basan en el número real de recursos consumidos por una aplicación.",
      },
      {
        prompt:
          "Para el almacenamiento de archivos distribuidos, HDFS es la opción tradicional de Hadoop, mientras que _____ y _____ son alternativas modernas de almacenamiento de objetos de código abierto.",
        answer: "MinIO / Ceph",
      },
      {
        prompt: "¿Qué es un 'catálogo de datos' en un data lake?",
        answer:
          "Una herramienta que ayuda a los usuarios a encontrar, comprender y gobernar los datos, previniendo que el lago se convierta en un 'pantano de datos'.",
      },
      {
        prompt:
          "Nombra una herramienta de catálogo de datos de código abierto que se enfoca en el descubrimiento de datos y la experiencia del usuario.",
        answer: "Amundsen (de Lyft).",
      },
      {
        prompt:
          "DataHub, de LinkedIn, es una plataforma de metadatos moderna que utiliza _____ para actualizaciones de metadatos casi en tiempo real.",
        answer: "streaming (a menudo a través de Kafka)",
      },
      {
        prompt:
          "La idea de que diferentes equipos de negocio deben poseer sus propios datos como un producto se conoce como _____.",
        answer: "Data Mesh",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia entre las instancias spot y las instancias reservadas en AWS?",
        answer:
          "Las instancias spot ofrecen grandes descuentos sobre la capacidad de cómputo no utilizada pero pueden ser interrumpidas, mientras que las instancias reservadas ofrecen descuentos a cambio de un compromiso a largo plazo (1 o 3 años).",
      },
      {
        prompt:
          "En el procesamiento de flujos, el 'exactamente una vez' (exactly-once) es una semántica de procesamiento que garantiza que cada evento se procese _____, incluso en caso de fallos.",
        answer: "una sola vez",
      },
      {
        prompt:
          "¿Qué framework, Flink o Spark, es generalmente considerado más fuerte en proporcionar garantías de 'exactamente una vez' a nivel de operador?",
        answer: "Apache Flink.",
      },
      {
        prompt:
          "El desacoplamiento del almacenamiento y el cómputo en una arquitectura de data lake permite que cada uno _____ de forma independiente.",
        answer: "escale",
      },
      {
        prompt:
          "Una de las desventajas de RabbitMQ en comparación con Kafka es que escalar horizontalmente puede ser más _____.",
        answer: "complejo",
      },
      {
        prompt:
          "El enfoque de 'micro-lotes' de Spark para el streaming puede introducir una _____ más alta en comparación con el verdadero procesamiento de flujos de Flink.",
        answer: "latencia",
      },
      {
        prompt:
          "Para las cargas de trabajo de IA/ML, ¿qué proveedor de la nube es a menudo la mejor opción gracias a su infraestructura AI-first y herramientas como Vertex AI y TensorFlow?",
        answer: "Google Cloud Platform (GCP).",
      },
      {
        prompt: "Término: Instancias de Máquinas Virtuales",
        answer:
          "Definición: Recursos de cómputo escalables que emulan un ordenador físico, ofrecidos por proveedores de la nube como AWS EC2, Azure VMs o Google Compute Engine.",
      },
      {
        prompt:
          "El servicio Azure DevOps es una oferta de Microsoft para implementar prácticas de _____ a lo largo del ciclo de vida del desarrollo de software.",
        answer: "DevOps",
      },
      {
        prompt: "Término: Kubernetes (K8s)",
        answer:
          "Definición: Un sistema de orquestación de contenedores de código abierto para automatizar la implementación, el escalado y la gestión de aplicaciones en contenedores.",
      },
      {
        prompt:
          "Los tres grandes proveedores de la nube ofrecen servicios gestionados de Kubernetes: AWS tiene EKS, Azure tiene _____ y GCP tiene GKE.",
        answer: "AKS (Azure Kubernetes Service)",
      },
      {
        prompt:
          "En Flink, el soporte de primera clase para el procesamiento de flujos con estado (stateful stream processing) le permite manejar _____ de manera eficiente.",
        answer: "cálculos complejos a lo largo del tiempo",
      },
      {
        prompt: "En Kafka, ¿qué son los 'offsets'?",
        answer:
          "Un puntero que un grupo de consumidores mantiene para rastrear qué mensajes ha procesado en una partición.",
      },
      {
        prompt:
          "¿Cuál es el propósito de un 'balanceador de carga' (load balancer) en una arquitectura de nube?",
        answer:
          "Distribuir el tráfico de red o de aplicaciones entrante entre múltiples servidores para garantizar que ningún servidor se sobrecargue.",
      },
      {
        prompt:
          "El modelo de precios 'pay-as-you-go' (pago por uso) es común en la nube y significa que los usuarios solo pagan por _____.",
        answer: "los recursos que consumen",
      },
      {
        prompt:
          "Una de las desventajas de GCP es que tiene una cuota de mercado más pequeña y una comunidad empresarial menos extensa en comparación con _____.",
        answer: "AWS y Azure",
      },
      {
        prompt:
          "¿Qué es la 'persistencia de mensajes' en un sistema de mensajería?",
        answer:
          "La capacidad del sistema para almacenar mensajes en un almacenamiento no volátil (como un disco) para que no se pierdan si el sistema se reinicia o falla.",
      },
      {
        prompt:
          "¿Qué sistema, Kafka o RabbitMQ, ofrece una mayor durabilidad de los mensajes por diseño?",
        answer:
          "Kafka, porque escribe los mensajes en el disco de forma predeterminada.",
      },
      {
        prompt:
          "El concepto de 'zonas de disponibilidad' en la nube se refiere a _____.",
        answer:
          "uno o más centros de datos discretos con energía, redes y refrigeración redundantes dentro de una región",
      },
      {
        prompt:
          "¿Qué servicio de base de datos de GCP es conocido por su escalabilidad global y fuerte consistencia?",
        answer: "Cloud Spanner.",
      },
      {
        prompt: "En el contexto de ETL, ¿qué significa la 'T' (Transformar)?",
        answer:
          "Aplicar reglas de negocio, limpiar, enriquecer o agregar los datos extraídos antes de cargarlos en el sistema de destino.",
      },
      {
        prompt:
          "En un sistema de procesamiento de datos, ¿qué es un 'pipeline'?",
        answer:
          "Una secuencia de pasos de procesamiento de datos conectados, donde la salida de un elemento es la entrada del siguiente.",
      },
      {
        prompt:
          "La biblioteca MLlib es el componente de _____ de Apache Spark.",
        answer: "aprendizaje automático (machine learning)",
      },
      {
        prompt:
          "Para cumplir con las regulaciones de soberanía de datos, las organizaciones a menudo deben asegurarse de que los datos se almacenen y procesen dentro de una _____ específica.",
        answer: "región geográfica",
      },
    ],
  },
];
