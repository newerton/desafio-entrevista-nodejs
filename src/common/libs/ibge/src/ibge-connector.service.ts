import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

export type IbgeStateOutput = {
  id: number;
  nome: string;
};

@Injectable()
export class IbgeConnectorService {
  constructor(private readonly httpService: HttpService) {}

  findAllStates = async (): Promise<IbgeStateOutput[]> => {
    return await this.httpService.axiosRef
      .get('/estados')
      .then(({ data }) => data)
      .catch((err) => new Error(err));
  };

  findOneStates = async (id: number): Promise<IbgeStateOutput> => {
    return await this.httpService.axiosRef
      .get(`/estados/${id}`)
      .then(({ data }) => data)
      .catch((err) => new Error(err));
  };
}
