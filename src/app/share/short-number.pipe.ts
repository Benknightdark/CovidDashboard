import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {

  transform(number: number|undefined, args?: any): any {
    // if (isNaN(number)) return null; // will only work value is a number
    if (number === null) return null;
    if (number === 0) return null;
    let abs = Math.abs(number as number);
    const rounder = Math.pow(10, 1);
    const isNegative = number as number < 0; // will also work for Negetive numbers
    let key = '';
    // thousand  最常見的縮寫為：大寫的『K』或是小寫『k』,如一仟美元 以『 $1K』表示。

    // million最常見的縮寫為：大寫的『Ｍ』或是小寫『ｍ』,如一百萬美元 以『 $1M』表示。

    // billion最常見的縮寫為：大寫的『B』或是小寫『bn』,如10億美元 以『 $1B』表示。

    // trillion最常見的縮寫為：大寫的『T』或是小寫『tn』,如1兆美元 以『 $1T』表示。
    const powers = [
      { key: 'Q', value: Math.pow(10, 15) },
      { key: 'T', value: Math.pow(10, 12) },
      { key: 'B', value: Math.pow(10, 9) },
      { key: 'M', value: Math.pow(10, 6) },
      { key: 'K', value: 1000 }
    ];

    for (let i = 0; i < powers.length; i++) {
      let reduced = abs / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = powers[i].key;
        break;
      }
    }
    return (isNegative ? '-' : '') + abs + key;
  }
}
