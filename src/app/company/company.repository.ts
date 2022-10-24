import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateCompanyInput } from './dto/create-company.dto';
import { UpdateCompanyInput } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
@Injectable()
export class CompanyRepository extends Repository<Company> {
  constructor(private dataSource: DataSource) {
    super(
      Company,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createCompany(createCompanyDto: CreateCompanyInput): Promise<void> {
    const {
      fantasy_name,
      email,
      password,
      document,
      phone,
      is_active,
      address,
    } = createCompanyDto;

    const companyExists = await this.findOneBy({ email });
    if (companyExists) {
      throw new UnprocessableEntityException('Company already registered');
    }

    const hashedPassword = await hash(password, 8);

    await this.save({
      id: uuidv4(),
      fantasy_name,
      email,
      password: hashedPassword,
      document,
      phone,
      is_active,
      address,
    });
  }

  async findAll() {
    return this.find({
      relations: ['address'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<Company> {
    return this.findOne({
      where: { id },
      relations: ['address'],
    });
  }

  async findByEmail(email: string): Promise<Company> {
    return this.findOne({
      where: { email },
      relations: ['address'],
    });
  }

  async updateCompany(id: string, updateCompanyDto: UpdateCompanyInput) {
    const model = await this.findById(id);
    if (!model) {
      throw new NotFoundException('Company not found');
    }

    const { social_name, fantasy_name, document, phone, is_active, address } =
      updateCompanyDto;

    const newPayload = {
      id,
      social_name,
      fantasy_name,
      document,
      phone,
      is_active,
      ...(address || {}),
    };

    await this.save(newPayload);
  }

  async deleteCompany(id: string): Promise<void> {
    const model = await this.findById(id);
    if (!model) {
      throw new NotFoundException('Company not found');
    }
    this.softDelete(id);
  }
}
