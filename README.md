# 🐟 El Arriero — Carta Digital

Carta interactiva del restaurante **El Arriero** (Playa de Arinaga, Agüimes, Gran Canaria), construida con Angular.

---

## 🚀 Instalación

```bash
git clone https://github.com/TU_USUARIO/el-arriero-menu.git
cd el-arriero-menu
npm install
ng serve
# Abre http://localhost:4200
```

---

## ✏️ Editar la carta

**Solo edita este archivo:**
`src/app/data/menu.data.ts`

### Cambiar precios (entrantes con 3 precios):
```typescript
triplePrice: { tapa: '3,50€', media: '5,00€', racion: '8,00€' }
```

### Cambiar precio simple:
```typescript
price: '12,00€'
```

### Añadir un plato:
```typescript
{
  name: 'Nuevo plato',
  description: 'Descripción',
  price: '10,00€',
  allergens: ['gluten', 'pescado'],
},
```

### Códigos de alérgenos:
`gluten` · `crustaceos` · `huevo` · `pescado` · `lacteos` · `frutosSecos` · `mostaza` · `moluscos` · `soja` · `apio` · `sesamo` · `altramuces` · `sulfitos` · `cacahuetes`

---

## 🖨️ Imprimir en A4

1. `ng serve` → abre http://localhost:4200
2. Pulsa **"🖨️ Imprimir / Guardar PDF"**
3. Márgenes: Ninguno · Tamaño: A4 · ✅ Gráficos de fondo

---

## 📁 Estructura

```
src/app/
├── data/menu.data.ts        ← ✏️ EDITA AQUÍ
├── models/menu.model.ts
└── components/
    ├── menu/                ← Página completa
    ├── section/             ← Sección (entrantes, pescados...)
    └── allergen-icon/       ← Icono de alérgeno
```
