# Admin App - Angular

Aplicación de administración construida con **Angular** para la gestión de usuarios con roles.  
El proyecto sigue principios de **Clean Architecture** y aplica varios **patrones de diseño**, integrando almacenamiento local con **IndexedDB** y sincronización con **APIs externas**.

---

## 🚀 Tecnologías Principales

### Framework
- **Angular 20.0.0** – Framework principal de la aplicación 

### UI y Estilos
- **PrimeNG 20.1.1** – Biblioteca de componentes UI 
- **PrimeIcons 7.0.0** – Iconografía 
- **TailwindCSS 4.1.12** – Framework CSS utilitario 
- **@primeuix/themes 1.2.3** – Temas para PrimeNG

### Base de Datos y Almacenamiento
- **IndexedDB (idb 8.0.3)** – Base de datos local del navegador 

### Utilidades
- **RxJS 7.8.0** – Programación reactiva 
- **UUID 11.1.0** – Generación de identificadores únicos 

---

## ⚙️ Instalación

### Prerrequisitos
- Node.js (versión compatible con Angular 20)
- npm o yarn

### Pasos
```bash
# Clonar el repositorio
git clone https://github.com/Rafa-Kardiz/admin-app
cd admin-app

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm start
# o
ng serve

# Construir para producción
npm run build
# o
ng build
```

### Scripts Disponibles
- `npm start` → Servidor de desarrollo
- `npm run build` → Construcción para producción
- `npm run watch` → Construcción en modo watch

---

## 🏗️ Arquitectura del Proyecto

El proyecto está organizado en **tres capas principales** siguiendo **Clean Architecture**:

### 1. Capa de Dominio (`/domain`)
- Define **interfaces** y **modelos de negocio** sin dependencias externas.  
- Repositorios definidos como contratos claros.  
  Ejemplo: `app/domain/repositories/auth-repository.ts`, `app/domain/repositories/user-repository.ts`.

### 2. Capa de Datos (`/data`)
- Implementa los repositorios definidos en el dominio.  
- Maneja acceso a datos **locales (IndexedDB)** y **remotos (APIs)**.
- Incluye:
  - **Data Sources Locales**: `app/data/data-sources/local/user-local-db.ts`
  - **Data Sources Remotos**: servicios API
  - **Repositorios**: implementaciones concretas `app/data/data-sources/repositories/user-repository.ts`

### 3. Capa de Presentación (`/features`)
- Organizada por módulos funcionales y componentes.
- Maneja rutas, guards y resolvers.  
  Ejemplo: `AdminModule.routes.ts`

---

## 🧩 Patrones de Diseño Implementados

1. **Repository Pattern**  
   Abstracción de acceso a datos mediante interfaces y repositorios.  
   `app/domain/respositories/user-repository.ts`,

2. **Dependency Injection**  
   Servicios inyectados con el sistema de DI de Angular.

3. **Interceptor Pattern**  
   Interceptores HTTP para autenticación.  
   `app/core/interceptors/http-interceptor-interceptor.ts`

4. **Observer Pattern**  
   Uso de **RxJS Observables** y **Angular Signals**.

---

## 🧱 Principios SOLID Aplicados

- **SRP (Single Responsibility Principle)**  
  Cada clase tiene una única responsabilidad.  
  Ejemplo:  
  - `UserLocalDbService` → persistencia local  
  - `AuthRepositoryService` → autenticación  

- **OCP (Open/Closed Principle)**  
  Repositorios extensibles sin modificar código existente.  
  `auth-repository.ts`

- **DIP (Dependency Inversion Principle)**  
  Dependencia en interfaces, no en implementaciones.  
  `login.ts`

---

## ⚡ Arquitectura de Componentes

- **Componentes Reutilizables**: Ej. `TableComponent` configurable vía inputs.  
- **Lazy Loading**: carga perezosa para optimizar rendimiento.  
- **Guards y Resolvers**: control de acceso por roles y precarga de datos.  
- **Gestión de Estado**: combinación de **Angular Signals** + **Reactive Forms**.  
- **Persistencia Híbrida**: LocalStorage + IndexedDB.  

---

## 🎨 Configuración de Estilos
- PostCSS + TailwindCSS + Autoprefixer.

---

## 📌 Notas Finales
- Proyecto Angular **SPA** con soporte de **standalone components** y **signals**.  
- Arquitectura modular y escalable gracias a **Clean Architecture**.  
- El uso de **interfaces estrictas con TypeScript** facilita mantenimiento.

---


## 🌍 Despliegue

Este proyecto está desplegado en **Vercel**, con integración continua desde GitHub.  
Puedes acceder a la aplicación en el siguiente enlace:  

🔗 [Admin App en Vercel](https://admin-app-three-pink.vercel.app/login)

---
