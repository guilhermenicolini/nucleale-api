import { StringManipulator } from '@/data/protocols'

export class StringFormatAdapter implements StringManipulator {
  format (value: string, args: any | any[] = []): string {
    if (!value) return ''
    if (!Array.isArray(args)) args = [args]

    for (let i = 0; i < args.length; i++) {
      const mask = '{' + i + '}'
      value = value.replace(mask, args[i])
    }

    return value
  }

  normalize (value: string): string {
    if (!value) return ''
    value = value.trim()
    return value
      .split('')
      .map(
        function (letter) {
          const i = this.accents.indexOf(letter)
          return i !== -1 ? this.out[i] : letter
        }.bind({
          accents:
            'ÀÁÂÃÄÅĄĀāàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏĪìíîïīÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚŞšśşŤťŸÝÿýŽŻŹžżźđĢĞģğ',
          out:
            'AAAAAAAAaaaaaaaasOOOOOOOOoooooooDdDZdzEEEEEeeeeeeCcCcCcDIIIIIiiiiiUUUUUuuuuuLLLlllNNNnnnRrSSSsssTtYYyyZZZzzzdGGgg'
        })
      )
      .join('')
      .replace(/&AMP;LT;BR/g, '')
      .replace(/\/&AMP;GT;/g, '')
      .replace('  ', ' ')
  }
}
