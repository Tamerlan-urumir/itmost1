import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl'
})
export class ImgUrlPipe implements PipeTransform {

  transform(value: string | null): string {
    return `https://icherniakov.ru/yt-course/${value}`;
  }

}
