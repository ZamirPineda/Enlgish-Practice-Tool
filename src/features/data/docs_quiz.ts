export interface QuizQuestion {
  id: string;
  category: string;
  subCategory?: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const docsQuizQuestions: QuizQuestion[] = [
  // Cloud & DevOps / AWS (Original)
  {
    id: "aws-1",
    category: "Cloud-Native & DevOps",
    subCategory: "AWS",
    question:
      "En AWS, ¿qué servicio es más adecuado para ejecutar contenedores Docker sin tener que administrar servidores o clústeres EC2?",
    options: ["AWS EC2", "AWS Fargate", "AWS Lambda", "Amazon EKS"],
    correctAnswer: "AWS Fargate",
    explanation:
      "AWS Fargate es un motor informático sin servidor (serverless) para contenedores que funciona tanto con Amazon ECS como con Amazon EKS, evitando la gestión de instancias subyacentes.",
  },
  {
    id: "aws-2",
    category: "Cloud-Native & DevOps",
    subCategory: "AWS",
    question:
      "¿Cuál es el principio de arquitectura fundamental detrás de la 'Alta Disponibilidad' en AWS?",
    options: [
      "Usar siempre instancias Spot",
      "Aislar la aplicación en una sola Subred",
      "Desplegar recursos en Múltiples Zonas de Disponibilidad (Multi-AZ)",
      "Hacer copias de seguridad cada año",
    ],
    correctAnswer:
      "Desplegar recursos en Múltiples Zonas de Disponibilidad (Multi-AZ)",
    explanation:
      "Multi-AZ asegura que si una zona de disponibilidad (centro de datos) falla, la aplicación sigue funcionando desde otra zona, logrando alta disponibilidad.",
  },
  {
    id: "devops-1",
    category: "Cloud-Native & DevOps",
    subCategory: "Docker",
    question:
      "¿Cuál es la principal diferencia entre un Contenedor y una Máquina Virtual (VM)?",
    options: [
      "Los contenedores incluyen un SO completo invitado, las VMs no.",
      "Las VMs comparten el kernel del host, los contenedores no.",
      "Los contenedores comparten el kernel del SO anfitrión, haciéndolos más ligeros que las VMs.",
      "No hay diferencia de rendimiento, solo de empaquetado.",
    ],
    correctAnswer:
      "Los contenedores comparten el kernel del SO anfitrión, haciéndolos más ligeros que las VMs.",
    explanation:
      "A diferencia de las VMs, que requieren un Sistema Operativo invitado completo hipervisado, los contenedores comparten el kernel del SO donde se ejecutan, consumiendo muchos menos recursos.",
  },
  {
    id: "devops-2",
    category: "Cloud-Native & DevOps",
    subCategory: "Kubernetes",
    question:
      "En Kubernetes, ¿cuál es la unidad desplegable más pequeña y básica que puedes crear o administrar?",
    options: ["Cluster", "Node", "Service", "Pod"],
    correctAnswer: "Pod",
    explanation:
      "Un Pod representa un solo proceso en ejecución en tu clúster y puede contener uno o más contenedores estrechamente acoplados.",
  },
  {
    id: "devops-3",
    category: "Cloud-Native & DevOps",
    subCategory: "CI/CD",
    question:
      "¿Qué estrategia de despliegue reduce el riesgo de inactividad introduciendo la nueva versión gradualmente junto a la versión antigua (usualmente manejando tráfico real)?",
    options: [
      "Blue/Green Deployment",
      "Canary Release",
      "Rolling Update",
      "Recreate Strategy",
    ],
    correctAnswer: "Canary Release",
    explanation:
      "Canary Release lanza la nueva versión a un subconjunto pequeño de usuarios antes de desplegarla a toda la infraestructura, ideal para detectar fallos tempranos.",
  },
  {
    id: "aws-3",
    category: "Cloud-Native & DevOps",
    subCategory: "AWS",
    question:
      "Si una plataforma critica debe sobrevivir a la caida completa de una region y ademas quieres reducir el tiempo de recuperacion sin depender solo de backups nocturnos, que enfoque arquitectonico es mas solido dentro del ecosistema AWS para los componentes de datos y trafico?",
    options: [
      "Mantener todo en una sola region con Auto Scaling y snapshots diarios.",
      "Combinar despliegue multi region con replicacion de datos y un mecanismo claro de failover de trafico.",
      "Usar exclusivamente instancias Spot distribuidas en varias subredes privadas.",
      "Mover la aplicacion a una sola zona con un balanceador interno redundante.",
    ],
    correctAnswer:
      "Combinar despliegue multi region con replicacion de datos y un mecanismo claro de failover de trafico.",
    explanation:
      "Para resiliencia regional real no basta con Multi-AZ. Necesitas estrategia multi region, replicas o sincronizacion de datos segun el servicio, y una forma controlada de redirigir trafico, por ejemplo con Route 53, para reducir RTO y RPO de forma seria.",
  },
  {
    id: "k8s-3",
    category: "Cloud-Native & DevOps",
    subCategory: "Kubernetes",
    question:
      "En Kubernetes, si un servicio HTTP recibe picos variables de trafico y quieres ajustar automaticamente la cantidad de Pods segun metricas observadas sin cambiar manualmente cada Deployment en cada incidente, que recurso cumple exactamente ese papel operativo?",
    options: ["DaemonSet", "Horizontal Pod Autoscaler", "ConfigMap", "Ingress"],
    correctAnswer: "Horizontal Pod Autoscaler",
    explanation:
      "El Horizontal Pod Autoscaler observa metricas como CPU, memoria o metricas personalizadas y modifica el numero de replicas del workload. No sustituye al Cluster Autoscaler, que escala nodos, sino que actua sobre Pods.",
  },
  {
    id: "k8s-4",
    category: "Cloud-Native & DevOps",
    subCategory: "Kubernetes",
    question:
      "Que controlador de Kubernetes es la opcion adecuada cuando una aplicacion distribuida necesita identidad de red estable, nombres predecibles por replica y despliegue ordenado porque cada instancia mantiene estado o participa en un cluster coordinado?",
    options: ["Deployment", "Job", "StatefulSet", "ReplicaSet"],
    correctAnswer: "StatefulSet",
    explanation:
      "StatefulSet existe para cargas con estado donde importa el orden de creacion o destruccion, la identidad persistente de cada replica y el uso de volumenes asociados de forma estable. Deployment esta pensado para replicas intercambiables.",
  },
  {
    id: "platform-1",
    category: "Cloud-Native & DevOps",
    subCategory: "Platform Engineering",
    question:
      "Cuando un equipo habla de Platform Engineering y de una Internal Developer Platform madura, cual es el objetivo principal mas alla de simplemente centralizar scripts: acelerar la entrega creando caminos guiados, autoservicio seguro y estandares reutilizables para los equipos de producto?",
    options: [
      "Reemplazar por completo a todos los equipos de SRE y seguridad.",
      "Eliminar la necesidad de documentacion tecnica porque todo queda implicito.",
      "Ofrecer golden paths, autoservicio y abstracciones operativas consistentes para reducir friccion y variabilidad.",
      "Forzar que cada equipo construya su propio pipeline y su propio stack base.",
    ],
    correctAnswer:
      "Ofrecer golden paths, autoservicio y abstracciones operativas consistentes para reducir friccion y variabilidad.",
    explanation:
      "La plataforma interna no busca esconder la realidad tecnica sin control, sino empaquetar buenas practicas, permisos, observabilidad, despliegue y dependencias comunes en una experiencia repetible. Eso reduce carga cognitiva y mejora velocidad con gobernanza.",
  },
  {
    id: "aws-4",
    category: "Cloud-Native & DevOps",
    subCategory: "AWS",
    question:
      "En una aplicacion desplegada sobre ECS o EKS, cual es la forma recomendada de permitir acceso a S3 sin guardar claves estaticas dentro del contenedor o del repositorio?",
    options: [
      "Guardar access keys en variables de entorno del contenedor y rotarlas manualmente.",
      "Asignar un rol de IAM a la carga de trabajo para entregar credenciales temporales.",
      "Incluir las credenciales dentro de la imagen Docker cifradas con base64.",
      "Montar un archivo CSV de credenciales compartido en cada Pod o Task.",
    ],
    correctAnswer:
      "Asignar un rol de IAM a la carga de trabajo para entregar credenciales temporales.",
    explanation:
      "La practica recomendada es usar roles asociados a la carga de trabajo, como task roles o mecanismos equivalentes en Kubernetes, para evitar secretos estaticos y delegar la rotacion al proveedor.",
  },
  {
    id: "k8s-5",
    category: "Cloud-Native & DevOps",
    subCategory: "Kubernetes",
    question:
      "Si necesitas exponer una aplicacion HTTP fuera del cluster y quieres enrutar trafico por host o path hacia varios servicios internos, que combinacion es la mas comun dentro de Kubernetes?",
    options: [
      "ConfigMap y ReplicaSet",
      "Service ClusterIP solamente",
      "Ingress apoyado por Services",
      "DaemonSet con PersistentVolume",
    ],
    correctAnswer: "Ingress apoyado por Services",
    explanation:
      "El Ingress define reglas HTTP de entrada, mientras que los Services exponen internamente los backends. Juntos permiten enrutar trafico externo de forma mas flexible que un Service aislado.",
  },
  {
    id: "devops-4",
    category: "Cloud-Native & DevOps",
    subCategory: "Observability",
    question:
      "Cuando un equipo quiere detectar degradaciones antes de que los usuarios abran tickets, que combinacion describe mejor una estrategia moderna de observabilidad?",
    options: [
      "Solo logs manuales revisados una vez por semana.",
      "Metricas, logs y trazas correlacionadas con alertas sobre indicadores utiles.",
      "Backups frecuentes y escalado vertical.",
      "Mas endpoints de healthcheck sin ningun dashboard.",
    ],
    correctAnswer:
      "Metricas, logs y trazas correlacionadas con alertas sobre indicadores utiles.",
    explanation:
      "La observabilidad moderna cruza varias senales para reducir el tiempo de deteccion y diagnostico. No se limita a almacenar logs, sino a relacionar sintomas, causas probables y comportamiento del sistema.",
  },
  {
    id: "platform-2",
    category: "Cloud-Native & DevOps",
    subCategory: "Platform Engineering",
    question:
      "Dentro de una plataforma interna, por que los golden paths suelen ser valiosos para los equipos de producto?",
    options: [
      "Porque obligan a usar una sola tecnologia para todos los casos posibles.",
      "Porque reducen decisiones repetitivas y ofrecen una ruta segura para tareas comunes.",
      "Porque eliminan la necesidad de observabilidad y seguridad.",
      "Porque sustituyen por completo la revision de arquitectura.",
    ],
    correctAnswer:
      "Porque reducen decisiones repetitivas y ofrecen una ruta segura para tareas comunes.",
    explanation:
      "Un golden path concentra practicas ya validadas por la organizacion y evita que cada equipo reconstruya desde cero pipelines, permisos, plantillas o convenciones basicas.",
  },
  // Java 17 / Oracle Certification
  {
    id: "java-1",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 17",
    question:
      "¿Qué característica se introdujo formalmente y de forma estándar en Java 17 para manejar cadenas de texto multilínea sin necesidad de concatenación manual ni secuencias de escape complejas?",
    options: [
      "Text Blocks",
      "String Templates",
      "Records",
      "Switch Expressions",
    ],
    correctAnswer: "Text Blocks",
    explanation:
      'Los Text Blocks (bloques de texto) introducidos estándar en Java 15/17 permiten declarar literales de cadena multilínea (con triple comilla `"""`) preservando el formato.',
  },
  {
    id: "java-2",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 17",
    question:
      "En Java 14+ (estándar en 16/17), ¿qué palabra clave se utiliza para crear clases inmutables que actúan principalmente como portadoras de datos sin necesidad de escribir constructores, getters, equals o hashCode?",
    options: ["struct", "data", "record", "sealed"],
    correctAnswer: "record",
    explanation:
      "Los `records` proporcionan una forma compacta de declarar clases que son portadoras transparentes de datos inmutables.",
  },
  {
    id: "java-3",
    category: "Plataformas y Lenguajes",
    subCategory: "Java",
    question:
      "¿Cuál de estas opciones describe el funcionamiento del 'Garbage Collector' (Recolector de Basura) en Java?",
    options: [
      "Defragmenta el disco duro donde JVM está corriendo.",
      "Es un puntero explícito que se debe llamar con System.gc() en cada iteración.",
      "Libera automáticamente la memoria reclamando el espacio de objetos que ya no son referenciados.",
      "Cierra automáticamente las conexiones de base de datos no usadas.",
    ],
    correctAnswer:
      "Libera automáticamente la memoria reclamando el espacio de objetos que ya no son referenciados.",
    explanation:
      "El GC gestiona la memoria en el Heap eliminando objetos inalcanzables para evitar Memory Leaks.",
  },
  {
    id: "java-4",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 17",
    question:
      "¿Qué propósito cumple una clase declarada como `sealed` (sellada) en Java 17?",
    options: [
      "Evita que una clase sea instanciada.",
      "Restringe qué otras clases o interfaces pueden extenderla o implementarla.",
      "Garantiza que todos los métodos dentro de la clase sean thread-safe.",
      "Impide la modificación de las variables miembro (simula inmutabilidad).",
    ],
    correctAnswer:
      "Restringe qué otras clases o interfaces pueden extenderla o implementarla.",
    explanation:
      "Las clases selladas (sealed classes) ofrecen un control estricto sobre la herencia, especificando mediante la cláusula `permits` qué clases están autorizadas a heredarlas.",
  },
  // Patrones de Diseño
  {
    id: "patrones-1",
    category: "Patrones de Diseño",
    question:
      "En una entrevista técnica, te piden implementar un mecanismo para asegurar que solo exista UNA instancia de un objeto y proporcionar un punto de acceso global a ella. ¿A qué patrón se refieren?",
    options: ["Factory Method", "Singleton", "Observer", "Decorator"],
    correctAnswer: "Singleton",
    explanation:
      "Singleton garantiza una única instancia. En Java, se implementa a menudo con una variable estática privada, constructor privado y un método getter público (o un enum).",
  },
  {
    id: "patrones-2",
    category: "Patrones de Diseño",
    question:
      "¿Qué problema resuelve el patrón Abstract Factory frente al patrón Factory Method sencillo?",
    options: [
      "Abstract Factory crea familias de objetos relacionados o dependientes sin especificar sus clases concretas.",
      "Abstract Factory elimina la necesidad de usar interfaces.",
      "Abstract Factory permite solo instanciar objetos Singleton.",
      "Abstract Factory inyecta dependencias automáticamente en Spring Boot.",
    ],
    correctAnswer:
      "Abstract Factory crea familias de objetos relacionados o dependientes sin especificar sus clases concretas.",
    explanation:
      "La fábrica abstracta provee una interfaz para crear familias de objetos (ej. botones y ventanas estilo Mac o Windows) mientras que Factory Method lidia con un solo tipo.",
  },
  {
    id: "patrones-3",
    category: "Patrones de Diseño",
    question:
      "¿Cuál de estos principios SOLID establece que 'los objetos de un programa deberían ser reemplazables por instancias de sus subtipos sin alterar el correcto funcionamiento del programa'?",
    options: [
      "Single Responsibility",
      "Open/Closed",
      "Liskov Substitution",
      "Dependency Inversion",
    ],
    correctAnswer: "Liskov Substitution",
    explanation:
      "El principio de Sustitución de Liskov (LSP) garantiza que una clase derivada pueda sustituir a su clase base sin romper la aplicación.",
  },
  // Estructuras de Datos / Algoritmos
  {
    id: "data-1",
    category: "Algoritmos y Estructuras de Datos",
    question:
      "Si necesitas buscar un valor rápidamente, con un tiempo promedio de búsqueda de O(1). ¿Cuál de las siguientes estructuras de datos usarías?",
    options: [
      "LinkedList (Lista Enlazada)",
      "Binary Search Tree (Árbol Binario de Búsqueda)",
      "HashMap / Hash Table",
      "Array no ordenado",
    ],
    correctAnswer: "HashMap / Hash Table",
    explanation:
      "Un Hash Map (o Hash Table) permite inserciones, eliminaciones y búsquedas en O(1) en el caso promedio debido a la función hash.",
  },
  {
    id: "data-2",
    category: "Algoritmos y Estructuras de Datos",
    question:
      "¿Qué técnica algorítmica implica dividir repetidamente a la mitad una lista ordenada para buscar un elemento, resultando en una complejidad de O(log n)?",
    options: [
      "Búsqueda Lineal",
      "Búsqueda Binaria (Binary Search)",
      "Programación Dinámica (Dynamic Programming)",
      "Divide y Vencerás",
    ],
    correctAnswer: "Búsqueda Binaria (Binary Search)",
    explanation:
      "Binary Search verifica el elemento del medio y descarta la mitad inútil cada vez, haciendo la búsqueda eficientemente logarítmica.",
  },
  {
    id: "data-3",
    category: "Algoritmos y Estructuras de Datos",
    question:
      "En una entrevista para Google, mencionas el uso de un 'Stack'. ¿Cuál es el principio fundamental de operación de una Pila (Stack)?",
    options: [
      "FIFO (First-In, First-Out)",
      "LIFO (Last-In, First-Out)",
      "Aleatorio",
      "Prioridad basada en el peso (Heaps)",
    ],
    correctAnswer: "LIFO (Last-In, First-Out)",
    explanation:
      "El Último en entrar es el Primero en Salir. Piensa en el historial de navegación hacia atrás de un navegador web.",
  },
  // Bases de Datos / Escalabilidad
  {
    id: "db-1",
    category: "Gestión de Datos y Escalabilidad",
    question:
      "¿Qué describe mejor a 'ACID' en el contexto de bases de datos relacionales?",
    options: [
      "Asynchronous, Cloud, Integrated, Distributed",
      "Atomicity, Consistency, Isolation, Durability",
      "Availability, Consistency, Independence, Data",
      "Automatic, Concurrent, Isolated, Dynamic",
    ],
    correctAnswer: "Atomicity, Consistency, Isolation, Durability",
    explanation:
      "ACID garantiza que las transacciones de bases de datos sean procesadas de manera fiable.",
  },
  {
    id: "db-2",
    category: "Gestión de Datos y Escalabilidad",
    question:
      "¿Cuál es una ventaja principal de una base de datos NoSQL (ej. MongoDB, DynamoDB) sobre una base de datos SQL tradicional?",
    options: [
      "Las consultas SQL en NoSQL son más estrictas.",
      "Garantizan ACID strictamente por defecto en clusters distribuidos grandes sin penalidad de rendimiento.",
      "Soportan esquemas flexibles y facilitan la escalabilidad horizontal.",
      "Reemplazan totalmente a las transacciones complejas financieras.",
    ],
    correctAnswer:
      "Soportan esquemas flexibles y facilitan la escalabilidad horizontal.",
    explanation:
      "Las bases NoSQL están diseñadas para datos no estructurados/semi-estructurados y son más fáciles de escalar añadiendo particiones (shards).",
  },
  // Microservicios
  {
    id: "arch-1",
    category: "Estilos Arquitectónicos",
    subCategory: "Microservicios",
    question:
      "En una arquitectura de Microservicios, ¿qué patrón se usa para manejar solicitudes entrantes y rutearlas al microservicio adecuado, a menudo proporcionando autenticación y rate-limiting?",
    options: ["Service Mesh", "API Gateway", "Circuit Breaker", "CQRS"],
    correctAnswer: "API Gateway",
    explanation:
      "El API Gateway actúa como punto único de entrada para los clientes, manejando el enrutamiento, seguridad (Auth) y agregación de respuestas.",
  },
  {
    id: "arch-2",
    category: "Estilos Arquitectónicos",
    subCategory: "Microservicios",
    question:
      "¿Qué patrón ayuda a evitar que un fallo en un servicio provoque una falla en cascada (cascading failure) en todo el sistema deteniendo temporalmente las llamadas al servicio defectuoso?",
    options: ["Event Sourcing", "Saga", "Circuit Breaker", "Bulkhead"],
    correctAnswer: "Circuit Breaker",
    explanation:
      "El Circuit Breaker (ej. Resilience4j) detecta fallos y 'abre el circuito' evitando llamadas a un servicio caído, retornando un default/fallback.",
  },

  // ------------------------------------------------------------------------
  // GCP (Total 10)
  // ------------------------------------------------------------------------
  {
    id: "gcp-1",
    category: "Cloud-Native & DevOps",
    subCategory: "GCP",
    question:
      "En Google Cloud Platform (GCP), ¿qué servicio es el equivalente a AWS Lambda para ejecutar código sin servidor en respuesta a eventos?",
    options: ["Cloud Run", "Cloud Functions", "App Engine", "Compute Engine"],
    correctAnswer: "Cloud Functions",
    explanation:
      "Cloud Functions es el servicio serverless de ejecución (FaaS) de Google, diseñado para ejecutar código simple sin estado.",
  },
  {
    id: "gcp-2",
    category: "Cloud-Native & DevOps",
    subCategory: "GCP",
    question:
      "¿Qué servicio de GCP usarías para analizar petabytes de datos usando SQL estándar de forma totalmente administrada y serverless?",
    options: ["Cloud SQL", "Cloud Spanner", "BigQuery", "Bigtable"],
    correctAnswer: "BigQuery",
    explanation:
      "BigQuery es el almacén de datos (Data Warehouse) empresarial, serverless y altamente escalable de Google.",
  },
  {
    id: "gcp-3",
    category: "Cloud-Native & DevOps",
    subCategory: "GCP",
    question:
      "¿Cuál de estos servicios en GCP ofrece una base de datos relacional compatible con SQL, pero escalable globalmente y con consistencia sólida?",
    options: ["Cloud Spanner", "Cloud SQL", "Datastore", "Firestore"],
    correctAnswer: "Cloud Spanner",
    explanation:
      "Cloud Spanner es una base de datos relacional distribuida mundialmente y escalable horizontalmente con consistencia fuerte.",
  },
  {
    id: "gcp-4",
    category: "Cloud-Native & DevOps",
    subCategory: "GCP",
    question:
      "En GCP, ¿qué servicio serverless permite ejecutar contenedores HTTP sin preocuparse por la infraestructura subyacente y escala a cero cuando no hay tráfico?",
    options: [
      "Google Kubernetes Engine",
      "Cloud Run",
      "Compute Engine",
      "App Engine Standard",
    ],
    correctAnswer: "Cloud Run",
    explanation:
      "Cloud Run es una plataforma serverless administrada que permite ejecutar contenedores invocables mediante solicitudes HTTP.",
  },
  {
    id: "gcp-5",
    category: "Cloud-Native & DevOps",
    subCategory: "GCP",
    question:
      "¿Qué componente de red global en GCP permite balancear carga HTTP(S) distribuyendo tráfico a múltiples regiones basándose en la ubicación del usuario?",
    options: [
      "Cloud Load Balancing Global",
      "VPC Peering",
      "Cloud NAT",
      "Cloud DNS",
    ],
    correctAnswer: "Cloud Load Balancing Global",
    explanation:
      "El Cloud Load Balancing global de Google puede distribuir el tráfico dirigido a una sola IP Anycast hacia distintos backends regionales.",
  },
  {
    id: "gcp-6",
    category: "Cloud-Native & DevOps",
    subCategory: "GCP",
    question:
      "Si necesitas instanciar Máquinas Virtuales (VMs) en Google Cloud, ¿qué servicio base deberías usar?",
    options: ["App Engine", "Cloud Functions", "Compute Engine", "GKE"],
    correctAnswer: "Compute Engine",
    explanation:
      "Google Compute Engine (GCE) provee máquinas virtuales personalizables en la nube de Google (IaaS).",
  },
  {
    id: "gcp-7",
    category: "Cloud-Native & DevOps",
    subCategory: "GCP",
    question:
      "¿Cuál es el servicio de almacenamiento de objetos (object storage) por defecto y altamente durable en GCP ideal para guardar imágenes, backups y archivos binarios?",
    options: [
      "Cloud Filestore",
      "Persistent Disk",
      "Cloud Storage",
      "Firebase Storage",
    ],
    correctAnswer: "Cloud Storage",
    explanation:
      "Google Cloud Storage es el servicio unificado de almacenamiento de objetos estáticos que rivaliza con AWS S3.",
  },
  {
    id: "gcp-8",
    category: "Cloud-Native & DevOps",
    subCategory: "GCP",
    question:
      "En GCP, ¿qué servicio de base de datos NoSQL de modelo Documental es la evolución natural de Datastore orientada a aplicaciones web o móviles?",
    options: ["Firestore", "Bigtable", "Spanner", "MemoryStore"],
    correctAnswer: "Firestore",
    explanation:
      "Firestore es la base de datos de documentos NoSQL, flexible y escalable conectada estrechamente con el ecosistema de Firebase y GCP.",
  },
  {
    id: "gcp-9",
    category: "Cloud-Native & DevOps",
    subCategory: "GCP",
    question:
      "¿Cuál de estos servicios de GCP es una plataforma administrada de mensajería (Pub/Sub) para ingestión de eventos asíncronos distribuidos independizando emisores y receptores?",
    options: ["Cloud Tasks", "Cloud Pub/Sub", "Dataflow", "Dataproc"],
    correctAnswer: "Cloud Pub/Sub",
    explanation:
      "Cloud Pub/Sub proporciona mensajería asíncrona a nivel global, actuando similar a Apache Kafka.",
  },
  {
    id: "gcp-10",
    category: "Cloud-Native & DevOps",
    subCategory: "GCP",
    question:
      "¿Qué servicio de GCP automatiza la creación, administración y seguridad de clústeres de contenedores orquestados con Kubernetes?",
    options: [
      "Cloud Composer",
      "GKE (Google Kubernetes Engine)",
      "Google Container Registry",
      "Cloud Build",
    ],
    correctAnswer: "GKE (Google Kubernetes Engine)",
    explanation:
      "GKE es el servicio gestionado líder en la industria para ejecutar de Kubernetes en Google Cloud.",
  },

  // ------------------------------------------------------------------------
  // Apache Kafka (Total 10)
  // ------------------------------------------------------------------------
  {
    id: "kafka-1",
    category: "Comunicación e Integración",
    subCategory: "Apache Kafka",
    question:
      "En Kafka, ¿cómo se asegura el orden estricto de los mensajes procesados?",
    options: [
      "Usando un solo Topic para todo el clúster.",
      "Asignando todos los mensajes con la misma 'Key' para que vayan a la misma partición.",
      "Kafka asegura orden global a lo largo de todos sus Topics por defecto.",
      "Aumentando el número de brokers.",
    ],
    correctAnswer:
      "Asignando todos los mensajes con la misma 'Key' para que vayan a la misma partición.",
    explanation:
      "Kafka garantiza orden de lectura solo dentro de una misma partición. Al usar una Key, Kafka enruta esos eventos a la misma partición asegurando el orden.",
  },
  {
    id: "kafka-2",
    category: "Comunicación e Integración",
    subCategory: "Apache Kafka",
    question:
      "¿Qué función cumple un 'Consumer Group' (Grupo de Consumidores) en Kafka?",
    options: [
      "Garantiza que múltiples consumidores lean el mismo mensaje exactamente al mismo tiempo de la misma partición.",
      "Multiplica la replicación de los datos en el broker.",
      "Permite distribuir equitativamente la lectura de diferentes particiones de un tema entre múltiples consumidores.",
      "Actúa como proxy reverso para la seguridad en la autenticación.",
    ],
    correctAnswer:
      "Permite distribuir equitativamente la lectura de diferentes particiones de un tema entre múltiples consumidores.",
    explanation:
      "Un Consumer Group divide equitativamente las particiones de un Topic entre sus consumidores activos. Cada partición es leída por un solo consumidor del grupo.",
  },
  {
    id: "kafka-3",
    category: "Comunicación e Integración",
    subCategory: "Apache Kafka",
    question: "¿Cuál es el rol de un 'Broker' en Apache Kafka?",
    options: [
      "Es un nodo del servidor que almacena y sirve datos en los topics.",
      "Es el productor explícito que envia datos al clúster.",
      "Es el servicio que gestiona la elección de líderes exclusivamente (Zookeeper/KRaft).",
      "Es el offset manejado por el consumidor.",
    ],
    correctAnswer:
      "Es un nodo del servidor que almacena y sirve datos en los topics.",
    explanation:
      "El broker es el servidor Kafka que recibe mensajes, los guarda en disco y responde a las peticiones de fetch de los consumidores.",
  },
  {
    id: "kafka-4",
    category: "Comunicación e Integración",
    subCategory: "Apache Kafka",
    question: "¿Qué representa el 'Offset' en una partición de Kafka?",
    options: [
      "El tamaño en bytes del mensaje.",
      "Un identificador secuencial único otorgado a cada mensaje dentro de una partición.",
      "El identificador del productor que envió el mensaje.",
      "El tiempo en milisegundos que el mensaje ha estado en cola.",
    ],
    correctAnswer:
      "Un identificador secuencial único otorgado a cada mensaje dentro de una partición.",
    explanation:
      "El offset es un id numérico autoincremental que especifica la posición exacta de un registro dentro de una partición específica.",
  },
  {
    id: "kafka-5",
    category: "Comunicación e Integración",
    subCategory: "Apache Kafka",
    question:
      "En Kafka, ¿quién es el principal responsable de rastrear (trackear) qué mensajes han sido leídos exitosamente?",
    options: [
      "El Broker elimina inmediatamente el mensaje tras ser leído.",
      "El clúster Zookeeper mantiene una base de datos relacional con todos los registros eliminados.",
      "El Consumidor almacena (hace commit) de su Offset actual confirmando hasta qué punto ha leído.",
      "El Productor incluye un callback de lectura asíncrona.",
    ],
    correctAnswer:
      "El Consumidor almacena (hace commit) de su Offset actual confirmando hasta qué punto ha leído.",
    explanation:
      "A diferencia del patrón de colas tradicional, Kafka retiene los mensajes. Los consumidores confirman el progreso del offset explícita o automáticamente.",
  },
  {
    id: "kafka-6",
    category: "Comunicación e Integración",
    subCategory: "Apache Kafka",
    question:
      "¿Cuál de las siguientes es una característica que define la tolerancia a fallos en el almacenamiento de Kafka?",
    options: [
      "Kafka usa un sistema in-memory 100% que no toca el disco.",
      "Las particiones pueden tener 'Réplicas', donde un nodo es Líder y otros son Seguidores.",
      "Se requiere siempre una base de datos externa como Postgres para respaldar los topics.",
      "Los mensajes se destruyen si fallan tras un reintento.",
    ],
    correctAnswer:
      "Las particiones pueden tener 'Réplicas', donde un nodo es Líder y otros son Seguidores.",
    explanation:
      "Kafka replica particiones en múltiples brokers. Solo el Líder atiende lectura/escritura, y los Seguidores sincronizan datos garantizando fallo silencioso.",
  },
  {
    id: "kafka-7",
    category: "Comunicación e Integración",
    subCategory: "Apache Kafka",
    question:
      "¿Por qué Kafka es extremadamente rápido y capaz de manejar altos niveles de throughput (rendimiento) en disco?",
    options: [
      "Porque omite comprobaciones de integridad de CRC.",
      "Porque usa secuencias lógicas secuenciales I/O (Sequential I/O append log) apoyándose en la caché del sistema operativo.",
      "Porque comprime obligatoriamente toda la información perdiendo parte de la misma (lossy compression).",
      "Porque internamente traduce a MongoDB.",
    ],
    correctAnswer:
      "Porque usa secuencias lógicas secuenciales I/O (Sequential I/O append log) apoyándose en la caché del sistema operativo.",
    explanation:
      "Kafka escribe mensajes de manera secuencial (append-only log), lo que maximiza la eficiencia de las unidades de disco, sumado al 'Zero Copy'.",
  },
  {
    id: "kafka-8",
    category: "Comunicación e Integración",
    subCategory: "Apache Kafka",
    question: "¿Qué es 'Kafka Connect'?",
    options: [
      "Un driver JDBC para conectar Kafka a PostgreSQL estandarizado por SQL.",
      "Un framework para transmitir streams de Kafka directamente al navegador vía Websockets.",
      "Una herramienta y framework integrable para transportar datos fiablemente entre Kafka y otros sistemas (como BDs o S3).",
      "El nuevo nombre comercial de Zookeeper.",
    ],
    correctAnswer:
      "Una herramienta y framework integrable para transportar datos fiablemente entre Kafka y otros sistemas (como BDs o S3).",
    explanation:
      "Kafka Connect facilita la integración. Por ejemplo usa conectores Source para leer desde una BD y conectores Sink para enviar topics a ElasticSearch.",
  },
  {
    id: "kafka-9",
    category: "Comunicación e Integración",
    subCategory: "Apache Kafka",
    question:
      "Respecto a la semántica de entrega de mensajes en Kafka, ¿a qué se refiere 'Exactly Once' (Exactamente Una Vez)?",
    options: [
      "Cada mensaje enviado por el Productor será procesado por el Consumidor una y solo una vez, incluso si hay fallos o caídas del sistema intermedio.",
      "El productor elimina todos sus buffers justo después de enviarlo una vez.",
      "El consumidor borra permanentemente el mensaje del topic tras leerlo.",
      "Es imposible de lograr en absoluto en sistemas distribuidos y Kafka solo soporta At-Most-Once.",
    ],
    correctAnswer:
      "Cada mensaje enviado por el Productor será procesado por el Consumidor una y solo una vez, incluso si hay fallos o caídas del sistema intermedio.",
    explanation:
      "Con la introducción de transacciones en Kafka a partir de la v0.11, se soportan semánticas Exactly Once en aplicaciones Kafka Streams/productoras limitadas evitando dúplicados.",
  },
  {
    id: "kafka-10",
    category: "Comunicación e Integración",
    subCategory: "Apache Kafka",
    question:
      "¿Qué sucede con los mensajes en Kafka después de que un consumidor ha terminado de procesarlos exitosamente?",
    options: [
      "Se borran automáticamente del clúster de forma instantánea.",
      "Se mueven a una carpeta de 'Archive' o 'Dead Letter Queue'.",
      "Los mensajes permanecen almacenados en el log del broker hasta que caduca su política de retención (ej. basados en tiempo o tamaño de partición).",
      "Pierden su compresión.",
    ],
    correctAnswer:
      "Los mensajes permanecen almacenados en el log del broker hasta que caduca su política de retención (ej. basados en tiempo o tamaño de partición).",
    explanation:
      "Kafka es un registro persistente duradero. La retención (retention period) dicta cuánto viven los mensajes sin importar cuántas veces han sido leídos.",
  },

  // ------------------------------------------------------------------------
  // Apache Spark (Total 10)
  // ------------------------------------------------------------------------
  {
    id: "spark-1",
    category: "Gestión de Datos y Escalabilidad",
    subCategory: "Apache Spark",
    question:
      "¿Cuál es una de las principales diferencias entre 'Transformaciones' y 'Acciones' en Apache Spark?",
    options: [
      "Las transformaciones se ejecutan inmediatamente en memoria, las acciones escriben a disco.",
      "Las transformaciones son de evaluación perezosa (Lazy Evaluation), las acciones desencadenan la ejecución real del grafo computacional.",
      "Las transformaciones solo aceptan datos en formato JSON.",
      "No hay diferencia fundamental, ambos términos son sinónimos.",
    ],
    correctAnswer:
      "Las transformaciones son de evaluación perezosa (Lazy Evaluation), las acciones desencadenan la ejecución real del grafo computacional.",
    explanation:
      "Spark no ejecuta ninguna transformación (ej. map, filter) al ser declarada. Evalúa de forma perezosa y procesa hasta que se llama a una acción (ej. collect).",
  },
  {
    id: "spark-2",
    category: "Gestión de Datos y Escalabilidad",
    subCategory: "Apache Spark",
    question: "¿Qué es un RDD (Resilient Distributed Dataset) en Spark?",
    options: [
      "Una base de datos en memoria para procesar transacciones ACID en tiempo real.",
      "La unidad fundamental de datos inmutable y tolerante a fallos distribuida a lo largo de los nodos del clúster.",
      "Un modelo de Machine Learning distribuido.",
      "El componente que gestiona recursos similar a YARN.",
    ],
    correctAnswer:
      "La unidad fundamental de datos inmutable y tolerante a fallos distribuida a lo largo de los nodos del clúster.",
    explanation:
      "Los RDDs son la base original de la abstracción de datos en Spark. Representan colecciones inmutables distribuidas aptas para computación en paralelo.",
  },
  {
    id: "spark-3",
    category: "Gestión de Datos y Escalabilidad",
    subCategory: "Apache Spark",
    question:
      "¿Qué abstracción de datos en Spark es similar a la de un RDD pero, internamente, los datos están organizados en columnas con identificadores (similar a una tabla relacional)?",
    options: ["DataMatrix", "DataFrame", "DataCollection", "DistributedTable"],
    correctAnswer: "DataFrame",
    explanation:
      "Los DataFrames en Spark organizan los datos bajo un esquema semántico estructurado, y son el corazón de Spark SQL optimizados con el Catalyst Optimizer.",
  },
  {
    id: "spark-4",
    category: "Gestión de Datos y Escalabilidad",
    subCategory: "Apache Spark",
    question:
      "Durante un procesamiento largo, si necesitas usar el mismo DataFrame o RDD múltiples veces en distintas acciones sin regenerarlo, ¿qué técnica es imperativo utilizar para optimizar el rendimiento?",
    options: [
      "Uso de Parquet exclusivamente.",
      "Luminosidad.",
      "Caché / Persistencia (cache() o persist()).",
      "Transmitting / Broadcasting.",
    ],
    correctAnswer: "Caché / Persistencia (cache() o persist()).",
    explanation:
      "La operación de persistencia evalúa el dataset y lo guarda temporalmente en la RAM del clúster, haciéndolo de rápido acceso en iteraciones posteriores sin recalcular la dependencia del lineage.",
  },
  {
    id: "spark-5",
    category: "Gestión de Datos y Escalabilidad",
    subCategory: "Apache Spark",
    question:
      "En tareas que requieren agrupar por Keys masivas, ¿qué diferencia hace Spark frente a MapReduce de Hadoop que lo vuelve drásticamente más rápido?",
    options: [
      "Spark realiza el procesamiento íntegramente de extremo a extremo en disco duro.",
      "Spark tiene un límite estricto de 1 GB de memoria para forzar Garbage Collection.",
      "Spark aprovecha fuertemente el procesamiento en Memoria (In-Memory Processing) evitando la lectura/escritura en disco constante entre paso y paso.",
      "Spark no realiza Shuffle (el barajado de datos en la red).",
    ],
    correctAnswer:
      "Spark aprovecha fuertemente el procesamiento en Memoria (In-Memory Processing) evitando la lectura/escritura en disco constante entre paso y paso.",
    explanation:
      "Hadoop MR escribe a disco tras cada job intermedio; Spark por defecto retiene intermedios en memoria ram.",
  },
  {
    id: "spark-6",
    category: "Gestión de Datos y Escalabilidad",
    subCategory: "Apache Spark",
    question:
      "En configuraciones de Spark distribuidas, ¿quién es el nodo o proceso que coordina y distribuye las tareas entre los Worker nodes para ejecutar tu código?",
    options: [
      "El Executor.",
      "El Driver Program.",
      "El Task Tracker.",
      "Zookeeper local.",
    ],
    correctAnswer: "El Driver Program.",
    explanation:
      "El Spark Driver planifica, divide las tareas y coordina con el Cluster Manager entregándolas a los Executors.",
  },
  {
    id: "spark-7",
    category: "Gestión de Datos y Escalabilidad",
    subCategory: "Apache Spark",
    question:
      "Al cruzar (hacer Join) un DataFrame muy grande con uno muy pequeño, ¿cuál técnica de Spark evita el grave costo computacional del Shuffle de los datos a través de la red?",
    options: [
      "SortMerge Join",
      "Salting",
      "Broadcast Hash Join",
      "Cartesian Product Join",
    ],
    correctAnswer: "Broadcast Hash Join",
    explanation:
      "Distribuyendo permanentemente (Broadcast) el Dataset pequeño en la memoria de cada Worker Node, evitas redistribuir geográficamente en red la tabla gigante.",
  },
  {
    id: "spark-8",
    category: "Gestión de Datos y Escalabilidad",
    subCategory: "Apache Spark",
    question:
      "¿Cuál es el motor interno de optimización en Spark SQL que analiza tu consulta y toma decisiones óptimas de ejecución independientemente de la sintaxis (SQL, PySpark, etc.)?",
    options: [
      "Tungsten",
      "Catalyst Optimizer",
      "Query Planner",
      "Hive Metastore",
    ],
    correctAnswer: "Catalyst Optimizer",
    explanation:
      "Catalyst analiza los DataFrames y sentencias SQL, construyendo un Logical Plan y luego optimizando a múltiples Physical Plans seleccionando la ejecución más barata.",
  },
  {
    id: "spark-9",
    category: "Gestión de Datos y Escalabilidad",
    subCategory: "Apache Spark",
    question: "¿Qué es 'Spark Streaming' (o Structured Streaming)?",
    options: [
      "Un protocolo de video para procesar streams MPEG en Spark.",
      "Un motor integrado para el flujo de procesamiento de datos con micro-lotes (Micro-batching) continuos para simular real-time processing.",
      "Es una base de datos embebida parecida a Cassandra en Spark.",
      "Ninguna de las opciones.",
    ],
    correctAnswer:
      "Un motor integrado para el flujo de procesamiento de datos con micro-lotes (Micro-batching) continuos para simular real-time processing.",
    explanation:
      "Structured Streaming toma la misma API de DataFrames y la aplica como una corriente incremental e infinita que por detrás ejecuta micro-batches (lotes ultra reducidos).",
  },
  {
    id: "spark-10",
    category: "Gestión de Datos y Escalabilidad",
    subCategory: "Apache Spark",
    question:
      "Cuando un Worker o Executor falla en medio del cálculo de una partición parcial en Spark, ¿cómo se recupera la información inmutable sin empezar el programa completo desde cero?",
    options: [
      "Mediante una conexión backup directa por JDBC hacia base de datos.",
      "Haciendo Snapshot de VMWare del clúster cada 5 segundos constantemente.",
      "Reconstruyendo los datos usando el 'DAG de Linaje' o DAG Lineage graph que sabe las transformaciones parentales de esa partición perdida.",
      "No se recupera, las tareas abovedadas provocan la detención global y un mensaje de Fatal Error.",
    ],
    correctAnswer:
      "Reconstruyendo los datos usando el 'DAG de Linaje' o DAG Lineage graph que sabe las transformaciones parentales de esa partición perdida.",
    explanation:
      "Bajo la regla de resiliencia de los RDD, si un nodo se esfuma, el driver recrea localizadamente ese trozo recálculo de forma asíncrona apoyándose en el Lineage (Grafo) inmutable.",
  },

  // ------------------------------------------------------------------------
  // Java 8 (Total 10)
  // ------------------------------------------------------------------------
  {
    id: "java8-1",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 8",
    question:
      "¿Qué problema principal resuelve la introducción de `Optional<T>` en Java 8?",
    options: [
      "Reemplaza el uso de excepciones checked.",
      "Disminuye la frecuencia de OutOfMemoryError.",
      "Proporciona una forma explícita de representar ausencia de valor, reduciendo los NullPointerException.",
      "Optimiza consultas SQL directas en el backend.",
    ],
    correctAnswer:
      "Proporciona una forma explícita de representar ausencia de valor, reduciendo los NullPointerException.",
    explanation:
      "Optional encapsula la presencia/ausencia de un objeto forzándote a manejar el caso vacío, desaconsejando retornar un simple `null`.",
  },
  {
    id: "java8-2",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 8",
    question:
      "En la API de Streams (Java 8), si necesitas convertir un Stream tipo A en un objeto tipo B dentro de un pipeline, ¿qué método usas?",
    options: ["filter()", "map()", "reduce()", "collect()"],
    correctAnswer: "map()",
    explanation:
      "El método intermedio `map` procesa 1 a 1 cada elemento de tu flujo usando una función dada y devuelve un nuevo stream conteniendo el resultado procesado.",
  },
  {
    id: "java8-3",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 8",
    question:
      "¿Cuál de estos es un nuevo concepto crucial que introdujo Java 8 para permitir a las interfaces proveer lógica sin romper compatibilidad a versiones antiguas?",
    options: [
      "Clases Abstractas estúpidas",
      "Default Methods en Interfaces",
      "Private methods en Interfaces",
      "Constantes estáticas (final) en interfaces",
    ],
    correctAnswer: "Default Methods en Interfaces",
    explanation:
      "Los default methods (`default void myMethod() { ... }`) permitieron a Java añadir código (ej. el método `stream()` en Iterable) sin destrozar todas las clases heredadas ya existentes de clientes anteriores.",
  },
  {
    id: "java8-4",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 8",
    question: "¿Qué es una Expresión Lambda en Java 8?",
    options: [
      "Es una forma moderna sintáctica y consisa de implementar e instanciar Interfaces Funcionales.",
      "Una macro de C copiada en Java para reducir memoria caché.",
      "Es una anotación para marcar un objeto de datos.",
      "Un proceso concurrente aislado del hilo principal.",
    ],
    correctAnswer:
      "Es una forma moderna sintáctica y consisa de implementar e instanciar Interfaces Funcionales.",
    explanation:
      "Las Lambdas `(a, b) -> a + b` proporcionan implementaciones inline ligeras de interfaces abstractas que se definen conteniendo exactamente UN solo método.",
  },
  {
    id: "java8-5",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 8",
    question:
      "¿Qué condición esencial y pre-requisitito debe cumplir una interfaz para que se le pueda inyectar o vincular una Expresión Lambda en Java?",
    options: [
      "Heredar de la interfaz genérica `Object` implícitamente.",
      "No debe tener métodos privados.",
      "Ser marcada rigurosamente con atributos Javadoc @ThreadSafe.",
      "Debe ser una Interfaz Funcional (contener estrictamente un único método abstracto).",
    ],
    correctAnswer:
      "Debe ser una Interfaz Funcional (contener estrictamente un único método abstracto).",
    explanation:
      "Para que el compilador sepa firmemente a qué método quieres meter la lambda, la interfaz funcional solo puede tener 1 solo método a resolver (por lo cual, no hay ambigüedad).",
  },
  {
    id: "java8-6",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 8",
    question:
      "En Java 8 concurrencia asíncrona pura, ¿qué clase nueva introducida suplanta al clásico y muy limitado entorno bloqueante de `Future<T>` para manejar callbacks encadenables libremente?",
    options: [
      "ThreadBuilder",
      "CallablePromise",
      "CompletableFuture",
      "ReactiveXObservable",
    ],
    correctAnswer: "CompletableFuture",
    explanation:
      "El CompletableFuture admite flujos encadenados asincrónicos no-bloqueantes, combinaciones y manejo de callbacks sin detener el Main Thread explícitamente (`thenApply`, `thenAccept`).",
  },
  {
    id: "java8-7",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 8",
    question:
      "Dada la deprecación virtual de la clase utilitaria `java.util.Date`, ¿qué paquete o API se integró en Java 8 inspirada en la mítica librería Joda-Time?",
    options: [
      "java.time (JSR-310: LocalDateTime, Instant, etc.)",
      "java.sql.Datetime2",
      "java.clock (NTP Sync Clock)",
      "javax.temporal.TimeManager",
    ],
    correctAnswer: "java.time (JSR-310: LocalDateTime, Instant, etc.)",
    explanation:
      "Java incorporó internamente la brillante (y superiormente Thread-Safe/Immutable) API Date-Time liderada por las ideas previas experimentadas en Joda-Time.",
  },
  {
    id: "java8-8",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 8",
    question:
      "En Java 8 Streams, si tienes un `List<Usuario>` y deseas extraer velozmente todas las edades numéricas condensándolas devuelta a un conjunto único (`Set<Integer>`), ¿cuál finalizador necesitas usar tras tu map()?",
    options: [
      "return()",
      "toArray()",
      "collect(Collectors.toSet())",
      "flush()",
    ],
    correctAnswer: "collect(Collectors.toSet())",
    explanation:
      "La función puente-terminal `collect(...)` reúne y acumula los pedazos procesados de tu embudo Stream hacia una colección tangible como Lists, Sets o Maps.",
  },
  {
    id: "java8-9",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 8",
    question:
      "Respecto a la memoria JVM en Java 8, ¿qué área prehistórica persistente fue finalmente ELIMINADA y reabsorbida al sub-espacio nativo llamado Metaspace?",
    options: [
      "El stack de hilos enteros.",
      "PermGen (Permanent Generation).",
      "Eden Space.",
      "Heap Total.",
    ],
    correctAnswer: "PermGen (Permanent Generation).",
    explanation:
      "Desde JDK 8, la zona Permgen que generaba infinitos OOMExceptions al recargar clases dinámicas fue erradicada, optando por usar `Metaspace` que mapea nativa y elásticamente a la RAM del SO.",
  },
  {
    id: "java8-10",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 8",
    question:
      "¿Qué utilidad introducida son los Method References (`::`) en Java 8?",
    options: [
      "Punteros inseguros como en C++ gestionando direcciones físicas.",
      "Una versión reducida ultra-corta de escribir una lambda cuando su único cuerpo es reenviar parámetros as-is a un método conocido previamente.",
      "Una macro de reflección para evadir Scope genéricos.",
      "Funciones inyectadas en tiempo de compilación para CGLIB.",
    ],
    correctAnswer:
      "Una versión reducida ultra-corta de escribir una lambda cuando su único cuerpo es reenviar parámetros as-is a un método conocido previamente.",
    explanation:
      "En vez de `x -> System.out.println(x)`, un Method Reference compacta el código simplemente delegandolo con tipado sintético: `System.out::println`.",
  },

  // ------------------------------------------------------------------------
  // Java 11 (Total 10)
  // ------------------------------------------------------------------------
  {
    id: "java11-1",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 11",
    question:
      "¿Qué permitió hacer con la instrucción reservada parcial `var` a partir de Java 11 (originalmente introducida en JDK 10 para variables inferidas)?",
    options: [
      "Tipar variables estáticas a nivel clase.",
      "Usarlo en declaraciones de las expresiones Lambda permitiendo compatibilizar con sub-anotaciones.",
      "Usarlo como tipo de retorno genérico encubierto en la firma (Signature).",
      "Ignorar el compilador estricto para simular la desfachatez visual de Javascript.",
    ],
    correctAnswer:
      "Usarlo en declaraciones de las expresiones Lambda permitiendo compatibilizar con sub-anotaciones.",
    explanation:
      "Permitió inferir el parámetro en las lambdas pero decorarlas con `@NonNull var x`. Esto no podría anotarse omitiendo tipos de entrada.",
  },
  {
    id: "java11-2",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 11",
    question:
      "¿Qué API previamente de Incubación interna en versiones non-LTS anteriores se graduó al JDK standard a partir de Java 11 supliendo las deprimentes carencias crónicas respecto a la capa web?",
    options: [
      "Apache Commons Http",
      "Spring WebClient",
      "RestTemplate",
      "java.net.http.HttpClient",
    ],
    correctAnswer: "java.net.http.HttpClient",
    explanation:
      "HttpClient se consolidó nativamente admitiendo HTTP/2, APIs asíncronas modernas apegadas a CompletableFuture y WebSockets fluídos desde las utilidades de JDK puro sin requerir libs de terceros.",
  },
  {
    id: "java11-3",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 11",
    question:
      "En Java 11, introdujeron un comodísimo método en consola que altera por primera vez a nivel base, la norma tradicional impuesta de 'Compilar con javac' obligatoriamente a tus clases antes de pasarlas a la JVM. ¿De qué se trata?",
    options: [
      "Puedes inyectar DLLs binarias directamente usando javah.",
      "Javac dejó de existir y se unificó.",
      "Lanzar archivos de código fuente directamente con el comando `java` en modo script sin necesidad previa de una previa recopilación explicativa .class (File Source-Code Launcher).",
      "Un entorno de compilación desatendida en la nube remota.",
    ],
    correctAnswer:
      "Lanzar archivos de código fuente directamente con el comando `java` en modo script sin necesidad previa de una previa recopilación explicativa .class (File Source-Code Launcher).",
    explanation:
      "Ej. en vez de `javac Application.java` -> `java Application`, Java 11 permite ejecutar `java Application.java` simplificando inmensamene pruebas de scripts rapidos.",
  },
  {
    id: "java11-4",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 11",
    question:
      "Con respecto a las cadenas de texto (`String`), ¿cuál de estos útiles y convenientes métodos NO se incluyó estándar en la modernización de los Strings para Java 11?",
    options: [
      ".isBlank()",
      ".lines() para extraer el stream por salto de línea",
      ".repeat(int repeticiones)",
      ".reverse() para girar inversamente en tiempo O(1) inmutablemente",
    ],
    correctAnswer:
      ".reverse() para girar inversamente en tiempo O(1) inmutablemente",
    explanation:
      "Los métodos isBlank, lines, repeat, strip (mas agresivo que trim resolviendo utf-whitespaces) se sumaron genialmente. Reverse permanece aún en el dominio clásico mutable de `StringBuilder`.",
  },
  {
    id: "java11-5",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 11",
    question:
      "¿Qué tecnología vital legada de Java EE proveniente masivamente usada en arquitecturas Service-Oriented (WSDL/SOAP/XML) y RMI, fue FINALMENTE ELIMINADA por completo del core/JDK de Java 11?",
    options: [
      "Los Sockets TCP básicos",
      "Java EE CORBA/JAX-WS/JAXB",
      "AWD Swing Desktop",
      "El Garbage Collector G1",
    ],
    correctAnswer: "Java EE CORBA/JAX-WS/JAXB",
    explanation:
      "Debido a la disociación histórica de Java EE a Jakarta EE y con la proliferación de REST/JSON general, los pesados módulos SOAP como JAXB debían importarse luego separadamente en Maven. El JDK se podó para hacerse super-ligero.",
  },
  {
    id: "java11-6",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 11",
    question:
      "Al lidiar habitualmente con colecciones o Arrays inter-cambiables. En Java 11, ¿qué simplificación concisa trajo el nuevo método oficial `Collection.toArray(...)` si quisieras generar un arreglo de Strings a partir de una Lista base?",
    options: [
      "toArray(String[]::new)",
      "toArray<String>()",
      "convertArrays.String.class",
      "arrayMap(new String[])",
    ],
    correctAnswer: "toArray(String[]::new)",
    explanation:
      "Puedes usar directamente un constructor derivado simplificado sin la penosa necesidad tradicional de crear objetos en vacío previamente dimensionado. Ej. `lista.toArray(String[]::new)`",
  },
  {
    id: "java11-7",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 11",
    question:
      "¿Qué recolector de basura experimental 'ZGC' (Z Garbage Collector) incorporó escalón introductorio de incubado prometiendo pausas absurdamente mínimas y ultrarrápidas concurrentes no mayores a 10ms aplicadas usualmente sobre memorias Terabytes grandes?",
    options: [
      "Para unicamente contenedores docker en sistemas ARM locales.",
      "Para escalados de micro-servicios de 512mb en Kubernetes optimizado.",
      "Tratar HEAPS titánicamente gigantes de Multi-Terabytes eficientemente con tiempos en pause microscopicos irrelevantes.",
      "Ninguno, ZGC fue purgado por JEP-902.",
    ],
    correctAnswer:
      "Tratar HEAPS titánicamente gigantes de Multi-Terabytes eficientemente con tiempos en pause microscopicos irrelevantes.",
    explanation:
      "El ZGC estaba inicialmente enfocado en latencias ínfimas por debajo de los micro-cortes garantizando desempeño predecible bajo altísimas escalas sin preocuparse por los GB/TB asignados.",
  },
  {
    id: "java11-8",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 11",
    question:
      "¿Qué método relacionado al paquete File I/O moderno (`java.nio.file.Files`) se incrustó en el release 11 para leer e inscribir contenidos textuales enteros a archivos de golpe superando bucles verbosos?",
    options: [
      "Files.writeString() y Files.readString()",
      "Files.appendAllText()",
      "Files.overloadStream()",
      "Files.readToStringArray()",
    ],
    correctAnswer: "Files.writeString() y Files.readString()",
    explanation:
      "Basta iteraciones manuales con BufferedReader en modo primitivo: `Files.readString(Path)` es suficiente para vaciar cadenas estáticas con codificación UTF-8 predeterminada eficientemente.",
  },
  {
    id: "java11-9",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 11",
    question:
      "Entre los beneficios de portabilidad en Java 11 se dio fin al periodo de desatención del subsistema de variables ambientales bajo perfiles locales. Además, introdujero soportes al framework Flight Recorder para:",
    options: [
      "Conseguir registros analíticos internos/performance perfiles de la JVM bajando a producción con apenas \u003C1% de sobrecarga teórica total del stack (overhead low profile).",
      "Grabar un video en pantalla oculta de la GUI SWING.",
      "Registrar un log audital en una database JDBC sin configuración alguna de passwords.",
      "Enviar trazeados JSON automáticos al gateway de Google.",
    ],
    correctAnswer:
      "Conseguir registros analíticos internos/performance perfiles de la JVM bajando a producción con apenas \u003C1% de sobrecarga teórica total del stack (overhead low profile).",
    explanation:
      "Java Flight Recorder (JFR) es una herramienta potentísima para perfiles diagnósticos y métricas antes ocultas y propietarias comerciales que se abrió plenamente para uso gratuito bajo el marco OpenJDK.",
  },
  {
    id: "java11-10",
    category: "Plataformas y Lenguajes",
    subCategory: "Java 11",
    question:
      "¿Por qué Java 11 sigue siendo vitalmente popular años después de sus sucesores incrementales no-LTS (12,13, ... 16)?",
    options: [
      "Porque era la ultima version desarrollada por Sun Microsystems.",
      "Porque cuenta con la inmensa compatibilidad nativa directa a Node.js.",
      "Al ser oficialmente el primer gran salto Long Term Support (LTS) consolidado tras la épica iteración Java 8 dictaminando la madurez final del sistema de Modularidad y retro-compatibilidad garantizada empresarialmente por años.",
      "Porque permite desactivar libre y éticamente las Interfaces privativas.",
    ],
    correctAnswer:
      "Al ser oficialmente el primer gran salto Long Term Support (LTS) consolidado tras la épica iteración Java 8 dictaminando la madurez final del sistema de Modularidad y retro-compatibilidad garantizada empresarialmente por años.",
    explanation:
      "Gran masa organizativa corporativa suele congelarse sobre versiones LTS oficiales por las garantías seguras de parches y paridad sin turbulencias (y Java 11 suplió históricamente el cambio a la época Post-Java8).",
  },

  // ------------------------------------------------------------------------
  // Spring Boot (Total 10)
  // ------------------------------------------------------------------------
  {
    id: "spring-1",
    category: "Plataformas y Lenguajes",
    subCategory: "Spring Boot",
    question:
      "La anotación clásica `@SpringBootApplication` actúa como las tres siguientes anotaciones juntas:",
    options: [
      "@Configuration, @EnableAutoConfiguration, @ComponentScan",
      "@Entity, @Repository, @Controller",
      "@RestController, @Service, @Component",
      "@Bean, @Inject, @Autowired",
    ],
    correctAnswer: "@Configuration, @EnableAutoConfiguration, @ComponentScan",
    explanation:
      "Sirve como configuración (@Configuration), autoconfigura dependencias presentes (@EnableAutoConfiguration) y explora los componentes del classpath actual (@ComponentScan).",
  },
  {
    id: "spring-2",
    category: "Plataformas y Lenguajes",
    subCategory: "Spring Boot",
    question:
      "¿Qué módulo especial expone de inmediato endpoints HTTP para monitorear componentes, ver dependencias inyectadas o estado health/metrics de nuestra aplicación al instante en producción?",
    options: [
      "Spring Data JPA",
      "Spring Boot DevTools",
      "Spring Boot Actuator",
      "Spring Security",
    ],
    correctAnswer: "Spring Boot Actuator",
    explanation:
      "Actuator facilita el insight operativo productivo del framework (rutas /health o /info).",
  },
  {
    id: "spring-3",
    category: "Plataformas y Lenguajes",
    subCategory: "Spring Boot",
    question:
      "Dentro del ecosistema Inyección de Dependencias, ¿cuál es el `Scope` (Ciclo del Vida del Bean) asignado de manera absolutamente predeterminada para todos los Beans instanciados y declarados por el framework Spring?",
    options: ["Prototype", "Session", "Request", "Singleton"],
    correctAnswer: "Singleton",
    explanation:
      "A diferencia de Prototype, por defecto el contenedor IoC crea y maneja exclusivamente 1 única instancia persistente general, reteniendo el mismo objeto servido ante cualquier necesidad del bean en cualquier punto del código.",
  },
  {
    id: "spring-4",
    category: "Plataformas y Lenguajes",
    subCategory: "Spring Boot",
    question:
      "Al programar Controladores Web MVC robustos o RESTful. Si tu meta es enlazar directamente mapeos variables capturados incrustados explícitamente dentro de la misma URI visible textual de la solicitud HTTP (como /usuarios/{id}). ¿Qué anotación debe decorar tu parámetro en el método receptor?",
    options: [
      "@RequestHeader",
      "@CookieValue",
      "@RequestParam",
      "@PathVariable",
    ],
    correctAnswer: "@PathVariable",
    explanation:
      "Mientras que RequestParam captura el string post interrogación (?id=1), PathVariable permite el enrutamiento directo y limpio posicional de la propia URI (path base de URL) absorbiéndolo.",
  },
  {
    id: "spring-5",
    category: "Plataformas y Lenguajes",
    subCategory: "Spring Boot",
    question:
      "Hablando de gestión ORM persistente. ¿Para qué se utiliza primordialmente el decorador semántico especializado `@Transactional` dentro de un servicio o método transversal de Spring Boot (Data)?",
    options: [
      "Para configurar interceptores perimetrales de Loggers a consola en bases de datos.",
      "Para generar y auto-gestionar los límites transaccionales automáticos en un bloque, de modo que si se origina una Excepción persistente se efectúe en bloque un Rollback natural deshaciendo estados en la BD para evitar inconsistencia parcial.",
      "Para obligar a crear Hilos dedicados Asyncronos contra consultas selectivas.",
      "Para prevenir lecturas desde la Caché secundaria de EntityManger.",
    ],
    correctAnswer:
      "Para generar y auto-gestionar los límites transaccionales automáticos en un bloque, de modo que si se origina una Excepción persistente se efectúe en bloque un Rollback natural deshaciendo estados en la BD para evitar inconsistencia parcial.",
    explanation:
      "En la programación orientada a Aspectos y Proxys; encapsula sub-llámadas. Si en medio bloque falla un punto vital, previene que haya quedados insertados medios sucios o corrompidos aislando el Roll-back estricto relacional.",
  },
  {
    id: "spring-6",
    category: "Plataformas y Lenguajes",
    subCategory: "Spring Boot",
    question:
      "¿Qué finalidad operativa tiene proveer internamente `Starters` estructurados (como `spring-boot-starter-web`) a lo largo del empaquetado inicial de tu pom/gradle?",
    options: [
      "Descargar imágenes inicializadores del frontEnd GUI automáticamente al IDE.",
      "Reducir manualmente las transacciones base.",
      "Llenar por completo un pom de dependencias, librerías testeadas transitivas o autoconfiguraciones prefabricadas que trabajan lógicamente de base junta (bom/BOM).",
      "Inicializar un script de bases en la nube gratuita H2 remoto.",
    ],
    correctAnswer:
      "Llenar por completo un pom de dependencias, librerías testeadas transitivas o autoconfiguraciones prefabricadas que trabajan lógicamente de base junta (bom/BOM).",
    explanation:
      "Un starter resuelve la fatiga de configuración importando docenas de versiones seguras sub-dependientes (Jackson, Tomcat Embedded, Mvc) simplificándolas absurdamente en una mera y limpia línea unificadora y robusta.",
  },
  {
    id: "spring-7",
    category: "Plataformas y Lenguajes",
    subCategory: "Spring Boot",
    question:
      "A diferencia del clásico Servlet en contenedor externo, ¿qué permite que ejecutes tú Spring Boot App directamente con el humilde comando terminal base `java -jar` inmediatamente tras compilar?",
    options: [
      "El JVM moderno lo soporta.",
      "Compila un Server.c embebido mediante CNI Framework integrando la base del OS.",
      "Spring Boot envuelve la aplicación empacando dentro un Servidor Web Embebido de fondo (por defecto Tomcat local, Jetty o Undertow) logrando ser totalmente Auto-Contenida e independiente (Standalone).",
      "Se comunica al internet directamente.",
    ],
    correctAnswer:
      "Spring Boot envuelve la aplicación empacando dentro un Servidor Web Embebido de fondo (por defecto Tomcat local, Jetty o Undertow) logrando ser totalmente Auto-Contenida e independiente (Standalone).",
    explanation:
      "En vez de lidiar empujando compendios pesados WAR sobre administradores o middlewares, encapsula su contenedor de fondo pre-arrancándole de manera silenciosa internamente sin requerir configuraciones de despliegues aburridas.",
  },
  {
    id: "spring-8",
    category: "Plataformas y Lenguajes",
    subCategory: "Spring Boot",
    question:
      "¿Cuál es la jerarquía arquitectónica formal en capas recomendada convencionalmente por mejores intenciones sólidas en gran ecosistema Spring clásico standard?",
    options: [
      "Controller ➔ Model ➔ Factory",
      "Controller ➔ Repository ➔ Service",
      "Controller (Expone Entradas Web/REST) ➔ Service (Modela Lógica Base Negocio) ➔ Repository (Persistencia/DAO)",
      "Boundary ➔ Worker ➔ Thread ➔ JPA",
    ],
    correctAnswer:
      "Controller (Expone Entradas Web/REST) ➔ Service (Modela Lógica Base Negocio) ➔ Repository (Persistencia/DAO)",
    explanation:
      "Segregar las responsabilidades te salva del acoplamiento; El controlador despacha las peticiones periféricas; El servicio maneja la grasa lógica o cálculos sin que le interese la base de datos; Finalmente el repositorio salva a la BD sin preocuparse de la web.",
  },
  {
    id: "spring-9",
    category: "Plataformas y Lenguajes",
    subCategory: "Spring Boot",
    question:
      "¿Cómo logras comúnmente en que se inyecte una variable base configurable, credencial oculta o cadena clave desde tú archivo principal `.properties` o `.yml` incrustándola libremente en tu clase Componente local?",
    options: [
      'Utilizando el decorador @Value("${propiedad.ubicacion}") en la referencia variable superior.',
      "Heredando un EnvFile class estandarizada superior general abstracta base.",
      "Agregando getter properties hardcodeados en App.java base.",
      "Haciendo un System.getenv.fetchFile directa cada iteración de ciclo.",
    ],
    correctAnswer:
      'Utilizando el decorador @Value("${propiedad.ubicacion}") en la referencia variable superior.',
    explanation:
      "La directiva @Value permite acoplar valores crudos expuestos por externalización pre configurada. Pudiendo mapearla directamente sin complicarse con objetos intermediarios de Environment.",
  },
  {
    id: "spring-10",
    category: "Plataformas y Lenguajes",
    subCategory: "Spring Boot",
    question:
      "Bajo la convención de control universal de error-handling en servicios, ¿cómo se atrapan sistémicamente a nivel general/global (cross-cutting) las irregularidades y Excepciones para no enmarcar bloques Try/catch idénticos esparcidos tontamente en cada esquina de todos los Controladores existentes?",
    options: [
      "Reclutando y definiendo una clase transversal conjunta que ostente la anotación asilada superior `@ControllerAdvice` combinándose abajo con `@ExceptionHandler`.",
      "Es necesario siempre implementar FilterBase de jakarta para rechazar cada llamada interna general.",
      "Sobrescribiendo la interface TomcatExceptionHandlerErrorFactory custom interna embebida oculta.",
      "Usando un Aspecto con @Around puramente base intermedio de pointcut duro.",
    ],
    correctAnswer:
      "Reclutando y definiendo una clase transversal conjunta que ostente la anotación asilada superior `@ControllerAdvice` combinándose abajo con `@ExceptionHandler`.",
    explanation:
      "ControllerAdvice se adhiere mediante un Proxy envolviendo los componentes y es la bala de plata suprema donde un fallo interno del back genera una respuesta estandarizada manejada globalmente limpia en forma JSON sin duplicidad ni fatigas en Controladores.",
  },
];
