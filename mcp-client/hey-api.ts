import {
  ClientOptions,
  type Config,
  type ClientOptions as DefaultClientOptions,
} from "@hey-api/client-next";

type CreateClientConfig<T extends DefaultClientOptions = ClientOptions> = (
  override?: Config<DefaultClientOptions & T>
) => Config<Required<DefaultClientOptions> & T>;

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: process.env.NEXT_PUBLIC_APP_URL,
});


