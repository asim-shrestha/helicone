import { Configuration, ConfigurationParameters } from "openai";
import { IConfigurationManager } from "./IConfigurationManager";
import { IHeliconeConfigurationParameters } from "./IHeliconeConfigurationParameters";
import { HeliconeHeaderBuilder } from "./HeliconeHeaderBuilder";

export class ProxyConfigurationManager implements IConfigurationManager {
  private heliconeConfigParameters: IHeliconeConfigurationParameters;
  private configurationParameters: ConfigurationParameters;
  private heliconeHeaders: { [key: string]: string };
  private basePath: string;

  constructor(
    heliconeConfigParameters: IHeliconeConfigurationParameters,
    configurationParameters: ConfigurationParameters,
    basePath: string
  ) {
    this.heliconeConfigParameters = heliconeConfigParameters;
    this.configurationParameters = configurationParameters;
    this.basePath = basePath;

    this.heliconeHeaders = new HeliconeHeaderBuilder(this.heliconeConfigParameters)
      .withPropertiesHeader()
      .withCacheHeader()
      .withRetryHeader()
      .withRateLimitPolicyHeader()
      .withUserHeader()
      .build();
  }

  getBasePath(): string {
    return this.basePath;
  }

  getHeliconeAuthHeader(): string {
    return this.heliconeHeaders["Helicone-Auth"];
  }

  getHeliconeHeaders(): { [key: string]: string } {
    return this.heliconeHeaders;
  }

  resolveConfiguration(): Configuration {
    const configuration = new Configuration(this.configurationParameters);

    configuration.baseOptions = {
      ...configuration.baseOptions,
      headers: {
        ...configuration.baseOptions.headers,
        ...this.heliconeHeaders,
      },
    };
    configuration.basePath = this.basePath;

    return configuration;
  }
}
