import type { TechDeck } from "@/features/data/techDecks_chunks/types";

export const techDecksPart2: TechDeck[] = [
  {
    id: "bases",
    name: "Bases",
    cards: [
      {
        prompt:
          "¿Qué determina la infraestructura crítica de una aplicación exitosa, decidiendo si puede escalar eficientemente o fallará bajo el peso de sus propios datos?",
        answer: "Una base de datos bien diseñada.",
      },
      {
        prompt:
          "¿Qué práctica de diseño de bases de datos se enfoca en estructurar los datos para reducir la redundancia y mejorar la integridad?",
        answer: "La normalización de la base de datos.",
      },
      {
        prompt:
          "Para acelerar las operaciones de recuperación de datos en una base de datos, se debe implementar una estrategia de _____ adecuada.",
        answer: "indexación (indexing)",
      },
      {
        prompt:
          "¿Qué práctica de diseño mejora la legibilidad y el mantenimiento del esquema de una base de datos mediante la estandarización de los nombres de los objetos?",
        answer: "El uso de convenciones de nomenclatura consistentes.",
      },
      {
        prompt:
          "El uso eficiente de recursos y la garantía de la integridad de los datos se logran a través de la _____ de los tipos de datos.",
        answer: "optimización",
      },
      {
        prompt:
          "¿Cómo se denomina el principio que mantiene la consistencia lógica entre tablas relacionadas en una base de datos?",
        answer: "Integridad referencial.",
      },
      {
        prompt:
          "El seguimiento de la evolución del esquema de una base de datos a lo largo del tiempo se gestiona mediante _____ y _____.",
        answer: "documentación y versionado",
      },
      {
        prompt:
          "La escritura de consultas eficientes desde el inicio es parte de la práctica de diseño de _____ y _____ de consultas.",
        answer: "rendimiento y diseño",
      },
      {
        prompt:
          "Según el Principio de Mínimo Privilegio en seguridad de bases de datos, ¿qué permisos se deben otorgar a los usuarios?",
        answer:
          "Únicamente los permisos mínimos necesarios para realizar sus funciones laborales.",
      },
      {
        prompt:
          "Para proteger los datos almacenados en la base de datos y los que se mueven a través de la red, se deben usar algoritmos de _____ fuertes.",
        answer: "cifrado (encriptación)",
      },
      {
        prompt:
          "¿Qué técnica se debe usar en el código de la aplicación para prevenir ataques de inyección SQL?",
        answer: "Consultas parametrizadas o sentencias preparadas.",
      },
      {
        prompt:
          "Para una seguridad robusta, se deben implementar políticas de contraseñas fuertes y habilitar la _____ para todos los usuarios de la base de datos.",
        answer: "autenticación multifactor (MFA)",
      },
      {
        prompt:
          "¿Qué herramienta es crucial para detectar comportamientos sospechosos e investigar incidentes de seguridad en una base de datos?",
        answer: "Los registros de auditoría (audit logs).",
      },
      {
        prompt: "¿Qué es la gestión de bases de datos (database management)?",
        answer:
          "El uso sistemático de tecnología y procesos para organizar, almacenar y recuperar datos de manera eficiente, garantizando su integridad, disponibilidad y seguridad.",
      },
      {
        prompt:
          "Un software especializado para interactuar con los datos de una base de datos se conoce como _____.",
        answer: "Sistema de Gestión de Bases de Datos (DBMS)",
      },
      {
        prompt:
          "Las bases de datos relacionales, o RDBMS, almacenan datos en _____ y _____ que forman tablas.",
        answer: "filas y columnas",
      },
      {
        prompt:
          "¿Qué se utiliza en las bases de datos relacionales para crear una relación entre dos o más tablas?",
        answer: "Una clave externa (foreign key).",
      },
      {
        prompt:
          "¿Qué tipo de base de datos almacena datos en documentos similares a objetos JSON?",
        answer: "Bases de datos de documentos.",
      },
      {
        prompt:
          "En las bases de datos de _____, cada registro de datos está representado por una clave única y un valor asociado.",
        answer: "clave-valor",
      },
      {
        prompt:
          "¿Qué tipo de base de datos NoSQL organiza los datos en columnas en lugar de filas y es útil para conjuntos de datos amplios y dispersos?",
        answer: "Almacenes de familias de columnas (o de columna ancha).",
      },
      {
        prompt:
          "Las bases de datos que almacenan información sobre personas, lugares y cosas en nodos, y las relaciones entre ellos en aristas, se llaman bases de datos de _____.",
        answer: "grafos",
      },
      {
        prompt: "Concepto: Cumplimiento de ACID.",
        answer:
          "Un conjunto de propiedades (Atomicidad, Consistencia, Aislamiento, Durabilidad) que garantizan la fiabilidad, consistencia e integridad de las transacciones de bases de datos.",
      },
      {
        prompt:
          "Debido a su esquema fijo, las bases de datos relacionales solo pueden almacenar datos _____.",
        answer: "estructurados",
      },
      {
        prompt: "¿Qué es una clave primaria (primary key)?",
        answer:
          "Una columna o un conjunto de columnas que identifica de forma única cada fila en una tabla.",
      },
      {
        prompt: "¿Qué es una clave externa (foreign key)?",
        answer:
          "Una columna o un conjunto de columnas en una tabla que hace referencia a la clave primaria de otra tabla, estableciendo una relación.",
      },
      {
        prompt:
          "Para que una tabla esté en la Primera Forma Normal (1NF), cada celda debe contener un solo valor, lo que se conoce como _____.",
        answer: "atomicidad",
      },
      {
        prompt:
          "La Segunda Forma Normal (2NF) requiere que una tabla esté en 1NF y que no tenga ninguna _____.",
        answer: "dependencia parcial",
      },
      {
        prompt:
          "Para que una tabla esté en la Tercera Forma Normal (3NF), debe estar en 2NF y no tener ninguna _____.",
        answer: "dependencia transitiva",
      },
      {
        prompt:
          "¿Qué tipo de índice en una base de datos determina el orden físico en que los registros de la tabla se almacenan en el disco?",
        answer: "Índice agrupado (clustered index).",
      },
      {
        prompt:
          "¿Cuántos índices agrupados (clustered indexes) puede tener una tabla?",
        answer:
          "Solo uno, porque los datos solo pueden estar ordenados físicamente de una manera.",
      },
      {
        prompt:
          "Un _____ es una estructura independiente de la tabla que contiene una copia de la columna indexada y un puntero hacia el registro real.",
        answer: "índice no agrupado (non-clustered index)",
      },
      {
        prompt:
          "¿Cuántos índices no agrupados (non-clustered indexes) puede tener una tabla en SQL Server?",
        answer: "Hasta 999.",
      },
      {
        prompt:
          "En SQL Server, la creación de una restricción de _____ crea automáticamente un índice agrupado en esa columna.",
        answer: "clave primaria (primary key)",
      },
      {
        prompt: "¿Qué es la persistencia políglota (Polyglot Persistence)?",
        answer:
          "Es un enfoque que utiliza el motor de base de datos más adecuado para cada microservicio o funcionalidad específica de una aplicación.",
      },
      {
        prompt:
          "El Teorema CAP postula que en un sistema distribuido solo se pueden garantizar plenamente dos de tres propiedades. ¿Cuáles son estas tres propiedades?",
        answer:
          "Consistencia (C), Disponibilidad (A) y Tolerancia a Particiones (P).",
      },
      {
        prompt:
          "En el contexto del Teorema CAP, ¿qué significa 'Consistencia'?",
        answer:
          "Que todos los clientes ven el mismo dato al mismo tiempo después de una escritura.",
      },
      {
        prompt:
          "En el contexto del Teorema CAP, ¿qué significa 'Disponibilidad'?",
        answer:
          "Que el sistema siempre responde a las solicitudes, incluso si algún nodo falla.",
      },
      {
        prompt:
          "En el contexto del Teorema CAP, ¿qué significa 'Tolerancia a Particiones'?",
        answer:
          "Que el sistema sigue funcionando a pesar de fallos en la comunicación de red entre nodos.",
      },
      {
        prompt:
          "Las bases de datos NoSQL a menudo priorizan la disponibilidad y la tolerancia a particiones, lo que lleva a un modelo de consistencia _____.",
        answer: "eventual",
      },
      {
        prompt:
          "¿Qué tipo de base de datos está optimizada para almacenar y consultar embeddings vectoriales utilizados en aplicaciones de LLM y redes neuronales?",
        answer: "Base de datos de vectores (vector database).",
      },
      {
        prompt:
          "¿Qué arquitectura de IA se habilita mediante bases de datos de vectores para reducir las alucinaciones al recuperar contexto relevante de una base de conocimientos?",
        answer: "RAG (Retrieval-Augmented Generation).",
      },
      {
        prompt:
          "PostgreSQL, tradicionalmente relacional, ha implementado el tipo de datos _____ para permitir consultas documentales con un rendimiento competitivo.",
        answer: "JSONB",
      },
      {
        prompt: "Un ejemplo de base de datos de documentos NoSQL es _____.",
        answer: "MongoDB",
      },
      {
        prompt: "Un ejemplo de base de datos de clave-valor NoSQL es _____.",
        answer: "Redis",
      },
      {
        prompt: "Un ejemplo de base de datos de columna ancha NoSQL es _____.",
        answer: "Apache Cassandra",
      },
      {
        prompt: "Un ejemplo de base de datos de grafos NoSQL es _____.",
        answer: "Neo4j",
      },
      {
        prompt:
          "El sublenguaje de SQL que se ocupa de definir la estructura de los objetos de la base de datos (tablas, vistas) se llama _____.",
        answer: "Lenguaje de Definición de Datos (DDL).",
      },
      {
        prompt:
          "¿Qué comando DDL se utiliza para crear una nueva tabla en una base de datos?",
        answer: "CREATE TABLE",
      },
      {
        prompt:
          "¿Qué comando DDL se utiliza para modificar la estructura de una tabla existente?",
        answer: "ALTER TABLE",
      },
      {
        prompt:
          "¿Qué comando DDL se utiliza para eliminar completamente una tabla, incluyendo su estructura y datos?",
        answer: "DROP TABLE",
      },
      {
        prompt:
          "El sublenguaje de SQL que permite a los usuarios manipular los datos (insertar, modificar, eliminar) se llama _____.",
        answer: "Lenguaje de Manipulación de Datos (DML).",
      },
      {
        prompt:
          "¿Qué comando DML se utiliza para agregar nuevos registros a una tabla?",
        answer: "INSERT INTO",
      },
      {
        prompt:
          "¿Qué comando DML se utiliza para modificar los valores de registros existentes?",
        answer: "UPDATE",
      },
      {
        prompt:
          "¿Qué comando DML se utiliza para eliminar registros de una tabla?",
        answer: "DELETE FROM",
      },
      {
        prompt:
          "El sublenguaje de SQL centrado exclusivamente en la lectura y recuperación de información se llama _____.",
        answer: "Lenguaje de Consulta de Datos (DQL).",
      },
      {
        prompt:
          "¿Cuál es el comando principal del DQL para recuperar datos de una base de datos?",
        answer: "SELECT",
      },
      {
        prompt:
          "El sublenguaje de SQL que permite controlar el acceso a los datos y los permisos de los usuarios se llama _____.",
        answer: "Lenguaje de Control de Datos (DCL).",
      },
      {
        prompt:
          "¿Qué comando DCL se utiliza para otorgar permisos a un usuario?",
        answer: "GRANT",
      },
      {
        prompt:
          "¿Qué comando DCL se utiliza para revocar permisos previamente concedidos a un usuario?",
        answer: "REVOKE",
      },
      {
        prompt:
          "El sublenguaje de SQL para la administración de transacciones se llama _____.",
        answer: "Lenguaje de Control de Transacciones (TCL).",
      },
      {
        prompt:
          "¿Qué comando TCL se utiliza para guardar permanentemente los cambios realizados en una transacción?",
        answer: "COMMIT",
      },
      {
        prompt:
          "¿Qué comando TCL se utiliza para deshacer las modificaciones desde el último COMMIT?",
        answer: "ROLLBACK",
      },
      {
        prompt: "¿Puede una clave primaria contener valores nulos?",
        answer:
          "No, una clave primaria no permite valores nulos para garantizar la identificación única de cada registro.",
      },
      {
        prompt: "¿Puede una clave externa contener valores duplicados?",
        answer:
          "Sí, una clave externa puede contener valores duplicados, ya que varias filas en una tabla pueden hacer referencia a la misma fila en otra tabla.",
      },
      {
        prompt: "¿Cuál es el propósito principal de una clave externa?",
        answer:
          "Establecer y mantener la integridad referencial entre tablas relacionadas.",
      },
      {
        prompt:
          "¿Qué sucede si se intenta insertar un valor en una clave externa que no existe en la clave primaria a la que hace referencia?",
        answer:
          "La operación falla debido a una violación de la restricción de integridad referencial.",
      },
      {
        prompt:
          "¿Qué tipo de DBMS organiza los datos en una estructura similar a un árbol con relaciones padre-hijo?",
        answer:
          "Sistema de Gestión de Bases de Datos Jerárquico (Hierarchical DBMS).",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de un índice agrupado (clustered index) para las búsquedas por rango?",
        answer:
          "Son extremadamente rápidas porque los registros relacionados están físicamente contiguos en el disco.",
      },
      {
        prompt:
          "El sobreuso de índices puede ralentizar las operaciones de _____, como INSERT, UPDATE y DELETE.",
        answer: "escritura",
      },
      {
        prompt:
          "Las bases de datos NoSQL son ideales para manejar datos no estructurados o _____ de manera eficiente.",
        answer: "semiestructurados",
      },
      {
        prompt:
          "Mientras que las bases de datos SQL escalan verticalmente, las bases de datos NoSQL están diseñadas para escalar _____.",
        answer: "horizontalmente",
      },
      {
        prompt:
          "¿Qué DBMS popular es un sistema de base de datos objeto-relacional (ORDBMS) de código abierto conocido por su robustez y cumplimiento de estándares SQL?",
        answer: "PostgreSQL.",
      },
      {
        prompt:
          "¿Qué DBMS popular es conocido por ser una base de datos NoSQL orientada a documentos que utiliza documentos similares a JSON?",
        answer: "MongoDB.",
      },
      {
        prompt:
          "¿Qué DBMS es un almacén de datos en memoria de código abierto utilizado a menudo como caché o agente de mensajes?",
        answer: "Redis.",
      },
      {
        prompt:
          "¿Qué DBMS es un motor de búsqueda y análisis distribuido de código abierto basado en Apache Lucene?",
        answer: "Elasticsearch.",
      },
      {
        prompt:
          "En una arquitectura de comercio electrónico híbrida, ¿qué tipo de base de datos sería ideal para gestionar pedidos y facturación donde la consistencia ACID es vital?",
        answer: "Una base de datos relacional como PostgreSQL.",
      },
      {
        prompt:
          "En una arquitectura de comercio electrónico híbrida, ¿qué tipo de base de datos sería ideal para el catálogo de productos con atributos variables?",
        answer: "Una base de datos de documentos como MongoDB.",
      },
      {
        prompt:
          "En una arquitectura de comercio electrónico híbrida, ¿qué tipo de base de datos sería ideal para un motor de recomendaciones basado en relaciones?",
        answer: "Una base de datos de grafos como Neo4j.",
      },
      {
        prompt:
          "¿Qué son los registros huérfanos (orphan records) en una base de datos relacional?",
        answer:
          "Son registros en una tabla secundaria cuya clave externa hace referencia a una clave primaria que ya no existe en la tabla principal.",
      },
      {
        prompt:
          "La Tercera Forma Normal (3NF) elimina las columnas que no dependen de la _____.",
        answer: "clave primaria",
      },
      {
        prompt:
          "En un índice no agrupado, ¿qué contiene la estructura del índice además de la columna indexada?",
        answer:
          "Un puntero o localizador de fila que apunta a la ubicación del registro real en la tabla.",
      },
      {
        prompt:
          "El problema de consulta N+1 ocurre cuando una aplicación realiza una consulta inicial para recuperar una lista de elementos y luego _____ consultas adicionales para obtener detalles de cada elemento.",
        answer: "N",
      },
      {
        prompt: "El lenguaje de consulta utilizado por MongoDB se llama _____.",
        answer: "MongoDB Query Language (MQL)",
      },
      {
        prompt:
          "MongoDB almacena datos en formato _____, que es una representación binaria de JSON.",
        answer: "BSON",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia entre los modelos de consistencia de las bases de datos relacionales y no relacionales?",
        answer:
          "Las relacionales garantizan consistencia estricta (ACID), mientras que las no relacionales a menudo optan por consistencia eventual.",
      },
      {
        prompt:
          "El comando SQL `TRUNCATE` borra todos los datos de una tabla pero mantiene su _____, a diferencia de `DROP` que la elimina por completo.",
        answer: "estructura",
      },
      {
        prompt:
          "¿Qué cláusula SQL se utiliza para filtrar filas antes de cualquier agrupación o agregación?",
        answer: "WHERE",
      },
      {
        prompt:
          "¿Qué cláusula SQL se utiliza para filtrar los resultados de un `GROUP BY` después de la agregación?",
        answer: "HAVING",
      },
      {
        prompt:
          "La virtualización de bases de datos abstrae la base de datos de su almacenamiento físico, permitiendo múltiples instancias _____ en el mismo hardware.",
        answer: "virtuales",
      },
      {
        prompt:
          "¿Qué estrategia de almacenamiento segmenta los datos en niveles según la frecuencia de uso y las necesidades de rendimiento?",
        answer: "Soluciones de almacenamiento por niveles (tiered storage).",
      },
      {
        prompt:
          "El uso de modelos de machine learning para predecir posibles fallos de la base de datos se conoce como _____.",
        answer: "análisis predictivo de fallos (predictive failure analytics)",
      },
      {
        prompt:
          "La combinación de bases de datos relacionales y no relacionales para abordar diversas necesidades de datos se conoce como modelos de bases de datos _____.",
        answer: "híbridos",
      },
      {
        prompt: "¿Qué es una vista indexada (Indexed View) en SQL Server?",
        answer:
          "Es una vista cuyos resultados se precalculan y almacenan físicamente, permitiendo una recuperación de datos más rápida.",
      },
      {
        prompt:
          "Al igual que una tabla, una vista indexada requiere un índice _____ único para poder materializar los datos.",
        answer: "agrupado (clustered)",
      },
      {
        prompt: "¿Cuál es la ventaja de rendimiento de una vista indexada?",
        answer:
          "Mejora drásticamente el rendimiento de las consultas al evitar el cálculo repetido de los resultados, ya que estos están pre-almacenados.",
      },
      {
        prompt:
          "Para evitar el `vendor lock-in`, es recomendable utilizar herramientas de base de datos que sean completamente de _____ y no `forks` propietarios.",
        answer: "código abierto (open source)",
      },
      {
        prompt:
          "Una base de datos que funciona directamente dentro de la aplicación sin requerir un proceso de servidor separado se considera _____.",
        answer: "sin servidor (serverless) o embebida",
      },
      {
        prompt:
          "SQLite es un ejemplo de una base de datos relacional _____ que almacena toda la base de datos en un único archivo físico.",
        answer: "sin servidor (serverless)",
      },
      {
        prompt:
          "La práctica de analizar los patrones de consulta de una aplicación para aplicar índices estratégicamente a columnas usadas en cláusulas WHERE, JOIN y ORDER BY se llama _____.",
        answer: "indexar con intención",
      },
      {
        prompt:
          "El proceso de organizar las columnas y tablas de una base de datos para minimizar la redundancia de datos se denomina _____.",
        answer: "normalización",
      },
      {
        prompt:
          "La Forma Normal de Boyce-Codd (BCNF) es una versión más estricta de la _____.",
        answer: "Tercera Forma Normal (3NF)",
      },
      {
        prompt:
          "En una base de datos NoSQL, el almacenamiento de datos como agrupaciones de pares clave-valor es la función de una base de datos _____.",
        answer: "clave-valor",
      },
      {
        prompt:
          "En una base de datos de grafos, las relaciones entre entidades se almacenan como _____.",
        answer: "aristas (edges)",
      },
      {
        prompt:
          "La capacidad de una base de datos para manejar grandes volúmenes de datos y altas cargas de tráfico mediante la adición de más servidores se conoce como _____.",
        answer: "escalabilidad horizontal",
      },
      {
        prompt:
          "La capacidad de una base de datos para manejar mayores cargas aumentando los recursos de un único servidor (CPU, RAM) se conoce como _____.",
        answer: "escalabilidad vertical",
      },
      {
        prompt:
          "La característica de bases de datos como Cassandra que permite la distribución de datos en varios centros de datos para resistir interrupciones regionales es su arquitectura _____.",
        answer: "descentralizada",
      },
      {
        prompt:
          "¿Qué término describe el conjunto de herramientas que incluye Elasticsearch, Logstash y Kibana para la ingesta, búsqueda y visualización de datos?",
        answer: "Elastic Stack (anteriormente ELK Stack).",
      },
      {
        prompt:
          "Una de las principales ventajas de usar convenciones de nomenclatura consistentes es que hace que el esquema sea _____, facilitando su comprensión.",
        answer: "autodocumentado",
      },
      {
        prompt:
          "El uso de un tipo de dato `INT` para una columna que solo almacenará valores booleanos (0 o 1) es un ejemplo de una mala práctica de _____.",
        answer: "optimización de tipos de datos",
      },
      {
        prompt:
          "¿Qué problema de rendimiento puede causar la fragmentación de índices?",
        answer:
          "Puede degradar severamente el rendimiento de las consultas al requerir más lecturas de página.",
      },
      {
        prompt:
          "En sistemas con muchas operaciones de escritura (OLTP), un número excesivo de índices puede _____ el rendimiento.",
        answer: "reducir o afectar negativamente",
      },
      {
        prompt:
          "En sistemas con muchas operaciones de lectura (OLAP), múltiples índices estratégicos pueden _____ significativamente el rendimiento.",
        answer: "mejorar o acelerar",
      },
      {
        prompt:
          "En el diseño de bases de datos, ¿por qué es una buena práctica usar sustantivos en singular para los nombres de las tablas?",
        answer:
          "Porque cada fila de la tabla representa una única instancia de esa entidad (p. ej., una fila en la tabla `Cliente` es un solo cliente).",
      },
      {
        prompt:
          "El uso de `snake_case` o `camelCase` para nombrar objetos de la base de datos es un ejemplo de una _____.",
        answer: "convención de nomenclatura",
      },
      {
        prompt: "¿Qué es un esquema de base de datos?",
        answer:
          "Es el plano o la estructura lógica de una base de datos que define cómo se organizan los datos, sus relaciones y las restricciones impuestas.",
      },
      {
        prompt:
          "La capacidad de una base de datos para soportar múltiples modelos de datos (como relacional, documental y de grafos) en un solo sistema se denomina _____.",
        answer: "multimodelo",
      },
      {
        prompt:
          "Cuando una consulta utiliza todas las columnas que necesita directamente desde un índice sin acceder a la tabla base, se dice que el índice _____ la consulta.",
        answer: "cubre (covering index)",
      },
    ],
  },
  {
    id: "big_data",
    name: "Big Data",
    cards: [
      {
        prompt:
          "¿Qué unidad de información digital se compone de un grupo de 8 bits?",
        answer: "Un byte (o un carácter).",
      },
      {
        prompt: "Definición de datos estructurados.",
        answer:
          "Datos organizados que siguen un formato específico, generalmente almacenados en bases de datos relacionales.",
      },
      {
        prompt:
          "¿Qué tipo de datos incluye texto, imágenes, videos y publicaciones en redes sociales que carecen de un formato rígido?",
        answer: "Datos no estructurados.",
      },
      {
        prompt: "¿Qué son los datos semiestructurados?",
        answer:
          "Datos que no cumplen con un esquema rígido pero contienen elementos organizativos como etiquetas o metadatos.",
      },
      {
        prompt:
          '¿Cuáles son las tres "V" fundamentales que caracterizan al Big Data?',
        answer: "Volumen, Velocidad y Variedad.",
      },
      {
        prompt: 'En el contexto de Big Data, ¿a qué se refiere la "Veracidad"?',
        answer:
          "A la calidad, confiabilidad y exactitud de los datos recopilados.",
      },
      {
        prompt:
          "¿Qué término describe la inconsistencia o fluctuaciones en la estructura y formato de los grandes volúmenes de datos?",
        answer: "Variabilidad.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia de almacenamiento entre un Data Warehouse y un Data Lake?",
        answer:
          "El Data Warehouse almacena datos estructurados, mientras que el Data Lake admite datos estructurados, semiestructurados y no estructurados.",
      },
      {
        prompt:
          "¿Qué ventaja ofrece un Data Lakehouse sobre un Data Lake tradicional respecto a la integridad de los datos?",
        answer:
          "El cumplimiento de las propiedades ACID (Atomicidad, Consistencia, Aislamiento y Durabilidad).",
      },
      {
        prompt:
          "¿Cómo se denomina la estructura jerárquica de almacenamiento que utiliza directorios, subdirectorios y protocolos como NFS o SMB?",
        answer: "File Storage (Almacenamiento de archivos).",
      },
      {
        prompt:
          "¿En qué tipo de almacenamiento los datos se dividen en trozos identificados por un ID único y se gestionan en discos separados?",
        answer: "Block Storage (Almacenamiento por bloques).",
      },
      {
        prompt:
          "¿Qué método de almacenamiento es ideal para datos no estructurados al tratarlos como unidades con ID único, atributos y metadatos?",
        answer: "Object Storage (Almacenamiento de objetos).",
      },
      {
        prompt:
          "¿Cuáles son los seis tipos de datos soportados por el formato JSON?",
        answer: "String, Number, Boolean, Array, Object y Null.",
      },
      {
        prompt:
          "¿Por qué el formato Parquet se considera un formato de almacenamiento columnar o híbrido?",
        answer:
          "Porque organiza los datos por columnas para optimizar lecturas y agregaciones, dividiéndolos en grupos de filas (Row Groups).",
      },
      {
        prompt:
          '¿Qué beneficio ofrece la compresión "Snappy" en los archivos Parquet?',
        answer:
          "Reduce los costes de almacenamiento y mejora la eficiencia de las operaciones de entrada/salida (I/O).",
      },
      {
        prompt: 'En el diseño interno de Parquet, ¿qué es un "Column Chunk"?',
        answer:
          "Un fragmento de los datos de una columna específica dentro de un grupo de filas (Row Group).",
      },
      {
        prompt:
          '¿Qué técnica de optimización en Spark permite reducir el número de archivos pequeños en Parquet sin realizar un "full shuffle"?',
        answer: "Coalesce.",
      },
      {
        prompt:
          "¿Qué función de codificación en Parquet almacena la longitud del prefijo de la entrada anterior más el sufijo actual?",
        answer: "Delta Strings (codificación incremental).",
      },
      {
        prompt:
          "En un archivo CSV, ¿qué propósito cumple la fila de encabezado (header row)?",
        answer:
          "Proporcionar etiquetas descriptivas para los datos contenidos en cada columna.",
      },
      {
        prompt:
          "¿Cuál es el lenguaje nativo en el que está escrito Apache Spark?",
        answer: "Scala.",
      },
      {
        prompt:
          "Según el estudio comparativo, ¿qué lenguaje demostró mejor rendimiento al procesar archivos CSV pequeños ($5$ MB)?",
        answer: "Python (con $6.71$ segundos).",
      },
      {
        prompt:
          "¿Qué lenguaje resultó ser más eficiente para operaciones complejas de ETL con joins de gran tamaño en Spark?",
        answer: "Scala (con $374.42$ segundos en la prueba de mayor carga).",
      },
      {
        prompt: "¿Qué es Apache Iceberg?",
        answer:
          "Un formato de tabla analítica abierto que permite gestionar grandes volúmenes de datos con transacciones ACID y evolución de esquema.",
      },
      {
        prompt: '¿Qué permite la "evolución de esquema" en Apache Iceberg?',
        answer:
          "Modificar la estructura de las tablas sin necesidad de reescribir todos los datos existentes.",
      },
      {
        prompt:
          "En la arquitectura de Iceberg, ¿qué contiene el directorio de metadatos (metadata)?",
        answer:
          "Información sobre el esquema de la tabla, sus lotes (batches), historial de cambios y transacciones.",
      },
      {
        prompt:
          "¿Para qué sirve el parámetro `overwrite-mode=dynamic` al escribir en Iceberg con Spark?",
        answer:
          "Para optimizar el proceso de actualización de datos minimizando el número de lotes que deben ser sobreescritos.",
      },
      {
        prompt: "¿Qué es un Dataset en Apache Spark?",
        answer:
          "Una colección distribuida de datos que ofrece tipado fuerte y los beneficios del motor de ejecución optimizado de Spark SQL.",
      },
      {
        prompt:
          "¿En qué lenguajes de programación está disponible la API de Dataset?",
        answer: "Scala y Java.",
      },
      {
        prompt: "Definición de DataFrame en Spark.",
        answer:
          "Un Dataset organizado en columnas con nombre, equivalente a una tabla en una base de datos relacional.",
      },
      {
        prompt:
          "¿Cuál es la propiedad de configuración de Hadoop para establecer la clave de acceso secreta de Amazon S3 en Spark?",
        answer: "fs.s3a.secret.key",
      },
      {
        prompt:
          '¿Qué comando de `sbt` se utiliza para crear un "fat jar" del cliente jspark?',
        answer: "sbt assembly",
      },
      {
        prompt:
          "¿Qué prefijo debe tener la URL JDBC para conectar jspark con Databricks/Spark?",
        answer: "jdbc:hive2://",
      },
      {
        prompt:
          '¿Qué comando "mágico" permite ejecutar sentencias SQL directamente en una celda de un notebook de PySpark?',
        answer: "%%sparksql",
      },
      {
        prompt: "¿Cuál es la función del conector BigQuery para Spark?",
        answer:
          "Permitir que el código de Spark cargue datos desde tablas de BigQuery y escriba los resultados de vuelta.",
      },
      {
        prompt:
          '¿Qué es una "Runtime Template" (plantilla de sesión) en Spark Serverless de Google Cloud?',
        answer:
          "Un archivo de configuración que contiene los parámetros para ejecutar código Spark en una sesión interactiva.",
      },
      {
        prompt:
          '¿Para qué sirve el "Persistent History Server" (PHS) en el ecosistema Dataproc?',
        answer:
          "Para permitir el acceso a los registros (logs) de las sesiones de Spark durante y después de su ejecución.",
      },
      {
        prompt:
          "¿Qué herramienta se utiliza para programar la ejecución de notebooks de Spark mediante Cloud Composer?",
        answer: "El Job Scheduler (basado en Apache Airflow).",
      },
      {
        prompt:
          "En el diseño de Parquet, ¿qué representan los valores R (Repetition levels)?",
        answer:
          "Indican en qué nivel de una estructura anidada se repite un valor.",
      },
      {
        prompt:
          "En el diseño de Parquet, ¿qué representan los valores D (Definition levels)?",
        answer:
          "Indican cuántos niveles de una estructura anidada opcional están realmente definidos (no son nulos).",
      },
      {
        prompt: '¿Qué es la "Evaluación Perezosa" (Lazy Evaluation) en Spark?',
        answer:
          "Estrategia donde las transformaciones no se ejecutan inmediatamente, sino que se planifican hasta que se invoca una acción.",
      },
      {
        prompt:
          '¿Qué permite la "Ejecución Adaptativa de Consultas" (Adaptive Query Execution - AQE)?',
        answer:
          "Optimizar el plan de ejecución de una consulta SQL en tiempo real basándose en las estadísticas de los datos intermedios.",
      },
      {
        prompt: '¿Cuál es el tamaño por defecto de un "Row Group" en Parquet?',
        answer: "$128$ MB.",
      },
      {
        prompt:
          "¿Qué codificación en Parquet es la más simple y almacena los valores uno tras otro?",
        answer: "PLAIN.",
      },
      {
        prompt:
          "¿Qué sucede con los valores nulos de una columna al ser guardados en formato Parquet?",
        answer: "No se almacenan físicamente, lo que ahorra espacio en disco.",
      },
      {
        prompt:
          "En Spark SQL, ¿cómo se representa un DataFrame en el lenguaje Scala?",
        answer: "Como un alias de tipo de `Dataset[Row]`.",
      },
      {
        prompt:
          "¿Qué extensión de JupyterLab permite explorar datasets de BigQuery y editar archivos de Cloud Storage?",
        answer:
          "La extensión de Dataproc (o JupyterLab extension for Google Cloud).",
      },
      {
        prompt:
          "¿Qué protocolo de acceso se utiliza para leer archivos desde S3 en Spark de forma optimizada?",
        answer: "s3a://.",
      },
      {
        prompt:
          "¿Qué comando se usa para iniciar JupyterLab en un entorno virtual de Python?",
        answer: "jupyter lab",
      },
      {
        prompt:
          "¿Qué rol de IAM permite a un usuario crear sesiones de notebooks interactivos en Dataproc?",
        answer: "Dataproc Editor (roles/dataproc.editor).",
      },
      {
        prompt:
          "¿Cuál es el tiempo máximo de inactividad permitido para una sesión de Spark Serverless?",
        answer: "336 horas (14 días).",
      },
      {
        prompt:
          '¿Qué permite el "Dynamic Partition Pruning" en el motor de Spark?',
        answer:
          "Evitar la lectura de particiones innecesarias en un join basándose en los resultados del filtrado de la otra tabla.",
      },
      {
        prompt:
          "En Parquet, ¿cuál es el tamaño por defecto de una página (page)?",
        answer: "$1$ MB.",
      },
      {
        prompt:
          "¿Qué tipo de codificación en Parquet utiliza enteros de longitud variable para almacenar números?",
        answer: "Delta Encoding.",
      },
      {
        prompt:
          "¿Qué técnica en CSV se utiliza si un valor contiene comillas dobles internamente?",
        answer:
          "Escapar la comilla usando una barra invertida (\\) antes de la misma.",
      },
      {
        prompt:
          "¿Qué componente de Spark gestiona los recursos y ejecuta las consultas en un entorno distribuido?",
        answer: "Spark Session.",
      },
      {
        prompt:
          "En el estudio de rendimiento, ¿cuál fue el tiempo de Scala para procesar el archivo CSV de $1.6$ GB?",
        answer: "$47.72$ segundos.",
      },
      {
        prompt:
          "¿Para qué sirve el parámetro `inferSchema=true` al leer un CSV en Spark?",
        answer:
          "Para que Spark analice automáticamente el contenido del archivo y determine el tipo de dato de cada columna.",
      },
      {
        prompt: "¿Qué es un clúster de Dataproc en Compute Engine?",
        answer:
          "Un conjunto de máquinas virtuales gestionadas que ejecutan Hadoop y Spark para procesamiento de datos.",
      },
      {
        prompt:
          "¿Qué significan las siglas PII, HIPAA y PCI en el contexto de seguridad de datos?",
        answer:
          "Regulaciones y estándares para proteger información personal identificable, datos de salud y datos de tarjetas de pago.",
      },
      {
        prompt:
          "¿Qué característica de Big Data se refiere al valor comercial que se puede extraer del análisis de grandes volúmenes?",
        answer: "Value (Valor).",
      },
      {
        prompt: "Diferencia entre `repartition()` y `coalesce()` en Spark.",
        answer:
          "`repartition()` realiza un shuffle completo para redistribuir datos, mientras que `coalesce()` reduce el número de particiones minimizando el shuffle.",
      },
      {
        prompt: '¿Qué es el "Catalyst Optimizer"?',
        answer:
          "El motor de optimización de consultas de Spark SQL que genera planes de ejecución eficientes.",
      },
      {
        prompt:
          "¿Qué formato de almacenamiento es mejor para realizar operaciones OLTP (inserción y actualización rápida)?",
        answer: "Almacenamiento basado en filas (Row-based storage).",
      },
      {
        prompt:
          "¿Qué formato de almacenamiento es mejor para operaciones OLAP (análisis y agregaciones)?",
        answer: "Almacenamiento basado en columnas (Columnar storage).",
      },
      {
        prompt:
          "En jspark, ¿cómo se definen las credenciales si no se usan argumentos de línea de comandos?",
        answer:
          "En el archivo de configuración `application.conf` dentro de la sección `credentials`.",
      },
      {
        prompt: "¿Qué permite la función `broadcast()` en un join de Spark?",
        answer:
          "Enviar una copia de un dataset pequeño a todos los nodos ejecutores para acelerar la unión con un dataset grande.",
      },
      {
        prompt: "¿Qué es una transacción ACID?",
        answer:
          "Un conjunto de propiedades que garantizan que las operaciones de base de datos se procesen de manera confiable.",
      },
      {
        prompt: "En Iceberg, ¿qué indica el archivo `.parquet.crc`?",
        answer:
          "Es un archivo de control de redundancia cíclica para verificar la integridad del archivo Parquet asociado.",
      },
      {
        prompt: '¿Qué es el "Metadata Layer" en un Data Lakehouse?',
        answer:
          "Una capa que gestiona transacciones y metadatos sobre archivos en almacenamiento de bajo coste, como S3 o ADLS.",
      },
      {
        prompt:
          "¿Cuál es la función del archivo `core-site.xml` en una configuración de Spark/Hadoop?",
        answer:
          "Almacenar configuraciones a nivel de sitio, incluyendo credenciales de sistemas de archivos externos.",
      },
      {
        prompt:
          "¿Qué herramienta permite virtualizar el entorno de Python para instalar la extensión de JupyterLab?",
        answer: "pipenv.",
      },
      {
        prompt: '¿Qué es un "Executor Core" en la configuración de Spark?',
        answer:
          "La unidad de procesamiento (CPU) asignada a un ejecutor para realizar tareas en paralelo.",
      },
      {
        prompt:
          '¿Cuál es el propósito del "Staging Bucket" en las plantillas de Dataproc Serverless?',
        answer:
          "Almacenar temporalmente archivos necesarios para la ejecución del workload en Cloud Storage.",
      },
      {
        prompt:
          "¿Qué sucede si no se especifica una cuenta de servicio en una plantilla de Spark Serverless?",
        answer:
          "Se utiliza por defecto la cuenta de servicio predeterminada de Compute Engine.",
      },
      {
        prompt: "En JSON, ¿cómo se representa un valor nulo?",
        answer: "Con la palabra clave `null`.",
      },
      {
        prompt:
          '¿Qué técnica de compresión en Parquet es conocida como "incremental encoding"?',
        answer: "Delta Strings.",
      },
      {
        prompt:
          "¿Qué significa que un DataFrame sea conceptualmente equivalente a una tabla en una base de datos relacional?",
        answer:
          "Que tiene una estructura definida por columnas con nombre y tipos de datos específicos.",
      },
      {
        prompt:
          "Según la documentación de Spark 4.1.1, ¿Python soporta la API de Dataset?",
        answer: "No, debido a su naturaleza dinámica.",
      },
      {
        prompt:
          "¿Qué comando de `gcloud` se usa para inicializar la configuración del proyecto y la región?",
        answer: "gcloud init",
      },
      {
        prompt:
          "¿Cuál es la versión mínima de Python requerida para instalar la extensión de JupyterLab de Dataproc?",
        answer: "Python 3.11 o superior.",
      },
    ],
  },
  {
    id: "clean_architecture",
    name: "Clean Architecture",
    cards: [
      {
        prompt:
          "¿Cuál es la regla primordial que hace funcionar la Arquitectura Limpia (Clean Architecture)?",
        answer:
          "La Regla de Dependencia: las dependencias del código fuente solo deben apuntar hacia adentro, hacia políticas de más alto nivel.",
      },
      {
        prompt:
          "En la Arquitectura Lambda, ¿cuál es la función de la capa de lote (batch layer)?",
        answer:
          "Calcular vistas (batch views) a partir de todo el conjunto de datos maestro, ofreciendo una visión completa y precisa de los datos.",
      },
      {
        prompt:
          "Según los principios SOLID, ¿qué establece el Principio de Responsabilidad Única (SRP)?",
        answer:
          "Un módulo de software debe tener una, y solo una, razón para cambiar, lo que significa que debe ser responsable ante un único actor.",
      },
      {
        prompt:
          "La Arquitectura Hexagonal también se conoce como el patrón de _____ y _____.",
        answer: "Puertos y Adaptadores (Ports and Adapters)",
      },
      {
        prompt:
          '¿Qué es la "inmutabilidad" en el contexto de un modelo de datos para Big Data?',
        answer:
          "Es la propiedad por la cual, una vez que se escribe una unidad de datos, nunca puede ser modificada; las actualizaciones se logran agregando nuevos datos con marca de tiempo.",
      },
      {
        prompt:
          "¿Qué establece el Principio de Inversión de Dependencias (DIP)?",
        answer:
          "El código que implementa políticas de alto nivel no debe depender del código que implementa detalles de bajo nivel; en su lugar, los detalles deben depender de las políticas.",
      },
      {
        prompt:
          "En la Arquitectura Lambda, ¿cuál es el propósito de la capa de servicio (serving layer)?",
        answer:
          "Indexar y exponer las vistas de lote (batch views) para que puedan ser consultadas con baja latencia.",
      },
      {
        prompt:
          "Un síntoma de la violación del Principio de Responsabilidad Única (SRP) es cuando dos actores diferentes dependen del mismo código, lo que puede llevar a _____ durante el desarrollo.",
        answer: "conflictos de fusión (merges)",
      },
      {
        prompt: "En una Arquitectura Hexagonal, ¿qué representa un 'puerto'?",
        answer:
          "Un 'puerto' es una interfaz que define cómo la lógica de dominio puede ser accedida o cómo puede interactuar con sistemas externos.",
      },
      {
        prompt:
          "¿Por qué la tolerancia a fallos humanos es la ventaja más importante del modelo de datos inmutable?",
        answer:
          "Porque si se escriben datos incorrectos, los datos buenos anteriores aún existen, lo que permite la recuperación simplemente eliminando los datos incorrectos y recalculando las vistas.",
      },
      {
        prompt:
          '¿Qué significa que una arquitectura "grite" su intención (Screaming Architecture)?',
        answer:
          "Significa que la estructura de paquetes y nombres de clases del sistema comunica claramente su propósito y los casos de uso que implementa.",
      },
      {
        prompt:
          "El paradigma de computación distribuida que se puede utilizar para implementar una capa de lote y que es inherentemente escalable se conoce como _____.",
        answer: "MapReduce",
      },
      {
        prompt:
          "Según el Principio Abierto/Cerrado (OCP), ¿cómo deben diseñarse los sistemas de software para que sean fáciles de cambiar?",
        answer:
          "Deben permitir que su comportamiento se cambie agregando nuevo código, en lugar de modificar el código existente.",
      },
      {
        prompt:
          "En la Arquitectura Limpia, ¿qué tipo de reglas de negocio se encuentran en la capa de Casos de Uso (Use Cases)?",
        answer:
          "Contiene reglas de negocio específicas de la aplicación que orquestan el flujo de datos hacia y desde las entidades.",
      },
      {
        prompt:
          '¿Qué es la "desnormalización" en el contexto de las bases de datos de la capa de servicio?',
        answer:
          "Es la técnica de almacenar información de forma redundante para evitar uniones (joins) en tiempo de consulta y así mejorar la latencia.",
      },
      {
        prompt:
          "¿Qué problema resuelve el Principio de Segregación de Interfaces (ISP)?",
        answer:
          "Evita que los clientes dependan de métodos que no utilizan, aconsejando la creación de interfaces más pequeñas y específicas.",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia entre los datos y la información en el contexto de los sistemas de Big Data?",
        answer:
          "Los 'datos' son la información que no se puede derivar de nada más (los axiomas), mientras que la 'información' es la colección general de conocimiento.",
      },
      {
        prompt:
          "En la Arquitectura Limpia, los _____ son los objetos que encapsulan las reglas de negocio críticas para toda la empresa.",
        answer: "Entidades (Entities)",
      },
      {
        prompt:
          "¿Cuál es la función del procesamiento de flujos (stream processing) de 'un solo elemento a la vez' (one-at-a-time)?",
        answer:
          "Procesar los datos evento por evento a medida que llegan, lo que es ideal para baja latencia pero puede ser ineficiente.",
      },
      {
        prompt:
          "El Principio de Sustitución de Liskov (LSP) establece que los objetos de una superclase deben poder ser reemplazados por objetos de una _____ sin alterar la corrección del programa.",
        answer: "subclase",
      },
      {
        prompt:
          "En una Arquitectura Hexagonal, ¿qué representa un 'adaptador'?",
        answer:
          "Un 'adaptador' es una implementación concreta de un puerto que interactúa con un sistema externo, como una base de datos o una interfaz de usuario web.",
      },
      {
        prompt:
          "¿Qué es el procesamiento de flujos por 'micro-lotes' (micro-batch stream processing)?",
        answer:
          "Es un enfoque que procesa tuplas como lotes discretos, combinando la eficiencia del procesamiento por lotes con la baja latencia del procesamiento de flujos.",
      },
      {
        prompt:
          "En la Arquitectura Limpia, ¿dónde se ubican los frameworks y los drivers (por ejemplo, la base de datos, la UI web)?",
        answer:
          "Se ubican en el círculo más externo, ya que son detalles de bajo nivel de los que las políticas de alto nivel no deben depender.",
      },
      {
        prompt:
          "Al diseñar una capa de servicio, ¿por qué un índice de tipo 'clave a mapa ordenado' (key to a sorted map) es ideal para consultas de rangos de tiempo?",
        answer:
          "Porque todos los valores para un rango se almacenan secuencialmente en el disco, lo que hace que sea extremadamente barato leerlos todos a la vez.",
      },
      {
        prompt:
          "Una arquitectura de software debe ser agnóstica a la _____ de los cambios para evitar que el costo de desarrollo crezca desproporcionadamente.",
        answer: "forma (shape)",
      },
      {
        prompt:
          "Para hacer cumplir los límites de la arquitectura en Java, se puede usar el modificador de visibilidad _____ para limitar el acceso a clases dentro del mismo paquete.",
        answer: "package-private",
      },
      {
        prompt: '¿Qué es una "arquitectura de plugin"?',
        answer:
          "Es un patrón donde las reglas de negocio principales se mantienen separadas e independientes de componentes que son opcionales o que pueden tener múltiples implementaciones.",
      },
      {
        prompt:
          "En la implementación de la capa de persistencia, ¿qué ventaja ofrece el uso de interfaces de puerto estrechas (narrow port interfaces)?",
        answer:
          "Proporciona la flexibilidad de implementar un puerto de una manera y otro de otra, posiblemente con diferentes tecnologías de persistencia.",
      },
      {
        prompt:
          "El paradigma de programación que impone disciplina en la transferencia indirecta de control se llama _____.",
        answer:
          "Programación Orientada a Objetos (Object-Oriented Programming)",
      },
      {
        prompt:
          'En el contexto de los sistemas distribuidos, ¿qué es la "consistencia eventual" (eventual consistency)?',
        answer:
          "Es la propiedad de un sistema altamente disponible donde, una vez que termina una partición de red, el sistema eventualmente vuelve a un estado consistente.",
      },
      {
        prompt:
          "Según Robert C. Martin, ¿cuál es el único modo de ir rápido en el desarrollo de software?",
        answer:
          "Ir bien, lo que implica mantener el código y la arquitectura limpios y bien estructurados.",
      },
      {
        prompt:
          '¿Qué es la "normalización de URL" en el contexto de un flujo de trabajo de la capa de lote?',
        answer:
          "Es el proceso de convertir todas las URLs de los datos maestros a su forma canónica para asegurar la consistencia en los cálculos.",
      },
      {
        prompt:
          "El patrón _____ sirve para desacoplar comportamientos complejos o difíciles de probar en una parte que es fácilmente comprobable y otra que no lo es.",
        answer: "Humble Object",
      },
      {
        prompt: "En el paradigma MapReduce, ¿qué hace la función `map`?",
        answer:
          "Examina un registro a la vez y emite un par clave-valor intermedio.",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de desacoplar la lógica de dominio de la interfaz de usuario y la persistencia?",
        answer:
          "Permite que la lógica de dominio evolucione independientemente, haciendo el software más mantenible y adaptable a los cambios.",
      },
      {
        prompt: "En el paradigma MapReduce, ¿qué hace la función `reduce`?",
        answer:
          "Recibe una clave y todos los valores asociados a esa clave y los procesa para producir el resultado final.",
      },
      {
        prompt:
          "En la Arquitectura Limpia, el flujo de control y la dependencia del código fuente no siempre apuntan en la misma dirección gracias al principio de _____.",
        answer: "Inversión de Dependencias (Dependency Inversion)",
      },
      {
        prompt:
          '¿Qué son los "diagramas de tuberías" (pipe diagrams) en el contexto de la computación por lotes?',
        answer:
          "Son una forma de alto nivel para especificar computaciones sobre grandes cantidades de datos que pueden ser compiladas a una serie de trabajos MapReduce.",
      },
      {
        prompt:
          "¿Qué son las dependencias transitivas y por qué son una violación de un buen diseño?",
        answer:
          "Ocurren cuando una entidad depende de algo que no usa directamente; violan el principio de no depender de cosas que no son necesarias.",
      },
      {
        prompt:
          "La capacidad de un lenguaje orientado a objetos que permite que el mismo código funcione con diferentes tipos de objetos se denomina _____.",
        answer: "polimorfismo",
      },
      {
        prompt:
          "En un sistema de Big Data, el conjunto de datos maestro debe ser una fuente de verdad _____ y _____, conteniendo únicamente datos brutos.",
        answer: "inmutable y de solo adición (append-only)",
      },
      {
        prompt:
          "El patrón de diseño _____ establece una interfaz utilizada por los clientes e implementada por clases de servicio, sentando las bases para un futuro límite arquitectónico.",
        answer: "Strategy",
      },
      {
        prompt:
          "¿Cuál es el propósito del framework de serialización Thrift en un modelo de datos de Big Data?",
        answer:
          "Permite definir y hacer cumplir un esquema riguroso para los datos, generando código para leer, escribir y validar objetos que coincidan con el esquema.",
      },
      {
        prompt:
          "Un monolito, en términos de modo de desacoplamiento, es una estructura donde todos los componentes se ejecutan en el mismo espacio de direcciones y se comunican mediante _____.",
        answer: "llamadas a funciones simples",
      },
      {
        prompt:
          "El algoritmo _____ es un ejemplo de un algoritmo de aproximación para el conteo de elementos distintos que puede usarse para reducir el tamaño de las vistas de lote.",
        answer: "HyperLogLog",
      },
      {
        prompt:
          "¿Cuál es el objetivo principal al trazar límites (boundaries) en la arquitectura de software?",
        answer:
          "Separar los elementos de software y restringir el conocimiento entre ellos, permitiendo aplazar decisiones y proteger la lógica de negocio principal.",
      },
      {
        prompt:
          "¿Cuál es la consecuencia clave de la inmutabilidad de los datos en un sistema de Big Data?",
        answer:
          "Cada pieza de dato es verdadera a perpetuidad; una vez que un dato es verdadero, siempre lo será.",
      },
      {
        prompt:
          '¿Qué es la "denormalización de identificador de usuario" en un sistema de análisis web?',
        answer:
          "Es el proceso de consolidar múltiples identificadores de usuario que pertenecen a la misma persona en un único identificador canónico.",
      },
      {
        prompt:
          "El patrón _____ es un límite arquitectónico simple que sacrifica la inversión de dependencias, donde una clase expone todos los servicios como métodos.",
        answer: "Facade",
      },
      {
        prompt:
          "En el contexto del modelo basado en hechos (fact-based model), ¿qué son las 'propiedades'?",
        answer:
          "Son información sobre las entidades, como la edad, el género o la ubicación de un usuario.",
      },
      {
        prompt:
          "El paradigma de programación funcional se basa en la noción de _____, lo que significa que el valor de los símbolos no cambia.",
        answer: "inmutabilidad",
      },
      {
        prompt:
          "En un sistema de archivos distribuido como HDFS, ¿cómo se logra la tolerancia a fallos?",
        answer:
          "Los bloques de archivos se replican en múltiples nodos, por lo que los datos siguen estando disponibles incluso si una máquina falla.",
      },
      {
        prompt:
          "La programación estructurada demostró que todos los programas pueden construirse a partir de solo tres estructuras: secuencia, selección y _____.",
        answer: "iteración",
      },
      {
        prompt:
          "En la Arquitectura Lambda, ¿por qué es esencial tener un flujo de trabajo de recálculo puro, incluso si se utilizan optimizaciones incrementales?",
        answer:
          "Porque es necesario para reconstruir las vistas desde cero en caso de que se corrompan o si la lógica de cálculo cambia.",
      },
      {
        prompt:
          "La métrica de estabilidad de componentes 'Fan-in' mide el número de dependencias _____.",
        answer: "entrantes (clases externas que dependen de clases internas)",
      },
      {
        prompt:
          "¿Qué problema puede causar el uso de entidades de dominio directamente como modelos de entrada o salida en un caso de uso?",
        answer:
          "Puede crear un acoplamiento no deseado entre la lógica de dominio y los adaptadores externos, violando la separación de conceptos.",
      },
      {
        prompt:
          "La métrica de estabilidad de componentes 'Fan-out' mide el número de dependencias _____.",
        answer: "salientes (clases internas que dependen de clases externas)",
      },
      {
        prompt:
          "¿Qué es la estrategia de mapeo 'completa' (full mapping) entre capas?",
        answer:
          "Utiliza modelos de entrada y salida separados para cada caso de uso, proporcionando el máximo desacoplamiento entre las capas.",
      },
      {
        prompt:
          "El Principio de Dependencias Estables (SDP) establece que se debe depender en la dirección de la _____.",
        answer: "estabilidad",
      },
      {
        prompt:
          "¿Por qué es crucial que los datos que cruzan los límites de la Arquitectura Limpia sean estructuras de datos simples y aisladas?",
        answer:
          "Para evitar violar la Regla de Dependencia, ya que pasar estructuras complejas (como un 'row structure' de una base de datos) forzaría a un círculo interno a conocer algo de un círculo externo.",
      },
      {
        prompt:
          "Un ciclo en el grafo de dependencias de componentes puede fusionar efectivamente varios componentes en uno solo, causando el síndrome de 'la mañana siguiente' donde los desarrolladores _____.",
        answer: "se pisan unos a otros (stepping on each other's toes)",
      },
      {
        prompt:
          "El Principio de Abstracciones Estables (SAP) establece que un componente debe ser tan abstracto como _____.",
        answer: "estable",
      },
      {
        prompt:
          "En el contexto del firmware, la abstracción de hardware (HAL) sirve como una capa que aísla el software de los detalles específicos del _____, mejorando la portabilidad.",
        answer: "hardware",
      },
      {
        prompt:
          "Al diseñar un sistema, la arquitectura que se elige a menudo está fuertemente influenciada por la estructura _____ de la organización que lo desarrolla, un concepto relacionado con la Ley de Conway.",
        answer: "social",
      },
      {
        prompt:
          "¿Cuál es uno de los principales riesgos de basar la arquitectura de una aplicación en un framework?",
        answer:
          "El framework a menudo viola la Regla de Dependencia y se acopla fuertemente al núcleo del negocio, dificultando su posterior eliminación o cambio.",
      },
      {
        prompt:
          "La dificultad para realizar un cambio en el software debe ser proporcional al _____ del cambio, no a su forma.",
        answer: "alcance (scope)",
      },
      {
        prompt:
          "¿Qué es la falacia del desacoplamiento en las arquitecturas de microservicios?",
        answer:
          "Es la creencia errónea de que los servicios están fuertemente desacoplados, cuando en realidad a menudo están acoplados por datos o comportamiento.",
      },
      {
        prompt:
          "En JCascalog, un _____ es una función de Java que genera dinámicamente una subconsulta, permitiendo la composición y reutilización de lógica.",
        answer: "macro de predicado (predicate macro)",
      },
      {
        prompt:
          "¿Cuál es la diferencia entre la validación de entrada y la validación de reglas de negocio en un caso de uso?",
        answer:
          "La validación de entrada verifica la sintaxis y el formato, mientras que la validación de reglas de negocio se ocupa de la lógica de dominio y el estado del modelo.",
      },
      {
        prompt:
          "El término 'gran bola de lodo' (big ball of mud) se usa para describir un sistema de software que carece de una _____ perceptible.",
        answer: "arquitectura",
      },
      {
        prompt:
          "En el contexto de la capa de velocidad (speed layer), ¿por qué las operaciones idempotentes, como agregar a un conjunto HyperLogLog, son importantes para la tolerancia a fallos?",
        answer:
          "Porque si una operación falla y se reintenta, ejecutarla varias veces tiene el mismo efecto que ejecutarla una sola vez, manteniendo la precisión del sistema.",
      },
    ],
  },
  {
    id: "devops",
    name: "Devops",
    cards: [
      {
        prompt:
          "¿Cuál es el objetivo principal de la metodología de la App de 12 Factores?",
        answer:
          "Abordar las complejidades de construir y mantener aplicaciones de software modernas en entornos de nube, impulsando la agilidad y escalabilidad.",
      },
      {
        prompt:
          "Según la App de 12 Factores, ¿cómo debe ser gestionado el código base de una aplicación?",
        answer:
          "Debe haber una única base de código rastreada en un control de versiones, que acompañe a múltiples despliegues diversificados.",
      },
      {
        prompt:
          "El principio de _____ de la App de 12 Factores requiere declarar y aislar explícitamente las dependencias del software.",
        answer: "Dependencias (Dependencies)",
      },
      {
        prompt:
          "¿Dónde debe almacenarse la configuración de una aplicación según el tercer factor de la App de 12 Factores?",
        answer:
          "La configuración debe almacenarse en el entorno (environment), por ejemplo, como variables de entorno.",
      },
      {
        prompt:
          "¿Cómo deben ser tratados los servicios de respaldo (backing services) como bases de datos o sistemas de mensajería según la App de 12 Factores?",
        answer:
          "Deben ser tratados como recursos adjuntos, permitiendo cambiarlos sin modificar el código de la aplicación.",
      },
      {
        prompt:
          "La metodología de la App de 12 Factores exige una separación estricta entre las etapas de _____, _____ y _____.",
        answer: "Compilación (Build), Lanzamiento (Release) y Ejecución (Run)",
      },
      {
        prompt:
          "De acuerdo con el sexto factor de la App de 12 Factores, ¿cómo debe ejecutarse la aplicación?",
        answer:
          "Como uno o más procesos sin estado (stateless) que no retienen datos entre ejecuciones.",
      },
      {
        prompt:
          "¿Qué principio de la App de 12 Factores establece que los servicios deben exportarse a través de la vinculación a puertos (port binding)?",
        answer: "El séptimo principio, Port Binding.",
      },
      {
        prompt:
          "¿Cómo se logra la concurrencia en una App de 12 Factores para manejar una mayor carga?",
        answer:
          "Escalando la aplicación horizontalmente mediante el modelo de procesos.",
      },
      {
        prompt:
          "¿Qué significa el principio de 'Desechabilidad' (Disposability) en la App de 12 Factores?",
        answer:
          "Significa que los procesos deben poder iniciarse rápidamente y apagarse de forma fiable para maximizar la robustez del sistema.",
      },
      {
        prompt:
          "Para evitar inconsistencias y errores específicos del entorno, ¿qué recomienda el principio de 'Paridad Dev/Prod'?",
        answer:
          "Mantener los entornos de desarrollo, preproducción (staging) y producción lo más similares posible.",
      },
      {
        prompt:
          "Según el factor 'Logs' de la App de 12 Factores, ¿cómo deben ser tratados los registros (logs)?",
        answer:
          "Como flujos de eventos (event streams), dirigiéndolos a un servicio de agregación centralizado en lugar de gestionarlos en archivos locales.",
      },
      {
        prompt:
          "¿Qué es un SBOM (Software Bill of Materials) en el contexto de la seguridad de la cadena de suministro de software?",
        answer:
          "Es un inventario formal de los componentes y dependencias que componen una aplicación de software moderna.",
      },
      {
        prompt: "¿Cuál es el objetivo principal de las herramientas FinOps?",
        answer:
          "Proporcionar visibilidad en tiempo real sobre el uso de recursos en la nube y sus costos asociados para optimizar el gasto sin sacrificar el rendimiento.",
      },
      {
        prompt:
          "Las herramientas FinOps autónomas, como Sedai, se diferencian de las tradicionales porque no solo ofrecen recomendaciones, sino que también _____.",
        answer:
          "actúan de forma autónoma para ajustar recursos y optimizar costos en tiempo real",
      },
      {
        prompt: "Concepto: Plataforma de Ingeniería (Platform Engineering)",
        answer:
          "Es un enfoque que se centra en crear plataformas internas para desarrolladores (IDPs) que simplifican el desarrollo de software proporcionando capacidades de autoservicio y automatizando operaciones de infraestructura.",
      },
      {
        prompt:
          "Uno de los beneficios clave de las Plataformas Internas para Desarrolladores (IDPs) es la reducción de la _____ en los desarrolladores al abstraer las complejidades de la infraestructura.",
        answer: "carga cognitiva (cognitive load)",
      },
      {
        prompt:
          "¿Cuál es la principal diferencia en la estrategia de despliegue entre Blue-Green y Canary?",
        answer:
          "Blue-Green cambia todo el tráfico a un nuevo entorno de una vez, mientras que Canary lo desvía gradualmente a un pequeño subconjunto de usuarios.",
      },
      {
        prompt:
          "En una estrategia de despliegue Blue-Green, ¿qué representa el entorno 'azul' y qué representa el 'verde'?",
        answer:
          "El 'azul' representa la versión de producción actual y estable, mientras que el 'verde' es el nuevo entorno con la versión a liberar.",
      },
      {
        prompt:
          "¿Qué ventaja principal ofrece el despliegue Blue-Green en términos de reversión (rollback)?",
        answer:
          "Permite una reversión casi instantánea simplemente redirigiendo el tráfico de vuelta al entorno anterior (azul).",
      },
      {
        prompt:
          "¿Cuál es la principal desventaja del despliegue Blue-Green en términos de recursos?",
        answer:
          "Requiere el doble de infraestructura, ya que se deben mantener dos entornos de producción idénticos simultáneamente.",
      },
      {
        prompt:
          "La estrategia de despliegue _____ es ideal para identificar problemas potenciales antes de que afecten a todos los usuarios, al exponer los cambios a un pequeño porcentaje de ellos.",
        answer: "Canary",
      },
      {
        prompt:
          "¿Para qué tipo de aplicaciones es especialmente adecuada la estrategia Canary?",
        answer:
          "Para aplicaciones orientadas al consumidor donde los cambios en la experiencia del usuario pueden tener un gran impacto en el negocio.",
      },
      {
        prompt:
          "¿Qué herramienta de Kubernetes se especializa en estrategias de despliegue avanzadas como Blue-Green y Canary, extendiendo la funcionalidad de los Deployments nativos?",
        answer: "Argo Rollouts.",
      },
      {
        prompt: "Defina GitOps.",
        answer:
          "Es un marco operativo para Kubernetes que utiliza Git como la única fuente de verdad para la infraestructura declarativa y las aplicaciones.",
      },
      {
        prompt:
          "Herramientas como _____ y _____ son implementaciones populares del modelo GitOps para Kubernetes.",
        answer: "ArgoCD, Flux",
      },
      {
        prompt:
          "¿Qué significa que GitOps tenga capacidades de 'auto-sanación' (self-healing)?",
        answer:
          "El agente de GitOps detecta desviaciones (drift) entre el estado del clúster y el estado en Git, y revierte automáticamente los cambios manuales no autorizados.",
      },
      {
        prompt:
          "En Infraestructura como Código (IaC), ¿cuál es la principal diferencia entre Terraform y Crossplane en cuanto a su modelo operativo?",
        answer:
          "Terraform sigue un flujo de 'planificar y aplicar' que se ejecuta bajo demanda, mientras que Crossplane utiliza un modelo de reconciliación continua nativo de Kubernetes.",
      },
      {
        prompt:
          "¿En qué almacena Terraform el estado de la infraestructura que gestiona?",
        answer:
          "En un archivo de estado (state file), que puede ser local o remoto, y que mapea los recursos definidos con las instancias reales en la nube.",
      },
      {
        prompt:
          "¿Cómo permite Pulumi definir la infraestructura como código de una manera diferente a Terraform?",
        answer:
          "Permite usar lenguajes de programación de propósito general (como Python o TypeScript) en lugar de un lenguaje específico de dominio (HCL).",
      },
      {
        prompt:
          "Crossplane extiende Kubernetes para que actúe como un plano de control universal, definiendo los recursos de infraestructura como _____.",
        answer: "Recursos Personalizados (Custom Resources o CRDs)",
      },
      {
        prompt:
          "Una de las mejores prácticas para las pipelines de CI/CD en Kubernetes es escanear las imágenes de contenedor en busca de _____ antes de desplegarlas.",
        answer: "vulnerabilidades",
      },
      {
        prompt:
          "¿Por qué es una mala práctica usar etiquetas de imagen mutables como ':latest' en despliegues de producción de Kubernetes?",
        answer:
          "Porque la imagen real a la que apunta la etiqueta puede cambiar, lo que dificulta la reproducibilidad y las reversiones fiables.",
      },
      {
        prompt: "Concepto: Observabilidad",
        answer:
          "La capacidad de inferir el estado interno de un sistema a partir de sus salidas externas (telemetría), permitiendo responder preguntas sobre fallos desconocidos.",
      },
      {
        prompt:
          "¿Cuáles son los tres pilares de la telemetría en la observabilidad?",
        answer: "Métricas (Metrics), Registros (Logs) y Trazas (Traces).",
      },
      {
        prompt:
          "En observabilidad, las _____ proporcionan datos numéricos sobre el rendimiento (el 'qué'), los _____ proporcionan registros de eventos detallados (el 'porqué'), y las _____ rastrean flujos de peticiones (el 'dónde').",
        answer: "métricas, registros, trazas",
      },
      {
        prompt:
          "¿Qué estándar de código abierto se ha convertido en la norma universal para instrumentar aplicaciones y recopilar telemetría de forma agnóstica al proveedor?",
        answer: "OpenTelemetry.",
      },
      {
        prompt:
          "¿Cuál es la diferencia fundamental entre el balanceo de carga de Capa 4 (L4) y el de Capa 7 (L7)?",
        answer:
          "L4 opera en la capa de transporte (TCP/UDP) basándose en IP y puerto, mientras que L7 opera en la capa de aplicación (HTTP) y puede inspeccionar el contenido.",
      },
      {
        prompt:
          "El balanceo de carga de _____ es más rápido y consume menos CPU porque no inspecciona el contenido de los paquetes de datos.",
        answer: "Capa 4 (L4)",
      },
      {
        prompt:
          "¿En qué escenarios es ideal el uso de balanceo de carga de Capa 4 (L4)?",
        answer:
          "En escenarios de alto rendimiento donde la velocidad es crítica, como streaming de video, servidores de juegos o distribución de consultas de bases de datos.",
      },
      {
        prompt:
          "El balanceo de carga de Capa 7 (L7) permite tomar decisiones de enrutamiento inteligentes basadas en _____, _____ o cookies.",
        answer: "URLs, cabeceras HTTP",
      },
      {
        prompt:
          "¿Qué práctica de gestión de secretos moderna aboga por credenciales bajo demanda que expiran automáticamente?",
        answer: "Generación dinámica de secretos.",
      },
      {
        prompt:
          "Para minimizar la exposición de secretos, la práctica de 'remover a los humanos del ciclo' (remove humans from the loop) utiliza _____ para que los desarrolladores nunca vean las credenciales de producción.",
        answer:
          "inyección automatizada e intermediación de sesiones (session brokering)",
      },
      {
        prompt:
          "¿Qué implica el patrón de 'acceso justo a tiempo' (Just-in-Time Access) en la gestión de secretos?",
        answer:
          "Proporcionar acceso a un secreto solo cuando es necesario y revocarlo automáticamente cuando ya no se requiere.",
      },
      {
        prompt:
          "En el contexto de Kubernetes, ¿qué son los 'Naked Pods' y por qué su uso es riesgoso en producción?",
        answer:
          "Son Pods no gestionados por un controlador (como un Deployment). Si el nodo falla, el Pod desaparece y no se reprograma automáticamente.",
      },
      {
        prompt:
          "Para aplicaciones sin estado que deben estar siempre en ejecución, ¿qué objeto de Kubernetes es preferible usar en lugar de Pods directamente?",
        answer:
          "Un Deployment, que gestiona un ReplicaSet para asegurar el número deseado de Pods y maneja las actualizaciones.",
      },
      {
        prompt:
          "¿Qué objeto de Kubernetes es esencial para aplicaciones que requieren identificadores de red estables y almacenamiento persistente, como las bases de datos?",
        answer: "StatefulSet.",
      },
      {
        prompt:
          "Las _____ en Kubernetes proporcionan una forma de dividir los recursos del clúster entre múltiples usuarios o equipos, actuando como clústeres virtuales.",
        answer: "Namespaces (espacios de nombres)",
      },
      {
        prompt:
          "¿Para qué se utilizan las Políticas de Red (Network Policies) en Kubernetes?",
        answer:
          "Para controlar el flujo de tráfico entre grupos de pods y otras terminales de red, mejorando la seguridad al restringir la comunicación.",
      },
      {
        prompt:
          "La herramienta de código abierto _____ permite a los equipos de DevOps gestionar despliegues de Kubernetes, mientras que la herramienta _____ gestiona la configuración de la infraestructura subyacente.",
        answer: "ArgoCD, Terraform",
      },
      {
        prompt:
          "¿Qué es un Servicio 'headless' en Kubernetes y para qué se utiliza?",
        answer:
          "Es un servicio con `clusterIP: None`. En lugar de balancear la carga, devuelve las IPs de todos los pods individuales, útil para aplicaciones que gestionan sus propias conexiones.",
      },
      {
        prompt:
          "¿Qué componente del Plano de Control de Kubernetes es responsable de asignar los pods a los nodos basándose en la disponibilidad de recursos?",
        answer: "El Scheduler (kube-scheduler).",
      },
      {
        prompt:
          "El _____ actúa como el frontend del plano de control de Kubernetes, exponiendo la API de Kubernetes para gestionar el clúster.",
        answer: "API Server (kube-apiserver)",
      },
      {
        prompt:
          "¿Cuál es la función del Controller Manager (kube-controller-manager) en Kubernetes?",
        answer:
          "Ejecuta bucles de control que monitorean continuamente el estado del clúster y realizan ajustes para mantener el estado deseado.",
      },
      {
        prompt:
          "La base de datos clave-valor distribuida y altamente disponible que Kubernetes utiliza para almacenar todos los datos del clúster se llama _____.",
        answer: "etcd",
      },
      {
        prompt:
          "En Kubernetes, el _____ escala automáticamente el número de pods en un deployment basándose en métricas como la utilización de CPU.",
        answer: "Horizontal Pod Autoscaler (HPA)",
      },
      {
        prompt:
          "¿Qué es la Inyección de Sidecar (Sidecar Injection) en Kubernetes?",
        answer:
          "Es un patrón donde se inyecta un contenedor adicional (sidecar) en un Pod para extender o mejorar la funcionalidad del contenedor principal, como para logging o monitoreo.",
      },
      {
        prompt:
          "La práctica de CI/CD 'pull-based' (basada en extracción) utiliza un agente dentro del clúster de Kubernetes que _____ cambios desde el repositorio de control de versiones.",
        answer: "extrae (pulls)",
      },
      {
        prompt:
          "¿Qué es la 'deriva de configuración' (configuration drift) en el contexto de GitOps?",
        answer:
          "Es la discrepancia entre el estado real de la infraestructura y el estado deseado definido en el repositorio de Git.",
      },
      {
        prompt:
          "El enfoque 'Augmented FinOps' de CloudBolt combina IA, automatización de ciclo completo y despliegue multi-nube para un análisis de costos de TI completo, incluyendo _____.",
        answer: "Kubernetes",
      },
      {
        prompt:
          "¿Qué significa VEX (Vulnerability Exploitability eXchange) y cómo ayuda a reducir la fatiga de alertas?",
        answer:
          "Es un formato que indica si una vulnerabilidad conocida en un componente de software es realmente explotable en un producto específico, permitiendo filtrar falsos positivos.",
      },
      {
        prompt:
          "El framework _____ se centra en la integridad de la construcción y procedencia del software desde la perspectiva del productor.",
        answer: "SLSA (Supply-chain Levels for Software Artifacts)",
      },
      {
        prompt:
          "¿Qué framework complementa a SLSA centrándose en el consumo seguro de dependencias de código abierto por parte del consumidor?",
        answer: "S2C2F (Secure Supply Chain Consumption Framework)",
      },
      {
        prompt:
          "Una de las mejores prácticas de configuración de Kubernetes es escribir los manifiestos en _____ en lugar de JSON por su legibilidad para los humanos.",
        answer: "YAML",
      },
      {
        prompt:
          "Las etiquetas (labels) en Kubernetes son pares clave/valor que permiten organizar y seleccionar recursos. ¿Cómo se puede usar `kubectl` para eliminar temporalmente una etiqueta de un pod para depuración?",
        answer:
          "Usando el comando `kubectl label pod <nombre-pod> <etiqueta>-`.",
      },
      {
        prompt:
          "El objetivo de la metodología de la App de 12 Factores es crear aplicaciones _____ que sean adecuadas para el despliegue en entornos distribuidos y críticos.",
        answer: "escalables, mantenibles y resilientes",
      },
      {
        prompt:
          "¿Qué herramienta de FinOps está diseñada para optimizar los costos de contenedores de Kubernetes detallando los costos por clúster, namespace o pod?",
        answer: "Datadog.",
      },
      {
        prompt:
          "La herramienta Xosphere se especializa en la optimización de costos en AWS reemplazando automáticamente instancias bajo demanda por _____ cuando están disponibles a un precio razonable.",
        answer: "Instancias Spot de AWS",
      },
      {
        prompt:
          "CloudZero se describe como una herramienta de observabilidad de costos que permite desglosar los costos en métricas como costo por _____, costo por _____ o costo por _____.",
        answer: "despliegue, característica de producto, cliente",
      },
      {
        prompt:
          "En el contexto de la madurez de FinOps, se compara el proceso con el de un bebé que primero gatea, luego camina y finalmente corre. ¿Qué implica esto para una organización?",
        answer:
          "Que la adopción de FinOps es un proceso gradual y está bien estar en diferentes etapas de madurez en diferentes áreas.",
      },
      {
        prompt:
          "Argo Rollouts puede realizar despliegues canary básicos sin necesidad de una _____ para escenarios simples, lo que simplifica la configuración inicial.",
        answer: "malla de servicios (service mesh)",
      },
      {
        prompt:
          "Un beneficio clave de las Plataformas Internas para Desarrolladores (IDPs) es que permiten a los desarrolladores auto-servirse de recursos a través de interfaces estandarizadas, lo que se conoce como _____.",
        answer: "caminos dorados (golden paths)",
      },
      {
        prompt:
          "¿Qué desafío complejo de despliegue se simplifica a menudo con el despliegue canary al permitir cambios de esquema incrementales?",
        answer: "Migraciones de bases de datos.",
      },
      {
        prompt:
          "Una aplicación de 12 factores debe ser autocon-tenida y no depender de la inyección de un servidor web en tiempo de ejecución. En su lugar, debe vincularse a un puerto y _____.",
        answer: "escuchar las solicitudes entrantes",
      },
      {
        prompt:
          "Según las prácticas recomendadas de CI/CD para Kubernetes, el uso de etiquetas de imagen inmutables, como un SHA de commit, hace que los despliegues sean _____.",
        answer: "reproducibles",
      },
      {
        prompt:
          "En la gestión de secretos, ¿cuál es el propósito de los 'procedimientos de emergencia' (breakglass procedures)?",
        answer:
          "Configurar un acceso de emergencia que active alertas inmediatas, requiera autenticación multifactor y que las credenciales expiren automáticamente.",
      },
      {
        prompt:
          "Las regulaciones como la Orden Ejecutiva 14028 de EE.UU. y el _____ de la UE han impulsado la adopción de SBOMs a nivel mundial.",
        answer: "Acta de Ciberresiliencia (Cyber Resilience Act - CRA)",
      },
      {
        prompt:
          "¿Por qué es importante el principio de 'Paridad Dev/Prod' de la App de 12 Factores para reducir errores?",
        answer:
          "Reduce el riesgo de errores específicos del entorno al mantener los entornos de desarrollo y producción lo más similares posible.",
      },
      {
        prompt:
          "¿Qué herramienta de FinOps se enfoca en la gestión de costos en nubes híbridas y múltiples, ofreciendo una vista unificada de costos y uso?",
        answer: "CloudBolt.",
      },
      {
        prompt:
          "Uno de los principales beneficios de usar Kubernetes para CI/CD es su capacidad de realizar _____, que despliegan nuevas versiones de una aplicación de forma gradual y sin tiempo de inactividad.",
        answer: "actualizaciones continuas (rolling updates)",
      },
      {
        prompt:
          "¿Cómo se gestionan los procesos administrativos, como las migraciones de bases de datos, según la App de 12 Factores?",
        answer:
          "Deben ejecutarse como procesos únicos en el mismo entorno que la aplicación, utilizando el mismo código base y configuración.",
      },
      {
        prompt:
          "Para la observabilidad de microservicios, las trazas distribuidas son cruciales para identificar _____ y entender las dependencias entre servicios.",
        answer: "cuellos de botella de rendimiento",
      },
      {
        prompt:
          "En un balanceador de carga de Capa 7, el balanceador termina la conexión TCP del cliente y abre una _____ con el servidor de backend.",
        answer: "nueva conexión",
      },
      {
        prompt:
          "¿Qué herramienta de CI/CD, integrada en GitLab, utiliza un agente que se ejecuta en el clúster de Kubernetes para un flujo de trabajo basado en extracción (pull-based)?",
        answer: "El Agente de GitLab para Kubernetes.",
      },
      {
        prompt:
          "Además de la generación dinámica, ¿qué práctica de gestión de secretos busca minimizar las ventanas de exposición proporcionando acceso solo cuando es necesario?",
        answer: "Acceso justo a tiempo (Just-in-Time access).",
      },
      {
        prompt:
          "Plural se diferencia de otras plataformas de gestión de Kubernetes por su arquitectura basada en _____, que mejora la seguridad al no requerir acceso directo a los clústeres de carga de trabajo.",
        answer: "agentes",
      },
      {
        prompt:
          "El enfoque de FinOps se define como una práctica cultural que crea responsabilidad financiera mediante la colaboración entre los equipos de _____, _____ y _____.",
        answer: "ingeniería, finanzas y negocio",
      },
      {
        prompt:
          "¿Qué tecnología se utiliza comúnmente para lograr la 'Paridad Dev/Prod' al empaquetar una aplicación y sus dependencias juntas?",
        answer: "La contenedorización (por ejemplo, Docker).",
      },
      {
        prompt:
          "¿Qué tipo de pruebas en Kubernetes CI/CD implica simular fallos para probar la resiliencia del sistema?",
        answer: "Ingeniería del Caos (Chaos Engineering).",
      },
      {
        prompt:
          "La modernización de la App de 12 Factores ha llevado el principio de 'Dependencias' de simples archivos de manifiesto a la generación de _____ nativa en la compilación.",
        answer: "SBOM (Software Bill of Materials)",
      },
      {
        prompt:
          "¿Cuál es la principal ventaja de la estrategia de despliegue Canary en términos de validación de cambios?",
        answer:
          "Permite la validación en el mundo real con una exposición mínima del usuario, creando un sistema de alerta temprana.",
      },
      {
        prompt:
          "¿Qué componente de Kubernetes asegura que un pod específico, como un agente de registro, se ejecute en cada nodo de un clúster?",
        answer: "DaemonSet.",
      },
      {
        prompt:
          "En la gestión de secretos, la _____ automatizada de credenciales minimiza el impacto de una posible fuga.",
        answer: "rotación",
      },
      {
        prompt:
          "El concepto de 'Abstracción y automatización' en la ingeniería de plataformas tiene como objetivo simplificar procesos complejos para que los desarrolladores puedan centrarse en _____.",
        answer: "escribir código y resolver problemas de negocio",
      },
      {
        prompt:
          "En un flujo de trabajo de CI/CD para Kubernetes, ¿cuál es el rol de un Container Registry?",
        answer:
          "Almacenar y gestionar las diferentes versiones de las imágenes de contenedor construidas.",
      },
      {
        prompt:
          "¿Qué herramienta de IaC, al funcionar dentro de Kubernetes, elimina la necesidad de un archivo de estado separado al utilizar los CRDs del servidor de la API como fuente de verdad?",
        answer: "Crossplane.",
      },
      {
        prompt:
          "El principio de 'Procesos' de la App de 12 Factores establece que cualquier dato que necesite ser persistido debe almacenarse en un _____.",
        answer: "servicio de respaldo con estado (stateful backing service)",
      },
      {
        prompt:
          "¿Qué métrica de DevOps, afectada directamente por la estrategia de despliegue, mide el tiempo promedio para recuperarse de un fallo?",
        answer: "MTTR (Mean Time to Recovery).",
      },
    ],
  },
];
