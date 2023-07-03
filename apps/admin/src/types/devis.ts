import { messageDto, MessageDto } from "./message";
import { ServiceDto, SubServiceDto } from "./service";

export type DevisDto = MessageDto & {
  nbCharacter: number;
  endDate?: Date;
  subService?: SubServiceDto;
  service?: ServiceDto;
  file?: {
    storedFilename: string;
    originalFilename: string;
    id: number;
  };
};

export const devisDto: DevisDto = { ...messageDto, nbCharacter: 1 };
