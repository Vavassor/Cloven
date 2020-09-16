declare namespace Express {
  // TFunction-related types are copied from 'i18next/index.d.ts'.
  
  export interface TOptionsBase {
    /**
     * Default value to return if a translation was not found
     */
    defaultValue?: any;
    /**
     * Count value used for plurals
     */
    count?: number;
    /**
     * Used for contexts (eg. male\female)
     */
    context?: any;
    /**
     * Object with vars for interpolation - or put them directly in options
     */
    replace?: any;
    /**
     * Override language to use
     */
    lng?: string;
    /**
     * Override languages to use
     */
    lngs?: string[];
    /**
     * Override language to lookup key if not found see fallbacks for details
     */
    fallbackLng?: FallbackLng;
    /**
     * Override namespaces (string or array)
     */
    ns?: string | string[];
    /**
     * Override char to separate keys
     */
    keySeparator?: false | string;
    /**
     * Override char to split namespace from key
     */
    nsSeparator?: false | string;
    /**
     * Accessing an object not a translation string (can be set globally too)
     */
    returnObjects?: boolean;
    /**
     * Char, eg. '\n' that arrays will be joined by (can be set globally too)
     */
    joinArrays?: string;
    /**
     * String or array of postProcessors to apply see interval plurals as a sample
     */
    postProcess?: string | string[];
    /**
     * Override interpolation options
     */
    interpolation?: InterpolationOptions;
  }  

  export type TOptions<
    TInterpolationMap extends object = StringMap
  > = TOptionsBase & TInterpolationMap;
  
  export type TFunctionResult =
    | string
    | object
    | Array<string | object>
    | undefined
    | null;

  export type TFunctionKeys = string | TemplateStringsArray;

  export interface TFunction {
    // basic usage
    <
      TResult extends TFunctionResult = string,
      TKeys extends TFunctionKeys = string,
      TInterpolationMap extends object = StringMap
    >(
      key: TKeys | TKeys[],
      options?: TOptions<TInterpolationMap> | string
    ): TResult;
    // overloaded usage
    <
      TResult extends TFunctionResult = string,
      TKeys extends TFunctionKeys = string,
      TInterpolationMap extends object = StringMap
    >(
      key: TKeys | TKeys[],
      defaultValue?: string,
      options?: TOptions<TInterpolationMap> | string
    ): TResult;
  }

  // Modifications to express types

  export interface Request {
    // Properties added by 'i18next-fs-backend'
    language: string;
    languages: string[];

    // Properties added by 'i18next-http-middleware'
    t: TFunction;
  }
}
