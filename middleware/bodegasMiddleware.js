import { check } from "express-validator";

const validacionBodegas =[
    check('name').notEmpty().isString().withMessage(" name es un campo oblgiatorio y es de tipo string" ),
    check('description').notEmpty().isString().withMessage(" description es un campo oblgiatorio y es de tipo string" ),
    check('state').notEmpty().isString().withMessage("state  es un campo oblgiatorio y es de tipo string" ),
    check('created_by').notEmpty().isNumeric().withMessage(" created_by es un campo oblgiatorio y es de tipo entero" ),
    check('created_at').notEmpty().isNumeric().withMessage(" created_at es un campo oblgiatorio y es de tipo entero" ),
]

export default validacionBodegas;