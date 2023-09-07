import { check } from "express-validator";

const validacionBodegas =[
    check('name').notEmpty().isString().withMessage(" name es un campo oblgiatorio y es de tipo string" ),
    check('ID_responsable').notEmpty().isNumeric().withMessage(" ID_responsable es un campo oblgiatorio y es de tipo string" ),
    check('state').notEmpty().isString().withMessage("state  es un campo oblgiatorio y es de tipo string" ),
    check('created_by').notEmpty().isNumeric().withMessage(" created_by es un campo oblgiatorio y es de tipo entero" )]

export default validacionBodegas;