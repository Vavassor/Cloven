export enum OAuthErrorType {
  AccessDenied = "access_denied",
  InvalidClient = "invalid_client",
  InvalidGrant = "invalid_grant",
  InvalidRequest = "invalid_request",
  InvalidScope = "invalid_scope",
  ServerError = "server_error",
  TemporarilyUnavailable = "temporarily_unavailable",
  UnauthorizedClient = "unauthorized_client",
  UnsupportedResponseType = "unsupported_response_type",
}

export interface OAuthErrorAdo {
  error: OAuthErrorType;
  error_description?: string;
  error_description_localized?: string;
  error_uri?: string;
  state?: string;
}
