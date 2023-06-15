import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessagesService } from "../message/messages.service";
import { DevisDto } from "./dtos/devis.dto";
import { Devis } from "./entities/devis.entity";

@Injectable()
export class DevisService extends MessagesService<Devis, DevisDto> {
  constructor(
    @InjectRepository(Devis)
    protected readonly devisRepository: Repository<Devis>
  ) {
    super(devisRepository);
  }

  override entityToDto(devis: Devis): DevisDto {
    const devisDto: DevisDto = super.entityToDto(devis);

    devisDto.service = devis.service;
    devisDto.subService = devis.subService;
    devisDto.nbCharacter = devis.nbCharacter;
    devisDto.endDate = devis.endDate;

    return devisDto;
  }

  override postMessage(body: DevisDto): Promise<{ data: DevisDto }> {
    const checkNullService = body.service?.id
      ? body
      : { ...body, service: undefined };
    return super.postMessage(checkNullService);
  }
}
