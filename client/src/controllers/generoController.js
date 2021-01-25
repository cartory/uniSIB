import { Controller } from './Controller';

export class GeneroController extends Controller { 
    constructor() {
        super("generos")
    }
    
    onInput(target, model, setModel) {
        const { name, value } = target;
        model[name] = value === 0 ? null : value;
        setModel(model);
    }
}