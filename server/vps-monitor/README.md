# VPS Monitor

Servidor de leitura para expor telemetria real da VPS ao portfólio Next.js.

## Deploy

```bash
cd server/vps-monitor
npm install
VPS_API_SECRET=sua-chave-forte PORT=4000 node index.js
```

No `.env` do portfólio:

```env
VPS_API_BASE_URL=https://api.seudominio.com
VPS_API_SECRET=sua-chave-forte
```

## Endpoints

- `GET /health` — status
- `GET /system-stats` — CPU, RAM, uptime (requer `x-api-key` se secret configurado)
- `GET /docker/stats` — containers via `docker stats`

O usuário do processo precisa acesso ao socket Docker (`/var/run/docker.sock`).
