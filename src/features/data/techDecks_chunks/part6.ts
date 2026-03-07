import type { TechDeck } from "@/features/data/techDecks_chunks/types";

export const techDecksPart6: TechDeck[] = [
  {
    id: "patrones",
    name: "Patrones",
    cards: [
      {
        prompt: "¿Qué es la arquitectura de microservicios?",
        answer:
          "Es un enfoque de diseño donde una aplicación se construye como un conjunto de servicios pequeños e implementables de forma independiente, cada uno ejecutándose en su propio proceso y comunicándose a través de mecanismos ligeros.",
      },
      {
        prompt: "¿Cuál es el propósito principal del patrón API Gateway?",
        answer:
          "Actuar como un único punto de entrada para todos los clientes, enrutando las solicitudes al microservicio apropiado en el backend y manejando preocupaciones transversales.",
      },
      {
        prompt:
          "Un ejemplo del mundo real del patrón API Gateway es _____ de Netflix.",
        answer: "Zuul",
      },
      {
        prompt:
          "¿En qué se diferencia el patrón Backends for Frontends (BFF) del patrón API Gateway?",
        answer:
          "En el patrón BFF se crean backends separados y personalizados para cada tipo de frontend (web, móvil, etc.), en lugar de una única puerta de enlace para todos.",
      },
      {
        prompt:
          "¿Cómo gestiona el patrón Saga las transacciones distribuidas en microservicios?",
        answer:
          "Divide una transacción global en una serie de transacciones locales coordinadas, utilizando transacciones compensatorias para deshacer los pasos si uno falla.",
      },
      {
        prompt:
          "En el patrón Saga, la estrategia de _____ utiliza un servicio central para indicar a cada participante qué hacer a continuación.",
        answer: "orquestación",
      },
      {
        prompt:
          "En el patrón Saga, la estrategia de _____ se basa en que cada servicio publique eventos que otros servicios escuchan y a los que reaccionan en cadena.",
        answer: "coreografía",
      },
      {
        prompt: "¿Qué son las transacciones compensatorias en el patrón Saga?",
        answer:
          "Son operaciones que revierten el efecto de un paso completado previamente en una saga cuando un paso posterior falla.",
      },
      {
        prompt:
          "¿Qué principio de consistencia de datos habilitan las Sagas en los microservicios?",
        answer: "Consistencia eventual.",
      },
      {
        prompt:
          "¿Qué significa el patrón 'Database per Service' (Base de datos por servicio)?",
        answer:
          "Cada microservicio posee y gestiona su propia base de datos, y otros servicios no pueden acceder directamente a ella.",
      },
      {
        prompt:
          "¿Qué es la 'Persistencia Políglota' (Polyglot Persistence) en el contexto de microservicios?",
        answer:
          "Es el uso de diferentes tipos de tecnologías de bases de datos para diferentes microservicios, eligiendo la mejor opción para las necesidades de cada servicio.",
      },
      {
        prompt: "¿Cuál es la función del patrón Sidecar?",
        answer:
          "Adjuntar un proceso o servicio auxiliar a un servicio principal para proporcionar capacidades comunes (como logging o monitoreo) sin sobrecargar el código del servicio principal.",
      },
      {
        prompt:
          "En Kubernetes, el patrón Sidecar se utiliza comúnmente para inyectar un proxy _____ como parte de una malla de servicios (service mesh) como Istio.",
        answer: "Envoy",
      },
      {
        prompt:
          "¿Qué significa el principio de 'Smart Endpoints, Dumb Pipes' (Extremos inteligentes, tuberías tontas)?",
        answer:
          "Significa que la lógica de negocio y el procesamiento deben residir en los microservicios (los extremos), mientras que los canales de comunicación (las tuberías) deben ser simples y sin lógica compleja.",
      },
      {
        prompt:
          "¿Cómo ayuda el patrón 'Consumer-Driven Contracts' (CDC) a evitar rupturas entre microservicios?",
        answer:
          "Permite que los consumidores de una API definan sus expectativas en un contrato, que el proveedor utiliza para verificar que los cambios no romperán la integración.",
      },
      {
        prompt:
          "¿Cuál es el propósito del patrón Strangler Fig (Higuera Estranguladora)?",
        answer:
          "Permitir la migración gradual de un sistema monolítico a microservicios, reemplazando incrementalmente partes del sistema antiguo hasta que pueda ser retirado.",
      },
      {
        prompt:
          "¿Cómo funciona la estrategia de despliegue 'Shadow Deployment' (Despliegue en Sombra)?",
        answer:
          "Se duplica el tráfico de producción y se envía a una nueva versión del servicio en paralelo con la antigua, sin que la respuesta de la nueva versión afecte al usuario, para probarla bajo carga real.",
      },
      {
        prompt:
          "¿Por qué es preferible que los microservicios sean 'stateless' (sin estado)?",
        answer:
          "Porque simplifica el escalado horizontal y la resiliencia; cualquier instancia puede manejar cualquier solicitud sin depender del estado de interacciones previas.",
      },
      {
        prompt:
          "En un servicio sin estado, ¿dónde se suele almacenar el estado necesario (como los datos de sesión)?",
        answer:
          "En un almacenamiento externo, como una base de datos o una caché, o se pasa en cada solicitud (por ejemplo, a través de tokens).",
      },
      {
        prompt: "¿Qué es el patrón Circuit Breaker (Interruptor de circuito)?",
        answer:
          "Es un patrón que evita que un servicio intente llamar continuamente a un servicio que está fallando, abriendo el 'circuito' para fallar rápidamente y darle tiempo al servicio defectuoso para recuperarse.",
      },
      {
        prompt: "¿Cuáles son los tres estados de un Circuit Breaker?",
        answer: "Cerrado (Closed), Abierto (Open) y Semiabierto (Half-Open).",
      },
      {
        prompt:
          "En el patrón Circuit Breaker, el estado _____ permite que un número limitado de solicitudes de prueba pasen para verificar si el servicio se ha recuperado.",
        answer: "Semiabierto (Half-Open)",
      },
      {
        prompt: "¿Qué problema resuelve el patrón Bulkhead (Mamparo)?",
        answer:
          "Aísla los elementos de una aplicación en pools, de modo que si uno falla, los demás pueden seguir funcionando, evitando fallos en cascada.",
      },
      {
        prompt: "¿Cuándo se debe utilizar el patrón Retry (Reintento)?",
        answer:
          "Cuando una operación falla temporalmente debido a errores transitorios, como tiempos de espera de red o indisponibilidad breve del servicio.",
      },
      {
        prompt:
          "Una operación que puede reintentarse de forma segura sin causar efectos secundarios múltiples se conoce como una operación _____.",
        answer: "idempotente",
      },
      {
        prompt:
          "¿Qué es el patrón CQRS (Command Query Responsibility Segregation)?",
        answer:
          "Es un patrón que segrega las operaciones que modifican datos (comandos) de las que leen datos (consultas), utilizando a menudo modelos de datos y almacenes diferentes para cada una.",
      },
      {
        prompt: "¿Qué es el patrón Event Sourcing (Fuente de eventos)?",
        answer:
          "Es un patrón en el que el estado de una entidad de negocio se almacena como una secuencia de eventos ordenados en el tiempo, en lugar de solo el estado actual.",
      },
      {
        prompt:
          "¿Cómo se obtiene el estado actual de una entidad en el patrón Event Sourcing?",
        answer:
          "Se obtiene reproduciendo ('replaying') toda la secuencia de eventos que han afectado a esa entidad desde su creación.",
      },
      {
        prompt: "¿Qué es el Sharding de Datos (Fragmentación de Datos)?",
        answer:
          "Es el proceso de dividir una base de datos en múltiples piezas más pequeñas (shards), donde cada una contiene un subconjunto de los datos, para mejorar la escalabilidad y el rendimiento.",
      },
      {
        prompt:
          "El principio de diseño de software que aboga por evitar la duplicación de lógica se conoce como _____.",
        answer: "DRY (Don't Repeat Yourself - No te repitas)",
      },
      {
        prompt:
          "El principio de diseño de software que establece que 'no vas a necesitarlo' para evitar la implementación de funcionalidades especulativas es _____.",
        answer: "YAGNI (You Aren't Gonna Need It)",
      },
      {
        prompt:
          "¿A qué se refiere el principio KISS en el desarrollo de software?",
        answer:
          "Significa 'Keep It Simple, Stupid' (Mantenlo estúpidamente simple), y aboga por evitar la complejidad innecesaria en las soluciones.",
      },
      {
        prompt:
          "¿Cuál es la primera de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "La red es fiable.",
      },
      {
        prompt:
          "¿Cuál es la segunda de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "La latencia es cero.",
      },
      {
        prompt:
          "¿Cuál es la tercera de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "El ancho de banda es infinito.",
      },
      {
        prompt:
          "¿Cuál es la cuarta de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "La red es segura.",
      },
      {
        prompt:
          "¿Cuál es la quinta de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "La topología no cambia.",
      },
      {
        prompt:
          "¿Cuál es la sexta de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "Hay un solo administrador.",
      },
      {
        prompt:
          "¿Cuál es la séptima de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "El coste de transporte es cero.",
      },
      {
        prompt:
          "¿Cuál es la octava de las 'Ocho Falacias de la Computación Distribuida'?",
        answer: "La red es homogénea.",
      },
      {
        prompt:
          "El algoritmo de consenso _____ está diseñado para ser más comprensible que Paxos y se utiliza en sistemas como etcd (usado por Kubernetes).",
        answer: "Raft",
      },
      {
        prompt:
          "¿Cuáles son los tres subproblemas en los que Raft descompone el problema del consenso?",
        answer:
          "Elección de líder (leader election), replicación de registros (log replication) y seguridad (safety).",
      },
      {
        prompt:
          "¿Cómo resuelve Raft el problema de los 'split votes' (votos divididos) durante la elección de un líder?",
        answer:
          "Utiliza un tiempo de espera de elección aleatorio (randomized election timeout) para que los servidores no se conviertan en candidatos al mismo tiempo.",
      },
      {
        prompt:
          "En Raft, ¿quién es responsable de gestionar el registro replicado y aceptar las entradas de los clientes?",
        answer: "El líder (leader).",
      },
      {
        prompt:
          "Una entrada de registro en Raft se considera 'committed' (confirmada) una vez que el líder la ha replicado en una _____ de los servidores.",
        answer: "mayoría",
      },
      {
        prompt: "¿Qué problema resuelve el patrón Transactional Outbox?",
        answer:
          "El problema de la 'doble escritura' (dual-write), donde se necesita actualizar una base de datos y enviar un mensaje a un bróker de forma atómica.",
      },
      {
        prompt: "¿Cómo funciona el patrón Transactional Outbox?",
        answer:
          "Almacena los eventos/mensajes en una tabla 'outbox' dentro de la misma transacción de base de datos que los datos de negocio, y un proceso separado los publica posteriormente.",
      },
      {
        prompt: "La primera 'S' en los principios SOLID representa el _____.",
        answer:
          "Principio de Responsabilidad Única (Single Responsibility Principle)",
      },
      {
        prompt: "La 'O' en los principios SOLID representa el _____.",
        answer: "Principio de Abierto/Cerrado (Open/Closed Principle)",
      },
      {
        prompt: "La 'L' en los principios SOLID representa el _____.",
        answer:
          "Principio de Sustitución de Liskov (Liskov Substitution Principle)",
      },
      {
        prompt: "La 'I' en los principios SOLID representa el _____.",
        answer:
          "Principio de Segregación de la Interfaz (Interface Segregation Principle)",
      },
      {
        prompt: "La 'D' en los principios SOLID representa el _____.",
        answer:
          "Principio de Inversión de Dependencia (Dependency Inversion Principle)",
      },
      {
        prompt:
          "¿Qué es una 'máquina de estados replicada' (replicated state machine)?",
        answer:
          "Es un enfoque en sistemas distribuidos donde máquinas de estado en varios servidores calculan copias idénticas del mismo estado para lograr tolerancia a fallos.",
      },
      {
        prompt:
          "El protocolo _____ es un protocolo de compromiso atómico que coordina si todos los participantes de una transacción distribuida deben confirmar (commit) o abortar (abort).",
        answer: "de dos fases (Two-Phase Commit - 2PC)",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja del protocolo de compromiso de dos fases (2PC)?",
        answer:
          "Es un protocolo bloqueante; si el coordinador falla, los participantes pueden quedar bloqueados y sin poder resolver la transacción hasta que se recupere.",
      },
      {
        prompt: "¿Qué es el patrón Materialized View (Vista Materializada)?",
        answer:
          "Es una estrategia para mejorar el rendimiento de las consultas generando vistas de datos precalculadas y almacenadas físicamente, que se actualizan periódicamente.",
      },
      {
        prompt:
          "¿Cuál es la principal contrapartida del uso de vistas materializadas?",
        answer:
          "Los datos pueden estar desactualizados (stale) hasta el próximo refresco y requieren espacio de almacenamiento adicional.",
      },
      {
        prompt:
          "El protocolo _____ se utiliza en sistemas distribuidos para la diseminación de información, detección de fallos y mantenimiento de la membresía del clúster de forma descentralizada.",
        answer: "Gossip",
      },
      {
        prompt:
          "Sistemas como Apache Cassandra, Consul y Amazon Dynamo utilizan el protocolo _____ para la detección de fallos y el seguimiento de la membresía de nodos.",
        answer: "Gossip",
      },
      {
        prompt:
          "¿Qué es la arquitectura de Cero Confianza (Zero Trust Architecture - ZTA)?",
        answer:
          "Es un marco de ciberseguridad basado en el principio de 'nunca confiar, siempre verificar', tratando cada solicitud de acceso como no confiable por defecto.",
      },
      {
        prompt:
          "El principio de _____ en la arquitectura de Cero Confianza asegura que a los usuarios y dispositivos se les concede solo el acceso mínimo necesario para sus tareas.",
        answer: "privilegio mínimo (least privilege)",
      },
      {
        prompt:
          "La _____ es una técnica clave en la Arquitectura de Cero Confianza para restringir el acceso a recursos específicos y limitar el movimiento lateral de un atacante.",
        answer: "micro-segmentación",
      },
      {
        prompt: "¿En qué se diferencia el handshake de TLS 1.3 del de TLS 1.2?",
        answer:
          "TLS 1.3 reduce el handshake a un solo viaje de ida y vuelta (1-RTT) en comparación con los dos de TLS 1.2, haciéndolo más rápido y seguro.",
      },
      {
        prompt:
          "TLS 1.3 introduce una característica de reanudación de sesión llamada _____ que permite a los clientes enviar datos cifrados inmediatamente al reconectarse a un servidor conocido.",
        answer: "0-RTT (Zero Round-Trip Time)",
      },
      {
        prompt:
          "El desarrollo guiado por pruebas (Test-Driven Development - TDD) sigue un ciclo repetitivo de tres pasos conocido como _____.",
        answer: "Rojo - Verde - Refactorizar (Red - Green - Refactor)",
      },
      {
        prompt: "En el contexto de TDD, ¿qué representa el paso 'Rojo'?",
        answer:
          "Escribir una prueba que falla porque la funcionalidad correspondiente aún no ha sido implementada.",
      },
      {
        prompt: "En el contexto de TDD, ¿qué representa el paso 'Verde'?",
        answer:
          "Escribir la cantidad mínima de código funcional necesario para que la prueba que fallaba ahora pase.",
      },
      {
        prompt:
          "En el contexto de TDD, ¿qué representa el paso 'Refactorizar'?",
        answer:
          "Mejorar la estructura del código recién escrito y del existente sin cambiar su comportamiento externo.",
      },
      {
        prompt: "¿Qué es el patrón Ambassador?",
        answer:
          "Es un patrón de contenedor que actúa como un proxy, donde todas las interacciones de un contenedor de aplicación con el mundo exterior pasan a través del contenedor embajador.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia entre el patrón Sidecar y el patrón Ambassador?",
        answer:
          "Un Sidecar mejora un contenedor principal, mientras que un Ambassador actúa como un intermediario obligatorio para la comunicación externa del contenedor principal.",
      },
      {
        prompt:
          "¿Qué es la Arquitectura Orientada a Eventos (Event-Driven Architecture - EDA)?",
        answer:
          "Es un paradigma de arquitectura de software que promueve la producción, detección, consumo y reacción a eventos de forma asíncrona.",
      },
      {
        prompt:
          "¿Qué tipo de consistencia es inevitable en sistemas distribuidos a gran escala, donde los cambios en un servicio se propagan a otros con el tiempo?",
        answer: "Consistencia eventual (Eventual Consistency).",
      },
      {
        prompt:
          "Dentro de un sistema eventualmente consistente, el _____ es un componente que debe ser siempre internamente consistente para tomar decisiones fiables.",
        answer: "agregado (aggregate)",
      },
      {
        prompt:
          "¿Qué problema puede ocurrir si se implementa el patrón de reintento sin un mecanismo de protección como un interruptor de circuito?",
        answer:
          "Puede exacerbar los fallos al aumentar la carga sobre un servicio que ya está fallando, creando una 'tormenta de reintentos'.",
      },
      {
        prompt:
          "En una arquitectura basada en eventos, ¿qué tipo de mensaje se debe usar si un servicio publicador espera que algo específico suceda en otro servicio?",
        answer:
          "Debe enviar una solicitud asíncrona como un comando (command), en lugar de simplemente publicar un evento.",
      },
      {
        prompt:
          "¿Qué es el 'Principio de Responsabilidad Única' (Single Responsibility Principle)?",
        answer:
          "Establece que una clase debe tener una, y solo una, razón para cambiar, lo que significa que debe tener una sola responsabilidad.",
      },
      {
        prompt:
          "¿Qué es el 'Principio de Abierto/Cerrado' (Open/Closed Principle)?",
        answer:
          "Establece que las entidades de software (clases, módulos, funciones, etc.) deben estar abiertas a la extensión, pero cerradas a la modificación.",
      },
      {
        prompt:
          "¿Qué es el 'Principio de Inversión de Dependencia' (Dependency Inversion Principle)?",
        answer:
          "Establece que los módulos de alto nivel no deben depender de los módulos de bajo nivel; ambos deben depender de abstracciones.",
      },
      {
        prompt: "¿Cuál es el propósito del patrón Timeout (Tiempo de espera)?",
        answer:
          "Evitar que un servicio espere indefinidamente una respuesta de otro, permitiendo que falle rápidamente para no bloquear recursos.",
      },
      {
        prompt:
          "El patrón _____ se utiliza para aislar fallos, mientras que el patrón _____ se utiliza para prevenir fallos en cascada al detener las llamadas a un servicio que falla repetidamente.",
        answer: "Bulkhead (Mamparo), Circuit Breaker (Interruptor de circuito)",
      },
      {
        prompt:
          "¿Por qué la idempotencia es una consideración importante al implementar el patrón de reintento?",
        answer:
          "Para asegurar que reintentar una operación no cause efectos secundarios no deseados, como duplicar un cargo en una transacción de pago.",
      },
      {
        prompt:
          "¿Qué es un 'aggregate' en el contexto de Domain-Driven Design (DDD)?",
        answer:
          "Es un clúster de objetos de dominio (entidades y objetos de valor) que pueden ser tratados como una sola unidad, sirviendo como un límite de consistencia transaccional.",
      },
      {
        prompt:
          "Una de las falacias de la computación distribuida es asumir que el coste de transporte es cero. ¿Qué costes reales implica?",
        answer:
          "Implica costes financieros (hardware, cloud), así como costes de recursos computacionales (CPU, memoria) para serialización y deserialización de datos.",
      },
      {
        prompt:
          "¿Cómo mitiga el patrón API Gateway la falacia de que 'la red es segura'?",
        answer:
          "Puede centralizar la aplicación de políticas de seguridad como la autenticación, autorización y limitación de velocidad (rate limiting) antes de que las solicitudes lleguen a los servicios internos.",
      },
      {
        prompt:
          "¿Qué significa el término 'atomicidad' en el contexto de las transacciones de bases de datos?",
        answer:
          "Es la propiedad que garantiza que una transacción se trata como una única unidad de trabajo, que se completa en su totalidad o no se realiza en absoluto.",
      },
      {
        prompt:
          "El patrón Transactional Outbox ayuda a lograr la atomicidad entre una escritura en la base de datos y la publicación de un evento a un ____.",
        answer: "bróker de mensajes (message broker)",
      },
      {
        prompt:
          "En el patrón Saga, la coreografía puede volverse difícil de gestionar a medida que aumenta el número de ____.",
        answer: "microservicios o participantes",
      },
      {
        prompt:
          "¿Qué desafío de diseño introduce el patrón 'Database per Service'?",
        answer:
          "La implementación de consultas que necesitan unir datos de múltiples servicios se vuelve más compleja, ya que no se pueden usar joins de base de datos directos.",
      },
      {
        prompt:
          "El patrón _____ es útil para modernizar aplicaciones heredadas, mientras que el patrón _____ es para probar nuevas versiones de servicios con tráfico de producción real sin afectar a los usuarios.",
        answer: "Strangler Fig, Shadow Deployment",
      },
      {
        prompt:
          "En el patrón Raft, si un líder se aísla por una partición de red, ¿qué sucede con el resto de los nodos?",
        answer:
          "Los nodos restantes en la partición mayoritaria detectarán la falta de heartbeats y elegirán un nuevo líder.",
      },
      {
        prompt:
          "¿Qué es el 'coste de acarreo' (cost of carry) de una característica presuntiva según el principio YAGNI?",
        answer:
          "Es la complejidad añadida al código por una característica no utilizada, que dificulta y encarece la modificación y el desarrollo de otras características.",
      },
      {
        prompt: "¿Por qué el refactoring no viola el principio YAGNI?",
        answer:
          "Porque el refactoring no añade nuevas capacidades, sino que mejora la estructura del código existente para que sea más fácil de modificar en el futuro.",
      },
      {
        prompt:
          "La comunicación entre microservicios puede ser síncrona (ej. RESTful HTTP) o asíncrona (ej. _____).",
        answer: "colas de mensajes o sistemas pub/sub",
      },
      {
        prompt:
          "¿Cuál es la función de una capa proxy en la implementación del patrón Strangler Fig?",
        answer:
          "Interceptar las solicitudes entrantes y enrutarlas ya sea al sistema monolítico antiguo o a los nuevos microservicios, según la funcionalidad migrada.",
      },
      {
        prompt:
          "El patrón _____ combina los patrones CQRS y Event Sourcing para actualizar vistas de solo lectura en respuesta a eventos.",
        answer: "Materialized View (Vista Materializada)",
      },
      {
        prompt:
          "¿Cuál es un riesgo de seguridad al no considerar la falacia 'La red es segura'?",
        answer:
          "Exponer los sistemas a ataques como man-in-the-middle, espionaje de datos (eavesdropping) o inyección de paquetes maliciosos.",
      },
      {
        prompt:
          "En el patrón de mensajería asíncrona, ¿el servicio que publica un evento espera una respuesta inmediata?",
        answer:
          "No, el servicio publica el evento y continúa con su trabajo sin esperar una respuesta, desacoplando así los servicios.",
      },
    ],
  },
  {
    id: "practices",
    name: "Practices",
    cards: [
      {
        prompt:
          "¿Cuál es el valor por defecto de la propiedad `spring.jpa.hibernate.ddl-auto` para una base de datos embebida en Spring Boot?",
        answer:
          "El valor por defecto es `create-drop`, lo que significa que el esquema se crea al inicio y se elimina al cierre.",
      },
      {
        prompt:
          "¿Cuál es el valor por defecto de la propiedad `spring.jpa.hibernate.ddl-auto` para una base de datos no embebida en Spring Boot?",
        answer:
          "El valor por defecto es `none`, lo que significa que no se realizan cambios automáticos en el esquema.",
      },
      {
        prompt:
          "¿Cómo detecta Spring Boot si una base de datos es embebida para establecer el valor por defecto de `ddl-auto`?",
        answer:
          "Lo detecta observando el tipo de `Connection`: `hsqldb`, `h2` y `derby` se consideran embebidas.",
      },
      {
        prompt:
          "Para ejecutar automáticamente migraciones de base de datos con Liquibase al iniciar una aplicación Spring Boot, ¿qué dependencia se debe agregar al classpath?",
        answer:
          "Se debe agregar la dependencia `spring-boot-starter-liquibase`.",
      },
      {
        prompt:
          'En el patrón de caché "Cache-Aside" (Lazy Loading), ¿qué componente es responsable de gestionar el caché?',
        answer:
          "La aplicación es responsable de verificar el caché primero, y si falla, consultar la base de datos y actualizar el caché.",
      },
      {
        prompt:
          'Una de las desventajas del patrón de caché "Cache-Aside" es que las solicitudes iniciales sufren una latencia más alta. ¿Por qué ocurre esto?',
        answer:
          "Ocurre debido al overhead de un fallo de caché (cache miss), que requiere una consulta a la base de datos.",
      },
      {
        prompt:
          "En el patrón de caché _____, los datos se escriben simultáneamente en el caché y en la base de datos.",
        answer: "Write-Through",
      },
      {
        prompt:
          '¿Cuál es la principal desventaja del patrón de caché "Write-Through"?',
        answer:
          "Aumenta la latencia de escritura porque deben completarse dos operaciones de escritura (caché y BD) antes de la confirmación.",
      },
      {
        prompt:
          "El patrón de caché que ofrece el mayor rendimiento de escritura, ideal para cargas de trabajo pesadas, es _____.",
        answer: "Write-Back (Write-Behind)",
      },
      {
        prompt:
          '¿Cuál es el principal riesgo asociado con el patrón de caché "Write-Back" (Write-Behind)?',
        answer:
          "El riesgo de pérdida de datos si el caché falla antes de que la actualización se haya persistido en la base de datos.",
      },
      {
        prompt:
          "¿Qué patrón arquitectónico se adopta para desacoplar la lógica de escritura intensiva de las interfaces de lectura intensiva, permitiendo una alta concurrencia?",
        answer:
          "Se adoptan los patrones CQRS (Command Query Responsibility Segregation) y Event Sourcing.",
      },
      {
        prompt:
          "¿Qué técnica de sistemas distribuidos asigna objetos de datos y nodos a una posición en una estructura de anillo virtual para minimizar el remapeo de claves cuando cambia el número de nodos?",
        answer: "El hashing consistente (Consistent Hashing).",
      },
      {
        prompt:
          "En Hibernate, ¿qué anotación se utiliza para marcar un atributo que debe ser poblado con la marca de tiempo actual de la JVM solo durante la inserción de la entidad?",
        answer: "La anotación `@CreationTimestamp`.",
      },
      {
        prompt:
          "Hibernate soporta cuatro estrategias de herencia para entidades. Nombra dos de ellas.",
        answer:
          "Single table, Joined table, Table per class, y MappedSuperclass.",
      },
      {
        prompt:
          "En la estrategia de herencia `SINGLE_TABLE` de Hibernate, ¿qué se utiliza para diferenciar entre las distintas subclases en la única tabla?",
        answer: "Se utiliza una columna discriminadora.",
      },
      {
        prompt:
          "La estrategia de herencia de Hibernate donde la herencia es visible solo en el modelo de dominio y no se refleja en el esquema de la base de datos se implementa con la anotación _____.",
        answer: "`@MappedSuperclass`",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja de rendimiento de la estrategia de herencia `TABLE_PER_CLASS` en consultas polimórficas?",
        answer:
          "Requiere ejecutar una consulta `UNION` sobre todas las tablas de las subclases, lo cual puede ser ineficiente.",
      },
      {
        prompt:
          'En una asociación bidireccional `@OneToMany`, ¿qué atributo se utiliza en el lado "uno" para indicar que el otro lado es el propietario de la relación?',
        answer: "El atributo `mappedBy`.",
      },
      {
        prompt:
          "Para asegurar que al eliminar una entidad padre también se eliminen sus entidades hijas huérfanas en una colección, ¿qué atributo se debe configurar en la anotación `@OneToMany`?",
        answer: "Se debe configurar `orphanRemoval = true`.",
      },
      {
        prompt: "En JPA y Hibernate, ¿qué es el bloqueo optimista?",
        answer:
          "Es una estrategia de concurrencia que asume que los conflictos son raros y verifica si ha habido modificaciones por otra transacción antes de confirmar, usualmente mediante una columna de versión.",
      },
      {
        prompt:
          "¿Qué anotación se utiliza en un atributo de entidad para implementar el bloqueo optimista basado en versión en JPA?",
        answer: "La anotación `@Version`.",
      },
      {
        prompt:
          "¿Qué es el bloqueo pesimista en el contexto de bases de datos?",
        answer:
          "Es una estrategia donde se bloquea un recurso de datos (como una fila) cuando se lee, impidiendo que otras transacciones lo modifiquen hasta que la transacción actual lo libere.",
      },
      {
        prompt:
          "¿Para qué se utiliza la estrategia de generación de identificadores `SEQUENCE` en Hibernate?",
        answer:
          "Indica que se debe usar una secuencia de la base de datos para obtener los valores de la clave primaria.",
      },
      {
        prompt:
          "La estrategia de generación de identificadores `IDENTITY` tiene una desventaja importante en Hibernate. ¿Cuál es?",
        answer:
          "Deshabilita el procesamiento por lotes (batching) de JDBC para las sentencias `INSERT`.",
      },
      {
        prompt:
          "En HQL/JPQL, ¿qué cláusula se utiliza para cargar de forma anticipada (eagerly) una asociación junto con la entidad propietaria en una sola consulta?",
        answer: "La cláusula `JOIN FETCH`.",
      },
      {
        prompt:
          'El problema de rendimiento conocido como "N+1 query issue" ocurre comúnmente con las asociaciones de carga _____.',
        answer: "LAZY (perezosa)",
      },
      {
        prompt:
          "¿Qué interfaz de Hibernate se utiliza para implementar un tipo de dato personalizado que mapea una clase Java a una o más columnas de la base de datos?",
        answer: "La interfaz `UserType` o `CompositeUserType`.",
      },
      {
        prompt:
          "Para convertir automáticamente entre un tipo de atributo de entidad y un tipo de columna de base de datos, se puede implementar la interfaz _____ de Jakarta Persistence y usar la anotación `@Convert`.",
        answer: "`AttributeConverter`",
      },
      {
        prompt:
          "En Hibernate, ¿qué hace la anotación `@DynamicUpdate` en una entidad?",
        answer:
          "Hace que la sentencia SQL `UPDATE` generada por Hibernate incluya únicamente las columnas que han sido modificadas.",
      },
      {
        prompt:
          "¿Cuál es el propósito de la caché de segundo nivel (L2 Cache) en Hibernate?",
        answer:
          "Almacenar datos de entidades en un caché compartido por múltiples sesiones para reducir los accesos a la base de datos.",
      },
      {
        prompt:
          "Nombra una de las cuatro estrategias de concurrencia de caché de segundo nivel en Hibernate.",
        answer:
          "Las estrategias son: `READ_ONLY`, `READ_WRITE`, `NONSTRICT_READ_WRITE`, y `TRANSACTIONAL`.",
      },
      {
        prompt:
          "La estrategia de concurrencia de caché `TRANSACTIONAL` en Hibernate proporciona un nivel de aislamiento de transacción _____.",
        answer: "Serializable",
      },
      {
        prompt:
          "¿Para qué se utiliza la caché de consultas (Query Cache) en Hibernate?",
        answer:
          "Almacena los resultados de las consultas, incluyendo los identificadores de las entidades, para que ejecuciones posteriores de la misma consulta con los mismos parámetros puedan servirse desde el caché.",
      },
      {
        prompt:
          "En una aplicación de microservicios, el patrón _____ consiste en persistir el estado de un agregado como una secuencia de eventos inmutables.",
        answer: "Event Sourcing",
      },
      {
        prompt:
          "Según el teorema CAP, un sistema distribuido solo puede garantizar dos de las siguientes tres propiedades en presencia de una partición de red: consistencia, disponibilidad y _____.",
        answer: "Tolerancia a particiones (Partition Tolerance)",
      },
      {
        prompt:
          "El teorema PACELC extiende el teorema CAP. ¿Qué elección describe para el caso en que no hay partición de red (la 'E' de 'Else')?",
        answer: "Describe la elección entre Latencia (L) y Consistencia (C).",
      },
      {
        prompt:
          "El modelo de consistencia _____ garantiza que si no se realizan nuevas actualizaciones, todas las réplicas de un dato convergerán eventualmente al mismo valor.",
        answer: "Eventual (Eventual Consistency)",
      },
      {
        prompt:
          "¿Qué tipo de middleware, como PgBouncer o ProxySQL, se utiliza para gestionar las conexiones a la base de datos, optimizar consultas y proteger los servidores backend de la sobrecarga?",
        answer: "Un proxy de base de datos (database proxy).",
      },
      {
        prompt:
          "En el contexto de la agrupación de conexiones de PostgreSQL con PgBouncer, ¿qué es el modo de agrupación por transacción (transaction pooling)?",
        answer:
          "Un modo en el que una conexión al servidor de base de datos se devuelve al pool solo cuando el cliente completa una transacción (commit o rollback).",
      },
      {
        prompt: "Término: Sharding (Fragmentación)",
        answer:
          "Definición: Es una técnica de particionamiento horizontal de la base de datos que distribuye las filas de una tabla grande en múltiples servidores o bases de datos.",
      },
      {
        prompt:
          "En Hibernate, ¿cuál es el propósito de la anotación `@NaturalId`?",
        answer:
          "Marca un atributo o un conjunto de atributos como un identificador de negocio único y mutable, permitiendo una carga de entidades más eficiente por este identificador.",
      },
      {
        prompt: "¿Qué hace el método `entityManager.flush()` en JPA?",
        answer:
          "Sincroniza el contexto de persistencia con la base de datos subyacente, ejecutando las sentencias SQL para las operaciones encoladas (INSERT, UPDATE, DELETE).",
      },
      {
        prompt:
          "Un objeto entidad en JPA/Hibernate puede estar en uno de tres estados: nuevo/transitorio, persistente y _____.",
        answer: "Separado (detached)",
      },
      {
        prompt:
          "¿Qué método de JPA se utiliza para re-asociar una entidad en estado separado (detached) con el contexto de persistencia actual?",
        answer: "El método `merge()`.",
      },
      {
        prompt: "En HQL, la función `treat()` se utiliza para _____.",
        answer:
          "Reducir (downcast) el tipo de una variable de identificación en una jerarquía de herencia para acceder a los atributos de una subclase específica.",
      },
      {
        prompt:
          "¿Cuál es la diferencia fundamental en el modelo de datos entre MongoDB y Oracle?",
        answer:
          "MongoDB utiliza un modelo de documentos flexible (BSON/JSON) sin esquema, mientras que Oracle utiliza un modelo relacional rígido basado en tablas con esquemas fijos.",
      },
      {
        prompt:
          "En Hibernate Envers, ¿qué estrategia de auditoría almacena una revisión de inicio y una de fin para cada registro de auditoría, mejorando el rendimiento de las consultas?",
        answer: "La estrategia `ValidityAuditStrategy`.",
      },
      {
        prompt:
          "Para realizar operaciones de actualización o eliminación masivas en HQL o JPQL, ¿qué método de la interfaz `Query` se debe invocar?",
        answer: "El método `executeUpdate()`.",
      },
      {
        prompt:
          "En Hibernate, ¿qué hace la anotación `@OrderBy` cuando se aplica a una colección?",
        answer:
          "Especifica una cláusula `ORDER BY` de SQL para ordenar los elementos de la colección cuando se carga desde la base de datos.",
      },
      {
        prompt:
          "La anotación `@OrderColumn` en una colección de tipo `List` en Hibernate se utiliza para _____.",
        answer:
          "Persistir el índice de la lista en una columna dedicada de la base de datos, manteniendo el orden de la colección.",
      },
      {
        prompt:
          "Para manejar una asociación donde la clave foránea podría apuntar a un registro inexistente sin lanzar una excepción, Hibernate provee la anotación _____.",
        answer: "`@NotFound`",
      },
      {
        prompt:
          "Cuando se usa `@NotFound(action = NotFoundAction.IGNORE)` en una asociación `@ManyToOne`, ¿cómo trata Hibernate una clave foránea rota?",
        answer:
          "Trata la asociación como `null` en lugar de lanzar una excepción `FetchNotFoundException`.",
      },
      {
        prompt:
          "En Hibernate, ¿para qué se utiliza la anotación `@SQLRestriction` en una entidad o colección?",
        answer:
          "Para añadir una cláusula `WHERE` de SQL permanente a todas las consultas de carga para esa entidad o colección, útil para implementaciones de borrado lógico (soft delete).",
      },
      {
        prompt: "¿Qué es un `Embeddable` (o Componente) en JPA/Hibernate?",
        answer:
          "Es una clase cuyos atributos se mapean a columnas de la tabla de la entidad propietaria, permitiendo agrupar y reutilizar un conjunto de propiedades.",
      },
      {
        prompt:
          "Para mapear una clase `Embeddable` dentro de una entidad, se utiliza la anotación _____ en el atributo de la entidad.",
        answer: "`@Embedded`",
      },
      {
        prompt:
          "Si una entidad contiene múltiples instancias del mismo tipo `Embeddable`, ¿cómo se pueden anular los nombres de las columnas para evitar colisiones?",
        answer:
          "Se utiliza la anotación `@AttributeOverride` (o `@AttributeOverrides`) en cada atributo `@Embedded`.",
      },
      {
        prompt:
          "En HQL/JPQL, la función `type(p)` se utiliza en una consulta polimórfica para _____.",
        answer:
          "Restringir los resultados a entidades de un tipo específico dentro de una jerarquía de herencia.",
      },
      {
        prompt:
          "En el contexto multitenant de Hibernate, ¿qué anotación se utiliza en un campo de una entidad para indicar que almacenará el identificador del tenant?",
        answer: "La anotación `@TenantId`.",
      },
      {
        prompt:
          "Hibernate ofrece la capacidad de generar el metamodelo estático de JPA para su uso en Criteria API de tipo seguro. ¿Qué artefacto de Maven proporciona el procesador de anotaciones para esto?",
        answer: "El artefacto `org.hibernate.orm:hibernate-processor`.",
      },
      {
        prompt:
          "¿Qué optimizador de generador de secuencias de Hibernate es altamente recomendado para reducir los viajes de ida y vuelta a la base de datos al insertar múltiples entidades?",
        answer: "Los optimizadores `pooled` y `pooled-lo`.",
      },
      {
        prompt:
          "Al ejecutar una consulta nativa en JPA, ¿qué se debe hacer si la consulta devuelve columnas que no se mapean directamente a los campos de la entidad?",
        answer:
          "Se debe usar un `@SqlResultSetMapping` para definir cómo mapear las columnas del resultado a entidades o DTOs.",
      },
      {
        prompt:
          "¿Qué hace la propiedad de configuración de Hibernate `hibernate.format_sql` cuando se establece en `true`?",
        answer:
          "Formatea e indenta el SQL que se registra en la consola, haciéndolo más legible.",
      },
      {
        prompt:
          "La anotación `@Subselect` de Hibernate permite mapear una entidad a una consulta SQL inmutable, convirtiéndola en una entidad de solo _____.",
        answer: "Lectura (read-only)",
      },
      {
        prompt: "En Hibernate, ¿qué representa la interfaz `Session`?",
        answer:
          "Representa la interfaz principal para la interacción con la base de datos, gestionando el ciclo de vida de las entidades y las transacciones.",
      },
      {
        prompt:
          "La interfaz `EntityManager` de JPA es una abstracción estándar, mientras que la interfaz `Session` es la API nativa de _____.",
        answer: "Hibernate",
      },
      {
        prompt:
          "¿Cómo se puede obtener la `Session` nativa de Hibernate a partir de una instancia de `EntityManager` de JPA?",
        answer: "Usando el método `entityManager.unwrap(Session.class)`.",
      },
      {
        prompt:
          "En una asociación `@ManyToMany`, Hibernate por defecto crea una tabla de unión. ¿Qué anotación se utiliza para personalizar el nombre de esta tabla y sus columnas de clave foránea?",
        answer: "La anotación `@JoinTable`.",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre `CascadeType.PERSIST` y `CascadeType.MERGE`?",
        answer:
          "`PERSIST` propaga la operación de persistir a las entidades asociadas, mientras que `MERGE` propaga la operación de fusionar estados separados (detached).",
      },
      {
        prompt:
          'En el contexto de Oracle RAC, ¿qué significa la arquitectura "shared-everything"?',
        answer:
          "Significa que todos los nodos del clúster acceden al mismo conjunto de archivos de base de datos almacenados en un almacenamiento compartido.",
      },
      {
        prompt:
          "Para mejorar el rendimiento al procesar grandes conjuntos de resultados en Hibernate sin agotar la memoria, se puede usar `Session.scroll()` que aprovecha los _____ del lado del servidor.",
        answer: "Cursores (server-side cursors)",
      },
      {
        prompt:
          "En el contexto de colecciones en Hibernate, ¿qué semántica de colección se considera ineficiente para operaciones de actualización y eliminación, pudiendo llevar a eliminar y reinsertar todos los elementos?",
        answer:
          "La semántica de bolsa (bag), típicamente implementada con `java.util.List` sin un `@OrderColumn`.",
      },
      {
        prompt:
          "La anotación de Hibernate `@Immutable` en un atributo de entidad indica que _____.",
        answer:
          "Cualquier cambio en el valor de ese atributo será ignorado durante la detección de cambios (dirty checking) y no se persistirá.",
      },
      {
        prompt: "En Hibernate, ¿cuál es el propósito de un `Interceptor`?",
        answer:
          "Permite a la aplicación inspeccionar y/o manipular las propiedades de una entidad antes de que sea guardada, actualizada, eliminada o cargada.",
      },
      {
        prompt:
          "Para implementar un identificador compuesto en una entidad JPA, se puede usar la anotación `@EmbeddedId` o la anotación _____ junto con una clase de clave primaria.",
        answer: "`@IdClass`",
      },
      {
        prompt:
          "La propiedad de configuración `hibernate.jdbc.batch_size` controla el número máximo de sentencias que Hibernate agrupará antes de ejecutar el lote. ¿Qué valor la deshabilita?",
        answer: "Un valor de cero o un número negativo.",
      },
      {
        prompt: "En JPQL/HQL, ¿cómo se puede paginar un resultado de consulta?",
        answer:
          "Usando los métodos `setFirstResult()` para el desplazamiento y `setMaxResults()` para el límite de registros a devolver.",
      },
      {
        prompt:
          "La anotación `@ColumnDefault` en un atributo de entidad permite a Hibernate _____.",
        answer:
          "Generar la cláusula `DEFAULT` en la definición DDL de la columna, pero no afecta las sentencias `INSERT` a menos que se use `@DynamicInsert`.",
      },
      {
        prompt:
          "Para generar un valor en la base de datos tanto en inserciones como en actualizaciones (ej. una columna `last_modified`), ¿qué anotación de Hibernate es más apropiada que `@ColumnDefault`?",
        answer:
          "La anotación `@Generated` (o las más específicas `@UpdateTimestamp`).",
      },
      {
        prompt:
          '¿Qué es una "conversación" en el contexto de los patrones transaccionales de Hibernate?',
        answer:
          "Es una transacción a nivel de aplicación que abarca múltiples solicitudes de usuario y transacciones de base de datos, manteniendo el estado entre ellas.",
      },
      {
        prompt:
          "¿Qué opción de `OptimisticLockType` en Hibernate reduce el riesgo de excepciones de bloqueo al incluir solo las columnas modificadas en la cláusula `WHERE` del `UPDATE`?",
        answer: "La opción `OptimisticLockType.DIRTY`.",
      },
      {
        prompt:
          "En una consulta de Criterios (Criteria Query) de JPA, ¿qué representa el objeto `Root<T>`?",
        answer:
          "Representa una entidad raíz en la cláusula `FROM`, desde la cual se navega para acceder a los atributos de la entidad.",
      },
      {
        prompt:
          "En Hibernate, el modo de flush `AUTO` (por defecto) activa un flush antes de la ejecución de una consulta. ¿Por qué es esto necesario?",
        answer:
          "Para asegurar que la consulta opere sobre los datos más actuales, incluyendo los cambios pendientes en el contexto de persistencia.",
      },
      {
        prompt:
          '¿Qué es la "mejora de bytecode" (bytecode enhancement) en Hibernate?',
        answer:
          "Es un proceso en tiempo de compilación o carga que modifica el bytecode de las clases de entidad para implementar características como la carga perezosa de atributos básicos y el seguimiento de cambios eficiente (dirty tracking).",
      },
      {
        prompt:
          "La anotación `@Nationalized` en un atributo `String` indica a Hibernate que debe mapearlo a un tipo de columna de base de datos que soporte juegos de caracteres nacionalizados, como _____.",
        answer: "`NVARCHAR` o `NCLOB`",
      },
      {
        prompt:
          "¿Qué estrategia de `FetchMode` en Hibernate puede causar un producto cartesiano si se usa en múltiples asociaciones de tipo colección en una sola consulta?",
        answer: "La estrategia `FetchMode.JOIN`.",
      },
      {
        prompt:
          "La estrategia `FetchMode.SUBSELECT` en Hibernate es útil para evitar el problema N+1 en colecciones cargadas de forma perezosa. ¿Cómo funciona?",
        answer:
          "Ejecuta una segunda consulta SQL usando un `SUBSELECT` para recuperar todas las colecciones asociadas para todas las entidades cargadas en la consulta original.",
      },
      {
        prompt: "¿Qué representa un `EntityGraph` en JPA?",
        answer:
          "Define una plantilla para buscar un grafo de objetos, especificando qué asociaciones y atributos básicos deben ser cargados de forma anticipada (eager).",
      },
      {
        prompt:
          "Al usar un `EntityGraph`, ¿cuál es la diferencia entre un `fetch graph` y un `load graph`?",
        answer:
          "Un `fetch graph` trata los atributos especificados como EAGER y el resto como LAZY, mientras que un `load graph` trata los especificados como EAGER y el resto mantiene su configuración de carga estática.",
      },
      {
        prompt: "En HQL, ¿qué hace la función `coalesce(arg1, arg2, ...)`?",
        answer:
          "Devuelve el primer argumento que no es nulo de la lista de argumentos proporcionada.",
      },
      {
        prompt:
          'El concepto de "Polyglot Architecture" (Arquitectura Políglota) se refiere a la idea de construir sistemas utilizando múltiples _____ para elegir la mejor herramienta para cada tarea específica.',
        answer:
          "Tecnologías (incluyendo lenguajes de programación, bases de datos, etc.)",
      },
      {
        prompt: "En Hibernate, ¿qué son los `Dialect`?",
        answer:
          "Son clases que representan la variante específica de SQL de una base de datos, permitiendo a Hibernate generar SQL optimizado y compatible para ese motor.",
      },
      {
        prompt:
          "La anotación `@ManyToAny` de Hibernate se utiliza para emular una asociación de tipo _____ cuando las entidades objetivo pueden ser de múltiples tipos diferentes.",
        answer: "`@OneToMany`",
      },
      {
        prompt:
          "¿Qué tipo de excepción de JDBC indica una violación de alguna forma de restricción de integridad de la base de datos?",
        answer: "La excepción `ConstraintViolationException`.",
      },
      {
        prompt:
          "En Hibernate, ¿qué es un `DetachedCriteria` (ahora obsoleto) o una `SelectionSpecification`?",
        answer:
          "Es una forma de construir una consulta de manera programática y ejecutarla en una `Session` diferente de donde fue creada.",
      },
      {
        prompt:
          "La anotación `@Filter` de Hibernate permite definir cláusulas de filtro dinámicas que pueden ser habilitadas o deshabilitadas por sesión. ¿Cuál es su principal ventaja sobre `@SQLRestriction`?",
        answer:
          "Su principal ventaja es que los criterios de filtrado pueden ser parametrizados y personalizados en tiempo de ejecución.",
      },
      {
        prompt:
          "No es posible combinar la anotación de colección `@Filter` con la anotación `@Cache`. ¿Por qué existe esta limitación?",
        answer:
          "Porque la caché de segundo nivel almacena colecciones completas, y si se almacenara una colección filtrada (un subconjunto), otras sesiones la obtendrían incorrectamente sin el filtro activado.",
      },
      {
        prompt:
          "Para especificar que una consulta HQL/JPQL debe usar un tiempo de espera, se puede usar la sugerencia (hint) estándar de JPA _____.",
        answer: "`jakarta.persistence.query.timeout`",
      },
      {
        prompt:
          "En HQL, ¿qué operador se utiliza para verificar si un valor es igual a otro, tratando los valores nulos como iguales entre sí?",
        answer: "El operador `is not distinct from`.",
      },
      {
        prompt:
          "La anotación `@SoftDelete` de Hibernate simplifica la implementación del borrado lógico. ¿Qué hace internamente?",
        answer:
          "Combina una columna indicadora de borrado con una anotación `@SQLRestriction` para filtrar los registros marcados como eliminados.",
      },
      {
        prompt: "¿Qué es la arquitectura Oracle RAC?",
        answer:
          "Es una arquitectura de base de datos en clúster que permite que múltiples servidores accedan a una única base de datos compartida, proporcionando alta disponibilidad y escalabilidad.",
      },
      {
        prompt:
          "En Hibernate, la anotación `@Formula` permite definir un atributo de entidad de solo lectura cuyo valor se calcula mediante una expresión SQL. ¿Cuándo se evalúa esta expresión?",
        answer:
          "La expresión se evalúa cada vez que la entidad es recuperada de la base de datos.",
      },
      {
        prompt:
          "Para persistir colecciones de tipos básicos o embeddables, se utiliza la anotación _____.",
        answer: "`@ElementCollection`",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre `Query#getResultList()` y `Query#getSingleResult()` en JPA?",
        answer:
          "`getResultList()` devuelve una lista de resultados (posiblemente vacía), mientras que `getSingleResult()` espera exactamente un resultado y lanza una excepción si no hay ninguno o hay más de uno.",
      },
      {
        prompt:
          "En Hibernate, ¿para qué se utiliza la clase `Configuration` en el bootstrapping nativo (legacy)?",
        answer:
          "Se utilizaba para especificar las clases de entidad, los archivos de mapeo XML y las propiedades de configuración para construir un `SessionFactory`.",
      },
      {
        prompt: "¿Qué es una Consulta de Criterios (Criteria Query) en JPA?",
        answer:
          "Es una API programática y de tipo seguro para construir consultas de forma dinámica, como alternativa a escribir cadenas de texto JPQL.",
      },
      {
        prompt:
          "El modelo de consistencia _____ es el más fuerte, garantizando que cada operación de lectura devuelva el valor de la escritura más reciente.",
        answer: "Fuerte (Strong Consistency)",
      },
      {
        prompt: "En HQL, la cláusula `WITH` se utiliza para definir _____.",
        answer:
          "Expresiones de Tabla Comunes (Common Table Expressions o CTEs), que pueden ser recursivas.",
      },
    ],
  },
  {
    id: "rabbitmq",
    name: "Rabbitmq",
    cards: [
      {
        prompt:
          "¿Cuál es la abstracción arquitectónica central de Apache Kafka?",
        answer:
          "Un registro de confirmaciones (commit log) replicado y tolerante a fallos.",
      },
      {
        prompt:
          "¿Qué protocolo está diseñado para implementar RabbitMQ, proporcionando un enrutamiento de mensajes flexible y sofisticado?",
        answer: "El Protocolo Avanzado de Puesta en Cola de Mensajes (AMQP).",
      },
      {
        prompt: "¿Para qué tipo de entornos fue concebido principalmente NATS?",
        answer:
          "Entornos de computación nativos de la nube y de borde (edge computing) que demandan alta velocidad y simplicidad operativa.",
      },
      {
        prompt:
          'En la comparación entre Kafka, RabbitMQ y NATS, ¿cuál es descrito como una "plataforma de streaming distribuida"?',
        answer: "Apache Kafka.",
      },
      {
        prompt:
          "RabbitMQ opera como un intermediario inteligente, mientras que Kafka sigue un paradigma de _____, donde el consumidor es el inteligente.",
        answer: "intermediario tonto (dumb broker)",
      },
      {
        prompt:
          "A diferencia de Kafka que siempre es una plataforma de streaming duradera, NATS puede actuar como un bus de mensajes de latencia ultrabaja para comunicación _____ y como una plataforma de streaming duradera.",
        answer: "transitoria",
      },
      {
        prompt:
          "¿Cómo logra el entorno de ejecución de Erlang en RabbitMQ distribuir el trabajo entre todos los núcleos de CPU disponibles sin configuración manual?",
        answer:
          "Siempre que el número de colas, conexiones y canales exceda el número de núcleos.",
      },
      {
        prompt:
          'Término: Arquitectura de "nada compartido" (Shared-nothing) en Erlang.',
        answer:
          "Definición: Un modelo de procesos ligeros aislados que mejora la tolerancia a fallos, conteniendo el fallo de una conexión individual.",
      },
      {
        prompt:
          '¿Qué tipo de recolección de basura utiliza Erlang para minimizar las pausas globales de "detener el mundo" (stop-the-world) en RabbitMQ?',
        answer: "Recolección de basura por proceso.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia a nivel de protocolo entre AMQP 0-9-1 y AMQP 1.0?",
        answer:
          "AMQP 0-9-1 es un protocolo a nivel de aplicación que prescribe el comportamiento del bróker, mientras que AMQP 1.0 es un protocolo a nivel de transporte con menos requisitos semánticos.",
      },
      {
        prompt:
          "¿Cuántos procesos de Erlang requería el plugin de AMQP 1.0 en RabbitMQ 3.13 por sesión, en comparación con la implementación nativa en la versión 4.0?",
        answer:
          "Aproximadamente 15 procesos en la versión 3.13, reducido a un solo proceso en la versión 4.0.",
      },
      {
        prompt:
          "¿Qué mecanismo de control de flujo utiliza AMQP 0-9-1, que opera a nivel de canal?",
        answer: "El mecanismo de prefetch `basic.qos`.",
      },
      {
        prompt:
          "En AMQP 1.0, el control de flujo se implementa a nivel de enlace (link-level) a través de un sistema basado en _____, donde el receptor concede permiso al emisor para enviar mensajes.",
        answer: "créditos",
      },
      {
        prompt:
          "¿Qué tipo de exchange especializado en RabbitMQ utiliza un hash de la clave de enrutamiento para seleccionar exactamente una cola, asegurando el ordenamiento causal?",
        answer: "El Exchange de Hash Consistente (Consistent Hash Exchange).",
      },
      {
        prompt:
          "¿Qué sistema de almacenamiento de metadatos reemplazó a Mnesia en la serie RabbitMQ 4.x?",
        answer: "Khepri.",
      },
      {
        prompt:
          "¿Cuál era la principal debilidad de Mnesia como almacén de metadatos en RabbitMQ que llevaba a escenarios de cerebro dividido (split-brain)?",
        answer:
          "Su recuperación de fallos durante particiones de red, que asumía que se podían descartar datos de un lado de la partición.",
      },
      {
        prompt:
          "En entornos de contenedores como Kubernetes, ¿por qué se desaconseja usar un umbral de memoria relativo (`vm_memory_high_watermark`) para RabbitMQ?",
        answer: "Porque la detección de memoria puede ser poco fiable.",
      },
      {
        prompt:
          "¿Cuál es la práctica común para configurar el `disk_free_limit` en RabbitMQ en relación con la RAM total?",
        answer:
          "Establecerlo en 2.0 veces la RAM total para asegurar que el bróker pueda volcar toda su memoria a disco.",
      },
      {
        prompt:
          "En el modelo de datos de RabbitMQ, los mensajes son _____ (se eliminan después del consumo), mientras que en Kafka, el consumo es no destructivo a través del seguimiento de desplazamientos (offsets).",
        answer: "destructivos",
      },
      {
        prompt:
          "Tanto RabbitMQ 4.x (con Quorum Queues/Khepri) como Apache Kafka (con KRaft) utilizan _____ como su protocolo de alta disponibilidad (HA) para el consenso.",
        answer: "Raft",
      },
      {
        prompt:
          "¿Qué información, además de los metadatos, no se replica por defecto en todos los nodos de un clúster de RabbitMQ?",
        answer:
          "Las colas de mensajes, que residen en un solo nodo por defecto.",
      },
      {
        prompt:
          "¿Qué deben compartir dos nodos de RabbitMQ para poder comunicarse y formar un clúster?",
        answer: "El mismo secreto compartido llamado la cookie de Erlang.",
      },
      {
        prompt:
          "¿Qué permisos de archivo (en notación UNIX) debe tener el archivo de la cookie de Erlang por seguridad?",
        answer:
          "Debe ser accesible solo por el propietario (por ejemplo, permisos `600`).",
      },
      {
        prompt:
          "Cuando una herramienta CLI como `rabbitmqctl` falla la autenticación, una de las sugerencias comunes es un desajuste en el nombre de host o que la _____ no está configurada correctamente.",
        answer: "cookie",
      },
      {
        prompt:
          "¿Por qué se recomienda encarecidamente un número impar de nodos en un clúster de RabbitMQ?",
        answer:
          "Porque características como las colas de quórum requieren un consenso entre los miembros del clúster, lo cual necesita una mayoría clara.",
      },
      {
        prompt:
          "Durante un reinicio progresivo de un clúster, ¿qué comando de `rabbitmq-diagnostics` es adecuado como sondeo de salud porque no espera que un nodo esté completamente arrancado y sincronizado?",
        answer: "El comando `rabbitmq-diagnostics ping`.",
      },
      {
        prompt:
          "El plugin de _____ permite transmitir mensajes entre brókeres de RabbitMQ que pueden estar en diferentes dominios administrativos, versiones o centros de datos.",
        answer: "Federation",
      },
      {
        prompt:
          "¿Qué característica clave del plugin de Federation lo hace adecuado para redes de área amplia (WAN)?",
        answer:
          "Su comunicación es totalmente asíncrona y tolera bien la conectividad intermitente.",
      },
      {
        prompt:
          "Para configurar Federation en RabbitMQ, primero se deben definir uno o más _____ y luego se deben declarar una o más políticas que coincidan con los exchanges o colas a federar.",
        answer: "upstreams",
      },
      {
        prompt:
          "El modelo de entrega de mensajes de RabbitMQ es `push-based`, donde los mensajes se entregan a los consumidores a medida que están disponibles, a diferencia del modelo `pull-based` de Kafka. Verdadero o Falso?",
        answer: "Verdadero.",
      },
      {
        prompt:
          "En una comparación de rendimiento, Kafka generalmente ofrece mayor _____, mientras que RabbitMQ tiene menor _____ para mensajes individuales.",
        answer: "rendimiento (throughput) / latencia (latency)",
      },
      {
        prompt:
          "¿Qué característica de la UI de gestión de RabbitMQ permite exportar toda la configuración de tiempo de ejecución y topología (pero no los mensajes)?",
        answer: "La función de exportación/importación de topología.",
      },
      {
        prompt:
          "¿Qué componente de Prometheus está diseñado para escenarios donde el modelo de extracción (pull) no es factible, como en trabajos por lotes de corta duración?",
        answer: "El Pushgateway.",
      },
      {
        prompt: "Métrica de Canal RabbitMQ: `Unacknowledged message count`",
        answer:
          "Definición: El número de mensajes en tránsito, que ya han sido entregados a la aplicación consumidora pero aún no han sido confirmados (acknowledged).",
      },
      {
        prompt: "Métrica de Canal RabbitMQ: `Consumer prefetch`",
        answer:
          "Definición: El número máximo de mensajes en tránsito (no confirmados) para cada suscripción de consumidor.",
      },
      {
        prompt: "Métrica de Cola RabbitMQ: `Queue length`",
        answer:
          "Definición: El número total de mensajes en la cola, incluidos los mensajes no confirmados (unacknowledged).",
      },
      {
        prompt:
          "¿Qué archivo se genera cuando RabbitMQ se bloquea (crashea) y es crucial para la investigación post-mortem?",
        answer: "El archivo de volcado de memoria `erl_crash.dump`.",
      },
      {
        prompt:
          "¿Qué acción protectora toma RabbitMQ cuando su uso de memoria alcanza la `memory watermark`?",
        answer:
          "Activa una alarma de memoria, lo que bloquea a los publicadores y detiene el flujo de mensajes en el clúster.",
      },
      {
        prompt:
          "El valor por defecto de `vm_memory_high_watermark` en versiones antiguas de RabbitMQ era 0.4 (40%). ¿Por qué se consideró aumentarlo en la versión 4.0?",
        answer:
          "Porque el valor de 0.4 se consideraba demasiado conservador y un desperdicio de los recursos del sistema con las mejoras en Erlang y RabbitMQ.",
      },
      {
        prompt:
          "La arquitectura moderna de RabbitMQ aprovecha las colas de quórum con consenso _____ para una mayor fiabilidad.",
        answer: "Raft",
      },
      {
        prompt:
          "¿Qué dos elementos se replican automáticamente en todos los nodos de un clúster de RabbitMQ?",
        answer: "Hosts virtuales, exchanges, usuarios y permisos.",
      },
      {
        prompt: "¿Cuál es el propósito de un `Erlang cookie` en RabbitMQ?",
        answer:
          "Autenticar la comunicación entre los nodos del clúster y entre los nodos y las herramientas de línea de comandos (CLI).",
      },
      {
        prompt:
          "¿Qué comando de `rabbitmqctl` se utiliza para otorgar permisos a un usuario en un host virtual específico?",
        answer: "El comando `set_permissions`.",
      },
      {
        prompt:
          "Si un consumidor recibe un mensaje pero se desconecta antes de confirmarlo (acknowledging), ¿qué hará RabbitMQ con ese mensaje?",
        answer:
          "Lo considerará no entregado y lo volverá a entregar al siguiente consumidor suscrito disponible.",
      },
      {
        prompt:
          "Para que un mensaje sea persistente y sobreviva a un reinicio del bróker en RabbitMQ, ¿qué tres condiciones deben cumplirse?",
        answer:
          "Debe tener su modo de entrega establecido en 2 (persistente), ser publicado en un exchange duradero y llegar a una cola duradera.",
      },
      {
        prompt:
          "¿Qué significa poner un canal de RabbitMQ en modo de confirmación (confirm mode)?",
        answer:
          "Significa que el bróker confirmará la recepción de los mensajes publicados en ese canal, permitiendo al publicador verificar la entrega.",
      },
      {
        prompt:
          "Un nodo de RabbitMQ que almacena todos los metadatos (colas, exchanges, etc.) solo en RAM se llama un nodo _____, mientras que uno que también los guarda en disco se llama un nodo _____.",
        answer: "RAM / disco",
      },
      {
        prompt:
          "¿En qué escenario de uso es particularmente beneficioso usar nodos RAM en un clúster de RabbitMQ?",
        answer:
          "En escenarios con un uso intensivo de RPC, donde se crean y destruyen cientos de colas de respuesta por segundo.",
      },
      {
        prompt:
          "¿Qué argumento de declaración de cola se utiliza para crear una cola reflejada (mirrored queue) en todas las nodos del clúster?",
        answer: "El argumento `x-ha-policy` con el valor `all`.",
      },
      {
        prompt:
          "¿Qué herramienta se puede utilizar como balanceador de carga para distribuir conexiones de clientes entre los nodos de un clúster de RabbitMQ?",
        answer: "HAProxy.",
      },
      {
        prompt:
          "¿Qué componente del runtime de Erlang es responsable de resolver los nombres de los nodos en un host a un puerto de comunicación entre nodos?",
        answer: "epmd (Erlang Port Mapper Daemon).",
      },
      {
        prompt:
          "Por defecto, el runtime de Erlang iniciará un _____ por cada núcleo de CPU que detecte para asignar trabajo a los hilos del kernel.",
        answer: "planificador (scheduler)",
      },
      {
        prompt:
          "¿Qué significa el término `poison pill` en el contexto de las colas de mensajes?",
        answer:
          "Un mensaje que causa que un consumidor se bloquee o falle repetidamente, impidiendo el procesamiento de mensajes posteriores en la cola.",
      },
      {
        prompt:
          "En el control de flujo de AMQP 1.0, el campo _____ en la trama de flujo (flow frame) informa al consumidor cuántos mensajes están disponibles en la cola.",
        answer: "available",
      },
      {
        prompt:
          "Dentro de una conexión AMQP 1.0, un cliente puede iniciar múltiples _____, que son análogas a los canales en AMQP 0.9.1.",
        answer: "sesiones (sessions)",
      },
      {
        prompt:
          "¿Cuál es la principal filosofía arquitectónica de RabbitMQ en contraste con Kafka?",
        answer:
          "RabbitMQ es un bróker de mensajes versátil para distribución fiable de tareas y enrutamiento complejo, mientras que Kafka es un registro distribuido para streaming de datos masivos.",
      },
      {
        prompt:
          "¿Qué modo de consumo utilizan las `streams` de RabbitMQ que las diferencia de las colas tradicionales?",
        answer:
          "Permiten un consumo repetible (lecturas repetibles), similar al modelo de Kafka.",
      },
      {
        prompt:
          "Para filtrar mensajes en un `stream` de RabbitMQ del lado del servidor, se puede utilizar un filtro _____, mientras que del lado del cliente se puede aplicar un _____.",
        answer: "Bloom / post-filtro (postFilter)",
      },
      {
        prompt:
          "En las expresiones de filtro AMQP para streams de RabbitMQ, los campos no cualificados por defecto se refieren a las _____.",
        answer: "propiedades de la aplicación (application properties)",
      },
      {
        prompt:
          "¿Qué tres operadores lógicos son totalmente compatibles con las expresiones de filtro AMQP de RabbitMQ?",
        answer: "AND, OR, y NOT.",
      },
      {
        prompt:
          "¿Qué tipo de predicado lógico, que utiliza los comodines '%' y '_', es compatible con los filtros de stream de RabbitMQ?",
        answer: "El predicado `LIKE`.",
      },
      {
        prompt:
          "¿Qué efecto tiene configurar `+MMscs 1024` como argumento de la VM de Erlang para RabbitMQ?",
        answer:
          "Pre-asigna un bloque contiguo de memoria de 1 GiB al iniciar el nodo para reducir la fragmentación y la latencia de asignación.",
      },
      {
        prompt:
          "El límite por defecto del número de procesos de Erlang en un nodo RabbitMQ es de aproximadamente 1 millón. ¿Mediante qué variable de entorno se puede ajustar este límite?",
        answer: "`RABBITMQ_MAX_NUMBER_OF_PROCESSES`.",
      },
      {
        prompt:
          "En la salida de herramientas como `top`, ¿cómo se contabilizará típicamente el tiempo que los planificadores de Erlang pasan en espera activa (busy waiting)?",
        answer: "Como tiempo del sistema (system time).",
      },
      {
        prompt:
          "¿Qué es un `split-brain` en el contexto de sistemas distribuidos como RabbitMQ?",
        answer:
          "Es una condición en la que un sistema redundante (maestro/réplica) se divide debido a una falla de comunicación, y ambas partes creen que son el maestro al mismo tiempo.",
      },
      {
        prompt:
          "En RabbitMQ, ¿qué componente es responsable de registrar todos los datos que no son mensajes, como usuarios, permisos y definiciones de exchanges y colas?",
        answer: "El almacén de metadatos (metadata store).",
      },
      {
        prompt:
          "El patrón de desacoplamiento donde un mensaje se publica y el publicador no espera una respuesta se conoce como ____.",
        answer: "dispara y olvida (fire-and-forget)",
      },
      {
        prompt:
          "En un clúster de RabbitMQ, la declaración de un exchange o cola en un nodo hace que sus metadatos se repliquen y sean visibles desde _____ los nodos del clúster.",
        answer: "todos",
      },
      {
        prompt:
          "El patrón de Remote Procedure Call (RPC) sobre RabbitMQ requiere un mecanismo para que el servidor envíe una respuesta de vuelta al cliente. ¿Cómo se logra esto típicamente?",
        answer:
          "El cliente crea una cola de respuesta temporal y exclusiva, y pasa su nombre en la propiedad `reply_to` del mensaje de solicitud.",
      },
      {
        prompt: "Término: Exchange de tipo `fanout` en RabbitMQ.",
        answer:
          "Definición: Un exchange que enruta una copia de cada mensaje recibido a todas las colas que están vinculadas a él, ignorando la clave de enrutamiento.",
      },
      {
        prompt: "Término: Exchange de tipo `topic` en RabbitMQ.",
        answer:
          "Definición: Un exchange que enruta mensajes a colas basándose en una coincidencia de patrones entre la clave de enrutamiento del mensaje y el patrón de vinculación de la cola.",
      },
      {
        prompt:
          "¿Qué comando de la línea de comandos de RabbitMQ te permite ver el estado de los enlaces de federación en un nodo?",
        answer: "`rabbitmqctl federation_status`",
      },
      {
        prompt:
          "¿Qué sucede con un mensaje publicado en un exchange si no hay ninguna cola vinculada que coincida con su clave de enrutamiento?",
        answer: "El mensaje es descartado (desaparece).",
      },
      {
        prompt:
          "La UI de gestión de RabbitMQ se volverá más lenta a medida que aumente el número de conexiones, canales y colas debido a la sobrecarga de _____, filtrado y paginación de los resultados.",
        answer: "agregación",
      },
      {
        prompt:
          "¿Cuál es un efecto secundario desafortunado de la agregación de métricas de todos los nodos en la UI de gestión durante una partición de red?",
        answer:
          "La agregación puede expirar (timeout), haciendo que falten datos cruciales para diagnosticar el impacto de la partición.",
      },
      {
        prompt:
          "¿A qué se debe la mejora significativa de rendimiento de AMQP 1.0 nativo en RabbitMQ 4.0 en comparación con el antiguo enfoque de plugin?",
        answer:
          "Reduce la sobrecarga de ~15 procesos de Erlang a 1 por sesión, disminuyendo drásticamente el uso de memoria y CPU.",
      },
      {
        prompt:
          "El mecanismo de control de flujo basado en créditos de AMQP 1.0 permite que las aplicaciones consumidoras ajusten dinámicamente cuántos mensajes están dispuestas a recibir de colas específicas. ¿Qué tipo de mecanismo es este?",
        answer: 'Un mecanismo "pull-based".',
      },
      {
        prompt: '¿Qué significa que el consumo en RabbitMQ es "destructivo"?',
        answer:
          "Que una vez que un mensaje es consumido y confirmado por un consumidor, se elimina permanentemente de la cola.",
      },
      {
        prompt:
          "El consumo en Kafka es no destructivo y permite la relectura de mensajes. ¿Cómo logra esto un consumidor?",
        answer:
          "Haciendo un seguimiento de su posición en el registro (log) mediante un puntero llamado offset.",
      },
      {
        prompt:
          "Mientras que Kafka garantiza el orden de los mensajes por _____, RabbitMQ lo garantiza por _____.",
        answer: "partición / cola",
      },
      {
        prompt: "Término: Quorum Queues en RabbitMQ.",
        answer:
          "Definición: Un tipo de cola replicada moderna que utiliza el protocolo Raft para enfocarse en la seguridad de los datos y la alta disponibilidad.",
      },
      {
        prompt:
          "En una topología de clúster de RabbitMQ, ¿qué datos son replicados en todos los nodos por defecto?",
        answer:
          "Todos los datos y estados requeridos para la operación del bróker, como usuarios, vhosts, permisos, exchanges y políticas, con la excepción de los mensajes en las colas.",
      },
      {
        prompt:
          "Si el archivo de la cookie de Erlang se coloca incorrectamente o su valor no coincide entre nodos, ¿qué error de distribución de Erlang es probable que ocurra?",
        answer:
          "Un error de autenticación, a menudo con el mensaje `TCP connection succeeded but Erlang distribution failed`.",
      },
      {
        prompt:
          "En el plugin Federation de RabbitMQ, los enlaces pueden ser unidireccionales o bidireccionales y se configuran mediante _____ que definen cómo conectarse a otros nodos.",
        answer: "upstreams",
      },
      {
        prompt:
          "A diferencia de un clúster que requiere enlaces LAN fiables, el plugin _____ de RabbitMQ está diseñado para ser amigable con la WAN y tolerar conectividad intermitente.",
        answer: "Federation",
      },
      {
        prompt: "¿Qué son los `feature flags` en RabbitMQ?",
        answer:
          "Permiten a RabbitMQ coordinar cómo se despliegan las nuevas características introducidas durante y después de una actualización.",
      },
      {
        prompt:
          "Si la tasa de mensajes entrantes a una cola de RabbitMQ es consistentemente más alta que la tasa de mensajes salientes, ¿qué problema indica esto?",
        answer:
          "Que no hay consumidores conectados a la cola o que los consumidores no pueden mantener el ritmo de la carga.",
      },
      {
        prompt:
          "RabbitMQ utiliza el runtime de Erlang, que tiene un límite en el número de procesos ligeros. ¿Qué puede requerir un ajuste de este límite?",
        answer:
          "Un número particularmente alto de conexiones concurrentes o un número muy grande de colas.",
      },
      {
        prompt:
          "¿Qué opción de configuración del runtime de Erlang deshabilita la espera activa especulativa para reducir el uso de CPU en sistemas con recursos limitados?",
        answer: "`+sbwt none`.",
      },
    ],
  },
  {
    id: "spark2",
    name: "Spark2",
    cards: [
      {
        prompt: "¿Qué es Apache Spark?",
        answer:
          "Un motor de computación unificado y un conjunto de librerías para el procesamiento de datos en paralelo en clústeres de computadoras.",
      },
      {
        prompt: "¿Qué es un RDD (Resilient Distributed Dataset)?",
        answer:
          "Una colección de elementos distribuida, tolerante a fallos, que puede ser operada en paralelo.",
      },
      {
        prompt:
          "¿Cuáles son los dos tipos principales de operaciones en los RDDs?",
        answer: "Transformaciones y acciones.",
      },
      {
        prompt:
          "En Spark, una transformación que devuelve un nuevo RDD con un elemento por cada elemento de entrada es _____.",
        answer: "map()",
      },
      {
        prompt: "¿Qué hace la transformación `filter()` en un RDD?",
        answer:
          "Devuelve un nuevo RDD que contiene solo los elementos del RDD original que cumplen una condición.",
      },
      {
        prompt: "¿Cuál es la diferencia entre `map()` y `flatMap()`?",
        answer:
          "`flatMap()` puede producir múltiples elementos de salida por cada elemento de entrada, mientras que `map()` produce solo uno.",
      },
      {
        prompt: "¿Cuál es el propósito de una 'acción' en Spark?",
        answer:
          "Desencadenar el cálculo en un RDD y devolver un resultado al programa driver o escribirlo en un almacenamiento externo.",
      },
      {
        prompt:
          "¿Qué hace el método `persist()` o `cache()` en un RDD o DataFrame?",
        answer:
          "Solicita a Spark que mantenga el conjunto de datos en memoria (o en disco) a través de las operaciones para un acceso más rápido.",
      },
      {
        prompt: "Concepto: Pair RDD",
        answer:
          "Definición: Un RDD que contiene tuplas clave-valor, lo que permite operaciones especiales como `reduceByKey()` y `join()`.",
      },
      {
        prompt: "¿Qué hace la transformación `reduceByKey()` en un pair RDD?",
        answer:
          "Agrega los valores para cada clave usando una función asociativa y conmutativa.",
      },
      {
        prompt:
          "¿Cuál es la diferencia de rendimiento clave entre `reduceByKey` y `groupByKey`?",
        answer:
          "`reduceByKey` realiza una agregación parcial en cada nodo trabajador antes del 'shuffle', mientras que `groupByKey` transfiere todos los valores para una clave a un solo nodo.",
      },
      {
        prompt: "¿Qué es un 'schema' en el contexto de un DataFrame de Spark?",
        answer:
          "Una estructura que define los nombres de las columnas y sus tipos de datos.",
      },
      {
        prompt:
          "El principal punto de entrada para la funcionalidad de DataFrame y SQL en Spark 2.0 y superior es el objeto _____.",
        answer: "SparkSession",
      },
      {
        prompt:
          "¿Cómo se crea una vista temporal a partir de un DataFrame para poder consultarla con SQL?",
        answer: 'Usando el método `createOrReplaceTempView("nombre_vista")`.',
      },
      {
        prompt:
          "¿Cuáles son los dos tipos de transformaciones en Spark Streaming (DStreams)?",
        answer:
          "Transformaciones sin estado (stateless) y con estado (stateful).",
      },
      {
        prompt:
          "Un DStream (Discretized Stream) es una secuencia de _____ que llegan a lo largo del tiempo.",
        answer: "RDDs",
      },
      {
        prompt: "¿Cuál es el propósito del 'checkpointing' en Spark Streaming?",
        answer:
          "Guardar periódicamente el estado en un sistema de archivos fiable para permitir la recuperación tras un fallo del driver.",
      },
      {
        prompt: "Concepto: Transformación sin estado (Stateless)",
        answer:
          "Definición: Una transformación en streaming donde el procesamiento de cada lote no depende de los datos de lotes anteriores (ej: `map()`, `filter()`).",
      },
      {
        prompt: "Concepto: Transformación con estado (Stateful)",
        answer:
          "Definición: Una transformación en streaming que utiliza datos o estado intermedio de lotes anteriores para generar los resultados del lote actual (ej: `updateStateByKey()`).",
      },
      {
        prompt:
          "¿Qué función se utiliza para realizar operaciones sobre un intervalo de tiempo deslizante en un DStream?",
        answer: "La transformación `window()`.",
      },
      {
        prompt:
          "En MLlib, ¿qué objeto representa un punto de datos para algoritmos de aprendizaje supervisado, conteniendo características y una etiqueta?",
        answer: "Un objeto `LabeledPoint`.",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre un vector denso y un vector disperso (sparse) en MLlib?",
        answer:
          "Un vector denso almacena todos sus valores, mientras que un vector disperso almacena solo los valores no nulos y sus índices.",
      },
      {
        prompt: "¿Para qué se utiliza una variable de 'broadcast' en Spark?",
        answer:
          "Para enviar eficientemente una variable grande de solo lectura a todos los nodos de trabajo para su uso en una o más operaciones de Spark.",
      },
      {
        prompt: "¿Para qué se utiliza un 'acumulador' (accumulator) en Spark?",
        answer:
          "Para agregar valores de los nodos de trabajo de vuelta al programa driver de forma eficiente y tolerante a fallos, como contadores o sumas.",
      },
      {
        prompt:
          "¿En qué tipo de operación de Spark se deben usar los acumuladores para un conteo fiable y de valor absoluto?",
        answer:
          "Deben usarse dentro de una acción, como `foreach()`, para garantizar que la actualización de cada tarea se aplique solo una vez.",
      },
      {
        prompt:
          "¿Qué hace `coalesce()` y en qué se diferencia de `repartition()`?",
        answer:
          "`coalesce()` reduce el número de particiones y evita un 'shuffle' completo, mientras que `repartition()` puede aumentar o disminuir las particiones e siempre incurre en un 'shuffle' completo.",
      },
      {
        prompt: "¿Qué es una UDF (User-Defined Function) en Spark?",
        answer:
          "Una función creada por el usuario que se puede registrar y utilizar en consultas de Spark SQL o con DataFrames para realizar transformaciones personalizadas.",
      },
      {
        prompt: "¿Cuál es el propósito del optimizador Catalyst en Spark SQL?",
        answer:
          "Traducir las consultas de DataFrames, Datasets y SQL a un plan de ejecución físico optimizado que se ejecuta sobre RDDs.",
      },
      {
        prompt:
          "¿Qué es un 'cross-join' (o producto cartesiano) y por qué debe usarse con precaución?",
        answer:
          "Es una unión que combina cada fila de la tabla izquierda con cada fila de la tabla derecha, lo que puede provocar una explosión en el número de filas del resultado.",
      },
      {
        prompt:
          'Mencione dos de las seis fuentes de datos "centrales" soportadas por Spark.',
        answer: "CSV, JSON, Parquet, ORC, JDBC y archivos de texto.",
      },
      {
        prompt:
          "¿Para qué se utiliza la opción `inferSchema` al leer fuentes de datos como CSV?",
        answer:
          "Para que Spark analice automáticamente los datos y deduzca los tipos de datos de cada columna.",
      },
      {
        prompt:
          "¿Qué es el formato de archivo Parquet y por qué es popular en el ecosistema de big data?",
        answer:
          "Es un formato de almacenamiento columnar que es eficiente para consultas analíticas porque puede leer solo las columnas necesarias.",
      },
      {
        prompt: "En Structured Streaming, ¿qué es un 'output sink'?",
        answer:
          "Es el destino donde se escriben los resultados de una consulta de streaming, como un sistema de archivos, Kafka o una tabla en memoria.",
      },
      {
        prompt:
          "¿Qué significa el modo de salida 'complete' en Structured Streaming?",
        answer:
          "Que en cada disparo (trigger), se reescribe toda la tabla de resultados actualizada en el 'sink'.",
      },
      {
        prompt: "En Structured Streaming, ¿qué es un 'trigger' (disparador)?",
        answer:
          "Define cuándo se procesan los datos y se actualizan los resultados, por ejemplo, cada cierto intervalo de tiempo o tan pronto como lleguen nuevos datos.",
      },
      {
        prompt:
          "¿Qué es el 'event time' en el procesamiento de flujos y por qué es importante?",
        answer:
          "Es la marca de tiempo en la que ocurrió el evento en el sistema de origen, y es crucial para manejar datos desordenados o tardíos correctamente.",
      },
      {
        prompt:
          "¿Qué permite hacer la operación `mapGroupsWithState` en Structured Streaming?",
        answer:
          "Mantener y actualizar un estado arbitrario definido por el usuario para cada grupo (clave) en un flujo de datos.",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre aprendizaje supervisado y no supervisado?",
        answer:
          "El aprendizaje supervisado utiliza datos con etiquetas históricas para entrenar un modelo, mientras que el no supervisado encuentra patrones en datos sin etiquetas.",
      },
      {
        prompt:
          "En MLlib, el proceso de convertir datos brutos a una forma numérica adecuada para los algoritmos se llama _____.",
        answer: "ingeniería de características (feature engineering)",
      },
      {
        prompt: "¿Qué es un 'Pipeline' de Spark en el contexto de MLlib?",
        answer:
          "Una secuencia de etapas (Transformers y Estimators) que se ejecutan en orden para formar un flujo de trabajo de aprendizaje automático.",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre un `Transformer` y un `Estimator` en MLlib?",
        answer:
          "Un `Transformer` convierte un DataFrame en otro, mientras que un `Estimator` se ajusta (entrena) a un DataFrame para producir un `Transformer`.",
      },
      {
        prompt:
          "¿Para qué se utiliza el algoritmo PageRank en el análisis de grafos?",
        answer:
          "Para medir la importancia relativa de cada nodo (vértice) dentro de un grafo.",
      },
      {
        prompt:
          "¿Qué dos componentes se necesitan para crear un objeto GraphFrame?",
        answer:
          "Un DataFrame de vértices ('vertices') y un DataFrame de aristas ('edges').",
      },
      {
        prompt:
          "En la arquitectura de clúster de Spark, ¿cuál es el rol del 'programa driver'?",
        answer:
          "Aloja el objeto `SparkContext`, declara las transformaciones y acciones, y coordina la ejecución en los 'executors'.",
      },
      {
        prompt: "¿Cuál es el rol de un 'executor' en un clúster de Spark?",
        answer:
          "Es un proceso que se ejecuta en un nodo de trabajo, responsable de ejecutar las tareas y mantener los datos en memoria o en disco.",
      },
      {
        prompt:
          "Nombra dos gestores de clústeres sobre los que Spark puede ejecutarse.",
        answer: "Standalone, Apache Mesos y Hadoop YARN.",
      },
      {
        prompt: "¿Cuál es el propósito del script `spark-submit`?",
        answer: "Enviar una aplicación Spark para su ejecución en un clúster.",
      },
      {
        prompt: "¿Qué es un 'DAG' (Directed Acyclic Graph) en Spark?",
        answer:
          "Es un grafo de las operaciones (RDDs y sus transformaciones) que Spark construye. Las acciones desencadenan la ejecución de este grafo.",
      },
      {
        prompt: "¿Qué es una 'etapa' (stage) en el plan de ejecución de Spark?",
        answer:
          "Un conjunto de tareas que se pueden ejecutar en paralelo sin necesidad de una reorganización de datos ('shuffle').",
      },
      {
        prompt: "¿Qué es una 'tarea' (task) en Spark?",
        answer:
          "Es la unidad de trabajo más pequeña que se envía a un 'executor' para ser ejecutada, generalmente operando sobre una partición de datos.",
      },
      {
        prompt:
          "La operación `leftOuterJoin` combina dos RDDs de pares por clave, pero mantiene todas las claves de ¿cuál RDD?",
        answer: "Del RDD izquierdo (el que invoca la operación).",
      },
      {
        prompt:
          "¿Cuál es el propósito de la transformación `partitionBy` en un pair RDD?",
        answer:
          "Reparticionar el RDD según un particionador específico, como `HashPartitioner`, lo que puede optimizar operaciones futuras basadas en clave.",
      },
      {
        prompt:
          "Para crear un RDD clave-valor (pair RDD) a partir de un RDD regular en Python, la función `map` debe devolver un RDD compuesto de _____.",
        answer: "tuplas",
      },
      {
        prompt: "¿Qué es el objeto `SparkContext`?",
        answer:
          "Es el punto de entrada principal a la funcionalidad de Spark y representa la conexión con un clúster de Spark.",
      },
      {
        prompt:
          "¿Para qué se utiliza el método `SparkContext.wholeTextFiles()`?",
        answer:
          "Para leer un directorio que contiene múltiples archivos de texto pequeños y devolver un RDD de pares donde la clave es la ruta del archivo.",
      },
      {
        prompt: "¿Qué es un SequenceFile en el ecosistema Hadoop?",
        answer:
          "Un formato de archivo plano que consiste en pares binarios clave-valor.",
      },
      {
        prompt:
          "Spark SQL puede conectarse a una instalación existente de Hive colocando qué archivo de configuración en el directorio `conf` de Spark?",
        answer: "El archivo `hive-site.xml`.",
      },
      {
        prompt:
          "En Spark SQL, un `Row` object permite el acceso a las columnas por número de columna y, en Python, también por _____.",
        answer: "nombre de columna (ej: `row.column_name`)",
      },
      {
        prompt:
          "¿Cuál es el propósito de la operación `updateStateByKey` en DStreams?",
        answer:
          "Mantener y actualizar un estado para cada clave a lo largo del tiempo en un DStream de pares clave-valor.",
      },
      {
        prompt: "¿Qué hace un transformador `HashingTF` en MLlib?",
        answer:
          "Mapea una secuencia de términos (palabras) a un vector de características de frecuencia de términos con un tamaño fijo.",
      },
      {
        prompt: "¿Qué hace el método `pipe()` en un RDD?",
        answer:
          "Permite canalizar elementos del RDD a un proceso de sistema externo (como un script de R o Perl) que se ejecuta en cada partición.",
      },
      {
        prompt:
          "¿Qué hace la acción `collect()`, y cuál es un problema potencial al usarla?",
        answer:
          "Recupera todos los elementos del conjunto de datos como un array en el programa driver, lo que puede causar un error de memoria si el conjunto de datos es muy grande.",
      },
      {
        prompt:
          "¿Qué método permite obtener una muestra aleatoria de filas de un DataFrame?",
        answer: "El método `sample()`.",
      },
      {
        prompt:
          "Al trabajar con datos numéricos en un DataFrame, ¿qué función calcula la correlación entre dos columnas?",
        answer: "La función `corr()`.",
      },
      {
        prompt: "¿Qué hace la operación `pivot` en un DataFrame?",
        answer:
          "Convierte una fila en una columna, agregando valores según una función para cada nueva columna.",
      },
      {
        prompt:
          "En Spark SQL, una diferencia clave entre una tabla y una vista es que las vistas son básicamente _____ que se pueden consultar con SQL.",
        answer: "DataFrames",
      },
      {
        prompt: "¿Qué significa que una subconsulta sea 'correlacionada'?",
        answer:
          "Significa que la subconsulta interna utiliza información del ámbito externo de la consulta.",
      },
      {
        prompt: "¿Cuál es el propósito del método `checkpoint()` en un RDD?",
        answer:
          "Marca el RDD para ser guardado en un archivo en un almacenamiento fiable, truncando su linaje para acortar la cadena de dependencias.",
      },
      {
        prompt:
          "En un despliegue sobre YARN, ¿cuáles son los dos modos de despliegue para una aplicación Spark?",
        answer: "Modo clúster (cluster mode) y modo cliente (client mode).",
      },
      {
        prompt:
          "¿Qué es un 'servicio de shuffle externo' y qué beneficio proporciona?",
        answer:
          "Permite almacenar los bloques de 'shuffle' fuera de los 'executors', de modo que los resultados del 'shuffle' estén disponibles incluso si los 'executors' son eliminados.",
      },
      {
        prompt:
          "¿Cuál es una causa común de un error `OutOfMemoryError` en el driver de Spark?",
        answer: "Recolectar demasiados datos en el driver usando `collect()`.",
      },
      {
        prompt:
          "¿Cuál es la ventaja del procesamiento de flujos sobre trabajos por lotes repetidos para actualizar resultados?",
        answer:
          "El procesamiento de flujos puede ser más eficiente al incrementalizar el cálculo, procesando solo los datos nuevos en lugar de volver a escanear todo el conjunto de datos.",
      },
      {
        prompt:
          "En MLlib, ¿cuál es un caso de uso común para los algoritmos de 'recomendación'?",
        answer:
          "Sugerir productos o ítems a los usuarios basándose en sus preferencias explícitas (calificaciones) o implícitas (comportamiento).",
      },
      {
        prompt:
          "¿Cuál es un caso de uso común para los algoritmos de 'clustering'?",
        answer:
          "La segmentación de usuarios, agrupándolos según atributos o comportamientos compartidos.",
      },
      {
        prompt: "En MLlib, ¿qué hace un transformador `Normalizer`?",
        answer:
          "Escala los vectores de características individuales para que tengan una norma unitaria (por defecto, la norma L2).",
      },
      {
        prompt:
          "¿Cuál es el propósito de `SQLTransformer` en una Pipeline de ML?",
        answer:
          "Permite aplicar una transformación definida por el usuario mediante una consulta SQL sobre los datos de entrada.",
      },
      {
        prompt:
          "¿Cuál es el propósito de la 'indexación' de características categóricas en aprendizaje automático?",
        answer:
          "Convertir una variable categórica (como una cadena de texto) en una variable numérica que los algoritmos puedan utilizar.",
      },
      {
        prompt:
          "En el algoritmo ALS para recomendación, ¿qué es la 'estrategia de arranque en frío' (cold-start strategy)?",
        answer:
          "Define cómo manejar las predicciones para usuarios o ítems que no estaban presentes en el conjunto de entrenamiento.",
      },
      {
        prompt:
          "¿Qué identifica el algoritmo `connectedComponents` en GraphFrames?",
        answer:
          "Los subgrafos en los que cualquier par de nodos está conectado entre sí por caminos.",
      },
      {
        prompt:
          "El método `cache()` en un DataFrame es un atajo para usar `persist()` con ¿qué nivel de almacenamiento?",
        answer: "MEMORY_AND_DISK.",
      },
      {
        prompt: "¿Qué es la 'evaluación perezosa' (lazy evaluation) en Spark?",
        answer:
          "Es el principio por el cual Spark no ejecuta las transformaciones hasta que se invoca una acción, lo que le permite optimizar el plan de ejecución.",
      },
      {
        prompt:
          "Almacenar en caché objetos serializados (`MEMORY_ONLY_SER`) puede reducir sustancialmente el tiempo dedicado a _____ en la JVM.",
        answer: "la recolección de basura (garbage collection)",
      },
      {
        prompt:
          "¿Cuál es el propósito de la transformación `window` en Spark Streaming?",
        answer:
          "Permite aplicar transformaciones sobre una ventana deslizante de datos, agrupando eventos que ocurren dentro de un intervalo de tiempo.",
      },
      {
        prompt:
          "El algoritmo k-means es un tipo de algoritmo de aprendizaje _____.",
        answer: "no supervisado (clustering)",
      },
      {
        prompt:
          "¿Qué hace la función `explode` en Spark SQL y en la API de DataFrame?",
        answer:
          "Crea una nueva fila por cada elemento en un array o mapa de una columna.",
      },
      {
        prompt:
          "¿Cuál es el propósito de la clase `StorageLevel` al persistir un RDD?",
        answer:
          "Permite especificar cómo se debe almacenar el RDD, por ejemplo, solo en memoria, en memoria y disco, serializado, etc.",
      },
      {
        prompt: "¿Qué hace la acción `collectAsMap()` en un pair RDD?",
        answer:
          "Devuelve los pares clave-valor del RDD como un mapa al programa driver.",
      },
      {
        prompt:
          "En la API estructurada, ¿cómo se añade una nueva columna a un DataFrame?",
        answer:
          'Usando el método `withColumn("nuevo_nombre", expresion_columna)`.',
      },
      {
        prompt: "¿Qué hace la transformación `orderBy()` (o `sort()`)?",
        answer:
          "Devuelve un nuevo DataFrame con las filas ordenadas por una o más columnas especificadas.",
      },
      {
        prompt:
          "¿Para qué se utiliza la función `avg` en una agregación de DataFrame?",
        answer:
          "Para calcular el promedio (media) de los valores en una columna.",
      },
      {
        prompt: "¿Cuál es el propósito de un 'equi-join'?",
        answer:
          "Es el tipo de unión más común, donde las filas se combinan si los valores de las claves especificadas en ambos conjuntos de datos son iguales.",
      },
      {
        prompt: "¿Qué hace el modo de salida 'append' en Structured Streaming?",
        answer:
          "Solo las nuevas filas añadidas a la tabla de resultados desde el último disparo se escriben en el 'sink'.",
      },
      {
        prompt:
          "Un _____ define los nombres de las columnas y los tipos de un DataFrame.",
        answer: "esquema (schema)",
      },
      {
        prompt:
          "¿Cuál es la diferencia clave entre un DataFrame y un Dataset en Spark?",
        answer:
          "Los Datasets proporcionan seguridad de tipos en tiempo de compilación (type-safety) y una vista orientada a objetos de los datos, mientras que los DataFrames no.",
      },
      {
        prompt:
          "Para crear una función definida por el usuario (UDF) en PySpark, se importa `udf` desde ¿qué módulo?",
        answer: "pyspark.sql.functions",
      },
      {
        prompt:
          "¿Qué transformación se utiliza para convertir un RDD en un DataFrame?",
        answer: "El método `toDF()`.",
      },
      {
        prompt:
          "En Spark Streaming, la tolerancia a fallos se logra recalculando el estado a partir del _____ de los RDDs.",
        answer: "linaje (lineage)",
      },
      {
        prompt:
          "En MLlib, el problema que resuelve la regresión logística es un problema de _____.",
        answer: "clasificación",
      },
    ],
  },
  {
    id: "spark_kafka_kubernetes",
    name: "Spark Kafka Kubernetes",
    cards: [
      {
        prompt:
          "¿Qué comando se utiliza para solucionar el problema de arranque de Liberica NIK en macOS Catalina y versiones posteriores?",
        answer:
          "Se ejecuta `sudo xattr -r -d com.apple.quarantine path/to/graalvm/folder/`.",
      },
      {
        prompt:
          "Según la documentación de Bitnami, ¿cuál es el tiempo de respuesta objetivo para las preguntas en sus proyectos de GitHub en días laborables?",
        answer:
          "El equipo de soporte de Bitnami intenta responder cualquier pregunta recibida en un plazo de 24 horas en días laborables.",
      },
      {
        prompt:
          "En un Dockerfile, ¿qué instrucción se recomienda para las imágenes base para mantener un tamaño reducido, como en el caso de la imagen Alpine?",
        answer:
          "La instrucción `FROM`, utilizando imágenes oficiales actuales y pequeñas como Alpine, que tiene menos de 6 MB.",
      },
      {
        prompt:
          "Para excluir archivos no relevantes para la compilación de Docker sin reestructurar el repositorio de origen, se utiliza un archivo ____.",
        answer: ".dockerignore",
      },
      {
        prompt: "En Docker, ¿qué significa que un contenedor debe ser efímero?",
        answer:
          "Significa que el contenedor puede ser detenido, destruido, reconstruido y reemplazado con una configuración y preparación mínimas.",
      },
      {
        prompt:
          "Para asegurar que se utiliza la versión más reciente de una imagen base al construir una imagen de Docker, se puede usar el flag ____.",
        answer: "--pull",
      },
      {
        prompt:
          "En el contexto de Kafka en Kubernetes, ¿cuál es el factor de replicación estándar recomendado para la producción?",
        answer: "Un factor de replicación de 3 es el estándar para producción.",
      },
      {
        prompt:
          "El parámetro `min.insync.replicas` en Kafka define el número mínimo de réplicas que deben confirmar una escritura para que se considere ____.",
        answer: "exitosa",
      },
      {
        prompt:
          "¿Qué herramienta de línea de comandos se utiliza para crear clústeres en Amazon EKS según la guía de AWS?",
        answer: "La herramienta `eksctl`.",
      },
      {
        prompt:
          "En el Dockerfile de ejemplo de AWS para un microservicio Java, ¿qué imagen base de BellSoft se utiliza?",
        answer:
          "La imagen base utilizada es `bellsoft/liberica-openjdk-alpine-musl:17`.",
      },
      {
        prompt:
          "¿Cuál es la mejor práctica para los registros de imágenes en un entorno de producción de Kubernetes para mejorar la seguridad y el control?",
        answer:
          "Utilizar un registro de imágenes privado en lugar de uno público.",
      },
      {
        prompt:
          "Para garantizar la integridad de las imágenes de contenedor en Kubernetes, ¿qué proceso se debe implementar?",
        answer:
          "Se debe implementar la firma y verificación de imágenes utilizando herramientas como Notary o Docker Content Trust (DCT).",
      },
      {
        prompt:
          "En la arquitectura de Kubernetes, ¿cuál es el componente responsable de asegurar que los contenedores se estén ejecutando en un Pod y de comunicarse con el API server?",
        answer: "El Kubelet.",
      },
      {
        prompt:
          "Kubernetes puede exponer un contenedor usando un nombre DNS o su propia dirección IP y, si el tráfico es alto, puede distribuir el tráfico de red. Esta característica se conoce como _____.",
        answer: "Balanceo de carga (Load Balancing)",
      },
      {
        prompt:
          "¿Qué propiedad de configuración de Spark se utiliza para especificar la imagen de contenedor a usar para la aplicación Spark en Kubernetes?",
        answer: "La propiedad `spark.kubernetes.container.image`.",
      },
      {
        prompt:
          "¿Qué comando de `kubectl` se utiliza para crear un nuevo namespace en Kubernetes?",
        answer: "`kubectl create namespace <nombre-del-namespace>`.",
      },
      {
        prompt:
          "¿Qué opción de la JVM permite especificar exactamente cuántos núcleos de CPU debe usar la JVM, independientemente de la detección de contenedores?",
        answer: "La opción `-XX:ActiveProcessorCount`.",
      },
      {
        prompt:
          "Para deshabilitar completamente el soporte de detección de contenedores en OpenJDK, se debe utilizar la opción de la JVM ____.",
        answer: "-XX:-UseContainerSupport",
      },
      {
        prompt:
          "El patrón de diseño en Kubernetes que consiste en un contenedor secundario que se ejecuta en el mismo Pod que la aplicación principal para proporcionar funcionalidades de soporte se llama _____.",
        answer: "patrón sidecar (sidecar pattern)",
      },
      {
        prompt:
          "En el patrón sidecar, ¿qué recurso de Kubernetes comparten el contenedor de la aplicación principal y el contenedor sidecar?",
        answer:
          "Comparten el mismo Pod y, por lo tanto, el mismo espacio de red y volúmenes.",
      },
      {
        prompt:
          "Para monitorear contenedores sidecar, se recomienda rastrear métricas a nivel de Pod, como el consumo de CPU y memoria, y un alto número de ____, que a menudo señala un error de configuración.",
        answer: "reinicios (restart count)",
      },
      {
        prompt:
          "Según el video de Java Techie, ¿cuál es una de las principales ventajas del patrón sidecar en un entorno políglota?",
        answer:
          "El servicio principal no necesita saber en qué lenguaje está escrito el servicio sidecar, lo que permite flexibilidad y versatilidad.",
      },
      {
        prompt:
          "En el ejemplo del video de Java Techie, ¿qué herramienta de orquestación se utiliza para ejecutar los contenedores del servicio principal y del sidecar en un único pod?",
        answer: "Se utiliza Kubernetes.",
      },
      {
        prompt:
          "Las compilaciones de Docker de varias etapas (multi-stage builds) permiten separar el entorno de compilación del entorno de ____.",
        answer: "ejecución (runtime)",
      },
      {
        prompt:
          "En un Dockerfile de varias etapas, ¿cómo se copia un artefacto de una etapa anterior a la etapa actual?",
        answer:
          "Se utiliza la instrucción `COPY --from=<nombre-o-indice-de-la-etapa> <origen> <destino>`.",
      },
      {
        prompt:
          "¿Qué propiedad de configuración de Spark se utiliza para especificar el namespace de Kubernetes para ejecutar los pods del driver y los ejecutores?",
        answer: "La propiedad `spark.kubernetes.namespace`.",
      },
      {
        prompt:
          "En Confluent, ¿qué biblioteca de Spring se utiliza para la integración con clientes estándar de Kafka y la API de Kafka Streams?",
        answer: "La biblioteca Spring for Apache Kafka.",
      },
      {
        prompt:
          "En un entorno de microservicios gestionado con GitOps, ¿cómo se revierte un despliegue fallido para volver a un estado funcional?",
        answer:
          "Se revierte el commit anterior en el repositorio de Git, lo que desencadena el proceso de GitOps para aplicar el estado anterior.",
      },
      {
        prompt:
          "En Strimzi, ¿qué tipo de almacenamiento se debe configurar en el recurso `Kafka` para utilizar volúmenes persistentes locales vinculados a un nodo específico?",
        answer:
          "Se deben usar Volúmenes Persistentes Locales (Local Persistent Volumes), que se configuran a través de una `StorageClass` y se especifican con `type: persistent-claim` en Strimzi.",
      },
      {
        prompt:
          "¿Qué tipo de almacenamiento en Strimzi es temporal y se pierde en cada actualización continua (rolling update)?",
        answer: "El almacenamiento de tipo `ephemeral`.",
      },
      {
        prompt:
          "Un error común en Kubernetes donde un pod se reinicia repetidamente en un bucle se conoce como _____.",
        answer: "CrashLoopBackOff",
      },
      {
        prompt:
          "Comando `kubectl` para obtener información detallada de un pod, incluyendo eventos recientes:",
        answer: "`kubectl describe pod <nombre-del-pod>`.",
      },
      {
        prompt:
          "En Kubernetes, ¿qué tipo de sonda (probe) se utiliza para verificar si un contenedor está listo para aceptar tráfico?",
        answer: "Sonda de preparación (Readiness Probe).",
      },
      {
        prompt:
          "Si una sonda de actividad (Liveness Probe) falla repetidamente, ¿qué acción toma Kubernetes?",
        answer: "Kubernetes reinicia el contenedor.",
      },
      {
        prompt:
          "La sonda de _____ se utiliza en Kubernetes para dar tiempo adicional a los contenedores para completar su lógica de inicio antes de que las otras sondas comiencen.",
        answer: "arranque (Startup Probe)",
      },
      {
        prompt:
          "En Strimzi, ¿qué recurso personalizado se utiliza para gestionar clústeres de Kafka?",
        answer: "El recurso personalizado `Kafka` (`kind: Kafka`).",
      },
      {
        prompt:
          "Para configurar el número de nodos de bróker en un clúster de Kafka con Strimzi, se modifica la propiedad _____.",
        answer: "`spec.kafka.replicas`",
      },
      {
        prompt:
          "En Strimzi, ¿cómo se habilita la exportación de métricas de Prometheus para los brókeres de Kafka?",
        answer:
          "Configurando la propiedad `spec.kafka.metrics` en el recurso `Kafka`, por ejemplo, asignándole un objeto vacío `{}`.",
      },
      {
        prompt:
          "La propiedad `rack.topologyKey` en la configuración de Kafka en Strimzi se usa para habilitar la _____.",
        answer: "conciencia de rack (rack awareness)",
      },
      {
        prompt:
          "Para gestionar usuarios de Kafka de forma declarativa con Strimzi, se utiliza el recurso personalizado _____.",
        answer: "`KafkaUser`",
      },
      {
        prompt:
          "El operador de Strimzi que gestiona temas de Kafka a través de recursos `KafkaTopic` se llama ____.",
        answer: "Topic Operator",
      },
      {
        prompt:
          "En Helm, ¿qué comando se utiliza para aplicar actualizaciones a una release existente?",
        answer: "`helm upgrade`.",
      },
      {
        prompt:
          "Para pasar un archivo de valores de configuración al instalar o actualizar un chart de Helm, se usa el flag ____.",
        answer: "`--values` o `-f`",
      },
      {
        prompt:
          "La práctica de revisar las diferencias en los manifiestos renderizados antes de aplicar un cambio en un chart de Helm se conoce como ____.",
        answer: "diffing (hacer un diff)",
      },
      {
        prompt:
          "Para evitar cambios inesperados en las imágenes base de Docker, es una buena práctica usar etiquetas ____ en lugar de `latest`.",
        answer: "específicas y estables (specific and stable tags)",
      },
      {
        prompt:
          "En Kubernetes, la unidad de despliegue más pequeña y simple es el ____, que puede contener uno o más contenedores.",
        answer: "Pod",
      },
      {
        prompt:
          "¿Cuál es la función del Kube-proxy en un nodo trabajador de Kubernetes?",
        answer:
          "Mantiene las reglas de red en los nodos, permitiendo la comunicación de red hacia los Pods desde dentro o fuera del clúster.",
      },
      {
        prompt:
          "El proceso de empaquetar una aplicación con todas sus librerías y configuraciones necesarias se conoce como _____.",
        answer: "Contenerización",
      },
      {
        prompt:
          "En Docker, la instrucción _____ y _____ son funcionalmente similares, pero la segunda soporta la obtención de archivos desde URLs remotas y la extracción automática de archivos tar.",
        answer: "`COPY` y `ADD`",
      },
      {
        prompt:
          "¿Cuál es el propósito de los `labels` en los objetos de Kubernetes?",
        answer:
          "Ayudan a organizar y seleccionar subconjuntos de objetos, como Pods, para diversas operaciones.",
      },
      {
        prompt:
          "En el contexto de la seguridad de contenedores, ¿qué principio se cumple al ejecutar contenedores como usuarios no root por defecto?",
        answer:
          "El principio de mínimo privilegio (principle of least privilege).",
      },
      {
        prompt:
          "En el ecosistema de Big Data, Kafka logra la escalabilidad horizontal dividiendo los temas en múltiples ____.",
        answer: "particiones",
      },
      {
        prompt:
          "Si la opción `unclean.leader.election.enable` en Kafka se establece en `false`, se previene la pérdida de datos a costa de la ____.",
        answer: "disponibilidad",
      },
      {
        prompt:
          "¿Qué utilidad de AWS distribuye automáticamente el tráfico entrante a través de múltiples destinos como instancias EC2 o contenedores?",
        answer: "Elastic Load Balancing (ELB).",
      },
      {
        prompt:
          "En un Dockerfile para una aplicación Java, ¿qué instrucción expone un puerto del contenedor?",
        answer: "La instrucción `EXPOSE`.",
      },
      {
        prompt:
          "Para asegurar que las configuraciones del clúster sean inmutables, los charts de Helm de Bitnami montan los archivos de configuración como ____ de solo lectura.",
        answer: "ConfigMaps",
      },
      {
        prompt:
          "El motor de análisis unificado de código abierto diseñado para el procesamiento de datos a gran escala, tanto en batch como en streaming, es _____.",
        answer: "Apache Spark",
      },
      {
        prompt:
          "En Kubernetes, el componente del plano de control responsable de mantener el estado deseado del clúster se conoce como el _____.",
        answer: "Nodo maestro (Master Node)",
      },
      {
        prompt:
          "La característica de Kubernetes que reinicia automáticamente contenedores fallidos y los reemplaza o reprograma se llama _____.",
        answer: "Autoreparación (Self-Healing)",
      },
      {
        prompt:
          "Para gestionar información sensible como contraseñas y tokens OAuth en Kubernetes, se utiliza el objeto ____.",
        answer: "Secret",
      },
      {
        prompt:
          "En Java, ¿qué opciones de la JVM establecen el tamaño del heap como un porcentaje de la memoria disponible del contenedor?",
        answer:
          "`-XX:InitialRAMPercentage`, `-XX:MaxRAMPercentage`, y `-XX:MinRAMPercentage`.",
      },
      {
        prompt:
          "Cuando tanto `-Xmx` como `-XX:MaxRAMPercentage` están configurados para la JVM, ¿cuál de ellos tiene precedencia?",
        answer: "La opción `-Xmx` (y `-Xms`) tiene precedencia.",
      },
      {
        prompt:
          "Un beneficio clave del patrón sidecar es que permite actualizar o reemplazar los componentes auxiliares de forma ____ a la aplicación principal.",
        answer: "independiente",
      },
      {
        prompt:
          "Para definir un contenedor sidecar en el YAML de un Pod de Kubernetes, simplemente se añade otro contenedor en el array ____.",
        answer: "`spec.containers`",
      },
      {
        prompt:
          "En un Dockerfile, ¿para qué se utiliza la instrucción `WORKDIR`?",
        answer:
          "Establece el directorio de trabajo para cualquier instrucción `RUN`, `CMD`, `ENTRYPOINT`, `COPY` y `ADD` que le siga.",
      },
      {
        prompt:
          "El error `ImagePullBackOff` en Kubernetes indica que el clúster no puede ____ la imagen del contenedor desde el registro.",
        answer: "descargar (pull)",
      },
      {
        prompt:
          "En Strimzi, ¿qué propiedad se utiliza dentro de la configuración de un listener para restringir el acceso a nivel de red a aplicaciones o namespaces seleccionados?",
        answer: "La propiedad `networkPolicyPeers`.",
      },
      {
        prompt:
          "El componente de Strimzi que proporciona una interfaz RESTful para interactuar con un clúster de Kafka se llama ____.",
        answer: "Kafka Bridge",
      },
      {
        prompt: "¿Qué es el Cruise Control en el contexto de Strimzi?",
        answer:
          "Es una herramienta para reequilibrar la carga de trabajo de un clúster de Kafka generando y aplicando propuestas de optimización.",
      },
      {
        prompt:
          "En Helm, ¿qué archivo se usa para definir los valores de configuración por defecto de un chart?",
        answer: "El archivo `values.yaml`.",
      },
      {
        prompt:
          "Para anular un valor específico de un chart de Helm desde la línea de comandos sin usar un archivo, se puede utilizar el flag ____.",
        answer: "`--set`",
      },
      {
        prompt:
          "En la monitorización de Kubernetes, la estrategia de tener un agente de monitorización por cada pod se logra comúnmente con el patrón ____.",
        answer: "sidecar",
      },
      {
        prompt: "Término en Kubernetes: Ingress",
        answer:
          "Un objeto de la API que gestiona el acceso externo a los servicios en un clúster, típicamente tráfico HTTP y HTTPS.",
      },
      {
        prompt:
          "En el archivo de despliegue (deployment.yaml) de Kubernetes, la propiedad `replicas` especifica el número deseado de ____.",
        answer: "Pods",
      },
      {
        prompt:
          "El comando `kubectl get pods` muestra, entre otras cosas, el estado, el número de reinicios y la ____ de cada pod.",
        answer: "antigüedad (age)",
      },
      {
        prompt:
          "En el contexto de Strimzi, ¿qué tipo de listener se configura para clientes externos que se conectan a través de un balanceador de carga de un proveedor de nube?",
        answer: "Un listener de tipo `loadbalancer`.",
      },
      {
        prompt:
          "Para un clúster de ZooKeeper de cinco nodos, ¿cuántos nodos deben estar en funcionamiento como mínimo para mantener el quórum?",
        answer: "Se requieren al menos tres nodos en funcionamiento.",
      },
      {
        prompt:
          "¿Qué herramienta de la línea de comandos de AWS te ayuda a interactuar con los servicios de AWS a través de comandos en tu shell?",
        answer: "La Interfaz de Línea de Comandos de AWS (AWS CLI).",
      },
      {
        prompt:
          "En el `pom.xml` de un proyecto Maven, las dependencias del proyecto se declaran dentro de la etiqueta ____.",
        answer: "`<dependencies>`",
      },
      {
        prompt:
          "¿Qué es un 'fat JAR' o 'uber JAR' en el contexto de las aplicaciones Java?",
        answer:
          "Es un archivo JAR que contiene tanto el código de la aplicación como todas sus dependencias en un único archivo.",
      },
      {
        prompt:
          "En un Dockerfile, la instrucción `RUN` ejecuta comandos en una nueva capa sobre la imagen actual y ____ los cambios.",
        answer: "confirma (commits)",
      },
      {
        prompt:
          "En Strimzi, el recurso personalizado `KafkaMirrorMaker2` se utiliza para la replicación de datos entre dos clústeres de Kafka y se basa en el framework ____.",
        answer: "Kafka Connect",
      },
      {
        prompt:
          "La herramienta Prometheus se utiliza ampliamente en el ecosistema de Kubernetes para recopilar métricas en formato de ____.",
        answer: "series de tiempo (time-series)",
      },
      {
        prompt:
          "En Kubernetes, ¿qué objeto se utiliza para asegurar que un número mínimo de pods de una aplicación esté disponible durante interrupciones voluntarias?",
        answer: "Un PodDisruptionBudget (PDB).",
      },
      {
        prompt:
          "Para configurar afinidad de pod en Kubernetes y asegurar que ciertos pods no se programen en el mismo nodo, se utiliza la regla ____.",
        answer: "`podAntiAffinity`",
      },
      {
        prompt:
          "En Strimzi, ¿dónde se configura el uso de almacenamiento `jbod` (Just a Bunch Of Disks) para los brókeres de Kafka?",
        answer:
          "En la propiedad `spec.kafka.storage`, estableciendo `type` en `jbod` y definiendo los volúmenes en la propiedad `volumes`.",
      },
      {
        prompt:
          "En un Dockerfile de varias etapas, la primera etapa, que incluye herramientas de compilación como Maven, se conoce comúnmente como la etapa de ____.",
        answer: "compilación (build stage)",
      },
      {
        prompt:
          "La segunda etapa en un Dockerfile de varias etapas, que solo contiene el artefacto de la aplicación y el tiempo de ejecución, se llama la etapa de ____.",
        answer: "ejecución (runtime stage)",
      },
      {
        prompt:
          "Para la autorización en Kafka con Strimzi, se puede usar `AclAuthorizer`, que gestiona el acceso a los brókeres mediante reglas ____.",
        answer: "ACL (Access Control List)",
      },
      {
        prompt:
          "En la configuración de autenticación OAuth 2.0 en Strimzi, la propiedad `tokenEndpointUri` especifica la URL del servidor de autorización para obtener un ____.",
        answer: "token de acceso",
      },
      {
        prompt:
          "Comando `kubectl` para ver los logs de un contenedor específico dentro de un pod que tiene múltiples contenedores:",
        answer: "`kubectl logs <nombre-del-pod> -c <nombre-del-contenedor>`.",
      },
      {
        prompt:
          "El concepto de que el software responsable de ejecutar contenedores, como Docker o containerd, se conoce en Kubernetes como el ____.",
        answer: "Container Runtime",
      },
      {
        prompt:
          "¿Qué herramienta de Spring permite crear servicios REST con anotaciones declarativas de Java para definir puntos finales HTTP?",
        answer: "Spring Web (o Spring MVC).",
      },
      {
        prompt:
          "En Spring Boot, ¿qué archivo de propiedades se utiliza comúnmente para la configuración externa por defecto de la aplicación?",
        answer: "El archivo `application.properties` o `application.yaml`.",
      },
      {
        prompt:
          "En Strimzi, la propiedad `deleteClaim` dentro de la configuración de `persistent-claim` storage, si se establece en `false`, ¿qué sucede con el PVC cuando se elimina el clúster?",
        answer:
          "El Persistent Volume Claim (PVC) no se elimina, preservando los datos.",
      },
      {
        prompt:
          "En la configuración de un `Ingress` de Kubernetes, la sección `rules` define cómo se enruta el tráfico entrante a los ____.",
        answer: "Servicios (Services)",
      },
      {
        prompt: "¿Qué es un `ServiceAccount` en Kubernetes?",
        answer:
          "Proporciona una identidad para los procesos que se ejecutan en un Pod, que puede ser utilizada para autenticarse en el servidor de la API.",
      },
      {
        prompt:
          "En el patrón de microservicios, las preocupaciones transversales (cross-cutting concerns) como el logging y la monitorización son gestionadas idealmente por un servicio ____.",
        answer: "separado, como un sidecar",
      },
      {
        prompt:
          "En un archivo YAML de Kubernetes, `apiVersion: apps/v1` y `kind: Deployment` indican que se está definiendo un objeto de tipo ____.",
        answer: "Deployment",
      },
      {
        prompt:
          "En Helm, para ver los valores de configuración de una release ya instalada, se utiliza el comando `helm get ____ <nombre-release>`.",
        answer: "values",
      },
      {
        prompt:
          "La característica de Kubernetes que permite escalar una aplicación hacia arriba o hacia abajo con un simple comando o automáticamente se conoce como _____.",
        answer: "Escalado horizontal (Horizontal Scaling)",
      },
      {
        prompt: "¿Qué significa la sigla CRI en el contexto de Kubernetes?",
        answer: "Significa Container Runtime Interface.",
      },
      {
        prompt:
          "El `Cluster Operator` de Strimzi es el componente principal que gestiona el ciclo de vida de los clústeres de ____ en Kubernetes.",
        answer: "Kafka",
      },
      {
        prompt:
          "En la configuración de `livenessProbe` en Kubernetes, `initialDelaySeconds` define el tiempo de espera antes de que se realice la ____.",
        answer: "primera sonda (first probe)",
      },
      {
        prompt:
          "La propiedad `periodSeconds` en una sonda de Kubernetes especifica la ____ con la que se realiza la comprobación de salud.",
        answer: "frecuencia",
      },
      {
        prompt:
          "En la configuración de autenticación de un listener de Kafka en Strimzi, se pueden usar tipos como `tls`, `scram-sha-512` y ____.",
        answer: "`oauth`",
      },
      {
        prompt:
          "¿Qué es la 'observabilidad' en el contexto de sistemas distribuidos como Kubernetes?",
        answer:
          "Es la capacidad de medir el estado interno de un sistema a partir de los datos que genera, como logs, métricas y trazas.",
      },
      {
        prompt:
          "Para evitar que Docker utilice la caché para una instrucción específica y todas las subsiguientes en una compilación, se puede usar el flag ____ en el comando `docker build`.",
        answer: "--no-cache",
      },
      {
        prompt:
          "En una arquitectura de microservicios, ¿qué principio se viola cuando múltiples equipos implementan soluciones repetidas para necesidades comunes?",
        answer: 'El principio "Don\'t Repeat Yourself" (DRY).',
      },
      {
        prompt:
          "En Strimzi, ¿cómo se puede configurar el registro (logging) para los componentes de Kafka utilizando una configuración externa en lugar de en línea?",
        answer:
          "Estableciendo `logging.type` en `external` y especificando el nombre de un ConfigMap en `logging.name`.",
      },
      {
        prompt:
          "El comando `kubectl top pod <nombre-del-pod>` se utiliza para ver el uso actual de ____ y ____ del pod.",
        answer: "CPU y memoria",
      },
      {
        prompt:
          "En el contexto de la seguridad de Docker, el aislamiento de contenedores con un espacio de nombres de usuario ayuda a mitigar las vulnerabilidades de escalada de ____.",
        answer: "privilegios",
      },
      {
        prompt:
          "En la configuración de un `Service` de Kubernetes de tipo `NodePort`, se expone el servicio en un puerto estático en la ____ de cada nodo.",
        answer: "dirección IP",
      },
      {
        prompt:
          "Una de las ventajas de Apache Spark sobre MapReduce de Hadoop es su capacidad de computación en ____, que lo hace significativamente más rápido.",
        answer: "memoria (in-memory)",
      },
      {
        prompt:
          "En el contexto de Strimzi y Kafka, la propiedad `superUsers` en la configuración de autorización define una lista de principales de usuario con ____.",
        answer: "derechos de acceso ilimitados",
      },
      {
        prompt:
          "En un entorno GitOps, el estado deseado de la infraestructura y las aplicaciones se declara de forma declarativa en un repositorio ____.",
        answer: "Git",
      },
      {
        prompt:
          "Para usar la autenticación mutua TLS (mTLS) en un listener de Kafka, tanto el cliente como el servidor se validan mutuamente mediante ____.",
        answer: "certificados",
      },
      {
        prompt:
          "En Helm, la validación de esquemas (schema validation) se puede implementar usando un archivo llamado `____` para asegurar que solo se acepten entradas válidas.",
        answer: "values.schema.json",
      },
    ],
  },
  {
    id: "spring_ai",
    name: "Spring Ai",
    cards: [
      {
        prompt:
          "¿Qué combinación tecnológica mostró el mejor rendimiento en escenarios de alto conteo de usuarios según los benchmarks de Project Loom?",
        answer: "Virtual Threads (hilos virtuales) sobre Netty.",
      },
      {
        prompt:
          "¿Por qué no se recomiendan los hilos virtuales (Virtual Threads) sobre Tomcat para escenarios con un número masivo de usuarios?",
        answer:
          "Debido a un uso de recursos considerablemente mayor y la aparición de errores por tiempo de espera (timeout).",
      },
      {
        prompt:
          "En los benchmarks de Spring Boot, ¿qué propósito cumple el parámetro delayCallDepth?",
        answer:
          "Simular llamadas recursivas a servicios ascendentes (upstream) para evaluar la reutilización de hilos de la plataforma.",
      },
      {
        prompt:
          "Según los resultados de rendimiento, ¿en qué porcentaje aproximado de los escenarios los Virtual Threads sobre Netty superaron a Project Reactor?",
        answer: "En aproximadamente un 45% de los casos.",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de usar WebFlux o Virtual Threads en microservicios con alta concurrencia?",
        answer:
          "Reducir la sobrecarga de recursos al mapear solicitudes entrantes a muy pocos hilos del sistema operativo compartidos.",
      },
      {
        prompt:
          "¿Qué herramienta se utiliza para generar los informes de comparación y los gráficos PNG en el proyecto de benchmarks de Chris Gleissner?",
        answer: "Python 3 con la librería Matplotlib.",
      },
      {
        prompt:
          "¿Qué objeto de Spring AI proporciona una API fluida para comunicarse con modelos de IA de forma sincrónica o por streaming?",
        answer: "ChatClient.",
      },
      {
        prompt:
          "En Spring AI, ¿cuál es la función de los 'Advisors' (asesores) en la cadena de llamadas del ChatClient?",
        answer:
          "Interceptar, modificar y mejorar las interacciones con el modelo de IA, como añadir historial o datos de contexto.",
      },
      {
        prompt:
          "¿Qué método del ChatClient.Builder permite configurar parámetros globales para todas las llamadas, como la salida estructurada nativa?",
        answer: "defaultAdvisors().",
      },
      {
        prompt:
          "¿Cómo se obtiene el contenido de la respuesta de un modelo de IA en formato String utilizando la API de ChatClient?",
        answer: "Invocando el método content() después de call().",
      },
      {
        prompt:
          "En el contexto de RAG con Spring AI, ¿qué hace el QuestionAnswerAdvisor?",
        answer:
          "Añade información de contexto relevante al prompt basándose en el texto del usuario mediante una búsqueda previa.",
      },
      {
        prompt:
          "¿Cuál es la implementación predeterminada de memoria de chat en Spring AI que mantiene una ventana limitada de mensajes?",
        answer: "MessageWindowChatMemory.",
      },
      {
        prompt:
          "¿Qué sucede con los mensajes del sistema en MessageWindowChatMemory cuando se excede el límite de tamaño de la ventana?",
        answer:
          "Los mensajes del sistema se preservan mientras que los mensajes antiguos de usuario o asistente son desalojados.",
      },
      {
        prompt:
          "¿Qué propiedad debe establecerse en false para deshabilitar la autoconfiguración de ChatClient.Builder en Spring AI?",
        answer: "spring.ai.chat.client.enabled.",
      },
      {
        prompt:
          "En Spring Integration, ¿qué componente se encarga de transformar los datos de entrada, como extraer el título de un feed RSS?",
        answer: "Un <int:transformer>.",
      },
      {
        prompt:
          "¿Qué tipo de adaptador de canal se utiliza en Spring Integration para escribir datos procesados en un archivo local?",
        answer:
          "Un adaptador de salida (outbound-channel-adapter) del namespace file.",
      },
      {
        prompt:
          "En el desarrollo con Spring Boot y OAuth2, ¿cuál es el endpoint predeterminado que suele devolver los detalles del usuario autenticado en formato JSON?",
        answer: "/user.",
      },
      {
        prompt:
          "¿Qué especificación de autenticación abierta sigue la implementación de Google OAuth 2.0?",
        answer: "OpenID Connect 1.0.",
      },
      {
        prompt:
          "¿Cuál es la línea de base (baseline) de Jakarta EE para Spring AI 2.0.0-M1?",
        answer: "Jakarta EE 11.",
      },
      {
        prompt:
          "¿Qué repositorio de memoria de chat se añadió en Spring AI 2.0.0-M1 para permitir el almacenamiento persistente mediante una base de datos NoSQL clave-valor?",
        answer: "Redis Chat Memory Repository.",
      },
      {
        prompt:
          "En Spring AI 2.0.0-M1, ¿cuál es el modelo de chat predeterminado para la integración oficial de OpenAI?",
        answer: "gpt-4o-mini.",
      },
      {
        prompt:
          "¿Qué nueva capacidad permite a los modelos de Anthropic Claude referenciar partes específicas de documentos proporcionados en sus respuestas?",
        answer: "La API de Citaciones (Citations API).",
      },
      {
        prompt:
          "¿Qué anotación de Spring Boot inicia el proceso de autoconfiguración al escanear el classpath?",
        answer: "@EnableAutoConfiguration.",
      },
      {
        prompt:
          "¿Qué archivo JAR de Spring Boot contiene la lógica principal de autoconfiguración para MVC, datos y otros frameworks?",
        answer: "spring-boot-autoconfigure.jar.",
      },
      {
        prompt:
          "¿Cuál es la función del archivo spring.factories en el mecanismo de autoconfiguración de Spring Boot?",
        answer:
          "Definir las clases de configuración que deben cargarse automáticamente si se cumplen ciertas condiciones.",
      },
      {
        prompt:
          "¿Qué anotación compuesta de Spring Boot incluye @Configuration, @EnableAutoConfiguration y @ComponentScan?",
        answer: "@SpringBootApplication.",
      },
      {
        prompt:
          "¿Cuál es el cambio principal en la estructura de Spring Boot 4 respecto a la autoconfiguración?",
        answer:
          "Se ha vuelto modular, dividiendo el JAR masivo de autoconfiguración en módulos más pequeños y enfocados.",
      },
      {
        prompt:
          "¿Qué atributo se introdujo en @RequestMapping en Spring Boot 4 para manejar el versionado de APIs de forma nativa?",
        answer: "El atributo version.",
      },
      {
        prompt:
          "En Spring Boot 4, ¿qué biblioteca se adoptó para estandarizar la seguridad contra valores nulos (null safety)?",
        answer: "JSpecify.",
      },
      {
        prompt:
          "¿Qué anotación de JSpecify se utiliza en un archivo package-info.java para declarar que todo en el paquete es no nulo por defecto?",
        answer: "@NullMarked.",
      },
      {
        prompt:
          "¿Qué característica de Spring Boot 4 permite definir clientes HTTP mediante interfaces sin depender de bibliotecas externas como OpenFeign?",
        answer:
          "Los clientes HTTP declarativos nativos (Declarative HTTP Clients).",
      },
      {
        prompt:
          "¿Qué nueva capacidad de monitoreo automático se añadió al Actuator de Spring Boot 4 para evitar fallos de seguridad críticos?",
        answer:
          "El monitoreo de certificados SSL (SSL Certificate Monitoring).",
      },
      {
        prompt: "En el núcleo de Spring, ¿qué es un 'Bean'?",
        answer:
          "Un objeto que es instanciado, ensamblado y gestionado por el contenedor de Inversión de Control (IoC) de Spring.",
      },
      {
        prompt:
          "¿Qué diferencia hay entre autowiring por tipo y por nombre en Spring?",
        answer:
          "Por tipo busca una coincidencia de clase/interfaz, mientras que por nombre busca una coincidencia con el ID del bean.",
      },
      {
        prompt:
          "¿Qué anotación se utiliza para resolver la ambigüedad cuando existen múltiples beans del mismo tipo y se desea priorizar uno por nombre?",
        answer: "@Qualifier.",
      },
      {
        prompt:
          "¿Qué patrón de diseño utiliza principalmente el framework de Programación Orientada a Aspectos (AOP) de Spring?",
        answer: "El patrón Proxy (Proxy pattern).",
      },
      {
        prompt:
          "¿Cuál es el componente de Spring MVC que actúa como controlador frontal (Front Controller) para despachar solicitudes?",
        answer: "DispatcherServlet.",
      },
      {
        prompt:
          "En Spring MVC, ¿qué interfaz es responsable de mapear una solicitud a un controlador específico basándose en la URL?",
        answer: "HandlerMapping.",
      },
      {
        prompt:
          "¿Qué motor de plantillas moderno se utiliza frecuentemente con Spring MVC como alternativa a JSP?",
        answer: "Thymeleaf.",
      },
      {
        prompt:
          "¿Cuál es la diferencia fundamental entre Spring WebFlux y Spring MVC?",
        answer:
          "Spring MVC es bloqueante y basado en servlets, mientras que WebFlux es no bloqueante y basado en flujos reactivos.",
      },
      {
        prompt:
          "¿Qué herramienta de Google Cloud permite la resolución de nombres de servicios en Kubernetes mediante DNS interno?",
        answer: "Kf (basado en el DNS de Kubernetes).",
      },
      {
        prompt:
          "¿Bajo qué circunstancias es preferible usar DNS de Kubernetes en lugar de Netflix Eureka para el descubrimiento de servicios?",
        answer:
          "Cuando se trabaja en entornos políglotas (múltiples lenguajes) o se desea depender únicamente de la infraestructura nativa de Kubernetes.",
      },
      {
        prompt:
          "¿Qué puerto TCP mapea Kf por defecto para que las aplicaciones se comuniquen entre sí dentro de un espacio?",
        answer: "El puerto 80.",
      },
      {
        prompt:
          "En Kubernetes, ¿qué tipo de servicio permite redirigir solicitudes DNS a una autoridad externa mediante un registro CNAME?",
        answer: "ExternalName.",
      },
      {
        prompt:
          "¿Cuál es la principal debilidad de Spring Cloud cuando se compara con soluciones nativas de Kubernetes?",
        answer:
          "Está limitado principalmente al ecosistema Java y requiere que las aplicaciones gestionen lógica de infraestructura en el código.",
      },
      {
        prompt:
          "¿Qué patrón utiliza Spring AI para permitir que un modelo de chat 'recuerde' el contexto de una conversación?",
        answer:
          "El patrón de historial de conversación (Chat Memory) enviado con cada nueva solicitud.",
      },
      {
        prompt:
          "¿Qué implementación de ChatMemoryRepository en Spring AI permite el almacenamiento en una base de datos relacional mediante JDBC?",
        answer: "JdbcChatMemoryRepository.",
      },
      {
        prompt:
          "¿Qué anotación de Spring se utiliza para marcar una clase como fuente de definiciones de beans?",
        answer: "@Configuration.",
      },
      {
        prompt:
          "¿Cómo se define una tarea de procesamiento por lotes que lee, procesa y escribe volúmenes masivos de datos en Spring?",
        answer:
          "Mediante el framework Spring Batch, utilizando un Job compuesto por uno o más Steps.",
      },
      {
        prompt:
          "En Spring Integration, ¿qué componente separa una carga útil (payload) grande en varias más pequeñas?",
        answer: "Un Splitter.",
      },
      {
        prompt:
          "¿Qué protocolo de comunicación permite canales full-duplex sobre una conexión TCP y es soportado por Spring para aplicaciones en tiempo real?",
        answer: "WebSocket.",
      },
      {
        prompt:
          "Según la arquitectura de microservicios, ¿qué componente de Spring Cloud se encarga de centralizar la configuración externa?",
        answer: "Spring Cloud Config Server.",
      },
      {
        prompt:
          "¿Qué anotación de Spring Boot permite activar el soporte para perfiles específicos (como 'dev' o 'prod')?",
        answer: "@Profile.",
      },
      {
        prompt:
          "Dentro de Spring Boot 4, ¿cómo se configura la estrategia de versionado de API para que sea basada en la ruta (path-based)?",
        answer:
          "Configurando el ApiVersionStrategy para usar un patrón de URI como /api/v{version}/.",
      },
      {
        prompt:
          "¿Qué herramienta web permite generar proyectos de Spring Boot con dependencias preconfiguradas?",
        answer: "Spring Initializr (start.spring.io).",
      },
      {
        prompt:
          "¿Qué anotación se usa para inyectar una dependencia de forma automática en un campo, constructor o setter?",
        answer: "@Autowired.",
      },
      {
        prompt: "¿Cuál es la diferencia entre @Component y @Bean?",
        answer:
          "@Component es para detección automática de clases, mientras que @Bean se usa en métodos de configuración para registrar objetos manualmente.",
      },
      {
        prompt:
          "En el contexto de Spring Framework, ¿qué significa 'Inversión de Control' (IoC)?",
        answer:
          "Es el proceso donde el contenedor asume la responsabilidad de instanciar y gestionar el ciclo de vida de los objetos en lugar del desarrollador.",
      },
      {
        prompt:
          "¿Qué anotación de JSpecify indica que un valor de retorno o parámetro *podría* ser nulo y debe ser verificado?",
        answer: "@Nullable.",
      },
      {
        prompt:
          "¿Qué propiedad de Spring Boot se usa para habilitar el registro detallado (logging) del proceso de autoconfiguración?",
        answer: "debug=true (en application.properties).",
      },
      {
        prompt:
          "¿Qué componente de Spring Integration combina múltiples mensajes relacionados en un solo resultado?",
        answer: "Un Aggregator.",
      },
      {
        prompt:
          "En Spring Cloud Gateway, ¿cuál es el nuevo nombre del artefacto para el servidor basado en WebFlux a partir de la versión 2025.0?",
        answer: "spring-cloud-gateway-server-webflux.",
      },
      {
        prompt:
          "¿Qué dependencia de Spring Boot 3.5.0 obligó a actualizar a Fabric8 7.3.1 en Spring Cloud Kubernetes?",
        answer: "Jackson 2.19.x.",
      },
      {
        prompt:
          "¿Qué método de autenticación para backends de Vault se añadió en Application Services 3.3.4?",
        answer: "El método AppRole.",
      },
      {
        prompt:
          "¿Qué anotación de Spring permite aplicar lógica antes, después o alrededor de la ejecución de un método sin modificar su código?",
        answer: "@Around (en el contexto de AOP).",
      },
      {
        prompt: "En Spring AI, ¿qué hace el SimpleLoggerAdvisor?",
        answer:
          "Registra (logs) los datos de las solicitudes y respuestas del ChatClient para depuración.",
      },
      {
        prompt:
          "¿Qué anotación de Spring MVC se utiliza para mapear una variable de la URL a un parámetro de un método del controlador?",
        answer: "@PathVariable.",
      },
      {
        prompt:
          "¿Cómo se activa un perfil específico de Spring Boot desde la línea de comandos?",
        answer:
          "Usando el argumento --spring.profiles.active=nombre_del_perfil.",
      },
      {
        prompt:
          "¿Qué interfaz de Spring se debe implementar para ejecutar código justo después de que la aplicación se haya iniciado?",
        answer: "CommandLineRunner o ApplicationRunner.",
      },
      {
        prompt:
          "¿Qué ventaja ofrece el uso de RestClient sobre RestTemplate en versiones recientes de Spring?",
        answer:
          "Ofrece una API fluida y moderna, similar a la de WebClient, pero para aplicaciones imperativas sincrónicas.",
      },
      {
        prompt:
          "¿Qué anotación habilita el soporte de Programación Orientada a Aspectos basada en anotaciones de AspectJ?",
        answer: "@EnableAspectJAutoProxy.",
      },
      {
        prompt:
          "En Spring Data, ¿qué interfaz permite realizar operaciones CRUD básicas sin escribir implementaciones?",
        answer: "CrudRepository.",
      },
      {
        prompt:
          "¿Qué mecanismo utiliza Spring Boot para cargar archivos de propiedades específicos del entorno, como application-test.yml?",
        answer: "Carga de perfiles (Profiles).",
      },
      {
        prompt:
          "En Spring AI 2.0.0-M1, ¿qué mejora se añadió al vector store de Redis?",
        answer:
          "Capacidades de búsqueda de texto, consultas por rango y ajuste de parámetros del índice HNSW.",
      },
      {
        prompt:
          "¿Qué puerto se utiliza tradicionalmente para acceder a la base de datos H2 en memoria durante el desarrollo con Spring Boot?",
        answer: "El puerto 8080 (a través de /h2-console si está habilitado).",
      },
      {
        prompt:
          "En Spring Integration, ¿qué adaptador permite integrar sistemas que usan el protocolo AMQP como RabbitMQ?",
        answer:
          "Los adaptadores amqp-inbound-channel-adapter y amqp-outbound-channel-adapter.",
      },
      {
        prompt:
          "¿Qué anotación de Spring Boot permite activar el binding de propiedades de archivos YAML o properties a objetos Java?",
        answer: "@ConfigurationProperties.",
      },
      {
        prompt:
          "¿Cuál es la función del componente MultipartResolver en Spring MVC?",
        answer:
          "Facilitar la carga de archivos (file uploads) envolviendo las solicitudes HTTP entrantes.",
      },
      {
        prompt:
          "En el contexto de Spring Security, ¿qué componente se encarga de decidir si un usuario autenticado tiene permiso para acceder a un recurso?",
        answer: "El AccessDecisionManager (o los nuevos AuthorizationManager).",
      },
      {
        prompt:
          "¿Qué biblioteca de Java utiliza Spring AI para renderizar plantillas de prompts por defecto?",
        answer: "StringTemplate (ST).",
      },
      {
        prompt:
          "¿Qué significa que el modelo de programación de Spring sea 'no intrusivo'?",
        answer:
          "Que las clases de la aplicación no necesitan heredar de clases de Spring ni implementar sus interfaces en la mayoría de los casos.",
      },
      {
        prompt:
          "En Spring Boot 4, ¿cómo se puede activar el monitoreo del tiempo de ejecución de un método mediante Micrometer?",
        answer: "Añadiendo la anotación @Observed al método.",
      },
      {
        prompt:
          "¿Qué motor de base de datos vectorial se utiliza como backend cuando se configura el PgVectorStore en Spring AI?",
        answer: "PostgreSQL con la extensión pgvector.",
      },
    ],
  },
];
