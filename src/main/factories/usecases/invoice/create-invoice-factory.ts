import { DbCreateInvoice } from '@/data/usecases'
import { CreateInvoice } from '@/domain/usecases'
import { ModelsToInvoiceConverter } from '@/infra/converters'
import { AccountMongoRepository, AddressMongoRepository, CompanyMongoRepository, InvoiceMongoRepository } from '@/infra/db'
import { MomentAdapter } from '@/infra/manipulation'
import { StringFormatAdapter } from '@/infra/manipulation/string-format-adapter'

export const makeDbCreateInvoice = (): CreateInvoice => {
  const companyMongoRepository = new CompanyMongoRepository()
  return new DbCreateInvoice(
    new AccountMongoRepository(),
    new AddressMongoRepository(),
    companyMongoRepository,
    companyMongoRepository,
    new InvoiceMongoRepository(),
    new ModelsToInvoiceConverter(
      new StringFormatAdapter(),
      new MomentAdapter()
    )
  )
}
