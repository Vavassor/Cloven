import { compare, genSalt, hash as bcryptHash } from "bcrypt";

const HASH_CHARS = 31;

interface BcryptParts {
  hash: string;
  salt: string;
}

const generateSalt = () => {
  return new Promise<string>((resolve, reject) => {
    genSalt(10, (error, salt) => {
      if (error) {
        reject(error);
      } else {
        resolve(salt);
      }
    });
  });
};

const hashWithSalt = (password: string, salt: string) => {
  return new Promise<string>((resolve, reject) => {
    bcryptHash(password, salt, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const compareHash = async (password: string, hash: string) => {
  return new Promise<boolean>((resolve, reject) => {
    compare(password, hash, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const comparePartialDoubleHash = async (
  singleHash: string,
  partialDoubleHash: string
) => {
  const partial = await getPartialDoubleHash(singleHash);
  return partial === partialDoubleHash;
};

export const getPartialDoubleHash = async (hash: string) => {
  const { hash: singleHash, salt } = parseHash(hash);
  const doubleHashString = await hashWithSalt(singleHash, salt);
  const { hash: doubleHash } = parseHash(doubleHashString);
  return doubleHash.slice(0, 10);
};

export const hash = async (password: string) => {
  const salt = await generateSalt();
  return hashWithSalt(password, salt);
};

export const parseHash = (hashString: string): BcryptParts => {
  const hashStartIndex = HASH_CHARS - hashString.length;
  const salt = hashString.slice(0, hashStartIndex);
  const hash = hashString.slice(hashStartIndex);
  return { hash, salt };
};
