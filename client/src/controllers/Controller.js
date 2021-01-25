
const URL = "http://localhost:8000/api/";

export class Controller {

    constructor(path) {
        this.path = path;
    }

    async guardar(model) {
        try {
            const res = await fetch(`${URL}/${this.path}`, {
                method: "POST",
                headers: {
                    "Accept": "Application/json",
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(model)
            });

            return await res.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async editar(model) {
        try {
            const res = await fetch(`${URL}/${this.path}/${model.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "Application/json",
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(model)
            });

            return await res.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async eliminar(id) {
        try {
            const res = await fetch(`${URL}/${this.path}/${id}`, {
                method: "DELETE"
            });

            return await res.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async onSubmit(setters, model, edit = false) {
        try {
            await edit
                ? this.editar(model)
                : this.guardar(model);

            setters.forEach(setter => {
                setter(true);
            });
        } catch (error) {
            console.error(error);
        }
    }

    async onDelete(id, setters) {
        try {
            console.log(await this.eliminar(id));
            setters.forEach(setter => {
                setter(true);
            });
        } catch (error) {
            console.error(error);
        }
    }

    async onInput(target, model, setModel) {
        const { name, value } = target;
        model[name] = value;
        setModel(model);
        console.log(model);
    }
}

