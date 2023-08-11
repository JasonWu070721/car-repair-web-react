/* tslint:disable */
/* eslint-disable */
/**
 * Simple API overview
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CustomersGet200ResponseInner
 */
export interface CustomersGet200ResponseInner {
    /**
     * 
     * @type {number}
     * @memberof CustomersGet200ResponseInner
     */
    iD?: number;
    /**
     * 
     * @type {string}
     * @memberof CustomersGet200ResponseInner
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomersGet200ResponseInner
     */
    licensePlate?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomersGet200ResponseInner
     */
    carColor?: string;
    /**
     * 
     * @type {string}
     * @memberof CustomersGet200ResponseInner
     */
    carYear?: string;
}

/**
 * Check if a given object implements the CustomersGet200ResponseInner interface.
 */
export function instanceOfCustomersGet200ResponseInner(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CustomersGet200ResponseInnerFromJSON(json: any): CustomersGet200ResponseInner {
    return CustomersGet200ResponseInnerFromJSONTyped(json, false);
}

export function CustomersGet200ResponseInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomersGet200ResponseInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'iD': !exists(json, 'ID') ? undefined : json['ID'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'licensePlate': !exists(json, 'license_plate') ? undefined : json['license_plate'],
        'carColor': !exists(json, 'car_color') ? undefined : json['car_color'],
        'carYear': !exists(json, 'car_year') ? undefined : json['car_year'],
    };
}

export function CustomersGet200ResponseInnerToJSON(value?: CustomersGet200ResponseInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ID': value.iD,
        'name': value.name,
        'license_plate': value.licensePlate,
        'car_color': value.carColor,
        'car_year': value.carYear,
    };
}

