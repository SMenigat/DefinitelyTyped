export = FormDialogField;
declare function FormDialogField(name: any, type: any, size: any, ...args: any[]): void;
declare class FormDialogField {
    constructor(name: any, type: any, size: any, ...args: any[]);
    registerEvents_(): void;
    saveValuesToCache(entry: {
        processKey: number;
        interactionName: string;
        gridName: string;
        fieldName: string;
        fieldType: string;
    }): void;
    assignListeners(): void;
    on(): never;
    private write;
    private _stringify;
}
declare namespace FormDialogField {
    export { _validFieldTypes, Field };
}
declare var _validFieldTypes: string[];
type Field = import('@nginstack/engine/lib/classdef/Field');
