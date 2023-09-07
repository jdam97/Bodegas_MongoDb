import {check} from "express-validator";

const validarProductos=[
    check("name").notEmpty().isString().withMessage("name es de tipo string y es requerido"),
    check("description").notEmpty().isString().withMessage("description es de tipo string y es requerido"),
    check("state").notEmpty().isString().withMessage("state es de tipo string y es requerido"),
    check("created_by").notEmpty().isNumeric().withMessage(" created_by es de tipo entero y es requerido"),
    check("created_at").notEmpty().isNumeric().withMessage(" created_at es de tipo entero y es requerido"),
    
]

export default validarProductos;