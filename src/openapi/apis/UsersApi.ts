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


import * as runtime from '../runtime';
import type {
  UsersUserIdGet200Response,
} from '../models';
import {
    UsersUserIdGet200ResponseFromJSON,
    UsersUserIdGet200ResponseToJSON,
} from '../models';

export interface UsersUserIdGetRequest {
    userId: any;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * Returns a user by ID.
     */
    async usersUserIdGetRaw(requestParameters: UsersUserIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UsersUserIdGet200Response>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling usersUserIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/users/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UsersUserIdGet200ResponseFromJSON(jsonValue));
    }

    /**
     * Returns a user by ID.
     */
    async usersUserIdGet(requestParameters: UsersUserIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UsersUserIdGet200Response> {
        const response = await this.usersUserIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}