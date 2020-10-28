interface ClientResult {
  name: string | undefined;
}

interface OsResult {
  name: string | undefined;
}

interface ExtractedUserAgent {
  client: ClientResult | null;
  os: OsResult | null;
}

interface UserAgentParser {
  parse: (userAgent: string) => ExtractedUserAgent;
}

interface UserAgent {
  client: {
    name: string;
  };
  os: {
    name: string;
  };
}

interface Options {
  client: { name: string };
  os: { name: string };
}

const defaultOptions: Options = {
  client: { name: "unknown browser" },
  os: { name: "unknown operating system" },
};

export const parseUserAgent = (
  userAgent: string | undefined,
  parser: UserAgentParser,
  options: Options = defaultOptions
): UserAgent => {
  if (!userAgent) {
    return {
      client: { name: options.client.name },
      os: { name: options.os.name },
    };
  }

  const { client, os } = parser.parse(userAgent);

  return {
    client: {
      name: client?.name || options.client.name,
    },
    os: {
      name: os?.name || options.os.name,
    },
  };
};
