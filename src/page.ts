export declare type Serializable =
  | number
  | string
  | boolean
  | null
  | BigInt
  | Serializable[]
  | { [k: string]: Serializable };

export interface Response {
  /**
   * An object with the response HTTP headers. The header names are lower-cased. Note that this method does not return
   * security-related headers, including cookie-related ones. You can use
   * [response.allHeaders()](https://playwright.dev/docs/api/class-response#response-all-headers) for complete list of
   * headers that include `cookie` information.
   */
  headers(): { [key: string]: string };

  /**
   * Returns the JSON representation of response body.
   *
   * This method will throw if the response body is not parsable via `JSON.parse`.
   */
  json(): Promise<any>;

  /**
   * Contains a boolean stating whether the response was successful (status in the range 200-299) or not.
   */
  ok(): boolean;

  /**
   * Contains the status code of the response (e.g., 200 for a success).
   */
  status(): number;

  /**
   * Contains the status text of the response (e.g. usually an "OK" for a success).
   */
  statusText(): string;

  /**
   * Returns the text representation of response body.
   */
  text(): Promise<string>;

  /**
   * Contains the URL of the response.
   */
  url(): string;
}
