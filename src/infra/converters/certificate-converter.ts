import { ObjectConverter, TimeManipulator } from '@/data/protocols'
import { CertificateModel, FileModel } from '@/domain/models'

import PDFDocument from 'pdfkit'
import SVGtoPDF, { SVGtoPDFOptions } from 'svg-to-pdfkit'
import fs from 'fs'
import env from '@/main/config/env'

const addSVG = (doc: any, svg: any, x: number, y: number, options: SVGtoPDFOptions) => {
  return SVGtoPDF(doc, svg, x, y, options)
}

const config = {
  style: {
    font: 'Katibeh',
    textColor: '#878787'
  },
  landscape: {
    width: 841.89,
    height: 595.28
  }
}

export class CertificateConverter implements ObjectConverter<CertificateConverter.Model, CertificateConverter.Result> {
  constructor (
    private readonly timeManipulator: TimeManipulator
  ) { }

  async convert (message: CertificateConverter.Model): Promise<CertificateConverter.Result> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: [config.landscape.width, config.landscape.height]
        })

        const buffers = []
        doc.on('data', buffers.push.bind(buffers))
        doc.on('end', () => {
          return resolve({
            name: 'certificate.pdf',
            mimeType: 'application/pdf',
            buffer: Buffer.concat(buffers)
          })
        })

        doc.registerFont('Katibeh', './templates/certificate/katibeh.ttf')
        const background = String(
          fs.readFileSync('./templates/certificate/bg.svg')
        )
        addSVG(doc, background, 10, 10, {
          width: config.landscape.width - 20,
          height: config.landscape.height - 20
        })

        doc.moveDown()
        doc.fontSize(44).fillColor(config.style.textColor)
        doc.font(config.style.font).text('Certificado de Conclusão', doc.x, doc.y + 10, {
          align: 'center'
        })

        doc.moveDown(1)
        doc.fontSize(30).fillColor(config.style.textColor)
        doc
          .font(config.style.font)
          .text(
          `Certificamos que ${message.name} concluiu com sucesso ${
            message.hours
          }h do curso ${message.type} ${message.course} em ${this.timeManipulator.toDay(message.date)} de ${'Mês'} de ${'ANO'}`,
          105,
          doc.y,
          {
            width: 620,
            align: 'center'
          }
          )

        doc.moveDown()
        doc.image(
          './templates/certificate/signature.png',
          config.landscape.width / 2 - 100,
          doc.y,
          {
            width: 200
          }
        )

        doc
          .lineCap('butt')
          .moveTo(config.landscape.width / 2 - 200, doc.y)
          .lineTo(config.landscape.width / 2 + 200, doc.y)
          .stroke(config.style.textColor)
        doc.fontSize(12).fillColor(config.style.textColor)
        doc
          .font(config.style.font)
          .text('Dra. Carla Rodrigues dos Santos de Lira Nicolini', 95, doc.y + 5, {
            width: 650,
            align: 'center'
          })
        doc.font(config.style.font).text('CRM 140945/SP', 95, doc.y, {
          width: 650,
          align: 'center'
        })

        const logo = String(fs.readFileSync('./templates/certificate/logo.svg'))
        addSVG(doc, logo, config.landscape.width / 2 - 60, 180, {
          width: 120
        })

        doc.fontSize(8).fillColor(config.style.textColor)
        doc.font(config.style.font).text(' Nº do certificado:', 85, doc.y + 80)
        doc.fillColor('#000000')
        doc.font(config.style.font).text(`${message.hash}`, 132, doc.y - 10)

        doc.fontSize(8).fillColor(config.style.textColor)
        doc.font(config.style.font).text('Url do certificado:', 85, doc.y)
        doc.fillColor('#000000')
        doc
          .font(config.style.font)
          .text(`${env.appUrl}/certificate/${message.hash}`, 132, doc.y - 10)

        doc.end()
      } catch (err) {
        reject(err)
      }
    })
  }
}

export namespace CertificateConverter {
  export type Model = CertificateModel
  export type Result = Promise<FileModel>
}
