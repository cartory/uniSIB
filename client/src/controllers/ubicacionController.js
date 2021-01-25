import { Controller } from './Controller'

export class UbicacionController extends Controller {
    constructor() {
        super("ubicaciones");
    }

    onInput(target, model, setModel) {
        const { name, value } = target;
        model[name] = value === 0 ? null : value;
        setModel(model)
    }
}