/*
 * @Description:
 * @Date: 2020-03-16 11:52:46
 * @Author: mason
 */

import { DataArray } from '@/interface'

export function getPathValue<ValueType, ObjectType extends object>(
    record: ObjectType,
    path: DataArray
): ValueType {
    if (!path) {
        return (record as unknown) as ValueType;
    }

    for (let i = 0; i < path.length; i += 1) {
        if (!record) {
            return null;
        }

        const prop = path[i];
        record = record[prop];
    }

    return (record as unknown) as ValueType
}

export function mergeObject<ReturnObject extends object>(
    ...objects: Partial<ReturnObject>[]
): ReturnObject {
    const mergedObj: Partial<ReturnObject> = {}
    function fillProps(obj: object, clone: object) {
        if (clone) {
            Object.keys(clone).forEach(key => {
                const value = clone[key];
                if (value && typeof value === 'object') {
                    obj[key] = obj[key] || {};
                    fillProps(obj[key], value);
                } else {
                    obj[key] = value;
                }
            });
        }
    }
    objects.forEach(clone => {
        fillProps(mergedObj, clone);
    });

    return mergedObj as ReturnObject;
}
