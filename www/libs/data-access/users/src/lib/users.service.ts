import { Inject, Injectable } from '@angular/core';
import { api_interface, Users } from '@casper-api/api-interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';
import { DeployerService } from '@casper-data/data-access-deployer';

@Injectable()
export class UsersService {
  constructor(
    @Inject(ENV_CONFIG) private readonly config: EnvironmentConfig,
    private readonly deployerService: DeployerService,
    private readonly http: HttpClient,
  ) {}

  get(): Observable<Users> {
    return this.http.get<Users>(
      `${this.config['api_prefix']}${api_interface.Users}`,
    );
  }

  getBalanceOfByPublicKey(publicKey: string, apiUrl?: string) {
    return this.deployerService.getBalanceOfByPublicKey(publicKey, apiUrl);
  }
}
