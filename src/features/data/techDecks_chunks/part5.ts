import type { TechDeck } from "@/features/data/techDecks_chunks/types";

export const techDecksPart5: TechDeck[] = [
  {
    id: "modern_dist_java",
    name: "Modern Dist Java",
    cards: [
      {
        prompt:
          "En el contexto del teorema CAP, ¿qué garantiza la 'Consistencia' (C)?",
        answer:
          "Garantiza que cada lectura recibe la escritura más reciente o un error, asegurando que todos los nodos vean los mismos datos al mismo tiempo.",
      },
      {
        prompt: "En el teorema CAP, ¿qué significa 'Disponibilidad' (A)?",
        answer:
          "Asegura que cada solicitud reciba una respuesta, sin garantizar que contenga la versión más reciente de la información.",
      },
      {
        prompt:
          "Según el teorema CAP, ¿qué es la 'Tolerancia a Particiones' (P)?",
        answer:
          "Es la capacidad del sistema para continuar operando a pesar de fallos de comunicación de red arbitrarios entre nodos.",
      },
      {
        prompt:
          "El teorema CAP establece que un sistema distribuido solo puede satisfacer simultáneamente dos de estas tres garantías: _____, Disponibilidad y Tolerancia a Particiones.",
        answer: "Consistencia",
      },
      {
        prompt:
          "¿Qué dos garantías debe elegir un sistema distribuido en presencia de una partición de red, según el teorema CAP?",
        answer:
          "Debe elegir entre una consistencia perfecta (CP) o una disponibilidad del 100% (AP).",
      },
      {
        prompt:
          "En el acrónimo ACID, ¿qué principio asegura que todos los componentes de una transacción se traten como una sola acción, completándose todos o ninguno?",
        answer: "Atomicidad (Atomicity).",
      },
      {
        prompt:
          "¿Qué propiedad ACID garantiza que una transacción debe seguir las reglas y restricciones definidas de la base de datos, como las restricciones y los disparadores?",
        answer: "Consistencia (Consistency).",
      },
      {
        prompt:
          "La propiedad ACID de _____ asegura que la ejecución concurrente de transacciones resulta en un estado del sistema que se obtendría si las transacciones se ejecutaran en serie.",
        answer: "Aislamiento (Isolation).",
      },
      {
        prompt:
          "¿Qué propiedad ACID garantiza que una vez que una transacción se ha confirmado, persistirá y no se deshará para acomodar conflictos con otras operaciones?",
        answer: "Durabilidad (Durability).",
      },
      {
        prompt:
          "¿Cuál es la diferencia fundamental entre la 'Consistencia' en ACID y la 'Consistencia' en el teorema CAP?",
        answer:
          "La consistencia ACID se centra en las reglas y restricciones de la base de datos, mientras que la consistencia CAP asegura que todas las réplicas de datos tengan el mismo valor al mismo tiempo.",
      },
      {
        prompt:
          "¿Qué es un 'Dirty Read' (lectura sucia) en el contexto de las transacciones de base de datos?",
        answer:
          "Ocurre cuando una transacción lee datos que han sido modificados por otra transacción concurrente que aún no ha sido confirmada (commit).",
      },
      {
        prompt:
          "Describe la anomalía de concurrencia conocida como 'Non-repeatable Read' (lectura no repetible).",
        answer:
          "Ocurre cuando una transacción vuelve a leer una fila y encuentra que ha sido modificada por otra transacción concurrente que ya se ha confirmado.",
      },
      {
        prompt: "¿Qué es una 'Phantom Read' (lectura fantasma)?",
        answer:
          "Ocurre cuando una transacción vuelve a ejecutar una consulta de rango y encuentra que han aparecido nuevas filas 'fantasma' insertadas por otra transacción confirmada.",
      },
      {
        prompt:
          "El nivel de aislamiento _____ previene las lecturas sucias, pero permite lecturas no repetibles y lecturas fantasma.",
        answer: "Read Committed (Lectura Confirmada).",
      },
      {
        prompt:
          "¿Qué nivel de aislamiento de transacciones previene tanto las lecturas sucias como las no repetibles, pero todavía puede permitir lecturas fantasma?",
        answer: "Repeatable Read (Lectura Repetible).",
      },
      {
        prompt:
          "¿Cuál es el nivel de aislamiento más estricto en una base de datos SQL que previene las lecturas sucias, no repetibles y fantasma?",
        answer: "Serializable.",
      },
      {
        prompt:
          "Compara el escalado vertical (típico de SQL) con el escalado horizontal (típico de NoSQL).",
        answer:
          "El escalado vertical implica añadir más recursos (CPU, RAM) a un único servidor, mientras que el escalado horizontal distribuye la carga entre múltiples servidores.",
      },
      {
        prompt:
          "En el diseño de bases de datos, ¿cuál es la diferencia principal entre 'sharding' y 'partitioning'?",
        answer:
          "El 'sharding' distribuye los datos entre diferentes servidores de bases de datos, mientras que el 'partitioning' divide una tabla en piezas más pequeñas dentro de la misma instancia de base de datos.",
      },
      {
        prompt:
          "En una arquitectura de replicación de base de datos, ¿cuál es el patrón más común y cómo funciona?",
        answer:
          "El patrón Líder-Seguidor (Master-Slave), donde un nodo (líder) maneja todas las escrituras y las replica a varios nodos seguidores.",
      },
      {
        prompt:
          "Diferencia entre la replicación síncrona y asíncrona en bases de datos.",
        answer:
          "En la replicación síncrona, el líder espera la confirmación de los seguidores antes de confirmar, mientras que en la asíncrona, el líder confirma inmediatamente y los seguidores se ponen al día más tarde.",
      },
      {
        prompt:
          "En el contexto de microservicios, ¿qué problema resuelve el patrón Saga?",
        answer:
          "Resuelve el problema de mantener la consistencia de los datos en transacciones distribuidas que abarcan múltiples servicios, cada uno con su propia base de datos.",
      },
      {
        prompt:
          "Describe la implementación del patrón Saga mediante 'Orquestación'.",
        answer:
          "Un servicio 'orquestador' central gestiona toda la secuencia de la transacción, indicando a cada servicio participante qué hacer y cuándo.",
      },
      {
        prompt:
          "Describe la implementación del patrón Saga mediante 'Coreografía'.",
        answer:
          "Los servicios se comunican publicando y suscribiéndose a eventos, reaccionando de forma independiente a los cambios de estado sin un controlador central.",
      },
      {
        prompt:
          "Si un paso en una transacción distribuida bajo el patrón Saga falla, ¿qué mecanismo se utiliza para deshacer los pasos anteriores exitosos?",
        answer:
          "Se ejecutan 'transacciones de compensación' para revertir los cambios realizados por las transacciones locales previas.",
      },
      {
        prompt:
          "¿Cuál es el propósito del patrón 'Circuit Breaker' (Interruptor de circuito) en una arquitectura de microservicios?",
        answer:
          "Detecta cuándo un servicio dependiente está fallando y 'abre el circuito' para evitar más solicitudes, permitiendo que el servicio se recupere.",
      },
      {
        prompt:
          "En arquitecturas de microservicios, un _____ actúa como el único punto de entrada para el tráfico externo, manejando el enrutamiento y la autenticación.",
        answer: "API Gateway.",
      },
      {
        prompt:
          "¿Qué es un 'Service Mesh' (malla de servicios) como Istio y qué tipo de tráfico gestiona principalmente?",
        answer:
          "Es una capa de infraestructura que gestiona el tráfico interno 'este-oeste' entre servicios mediante proxies sidecar, sin modificar el código de la aplicación.",
      },
      {
        prompt:
          "Compara REST con gRPC en términos de serialización y transporte.",
        answer:
          "REST utiliza típicamente JSON (texto) sobre HTTP/1.1, mientras que gRPC usa Protocol Buffers (binario) sobre HTTP/2, siendo más eficiente.",
      },
      {
        prompt: "¿Qué problema de las API REST resuelve GraphQL?",
        answer:
          "Resuelve los problemas de 'over-fetching' (recibir más datos de los necesarios) y 'under-fetching' (necesitar múltiples solicitudes) al permitir a los clientes solicitar exactamente los datos que necesitan.",
      },
      {
        prompt:
          "¿Qué es el 'Hashing Consistente' y por qué es superior al hashing basado en módulo para distribuir datos entre nodos?",
        answer:
          "Es una técnica que mapea claves y nodos a un 'anillo'. Minimiza la redistribución de datos cuando se añaden o eliminan nodos, a diferencia del hashing por módulo que requiere un remapeo masivo.",
      },
      {
        prompt: "En Apache Kafka, ¿qué es un 'Topic' y qué es una 'Partition'?",
        answer:
          "Un 'Topic' es un canal lógico que organiza mensajes, y una 'Partition' es una subdivisión de un topic que permite el procesamiento paralelo.",
      },
      {
        prompt:
          "En Kafka, ¿cuál es el rol del bróker 'Líder' para una partición específica?",
        answer:
          "El bróker Líder es responsable de gestionar todas las lecturas y escrituras para esa partición.",
      },
      {
        prompt:
          "¿Qué es un 'Consumer Group' en Kafka y cómo permite el paralelismo?",
        answer:
          "Es un grupo de consumidores que comparten la carga de trabajo de procesar mensajes de las particiones de un topic, donde cada partición es asignada a un solo consumidor del grupo.",
      },
      {
        prompt:
          "En Kafka, ¿cómo se puede garantizar el orden de procesamiento de los mensajes?",
        answer:
          "Se puede garantizar el orden de los mensajes que comparten la misma clave, ya que todos los mensajes con la misma clave se envían a la misma partición.",
      },
      {
        prompt:
          "¿Cuál es el propósito principal del Garbage Collector G1 (Garbage-First) en Java?",
        answer:
          "Está diseñado para ofrecer tiempos de pausa predecibles al dividir el heap en regiones y priorizar la recolección de las que contienen más basura.",
      },
      {
        prompt:
          "El recolector de basura _____ en Java está diseñado para latencias extremadamente bajas, con tiempos de pausa de menos de un milisegundo, independientemente del tamaño del heap.",
        answer: "ZGC (Z Garbage Collector).",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de los recolectores de basura de baja latencia como ZGC y Shenandoah en comparación con G1?",
        answer:
          "Realizan la mayor parte de su trabajo, incluida la evacuación de objetos, de forma concurrente con los hilos de la aplicación, minimizando las pausas de 'stop-the-world'.",
      },
      {
        prompt:
          "En Java, ¿qué son los 'Virtual Threads' (Proyecto Loom) y qué tipo de aplicaciones se benefician más de ellos?",
        answer:
          "Son hilos ligeros gestionados por la JVM, no por el SO, que permiten escalar masivamente aplicaciones con muchas tareas bloqueantes de E/S (I/O-bound).",
      },
      {
        prompt:
          "¿Se deben agrupar (pool) los Virtual Threads en Java de la misma manera que los platform threads?",
        answer:
          "No, son tan baratos de crear que no se deben agrupar; se recomienda crear uno nuevo por cada tarea.",
      },
      {
        prompt:
          "En el Modelo de Memoria de Java (JMM), ¿qué define la relación 'happens-before'?",
        answer:
          "Define un orden parcial de las acciones de memoria, garantizando que las escrituras de una acción son visibles para las lecturas de otra acción que ocurre después.",
      },
      {
        prompt:
          "Una escritura en una variable `volatile` en Java _____ cada lectura subsecuente de esa misma variable.",
        answer: "happens-before (sucede antes que).",
      },
      {
        prompt:
          "¿Qué problema de concurrencia principal resuelve el uso de la palabra clave `volatile` en Java?",
        answer:
          "Resuelve el problema de la visibilidad, asegurando que los cambios en una variable realizados por un hilo sean inmediatamente visibles para otros hilos.",
      },
      {
        prompt:
          "En PostgreSQL, ¿cuál es la diferencia entre `EXPLAIN` y `EXPLAIN ANALYZE`?",
        answer:
          "`EXPLAIN` muestra el plan de ejecución estimado, mientras que `EXPLAIN ANALYZE` ejecuta la consulta y muestra el plan junto con los tiempos de ejecución y recuentos de filas reales.",
      },
      {
        prompt:
          "En un plan de consulta de PostgreSQL, ¿qué suele indicar un 'Sequential Scan' en una tabla grande?",
        answer:
          "Generalmente indica la falta de un índice útil que podría acelerar la consulta.",
      },
      {
        prompt:
          "En Redis, ¿cuáles son las dos opciones principales de persistencia y en qué se diferencian?",
        answer:
          "RDB (snapshotting) guarda instantáneas del dataset a intervalos, mientras que AOF (Append-Only File) registra cada operación de escritura.",
      },
      {
        prompt:
          "¿Qué es la 'consistencia eventual' (eventual consistency) en sistemas distribuidos?",
        answer:
          "Es una garantía de que, si no se realizan nuevas actualizaciones, todas las réplicas convergerán eventualmente al mismo valor, aunque puedan estar temporalmente inconsistentes.",
      },
      {
        prompt:
          "El framework _____ es el estándar actual en Java para implementar patrones de resiliencia como Circuit Breaker, Rate Limiter y Retry.",
        answer: "Resilience4j.",
      },
      {
        prompt:
          "¿Qué es una base de datos de tipo 'document store' (almacén de documentos) y da un ejemplo?",
        answer:
          "Es una base de datos NoSQL que almacena datos en documentos (como JSON o BSON), donde un documento contiene toda la información de un objeto. Un ejemplo es MongoDB.",
      },
      {
        prompt:
          "¿Qué es una base de datos 'key-value store' (almacén clave-valor) y cuál es su principal ventaja de rendimiento?",
        answer:
          "Es una base de datos NoSQL que almacena datos como una colección de pares clave-valor, ofreciendo lecturas y escrituras muy rápidas, generalmente en tiempo O(1).",
      },
      {
        prompt:
          "¿Qué es una base de datos de tipo 'wide column store' (almacén de columnas anchas) como Apache Cassandra?",
        answer:
          "Organiza los datos en columnas en lugar de filas, permitiendo un almacenamiento y acceso muy eficiente para consultas que solo necesitan un subconjunto de columnas.",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja de la arquitectura de Saga basada en coreografía en términos de gestión?",
        answer:
          "A medida que aumenta el número de microservicios, puede volverse difícil de gestionar y rastrear las dependencias y el flujo de la transacción global.",
      },
      {
        prompt:
          "¿Cuándo es más adecuado usar Virtual Threads en Java en lugar de Platform Threads?",
        answer:
          "Son ideales para tareas con alta concurrencia y operaciones de E/S bloqueantes (como llamadas a red o acceso a base de datos), donde la mayor parte del tiempo el hilo está esperando.",
      },
      {
        prompt:
          "¿En qué situaciones no se recomiendan los Virtual Threads y es preferible usar Platform Threads?",
        answer:
          "No son recomendables para tareas intensivas en CPU (CPU-bound) o cuando se utiliza código nativo pesado, ya que no ofrecen ventajas de rendimiento en esos casos.",
      },
      {
        prompt:
          "¿Qué es una 'shard key' y cuál es su función en una base de datos fragmentada (sharded)?",
        answer:
          "Es una clave o identificador que determina a qué shard (base de datos) pertenece un registro específico, permitiendo enrutar las consultas al servidor correcto.",
      },
      {
        prompt:
          "En el contexto de la programación funcional en Java, ¿qué es una 'Functional Interface'?",
        answer:
          "Es una interfaz que tiene un único método abstracto, lo que permite que sea implementada mediante una expresión lambda.",
      },
      {
        prompt:
          "Resilience4j se basa en el principio de composición de funciones, que es el equivalente al patrón _____ en la Programación Orientada a Objetos.",
        answer: "Decorator.",
      },
      {
        prompt:
          "La herramienta `EXPLAIN` de PostgreSQL estima el 'costo', que es una unidad arbitraria que el optimizador usa para representar el _____ estimado para ejecutar un paso.",
        answer: "tiempo y los recursos.",
      },
      {
        prompt:
          "En Kafka, el número de _____ controla el paralelismo de los consumidores y, por lo tanto, la escalabilidad de la lectura.",
        answer: "particiones.",
      },
      {
        prompt:
          "¿Por qué los sistemas distribuidos a menudo prefieren la mensajería asíncrona sobre las llamadas RPC síncronas?",
        answer:
          "Porque la mensajería asíncrona desacopla a los productores de los consumidores, mejorando la resiliencia y permitiendo un escalado más flexible.",
      },
      {
        prompt: "¿Qué es la semántica 'Exactly-Once' (EOS) en Apache Kafka?",
        answer:
          "Es una garantía de que un mensaje se procesa exactamente una vez, evitando duplicados y pérdidas, lograda a través de productores idempotentes y la API transaccional.",
      },
      {
        prompt:
          "¿Cuál es la función de ZooKeeper en una arquitectura de Apache Kafka?",
        answer:
          "Coordina y gestiona los brókeres y clústeres de Kafka, asegurando la tolerancia a fallos y las elecciones de líder para las particiones.",
      },
      {
        prompt:
          "En el contexto de Java 25, ¿cuál es el propósito de la Foreign Function & Memory (FFM) API?",
        answer:
          "Proporciona acceso seguro a código y datos gestionados fuera de la JVM, como la invocación de código nativo (C, C++) y el acceso a memoria fuera del heap.",
      },
      {
        prompt:
          "Las `Scoped Values` en Java 25 son una alternativa a `ThreadLocal` especialmente útil en el contexto de _____, ya que tienen menor sobrecarga de memoria y rendimiento.",
        answer: "Virtual Threads.",
      },
      {
        prompt:
          "En una arquitectura de microservicios, ¿cómo un Service Mesh como Istio mejora la seguridad sin modificar el código de la aplicación?",
        answer:
          "Gestiona la encriptación mTLS, la autenticación y la autorización a través de los proxies sidecar que se ejecutan junto a cada servicio.",
      },
      {
        prompt:
          "Diferencia entre una base de datos NoSQL de tipo 'document' y una de tipo 'key-value'.",
        answer:
          "Un almacén clave-valor trata el valor como un blob opaco, mientras que un almacén de documentos permite consultar y estructurar el contenido del valor (el documento).",
      },
      {
        prompt:
          "¿Qué es el 'back pressure' (contrapresión) en sistemas asíncronos con colas de mensajes?",
        answer:
          "Es un mecanismo para evitar que un servicio se sobrecargue, limitando el tamaño de la cola o rechazando nuevas solicitudes cuando el sistema está saturado.",
      },
      {
        prompt:
          "En el contexto de replicación de bases de datos, ¿cuál es el principal riesgo de la replicación asíncrona?",
        answer:
          "El riesgo de lecturas obsoletas ('stale reads'), ya que los seguidores pueden no estar completamente sincronizados con el líder en el momento de la lectura.",
      },
      {
        prompt:
          "¿Qué tipo de bases de datos son más adecuadas para transacciones de varias filas donde la integridad de los datos es crítica?",
        answer:
          "Las bases de datos SQL (relacionales), debido a sus fuertes garantías ACID.",
      },
      {
        prompt:
          "¿Para qué tipo de datos son más adecuadas las bases de datos NoSQL?",
        answer:
          "Son mejores para datos no estructurados o semi-estructurados, como documentos, JSON, o para aplicaciones que requieren alta escalabilidad horizontal y flexibilidad de esquema.",
      },
      {
        prompt:
          "¿Qué es la 'Idempotencia' en el diseño de sistemas y por qué es importante, por ejemplo, para los productores de Kafka?",
        answer:
          "Es la propiedad por la cual una operación puede aplicarse múltiples veces sin cambiar el resultado más allá de la aplicación inicial. En Kafka, evita duplicados durante los reintentos.",
      },
      {
        prompt:
          "El recolector de basura Shenandoah en Java es similar a ZGC en su enfoque de baja latencia, pero fue desarrollado principalmente por _____.",
        answer: "Red Hat.",
      },
      {
        prompt:
          "En una arquitectura de microservicios, ¿qué es 'Service Discovery' (descubrimiento de servicios) y por qué es necesario?",
        answer:
          "Es un mecanismo que permite a los servicios localizar y comunicarse entre sí dinámicamente, necesario porque las ubicaciones (IP, puerto) de las instancias de servicio pueden cambiar.",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de un `Service Mesh` sobre la implementación de la lógica de comunicación (reintentos, timeouts) dentro de cada microservicio?",
        answer:
          "Externaliza estas funcionalidades de la lógica de negocio, permitiendo que se gestionen de manera uniforme y centralizada sin modificar el código de la aplicación.",
      },
      {
        prompt:
          "¿Cuál es la compensación o 'trade-off' de los recolectores de basura de baja latencia como ZGC y Shenandoah en comparación con los recolectores orientados al rendimiento (throughput)?",
        answer:
          "Generalmente incurren en una mayor sobrecarga de CPU y un mayor consumo de memoria para lograr pausas mínimas.",
      },
      {
        prompt:
          "En Java, ¿qué es la 'Structured Concurrency' (concurrencia estructurada) y cómo se relaciona con los Virtual Threads?",
        answer:
          "Es un enfoque para gestionar tareas concurrentes como una sola unidad de trabajo, simplificando el manejo de errores y el ciclo de vida, y es facilitado por la naturaleza ligera de los Virtual Threads.",
      },
      {
        prompt:
          "En el contexto de Kafka, ¿qué es el conjunto 'In-Sync Replica' (ISR)?",
        answer:
          "Es el conjunto de réplicas seguidoras que están completamente al día con el líder de una partición, y solo una de ellas puede ser elegida como nuevo líder en caso de fallo.",
      },
      {
        prompt:
          "¿Cómo se implementa el patrón 'Fallback' en un sistema resiliente?",
        answer:
          "Proporciona una respuesta alternativa o un servicio degradado cuando el servicio principal no está disponible, por ejemplo, devolviendo datos de una caché o un valor predeterminado.",
      },
      {
        prompt:
          "En el diseño de sistemas, ¿por qué es importante elegir una 'shard key' adecuada?",
        answer:
          "Una mala elección de la clave puede llevar a una distribución desigual de los datos ('hot spots'), sobrecargando algunos shards mientras otros están infrautilizados.",
      },
      {
        prompt:
          "¿Qué es la 'denormalización' en el diseño de bases de datos y cuándo se utiliza?",
        answer:
          "Es el proceso de añadir datos redundantes a una o más tablas para optimizar el rendimiento de las lecturas, evitando costosos 'joins', comúnmente usado en sistemas NoSQL.",
      },
      {
        prompt:
          "¿Qué es el 'partition pruning' (poda de particiones) en una base de datos particionada?",
        answer:
          "Es una optimización de consultas donde el motor de la base de datos escanea solo las particiones relevantes para la consulta, ignorando las demás y mejorando el rendimiento.",
      },
      {
        prompt:
          "En Java, ¿qué significa que un Virtual Thread se 'pinne' (pinning) a un platform thread?",
        answer:
          "Ocurre cuando un Virtual Thread ejecuta código (como un bloque `synchronized` antiguo o código nativo) que no puede ser desmontado del hilo portador del SO, impidiendo que otros Virtual Threads lo usen.",
      },
    ],
  },
  {
    id: "modern_microservices",
    name: "Modern Microservices",
    cards: [
      {
        prompt:
          "¿Qué patrón arquitectónico propone un componente del lado del servidor para cada aplicación de front-end, mejorando así la experiencia del usuario?",
        answer: "El patrón Back-End for Front-End (BFF).",
      },
      {
        prompt:
          "El patrón Back-End for Front-End (BFF) es una variante del patrón _____ _____.",
        answer: "API Gateway.",
      },
      {
        prompt:
          "¿Cuál es uno de los objetivos principales del patrón BFF en cuanto a la obtención de datos?",
        answer:
          "Evitar la sobrecarga de obtención de datos (over-fetching) y el exceso de solicitudes (over-requesting) en el lado del cliente.",
      },
      {
        prompt:
          "En una arquitectura BFF, el equipo responsable de la interfaz de usuario también debería supervisar el _____.",
        answer: "BFF.",
      },
      {
        prompt:
          "¿Bajo qué circunstancia principal se debe evitar el uso del patrón BFF?",
        answer:
          "Cuando se tiene una única interfaz para comunicarse con los servicios de back-end.",
      },
      {
        prompt: "¿Qué beneficio de seguridad clave ofrece la capa BFF?",
        answer:
          "Puede ocultar información sensible de los servicios de back-end antes de enviar la respuesta a los clientes.",
      },
      {
        prompt:
          "¿Qué protocolo de API puede lograr una latencia hasta 10 veces menor que REST en cargas de trabajo de IA en producción?",
        answer: "gRPC.",
      },
      {
        prompt:
          "¿Para qué escenario es ideal GraphQL, especialmente en aplicaciones de IA?",
        answer:
          "Para la agregación de datos complejos, como en paneles de control de Machine Learning.",
      },
      {
        prompt:
          "¿Por qué REST sigue siendo una opción viable para APIs públicas a gran escala, como las de OpenAI?",
        answer:
          "Por su amplio soporte en el ecosistema y ciclos de desarrollo más rápidos, no por limitaciones del protocolo.",
      },
      {
        prompt:
          "En GraphQL, ¿qué funcionalidad se debe deshabilitar en producción para evitar la exposición de esquemas sensibles?",
        answer: "La introspección.",
      },
      {
        prompt:
          "¿Qué estándar de autenticación es agnóstico al protocolo y se recomienda para REST, GraphQL y gRPC?",
        answer: "OAuth 2.0.",
      },
      {
        prompt:
          "En la arquitectura de RabbitMQ, los _____ reciben mensajes de los productores y los enrutan según reglas y atributos.",
        answer: "Exchanges (Intercambios).",
      },
      {
        prompt:
          "En RabbitMQ, las colas (queues) almacenan mensajes hasta que son consumidos y están conectadas a los exchanges mediante _____.",
        answer: "Bindings (Enlaces).",
      },
      {
        prompt:
          "Entre Kafka y RabbitMQ, ¿cuál ofrece un rendimiento (throughput) significativamente mayor, capaz de manejar millones de mensajes por segundo?",
        answer: "Apache Kafka.",
      },
      {
        prompt:
          "¿En qué condición RabbitMQ puede lograr una latencia de extremo a extremo más baja que Kafka?",
        answer:
          "Únicamente con volúmenes de mensajes (throughput) significativamente más bajos.",
      },
      {
        prompt:
          "¿Qué sistema es más adecuado para el procesamiento y análisis de datos en tiempo real y la agregación de logs a gran escala?",
        answer: "Apache Kafka.",
      },
      {
        prompt:
          "El costo por byte escrito tiende a ser menor en Kafka debido a su diseño eficiente, lo que lo convierte en una opción más _____.",
        answer: "rentable (cost-efficient).",
      },
      {
        prompt:
          "Según el Richardson Maturity Model, el Nivel 3, el más alto de madurez para una API REST, se conoce como _____.",
        answer: "Hypermedia Controls (HATEOAS).",
      },
      {
        prompt:
          "Una API REST en el Nivel 0 del Richardson Maturity Model utiliza HTTP meramente como transporte para llamadas a procedimientos remotos, un estilo conocido como _____.",
        answer: "The Swamp of POX (Plain Old XML/JSON).",
      },
      {
        prompt:
          "¿Qué nivel del Richardson Maturity Model introduce el uso correcto de los verbos HTTP (GET, POST, PUT, DELETE) y los códigos de estado?",
        answer: "Nivel 2: HTTP Verbs.",
      },
      {
        prompt:
          "¿Qué herramienta de código abierto es un estándar de facto para implementar Change Data Capture (CDC) basado en logs de transacciones?",
        answer: "Debezium.",
      },
      {
        prompt:
          "El método más eficiente de Change Data Capture (CDC), que lee directamente los logs de transacciones de la base de datos, se conoce como CDC _____.",
        answer: "basado en logs (log-based).",
      },
      {
        prompt:
          "¿Qué protocolo de mensajería es extremadamente ligero (encabezado de 2 bytes) y está optimizado para dispositivos IoT en redes poco fiables?",
        answer: "MQTT (Message Queuing Telemetry Transport).",
      },
      {
        prompt:
          "Para asegurar la fiabilidad en la recepción de webhooks, ¿qué propiedad debe tener un consumidor para manejar reintentos y mensajes duplicados sin problemas?",
        answer: "Idempotencia.",
      },
      {
        prompt:
          "La práctica recomendada para procesar un webhook es: verificar la firma, _____ el mensaje para procesamiento asíncrono y devolver inmediatamente una respuesta 2xx.",
        answer: "encolar (enqueue).",
      },
      {
        prompt:
          "¿Cuál es uno de los principales desafíos al implementar el patrón BFF?",
        answer:
          "La duplicación de lógica de negocio entre los diferentes BFFs si no se gestiona correctamente.",
      },
      {
        prompt:
          "El tráfico de comunicación que va desde un cliente externo hacia los microservicios internos se denomina tráfico _____.",
        answer: "Norte-Sur (North-South).",
      },
      {
        prompt:
          "El tráfico de comunicación interna entre diferentes microservicios se denomina tráfico _____.",
        answer: "Este-Oeste (East-West).",
      },
      {
        prompt:
          "¿Qué componente de arquitectura gestiona principalmente el tráfico Norte-Sur, actuando como punto de entrada único?",
        answer: "Un API Gateway.",
      },
      {
        prompt:
          "¿Qué componente de arquitectura gestiona principalmente el tráfico Este-Oeste, controlando la comunicación entre servicios?",
        answer: "Una malla de servicios (Service Mesh).",
      },
      {
        prompt:
          "Debido a su naturaleza binaria y al uso de HTTP/2, gRPC consume hasta un 40% menos de CPU y un 30% menos de memoria que _____ para cargas de trabajo equivalentes.",
        answer: "REST.",
      },
      {
        prompt:
          "En Kafka, el orden de los mensajes está garantizado dentro de una única _____, pero no entre ellas.",
        answer: "partición.",
      },
      {
        prompt:
          'El modelo arquitectónico de RabbitMQ se describe como "broker complejo, consumidor simple", mientras que Kafka sigue un modelo de "_____ _____ , _____ _____."',
        answer: "broker simple, consumidor inteligente.",
      },
      {
        prompt:
          "¿Qué componente en un ecosistema de Kafka actúa como un repositorio central para esquemas de mensajes, garantizando la compatibilidad de datos?",
        answer: "El Schema Registry.",
      },
      {
        prompt:
          "El protocolo _____ proporciona un canal de comunicación unidireccional donde el servidor puede empujar actualizaciones al cliente sobre HTTP estándar.",
        answer: "Server-Sent Events (SSE).",
      },
      {
        prompt:
          "A diferencia de SSE, el protocolo _____ establece un canal de comunicación bidireccional y full-dúplex entre cliente y servidor.",
        answer: "WebSocket.",
      },
      {
        prompt:
          "¿Qué desventaja tiene el patrón BFF en términos de esfuerzo de desarrollo y mantenimiento?",
        answer:
          "Incrementa los costos y la complejidad al tener que mantener múltiples backends.",
      },
      {
        prompt:
          "¿Qué patrón de diseño de software se recomienda usar junto con Kafka para definir y desacoplar microservicios basados en dominios de negocio?",
        answer: "Domain-Driven Design (DDD).",
      },
      {
        prompt:
          "En Domain-Driven Design (DDD), un _____ _____ define los límites de un modelo de dominio particular dentro del sistema.",
        answer: "Contexto Delimitado (Bounded Context).",
      },
      {
        prompt:
          "La capa que traduce entre diferentes modelos de dominio en contextos delimitados para prevenir la corrupción de un modelo por otro se llama _____ _____ _____.",
        answer: "Capa Anticorrupción (Anti-Corruption Layer).",
      },
      {
        prompt:
          "Para verificar la autenticidad de un webhook, se debe validar una _____ criptográfica (comúnmente HMAC) incluida en la solicitud.",
        answer: "firma.",
      },
      {
        prompt:
          "Una estrategia de reintento para webhooks fallidos que incrementa el tiempo de espera entre cada intento se conoce como _____ _____.",
        answer: "retroceso exponencial (exponential backoff).",
      },
      {
        prompt:
          "Para protegerse contra ataques de repetición (replay attacks) en webhooks, se debe verificar una _____ y rechazar mensajes que sean demasiado antiguos.",
        answer: "marca de tiempo (timestamp).",
      },
      {
        prompt:
          "Un _____ es un servidor que actúa como un proxy inverso, recibiendo solicitudes de clientes y reenviándolas a los microservicios apropiados.",
        answer: "API Gateway.",
      },
      {
        prompt:
          "¿Verdadero o Falso? Un API Gateway y una Malla de Servicios son mutuamente excluyentes y no pueden coexistir en la misma arquitectura.",
        answer:
          "Falso, pueden coexistir; el API Gateway maneja el tráfico externo y la Malla de Servicios el interno.",
      },
      {
        prompt: "Término: Serialización en gRPC.",
        answer:
          "Definición: Es el proceso de convertir datos estructurados a un formato binario eficiente utilizando Protocol Buffers (protobuf) para la transmisión.",
      },
      {
        prompt:
          "El uso de _____ _____ en Kafka Connect permite realizar transformaciones ligeras de datos directamente en el pipeline sin necesidad de un procesador de streams externo.",
        answer: "Single Message Transforms (SMTs).",
      },
      {
        prompt:
          "En un Schema Registry, el nivel de compatibilidad _____ permite que los consumidores nuevos puedan leer datos escritos con esquemas antiguos.",
        answer: "BACKWARD.",
      },
      {
        prompt:
          "En un Schema Registry, el nivel de compatibilidad _____ permite que los consumidores antiguos puedan leer datos escritos con esquemas nuevos.",
        answer: "FORWARD.",
      },
      {
        prompt:
          "La práctica de capturar y poner en cola eventos de webhook que fallan repetidamente en una _____ _____ _____ (DLQ) permite su análisis y reprocesamiento posterior.",
        answer: "cola de mensajes fallidos (dead-letter queue).",
      },
      {
        prompt:
          "A diferencia de REST, que utiliza HTTP/1.1, gRPC aprovecha _____ para obtener un mayor rendimiento a través de características como el multiplexado de flujos.",
        answer: "HTTP/2.",
      },
      {
        prompt:
          "¿Qué limitación de REST soluciona GraphQL al permitir que el cliente solicite exactamente los campos de datos que necesita?",
        answer:
          "El sobre-abastecimiento (over-fetching) y el sub-abastecimiento (under-fetching) de datos.",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de Kafka sobre los sistemas de mensajería tradicionales en términos de datos históricos?",
        answer:
          "La capacidad de almacenar flujos de eventos de forma duradera y permitir que los consumidores los reprocesen desde cualquier punto en el tiempo.",
      },
      {
        prompt: "En el patrón BFF, ¿qué son los DTO (Data Transfer Objects)?",
        answer:
          "Son clases utilizadas para transferir datos entre las capas de la aplicación, adaptando la información de los microservicios al formato que necesita el cliente específico.",
      },
      {
        prompt:
          "Una de las principales ventajas de una Malla de Servicios (Service Mesh) es la _____ integrada, que proporciona métricas, registros y trazas de forma nativa.",
        answer: "observabilidad.",
      },
      {
        prompt:
          "¿Qué mecanismo de seguridad, a menudo gestionado por una Malla de Servicios, garantiza que toda la comunicación entre servicios esté cifrada?",
        answer: "mTLS (mutual TLS).",
      },
      {
        prompt:
          "El patrón en el que un servicio publica un evento sin saber quién lo consumirá, permitiendo una comunicación asíncrona y desacoplada, se conoce como _____.",
        answer: "Publicación/Suscripción (Publish/Subscribe).",
      },
      {
        prompt:
          "¿Por qué el CDC (Change Data Capture) basado en logs tiene un impacto mínimo en la base de datos de producción en comparación con el basado en consultas?",
        answer:
          "Porque lee el log de transacciones de forma pasiva en lugar de ejecutar consultas adicionales contra las tablas de datos.",
      },
      {
        prompt:
          'En el contexto de webhooks, ¿qué significa la recomendación "Acknowledge Fast, Process Async"?',
        answer:
          "Significa responder inmediatamente con un código de éxito (2xx) y realizar el procesamiento real de los datos en un trabajo de fondo (asíncrono).",
      },
      {
        prompt:
          "¿Cuál es la función principal de un broker en protocolos como MQTT o RabbitMQ?",
        answer:
          "Actúa como un intermediario que recibe mensajes de los publicadores y los distribuye a los suscriptores interesados.",
      },
      {
        prompt:
          "El protocolo AMQP, implementado por RabbitMQ, define la semántica de los servicios del lado del servidor y un _____ _____ _____ común para la comunicación.",
        answer: "protocolo a nivel de cable (wire-level protocol).",
      },
      {
        prompt:
          "Kafka fue diseñado para ser un sistema de _____ _____ distribuido, no solo una cola de mensajes tradicional.",
        answer: "registro de transacciones (commit log).",
      },
      {
        prompt:
          "¿Qué ventaja ofrece Kafka para la resiliencia de los consumidores?",
        answer:
          "Si un consumidor falla, puede reanudar el procesamiento desde el último offset confirmado sin perder datos.",
      },
      {
        prompt:
          "En el desarrollo de microservicios, la práctica de empaquetar y desplegar cada servicio de forma independiente se ve facilitada por tecnologías como _____.",
        answer: "Contenedores (ej. Docker).",
      },
      {
        prompt:
          "En una arquitectura de microservicios, ¿por qué es crucial la descentralización de la gestión de datos?",
        answer:
          "Para asegurar que cada microservicio sea autónomo y pueda evolucionar independientemente, gestionando su propia base de datos.",
      },
      {
        prompt:
          "¿Qué principio de REST dicta que cada solicitud del cliente debe contener toda la información necesaria para ser procesada, sin que el servidor almacene estado del cliente?",
        answer: "Stateless (Sin estado).",
      },
      {
        prompt:
          "En una API RESTful, el principio de _____ _____ permite que las respuestas del servidor sean almacenadas en caché por el cliente para mejorar el rendimiento.",
        answer: "Cacheable.",
      },
      {
        prompt:
          "¿Qué componente de una Malla de Servicios se despliega junto a cada instancia de microservicio para interceptar todo el tráfico de red?",
        answer: "Un proxy sidecar (como Envoy).",
      },
      {
        prompt:
          "La parte de la Malla de Servicios que gestiona y configura los proxies sidecar se conoce como el _____ _____.",
        answer: "Plano de Control (Control Plane).",
      },
      {
        prompt:
          '¿Qué es la "semántica de entrega exactamente una vez" (exactly-once semantics) en Kafka Connect?',
        answer:
          "Es una garantía de que cada registro se procesa y se escribe en el sistema de destino exactamente una vez, incluso en caso de fallos.",
      },
      {
        prompt:
          "En Kafka Connect, un _____ _____ se utiliza para capturar registros problemáticos que no se pueden procesar, evitando que el pipeline se detenga.",
        answer: "Dead-Letter Queue (DLQ).",
      },
      {
        prompt:
          "En el contexto de las bases de datos, ¿qué operaciones captura un sistema de CDC?",
        answer:
          "Captura las operaciones de inserción (INSERT), actualización (UPDATE) y eliminación (DELETE) a nivel de fila.",
      },
      {
        prompt:
          "¿Cuál es una de las principales ventajas de usar gRPC para la comunicación interna entre microservicios?",
        answer:
          "Su alto rendimiento, baja latencia y el uso de contratos de API fuertemente tipados a través de Protocol Buffers.",
      },
      {
        prompt:
          "En el patrón BFF, ¿por qué es beneficioso que el BFF y la UI sean mantenidos por el mismo equipo?",
        answer:
          "Facilita la adaptación de la API a los requisitos de la UI y simplifica la coordinación de los despliegues.",
      },
      {
        prompt:
          "Un _____ _____ puede actuar como un agregador de solicitudes, reduciendo la cantidad de llamadas de red que un cliente debe hacer a múltiples microservicios.",
        answer: "API Gateway o un BFF.",
      },
      {
        prompt:
          "¿Qué significa que Kafka proporciona persistencia de mensajes?",
        answer:
          "Que los mensajes se almacenan en disco de forma duradera y no se eliminan después de ser consumidos, a menos que se configure una política de retención.",
      },
      {
        prompt:
          "En RabbitMQ, un exchange de tipo _____ envía una copia del mensaje a todas las colas que están enlazadas a él.",
        answer: "fanout.",
      },
      {
        prompt:
          "En RabbitMQ, un exchange de tipo _____ enruta mensajes a colas basándose en una coincidencia exacta de la clave de enrutamiento (routing key).",
        answer: "direct.",
      },
      {
        prompt:
          "En RabbitMQ, un exchange de tipo _____ enruta mensajes a colas basándose en la coincidencia de patrones en la clave de enrutamiento.",
        answer: "topic.",
      },
      {
        prompt:
          "¿Cuál es un inconveniente del CDC basado en triggers en comparación con el basado en logs?",
        answer:
          "Añade una carga adicional a la base de datos de producción y puede complicar las modificaciones del esquema.",
      },
      {
        prompt:
          "El atributo _____ en un DTO de .NET con System.Text.Json se puede usar para evitar que una propiedad se serialice y se envíe al cliente.",
        answer: "[JsonIgnore].",
      },
      {
        prompt:
          "Un beneficio clave del patrón BFF es la mejora de la _____ y la _____ del equipo de desarrollo del cliente.",
        answer: "autonomía y agilidad.",
      },
      {
        prompt:
          "La principal diferencia funcional entre SSE y WebSockets es que SSE es _____, mientras que WebSockets es _____.",
        answer: "unidireccional, bidireccional.",
      },
      {
        prompt: "Término: Richardson Maturity Model - Nivel 1.",
        answer:
          "Definición: Introduce el concepto de recursos, donde se utilizan URIs individuales para diferentes entidades (ej. /users, /products).",
      },
      {
        prompt:
          "¿Qué es la limitación de tasa (rate limiting) en el contexto de una API?",
        answer:
          "Es una estrategia para controlar la cantidad de solicitudes que un cliente puede hacer a una API en un período de tiempo determinado.",
      },
      {
        prompt:
          "La capacidad de Kafka para _____ _____ es crucial para casos de uso como la reconstrucción de estado o la corrección de errores en consumidores.",
        answer: "reproducir mensajes (message replay).",
      },
      {
        prompt:
          "Una Malla de Servicios puede implementar automáticamente características de resiliencia como reintentos, timeouts y _____ _____.",
        answer: "interruptores de circuito (circuit breakers).",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja de la comunicación directa cliente-a-microservicio en una arquitectura grande?",
        answer:
          "El cliente se acopla fuertemente a los endpoints internos, lo que dificulta la evolución de los microservicios.",
      },
      {
        prompt:
          "El patrón BFF ayuda a optimizar el rendimiento para clientes con restricciones, como aplicaciones móviles, al proporcionar _____ más ligeros y específicos.",
        answer: "payloads (cargas útiles).",
      },
      {
        prompt:
          "En la comunicación asíncrona, ¿qué papel juega una cola de mensajes en el desacoplamiento de servicios?",
        answer:
          "Permite que el productor envíe un mensaje sin esperar a que el consumidor esté disponible para procesarlo, eliminando la dependencia temporal.",
      },
      {
        prompt:
          '¿Por qué el factor "experiencia del equipo" es a menudo decisivo al elegir un protocolo de API como REST, gRPC o GraphQL?',
        answer:
          "Porque un equipo puede ser más productivo con una tecnología que conoce bien, incluso si otra es teóricamente de mayor rendimiento.",
      },
      {
        prompt: "Término: gRPC Streaming.",
        answer:
          "Definición: Una característica de gRPC que permite la transmisión continua de datos en una o ambas direcciones (cliente-servidor) sobre una única conexión HTTP/2.",
      },
      {
        prompt:
          "Una API REST madura (Nivel 3) proporciona enlaces en sus respuestas que guían al cliente sobre las siguientes acciones posibles. Esto se conoce como _____.",
        answer: "HATEOAS (Hypermedia as the Engine of Application State).",
      },
      {
        prompt:
          "Para la comunicación interna de alto rendimiento entre servicios en un entorno políglota, _____ es a menudo la opción recomendada.",
        answer: "gRPC.",
      },
      {
        prompt:
          "Para una API pública que necesita máxima compatibilidad y facilidad de uso para desarrolladores de terceros, _____ es a menudo la opción recomendada.",
        answer: "REST.",
      },
      {
        prompt:
          "En el patrón BFF, cada BFF está estrechamente _____ a una experiencia de usuario particular.",
        answer: "vinculado (entangled/connected).",
      },
      {
        prompt:
          "Una de las ventajas del patrón BFF es que el BFF y la UI representan una única _____ de despliegue.",
        answer: "unidad.",
      },
      {
        prompt:
          "En gRPC, los _____ _____ se utilizan para definir la estructura de los mensajes y los servicios de forma independiente del lenguaje.",
        answer: "Protocol Buffers (protobuf).",
      },
      {
        prompt:
          "El proceso de validar una firma HMAC en un webhook implica recalcular el hash del cuerpo de la solicitud usando un _____ _____ y compararlo con el valor de la cabecera.",
        answer: "secreto compartido (shared secret).",
      },
      {
        prompt:
          "¿Qué herramienta de Kafka Connect permite la integración de bases de datos relacionales capturando cambios en tiempo real?",
        answer: "Conectores de CDC como Debezium.",
      },
      {
        prompt:
          "El principio de _____ de _____ en el diseño de microservicios aboga por desacoplar las aplicaciones de front-end y back-end.",
        answer: "separación de intereses (separation of concerns).",
      },
      {
        prompt:
          "En el contexto de Kafka, ¿qué son los Conectores (Connectors)?",
        answer:
          "Son componentes listos para usar que ayudan a mover datos de forma fiable entre Kafka y otros sistemas como bases de datos o almacenes de objetos.",
      },
      {
        prompt:
          "La biblioteca _____ en Kafka permite construir aplicaciones y microservicios de procesamiento de flujos en tiempo real.",
        answer: "Kafka Streams.",
      },
      {
        prompt:
          "Para evitar la duplicación de código en el patrón BFF, una buena práctica es extraer la lógica común a _____ compartidas.",
        answer: "librerías.",
      },
      {
        prompt:
          "Un desafío del patrón BFF es la gestión de la _____ y la _____ de múltiples backends.",
        answer: "escalabilidad y el rendimiento.",
      },
      {
        prompt:
          'El protocolo WebSocket inicia su comunicación con un "apretón de manos" (handshake) que actualiza una conexión _____ a una conexión WebSocket.',
        answer: "HTTP.",
      },
      {
        prompt:
          "La _____ de esquemas en Kafka Connect es crucial para mantener la consistencia y compatibilidad de los datos a medida que los formatos evolucionan.",
        answer: "evolución.",
      },
      {
        prompt: "Término: Kafka Topic.",
        answer:
          "Definición: Una categoría o nombre de feed al que se publican los registros (mensajes) en Kafka.",
      },
      {
        prompt:
          "En Kafka, los consumidores leen de los topics en grupos. Cada partición de un topic es asignada a exactamente un consumidor dentro de un _____ _____.",
        answer: "grupo de consumidores (consumer group).",
      },
      {
        prompt:
          "¿Cuál es la principal función de un balanceador de carga (Load Balancer) en una arquitectura de microservicios?",
        answer:
          "Distribuir el tráfico de red entrante de manera uniforme entre múltiples instancias de un servicio para mejorar la fiabilidad y escalabilidad.",
      },
      {
        prompt:
          "La práctica de implementar cambios en una nueva versión de un servicio a un pequeño subconjunto de usuarios antes de un despliegue completo se llama _____ _____.",
        answer: "despliegue canario (canary release).",
      },
      {
        prompt:
          '¿Qué es un "descubrimiento de servicios" (service discovery) en un entorno de microservicios?',
        answer:
          "Es el proceso mediante el cual los servicios se localizan y se comunican entre sí dinámicamente sin necesidad de direcciones IP codificadas.",
      },
      {
        prompt:
          "El patrón de _____ _____ consiste en tener una base de datos por servicio, lo que refuerza la autonomía y el desacoplamiento.",
        answer: "base de datos por servicio (database per service).",
      },
      {
        prompt:
          "En REST, ¿qué verbo HTTP es idempotente y se utiliza para crear o reemplazar un recurso en una URI conocida?",
        answer: "PUT.",
      },
      {
        prompt:
          "En REST, ¿qué verbo HTTP se utiliza para aplicar modificaciones parciales a un recurso?",
        answer: "PATCH.",
      },
      {
        prompt:
          "En REST, el verbo HTTP _____ se utiliza para enviar datos a un recurso para su procesamiento, como la creación de una nueva entidad.",
        answer: "POST.",
      },
      {
        prompt: "Término: Idempotencia en HTTP.",
        answer:
          "Definición: Una operación es idempotente si realizarla múltiples veces produce el mismo resultado que realizarla una sola vez (ej. GET, PUT, DELETE).",
      },
      {
        prompt:
          "¿Por qué es importante el versionado de APIs en una arquitectura de microservicios?",
        answer:
          "Para permitir que las APIs evolucionen sin romper la compatibilidad con los clientes que dependen de versiones anteriores.",
      },
      {
        prompt: 'En el contexto de Kafka, ¿qué es un "offset"?',
        answer:
          "Es un identificador único y secuencial que Kafka asigna a cada registro dentro de una partición, indicando su posición.",
      },
      {
        prompt:
          "La replicación en Kafka asegura la _____ _____ y la _____ de los datos al mantener copias de las particiones en múltiples brokers.",
        answer: "tolerancia a fallos y la durabilidad.",
      },
      {
        prompt:
          "En Domain-Driven Design (DDD), el _____ _____ es el lenguaje compartido entre los desarrolladores y los expertos del dominio para describir el negocio.",
        answer: "lenguaje ubicuo (ubiquitous language).",
      },
      {
        prompt:
          "El patrón BFF permite a cada equipo de front-end _____ de forma independiente, ya que controlan su propio servicio de back-end.",
        answer: "evolucionar o iterar.",
      },
      {
        prompt:
          "La comunicación entre un BFF y los microservicios aguas abajo (downstream) es un ejemplo de tráfico _____.",
        answer: "Este-Oeste (East-West).",
      },
      {
        prompt:
          "Un beneficio de la Malla de Servicios es la aplicación de políticas de seguridad y comunicación de forma _____ sin modificar el código del microservicio.",
        answer: "transparente.",
      },
      {
        prompt:
          "La principal desventaja del protocolo WebSocket es su _____ en comparación con HTTP, ya que no se beneficia de la infraestructura web estándar como cachés.",
        answer: "complejidad.",
      },
      {
        prompt:
          "¿Qué tecnología es más adecuada para un panel de control que necesita agregar datos de múltiples modelos de IA y ofrecer actualizaciones en tiempo real a través de suscripciones?",
        answer: "GraphQL.",
      },
      {
        prompt:
          "Para asegurar que un consumidor de webhook no procese un evento dos veces, este debe almacenar el _____ _____ de cada evento recibido.",
        answer: "ID de entrega (delivery ID).",
      },
      {
        prompt:
          '¿Qué es el "Principio de Responsabilidad Única" (Single Responsibility Principle) y cómo se aplica a los microservicios?',
        answer:
          "Establece que un componente debe tener una única razón para cambiar; en microservicios, significa que cada servicio debe enfocarse en una capacidad de negocio específica.",
      },
      {
        prompt:
          "El uso de _____ _____ en una API GraphQL permite a los clientes descubrir el esquema disponible, lo cual debe ser desactivado en entornos de producción por seguridad.",
        answer: "introspección de esquema (schema introspection).",
      },
      {
        prompt:
          "La principal ventaja de Kafka en términos de escalabilidad es su capacidad para escalar horizontalmente añadiendo más _____ al clúster.",
        answer: "brokers.",
      },
      {
        prompt: "Término: Kafka Consumer Lag.",
        answer:
          "Definición: Es la diferencia entre el último offset producido en una partición y el último offset consumido por un grupo de consumidores.",
      },
      {
        prompt:
          "En el contexto de la seguridad de API, _____ _____ 2.0 es el estándar de la industria para la delegación de autorización.",
        answer: "OAuth.",
      },
      {
        prompt:
          "El patrón _____ _____ utiliza un servicio dedicado para la autenticación y autorización, emitiendo tokens que los microservicios pueden validar.",
        answer: "Token de Seguridad (Security Token).",
      },
      {
        prompt:
          "A diferencia de REST, GraphQL expone un único _____ para todas las consultas y mutaciones.",
        answer: "endpoint.",
      },
      {
        prompt:
          "En GraphQL, las operaciones que modifican datos del lado del servidor se llaman _____.",
        answer: "mutaciones (mutations).",
      },
      {
        prompt:
          "En GraphQL, las operaciones que leen o recuperan datos se llaman _____.",
        answer: "consultas (queries).",
      },
      {
        prompt:
          "La comunicación en gRPC es _____ por defecto, lo que significa que el cliente espera una respuesta del servidor antes de continuar.",
        answer: "síncrona (request-response).",
      },
      {
        prompt:
          "En Kafka, una política de _____ define cuánto tiempo se conservan los mensajes en un topic antes de ser eliminados.",
        answer: "retención (retention policy).",
      },
      {
        prompt:
          "El desacoplamiento que ofrece el patrón BFF permite que los equipos de front-end y back-end trabajen en _____, mejorando la velocidad de desarrollo.",
        answer: "paralelo.",
      },
      {
        prompt:
          "Cuando una API Gateway realiza la terminación SSL, se encarga del cifrado y descifrado _____, liberando a los microservicios de esa tarea.",
        answer: "TLS/SSL.",
      },
      {
        prompt:
          "El patrón de _____ _____ centraliza la lógica de enrutamiento, composición y traducción de protocolos en un único punto de entrada.",
        answer: "API Gateway.",
      },
      {
        prompt:
          "La capacidad de una API de ser auto-descriptiva, donde las respuestas contienen enlaces a acciones relacionadas, es el núcleo del principio _____.",
        answer: "HATEOAS.",
      },
      {
        prompt:
          "El uso de _____ _____ en Kafka Connect permite la validación automática de esquemas y la gestión de la evolución del esquema.",
        answer: "Schema Registry.",
      },
      {
        prompt:
          "En el patrón de saga, una _____ _____ se utiliza para revertir las operaciones de una transacción distribuida que ha fallado.",
        answer: "transacción de compensación (compensating transaction).",
      },
      {
        prompt:
          "¿Cuál es un caso de uso común para Apache Kafka en el diseño de sistemas?",
        answer:
          "Actuar como un bus de eventos central para la comunicación asíncrona entre microservicios.",
      },
      {
        prompt:
          "Una de las desventajas del patrón BFF es que puede convertirse en un _____ _____ _____ si no se diseña e implementa correctamente.",
        answer: "cuello de botella (bottleneck).",
      },
      {
        prompt:
          "Para la comunicación en tiempo real en una aplicación de chat, _____ sería una opción de protocolo más adecuada que SSE.",
        answer: "WebSockets.",
      },
      {
        prompt:
          "Para notificaciones de noticias en vivo o un feed de redes sociales, el protocolo _____ es una opción eficiente y simple para empujar datos del servidor al cliente.",
        answer: "Server-Sent Events (SSE).",
      },
      {
        prompt:
          "El patrón API Gateway puede simplificar la arquitectura para los clientes, pero puede convertirse en un _____ si no se gestiona bien.",
        answer: "monolito.",
      },
      {
        prompt: "Término: Contrato de API.",
        answer:
          "Definición: Una especificación formal (como OpenAPI o un archivo .proto) que define cómo los clientes deben interactuar con una API, incluyendo endpoints, métodos y estructuras de datos.",
      },
      {
        prompt:
          "¿Cuál es una ventaja de usar un formato de serialización binario como Protocol Buffers sobre JSON?",
        answer:
          "Es más compacto y rápido de analizar, lo que resulta en un menor uso de ancho de banda y menor latencia.",
      },
      {
        prompt:
          "En una arquitectura de microservicios, el patrón _____ _____ se utiliza para agregar los resultados de múltiples llamadas a servicios en una única respuesta.",
        answer: "Agregación de Servicios (Service Aggregation).",
      },
      {
        prompt:
          "El uso de la replicación de colas en RabbitMQ, conocida como _____ _____, proporciona alta disponibilidad para los mensajes.",
        answer: "colas espejadas (mirrored queues).",
      },
      {
        prompt:
          "Kafka Connect, Kafka Streams y ksqlDB son componentes del _____ _____ de Kafka.",
        answer: "ecosistema de procesamiento de flujos (stream processing).",
      },
      {
        prompt:
          "En Domain-Driven Design, el uso de eventos para comunicar cambios entre contextos delimitados promueve un _____ acoplamiento.",
        answer: "bajo.",
      },
      {
        prompt:
          "Una de las principales responsabilidades de un API Gateway es la _____ de solicitudes, que implica verificar la identidad del cliente.",
        answer: "autenticación.",
      },
      {
        prompt:
          "Una Malla de Servicios facilita la implementación de pruebas _____ al permitir el enrutamiento de tráfico basado en porcentajes a diferentes versiones de un servicio.",
        answer: "A/B.",
      },
      {
        prompt:
          "El propósito del patrón BFF es _____ las aplicaciones de front-end de los servicios de back-end.",
        answer: "desacoplar.",
      },
      {
        prompt:
          "¿Qué ventaja tiene el patrón BFF para los equipos que trabajan en diferentes partes de una aplicación?",
        answer:
          "Permite la responsabilidad compartida del equipo, ya que los equipos de front-end y back-end pueden trabajar de forma más aislada.",
      },
    ],
  },
  {
    id: "observabilidad",
    name: "Observabilidad",
    cards: [
      {
        prompt:
          "¿Cuál es la diferencia fundamental entre monitorización y observabilidad?",
        answer:
          "La monitorización es reactiva y busca problemas conocidos en un sistema, mientras que la observabilidad es proactiva y permite hacer preguntas arbitrarias sobre el comportamiento del sistema para descubrir problemas desconocidos.",
      },
      {
        prompt:
          "Los tres pilares de la observabilidad son las métricas, los logs y _____.",
        answer: "las trazas (traces).",
      },
      {
        prompt:
          "¿Qué tipo de pregunta responde principalmente el pilar de 'métricas' en la observabilidad?",
        answer:
          "Responde a la pregunta de 'qué' está mal, indicando síntomas a través de datos numéricos agregados a lo largo del tiempo.",
      },
      {
        prompt:
          "¿Qué tipo de pregunta responde principalmente el pilar de 'logs' en la observabilidad?",
        answer:
          "Responde a la pregunta de 'por qué' ocurrió un evento, proporcionando un registro detallado y con marca de tiempo de eventos discretos.",
      },
      {
        prompt:
          "¿Qué tipo de pregunta responde principalmente el pilar de 'trazas' (traces) en la observabilidad?",
        answer:
          "Responde a la pregunta de 'dónde' ocurrió un problema, mostrando el flujo de una solicitud a través de múltiples servicios en un sistema distribuido.",
      },
      {
        prompt: "Término: Perfilado Continuo (Continuous Profiling)",
        answer:
          "Es una técnica de observabilidad que recopila continuamente datos a nivel de código sobre el consumo de recursos (CPU, memoria) para identificar cuellos de botella en el rendimiento de la aplicación.",
      },
      {
        prompt: "¿Qué es un SLI (Service Level Indicator)?",
        answer:
          "Es una medida cuantitativa de algún aspecto del nivel de servicio proporcionado, como la latencia de solicitud o la tasa de errores.",
      },
      {
        prompt: "¿Qué es un SLO (Service Level Objective)?",
        answer:
          "Es un objetivo para el valor de un SLI a lo largo del tiempo, que define el umbral de fiabilidad deseado para un servicio.",
      },
      {
        prompt: "¿Qué es un SLA (Service Level Agreement)?",
        answer:
          "Es un contrato con los usuarios que incluye consecuencias explícitas (generalmente financieras) si no se cumplen los SLOs.",
      },
      {
        prompt:
          "El presupuesto de error (error budget) se deriva directamente del _____.",
        answer: "SLO (Service Level Objective).",
      },
      {
        prompt:
          "Las cuatro 'Señales Doradas' (Golden Signals) de la monitorización de SRE de Google son Latencia, Tráfico, Errores y _____.",
        answer: "Saturación.",
      },
      {
        prompt:
          "En el contexto de las 'Señales Doradas', ¿a qué se refiere la 'Latencia'?",
        answer: "Al tiempo que tarda un servicio en responder a una solicitud.",
      },
      {
        prompt:
          "En el contexto de las 'Señales Doradas', ¿a qué se refiere el 'Tráfico'?",
        answer:
          "A la cantidad de demanda que se ejerce sobre el sistema, medida comúnmente en solicitudes por segundo.",
      },
      {
        prompt:
          "En el contexto de las 'Señales Doradas', ¿a qué se refiere la 'Saturación'?",
        answer:
          "Mide cuán 'lleno' está un servicio, indicando la utilización de sus recursos más limitados (CPU, memoria, etc.).",
      },
      {
        prompt:
          "El método de monitorización RED, utilizado para servicios, se compone de Tasa (Rate), Errores (Errors) y _____.",
        answer: "Duración (Duration).",
      },
      {
        prompt: "Término: Alta Cardinalidad",
        answer:
          "Se refiere a la propiedad de los datos donde una columna o atributo (como un ID de usuario o un ID de solicitud) tiene un gran número de valores únicos, lo que puede aumentar los costos de almacenamiento y la latencia de las consultas.",
      },
      {
        prompt:
          "¿Cuál es uno de los principales impulsores del aumento de la cardinalidad en las arquitecturas nativas de la nube?",
        answer:
          "El uso de microservicios y contenedores, donde cada instancia efímera (pod, contenedor) genera series temporales únicas.",
      },
      {
        prompt: "En el trazado distribuido, ¿qué es un 'span'?",
        answer:
          "Un 'span' representa una única operación o unidad de trabajo dentro de una traza, con un nombre, una hora de inicio y una de finalización.",
      },
      {
        prompt: "En el trazado distribuido, ¿qué es una 'traza' (trace)?",
        answer:
          "Una 'traza' es la visualización del recorrido completo de una solicitud a medida que pasa a través de los diferentes servicios de un sistema distribuido, compuesta por uno o más spans.",
      },
      {
        prompt: "Término: Propagación de contexto (Context Propagation)",
        answer:
          "Es el mecanismo por el cual los identificadores de traza y span se pasan de un servicio a otro (generalmente a través de encabezados HTTP) para mantener la continuidad de una traza distribuida.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia entre el muestreo basado en la cabecera (head-based) y el muestreo basado en la cola (tail-based)?",
        answer:
          "El muestreo 'head-based' toma la decisión de muestrear al inicio de la traza, mientras que el 'tail-based' espera a que la traza se complete para tomar una decisión más informada.",
      },
      {
        prompt:
          "¿Cuál es una ventaja clave del muestreo basado en la cola (tail-based)?",
        answer:
          "Permite capturar de manera fiable trazas 'interesantes', como aquellas con errores o alta latencia, ya que la decisión se toma con la información completa de la traza.",
      },
      {
        prompt:
          "¿Cuál es un desafío principal del muestreo basado en la cola (tail-based)?",
        answer:
          "Requiere infraestructura adicional para almacenar temporalmente todos los spans de una traza antes de tomar la decisión de muestreo, lo que aumenta la complejidad y el costo.",
      },
      {
        prompt: "¿Qué es OpenTelemetry (OTel)?",
        answer:
          "Es un estándar y un conjunto de herramientas de código abierto para la instrumentación, generación, recolección y exportación de datos de telemetría (métricas, logs y trazas).",
      },
      {
        prompt:
          "OpenTelemetry proporciona un backend de observabilidad completo. ¿Verdadero o Falso y por qué?",
        answer:
          "Falso. OpenTelemetry es un estándar y una especificación para la recolección de datos, pero no proporciona un backend para almacenar o visualizar esos datos; debe integrarse con uno.",
      },
      {
        prompt:
          "El pipeline de un Colector de OpenTelemetry se compone de tres tipos de componentes: receptores (receivers), procesadores (processors) y _____.",
        answer: "exportadores (exporters).",
      },
      {
        prompt:
          "¿Cuál es la función de un 'receptor' (receiver) en el Colector de OpenTelemetry?",
        answer:
          "Es el punto de entrada de los datos de telemetría al colector, escuchando datos en formatos como OTLP, Jaeger o Prometheus.",
      },
      {
        prompt:
          "¿Cuál es la función de un 'procesador' (processor) en el Colector de OpenTelemetry?",
        answer:
          "Modifica los datos de telemetría antes de la exportación, realizando tareas como el procesamiento por lotes (batching), filtrado, muestreo o adición de atributos.",
      },
      {
        prompt:
          "¿Cuál es la función de un 'exportador' (exporter) en el Colector de OpenTelemetry?",
        answer:
          "Envía los datos de telemetría a uno o más backends o destinos, como Grafana Tempo, Datadog o un endpoint OTLP genérico.",
      },
      {
        prompt:
          "En un despliegue a gran escala con OpenTelemetry, ¿cuál es el propósito del patrón 'agente-gateway'?",
        answer:
          "El 'agente' (un colector ligero local) recopila telemetría de la aplicación, y el 'gateway' (un colector centralizado) se encarga del procesamiento pesado como el muestreo de cola y el enrutamiento a múltiples backends.",
      },
      {
        prompt: "Término: eBPF (extended Berkeley Packet Filter)",
        answer:
          "Es una tecnología del kernel de Linux que permite ejecutar programas en un entorno aislado dentro del kernel, utilizada para redes, seguridad y observabilidad de bajo overhead sin modificar el código de la aplicación.",
      },
      {
        prompt:
          "¿Qué componente del stack de Grafana se utiliza principalmente para la ingesta y consulta de logs?",
        answer: "Grafana Loki.",
      },
      {
        prompt:
          "¿Qué componente del stack de Grafana se utiliza principalmente para el almacenamiento y consulta de trazas distribuidas?",
        answer: "Grafana Tempo.",
      },
      {
        prompt:
          "¿Qué componente del stack de Grafana se utiliza como backend de métricas escalable y compatible con Prometheus?",
        answer: "Grafana Mimir.",
      },
      {
        prompt:
          "¿Qué componente del stack de Grafana se utiliza para el perfilado continuo?",
        answer: "Grafana Pyroscope.",
      },
      {
        prompt:
          "¿Cuál es la principal estrategia de Grafana Tempo para reducir los costos de almacenamiento de trazas?",
        answer:
          "Evita la indexación pesada de spans y depende de la correlación con logs y métricas (a través de Trace IDs) para encontrar trazas.",
      },
      {
        prompt:
          "El lenguaje de consulta utilizado por Grafana Loki para buscar en los logs se llama _____.",
        answer: "LogQL.",
      },
      {
        prompt: "¿Qué es Grafana Alloy?",
        answer:
          "Es una distribución del Colector de OpenTelemetry mantenida por Grafana, diseñada para ser un agente de telemetría flexible.",
      },
      {
        prompt:
          "Prometheus utiliza un modelo de recolección de métricas basado en _____ (pull) en lugar de _____ (push).",
        answer: "extracción (pull), empuje (push).",
      },
      {
        prompt:
          "El lenguaje de consulta utilizado por Prometheus para consultar métricas de series temporales se llama _____.",
        answer: "PromQL (Prometheus Query Language).",
      },
      {
        prompt:
          "¿Por qué Prometheus por sí solo no se considera una solución completa de observabilidad?",
        answer:
          "Porque se enfoca exclusivamente en métricas y requiere sistemas separados para logs (como Loki) y trazas (como Jaeger o Tempo).",
      },
      {
        prompt:
          "En Kubernetes, la herramienta _____ se utiliza para generar métricas sobre el estado de varios objetos como deployments, pods y servicios.",
        answer: "kube-state-metrics.",
      },
      {
        prompt:
          "Según un informe de New Relic, ¿cuál fue el principal desafío citado por las organizaciones de servicios financieros para lograr la observabilidad de pila completa?",
        answer:
          "Demasiadas herramientas de monitorización y datos aislados (siloed data).",
      },
      {
        prompt: "Término: Tasa de consumo (Burn Rate)",
        answer:
          "Es una métrica utilizada en las alertas de SLO que mide la velocidad a la que se consume el presupuesto de error en relación con el período del SLO.",
      },
      {
        prompt:
          "¿Por qué alertar sobre la tasa de consumo (burn rate) es a menudo más efectivo que alertar sobre un umbral de error simple?",
        answer:
          "Porque puede detectar problemas significativos más rápidamente y con mayor precisión, incluso si son breves, al contextualizar el gasto del presupuesto de error en un período de tiempo.",
      },
      {
        prompt: "Término: Métricas P99 (percentil 99)",
        answer:
          "Representa el valor de latencia por debajo del cual se encuentra el 99% de las solicitudes, destacando la experiencia del peor caso para la mayoría de los usuarios y exponiendo los valores atípicos de la cola larga.",
      },
      {
        prompt:
          "¿Qué problema común en los entornos de ejecución con recolección de basura (como Java) puede causar picos en la latencia P99?",
        answer:
          "Las pausas periódicas del recolector de basura (garbage collection), que detienen la ejecución normal de la aplicación para liberar memoria.",
      },
      {
        prompt: "Término: Observability-Driven Development (ODD)",
        answer:
          "Es un enfoque de desarrollo de software que integra la instrumentación y la observabilidad en las primeras etapas del ciclo de vida, utilizando pruebas basadas en trazas.",
      },
      {
        prompt: "¿Cómo se relaciona ODD con TDD (Test-Driven Development)?",
        answer:
          "Mientras que TDD se centra en la corrección funcional (el código hace lo que se supone que debe hacer), ODD se enfoca en el comportamiento observable (se puede verificar cómo lo hace en producción).",
      },
      {
        prompt: "Técnica: Filtrado de Atributos (Attribute Filtering)",
        answer:
          "Una técnica de control de costos en el Colector de OpenTelemetry que elimina atributos innecesarios de logs, métricas y spans para reducir el tamaño de la carga útil (payload).",
      },
      {
        prompt:
          "¿Cómo se puede utilizar el Colector de OpenTelemetry para evitar que datos sensibles (PII) lleguen a los backends de observabilidad?",
        answer:
          "Usando el procesador de atributos (`attributes processor`) para eliminar, enmascarar o aplicar un hash a los campos que contienen datos sensibles antes de exportarlos.",
      },
      {
        prompt: "¿Qué es ClickHouse en el contexto de la observabilidad?",
        answer:
          "Es una base de datos columnar de código abierto optimizada para cargas de trabajo analíticas, que maneja eficientemente datos de alta cardinalidad y alta granularidad, a diferencia de las bases de datos de series temporales tradicionales.",
      },
      {
        prompt:
          "El lenguaje de consulta propio de New Relic, similar a SQL, se llama _____.",
        answer: "NRQL (New Relic Query Language).",
      },
      {
        prompt:
          "Datadog ahora admite la ingesta de datos de OpenTelemetry, aunque algunas de sus características avanzadas funcionan mejor con su _____.",
        answer: "agente nativo (Datadog Agent).",
      },
      {
        prompt:
          "En el modelo de costo de ClickHouse, ¿cuál es la principal ventaja de usar una base de datos unificada sobre un stack federado (como Loki, Mimir, Tempo)?",
        answer:
          "Reduce la duplicación de datos y metadatos, utiliza un único almacén con alta compresión y permite consultas con un solo lenguaje (SQL), simplificando la operación.",
      },
      {
        prompt:
          "En el contexto del trazado distribuido, ¿qué es la instrumentación automática?",
        answer:
          "Es el proceso de capturar telemetría de frameworks y librerías comunes sin necesidad de modificar el código de la aplicación, generalmente a través de agentes o librerías que se adjuntan en tiempo de ejecución.",
      },
      {
        prompt:
          "Una estrategia para manejar servicios de bajo tráfico en las alertas de SLO es generar _____ para compensar la falta de señal de los usuarios reales.",
        answer: "tráfico artificial (synthetic traffic).",
      },
      {
        prompt: "Término: AIOps",
        answer:
          "Se refiere a la aplicación de la inteligencia artificial y el aprendizaje automático a las operaciones de TI, utilizada en observabilidad para la detección de anomalías, reducción de ruido de alertas y análisis automatizado de la causa raíz.",
      },
      {
        prompt: "¿Qué es la correlación de señales en observabilidad?",
        answer:
          "Es el proceso de vincular diferentes tipos de telemetría (métricas, logs, trazas) para un incidente específico, permitiendo navegar desde un pico de métrica a los logs y trazas relevantes.",
      },
      {
        prompt:
          "Para asegurar la correlación, los registros de logs deben enriquecerse con el _____ y el _____ de la traza activa.",
        answer: "TraceId, SpanId.",
      },
      {
        prompt: "Término: Políticas de retención de datos",
        answer:
          "Son reglas que definen cuánto tiempo se almacenan los datos de telemetría, a menudo en diferentes niveles de almacenamiento (caliente, tibio, frío) para equilibrar el costo y la accesibilidad.",
      },
      {
        prompt:
          "Un procesador del Colector OTel que agrupa múltiples spans, métricas o logs en una sola solicitud para mejorar la eficiencia se llama procesador de _____.",
        answer: "lotes (batch processor).",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de utilizar OpenTelemetry en lugar de agentes propietarios de un proveedor?",
        answer:
          "Evita el 'vendor lock-in' (dependencia del proveedor), permitiendo cambiar de backend de observabilidad sin tener que reinstrumentar las aplicaciones.",
      },
      {
        prompt:
          "La métrica `p50` es otro nombre para la _____, que representa el punto medio de un conjunto de datos.",
        answer: "mediana.",
      },
      {
        prompt:
          "Si la latencia p50 de un servicio es de 20 ms y la p99 es de 800 ms, ¿qué indica esta gran diferencia?",
        answer:
          "Indica que la mayoría de las solicitudes son rápidas, pero hay un pequeño porcentaje de solicitudes extremadamente lentas (una 'cola larga'), lo que sugiere problemas de rendimiento en casos específicos.",
      },
      {
        prompt:
          "¿Cuál es el propósito del componente `query-frontend` en arquitecturas escalables como la de Grafana Mimir?",
        answer:
          "Divide las consultas grandes en partes más pequeñas, gestiona una cola de consultas y almacena en caché los resultados para reducir la carga en los backends.",
      },
      {
        prompt:
          "En el contexto de Loki, los logs se agrupan en 'chunks' comprimidos que se almacenan en un _____.",
        answer: "almacenamiento de objetos (object storage).",
      },
      {
        prompt:
          "En el contexto de OpenTelemetry, ¿qué es la instrumentación manual?",
        answer:
          "Es el acto de agregar código explícitamente a una aplicación para crear spans, registrar eventos o emitir métricas, proporcionando un control detallado sobre la telemetría.",
      },
      {
        prompt:
          "Los 'span events' en OpenTelemetry se utilizan para registrar _____.",
        answer:
          "ocurrencias con marca de tiempo dentro de un span, proporcionando contexto adicional sobre el trabajo realizado.",
      },
      {
        prompt:
          "Datadog ofrece una característica llamada 'muestreo adaptativo' (adaptive sampling) que ajusta dinámicamente las tasas de muestreo para capturar trazas relevantes mientras se mantiene dentro de un _____.",
        answer: "presupuesto de ingesta mensual.",
      },
      {
        prompt:
          "En el stack federado de OSS, Loki, Mimir y Tempo escalan de forma independiente, lo que sigue el principio de _____.",
        answer: "divide y vencerás (divide and conquer).",
      },
      {
        prompt:
          "Una de las estrategias técnicas para reducir los costos de observabilidad es eliminar o truncar los _____ en los logs de producción.",
        answer: "stack traces (trazas de pila).",
      },
      {
        prompt:
          "El tipo de span 'CONSUMER' en OpenTelemetry se utiliza para representar operaciones asíncronas de _____.",
        answer:
          "recepción y procesamiento de mensajes (por ejemplo, desde una cola como Kafka o RabbitMQ).",
      },
      {
        prompt:
          "En Grafana, las _____ se utilizan para crear dashboards dinámicos que pueden filtrar datos entre diferentes entornos, clústeres o servicios.",
        answer: "variables de plantilla (template variables).",
      },
      {
        prompt: "Término: Muestreo probabilístico (Probabilistic Sampling)",
        answer:
          "Una estrategia de muestreo de cabecera (head-based) que decide aleatoriamente si se captura una traza basándose en un porcentaje predefinido.",
      },
      {
        prompt:
          "Un desafío para lograr la observabilidad en Kubernetes es la naturaleza _____ de los pods y contenedores, lo que significa que su estado desaparece rápidamente si no se captura.",
        answer: "efímera.",
      },
      {
        prompt:
          "En Datadog, las 'métricas de trazas' se calculan a partir del 100% del tráfico, a diferencia de los datos de trazas que pueden ser muestreados. ¿Por qué es esto importante?",
        answer:
          "Porque permite crear alertas y SLOs precisos y fiables basados en tasas de solicitud, errores y latencia, sin ser afectados por el muestreo.",
      },
      {
        prompt:
          "Término: Instrumentación sin código (Codeless Instrumentation)",
        answer:
          "Se refiere a la capacidad de recopilar telemetría de aplicaciones sin modificar su código fuente, a menudo utilizando tecnologías como eBPF.",
      },
      {
        prompt:
          "El exporter `loadbalancing` del Colector de OpenTelemetry se utiliza para distribuir la carga de telemetría entre múltiples instancias de _____.",
        answer:
          "colectores de backend o de siguiente nivel (por ejemplo, un pool de colectores de muestreo de cola).",
      },
      {
        prompt:
          "Cuando una traza distribuida cruza los límites de la aplicación (por ejemplo, del frontend web al backend), se está realizando un trazado _____.",
        answer: "de extremo a extremo (end-to-end).",
      },
      {
        prompt: "¿Qué es un 'pipeline de telemetría'?",
        answer:
          "Es un sistema, a menudo implementado con herramientas como el Colector de OpenTelemetry, que procesa y enruta datos de telemetría desde las fuentes hasta los destinos, permitiendo el control centralizado de los datos.",
      },
      {
        prompt: "¿Qué es una métrica de tipo 'histograma'?",
        answer:
          "Es una métrica que rastrea la distribución de un conjunto de mediciones, agrupándolas en cubos (buckets) configurables, útil para calcular percentiles como p95 o p99.",
      },
      {
        prompt:
          "Un modelo de precios común en las plataformas de observabilidad que puede llevar a costos inesperados es el precio por _____.",
        answer: "GB de ingesta.",
      },
      {
        prompt:
          "La integración de Grafana k6 (pruebas de carga) con Grafana Pyroscope (perfilado) permite a los desarrolladores identificar cuellos de botella de rendimiento de código bajo _____.",
        answer: "tráfico simulado.",
      },
      {
        prompt:
          "En OTel, el procesador `spanmetrics` se utiliza para generar métricas (como latencia y recuentos) directamente a partir de los datos de _____.",
        answer: "trazas (spans).",
      },
      {
        prompt:
          "El 'Control Plane' de Chronosphere es una característica que permite analizar y transformar los datos de telemetría _____ de que se almacenen y facturen.",
        answer: "antes.",
      },
      {
        prompt:
          "¿Qué es la 'fatiga de alertas' (alert fatigue) y cómo ayuda AIOps a reducirla?",
        answer:
          "Es la desensibilización a las alertas debido a un alto volumen de notificaciones. AIOps ayuda agrupando alertas relacionadas en un solo incidente y reduciendo el ruido.",
      },
      {
        prompt:
          "En el contexto de la observabilidad, ¿qué significa 'correlación de la causa raíz'?",
        answer:
          "Es el proceso de identificar el evento o cambio subyacente que desencadenó una serie de fallos o degradaciones del rendimiento, a menudo analizando señales correlacionadas en el tiempo.",
      },
      {
        prompt:
          "La herramienta _____ es un backend de trazado distribuido de código abierto que a menudo se usa junto con Prometheus y Grafana.",
        answer: "Jaeger.",
      },
      {
        prompt:
          "La técnica de muestreo de trazas `TraceState` permite tomar decisiones de muestreo basadas en _____.",
        answer:
          "un estado personalizado propagado a través de los servicios dentro de la traza.",
      },
      {
        prompt:
          "¿Cuál es el propósito del componente `compactor` en sistemas como Grafana Tempo?",
        answer:
          "Optimiza los bloques de datos en el almacenamiento de objetos, combina bloques pequeños en otros más grandes y aplica las políticas de retención para eliminar datos antiguos.",
      },
      {
        prompt:
          "El uso de la métrica `otelcol_exporter_queue_size` es importante para monitorizar el Colector de OpenTelemetry porque un tamaño de cola en constante crecimiento indica que _____.",
        answer:
          "el backend no puede procesar los datos a la velocidad a la que se envían, lo que puede llevar a la pérdida de datos.",
      },
      {
        prompt: "Término: Logging estructurado",
        answer:
          "Es la práctica de escribir logs en un formato consistente y predecible (como JSON), lo que facilita su análisis y consulta por máquinas.",
      },
      {
        prompt:
          "En el contexto de TDD, el ciclo se conoce como 'Rojo-Verde-Refactorizar'. ¿Qué sucede en la fase 'Roja'?",
        answer:
          "Se escribe una prueba automatizada que falla porque la funcionalidad correspondiente aún no se ha implementado.",
      },
      {
        prompt:
          "En BDD, los escenarios a menudo se escriben en un lenguaje estructurado de lenguaje natural llamado Gherkin, usando las palabras clave _____, _____ y _____.",
        answer: "Dado (Given), Cuando (When), Entonces (Then).",
      },
      {
        prompt:
          "En la evaluación de Autoscope, se utilizó una variante del Z-score basada en la mediana y la _____ para una detección de anomalías más robusta en duraciones de spans.",
        answer:
          "desviación absoluta mediana (MAD - Median Absolute Deviation).",
      },
      {
        prompt:
          "¿Por qué es importante evitar métricas con etiquetas de alta cardinalidad como 'user_id' o 'request_id'?",
        answer:
          "Porque cada combinación única de etiquetas crea una nueva serie temporal, lo que provoca un crecimiento exponencial del almacenamiento y una ralentización de las consultas.",
      },
      {
        prompt: "¿Qué es un 'pipeline de logs'?",
        answer:
          "Es un proceso que ingiere, procesa (parsea, enriquece, filtra) y enruta los datos de logs desde su origen hasta su destino final de almacenamiento o análisis.",
      },
      {
        prompt:
          "El lenguaje de consulta NRQL de New Relic es un ejemplo de un lenguaje de consulta _____ para datos de observabilidad.",
        answer: "similar a SQL.",
      },
      {
        prompt:
          "¿Qué es la 'rehidratación' de datos en el contexto de las plataformas SaaS de observabilidad?",
        answer:
          "Es el proceso, a menudo costoso, de mover datos desde un almacenamiento frío/archivado a un almacenamiento caliente para poder consultarlos, incurriendo en tarifas adicionales.",
      },
      {
        prompt:
          "La tecnología _____ permite a herramientas como Grafana Beyla generar métricas y trazas sin instrumentación de código al observar llamadas del sistema a nivel del kernel.",
        answer: "eBPF.",
      },
      {
        prompt:
          "¿Cuál es una de las principales desventajas del stack ELK (Elasticsearch, Logstash, Kibana) para la gestión de logs?",
        answer:
          "Requiere una alta experiencia técnica para su gestión, escalado y mantenimiento, y puede consumir muchos recursos.",
      },
      {
        prompt:
          "En una política de presupuesto de errores, si un servicio consume su presupuesto mensual rápidamente, ¿qué acción podría desencadenarse?",
        answer:
          "Se podría congelar el lanzamiento de nuevas funcionalidades hasta que se restablezca la fiabilidad del servicio.",
      },
      {
        prompt:
          "¿Cuál es el propósito del componente `distributor` en arquitecturas como las de Loki y Tempo?",
        answer:
          "Recibe los datos entrantes (logs o spans), los valida y los reenvía a los `ingesters` para su procesamiento y almacenamiento.",
      },
      {
        prompt:
          "En el procesador de muestreo de cola de OTel, el parámetro `decision_wait` controla _____.",
        answer:
          "el tiempo que el colector espera desde que recibe el primer span de una traza antes de tomar una decisión de muestreo.",
      },
      {
        prompt:
          "Una de las políticas de muestreo de cola permite muestrear trazas basándose en la presencia de un código de estado específico, como los errores de la serie 5xx. Esta política se llama _____.",
        answer: "status_code.",
      },
      {
        prompt:
          "El formato estándar para la propagación de contexto de trazas definido por el W3C se llama _____.",
        answer: "W3C Trace Context (y utiliza encabezados como `traceparent`).",
      },
      {
        prompt:
          "Término: Observabilidad del frontend (o RUM - Real User Monitoring)",
        answer:
          "Es la práctica de capturar telemetría (interacciones, tiempos de carga, errores de JavaScript) directamente desde el navegador del usuario final para entender su experiencia real.",
      },
      {
        prompt:
          "Herramientas como _____ se utilizan para la observabilidad del frontend y se integran en el ecosistema de Grafana.",
        answer: "Grafana Faro.",
      },
      {
        prompt:
          "En el contexto de la seguridad, ¿cómo puede ayudar la observabilidad?",
        answer:
          "Puede ayudar a detectar actividades inusuales, proporcionar pistas para la investigación de incidentes y ofrecer registros de auditoría para el cumplimiento normativo.",
      },
      {
        prompt:
          "¿Qué significa que una plataforma de observabilidad es 'nativa de OpenTelemetry'?",
        answer:
          "Significa que está diseñada desde su núcleo para utilizar el estándar OpenTelemetry para la ingesta y el procesamiento de datos, en lugar de simplemente tener un conector o adaptador.",
      },
      {
        prompt: "Término: Muestreo de nivel de span (Span-level sampling)",
        answer:
          "Una técnica avanzada de muestreo donde se toman decisiones de retención para spans individuales dentro de una traza, en lugar de para la traza completa, permitiendo una reducción de datos más granular.",
      },
      {
        prompt: "¿Cuál es el riesgo de un muestreo demasiado agresivo?",
        answer:
          "Se corre el riesgo de perder trazas o datos cruciales para diagnosticar problemas intermitentes o poco frecuentes.",
      },
      {
        prompt:
          "En los sistemas distribuidos, un _____ se utiliza para asegurar que las solicitudes se distribuyan de manera uniforme entre múltiples instancias de un servicio o colector.",
        answer: "balanceador de carga (load balancer).",
      },
      {
        prompt:
          "¿Por qué es importante la 'instrumentación estandarizada' para la observabilidad?",
        answer:
          "Asegura que los datos de telemetría se recopilen de manera consistente en todos los servicios, lo que facilita la correlación y el análisis de los datos.",
      },
      {
        prompt:
          "La capacidad de Grafana de crear un enlace desde un punto de datos en un panel de métricas a una consulta de logs pre-poblada en Loki es un ejemplo de _____.",
        answer: "correlación de datos (o navegación contextual).",
      },
      {
        prompt:
          "¿Qué problema resuelve la federación de colectores de OpenTelemetry en un entorno distribuido globalmente?",
        answer:
          "Permite la agregación y el procesamiento de telemetría a nivel regional antes de enviarla a un colector central, reduciendo la latencia y el tráfico de red transregional.",
      },
      {
        prompt:
          "La persistencia de logs es un desafío en entornos de contenedores porque los logs dentro de un contenedor se pierden cuando este _____.",
        answer: "es destruido o falla.",
      },
      {
        prompt:
          "En el contexto de costos de observabilidad, el precio 'por host' o 'por contenedor' penaliza a las arquitecturas que utilizan la _____.",
        answer: "escalabilidad horizontal.",
      },
      {
        prompt:
          "La compresión y el almacenamiento en niveles (tiered storage) son dos estrategias para reducir los costos de _____ de los datos de observabilidad.",
        answer: "retención y almacenamiento.",
      },
      {
        prompt:
          "¿Qué es la observabilidad empresarial (business observability)?",
        answer:
          "Es la práctica de integrar datos de negocio (como ingresos, carritos de compra abandonados) con los datos de telemetría para entender el impacto del rendimiento del sistema en los resultados de negocio.",
      },
      {
        prompt:
          "El procesador `cumulativetodelta` del Colector de OTel se utiliza para convertir métricas acumulativas, como un contador que siempre aumenta, en métricas _____.",
        answer: "delta (que muestran el cambio desde la última medición).",
      },
      {
        prompt: "Término: Datos de telemetría",
        answer:
          "Es la información generada por un sistema para proporcionar visibilidad sobre su estado interno, incluyendo principalmente métricas, logs, trazas y perfiles.",
      },
    ],
  },
];
