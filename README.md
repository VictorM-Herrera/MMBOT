# Discord RPG Bot

Un bot de Discord inspirado en Mudae, diseñado para ofrecer una experiencia RPG interactiva dentro de servidores de Discord. Con funcionalidades como equipamiento, inventario, encuentros, loot y posiblemente PvP, este bot busca enriquecer la comunidad de usuarios.

---

## Características

1. **Equipamiento**:
   - Los usuarios pueden equipar diferentes ítems para mejorar sus estadísticas.
   - Los ítems tienen diferentes niveles de rareza y pueden ser obtenidos como loot.

2. **Inventario**:
   - Los jugadores pueden gestionar su inventario para organizar sus ítems.
   - Posibilidad de vender, intercambiar o mejorar ítems.

3. **Loot**:
   - Gana ítems al derrotar enemigos o superar eventos.
   - Sistema de loot que incluye cofres con diferentes niveles de rareza.

4. **Encuentros (Planeado)**:
   - Sistema de encuentros aleatorios con enemigos o eventos.
   - Oportunidad de obtener loot, ganar experiencia y recompensas especiales.

5. **PvP (Planeado)**:
   - Batallas entre jugadores con recompensas competitivas.
   - Sistema de ranking para fomentar la competición.

---

## Requisitos

- Node.js v16 o superior
- discord.js v14
- PostgreSQL (para almacenamiento de datos de jugadores e inventario)

---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com//VictorM-Herrera/MMBOT.git
   ```

2. Instala las dependencias:
   ```bash
   cd MMBOT
   npm install
   ```

3. Configura el archivo `.env` con tu token de bot y configuración de base de datos:
   ```env
   TOKEN=tu_token_de_discord
   DATABASE_URL=tu_uri_de_postgresql
   ```

4. Inicia el bot:
   ```bash
   npm start
   ```

---

## Comandos Principales

1. **`-join`**:
   - Descripción: Permite al usuario elegir una clase y comenzar desde el nivel 1.
   - Ejemplo: `-join`

2. **`-loot`**:
   - Descripción: Genera armas y permite a los usuarios coleccionarlas o venderlas.
   - Ejemplo: `-loot`

3. **`-stats`**:
   - Descripción: Muestra las estadísticas del usuario.
   - Ejemplo: `-stats`

4. **`-inventory`**:
   - Descripción: Muestra la colección de armas del usuario.
   - Ejemplo: `-inventory`

---

## Futuras Mejoras

- Implementación de PvP con ranking.
- Eventos semanales y loot especial.
- Integración con otros sistemas de RPG.

---

## Contribuciones

Si deseas contribuir al desarrollo del bot:
1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad o corrección de errores.
3. Envía un pull request explicando tus cambios.

---

