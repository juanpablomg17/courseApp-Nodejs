export interface ICommandGeneric<key, ModelEdit, Model> {
    save(input: ModelEdit): Promise<Model>;
}