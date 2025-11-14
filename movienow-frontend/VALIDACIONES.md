# Validaciones de Registro - MovieNow Frontend

## ✅ Validaciones Implementadas

Este documento describe las validaciones implementadas en el formulario de registro según las especificaciones del backend.

### 📋 Reglas de Validación

#### 1. **Nombre** (`name`)
- ✓ **Requerido**: Campo obligatorio
- ✓ **Longitud**: 1-50 caracteres
- ✓ **Formato**: Solo letras y espacios (admite acentos y ñ)
- ✓ **Pattern**: `/^[\p{L}\s]+$/u`

**Mensajes de error:**
- "El nombre es requerido."
- "El nombre debe tener entre 1 y 50 caracteres."
- "Solo se permiten letras y espacios."

#### 2. **Email** (`email`)
- ✓ **Requerido**: Campo obligatorio
- ✓ **Longitud máxima**: 254 caracteres
- ✓ **Formato**: email válido
- ✓ **Pattern**: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`

**Mensajes de error:**
- "El email es requerido."
- "El email no puede exceder 254 caracteres."
- "Ingrese un email válido."
- "Este email ya está registrado." (error del backend)

#### 3. **Contraseña** (`password`)
- ✓ **Requerida**: Campo obligatorio
- ✓ **Longitud**: 8-254 caracteres
- ✓ **Complejidad**: Debe incluir:
  - Al menos una letra mayúscula
  - Al menos una letra minúscula
  - Al menos un número
  - Al menos un carácter especial: `!@#$%^&*()_-+=[]{};"',<.>/?\\|~`
- ✓ **Pattern**: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]).{8,}$/`

**Mensajes de error:**
- "La contraseña es requerida."
- "Debe tener entre 8 y 254 caracteres."
- "Debe incluir mayúscula, minúscula, número y carácter especial."

#### 4. **Repetir Contraseña** (`password2`)
- ✓ **Requerida**: Campo obligatorio
- ✓ **Coincidencia**: Debe ser igual a la contraseña

**Mensajes de error:**
- "Debe repetir la contraseña."
- "Las contraseñas no coinciden."

#### 5. **Fecha de Nacimiento** (`birthDate`)
- ✓ **Requerida**: Campo obligatorio
- ✓ **Formato**: yyyy-MM-dd
- ✓ **Fecha pasada**: Debe ser anterior a hoy
- ✓ **Edad mínima**: Mayor de 18 años

**Mensajes de error:**
- "La fecha de nacimiento es requerida."
- "La fecha debe ser anterior a hoy."
- "Debes ser mayor de 18 años."

### 🎯 Validación en Tiempo Real

#### **Validación al escribir (onChange)**
- Previene caracteres inválidos en el campo de nombre
- Limpia errores cuando el usuario empieza a corregir

#### **Validación al salir del campo (onBlur)**
- Valida cada campo individualmente al perder el foco
- Muestra mensajes de error específicos en cada campo

#### **Validación al enviar (onSubmit)**
- Valida todos los campos antes de enviar
- Previene el envío si hay errores
- Muestra errores en cada campo correspondiente

### 🔴 Manejo de Errores del Backend

Los errores del backend se mapean automáticamente a los campos correspondientes:

#### **Errores HTTP manejados:**

1. **400 BAD_REQUEST**
   - `UnderAgeUserException`: Menor de edad
   - Validación de campos inválidos
   - Formatos o tipos incorrectos

2. **409 CONFLICT**
   - `EmailAlreadyExistsException`: Email ya registrado
   - Violación de integridad de datos

3. **500 INTERNAL_SERVER_ERROR**
   - Error inesperado del servidor

#### **Mapeo de errores:**
```javascript
mapBackendErrors(errorMessage) {
  // Email duplicado → campo email
  // Menor de edad → campo birthDate
  // Error de nombre → campo name
  // Error de contraseña → campo password1
  // Error de fecha → campo birthDate
  // Otros → mensaje general
}
```

### 🎨 Estilos de Error

Los campos con error muestran:
- ✓ Borde inferior rojo (`#e74c3c`)
- ✓ Label en color rojo
- ✓ Mensaje de error debajo del campo
- ✓ Animación de aparición suave

### 📁 Archivos Involucrados

1. **`src/services/validations.js`**
   - Contiene todas las funciones de validación
   - Reglas centralizadas y reutilizables
   - Mapeo de errores del backend

2. **`src/components/InputField/InputField.jsx`**
   - Componente actualizado con soporte de errores
   - Prop `error` para mostrar mensajes
   - Prop `onBlur` para validación

3. **`src/components/InputField/InputField.css`**
   - Estilos para estados de error
   - Animaciones de mensajes

4. **`src/register/Register.jsx`**
   - Implementación completa de validaciones
   - Estado de errores por campo
   - Manejo de errores del backend

### 🧪 Ejemplo de Uso

```jsx
<InputField 
  label="Email" 
  type="text" 
  name="email" 
  value={formData.email} 
  onChange={handleChange}
  onBlur={handleBlur}
  maxLength={254}
  error={errors.email}  // Mensaje de error
/>
```

### ✨ Características

- ✅ Validación frontend completa antes de enviar
- ✅ Validación en tiempo real al escribir y al salir del campo
- ✅ Mensajes de error claros y específicos
- ✅ Prevención de caracteres inválidos
- ✅ Manejo de errores del backend
- ✅ Mapeo automático de errores a campos
- ✅ Interfaz de usuario intuitiva
- ✅ Código reutilizable y mantenible

## 🚀 Respuestas del Backend Esperadas

### Éxito (200 OK)
```json
{
  "timestamp": "2025-11-05T10:30:00",
  "status": 200,
  "message": "Usuario registrado exitosamente."
}
```

### Errores
```json
// 409 - Email duplicado
{
  "status": 409,
  "error": "Conflict",
  "message": "El email ya está registrado."
}

// 400 - Menor de edad
{
  "status": 400,
  "error": "Bad Request",
  "message": "El usuario debe ser mayor de 18 años."
}
```
