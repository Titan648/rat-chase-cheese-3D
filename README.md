# 🐀 Rat Chase Fromage

A first-person 3D cheese collection game built with React, Three.js, and Supabase.

## 🎮 How to Play

1. Enter your name to start
2. Click to lock pointer and begin
3. Use WASD or Arrow Keys to move
4. Collect golden cheese cubes (10 points each)
5. Beat the high score in 60 seconds!

## 🚀 Deployment on Vercel

### Environment Variables Required:
Add these in Vercel Dashboard → Settings → Environment Variables:

- `VITE_SUPABASE_URL` = `https://tgrgiiflocfxodfxdvtv.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRncmdpaWZsb2NmeG9kZnhkdnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MjUzNTksImV4cCI6MjA3ODQwMTM1OX0.zVjpeB8CjDxhWMSLF27IX5NwhkEMREgMeiMEtrkRmx8`

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Create .env file with:
VITE_SUPABASE_URL=https://tgrgiiflocfxodfxdvtv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRncmdpaWZsb2NmeG9kZnhkdnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MjUzNTksImV4cCI6MjA3ODQwMTM1OX0.zVjpeB8CjDxhWMSLF27IX5NwhkEMREgMeiMEtrkRmx8

# Run development server
npm run dev
