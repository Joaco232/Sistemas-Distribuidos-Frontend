/**
 * Validaciones para el formulario de registro
 * Basadas en las especificaciones del backend:
 * - email: requerido, formato email, máx 254
 * - password: requerida, 8-254, debe incluir mayúscula, minúscula, número y carácter especial
 * - name: requerido, 1-50, solo letras y espacios (admite acentos y ñ)
 * - birthDate: requerida, fecha pasada (yyyy-MM-dd), mayor de 18 años
 */

export const ValidationRules = {
    name: {
        required: true,
        minLength: 1,
        maxLength: 50,
        pattern: /^[\p{L}\s]+$/u,
        messages: {
            required: "El nombre es requerido.",
            minLength: "El nombre debe tener al menos 1 carácter.",
            maxLength: "El nombre no puede exceder 50 caracteres.",
            pattern: "Solo se permiten letras y espacios."
        }
    },
    email: {
        required: true,
        maxLength: 254,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        messages: {
            required: "El email es requerido.",
            maxLength: "El email no puede exceder 254 caracteres.",
            pattern: "Ingrese un email válido."
        }
    },
    password: {
        required: true,
        minLength: 8,
        maxLength: 254,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]).{8,}$/,
        messages: {
            required: "La contraseña es requerida.",
            minLength: "Debe tener al menos 8 caracteres.",
            maxLength: "No puede exceder 254 caracteres.",
            pattern: "Debe incluir mayúscula, minúscula, número y carácter especial."
        }
    },
    birthDate: {
        required: true,
        minAge: 18,
        messages: {
            required: "La fecha de nacimiento es requerida.",
            future: "La fecha debe ser anterior a hoy.",
            minAge: "Debes ser mayor de 18 años."
        }
    }
};

/**
 * Valida el nombre según las reglas del backend
 */
export const validateName = (name) => {
    const rules = ValidationRules.name;
    
    if (!name || !name.trim()) {
        return rules.messages.required;
    }
    
    if (name.length < rules.minLength) {
        return rules.messages.minLength;
    }
    
    if (name.length > rules.maxLength) {
        return rules.messages.maxLength;
    }
    
    if (!rules.pattern.test(name)) {
        return rules.messages.pattern;
    }
    
    return "";
};

/**
 * Valida el email según las reglas del backend
 */
export const validateEmail = (email) => {
    const rules = ValidationRules.email;
    
    if (!email || !email.trim()) {
        return rules.messages.required;
    }
    
    if (email.length > rules.maxLength) {
        return rules.messages.maxLength;
    }
    
    if (!rules.pattern.test(email)) {
        return rules.messages.pattern;
    }
    
    return "";
};

/**
 * Valida la contraseña según las reglas del backend
 */
export const validatePassword = (password) => {
    const rules = ValidationRules.password;
    
    if (!password) {
        return rules.messages.required;
    }
    
    if (password.length < rules.minLength) {
        return rules.messages.minLength;
    }
    
    if (password.length > rules.maxLength) {
        return rules.messages.maxLength;
    }
    
    if (!rules.pattern.test(password)) {
        return rules.messages.pattern;
    }
    
    return "";
};

/**
 * Valida que las contraseñas coincidan
 */
export const validatePasswordMatch = (password1, password2) => {
    if (!password2) {
        return "Debe repetir la contraseña.";
    }
    
    if (password1 !== password2) {
        return "Las contraseñas no coinciden.";
    }
    
    return "";
};

/**
 * Valida la fecha de nacimiento según las reglas del backend
 * Debe ser una fecha pasada y el usuario debe ser mayor de 18 años
 */
export const validateBirthDate = (birthDate) => {
    const rules = ValidationRules.birthDate;
    
    if (!birthDate) {
        return rules.messages.required;
    }
    
    const birth = new Date(birthDate);
    const today = new Date();
    
    // Verificar que sea una fecha pasada
    if (birth >= today) {
        return rules.messages.future;
    }
    
    // Calcular edad
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();
    
    // Verificar si es menor de 18 años
    if (age < rules.minAge || (age === rules.minAge && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
        return rules.messages.minAge;
    }
    
    return "";
};

/**
 * Mapea errores del backend a campos específicos
 */
export const mapBackendErrors = (errorMessage) => {
    const errors = {
        name: "",
        email: "",
        password: "",
        birthDate: "",
        general: ""
    };
    
    const message = errorMessage.toLowerCase();
    
    if (message.includes("email") && (message.includes("ya") || message.includes("exist") || message.includes("already"))) {
        errors.email = "Este email ya está registrado.";
        errors.general = "El email ya existe en el sistema.";
    } else if (message.includes("menor de edad") || message.includes("underage")) {
        errors.birthDate = "Debes ser mayor de 18 años.";
        errors.general = "No se permiten menores de edad.";
    } else if (message.includes("nombre") || message.includes("name")) {
        errors.name = "El nombre ingresado no es válido.";
        errors.general = errorMessage;
    } else if (message.includes("contraseña") || message.includes("password")) {
        errors.password = "La contraseña no cumple con los requisitos.";
        errors.general = errorMessage;
    } else if (message.includes("fecha") || message.includes("date")) {
        errors.birthDate = "La fecha de nacimiento no es válida.";
        errors.general = errorMessage;
    } else {
        errors.general = errorMessage;
    }
    
    return errors;
};
