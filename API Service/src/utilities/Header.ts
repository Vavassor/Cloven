interface AuthorizationFieldBasic {
  password: string;
  type: "Basic";
  username: string;
}

interface AuthorizationFieldBearer {
  token: string;
  type: "Bearer";
}

export type AuthorizationField =
  | AuthorizationFieldBasic
  | AuthorizationFieldBearer;

const getCredentialsBasic = (base64Credentials: string) => {
  const asciiCredentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = asciiCredentials.split(":");
  return { username, password };
};

export const getAuthorizationField = (
  authorization: string
): AuthorizationField | null => {
  const [type, credentials] = authorization.split(" ");
  switch (type) {
    case "Basic":
      const { password, username } = getCredentialsBasic(credentials);
      return {
        password,
        type,
        username,
      };

    case "Bearer":
      return {
        token: credentials,
        type,
      };

    default:
      return null;
  }
};
