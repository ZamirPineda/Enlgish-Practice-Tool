import type { TechDeck } from "@/features/data/techDecks_chunks/types";

export const techDecksPart3: TechDeck[] = [
  {
    id: "distribuidos",
    name: "Distribuidos",
    cards: [
      {
        prompt:
          "¿Qué tres garantías establece el teorema CAP para los almacenes de datos distribuidos?",
        answer:
          "Consistencia (Consistency), Disponibilidad (Availability) y Tolerancia a particiones (Partition Tolerance).",
      },
      {
        prompt:
          "Según el teorema CAP, un sistema distribuido puede garantizar como máximo _____ de las tres propiedades (Consistencia, Disponibilidad, Tolerancia a particiones) simultáneamente.",
        answer: "dos",
      },
      {
        prompt:
          "¿Qué aspecto de los sistemas distribuidos aborda el teorema PACELC que el teorema CAP no considera?",
        answer:
          "El compromiso entre latencia y consistencia cuando no hay particiones de red (el caso 'Else').",
      },
      {
        prompt:
          "En el contexto de PACELC, si ocurre una partición (P), ¿entre qué dos propiedades debe elegir un sistema?",
        answer: "Debe elegir entre Disponibilidad (A) y Consistencia (C).",
      },
      {
        prompt:
          "En un sistema PA/EL según PACELC, como Dynamo o Cassandra, ¿qué se prioriza en ausencia de particiones?",
        answer: "Se prioriza la baja latencia (L) sobre la consistencia (C).",
      },
      {
        prompt:
          "Un sistema PC/EC según PACELC, como BigTable, siempre elegirá la _____ a costa de la disponibilidad y la latencia.",
        answer: "consistencia",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia de alcance entre el sharding y el particionamiento de bases de datos?",
        answer:
          "El sharding opera a través de múltiples bases de datos o servidores, mientras que el particionamiento ocurre dentro de una única base de datos.",
      },
      {
        prompt:
          "El sharding es una forma de particionamiento _____, distribuido a través de múltiples máquinas.",
        answer: "horizontal",
      },
      {
        prompt:
          "¿Qué estrategia de distribución de datos es ideal para aplicaciones a gran escala que requieren escalabilidad horizontal?",
        answer: "El sharding (fragmentación).",
      },
      {
        prompt: "Concepto: Particionamiento vertical.",
        answer:
          "Definición: Método que divide una tabla en múltiples tablas que contienen menos columnas.",
      },
      {
        prompt:
          "¿Cuál es el objetivo principal de Apache Kafka en una arquitectura de streaming?",
        answer:
          "Actuar como un transporte duradero y de alto rendimiento para flujos de eventos ordenados.",
      },
      {
        prompt:
          "¿Cuál es la principal fortaleza de Apache Flink en comparación con Apache Kafka?",
        answer:
          "Realizar cómputos con estado sobre datos en flujo, con baja latencia y semántica de procesamiento 'exactly-once'.",
      },
      {
        prompt:
          "La abstracción central en Apache Kafka es un(a) _____ particionado en disco, mientras que en Apache Flink es un grafo de operadores distribuido en memoria.",
        answer: "log de solo apéndice (append-only log)",
      },
      {
        prompt:
          "En Kafka, el orden de los mensajes solo se garantiza dentro de un(a) único/a _____.",
        answer: "partición",
      },
      {
        prompt:
          "Para lograr tolerancia a fallos en Apache Flink, el sistema utiliza _____ consistentes del estado del operador.",
        answer: "checkpoints (puntos de control) con snapshots",
      },
      {
        prompt:
          "En una arquitectura canónica de Flink y Kafka, ¿por qué es beneficioso que Kafka retenga los datos brutos?",
        answer:
          "Permite que el trabajo de Flink pueda reproducir el historial de datos cada vez que la lógica de procesamiento cambia.",
      },
      {
        prompt:
          "Concepto: Tiempo de evento (Event Time) en procesamiento de flujos.",
        answer:
          "Definición: Es la marca de tiempo en la que se generó un evento, asignada en el sistema de origen y contenida en la carga útil del evento.",
      },
      {
        prompt:
          "Concepto: Tiempo de procesamiento (Processing Time) en procesamiento de flujos.",
        answer:
          "Definición: Es el tiempo del reloj del sistema (wall-clock time) en la máquina que está procesando el evento.",
      },
      {
        prompt:
          "En Flink, ¿qué mecanismo se utiliza para manejar eventos desordenados y determinar cuándo una ventana de tiempo está completa?",
        answer: "Watermarks (marcas de agua).",
      },
      {
        prompt:
          "Un watermark con una marca de tiempo 'T' en un flujo de datos declara que no deberían llegar más eventos con una marca de tiempo _____ a 'T'.",
        answer: "anterior (más antigua que)",
      },
      {
        prompt:
          "En Flink, ¿qué estrategia de watermarking es adecuada para flujos donde los eventos pueden llegar con un retraso máximo conocido?",
        answer: "La estrategia de 'bounded out-of-orderness watermarks'.",
      },
      {
        prompt:
          "Al ajustar el retraso del watermark, un valor demasiado alto puede causar _____ en el procesamiento, mientras que uno demasiado bajo puede resultar en resultados incompletos.",
        answer: "mayor latencia",
      },
      {
        prompt:
          "¿Cuál es la función del 'checkpointing' en motores de procesamiento de flujos como Apache Flink?",
        answer:
          "Guardar periódicamente el estado de una aplicación para garantizar la tolerancia a fallos y la recuperación.",
      },
      {
        prompt:
          "En Flink, el mecanismo de checkpointing se basa en un algoritmo de snapshotting distribuido llamado _____.",
        answer: "Asynchronous Barrier Snapshotting",
      },
      {
        prompt:
          "¿Qué es un 'checkpoint barrier' en el mecanismo de checkpointing de Flink?",
        answer:
          "Es un registro especial que fluye a través del grafo de operadores para alinear los snapshots de estado en todos los operadores.",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja del checkpointing incremental sobre el checkpointing completo para estados grandes?",
        answer:
          "Reduce la cantidad de datos escritos en cada checkpoint al guardar solo los cambios desde el último checkpoint, lo que acelera el proceso.",
      },
      {
        prompt:
          "¿Qué backend de estado en Flink es más adecuado para manejar estados muy grandes que no caben en memoria?",
        answer: "El backend de estado EmbeddedRocksDBStateBackend.",
      },
      {
        prompt:
          "Los checkpoints _____ en Flink pausan momentáneamente el procesamiento para asegurar una consistencia fuerte, mientras que los checkpoints _____ permiten que el procesamiento continúe, siendo mejores para aplicaciones con baja latencia que toleran consistencia eventual.",
        answer: "alineados (aligned), no alineados (unaligned)",
      },
      {
        prompt:
          "Para lograr semántica 'exactly-once' de extremo a extremo entre Flink y Kafka, el 'sink' de Flink puede utilizar _____ de Kafka que se confirman al completarse un checkpoint.",
        answer: "transacciones de corta duración",
      },
      {
        prompt: "Concepto: Semántica 'At-most-once'.",
        answer:
          "Definición: Garantía de entrega donde un mensaje se entrega como máximo una vez; los mensajes pueden perderse en caso de fallo.",
      },
      {
        prompt: "Concepto: Semántica 'At-least-once'.",
        answer:
          "Definición: Garantía de entrega donde los mensajes pueden entregarse más de una vez, pero no se pierde ninguno.",
      },
      {
        prompt:
          "En Spark Structured Streaming, el directorio `_spark_metadata` es crucial para mantener la semántica 'exactly-once' cuando se escribe en qué tipo de 'sinks'?",
        answer: "En 'sinks' de archivos (file sinks).",
      },
      {
        prompt:
          "Un 'sink' _____ es aquel que puede recibir la misma escritura varias veces sin cambiar el resultado final, lo que es crucial para la semántica 'exactly-once'.",
        answer: "idempotente",
      },
      {
        prompt:
          "En Spark Structured Streaming, ¿qué son los 'Write-Ahead Logs' (WAL) y para qué se utilizan?",
        answer:
          "Son registros que capturan los datos recibidos antes de procesarlos para permitir la recuperación ante fallos sin pérdida de datos.",
      },
      {
        prompt:
          "Para lograr la semántica 'exactly-once' al escribir en Kafka, el productor debe habilitar la idempotencia y el consumidor debe gestionar los 'offsets' transaccionalmente. ¿Verdadero o falso y por qué?",
        answer:
          "Verdadero, la idempotencia del productor evita duplicados en reintentos, y las transacciones aseguran que el 'offset' y el resultado se confirmen atómicamente.",
      },
      {
        prompt:
          "Concepto: Backpressure (contrapresión) en sistemas distribuidos.",
        answer:
          "Definición: Una condición que ocurre cuando un sistema descendente no puede procesar el trabajo a la misma velocidad que lo recibe de un sistema ascendente, causando la acumulación de datos en búferes.",
      },
      {
        prompt:
          "En la UI web de Flink, un operador que está completamente sobrecargado por backpressure se muestra de color _____.",
        answer: "negro",
      },
      {
        prompt:
          "En la UI web de Flink, un operador que es el cuello de botella (completamente ocupado pero no bajo backpressure) se muestra de color _____.",
        answer: "rojo",
      },
      {
        prompt:
          "¿Cuál es una estrategia común para manejar el backpressure que implica que el consumidor envíe una señal al productor?",
        answer: "Ralentizar al productor (Slow down producer).",
      },
      {
        prompt:
          "Si los mensajes más recientes son más importantes que los antiguos, ¿qué estrategia de manejo de backpressure se puede aplicar a la cola de mensajes?",
        answer: "Descartar los mensajes existentes (Drop existing messages).",
      },
      {
        prompt:
          "La técnica de 'Reactive Streams' se basa en un control de flujo impulsado por la demanda, donde los suscriptores solicitan explícitamente datos a los publicadores. ¿Cómo se llama este mecanismo?",
        answer: "Backpressure.",
      },
      {
        prompt:
          "¿Qué es RocksDB y cuál es su principal caso de uso en motores de stream processing como Flink?",
        answer:
          "Es un almacén de clave-valor integrable de alto rendimiento que se utiliza como backend de estado para gestionar grandes cantidades de estado de operador localmente en disco.",
      },
      {
        prompt:
          "La arquitectura interna de RocksDB se basa en un diseño de árbol _____, optimizado para altas tasas de escritura.",
        answer: "log-structured merge-tree (LSM)",
      },
      {
        prompt:
          "En la arquitectura LSM de RocksDB, las escrituras recientes se almacenan en búferes en memoria llamados _____, antes de ser volcados a archivos inmutables en disco llamados SSTables.",
        answer: "MemTables",
      },
      {
        prompt:
          "El proceso en segundo plano en RocksDB que fusiona y organiza los archivos SSTables para mejorar el rendimiento de lectura y reducir el espacio en disco se llama _____.",
        answer: "compactación (compaction)",
      },
      {
        prompt:
          "En Flink, la integración con RocksDB permite el checkpointing _____, que es una característica clave de rendimiento en despliegues a gran escala.",
        answer: "incremental",
      },
      {
        prompt:
          "¿Qué son las 'Column Families' en RocksDB y para qué se utilizan?",
        answer:
          "Son espacios de nombres lógicos dentro de una base de datos RocksDB que permiten optimizar patrones de acceso y configuraciones de rendimiento para diferentes tipos de estado.",
      },
      {
        prompt:
          "Concepto: Data Skew (sesgo de datos) en sistemas distribuidos.",
        answer:
          "Definición: Una distribución desigual de datos o carga de trabajo entre los nodos de un sistema, lo que provoca que algunos nodos estén sobrecargados mientras otros están infrautilizados.",
      },
      {
        prompt: "¿Qué es la técnica de 'salting' para mitigar el data skew?",
        answer:
          "Consiste en añadir un prefijo aleatorio a las claves sesgadas para distribuir los datos de manera más uniforme entre las particiones.",
      },
      {
        prompt:
          "En un join distribuido donde una de las tablas es pequeña, ¿qué técnica se puede utilizar para evitar el 'shuffling' masivo de datos y mitigar el data skew?",
        answer: "Broadcast join.",
      },
      {
        prompt:
          "En Spark, ¿qué umbral configura el tamaño máximo de una tabla para que se realice un broadcast join automáticamente?",
        answer: "El umbral `spark.sql.autoBroadcastJoinThreshold`.",
      },
      {
        prompt: "Concepto: Idempotencia.",
        answer:
          "Definición: Es la propiedad de una operación por la cual si se realiza varias veces, el resultado es el mismo que si se realizara una sola vez.",
      },
      {
        prompt:
          "¿Por qué la idempotencia es crucial en sistemas de pago distribuidos?",
        answer:
          "Para evitar efectos no deseados como cobros duplicados o pagos múltiples si una solicitud se reintenta debido a fallos de red o del sistema.",
      },
      {
        prompt:
          "Un patrón común para implementar idempotencia a nivel de API es requerir un(a) _____ único/a en cada solicitud.",
        answer: "token o clave de idempotencia (idempotency key)",
      },
      {
        prompt:
          "¿Qué mecanismo de base de datos se puede utilizar para garantizar la idempotencia de las inserciones de forma atómica?",
        answer:
          "Una restricción de unicidad (UNIQUE constraint) sobre una clave de negocio o un token de idempotencia.",
      },
      {
        prompt:
          "En Kafka, configurar `acks=all` en el productor contribuye a la _____ al asegurar que el líder espera la confirmación de todas las réplicas 'in-sync'.",
        answer: "durabilidad y consistencia",
      },
      {
        prompt:
          "La métrica de 'consumer lag' en Kafka indica la diferencia de _____ entre el último mensaje producido en una partición y el último mensaje consumido por un grupo de consumidores.",
        answer: "offsets",
      },
      {
        prompt:
          "¿Cuál es el propósito del protocolo de 'two-phase commit' (2PC) utilizado en Flink?",
        answer:
          "Asegurar que los cambios en fuentes y 'sinks' transaccionales se confirmen atómicamente, logrando semántica 'exactly-once'.",
      },
      {
        prompt:
          "En una arquitectura push, ¿quién inicia la transferencia de datos?",
        answer: "El productor (o la fuente de datos).",
      },
      {
        prompt:
          "En una arquitectura pull, ¿quién inicia la transferencia de datos?",
        answer: "El consumidor (o el destino de los datos).",
      },
      {
        prompt:
          "¿Qué tipo de arquitectura (push o pull) es generalmente preferible para sistemas de baja latencia en tiempo real como chats o notificaciones?",
        answer: "Arquitectura push.",
      },
      {
        prompt:
          "Un modelo híbrido común combina una notificación _____ para alertar sobre un evento y una operación _____ para obtener los detalles completos de dicho evento.",
        answer: "push, pull",
      },
      {
        prompt:
          "En Flink, el parámetro `maxParallelism` se configura para permitir el _____ futuro de un trabajo utilizando el mismo 'savepoint'.",
        answer: "reescalado (scale-up)",
      },
      {
        prompt:
          "¿Cuál es la función del 'Write-Ahead Logging' (WAL) en RocksDB?",
        answer:
          "Garantizar la durabilidad de las escrituras al registrarlas en un log antes de aplicarlas en la MemTable en memoria.",
      },
      {
        prompt: "¿Qué es una 'hot key' en el contexto del data skew?",
        answer:
          "Es una clave de particionamiento que aparece con una frecuencia desproporcionadamente alta, causando que una partición o nodo reciba una carga de trabajo excesiva.",
      },
      {
        prompt:
          "El teorema CAP se aplica durante una partición de red, mientras que el teorema PACELC también considera el compromiso entre _____ y _____ durante la operación normal.",
        answer: "latencia (Latency), consistencia (Consistency)",
      },
      {
        prompt:
          "En el contexto de Reactive Streams, el método `Subscription.request(n)` es la forma en que el _____ señala su demanda de `n` elementos al _____.",
        answer: "suscriptor (subscriber), publicador (publisher)",
      },
      {
        prompt:
          "¿Cómo se llama el modelo de consistencia que garantiza que todas las lecturas verán la escritura más reciente de forma inmediata?",
        answer: "Consistencia fuerte (Strong Consistency) o linealizabilidad.",
      },
      {
        prompt: "Concepto: Consistencia eventual (Eventual Consistency).",
        answer:
          "Definición: Un modelo de consistencia que garantiza que, si no se realizan nuevas actualizaciones, todas las réplicas convergerán eventualmente al mismo estado.",
      },
      {
        prompt: "En Flink, ¿qué son las 'late events' (eventos tardíos)?",
        answer:
          "Son eventos que llegan después de que el watermark del sistema ya ha superado su marca de tiempo de evento.",
      },
      {
        prompt:
          "¿Qué ventaja principal ofrece un 'distributed lock' en un sistema con múltiples nodos?",
        answer:
          "Proporciona un mecanismo de exclusión mutua que es visible y respetado por todos los nodos, evitando condiciones de carrera en operaciones concurrentes.",
      },
      {
        prompt:
          "Para evitar la pérdida de datos en Kafka durante el mantenimiento de un bróker, se recomienda un factor de replicación de tres y configurar `min.insync.replicas` en _____.",
        answer: "2",
      },
      {
        prompt:
          "En un sistema de procesamiento de flujos, el 'windowing' es una técnica para dividir un flujo de datos ilimitado en _____ finitas sobre las cuales se pueden aplicar cómputos.",
        answer: "ventanas (buckets)",
      },
    ],
  },
  {
    id: "distribuido_bigdata",
    name: "Distribuido Bigdata",
    cards: [
      {
        prompt:
          "¿Qué arquitectura utiliza Hadoop para el almacenamiento y la computación distribuida?",
        answer:
          "Utiliza una arquitectura 'shared nothing' (nada compartido), donde cada nodo tiene su propia CPU, almacenamiento y memoria.",
      },
      {
        prompt:
          "En Hadoop, ¿qué componente se encarga del almacenamiento distribuido de datos?",
        answer:
          "El HDFS (Hadoop Distributed File System), que divide y almacena los datos en múltiples 'Data Nodes'.",
      },
      {
        prompt:
          "El componente de Hadoop responsable de la negociación de recursos y la distribución de código a los nodos de datos es _____.",
        answer: "YARN (Yet Another Resource Negotiator).",
      },
      {
        prompt:
          "Según el teorema CAP, ¿qué dos propiedades garantiza un sistema de base de datos CP durante una partición de red?",
        answer:
          "Consistencia (Consistency) y Tolerancia a la Partición (Partition Tolerance).",
      },
      {
        prompt:
          "¿Qué dos propiedades garantiza un sistema de base de datos AP, como Apache Cassandra, según el teorema CAP?",
        answer:
          "Disponibilidad (Availability) y Tolerancia a la Partición (Partition Tolerance).",
      },
      {
        prompt: "¿Cómo se clasifica MongoDB según el teorema CAP por defecto?",
        answer:
          "Se clasifica como un sistema CP (Consistencia y Tolerancia a la Partición).",
      },
      {
        prompt:
          "En Apache Cassandra, ¿qué fórmula se debe cumplir para lograr una consistencia fuerte en las operaciones?",
        answer:
          "La suma de los niveles de consistencia de lectura (R) y escritura (W) debe ser mayor que el factor de replicación (N), es decir, R + W > N.",
      },
      {
        prompt: "Término: Consistencia eventual (Eventual Consistency)",
        answer:
          "Definición: Un modelo de consistencia en sistemas distribuidos que garantiza que, si no se realizan nuevas actualizaciones, todas las réplicas eventualmente convergerán al mismo valor.",
      },
      {
        prompt:
          "En el contexto de bases de datos NoSQL, ¿qué es un modelo de datos de 'documento'?",
        answer:
          "Un modelo donde los datos se almacenan como documentos estructurados, típicamente en formato JSON o BSON, como en MongoDB.",
      },
      {
        prompt: "¿Qué modelo de datos utiliza Apache Cassandra y HBase?",
        answer:
          "Utilizan un modelo de datos de 'columna ancha' (wide-column), donde las filas pueden tener diferentes números de columnas.",
      },
      {
        prompt:
          "La arquitectura de Apache Cassandra se describe como _____, donde no hay un nodo maestro y todos los nodos son iguales.",
        answer: "peer-to-peer (entre pares)",
      },
      {
        prompt:
          "¿Qué arquitectura utiliza MongoDB para su replicación de datos?",
        answer:
          "Utiliza un modelo primario/secundario (primary/secondary), donde un nodo primario maneja todas las operaciones de escritura.",
      },
      {
        prompt:
          "En MongoDB, el proceso de distribuir grandes conjuntos de datos en múltiples máquinas se conoce como _____.",
        answer: "Sharding (fragmentación).",
      },
      {
        prompt:
          "¿Cuál base de datos, Cassandra o HBase, generalmente ofrece un mejor rendimiento en operaciones de escritura y por qué?",
        answer:
          "Cassandra, porque puede escribir datos en el 'commit log' y en la 'memtable' simultáneamente, mientras que HBase requiere pasos adicionales a través de ZooKeeper.",
      },
      {
        prompt:
          "¿Por qué HBase suele tener un mejor rendimiento de lectura que Cassandra?",
        answer:
          "Porque HBase escribe todos los datos en un único servidor (primario por región) y utiliza el HDFS con filtros bloom y cachés de bloques, acelerando la recuperación.",
      },
      {
        prompt: "Término: Procesamiento de flujos (Stream Processing)",
        answer:
          "Definición: Un sistema de procesamiento de datos diseñado para manejar flujos continuos de datos en tiempo real o casi real.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia entre el modelo de procesamiento de Apache Spark Streaming y Apache Flink?",
        answer:
          "Spark Streaming utiliza micro-lotes (micro-batching), mientras que Flink procesa los eventos uno por uno (true event-at-a-time).",
      },
      {
        prompt:
          "En el procesamiento de flujos, ¿qué significa 'stateful processing' (procesamiento con estado)?",
        answer:
          "Es la capacidad de un motor de streaming para recordar información (estado) a través de múltiples eventos para realizar operaciones como agregaciones o uniones.",
      },
      {
        prompt:
          "¿Qué mecanismo utilizan Flink y Spark para garantizar la tolerancia a fallos en el procesamiento con estado?",
        answer:
          "Utilizan 'checkpointing', que guarda periódicamente una instantánea del estado de la aplicación y su posición en las fuentes de entrada.",
      },
      {
        prompt:
          "El mecanismo en los sistemas de streaming que maneja situaciones donde los productores generan datos más rápido de lo que los consumidores pueden procesarlos se llama _____.",
        answer: "Backpressure (contrapresión).",
      },
      {
        prompt:
          "¿Qué garantía de entrega es el estándar de oro en el procesamiento de flujos, asegurando que cada evento se procesa solo una vez?",
        answer: "La semántica 'exactly-once' (exactamente una vez).",
      },
      {
        prompt:
          "En Apache Storm, ¿cuál es el nombre del componente que actúa como fuente de los flujos de datos en una topología?",
        answer: "Un 'Spout'.",
      },
      {
        prompt:
          "En una topología de Apache Storm, un _____ procesa los flujos de tuplas entrantes, realiza cálculos y puede emitir nuevas tuplas.",
        answer: "Bolt",
      },
      {
        prompt:
          "¿Para qué tipo de caso de uso es Apache Flink generalmente considerado superior a Apache Spark?",
        answer:
          "Para aplicaciones que requieren un procesamiento de flujos de latencia ultra baja (milisegundos) y un manejo de estado complejo.",
      },
      {
        prompt: "Término: Arquitectura de Kafka",
        answer:
          "Definición: Una plataforma de streaming de eventos distribuida basada en un 'commit log' (registro de confirmaciones) distribuido.",
      },
      {
        prompt:
          "En Kafka, ¿cómo se llaman los flujos de registros con nombre a los que los productores escriben y los consumidores leen?",
        answer: "Topics (temas).",
      },
      {
        prompt:
          "Para lograr escalabilidad y paralelismo, los 'topics' de Kafka se dividen en múltiples _____.",
        answer: "Partitions (particiones).",
      },
      {
        prompt:
          "En Kafka, el desacoplamiento de productores y consumidores permite que múltiples consumidores procesen datos de forma _____ sin impactarse entre sí.",
        answer: "independiente",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia arquitectónica entre Apache Kafka y Apache Pulsar en cuanto al almacenamiento?",
        answer:
          "Kafka acopla el servicio y el almacenamiento en los 'brokers', mientras que Pulsar los desacopla, usando Apache BookKeeper para el almacenamiento persistente.",
      },
      {
        prompt:
          "¿Qué sistema de mensajería tradicional implementa el protocolo AMQP 0-9-1 y opera con un sistema de entrega basado en 'push'?",
        answer: "RabbitMQ.",
      },
      {
        prompt:
          "En comparación con Kafka y Pulsar, ¿cuál es la principal limitación de RabbitMQ para casos de uso de 'event streaming' a gran escala?",
        answer:
          "RabbitMQ está diseñado para retener mensajes por un corto tiempo y carece de primitivas de sistemas distribuidos como el consumo paralelo ordenado.",
      },
      {
        prompt:
          "¿Qué servicio de coordinación distribuida utiliza Kafka para gestionar y coordinar los 'brokers' en versiones anteriores a KRaft?",
        answer: "Apache ZooKeeper.",
      },
      {
        prompt: "Término: Quorum (en sistemas distribuidos)",
        answer:
          "Definición: El número mínimo de servidores requeridos para que un servicio distribuido (como ZooKeeper) funcione y almacene datos de manera segura.",
      },
      {
        prompt:
          "¿Qué algoritmo de consenso utilizan etcd y Consul para garantizar la consistencia distribuida?",
        answer: "El algoritmo Raft.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia de enfoque entre Consul y etcd?",
        answer:
          "Consul ofrece un paquete completo con descubrimiento de servicios, chequeo de salud y soporte multi-datacenter, mientras que etcd se enfoca en ser un almacén clave-valor simple y confiable.",
      },
      {
        prompt:
          "¿Qué herramienta de coordinación es la base de datos de facto para los clústeres de Kubernetes?",
        answer: "etcd.",
      },
      {
        prompt:
          "La capacidad de Consul para descubrir servicios usando consultas estándar de DNS se logra a través de su _____ integrado.",
        answer: "interfaz DNS",
      },
      {
        prompt:
          "En la comparación entre HBase y Cassandra, ¿cuál depende de un sistema externo (HDFS) para sus capacidades de almacenamiento de datos?",
        answer: "HBase.",
      },
      {
        prompt:
          "El protocolo de comunicación peer-to-peer que utiliza Cassandra para que los nodos intercambien información sobre el estado del clúster se llama _____.",
        answer: "gossip protocol",
      },
      {
        prompt: "Término: Delta Lake",
        answer:
          "Definición: Una capa de almacenamiento de código abierto que aporta transacciones ACID, manejo escalable de metadatos y unifica el procesamiento de datos en streaming y por lotes a los data lakes.",
      },
      {
        prompt:
          "¿Qué plataforma de análisis unificado proporciona herramientas y servicios integrados sobre Delta Lake?",
        answer: "Databricks.",
      },
      {
        prompt:
          "Snowflake se describe como una base de datos de _____ (procesamiento masivo en paralelo) totalmente relacional y compatible con ACID.",
        answer: "MPP (Massively Parallel Processing)",
      },
      {
        prompt:
          "En la arquitectura de Snowflake, ¿cómo se logra la escalabilidad independiente de almacenamiento y cómputo?",
        answer:
          "El almacenamiento es centralizado en la nube, mientras que el cómputo se realiza en 'Virtual Warehouses' independientes que pueden escalarse por separado.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia en el modelo de procesamiento de datos entre Apache Hadoop (MapReduce) y Apache Spark?",
        answer:
          "Hadoop MapReduce escribe los resultados intermedios en disco, mientras que Spark aprovecha el cómputo en memoria, haciéndolo mucho más rápido para tareas iterativas.",
      },
      {
        prompt:
          "A diferencia de la arquitectura 'shared-disk' de Oracle RAC, la arquitectura 'shared-nothing' de Oracle Sharding proporciona _____ y aislamiento de fallos.",
        answer: "escalabilidad lineal",
      },
      {
        prompt:
          "¿Qué característica de Apache Flink le permite manejar estados de aplicación masivos de manera eficiente?",
        answer: "Su método de checkpointing asíncrono e incremental.",
      },
      {
        prompt:
          "El motor de búsqueda y análisis distribuido de código abierto construido sobre Apache Lucene, ideal para analítica de logs y búsqueda de texto completo, es _____.",
        answer: "Elasticsearch.",
      },
      {
        prompt:
          "Redis es un almacén de datos en memoria de tipo _____ diseñado para un acceso de muy baja latencia.",
        answer: "clave-valor (key-value)",
      },
      {
        prompt:
          "¿Cuál es el propósito principal de la 'frozen tier' en la arquitectura de Elasticsearch?",
        answer:
          "Optimizar la relación costo-rendimiento almacenando datos históricos en almacenamiento de objetos más económico, manteniéndolos consultables.",
      },
      {
        prompt:
          "En Spark Structured Streaming, para aplanar un campo JSON anidado como `company_info.name` a un campo de nivel superior `company_name`, ¿qué método se utiliza?",
        answer:
          "Se utiliza el método `select` especificando la ruta completa del campo anidado y un alias.",
      },
      {
        prompt:
          "Para realizar la deduplicación de datos en un DataFrame de Spark Streaming basado en la columna 'symbol', se usa el método _____.",
        answer: '`.dropDuplicates("symbol")`',
      },
      {
        prompt:
          "En Flink SQL, ¿cómo se realiza la deduplicación para obtener la primera fila por cada valor distinto en la columna 'symbol'?",
        answer:
          "Usando una subconsulta con la función de ventana `ROW_NUMBER()` particionada por 'symbol' y ordenada por 'proctime'.",
      },
      {
        prompt: "Término: Apache Ignite",
        answer:
          "Definición: Una plataforma de computación en memoria que ofrece un data grid, compute grid, y streaming grid, permitiendo escalar aplicaciones sin reemplazar las bases de datos existentes.",
      },
      {
        prompt:
          "Una de las características clave de Apache Ignite que lo diferencia de Spark es su capacidad para _____ en memoria.",
        answer: "compartir estado (share state)",
      },
      {
        prompt:
          "En la arquitectura 'shared-nothing', ¿cómo se evita que los recursos compartidos se conviertan en un cuello de botella?",
        answer:
          "Cada nodo es independiente y no comparte recursos como CPU, memoria o almacenamiento en disco, eliminando puntos únicos de fallo.",
      },
      {
        prompt:
          "La técnica fundamental para que cada nodo en una arquitectura 'shared-nothing' sea independiente es la _____ de datos.",
        answer: "partición o sharding",
      },
      {
        prompt:
          "¿Qué ventaja principal ofrece Apache Pulsar en entornos multi-tenant en comparación con Kafka?",
        answer:
          "Pulsar fue diseñado desde el principio con soporte para multi-tenancy, ofreciendo un fuerte aislamiento entre tenants.",
      },
      {
        prompt:
          "En Kafka Streams, un almacén de estado local generalmente está respaldado por _____ o mapas hash en memoria.",
        answer: "RocksDB",
      },
      {
        prompt:
          "¿Qué componente del ecosistema Hadoop contiene las bibliotecas y utilidades Java esenciales necesarias para los otros módulos?",
        answer: "Hadoop Common.",
      },
      {
        prompt:
          "El modelo de programación original para el procesamiento de datos en Hadoop, que consta de una fase Map y una fase Reduce, es _____.",
        answer: "MapReduce.",
      },
      {
        prompt: "¿Qué es la 'localidad de datos' (Data Locality) en Hadoop?",
        answer:
          "Es el principio de mover el cómputo a donde están los datos, en lugar de mover grandes volúmenes de datos a través de la red hacia el cómputo.",
      },
      {
        prompt:
          "En la arquitectura de Presto/Trino, ¿cuál es la función del nodo 'Coordinator'?",
        answer:
          "Recibir consultas SQL, analizarlas, planificar la ejecución distribuida y agregar los resultados finales de los nodos 'Worker'.",
      },
      {
        prompt:
          "La capacidad de Presto/Trino para consultar datos de múltiples fuentes diferentes dentro de una sola consulta se conoce como _____.",
        answer: "consultas federadas (federated queries)",
      },
      {
        prompt:
          "¿Qué sistema de almacenamiento de objetos especializado, desplegado como un único binario y con soporte nativo para la API S3, se enfoca en la simplicidad y el rendimiento?",
        answer: "MinIO.",
      },
      {
        prompt:
          "A diferencia de MinIO, ¿qué plataforma de almacenamiento unificada proporciona almacenamiento de bloques, archivos y objetos en un solo sistema?",
        answer: "Ceph.",
      },
      {
        prompt:
          "El principio de consenso distribuido que siguen algoritmos como Paxos y Raft, que requiere un _____ para confirmar un valor, es fundamental para su fiabilidad.",
        answer: "voto mayoritario del quórum (quorum majority vote)",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja de la arquitectura de replicación activa-activa en bases de datos?",
        answer:
          "Las escrituras en múltiples réplicas pueden entrar en conflicto y causar problemas de consistencia de datos.",
      },
      {
        prompt: "Término: Kafka Connect",
        answer:
          "Definición: Un framework para construir y ejecutar productores y consumidores de datos reutilizables que conectan Kafka con otros sistemas como bases de datos, almacenes clave-valor y sistemas de búsqueda.",
      },
      {
        prompt:
          "¿Qué biblioteca de Kafka permite a los desarrolladores implementar aplicaciones cliente elásticas y escalables para el procesamiento de flujos?",
        answer: "Kafka Streams.",
      },
      {
        prompt:
          "En ZooKeeper, la estructura de datos que utiliza para la coordinación es un _____ jerárquico distribuido.",
        answer: "sistema de archivos (file system)",
      },
      {
        prompt:
          "Las unidades de datos en el sistema de archivos de ZooKeeper, análogas a los archivos y directorios, se denominan _____.",
        answer: "znodes",
      },
      {
        prompt:
          "¿Qué servicio gestionado de AWS es equivalente a Apache Hadoop para el procesamiento de big data?",
        answer: "AWS EMR (Elastic MapReduce).",
      },
      {
        prompt:
          "El servicio de Google Cloud que simplifica el procesamiento de datos tanto en tiempo real como por lotes, de manera serverless, es _____.",
        answer: "Google Cloud Dataflow.",
      },
      {
        prompt:
          "¿Qué servicio de Microsoft Azure está diseñado para analizar y procesar grandes volúmenes de datos en vivo de diversas fuentes?",
        answer: "Microsoft Azure Stream Analytics.",
      },
      {
        prompt: "En el contexto de Kafka, ¿qué son los ISR (In-Sync Replicas)?",
        answer:
          "Son el conjunto de réplicas que están completamente al día con el líder de una partición.",
      },
      {
        prompt:
          "El reemplazo de ZooKeeper en las arquitecturas modernas de Kafka, que utiliza el consenso Raft para la gestión de metadatos, se conoce como _____.",
        answer: "KRaft (Kafka Raft metadata mode).",
      },
      {
        prompt: "Para qué caso de uso se recomienda principalmente MongoDB?",
        answer:
          "Para casos de uso centrados en documentos con esquemas flexibles, que se benefician de la agilidad del desarrollador y una fuerte consistencia.",
      },
      {
        prompt: "¿Qué caso de uso es ideal para Apache Cassandra?",
        answer:
          "Cargas de trabajo con muchas escrituras, distribuidas globalmente y de alto rendimiento, donde la disponibilidad y la escalabilidad son críticas.",
      },
      {
        prompt:
          "La característica 'Tunable Consistency' de Cassandra permite a los usuarios seleccionar un _____, que establece cuántas réplicas deben confirmar una operación.",
        answer: "nivel de consistencia (consistency level)",
      },
      {
        prompt:
          "En la arquitectura de MongoDB, un grupo de instancias que mantienen el mismo conjunto de datos se denomina _____.",
        answer: "replica set (conjunto de réplicas)",
      },
      {
        prompt:
          "¿Qué es un 'failover' en el contexto de bases de datos como MongoDB?",
        answer:
          "Es el proceso automático por el cual, si un nodo primario falla, los nodos secundarios eligen un nuevo primario para continuar las operaciones.",
      },
      {
        prompt:
          "En Flink, el término _____ se refiere a la implementación de la infraestructura que gestiona cómo se almacena, accede y recupera el estado.",
        answer: "State Backend",
      },
      {
        prompt:
          "¿Por qué la capacidad de Apache Ignite para realizar 'joins' distribuidos entre cachés particionadas y replicadas es una característica destacada?",
        answer:
          "Porque permite realizar consultas SQL complejas sobre datos distribuidos de manera extremadamente rápida, aprovechando los índices en memoria.",
      },
      {
        prompt:
          "En el debate Hazelcast vs. Ignite, ¿cuál de los dos ofrece un soporte más rico y completo para consultas SQL, incluyendo joins distribuidos?",
        answer: "Apache Ignite.",
      },
      {
        prompt:
          "El enfoque de Apache Ignite para el almacenamiento de datos que ofrece tiempos de respuesta de microsegundos para datos calientes y ratios configurables de memoria a disco se describe como _____.",
        answer: "memory-first (la memoria primero)",
      },
      {
        prompt:
          "¿Qué plataforma de microservicios, ideal para crear topologías complejas de pipelines de datos, utiliza aplicaciones Spring Boot?",
        answer: "Spring Cloud Data Flow.",
      },
      {
        prompt:
          "El framework de procesamiento de flujos distribuido que crea aplicaciones con estado que pueden procesar datos en tiempo real de diversas fuentes, incluyendo Apache Kafka, es _____.",
        answer: "Apache Samza.",
      },
      {
        prompt:
          "En comparación con el procesamiento de flujos, el _____ es más adecuado para trabajos ETL (Extract, Transform, Load) a gran escala y de alta eficiencia.",
        answer: "procesamiento por lotes (batch processing)",
      },
      {
        prompt:
          "En un sistema distribuido, ¿por qué es importante un mecanismo de detección de 'deadlocks' (bloqueos mutuos)?",
        answer:
          "Porque permite identificar y resolver situaciones en las que dos o más procesos se bloquean mutuamente, esperando recursos que el otro posee.",
      },
      {
        prompt:
          "La capacidad de Apache Flink para integrar con gestores de recursos de clúster populares como Hadoop YARN, Apache Mesos y Kubernetes le proporciona una amplia _____.",
        answer: "integración (wide-ranging integration)",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de la arquitectura 'shared nothing' en términos de tolerancia a fallos?",
        answer:
          "La falla de un nodo no afecta a los otros, ya que no hay recursos compartidos que se conviertan en un punto único de fallo.",
      },
      {
        prompt:
          "A diferencia de Redis, que es principalmente un almacén clave-valor, ¿qué funcionalidad principal ofrece Elasticsearch?",
        answer:
          "Ofrece capacidades avanzadas de búsqueda de texto completo y análisis distribuido.",
      },
      {
        prompt:
          "En la arquitectura de HBase, ¿qué componente es responsable de coordinar y mantener el estado del clúster?",
        answer: "ZooKeeper.",
      },
      {
        prompt:
          "¿Qué es la 'replicación' en el contexto de bases de datos distribuidas?",
        answer:
          "Es el proceso de crear y mantener múltiples copias de los datos en diferentes nodos para garantizar la disponibilidad y la durabilidad.",
      },
      {
        prompt:
          "En el contexto de streaming, la diferencia entre 'event time' y 'processing time' es que el primero se basa en el momento en que _____ y el segundo cuando _____.",
        answer:
          "el evento ocurrió originalmente / el evento es procesado por el sistema",
      },
      {
        prompt:
          "¿Qué plataforma se describe como un 'DataOps platform' que ofrece CDC gestionado, pipelines de ETL y transformaciones de SQL en streaming?",
        answer: "Estuary Flow.",
      },
      {
        prompt:
          "El mecanismo en Kafka que permite el almacenamiento de datos a largo plazo mediante la eliminación o combinación de registros antiguos con la misma clave se conoce como _____.",
        answer: "log compaction (compactación de logs)",
      },
      {
        prompt:
          "En un clúster de Oracle RAC, ¿qué componente permite el acceso concurrente a los archivos de la base de datos desde todas las instancias?",
        answer: "Oracle Automatic Storage Management (ASM).",
      },
      {
        prompt:
          "¿Qué tecnología de Oracle permite la conmutación por error automática y transparente de las conexiones de aplicaciones activas a una instancia superviviente?",
        answer: "Application Continuity (AC).",
      },
    ],
  },
  {
    id: "gcp",
    name: "Gcp",
    cards: [
      {
        prompt:
          "¿Cuál era la cuota de mercado de Google Cloud en el tercer trimestre de 2025, según Synergy Research Group?",
        answer: "Google Cloud tenía una cuota de mercado del 13%.",
      },
      {
        prompt:
          "En GCP, Vertex AI es la plataforma unificada para construir, desplegar y gestionar modelos de _____, incluyendo la familia Gemini.",
        answer: "Inteligencia Artificial (IA) y aprendizaje automático (ML)",
      },
      {
        prompt: "Término: Google Kubernetes Engine (GKE)",
        answer:
          "Definición: Un servicio gestionado de GCP para desplegar, gestionar y escalar aplicaciones en contenedores utilizando Kubernetes.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia arquitectónica entre una VPC de Google Cloud y las VNet/VPC de Azure y AWS?",
        answer:
          "La VPC de Google Cloud es un recurso global que abarca múltiples regiones, mientras que en AWS y Azure son estrictamente regionales.",
      },
      {
        prompt:
          "¿Qué servicio de GCP proporciona máquinas virtuales (VM) bajo un modelo de Infraestructura como Servicio (IaaS)?",
        answer: "Compute Engine.",
      },
      {
        prompt:
          "El servicio de almacenamiento de objetos seguro, duradero y escalable en GCP se conoce como _____.",
        answer: "Cloud Storage",
      },
      {
        prompt:
          "¿Para qué se utiliza BigQuery en el ecosistema de Google Cloud?",
        answer:
          "Es un almacén de datos (data warehouse) serverless y totalmente gestionado que permite consultas SQL rápidas sobre grandes conjuntos de datos.",
      },
      {
        prompt: "Término: Cloud Spanner",
        answer:
          "Definición: Una base de datos relacional, distribuida globalmente y escalable horizontalmente que ofrece una consistencia sólida y alta disponibilidad.",
      },
      {
        prompt:
          "¿Qué dos tipos de descuentos por uso comprometido (CUDs) ofrece Google Cloud?",
        answer:
          "Ofrece CUDs basados en recursos (para vCPUs, memoria, etc.) y CUDs basados en gasto (un compromiso de gasto mínimo por hora).",
      },
      {
        prompt:
          "El servicio que permite a las VMs sin IP pública acceder a las APIs y servicios de Google de forma segura se llama _____.",
        answer: "Private Google Access (PGA)",
      },
      {
        prompt:
          "¿Qué herramienta de CI/CD nativa de GCP automatiza la creación, prueba y despliegue de aplicaciones?",
        answer: "Cloud Build.",
      },
      {
        prompt:
          "En el contexto de la seguridad de GCP, ¿qué gestiona Cloud Identity y qué gestiona IAM?",
        answer:
          "Cloud Identity gestiona la autenticación (quién eres), mientras que IAM gestiona la autorización (qué puedes hacer).",
      },
      {
        prompt: "Término: App Engine",
        answer:
          "Definición: Una plataforma como servicio (PaaS) totalmente gestionada para crear y desplegar aplicaciones web y backends de IoT escalables.",
      },
      {
        prompt:
          "¿Qué tres roles primitivos existen en GCP IAM y por qué se recomienda evitarlos en entornos de producción?",
        answer:
          "Propietario, Editor y Lector; se deben evitar porque son demasiado permisivos y no siguen el principio de mínimo privilegio.",
      },
      {
        prompt:
          "Para conectar una red on-premises a una VPC de Google Cloud con conexiones de fibra privadas de alta velocidad (10-100 Gbps), se utilizaría _____.",
        answer: "Dedicated Interconnect",
      },
      {
        prompt:
          'En el contexto de recuperación ante desastres de Cloud SQL, ¿qué es un "failover" completo?',
        answer:
          "Es un proceso que no solo promueve una réplica a primaria, sino que también recrea la arquitectura de DR completa, incluyendo una nueva instancia de standby y una réplica de lectura interregional.",
      },
      {
        prompt:
          "El conjunto de herramientas de observabilidad de GCP, anteriormente conocido como Stackdriver, ahora se llama la suite de _____.",
        answer: "Cloud Operations",
      },
      {
        prompt:
          "¿Qué servicio de GCP se utiliza para la detección de DDoS y como Web Application Firewall (WAF)?",
        answer: "Cloud Armor.",
      },
      {
        prompt:
          "El modelo de IA de Google para generación de video de alta calidad, anunciado en Next '25, se llama _____.",
        answer: "Veo 2",
      },
      {
        prompt: "Término: Cloud Run",
        answer:
          "Definición: Un entorno totalmente gestionado para ejecutar contenedores sin estado (stateless) que escalan automáticamente, incluso a cero.",
      },
      {
        prompt:
          "En el contexto de la facturación de GCP, ¿qué herramienta permite estimar costos antes de lanzar servicios?",
        answer: "La Calculadora de Precios de Google Cloud.",
      },
      {
        prompt:
          "La integración de _____ permite que los agentes de IA de SAP utilicen los modelos de lenguaje más avanzados de Google Cloud.",
        answer:
          "Gemini en el Generative AI Hub de SAP Business Technology Platform (BTP)",
      },
      {
        prompt: "¿Qué es Google Agentspace?",
        answer:
          "Es una plataforma que unifica el acceso a agentes y aplicaciones empresariales, incluyendo agentes de SAP, para agilizar la automatización de tareas.",
      },
      {
        prompt:
          "El protocolo que permite a los agentes de IA de diferentes plataformas intercambiar información y colaborar de forma segura se llama _____.",
        answer: "Agent2Agent (A2A)",
      },
      {
        prompt: "Término: AlloyDB",
        answer:
          "Definición: Un servicio de base de datos totalmente gestionado y compatible con PostgreSQL, diseñado para cargas de trabajo transaccionales y analíticas de alto rendimiento.",
      },
      {
        prompt:
          "Las máquinas virtuales optimizadas para memoria M4 de Google Cloud ofrecen hasta un 127% más de rendimiento para cargas de trabajo SAP en comparación con generaciones anteriores, con un TCO _____ mejor.",
        answer: "36%",
      },
      {
        prompt:
          "La suite _____ de GCP es una solución de IA conversacional pre-construida para transformar el servicio al cliente en centros de contacto, web y móvil.",
        answer: "Customer Engagement Suite",
      },
      {
        prompt:
          "¿Qué solución de seguridad de Google Cloud unifica la visibilidad, detección de amenazas y la experiencia de Mandiant en una única plataforma?",
        answer: "Google Unified Security.",
      },
      {
        prompt: "Término: Dataflow",
        answer:
          "Definición: Un servicio totalmente gestionado para ejecutar pipelines de procesamiento de datos en paralelo, tanto en modo batch como en streaming, utilizando Apache Beam.",
      },
      {
        prompt:
          "¿Cuál es el propósito del Agent Development Kit (ADK) de Google Cloud?",
        answer:
          "Es un framework de código abierto que simplifica la creación de sistemas multi-agente complejos, manteniendo un control preciso sobre su comportamiento.",
      },
      {
        prompt:
          "El hardware de aceleración de IA de diseño propio de Google, competidor de las GPU de Nvidia, se conoce como _____.",
        answer: "Tensor Processing Unit (TPU)",
      },
      {
        prompt:
          "La versión de TPU v7, también conocida como Ironwood, ofrece un rendimiento de _____ de FP8 denso, comparable a la GPU B200 de Nvidia.",
        answer: "4.6 petaFLOPS",
      },
      {
        prompt: "Término: Firestore",
        answer:
          "Definición: Una base de datos NoSQL flexible y escalable para desarrollo móvil, web y de servidores, que ofrece sincronización de datos en tiempo real.",
      },
      {
        prompt:
          "¿Qué es el Model Context Protocol (MCP) en el contexto de los agentes de IA de Google?",
        answer:
          "Es un protocolo que permite a los agentes de IA conectarse y utilizar de forma segura herramientas y servicios empresariales como Google Maps, BigQuery y APIs de terceros.",
      },
      {
        prompt:
          "GCP ofrece máquinas virtuales _____ que son de bajo costo y corta duración, ideales para cargas de trabajo tolerantes a fallos.",
        answer: "Preemptible o Spot VMs",
      },
      {
        prompt: "Término: Cloud DNS",
        answer:
          "Definición: Un servicio de sistema de nombres de dominio (DNS) de alto rendimiento, resistente y global que publica tus nombres de dominio en el DNS global.",
      },
      {
        prompt:
          "El servicio de GCP que proporciona repositorios de Git privados totalmente gestionados se llama _____.",
        answer: "Cloud Source Repositories",
      },
      {
        prompt:
          "Para el monitoreo en GCP, ¿cuál es la diferencia principal entre Cloud Monitoring y Cloud Logging?",
        answer:
          "Cloud Monitoring se centra en métricas de rendimiento y salud (datos numéricos de series temporales), mientras que Cloud Logging se centra en la recopilación y análisis de registros de eventos.",
      },
      {
        prompt: "Término: Cloud Functions (ahora parte de Cloud Run)",
        answer:
          "Definición: Una plataforma de cómputo serverless y basada en eventos para crear funciones de un solo propósito que responden a eventos en la nube.",
      },
      {
        prompt:
          "El servicio que ayuda a controlar el acceso a aplicaciones web y VMs basándose en la identidad del usuario y el contexto, sin necesidad de una VPN, es _____.",
        answer: "Identity-Aware Proxy (IAP)",
      },
      {
        prompt: "Término: Memorystore",
        answer:
          "Definición: Un servicio de base de datos en memoria totalmente gestionado para Redis y Memcached, que ofrece latencias de menos de un milisegundo.",
      },
      {
        prompt:
          "En 2025, el programa _____ ofrece a startups en etapa temprana hasta $350,000 en créditos de Google Cloud si su enfoque principal es la IA.",
        answer: "Google for Startups Cloud Program",
      },
      {
        prompt:
          "¿Qué servicio de GCP permite el descubrimiento y análisis de herramientas para mover aplicaciones a la nube?",
        answer: "Application Migration.",
      },
      {
        prompt: "Término: Security Command Center (SCC)",
        answer:
          "Definición: Una plataforma centralizada de gestión de seguridad y riesgos que ayuda a prevenir, detectar y responder a amenazas en los activos de Google Cloud.",
      },
      {
        prompt: "¿Cuál es el propósito de VPC Peering en Google Cloud?",
        answer:
          "Permite la conectividad de red privada a través de dos redes de VPC, independientemente de si pertenecen al mismo proyecto u organización.",
      },
      {
        prompt:
          "El modelo de texto a imagen de más alta calidad de Google, con capacidades mejoradas de generación e inpainting, se llama _____.",
        answer: "Imagen 3",
      },
      {
        prompt:
          "Para cargas de trabajo de VMware en Google Cloud, el servicio específico y gestionado es _____.",
        answer: "Google Cloud VMware Engine (GCVE)",
      },
      {
        prompt: "Término: Pub/Sub",
        answer:
          "Definición: Un servicio de mensajería asíncrona y escalable que permite la comunicación entre aplicaciones independientes.",
      },
      {
        prompt:
          "El modelo de IA de Google DeepMind que puede predecir la estructura e interacciones de las moléculas de la vida con alta precisión es _____.",
        answer: "AlphaFold 3",
      },
      {
        prompt:
          "Para automatizar el aprovisionamiento de infraestructura en GCP, una herramienta popular de Infraestructura como Código (IaC) es _____, que es compatible con la plataforma.",
        answer: "Terraform (o Cloud Deployment Manager)",
      },
      {
        prompt:
          "¿Qué servicio de GCP proporciona un proxy web seguro en la nube para proteger las cargas de trabajo?",
        answer: "Secure Web Proxy (SWP).",
      },
      {
        prompt:
          "El nuevo servicio _____ actúa como un centro de comando central para todo el panorama de aplicaciones, proporcionando información sobre despliegues, salud y optimización.",
        answer: "Cloud Hub",
      },
      {
        prompt: "Término: Filestore",
        answer:
          "Definición: Un servicio de almacenamiento de archivos gestionado y de alto rendimiento para aplicaciones que requieren una interfaz de sistema de archivos y un sistema de archivos compartido (NFS).",
      },
      {
        prompt:
          "Las nuevas VMs C4D de Google Cloud se basan en la 5ª generación de procesadores _____ y el chip Titanium de Google.",
        answer: "AMD EPYC",
      },
      {
        prompt: "Término: Dataproc",
        answer:
          "Definición: Un servicio rápido, fácil de usar y gestionado para ejecutar clústeres de Apache Spark y Apache Hadoop.",
      },
      {
        prompt:
          "El servicio _____ unifica datos distribuidos y automatiza la gestión y gobernanza para potenciar el análisis a escala.",
        answer: "Dataplex",
      },
      {
        prompt:
          "Para la migración de bases de datos a Google Cloud con un tiempo de inactividad mínimo, ¿qué servicio gestionado se debe utilizar?",
        answer: "Database Migration Service (DMS).",
      },
      {
        prompt: "¿Qué ofrece Cloud Key Management (Cloud KMS)?",
        answer:
          "Un servicio centralizado de gestión de claves de cifrado que se pueden utilizar para cifrar datos en reposo en los servicios de Google Cloud.",
      },
      {
        prompt:
          "El nuevo programa de partners de Google Cloud, que se implementará en 2026 y se centra en los resultados del cliente en lugar de los requisitos del programa, se llama _____.",
        answer: "Google Cloud Partner Network",
      },
      {
        prompt:
          "La nueva capacidad _____ en BigQuery permite a los usuarios especificar un punto de corte en el tiempo al recuperar características para el entrenamiento de modelos, previniendo la fuga de datos.",
        answer: "Point-in-Time Lookup",
      },
      {
        prompt: "¿Qué permite la función ML.GENERATE_TEXT en BigQuery?",
        answer:
          "Permite la generación y análisis de lenguaje natural directamente dentro de BigQuery, utilizando la integración con los modelos LLM de Vertex AI.",
      },
      {
        prompt: "Término: Vertex AI Search for commerce",
        answer:
          "Definición: Un producto que combina capacidades de búsqueda, navegación y recomendaciones personalizadas de alta calidad para aplicaciones de comercio electrónico.",
      },
      {
        prompt:
          "El modelo de IA de Google para la generación de audio y la comprensión, que puede crear voces personalizadas con solo 10 segundos de entrada de audio, se llama _____.",
        answer: "Chirp 3",
      },
      {
        prompt:
          "Para el desarrollo local sin conexión a la nube, GCP proporciona _____ que simulan el comportamiento de servicios como Pub/Sub y Firestore.",
        answer: "Emuladores de Cloud",
      },
      {
        prompt:
          "¿Qué es la arquitectura Zero-Trust (ZTA) mencionada como el nuevo estándar para la ciberseguridad en servicios financieros?",
        answer:
          'Es un modelo de seguridad que opera bajo la filosofía de "nunca confiar, siempre verificar", asumiendo que las amenazas pueden surgir desde cualquier lugar.',
      },
      {
        prompt:
          "El almacenamiento en bloque más grande y rápido en cualquier nube pública, con exabytes de almacenamiento, es _____.",
        answer: "Hyperdisk Exapools",
      },
      {
        prompt: "Término: Cloud Trace",
        answer:
          "Definición: Un sistema de seguimiento distribuido que recopila datos de latencia de las aplicaciones para ayudar a depurar problemas de rendimiento.",
      },
      {
        prompt:
          "El nuevo servicio de almacenamiento zonal de Cloud Storage con latencia de lectura y escritura aleatoria de <1ms se llama _____.",
        answer: "Rapid Storage",
      },
      {
        prompt:
          "¿Cuál es el beneficio de los roles de IAM predefinidos sobre los roles primitivos?",
        answer:
          "Los roles predefinidos ofrecen un control de acceso detallado y específico para cada servicio, alineándose con el principio de mínimo privilegio.",
      },
      {
        prompt:
          "La red troncal global de Google, que ha evolucionado para soportar la era de la IA, se llama _____, y en 2023 escaló a 13.1 Pb/s.",
        answer: "Jupiter",
      },
      {
        prompt:
          "¿Qué servicio proporciona conectividad de red privada desde un centro de datos a GCP a través de un proveedor de servicios de red certificado?",
        answer: "Partner Interconnect.",
      },
      {
        prompt:
          "El nuevo _____ en Looker permite a los usuarios de negocio realizar pronósticos y detección de anomalías utilizando lenguaje natural.",
        answer: "Code Interpreter for Conversational Analytics",
      },
      {
        prompt:
          "El modelo de IA de Google que es el primer modelo de texto a música listo para la empresa, transformando prompts en clips de 30 segundos, se llama _____.",
        answer: "Lyria",
      },
      {
        prompt: '¿Qué son los "sole-tenant nodes" en Compute Engine?',
        answer:
          "Son servidores físicos dedicados a alojar únicamente las VMs de un cliente específico, utilizados para cumplir con requisitos de seguridad, licencia o aislamiento.",
      },
      {
        prompt:
          "El servicio de GCP _____ ayuda a las organizaciones a cumplir con regulaciones específicas (como ITAR) al aplicar controles de seguridad y cumplimiento en cargas de trabajo sensibles.",
        answer: "Assured Workloads",
      },
      {
        prompt:
          "¿Qué nueva capacidad de GKE Autopilot, anunciada en Next '25, mejora el rendimiento?",
        answer:
          "Mejoras en la programación de pods, el tiempo de reacción al escalado y el ajuste de capacidad.",
      },
      {
        prompt: "Término: Cloud Deploy",
        answer:
          "Definición: Un servicio para gestionar y ejecutar la entrega continua de aplicaciones a Google Kubernetes Engine, permitiendo el control del proceso de despliegue.",
      },
      {
        prompt:
          "El agente de seguridad de Google Cloud que realiza investigaciones dinámicas en nombre de los usuarios para analizar el contexto de cada alerta se llama _____.",
        answer: "Alert triage agent",
      },
      {
        prompt: "¿Qué es la compatibilidad con MongoDB en Firestore?",
        answer:
          "Permite a los desarrolladores utilizar la portabilidad de la API de MongoDB mientras aprovechan las características de Firestore como la replicación multirregional y el SLA del 99.999%.",
      },
      {
        prompt:
          "El servicio _____ proporciona conexiones dedicadas de alta velocidad y baja latencia entre infraestructuras on-premises y Google Cloud.",
        answer: "Cloud Interconnect",
      },
      {
        prompt:
          "En BigQuery ML, ¿qué función se utiliza para realizar pronósticos de series temporales con modelos ARIMA_PLUS?",
        answer: "La función ML.EXPLAIN_FORECAST.",
      },
      {
        prompt:
          "El nuevo servicio _____ proporciona una caché fuertemente consistente que funciona con buckets regionales para acercar los datos a las GPU/TPU, reduciendo la latencia.",
        answer: "Anywhere Cache",
      },
      {
        prompt: "Término: Google Cloud VMware Engine",
        answer:
          "Definición: Un servicio totalmente gestionado que permite ejecutar cargas de trabajo de VMware de forma nativa en Google Cloud.",
      },
      {
        prompt: '¿Qué permite la función de "consultas federadas" en BigQuery?',
        answer:
          "Permite consultar datos que residen en fuentes externas (como Cloud SQL, Cloud Storage, AWS Glue) directamente desde BigQuery sin necesidad de cargarlos primero.",
      },
      {
        prompt:
          "La nueva _____ de Vertex AI proporciona visibilidad sobre el uso, el rendimiento, la latencia y ayuda a solucionar errores para las iniciativas de IA.",
        answer: "Vertex AI Dashboards",
      },
      {
        prompt:
          "¿Qué es GKE Autopilot en comparación con el modo estándar de GKE?",
        answer:
          "Autopilot es un modo de operación en el que GKE gestiona toda la infraestructura del clúster, incluyendo nodos y escalado, permitiendo a los usuarios centrarse solo en sus cargas de trabajo.",
      },
      {
        prompt:
          "El servicio que ofrece un sistema de archivos paralelo, totalmente gestionado y de alto rendimiento, basado en DDN EXAScaler, se llama _____.",
        answer: "Google Cloud Managed Lustre",
      },
      {
        prompt:
          "Para el control de acceso detallado a nivel de base de datos en Spanner, se utiliza _____, que va más allá de los roles de IAM a nivel de proyecto.",
        answer: "Fine-grained access control",
      },
      {
        prompt: "Término: Cloud Router",
        answer:
          "Definición: Un servicio totalmente gestionado que utiliza el Border Gateway Protocol (BGP) para anunciar rangos de direcciones IP entre una VPC y una red on-premises.",
      },
      {
        prompt: '¿Qué permite la función de "VPC Service Controls"?',
        answer:
          "Permite definir un perímetro de seguridad alrededor de los recursos de los servicios de Google Cloud para mitigar los riesgos de exfiltración de datos.",
      },
      {
        prompt:
          "La colaboración de Google Cloud con _____ permite que las cargas de trabajo de bases de datos Oracle se ejecuten de forma nativa en centros de datos de Google Cloud.",
        answer: "Oracle Cloud Infrastructure (OCI)",
      },
      {
        prompt: "Término: Looker",
        answer:
          "Definición: Una plataforma de inteligencia de negocios (BI) y análisis de datos que ayuda a explorar, visualizar y compartir información de manera consistente.",
      },
      {
        prompt:
          "¿Qué característica de Cloud SQL para PostgreSQL previene reinicios por falta de memoria al cancelar de forma proactiva las consultas que consumen demasiada memoria?",
        answer: "El Memory Agent.",
      },
      {
        prompt:
          "El nuevo _____, en versión preliminar, proporciona un enfoque visual de tipo lienzo para diseñar y modificar plantillas de aplicaciones.",
        answer: "Application Design Center",
      },
      {
        prompt: "Término: Cloud Composer",
        answer:
          "Definición: Un servicio de orquestación de flujos de trabajo totalmente gestionado, basado en Apache Airflow, para crear, programar y supervisar pipelines.",
      },
      {
        prompt: '¿Qué son los "Alias IPs" en el contexto de GKE?',
        answer:
          "Son rangos de IP secundarios asignados a una VM que permiten a GKE asignar direcciones IP a los pods desde un rango CIDR dentro de la VPC, mejorando la escalabilidad y la gestión de la red.",
      },
      {
        prompt:
          "El servicio _____ proporciona un inventario de los activos en la nube con historial, permitiendo exportar metadatos de recursos en un momento dado.",
        answer: "Cloud Asset Inventory",
      },
      {
        prompt: "¿Cuál es la función del GKE Inference Gateway?",
        answer:
          "Es una puerta de enlace que proporciona un balanceo de carga inteligente para servir modelos de IA a escala, optimizando el uso de recursos como las GPU.",
      },
      {
        prompt: "Término: Cloud Tasks",
        answer:
          "Definición: Un servicio totalmente gestionado que permite gestionar la ejecución de un gran número de tareas distribuidas de forma asíncrona.",
      },
      {
        prompt:
          "El servicio _____ permite ejecutar clústeres privados de GKE en hardware robusto desplegado en las instalaciones del cliente.",
        answer: "Google Distributed Cloud connected Appliance Service",
      },
      {
        prompt:
          "¿Qué mejora introduce el soporte para TLS 1.3 0-RTT en Cloud CDN?",
        answer:
          "Aumenta el rendimiento de la aplicación para las conexiones reanudadas al eliminar un viaje de ida y vuelta (round-trip) en el handshake de TLS.",
      },
      {
        prompt: "Término: Cloud VPN",
        answer:
          "Definición: Un servicio que crea túneles seguros sobre la internet pública entre una red local (on-premises) y la red VPC de Google Cloud usando el protocolo IPsec.",
      },
      {
        prompt: '¿Qué es la función "Object Contexts" en Google Cloud Storage?',
        answer:
          "Es una nueva característica que proporciona una base para el almacenamiento semántico, permitiendo integrar Gemini con objetos de GCS y enriquecerlos de forma inteligente.",
      },
      {
        prompt:
          "La tecnología _____ en la red de Google reduce los tiempos de mitigación de fallos de horas a minutos, mejorando la resiliencia.",
        answer: "Autonomous networking",
      },
      {
        prompt:
          "Para la analítica de datos, ¿qué servicio es ideal para la integración de datos de tipo ETL (Extract, Transform, Load) con una interfaz gráfica?",
        answer: "Cloud Data Fusion.",
      },
    ],
  },
  {
    id: "java_evolution",
    name: "Java Evolution",
    cards: [
      {
        prompt:
          "¿Cuál es el propósito de una operación agregada en el contexto de Java Streams?",
        answer:
          "Realizar una tarea en el stream como un todo en lugar de procesar elementos individuales secuencialmente.",
      },
      {
        prompt:
          "¿Qué característica de los streams indica que los elementos no se almacenan en memoria, sino que se procesan a medida que se recorren?",
        answer:
          "Los streams son estructuras de datos que procesan elementos expresando cálculos sobre ellos, no los almacenan.",
      },
      {
        prompt:
          "Diferencia fundamental entre colecciones y streams respecto a la mutabilidad.",
        answer:
          "Las colecciones son mutables (se pueden añadir/eliminar elementos), mientras que los streams son inmutables.",
      },
      {
        prompt: "¿Por qué un stream solo se puede usar una vez?",
        answer:
          "Porque una vez que se invoca una operación terminal, el stream se considera consumido y no puede ser reutilizado.",
      },
      {
        prompt: "Concepto: Ejecución perezosa (Lazy execution).",
        answer:
          "Las operaciones intermedias no se ejecutan hasta que se invoca una operación terminal en el pipeline del stream.",
      },
      {
        prompt:
          "¿Qué interfaz de Java **no** implementan los streams, lo que impide usarlos directamente en un bucle for-each?",
        answer: "La interfaz Iterable.",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre iteración externa e interna en Java?",
        answer:
          "La iteración externa usa iteradores explícitos, mientras que la interna es manejada implícitamente por la API de Streams.",
      },
      {
        prompt:
          "¿Qué interfaz define la funcionalidad básica ofrecida por todos los streams y extiende de AutoCloseable?",
        answer: "BaseStream.",
      },
      {
        prompt:
          "¿En qué casos es estrictamente necesario cerrar un stream de forma explícita?",
        answer:
          "Solo cuando el stream está respaldado por recursos externos, como un archivo.",
      },
      {
        prompt:
          "¿Qué garantiza que una operación en un stream secuencial ordenado sea determinista?",
        answer:
          "Que la ejecución produzca el mismo resultado siempre que se use la misma fuente de datos y el mismo pipeline.",
      },
      {
        prompt:
          "¿Qué métodos de las interfaces de stream crean streams infinitos?",
        answer: "Los métodos factoría generate() e iterate().",
      },
      {
        prompt:
          "¿Qué operación intermedia se debe usar para limitar el tamaño de un stream infinito antes de llamar a una operación terminal?",
        answer: "limit(maxSize).",
      },
      {
        prompt: "¿Cuál es la función del método factoría `Stream.empty()`?",
        answer: "Crear un stream que no contiene elementos.",
      },
      {
        prompt:
          "El método _____ de la clase Arrays permite crear un stream a partir de un array de objetos o primitivos.",
        answer: "stream()",
      },
      {
        prompt:
          "¿Qué excepción lanza `Stream.of(arg)` si el argumento pasado es nulo?",
        answer: "NullPointerException.",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre `IntStream.range(start, end)` e `IntStream.rangeClosed(start, end)`?",
        answer:
          "range() es exclusivo del límite superior, mientras que rangeClosed() es inclusivo.",
      },
      {
        prompt:
          "¿Qué método de la clase Random genera un stream infinito de valores double entre $0.0$ y $1.0$?",
        answer: "doubles().",
      },
      {
        prompt:
          "¿Qué operación intermedia transforma cada elemento del stream aplicando una función uno-a-uno?",
        answer: "map().",
      },
      {
        prompt: "¿Cuál es el propósito principal de la operación `flatMap`?",
        answer:
          "Transformar cada elemento en un stream y aplanar todos esos streams en uno solo.",
      },
      {
        prompt:
          "¿Qué diferencia a una operación terminal de una operación intermedia?",
        answer:
          "La operación terminal inicia el procesamiento, consume el stream y no devuelve otro stream.",
      },
      {
        prompt: "Concepto: Operación sin estado (Stateless operation).",
        answer:
          "Operación que procesa cada elemento de forma independiente, sin considerar elementos previos o futuros.",
      },
      {
        prompt: "Concepto: Operación con estado (Stateful operation).",
        answer:
          "Operación que requiere procesar múltiples elementos o el stream completo antes de producir un resultado (ej. sorted o distinct).",
      },
      {
        prompt:
          "¿Qué método de cortocircuito devuelve un subconjunto de elementos que cumplen un predicado, deteniéndose al primer fallo?",
        answer: "takeWhile().",
      },
      {
        prompt:
          "¿Qué garantiza la estabilidad de la operación `distinct()` en streams ordenados?",
        answer:
          "Garantiza que se conserve la primera aparición de un elemento duplicado según el orden de encuentro.",
      },
      {
        prompt: "¿Cuál es la función de `skip(n)` en un pipeline de stream?",
        answer:
          "Descartar los primeros $n$ elementos del stream y devolver un stream con el resto.",
      },
      {
        prompt:
          "¿Qué operación intermedia permite inspeccionar los elementos de un stream (por ejemplo, para depuración) sin alterarlos?",
        answer: "peek().",
      },
      {
        prompt:
          "¿Qué método de BaseStream se usa para obtener un stream que se ejecutará de forma secuencial?",
        answer: "sequential().",
      },
      {
        prompt:
          "Diferencia entre `anyMatch` y `allMatch` respecto a sus resultados.",
        answer:
          "anyMatch devuelve true si al menos un elemento cumple el predicado; allMatch requiere que todos lo cumplan.",
      },
      {
        prompt: "¿Qué devuelve la operación terminal `findAny()`?",
        answer:
          "Un Optional que describe algún elemento del stream, o un Optional vacío si el stream no tiene elementos.",
      },
      {
        prompt:
          "¿Por qué `findFirst()` puede ser más costoso que `findAny()` en streams paralelos?",
        answer:
          "Porque findFirst() debe respetar el orden de encuentro, mientras que findAny() puede devolver cualquier elemento encontrado primero.",
      },
      {
        prompt:
          "¿Qué operación terminal devuelve el número total de elementos procesados en el pipeline?",
        answer: "count().",
      },
      {
        prompt: "¿Qué devuelve `min(Comparator)` si el stream está vacío?",
        answer: "Un objeto Optional vacío.",
      },
      {
        prompt:
          "En la operación `reduce(identity, accumulator)`, ¿qué ocurre si el stream está vacío?",
        answer: "Se devuelve el valor de identidad proporcionado.",
      },
      {
        prompt:
          "¿Qué función cumple el 'combiner' en una operación de reducción paralela?",
        answer:
          "Fusionar los resultados parciales calculados por diferentes hilos en un único valor final.",
      },
      {
        prompt: "Concepto: Reducción mutable.",
        answer:
          "Operación que acumula los elementos del stream en un contenedor de resultados mutable, como un ArrayList o StringBuilder.",
      },
      {
        prompt:
          "¿Cuáles son los tres argumentos requeridos por el método `collect()`?",
        answer:
          "Un Supplier (proveedor), un Accumulator (acumulador) y un Combiner (combinador).",
      },
      {
        prompt:
          "¿Qué método de la interfaz Stream devuelve una lista inmutable de los elementos resultantes?",
        answer: "toList().",
      },
      {
        prompt:
          "¿Qué recolector de la clase Collectors organiza los elementos en un mapa basado en una clave booleana?",
        answer: "partitioningBy().",
      },
      {
        prompt: "¿Cuál es la función del recolector `joining()`?",
        answer:
          "Concatenar los elementos de tipo CharSequence en una sola cadena String.",
      },
      {
        prompt:
          "¿Qué recolector de Collectors devuelve un Map donde los valores son listas de elementos que comparten la misma clave?",
        answer: "groupingBy().",
      },
      {
        prompt:
          "¿Qué método de Collectors permite transformar el resultado de un recolector mediante una función finalizadora?",
        answer: "collectingAndThen().",
      },
      {
        prompt:
          "El método factoría de stream que acepta una semilla y una función para generar elementos ordenados es _____.",
        answer: "iterate()",
      },
      {
        prompt:
          "¿Qué método de las interfaces de stream numérico permite obtener un objeto que contiene conteo, suma, mínimo, máximo y promedio?",
        answer: "summaryStatistics().",
      },
      {
        prompt:
          '¿Qué significa que un parámetro de comportamiento de un stream sea "sin interferencia"?',
        answer:
          "Significa que no debe modificar la fuente de datos del stream durante el procesamiento del pipeline.",
      },
      {
        prompt:
          "¿Por qué las operaciones `map` y `filter` se consideran sin estado (stateless)?",
        answer:
          "Porque pueden procesar un elemento sin necesidad de conocer información sobre otros elementos del stream.",
      },
      {
        prompt:
          "¿Qué método de BaseStream se utiliza para habilitar el procesamiento en paralelo de un stream?",
        answer: "parallel().",
      },
      {
        prompt:
          '¿Qué operación intermedia de ordenación (`sorted`) se considera una operación con estado "pesada"?',
        answer:
          "Se considera pesada porque debe almacenar todos los elementos del stream antes de poder emitir el primero ordenado.",
      },
      {
        prompt:
          "¿Qué método de `IntStream` convierte los valores primitivos a sus respectivos objetos envolventes (Integer)?",
        answer: "boxed().",
      },
      {
        prompt:
          "¿Qué ocurre si se aplica la operación `count()` sobre un stream infinito?",
        answer: "La operación nunca terminará.",
      },
      {
        prompt: "¿Cuál es el tipo de retorno de `Collectors.counting()`?",
        answer: "Collector<T, ?, Long>.",
      },
      {
        prompt:
          "¿Qué método permite crear un stream a partir de un subrango específico de un array?",
        answer: "Arrays.stream(array, fromIndex, toIndex).",
      },
      {
        prompt:
          "¿Qué operación se prefiere para mejorar el rendimiento: `skip` antes de `map` o `map` antes de `skip`?",
        answer:
          "skip antes de map, para evitar transformaciones innecesarias en elementos que serán descartados.",
      },
      {
        prompt: "¿Cuál es la diferencia entre `map` y `mapMulti`?",
        answer:
          "map es una transformación 1-a-1, mientras que mapMulti es una transformación 1-a-muchos más eficiente que flatMap en ciertos casos.",
      },
      {
        prompt:
          "¿Qué método de Collectors se utiliza para agrupar elementos y contarlos simultáneamente?",
        answer: "groupingBy(classifier, counting()).",
      },
      {
        prompt:
          "¿Qué operación terminal permite realizar una acción en cada elemento respetando el orden de encuentro, incluso en paralelo?",
        answer: "forEachOrdered().",
      },
      {
        prompt:
          "¿Qué recolector se usa para encontrar el elemento máximo dentro de un grupo definido por `groupingBy`?",
        answer: "maxBy().",
      },
      {
        prompt:
          "¿Cómo se obtiene un stream de caracteres a partir de un String en Java?",
        answer:
          "Usando el método chars(), que devuelve un IntStream de los valores Unicode.",
      },
      {
        prompt:
          "¿Qué recolector de Collectors es equivalente a realizar una reducción de stream con un valor de identidad y un acumulador?",
        answer: "reducing().",
      },
      {
        prompt:
          "¿Qué método de `Files` permite buscar archivos en una jerarquía de directorios devolviendo un Stream de Paths?",
        answer: "find().",
      },
      {
        prompt:
          "¿Qué significa que una operación sea de cortocircuito (short-circuit)?",
        answer:
          "Que la operación puede producir un resultado o un stream finito sin procesar todos los elementos de la fuente.",
      },
      {
        prompt:
          "¿Qué recolector de Collectors permite aplanar streams resultantes de una transformación dentro de otro recolector?",
        answer: "flatMapping().",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre `groupingBy` y `groupingByConcurrent`?",
        answer:
          "groupingByConcurrent usa un mapa concurrente y es más eficiente para streams paralelos desordenados.",
      },
      {
        prompt:
          "¿Qué método de `Collectors` se usa para calcular el promedio de una propiedad numérica de los objetos en un stream?",
        answer: "averagingInt(), averagingLong() o averagingDouble().",
      },
      {
        prompt:
          "¿Qué recolector se utiliza para concatenar los resultados de un stream en una lista mutable específica (ej. LinkedList)?",
        answer: "toCollection(LinkedList::new).",
      },
      {
        prompt:
          "¿Qué operación terminal se usa para obtener un array de objetos `Object[]` a partir de un stream?",
        answer: "toArray().",
      },
      {
        prompt:
          "¿Por qué `unordered()` puede mejorar el rendimiento de `distinct()` en un stream paralelo?",
        answer:
          "Porque elimina la necesidad de mantener el orden de encuentro, reduciendo la sobrecarga de sincronización.",
      },
      {
        prompt:
          "¿Qué método de Collectors permite sumar valores numéricos derivados de los elementos del stream?",
        answer: "summingInt(), summingLong() o summingDouble().",
      },
      {
        prompt:
          "¿Qué interfaz funcional representa el acumulador en la operación `collect()` de tres argumentos?",
        answer: "BiConsumer<R, T>.",
      },
      {
        prompt:
          "¿Cuál es el valor de retorno de `Optional.orElse(defaultValue)` si el Optional contiene un valor?",
        answer: "El valor contenido en el Optional.",
      },
      {
        prompt:
          "¿Qué método de `Stream` permite combinar dos streams, concatenándolos?",
        answer: "Stream.concat(a, b).",
      },
      {
        prompt:
          "¿Qué método de stream numérico se utiliza para encontrar el valor máximo sin usar un comparador?",
        answer:
          "max() (devuelve un OptionalInt, OptionalLong o OptionalDouble).",
      },
      {
        prompt:
          "¿Qué recolector de Collectors es útil para realizar dos recolecciones diferentes sobre los mismos elementos y combinar sus resultados?",
        answer:
          "teeing() (mencionado como recolector avanzado en Java moderno).",
      },
      {
        prompt:
          "¿Qué garantiza que un stream paralelo sea determinista en sus resultados?",
        answer:
          "Que la fuente de datos esté ordenada y las operaciones respeten el orden de encuentro (encounter order).",
      },
      {
        prompt:
          "¿Qué método de BaseStream comprueba si el stream se ejecutará en paralelo?",
        answer: "isParallel().",
      },
      {
        prompt:
          "¿Qué interfaz funcional es el parámetro de la operación intermedia `filter()`?",
        answer: "Predicate<? super T>.",
      },
      {
        prompt:
          "¿Qué recolector de Collectors se usa para agrupar elementos y aplicar un filtro antes de la reducción?",
        answer: "filtering().",
      },
      {
        prompt:
          "En `Collectors.toMap`, ¿para qué sirve el tercer argumento (mergeFunction)?",
        answer:
          "Para resolver conflictos de colisión cuando dos elementos mapean a la misma clave.",
      },
      {
        prompt:
          "¿Qué método de `Stream` se utiliza para obtener una versión paralela de un stream secuencial?",
        answer: "parallel().",
      },
      {
        prompt:
          "¿Cómo se llama la propiedad de un acumulador en `reduce` que permite procesar elementos en cualquier par y luego combinarlos?",
        answer: "Asociatividad.",
      },
      {
        prompt:
          "¿Qué método de `Stream` devuelve el primer elemento encontrado en un stream, respetando el orden si existe?",
        answer: "findFirst().",
      },
    ],
  },
];
